"use client";

import React from "react";
import {
    Users, ShoppingBag, ArrowLeftRight, TrendingUp,
    DollarSign, Activity, AlertTriangle, CheckCircle,
    Clock, ArrowUp, ArrowDown,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatINR } from "@/lib/utils";

const stats = [
    { label: "Total Users", value: "1,247", change: "+12%", up: true, icon: <Users size={22} />, color: "var(--accent-primary)", bg: "var(--accent-primary-dim)" },
    { label: "Total Orders", value: "3,892", change: "+8%", up: true, icon: <ShoppingBag size={22} />, color: "var(--accent-secondary)", bg: "var(--accent-secondary-dim)" },
    { label: "Active Trades", value: "47", change: "+3", up: true, icon: <ArrowLeftRight size={22} />, color: "var(--warning)", bg: "var(--warning-dim)" },
    { label: "Trading Volume", value: formatINR(42500000), change: "+15%", up: true, icon: <DollarSign size={22} />, color: "var(--success)", bg: "var(--success-dim)" },
    { label: "Disputes", value: "3", change: "-2", up: false, icon: <AlertTriangle size={22} />, color: "var(--danger)", bg: "var(--danger-dim)" },
    { label: "Completion Rate", value: "96.4%", change: "+0.8%", up: true, icon: <CheckCircle size={22} />, color: "var(--info)", bg: "var(--info-dim)" },
];

const recentTrades = [
    { id: "T-4821", buyer: "CryptoFan_91", seller: "P2PMaster", amount: 500, total: 42750, status: "completed", time: "2m ago" },
    { id: "T-4820", buyer: "NewTrader", seller: "USDTDealer", amount: 200, total: 17100, status: "in_progress", time: "5m ago" },
    { id: "T-4819", buyer: "INRBuyer", seller: "TraderPro", amount: 1000, total: 85300, status: "completed", time: "12m ago" },
    { id: "T-4818", buyer: "QuickSwap", seller: "CryptoKing", amount: 300, total: 25650, status: "disputed", time: "18m ago" },
    { id: "T-4817", buyer: "SmartInvestor", seller: "MegaTrader", amount: 750, total: 64125, status: "completed", time: "25m ago" },
];

const recentUsers = [
    { name: "Rahul S.", email: "rahul@email.com", trades: 12, volume: 245000, joined: "1h ago" },
    { name: "Priya M.", email: "priya@email.com", trades: 0, volume: 0, joined: "3h ago" },
    { name: "Amit K.", email: "amit@email.com", trades: 5, volume: 89000, joined: "6h ago" },
    { name: "Sneha D.", email: "sneha@email.com", trades: 28, volume: 520000, joined: "1d ago" },
];

