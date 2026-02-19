"use client";

import React, { useState } from "react";
import { Search, Trash2, Eye, XCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";

const mockOrders = [
    { id: "ORD-001", type: "sell", user: "CryptoKing", amount: 500, price: 85.5, total: 42750, status: "open", methods: ["UPI", "GPay"], created: "2025-02-19 10:30" },
    { id: "ORD-002", type: "sell", user: "TraderPro", amount: 1000, price: 85.3, total: 85300, status: "open", methods: ["IMPS", "Bank"], created: "2025-02-19 09:45" },
    { id: "ORD-003", type: "buy", user: "INRBuyer", amount: 800, price: 85.2, total: 68160, status: "open", methods: ["UPI"], created: "2025-02-19 08:15" },
    { id: "ORD-004", type: "sell", user: "MegaTrader", amount: 2000, price: 85.6, total: 171200, status: "filled", methods: ["UPI", "IMPS", "Bank"], created: "2025-02-18 22:00" },
    { id: "ORD-005", type: "buy", user: "QuickSwap", amount: 300, price: 85.0, total: 25500, status: "cancelled", methods: ["GPay", "PhonePe"], created: "2025-02-18 18:30" },
    { id: "ORD-006", type: "sell", user: "CryptoFan", amount: 150, price: 85.4, total: 12810, status: "open", methods: ["Paytm"], created: "2025-02-19 11:00" },
    { id: "ORD-007", type: "buy", user: "SmartBuyer", amount: 5000, price: 85.1, total: 425500, status: "open", methods: ["Bank", "IMPS"], created: "2025-02-19 07:20" },
    { id: "ORD-008", type: "sell", user: "DailyTrader", amount: 250, price: 85.45, total: 21362, status: "filled", methods: ["UPI", "GPay"], created: "2025-02-18 14:10" },
];

export default function AdminOrdersPage() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const filtered = mockOrders.filter(o => {
        const matchSearch = o.user.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
        const matchType = typeFilter === "all" || o.type === typeFilter;
        const matchStatus = statusFilter === "all" || o.status === statusFilter;
        return matchSearch && matchType && matchStatus;
    });

    const typeClr = (t: string) => t === "buy" ? "var(--success)" : "var(--danger)";
    const statusClr = (s: string) => s === "open" ? "var(--accent-primary)" : s === "filled" ? "var(--success)" : "var(--text-muted)";

    return (
        <div>
            <div className="hdr">
                <h1>Order Management</h1>
                <p>{mockOrders.length} total orders • {mockOrders.filter(o => o.status === "open").length} active</p>
            </div>

            <Card padding="md">
                <div className="toolbar">
                    <div className="search-box">
                        <Search size={16} className="search-ic" />
                        <input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="filter-group">
                        <div className="filters">
                            {["all", "buy", "sell"].map(f => (
                                <button key={f} className={`fil-btn ${typeFilter === f ? "active" : ""}`} onClick={() => setTypeFilter(f)}>{f}</button>
                            ))}
                        </div>
                        <div className="filters">
                            {["all", "open", "filled", "cancelled"].map(f => (
                                <button key={f} className={`fil-btn s ${statusFilter === f ? "active" : ""}`} onClick={() => setStatusFilter(f)}>{f}</button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="table">
                    <div className="t-head">
                        <span>ID</span><span>Type</span><span>User</span><span>Amount</span><span>Price</span><span>Total</span><span>Methods</span><span>Status</span><span>Actions</span>
                    </div>
                    {filtered.map(o => (
                        <div key={o.id} className="t-row">
                            <span className="t-id">{o.id}</span>
                            <span className="badge" style={{ color: typeClr(o.type), background: `${typeClr(o.type)}18` }}>{o.type.toUpperCase()}</span>
                            <span className="t-user">{o.user}</span>
                            <span>{o.amount} USDT</span>
                            <span>₹{o.price}</span>
                            <span className="t-total">{formatINR(o.total)}</span>
                            <div className="methods">{o.methods.map(m => <span key={m} className="m-tag">{m}</span>)}</div>
                            <span className="badge" style={{ color: statusClr(o.status), background: `${statusClr(o.status)}18` }}>{o.status}</span>
                            <div className="actions">
                                {o.status === "open" && <button className="act-btn danger" title="Cancel"><XCircle size={14} /></button>}
                                <button className="act-btn" title="Delete"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <style jsx>{`
        .hdr{margin-bottom:1.5rem}.hdr h1{font-size:1.75rem;font-weight:700}.hdr p{color:var(--text-tertiary);font-size:.9375rem;margin-top:.25rem}
        .toolbar{display:flex;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap}
        .search-box{flex:1;min-width:200px;position:relative;display:flex;align-items:center}
        .search-box input{width:100%;padding:.75rem 1rem .75rem 2.5rem;background:var(--bg-glass);border:1px solid var(--border-color);border-radius:.75rem;color:var(--text-primary);font-size:.875rem}
        .search-box input:focus{border-color:var(--accent-primary);outline:none}
        :global(.search-ic){position:absolute;left:.875rem;color:var(--text-muted);pointer-events:none}
        .filter-group{display:flex;gap:.75rem;flex-wrap:wrap}
        .filters{display:flex;gap:.375rem}
        .fil-btn{padding:.5rem .875rem;border-radius:.625rem;font-size:.8125rem;font-weight:500;background:var(--bg-glass);color:var(--text-secondary);border:1px solid var(--border-color);text-transform:capitalize;cursor:pointer;transition:all .2s}
        .fil-btn.active{background:var(--danger-dim);color:var(--danger);border-color:var(--danger)}
        .fil-btn.s.active{background:var(--accent-primary-dim);color:var(--accent-primary);border-color:var(--accent-primary)}
        .fil-btn:hover{border-color:var(--border-color-hover)}
        .table{overflow-x:auto}
        .t-head{display:grid;grid-template-columns:.7fr .5fr .9fr .8fr .6fr .9fr 1.2fr .6fr .5fr;padding:.625rem 1rem;background:var(--bg-glass);border-radius:.5rem;font-size:.75rem;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem}
        .t-row{display:grid;grid-template-columns:.7fr .5fr .9fr .8fr .6fr .9fr 1.2fr .6fr .5fr;padding:.75rem 1rem;border-bottom:1px solid var(--border-color);font-size:.8125rem;align-items:center;transition:background .2s}
        .t-row:hover{background:var(--bg-glass)}.t-row:last-child{border-bottom:none}
        .t-id{font-family:monospace;font-size:.75rem;color:var(--text-muted)}
        .t-user{font-weight:500}
        .t-total{font-weight:600;color:var(--accent-primary)}
        .badge{font-size:.6875rem;font-weight:600;padding:.25rem .5rem;border-radius:999px;text-transform:capitalize;text-align:center}
        .methods{display:flex;gap:.25rem;flex-wrap:wrap}
        .m-tag{font-size:.625rem;padding:.125rem .375rem;border-radius:4px;background:var(--bg-glass);border:1px solid var(--border-color);color:var(--text-secondary)}
        .actions{display:flex;gap:.25rem}
        .act-btn{background:transparent;color:var(--text-muted);padding:.375rem;border-radius:.5rem;transition:all .2s;cursor:pointer}.act-btn:hover{background:var(--bg-glass);color:var(--text-primary)}
        .act-btn.danger:hover{color:var(--danger)}
        @media(max-width:768px){.t-head,.t-row{grid-template-columns:.7fr .5fr .9fr .8fr .5fr}.t-head span:nth-child(n+6),.t-row span:nth-child(n+6),.t-row div:nth-child(n+6){display:none}}
      `}</style>
        </div>
    );
}
