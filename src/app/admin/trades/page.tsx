"use client";

import React, { useState } from "react";
import { Search, AlertTriangle, CheckCircle, Clock, Eye, MessageSquare, XCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatINR } from "@/lib/utils";

const mockTrades = [
    { id: "T-4821", buyer: "CryptoFan_91", seller: "P2PMaster", amount: 500, price: 85.5, total: 42750, method: "UPI", status: "completed", time: "2025-02-19 11:30", msgs: 8 },
    { id: "T-4820", buyer: "NewTrader", seller: "USDTDealer", amount: 200, price: 85.5, total: 17100, method: "GPay", status: "in_progress", time: "2025-02-19 11:25", msgs: 3 },
    { id: "T-4819", buyer: "INRBuyer", seller: "TraderPro", amount: 1000, price: 85.3, total: 85300, method: "IMPS", status: "completed", time: "2025-02-19 11:12", msgs: 12 },
    { id: "T-4818", buyer: "QuickSwap", seller: "CryptoKing", amount: 300, price: 85.5, total: 25650, method: "UPI", status: "disputed", time: "2025-02-19 11:00", msgs: 24 },
    { id: "T-4817", buyer: "SmartInvestor", seller: "MegaTrader", amount: 750, price: 85.5, total: 64125, method: "Bank", status: "completed", time: "2025-02-19 10:45", msgs: 6 },
    { id: "T-4816", buyer: "DailyBuyer", seller: "TopSeller", amount: 100, price: 85.4, total: 8540, method: "PhonePe", status: "payment_sent", time: "2025-02-19 10:38", msgs: 4 },
    { id: "T-4815", buyer: "FastTrader", seller: "ReliableDeal", amount: 2500, price: 85.2, total: 213000, method: "IMPS", status: "cancelled", time: "2025-02-19 10:20", msgs: 2 },
    { id: "T-4814", buyer: "CryptoWhale", seller: "BigDeal", amount: 5000, price: 85.6, total: 428000, method: "Bank", status: "completed", time: "2025-02-19 09:55", msgs: 15 },
];