export default function AdminDashboard() {
    const statusColor = (s: string) => {
        if (s === "completed") return "var(--success)";
        if (s === "in_progress") return "var(--warning)";
        if (s === "disputed") return "var(--danger)";
        return "var(--text-tertiary)";
    };

    return (
        <div>
            <div className="hdr">
                <h1>Dashboard</h1>
                <p>Platform overview and real-time metrics</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((s, i) => (
                    <Card key={i} hover padding="md">
                        <div className="stat-top">
                            <div className="stat-ic" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                            <span className={`stat-ch ${s.up ? "up" : "down"}`}>
                                {s.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{s.change}
                            </span>
                        </div>
                        <div className="stat-val">{s.value}</div>
                        <div className="stat-lbl">{s.label}</div>
                    </Card>
                ))}
            </div>

            <div className="panels">
                {/* Recent Trades */}
                <Card padding="md">
                    <div className="panel-head">
                        <h2><Activity size={18} /> Recent Trades</h2>
                        <span className="live-dot" />
                    </div>
                    <div className="table">
                        <div className="t-head">
                            <span>ID</span><span>Buyer</span><span>Seller</span><span>Amount</span><span>Total</span><span>Status</span><span>Time</span>
                        </div>
                        {recentTrades.map((t) => (
                            <div key={t.id} className="t-row">
                                <span className="t-id">{t.id}</span>
                                <span>{t.buyer}</span>
                                <span>{t.seller}</span>
                                <span>{t.amount} USDT</span>
                                <span className="t-total">{formatINR(t.total)}</span>
                                <span className="t-status" style={{ color: statusColor(t.status) }}>● {t.status.replace("_", " ")}</span>
                                <span className="t-time">{t.time}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Recent Users */}
                <Card padding="md">
                    <div className="panel-head">
                        <h2><Users size={18} /> New Users</h2>
                    </div>
                    <div className="user-list">
                        {recentUsers.map((u, i) => (
                            <div key={i} className="user-row">
                                <div className="u-avatar">{u.name.charAt(0)}</div>
                                <div className="u-info">
                                    <span className="u-name">{u.name}</span>
                                    <span className="u-email">{u.email}</span>
                                </div>
                                <div className="u-stats">
                                    <span>{u.trades} trades</span>
                                    <span>{formatINR(u.volume)}</span>
                                </div>
                                <span className="u-time">{u.joined}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <style jsx>{`
        .hdr{margin-bottom:1.5rem}
        .hdr h1{font-size:1.75rem;font-weight:700}.hdr p{color:var(--text-tertiary);font-size:.9375rem;margin-top:.25rem}
        .stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem}
        .stat-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem}
        .stat-ic{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center}
        .stat-ch{display:flex;align-items:center;gap:.125rem;font-size:.75rem;font-weight:600;padding:.25rem .5rem;border-radius:999px}
        .stat-ch.up{color:var(--success);background:var(--success-dim)}
        .stat-ch.down{color:var(--danger);background:var(--danger-dim)}
        .stat-val{font-size:1.5rem;font-weight:700;margin-bottom:.125rem}
        .stat-lbl{font-size:.8125rem;color:var(--text-tertiary)}
        .panels{display:flex;flex-direction:column;gap:1.5rem}
        .panel-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
        .panel-head h2{font-size:1rem;font-weight:600;display:flex;align-items:center;gap:.5rem}
        .live-dot{width:8px;height:8px;border-radius:50%;background:var(--success);box-shadow:0 0 8px var(--success);animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        .table{overflow-x:auto}
        .t-head{display:grid;grid-template-columns:.6fr 1fr 1fr .8fr 1fr .9fr .6fr;padding:.625rem 1rem;background:var(--bg-glass);border-radius:.5rem;font-size:.75rem;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem}
        .t-row{display:grid;grid-template-columns:.6fr 1fr 1fr .8fr 1fr .9fr .6fr;padding:.75rem 1rem;border-bottom:1px solid var(--border-color);font-size:.8125rem;align-items:center;transition:background .2s}
        .t-row:hover{background:var(--bg-glass)}.t-row:last-child{border-bottom:none}
        .t-id{font-family:monospace;color:var(--text-muted)}.t-total{font-weight:600;color:var(--accent-primary)}
        .t-status{font-size:.75rem;font-weight:500;text-transform:capitalize}.t-time{font-size:.75rem;color:var(--text-muted)}
        .user-list{display:flex;flex-direction:column;gap:.5rem}
        .user-row{display:flex;align-items:center;gap:.75rem;padding:.75rem;border-radius:.75rem;transition:background .2s}
        .user-row:hover{background:var(--bg-glass)}
        .u-avatar{width:36px;height:36px;border-radius:10px;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:.875rem;flex-shrink:0}
        .u-info{flex:1;display:flex;flex-direction:column}.u-name{font-weight:500;font-size:.875rem}.u-email{font-size:.75rem;color:var(--text-muted)}
        .u-stats{text-align:right;display:flex;flex-direction:column}.u-stats span{font-size:.75rem;color:var(--text-secondary)}
        .u-time{font-size:.75rem;color:var(--text-muted);min-width:50px;text-align:right}
        @media(max-width:1024px){.stats-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:640px){.stats-grid{grid-template-columns:1fr}.t-head,.t-row{grid-template-columns:.5fr 1fr 1fr .8fr;}.t-head span:nth-child(n+5),.t-row span:nth-child(n+5){display:none}}
      `}</style>
        </div>
    );
}
