"use client";

import React, { useState } from "react";
import { Store, Search } from "lucide-react";
import { AppNavbar } from "@/components/app/AppNavbar";
import { OrderCard } from "@/components/app/OrderCard";
import { Input } from "@/components/ui/Input";
import type { Order } from "@/types";

const mockBuyOrders: Order[] = [
    {
        id: "b1",
        type: "buy",
        walletAddress: "0xaaaa...1111",
        userName: "INRBuyer",
        amount: 800,
        price: 85.2,
        minLimit: 5000,
        maxLimit: 68160,
        paymentMethods: ["upi", "gpay"],
        status: "open",
        completedTrades: 98,
        totalTrades: 105,
        createdAt: new Date(Date.now() - 400000).toISOString(),
    },
    {
        id: "b2",
        type: "buy",
        walletAddress: "0xbbbb...2222",
        userName: "MegaTrader",
        amount: 2500,
        price: 85.0,
        minLimit: 25000,
        maxLimit: 212500,
        paymentMethods: ["imps", "bank", "neft"],
        status: "open",
        completedTrades: 320,
        totalTrades: 330,
        createdAt: new Date(Date.now() - 700000).toISOString(),
    },
    {
        id: "b3",
        type: "buy",
        walletAddress: "0xcccc...3333",
        userName: "FastBuyer",
        amount: 200,
        price: 85.8,
        minLimit: 2000,
        maxLimit: 17160,
        paymentMethods: ["upi", "phonepe", "paytm"],
        status: "open",
        completedTrades: 45,
        totalTrades: 48,
        createdAt: new Date(Date.now() - 500000).toISOString(),
    },
    {
        id: "b4",
        type: "buy",
        walletAddress: "0xdddd...4444",
        userName: "CryptoBull",
        amount: 1500,
        price: 85.1,
        minLimit: 10000,
        maxLimit: 127650,
        paymentMethods: ["bank", "imps"],
        status: "open",
        completedTrades: 178,
        totalTrades: 185,
        createdAt: new Date(Date.now() - 1000000).toISOString(),
    },
    {
        id: "b5",
        type: "buy",
        walletAddress: "0xeeee...5555",
        userName: "SmartInvestor",
        amount: 3000,
        price: 84.9,
        minLimit: 50000,
        maxLimit: 254700,
        paymentMethods: ["neft", "bank"],
        status: "open",
        completedTrades: 410,
        totalTrades: 415,
        createdAt: new Date(Date.now() - 1500000).toISOString(),
    },
];

export default function SellPage() {
    const [orders] = useState<Order[]>(mockBuyOrders);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("");

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.amount.toString().includes(searchTerm);
        const matchesPayment =
            !selectedPayment || order.paymentMethods.includes(selectedPayment);
        return matchesSearch && matchesPayment;
    });

    return (
        <>
            <AppNavbar />
            <div className="app-page">
                <div className="app-content">
                    <div className="page-header">
                        <div>
                            <h1 className="page-title">
                                <Store size={24} style={{ display: "inline", marginRight: 8, color: "var(--warning)" }} />
                                Sell USDT
                            </h1>
                            <p className="page-subtitle">Browse buyers looking to purchase your USDT for INR</p>
                        </div>
                    </div>

                    <div className="filters-bar">
                        <div className="search-wrapper">
                            <Input
                                placeholder="Search by name or amount..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search size={18} />}
                            />
                        </div>
                        <select
                            className="payment-filter"
                            value={selectedPayment}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                        >
                            <option value="">All Payment Methods</option>
                            <option value="upi">📱 UPI</option>
                            <option value="imps">🏦 IMPS</option>
                            <option value="neft">🏛️ NEFT</option>
                            <option value="bank">💳 Bank Transfer</option>
                            <option value="gpay">📲 Google Pay</option>
                            <option value="phonepe">📞 PhonePe</option>
                            <option value="paytm">💰 Paytm</option>
                        </select>
                    </div>

                    <div className="orders-list">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                            <div className="empty-state">
                                <Store size={48} />
                                <h3>No buy orders found</h3>
                                <p>Try adjusting your filters or check back later.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .app-page { padding-top: 64px; min-height: 100vh; }
        .app-content { margin-left: 260px; padding: 2rem; max-width: 900px; }
        .page-header { margin-bottom: 1.5rem; }
        .page-title { font-size: 1.75rem; font-weight: 700; display: flex; align-items: center; }
        .page-subtitle { color: var(--text-tertiary); font-size: 0.9375rem; margin-top: 0.25rem; }
        .filters-bar { display: flex; gap: 1rem; margin-bottom: 1.5rem; align-items: flex-end; }
        .search-wrapper { flex: 1; }
        .payment-filter {
          padding: 0.75rem 1rem; background: var(--bg-secondary); border: 1px solid var(--border-color);
          border-radius: 0.75rem; color: var(--text-primary); font-size: 0.875rem; cursor: pointer; min-width: 200px;
        }
        .orders-list { display: flex; flex-direction: column; gap: 1rem; }
        @media (max-width: 1024px) { .app-content { margin-left: 0; } }
        @media (max-width: 640px) {
          .app-content { padding: 1rem; }
          .filters-bar { flex-direction: column; }
          .payment-filter { min-width: 100%; }
        }
      `}</style>
        </>
    );
}
