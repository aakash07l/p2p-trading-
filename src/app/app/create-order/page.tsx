"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, IndianRupee } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { AppNavbar } from "@/components/app/AppNavbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PAYMENT_METHODS, DEFAULT_USDT_INR_RATE } from "@/lib/constants";
import { formatINR } from "@/lib/utils";

export default function CreateOrderPage() {
    const router = useRouter();
    const account = useActiveAccount();
    const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState(DEFAULT_USDT_INR_RATE.toString());
    const [minLimit, setMinLimit] = useState("1000");
    const [maxLimit, setMaxLimit] = useState("");
    const [selectedPayments, setSelectedPayments] = useState<string[]>(["upi"]);
    const [loading, setLoading] = useState(false);

    const totalINR = parseFloat(amount || "0") * parseFloat(price || "0");

    const togglePayment = (id: string) => {
        setSelectedPayments((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!account) {
            alert("Please connect your wallet first!");
            return;
        }
        setLoading(true);

        // Simulate order creation
        await new Promise((r) => setTimeout(r, 1500));
        alert("Order created successfully! (Demo mode)");
        setLoading(false);
        router.push("/app/orders");
    };

    return (
        <>
            <AppNavbar />
            <div className="app-page">
                <div className="app-content">
                    <div className="page-header">
                        <h1 className="page-title">
                            <PlusCircle size={24} style={{ display: "inline", marginRight: 8, color: "var(--accent-primary)" }} />
                            Create Order
                        </h1>
                        <p className="page-subtitle">Post a new buy or sell order for USDT</p>
                    </div>

                    <Card padding="lg">
                        <form onSubmit={handleSubmit}>
                            {/* Order Type Toggle */}
                            <div className="type-toggle">
                                <button
                                    type="button"
                                    className={`toggle-btn ${orderType === "buy" ? "active buy" : ""}`}
                                    onClick={() => setOrderType("buy")}
                                >
                                    I want to Buy USDT
                                </button>
                                <button
                                    type="button"
                                    className={`toggle-btn ${orderType === "sell" ? "active sell" : ""}`}
                                    onClick={() => setOrderType("sell")}
                                >
                                    I want to Sell USDT
                                </button>
                            </div>

                            <div className="form-grid">
                                <Input
                                    label="Amount (USDT)"
                                    type="number"
                                    placeholder="Enter USDT amount"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                        const total = parseFloat(e.target.value || "0") * parseFloat(price || "0");
                                        setMaxLimit(total.toString());
                                    }}
                                    suffix="USDT"
                                    required
                                />

                                <Input
                                    label="Price (INR per USDT)"
                                    type="number"
                                    placeholder="e.g. 85.50"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    suffix="INR"
                                    required
                                />

                                <Input
                                    label="Min Limit (INR)"
                                    type="number"
                                    placeholder="Minimum trade amount"
                                    value={minLimit}
                                    onChange={(e) => setMinLimit(e.target.value)}
                                    suffix="INR"
                                    required
                                />

                                <Input
                                    label="Max Limit (INR)"
                                    type="number"
                                    placeholder="Maximum trade amount"
                                    value={maxLimit}
                                    onChange={(e) => setMaxLimit(e.target.value)}
                                    suffix="INR"
                                    required
                                />
                            </div>

                            {/* Total Preview */}
                            {amount && price && (
                                <div className="total-preview">
                                    <span className="total-label">Total Value</span>
                                    <span className="total-value">{formatINR(totalINR)}</span>
                                </div>
                            )}

                            {/* Payment Methods */}
                            <div className="payment-section">
                                <label className="section-label">Payment Methods</label>
                                <div className="payment-grid">
                                    {PAYMENT_METHODS.map((pm) => (
                                        <button
                                            key={pm.id}
                                            type="button"
                                            className={`payment-chip ${selectedPayments.includes(pm.id) ? "selected" : ""}`}
                                            onClick={() => togglePayment(pm.id)}
                                        >
                                            <span>{pm.icon}</span>
                                            <span>{pm.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                loading={loading}
                                disabled={!amount || !price || selectedPayments.length === 0}
                            >
                                {orderType === "buy" ? "Create Buy Order" : "Create Sell Order"}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>

            <style jsx>{`
        .app-page { padding-top: 64px; min-height: 100vh; }
        .app-content { margin-left: 260px; padding: 2rem; max-width: 700px; }
        .page-header { margin-bottom: 1.5rem; }
        .page-title { font-size: 1.75rem; font-weight: 700; display: flex; align-items: center; }
        .page-subtitle { color: var(--text-tertiary); font-size: 0.9375rem; margin-top: 0.25rem; }

        .type-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-bottom: 2rem;
          padding: 0.375rem;
          background: var(--bg-glass);
          border-radius: 0.75rem;
          border: 1px solid var(--border-color);
        }
        .toggle-btn {
          padding: 0.75rem;
          border-radius: 0.5rem;
          background: transparent;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9375rem;
          transition: all 200ms ease;
        }
        .toggle-btn:hover { color: var(--text-primary); }
        .toggle-btn.active.buy {
          background: var(--success-dim);
          color: var(--success);
        }
        .toggle-btn.active.sell {
          background: var(--danger-dim);
          color: var(--danger);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .total-preview {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          background: var(--gradient-card);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .total-label { color: var(--text-tertiary); font-size: 0.875rem; }
        .total-value { font-size: 1.5rem; font-weight: 700; color: var(--accent-primary); }

        .payment-section { margin-bottom: 2rem; }
        .section-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }
        .payment-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .payment-chip {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.875rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-color);
          border-radius: 999px;
          color: var(--text-secondary);
          font-size: 0.8125rem;
          transition: all 200ms ease;
        }
        .payment-chip:hover {
          border-color: var(--accent-primary);
          color: var(--text-primary);
        }
        .payment-chip.selected {
          background: var(--accent-primary-dim);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        @media (max-width: 1024px) { .app-content { margin-left: 0; } }
        @media (max-width: 640px) {
          .app-content { padding: 1rem; }
          .form-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </>
    );
}
