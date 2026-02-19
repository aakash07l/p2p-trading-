"use client";

import React, { useState } from "react";
import { History, Clock, CheckCircle, XCircle } from "lucide-react";
import { AppNavbar } from "@/components/app/AppNavbar";
import { formatINR, formatUSDT, timeAgo } from "@/lib/utils";

const mockHistory = [
    { id: "t1", type: "buy" as const, amount: 500, price: 85.5, totalINR: 42750, status: "completed", counterparty: "CryptoKing", paymentMethod: "UPI", createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: "t2", type: "sell" as const, amount: 200, price: 85.3, totalINR: 17060, status: "completed", counterparty: "TraderPro", paymentMethod: "IMPS", createdAt: new Date(Date.now() - 7200000).toISOString() },
    { id: "t3", type: "buy" as const, amount: 1000, price: 85.7, totalINR: 85700, status: "in_progress", counterparty: "USDTDealer", paymentMethod: "Bank Transfer", createdAt: new Date(Date.now() - 1800000).toISOString() },
    { id: "t4", type: "sell" as const, amount: 300, price: 85.4, totalINR: 25620, status: "cancelled", counterparty: "QuickSwap", paymentMethod: "Google Pay", createdAt: new Date(Date.now() - 86400000).toISOString() },
];

export default function OrdersPage() {
    const [filter, setFilter] = useState("all");
    const filtered = mockHistory.filter((o) => filter === "all" || o.status === filter);

    const statusIcon = (s: string) => {
        if (s === "completed") return <CheckCircle size={14} style={{ color: "var(--success)" }} />;
        if (s === "in_progress") return <Clock size={14} style={{ color: "var(--warning)" }} />;
        return <XCircle size={14} style={{ color: "var(--danger)" }} />;
    };

    return (
        <>
            <AppNavbar />
            <div className="pg"><div className="ct">
                <h1 className="pt"><History size={22} style={{ marginRight: 8, color: "var(--accent-secondary)" }} />My Orders</h1>
                <p className="ps">Your trading history and active orders</p>

                <div className="tabs">
                    {["all", "completed", "in_progress", "cancelled"].map(f => (
                        <button key={f} className={`tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                            {f === "all" ? "All" : f === "in_progress" ? "Active" : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="list">
                    {filtered.map(o => (
                        <div key={o.id} className="row">
                            <div className="row-top">
                                <span className={`badge ${o.type}`}>{o.type.toUpperCase()}</span>
                                <span className="amt">{formatUSDT(o.amount)}</span>
                                <span className="tot">{formatINR(o.totalINR)}</span>
                            </div>
                            <div className="row-bot">
                                <span>with {o.counterparty} via {o.paymentMethod}</span>
                                <span className="st">{statusIcon(o.status)} {o.status === "in_progress" ? "Active" : o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span>
                                <span className="tm">{timeAgo(o.createdAt)}</span>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && <div className="empty-state"><History size={48} /><h3>No orders found</h3></div>}
                </div>
            </div></div>
            <style jsx>{`
        .pg{padding-top:64px;min-height:100vh}.ct{margin-left:260px;padding:2rem;max-width:900px}
        .pt{font-size:1.75rem;font-weight:700;display:flex;align-items:center}.ps{color:var(--text-tertiary);font-size:.9375rem;margin:.25rem 0 1.5rem}
        .tabs{display:flex;gap:.5rem;padding:.375rem;background:var(--bg-glass);border-radius:.75rem;border:1px solid var(--border-color);width:fit-content;margin-bottom:1.5rem}
        .tab{padding:.5rem 1rem;border-radius:.5rem;background:transparent;color:var(--text-secondary);font-weight:500;font-size:.875rem;transition:all .2s}
        .tab:hover{color:var(--text-primary)}.tab.active{background:var(--accent-primary-dim);color:var(--accent-primary)}
        .list{display:flex;flex-direction:column;gap:.75rem}
        .row{background:var(--bg-card);border:1px solid var(--border-color);border-radius:1rem;padding:1rem 1.25rem;transition:all .25s}
        .row:hover{background:var(--bg-card-hover);border-color:var(--border-color-hover)}
        .row-top{display:flex;align-items:center;gap:1rem;margin-bottom:.5rem}
        .badge{font-size:.6875rem;font-weight:700;padding:.25rem .5rem;border-radius:.25rem}
        .badge.buy{background:var(--success-dim);color:var(--success)}.badge.sell{background:var(--danger-dim);color:var(--danger)}
        .amt{font-weight:600}.tot{color:var(--accent-primary);font-weight:600;margin-left:auto}
        .row-bot{display:flex;align-items:center;gap:1rem;font-size:.8125rem;color:var(--text-tertiary)}
        .st{display:flex;align-items:center;gap:.25rem;margin-left:auto}.tm{color:var(--text-muted)}
        @media(max-width:1024px){.ct{margin-left:0}}@media(max-width:640px){.ct{padding:1rem}}
      `}</style>
        </>
    );
}