export default function AdminTradesPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedTrade, setSelectedTrade] = useState<typeof mockTrades[0] | null>(null);

    const filtered = mockTrades.filter(t => {
        const matchSearch = t.buyer.toLowerCase().includes(search.toLowerCase()) || t.seller.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || t.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const statusIcon = (s: string) => {
        if (s === "completed") return <CheckCircle size={14} />;
        if (s === "disputed") return <AlertTriangle size={14} />;
        if (s === "in_progress" || s === "payment_sent") return <Clock size={14} />;
        return <XCircle size={14} />;
    };
    const statusClr = (s: string) => {
        if (s === "completed") return "var(--success)";
        if (s === "disputed") return "var(--danger)";
        if (s === "in_progress" || s === "payment_sent") return "var(--warning)";
        return "var(--text-muted)";
    };

    const disputeCount = mockTrades.filter(t => t.status === "disputed").length;
    const activeCount = mockTrades.filter(t => t.status === "in_progress" || t.status === "payment_sent").length;

    return (
        <div>
            <div className="hdr">
                <h1>Trade Monitoring</h1>
                <p>{mockTrades.length} total trades</p>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
                <div className="qs-item active"><Clock size={16} /><span>{activeCount} Active</span></div>
                <div className="qs-item disputes"><AlertTriangle size={16} /><span>{disputeCount} Disputes</span></div>
                <div className="qs-item completed"><CheckCircle size={16} /><span>{mockTrades.filter(t => t.status === "completed").length} Completed</span></div>
            </div>

            <Card padding="md">
                <div className="toolbar">
                    <div className="search-box">
                        <Search size={16} className="search-ic" />
                        <input placeholder="Search trades..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="filters">
                        {["all", "in_progress", "payment_sent", "completed", "disputed", "cancelled"].map(f => (
                            <button key={f} className={`fil-btn ${statusFilter === f ? "active" : ""}`} onClick={() => setStatusFilter(f)}>
                                {f === "all" ? "All" : f.replace("_", " ")}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="table">
                    <div className="t-head">
                        <span>ID</span><span>Buyer → Seller</span><span>Amount</span><span>Total</span><span>Method</span><span>Status</span><span>Msgs</span><span>Actions</span>
                    </div>
                    {filtered.map(t => (
                        <div key={t.id} className={`t-row ${t.status === "disputed" ? "row-dispute" : ""}`}>
                            <span className="t-id">{t.id}</span>
                            <div className="t-parties">
                                <span>{t.buyer}</span><ArrowRight size={12} style={{ color: "var(--text-muted)", flexShrink: 0 }} /><span>{t.seller}</span>
                            </div>
                            <span>{t.amount} USDT</span>
                            <span className="t-total">{formatINR(t.total)}</span>
                            <span className="m-tag">{t.method}</span>
                            <span className="t-status" style={{ color: statusClr(t.status) }}>
                                {statusIcon(t.status)} {t.status.replace("_", " ")}
                            </span>
                            <span className="msg-count"><MessageSquare size={12} /> {t.msgs}</span>
                            <button className="act-btn" onClick={() => setSelectedTrade(t)}><Eye size={14} /></button>
                        </div>
                    ))}
                </div>
            </Card>

            <Modal isOpen={!!selectedTrade} onClose={() => setSelectedTrade(null)} title={`Trade ${selectedTrade?.id}`} size="md">
                {selectedTrade && (
                    <div className="trade-detail">
                        <div className="det-grid">
                            <div className="det-item"><span className="det-l">Buyer</span><span>{selectedTrade.buyer}</span></div>
                            <div className="det-item"><span className="det-l">Seller</span><span>{selectedTrade.seller}</span></div>
                            <div className="det-item"><span className="det-l">Amount</span><span>{selectedTrade.amount} USDT</span></div>
                            <div className="det-item"><span className="det-l">Total</span><span className="t-total">{formatINR(selectedTrade.total)}</span></div>
                            <div className="det-item"><span className="det-l">Price</span><span>₹{selectedTrade.price}/USDT</span></div>
                            <div className="det-item"><span className="det-l">Payment</span><span>{selectedTrade.method}</span></div>
                            <div className="det-item"><span className="det-l">Status</span><span style={{ color: statusClr(selectedTrade.status) }}>{selectedTrade.status.replace("_", " ")}</span></div>
                            <div className="det-item"><span className="det-l">Time</span><span>{selectedTrade.time}</span></div>
                        </div>
                        <div className="det-actions">
                            {selectedTrade.status === "disputed" && <>
                                <Button variant="primary" size="sm"><CheckCircle size={14} /> Resolve — Release to Buyer</Button>
                                <Button variant="outline" size="sm"><XCircle size={14} /> Resolve — Refund Seller</Button>
                            </>}
                            {(selectedTrade.status === "in_progress" || selectedTrade.status === "payment_sent") && (
                                <Button variant="outline" size="sm"><XCircle size={14} /> Force Cancel</Button>
                            )}
                            <Button variant="ghost" size="sm"><MessageSquare size={14} /> View Chat ({selectedTrade.msgs})</Button>
                        </div>
                    </div>
                )}
            </Modal>

            <style jsx>{`
        .hdr{margin-bottom:1.5rem}.hdr h1{font-size:1.75rem;font-weight:700}.hdr p{color:var(--text-tertiary);font-size:.9375rem;margin-top:.25rem}
        .quick-stats{display:flex;gap:.75rem;margin-bottom:1.25rem;flex-wrap:wrap}
        .qs-item{display:flex;align-items:center;gap:.5rem;padding:.625rem 1.25rem;border-radius:.75rem;font-size:.875rem;font-weight:600;border:1px solid var(--border-color)}
        .qs-item.active{color:var(--warning);background:var(--warning-dim);border-color:var(--warning)}
        .qs-item.disputes{color:var(--danger);background:var(--danger-dim);border-color:var(--danger)}
        .qs-item.completed{color:var(--success);background:var(--success-dim);border-color:var(--success)}
        .toolbar{display:flex;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap}
        .search-box{flex:1;min-width:200px;position:relative;display:flex;align-items:center}
        .search-box input{width:100%;padding:.75rem 1rem .75rem 2.5rem;background:var(--bg-glass);border:1px solid var(--border-color);border-radius:.75rem;color:var(--text-primary);font-size:.875rem}
        .search-box input:focus{border-color:var(--accent-primary);outline:none}
        :global(.search-ic){position:absolute;left:.875rem;color:var(--text-muted);pointer-events:none}
        .filters{display:flex;gap:.375rem;flex-wrap:wrap}
        .fil-btn{padding:.5rem .75rem;border-radius:.625rem;font-size:.75rem;font-weight:500;background:var(--bg-glass);color:var(--text-secondary);border:1px solid var(--border-color);text-transform:capitalize;cursor:pointer;transition:all .2s}
        .fil-btn.active{background:var(--danger-dim);color:var(--danger);border-color:var(--danger)}
        .fil-btn:hover{border-color:var(--border-color-hover)}
        .table{overflow-x:auto}
        .t-head{display:grid;grid-template-columns:.6fr 2fr .7fr .9fr .6fr 1fr .5fr .4fr;padding:.625rem 1rem;background:var(--bg-glass);border-radius:.5rem;font-size:.75rem;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem}
        .t-row{display:grid;grid-template-columns:.6fr 2fr .7fr .9fr .6fr 1fr .5fr .4fr;padding:.75rem 1rem;border-bottom:1px solid var(--border-color);font-size:.8125rem;align-items:center;transition:background .2s}
        .t-row:hover{background:var(--bg-glass)}.t-row:last-child{border-bottom:none}
        .row-dispute{background:rgba(255,68,102,.04);border-left:3px solid var(--danger)}
        .t-id{font-family:monospace;font-size:.75rem;color:var(--text-muted)}
        .t-parties{display:flex;align-items:center;gap:.375rem;font-size:.8125rem;font-weight:500}
        .t-total{font-weight:600;color:var(--accent-primary)}
        .m-tag{font-size:.6875rem;padding:.25rem .5rem;border-radius:4px;background:var(--bg-glass);border:1px solid var(--border-color);color:var(--text-secondary);text-align:center}
        .t-status{display:flex;align-items:center;gap:.375rem;font-size:.75rem;font-weight:500;text-transform:capitalize}
        .msg-count{display:flex;align-items:center;gap:.25rem;font-size:.75rem;color:var(--text-muted)}
        .act-btn{background:transparent;color:var(--text-muted);padding:.375rem;border-radius:.5rem;transition:all .2s;cursor:pointer}.act-btn:hover{background:var(--bg-glass);color:var(--text-primary)}
        .trade-detail{display:flex;flex-direction:column;gap:1.25rem}
        .det-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
        .det-item{display:flex;flex-direction:column;gap:.25rem}.det-l{font-size:.75rem;color:var(--text-tertiary);font-weight:500}
        .det-actions{display:flex;gap:.5rem;flex-wrap:wrap}
        @media(max-width:768px){.t-head,.t-row{grid-template-columns:.6fr 2fr .7fr .5fr}.t-head span:nth-child(n+5),.t-row span:nth-child(n+5),.t-row button{display:none}}
      `}</style>
        </div>
    );
}
