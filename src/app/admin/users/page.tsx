"use client";

import React, { useState } from "react";
import { Search, Filter, MoreVertical, Ban, CheckCircle, Mail, Eye, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatINR } from "@/lib/utils";

const mockUsers = [
    { id: "U001", name: "Rahul Sharma", email: "rahul@email.com", wallet: "0x1a2b...3c4d", trades: 48, volume: 425000, rating: 4.8, status: "active", joined: "2024-12-15", kyc: "verified" },
    { id: "U002", name: "Priya Mehta", email: "priya@email.com", wallet: "0x5e6f...7a8b", trades: 12, volume: 89000, rating: 4.5, status: "active", joined: "2025-01-10", kyc: "verified" },
    { id: "U003", name: "Amit Kumar", email: "amit@email.com", wallet: "0x9c0d...1e2f", trades: 95, volume: 1250000, rating: 4.9, status: "active", joined: "2024-11-05", kyc: "verified" },
    { id: "U004", name: "Sneha Desai", email: "sneha@email.com", wallet: "0x3g4h...5i6j", trades: 3, volume: 15000, rating: 3.8, status: "suspended", joined: "2025-01-28", kyc: "pending" },
    { id: "U005", name: "Vikram Singh", email: "vikram@email.com", wallet: "0x7k8l...9m0n", trades: 67, volume: 780000, rating: 4.7, status: "active", joined: "2024-10-20", kyc: "verified" },
    { id: "U006", name: "Neha Patel", email: "neha@email.com", wallet: "0x1o2p...3q4r", trades: 0, volume: 0, rating: 0, status: "active", joined: "2025-02-18", kyc: "unverified" },
    { id: "U007", name: "Arjun Reddy", email: "arjun@email.com", wallet: "0x5s6t...7u8v", trades: 156, volume: 3200000, rating: 4.9, status: "active", joined: "2024-08-12", kyc: "verified" },
    { id: "U008", name: "Divya Iyer", email: "divya@email.com", wallet: "0x9w0x...1y2z", trades: 28, volume: 340000, rating: 4.6, status: "banned", joined: "2024-12-01", kyc: "verified" },
];

