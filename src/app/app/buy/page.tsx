"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, Filter } from "lucide-react";
import { AppNavbar } from "@/components/app/AppNavbar";
import { OrderCard } from "@/components/app/OrderCard";
import { Input } from "@/components/ui/Input";
import type { Order } from "@/types";

// Mock sell orders (users selling USDT — buyer pays INR to get USDT)
const mockSellOrders: Order[] = [
    {
        id: "s1",
        type: "sell",
        walletAddress: "0x1234...abcd",
        userName: "CryptoKing",
        amount: 500,
        price: 85.5,
        minLimit: 5000,
        maxLimit: 42750,
        paymentMethods: ["upi", "gpay", "phonepe"],
        status: "open",
        completedTrades: 142,
        totalTrades: 150,
        createdAt: new Date(Date.now() - 300000).toISOString(),
    },
    {
        id: "s2",
        type: "sell",
        walletAddress: "0x5678...efgh",
        userName: "TraderPro",
        amount: 1000,
        price: 85.3,
        minLimit: 10000,
        maxLimit: 85300,
        paymentMethods: ["upi", "imps", "bank"],
        status: "open",
        completedTrades: 89,
        totalTrades: 95,
        createdAt: new Date(Date.now() - 600000).toISOString(),
    },
    {
        id: "s3",
        type: "sell",
        walletAddress: "0x9abc...ijkl",
        userName: "USDTDealer",
        amount: 2000,
        price: 85.7,
        minLimit: 20000,
        maxLimit: 171400,
        paymentMethods: ["imps", "neft", "bank"],
        status: "open",
        completedTrades: 256,
        totalTrades: 260,
        createdAt: new Date(Date.now() - 900000).toISOString(),
    },
    {
        id: "s4",
        type: "sell",
        walletAddress: "0xdef0...mnop",
        userName: "QuickSwap",
        amount: 300,
        price: 85.4,
        minLimit: 2000,
        maxLimit: 25620,
        paymentMethods: ["upi", "gpay", "paytm"],
        status: "open",
        completedTrades: 67,
        totalTrades: 70,
        createdAt: new Date(Date.now() - 1200000).toISOString(),
    },
    {
        id: "s5",
        type: "sell",
        walletAddress: "0x1111...aaaa",
        userName: "P2PMaster",
        amount: 5000,
        price: 85.6,
        minLimit: 50000,
        maxLimit: 428000,
        paymentMethods: ["bank", "neft", "imps"],
        status: "open",
        completedTrades: 512,
        totalTrades: 520,
        createdAt: new Date(Date.now() - 1800000).toISOString(),
    },
];

export default function BuyPage() {
    const [orders, setOrders] = useState<Order[]>(mockSellOrders);
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
                                <ShoppingCart size={24} style={{ display: "inline", marginRight: 8, color: "var(--success)" }} />
                                Buy USDT
                            </h1>
                            <p className="page-subtitle">Browse available sellers and buy USDT with INR</p>
                        </div>
                    </div>

                    {/* Filters */}
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

                    {/* Orders List */}
                    <div className="orders-list">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                            <div className="empty-state">
                                <ShoppingCart size={48} />
                                <h3>No orders found</h3>
                                <p>Try adjusting your filters or check back later.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .app-page {
          padding-top: 64px;
          min-height: 100vh;
        }
        .app-content {
          margin-left: 260px;
          padding: 2rem;
          max-width: 900px;
        }
        .page-header { margin-bottom: 1.5rem; }
        .page-title {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
        }
        .page-subtitle {
          color: var(--text-tertiary);
          font-size: 0.9375rem;
          margin-top: 0.25rem;
        }
        .filters-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          align-items: flex-end;
        }
        .search-wrapper { flex: 1; }
        .payment-filter {
          padding: 0.75rem 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          color: var(--text-primary);
          font-size: 0.875rem;
          cursor: pointer;
          min-width: 200px;
        }
        .payment-filter:focus {
          border-color: var(--accent-primary);
        }
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        @media (max-width: 1024px) {
          .app-content { margin-left: 0; }
        }
        @media (max-width: 640px) {
          .app-content { padding: 1rem; }
          .filters-bar { flex-direction: column; }
          .payment-filter { min-width: 100%; }
        }
      `}</style>
        </>
    );
}