export default function AdminUsersPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);

    const filtered = mockUsers.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" || u.status === filter;
        return matchSearch && matchFilter;
    });

    const statusClr = (s: string) => s === "active" ? "var(--success)" : s === "suspended" ? "var(--warning)" : "var(--danger)";
    const kycClr = (s: string) => s === "verified" ? "var(--success)" : s === "pending" ? "var(--warning)" : "var(--text-muted)";

    return (
        <div>
            <div className="hdr">
                <h1>User Management</h1>
                <p>{mockUsers.length} total users</p>
            </div>

            <Card padding="md">
                <div className="toolbar">
                    <div className="search-box">
                        <Search size={16} className="search-ic" />
                        <input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="filters">
                        {["all", "active", "suspended", "banned"].map(f => (
                            <button key={f} className={`fil-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
                        ))}
                    </div>
                </div>

                <div className="table">
                    <div className="t-head">
                        <span>User</span><span>Wallet</span><span>Trades</span><span>Volume</span><span>Rating</span><span>KYC</span><span>Status</span><span>Actions</span>
                    </div>
                    {filtered.map(u => (
                        <div key={u.id} className="t-row">
                            <div className="u-cell">
                                <div className="u-avatar">{u.name.charAt(0)}</div>
                                <div><span className="u-name">{u.name}</span><span className="u-email">{u.email}</span></div>
                            </div>
                            <span className="mono">{u.wallet}</span>
                            <span>{u.trades}</span>
                            <span className="vol">{formatINR(u.volume)}</span>
                            <span>{u.rating > 0 ? `⭐ ${u.rating}` : "—"}</span>
                            <span className="badge" style={{ color: kycClr(u.kyc), background: `${kycClr(u.kyc)}18` }}>{u.kyc}</span>
                            <span className="badge" style={{ color: statusClr(u.status), background: `${statusClr(u.status)}18` }}>{u.status}</span>
                            <button className="act-btn" onClick={() => setSelectedUser(u)}><Eye size={14} /></button>
                        </div>
                    ))}
                </div>
            </Card>

            <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} title={selectedUser?.name || ""} size="md">
                {selectedUser && (
                    <div className="user-detail">
                        <div className="det-grid">
                            <div className="det-item"><span className="det-l">Email</span><span>{selectedUser.email}</span></div>
                            <div className="det-item"><span className="det-l">Wallet</span><span className="mono">{selectedUser.wallet}</span></div>
                            <div className="det-item"><span className="det-l">Joined</span><span>{selectedUser.joined}</span></div>
                            <div className="det-item"><span className="det-l">KYC</span><span style={{ color: kycClr(selectedUser.kyc) }}>{selectedUser.kyc}</span></div>
                            <div className="det-item"><span className="det-l">Trades</span><span>{selectedUser.trades}</span></div>
                            <div className="det-item"><span className="det-l">Volume</span><span>{formatINR(selectedUser.volume)}</span></div>
                            <div className="det-item"><span className="det-l">Rating</span><span>⭐ {selectedUser.rating}</span></div>
                            <div className="det-item"><span className="det-l">Status</span><span style={{ color: statusClr(selectedUser.status) }}>{selectedUser.status}</span></div>
                        </div>
                        <div className="det-actions">
                            {selectedUser.status !== "banned" && <Button variant="outline" size="sm"><Ban size={14} /> Ban User</Button>}
                            {selectedUser.status === "suspended" && <Button variant="primary" size="sm"><CheckCircle size={14} /> Reactivate</Button>}
                            <Button variant="ghost" size="sm"><Mail size={14} /> Email User</Button>
                        </div>
                    </div>
                )}
            </Modal>

            <style jsx>{`
        .hdr{margin-bottom:1.5rem}.hdr h1{font-size:1.75rem;font-weight:700}.hdr p{color:var(--text-tertiary);font-size:.9375rem;margin-top:.25rem}
        .toolbar{display:flex;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap}
        .search-box{flex:1;min-width:200px;position:relative;display:flex;align-items:center}
        .search-box input{width:100%;padding:.75rem 1rem .75rem 2.5rem;background:var(--bg-glass);border:1px solid var(--border-color);border-radius:.75rem;color:var(--text-primary);font-size:.875rem}
        .search-box input:focus{border-color:var(--accent-primary);outline:none}
        :global(.search-ic){position:absolute;left:.875rem;color:var(--text-muted);pointer-events:none}
        .filters{display:flex;gap:.375rem}
        .fil-btn{padding:.5rem 1rem;border-radius:.625rem;font-size:.8125rem;font-weight:500;background:var(--bg-glass);color:var(--text-secondary);border:1px solid var(--border-color);text-transform:capitalize;cursor:pointer;transition:all .2s}
        .fil-btn.active{background:var(--danger-dim);color:var(--danger);border-color:var(--danger)}
        .fil-btn:hover{border-color:var(--border-color-hover)}
        .table{overflow-x:auto}
        .t-head{display:grid;grid-template-columns:2fr 1.2fr .6fr 1fr .6fr .8fr .8fr .5fr;padding:.625rem 1rem;background:var(--bg-glass);border-radius:.5rem;font-size:.75rem;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem}
        .t-row{display:grid;grid-template-columns:2fr 1.2fr .6fr 1fr .6fr .8fr .8fr .5fr;padding:.75rem 1rem;border-bottom:1px solid var(--border-color);font-size:.8125rem;align-items:center;transition:background .2s}
        .t-row:hover{background:var(--bg-glass)}.t-row:last-child{border-bottom:none}
        .u-cell{display:flex;align-items:center;gap:.625rem}
        .u-avatar{width:32px;height:32px;border-radius:8px;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:.8125rem;flex-shrink:0}
        .u-name{font-weight:500;display:block;font-size:.8125rem}.u-email{font-size:.6875rem;color:var(--text-muted);display:block}
        .mono{font-family:monospace;font-size:.75rem;color:var(--text-muted)}
        .vol{font-weight:600;color:var(--accent-primary);font-size:.8125rem}
        .badge{font-size:.6875rem;font-weight:600;padding:.25rem .625rem;border-radius:999px;text-transform:capitalize;display:inline-block;text-align:center}
        .act-btn{background:transparent;color:var(--text-muted);padding:.375rem;border-radius:.5rem;transition:all .2s;cursor:pointer}.act-btn:hover{background:var(--bg-glass);color:var(--text-primary)}
        .user-detail{display:flex;flex-direction:column;gap:1.25rem}
        .det-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
        .det-item{display:flex;flex-direction:column;gap:.25rem}.det-l{font-size:.75rem;color:var(--text-tertiary);font-weight:500}
        .det-actions{display:flex;gap:.5rem;flex-wrap:wrap}
        @media(max-width:768px){.t-head,.t-row{grid-template-columns:2fr 1fr .6fr .5fr}.t-head span:nth-child(n+5),.t-row span:nth-child(n+5),.t-row .act-btn:nth-child(n+5){display:none}}
      `}</style>
        </div>
    );
}
