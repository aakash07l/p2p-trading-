"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Users, ShoppingBag, ArrowLeftRight,
    Settings, Shield, X, Menu, LogOut, Zap, ChevronLeft,
} from "lucide-react";

const adminNav = [
    { href: "/admin", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { href: "/admin/users", icon: <Users size={20} />, label: "Users" },
    { href: "/admin/orders", icon: <ShoppingBag size={20} />, label: "Orders" },
    { href: "/admin/trades", icon: <ArrowLeftRight size={20} />, label: "Trades" },
    { href: "/admin/settings", icon: <Settings size={20} />, label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-root">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-head">
                    <Link href="/admin" className="admin-logo">
                        <div className="logo-ic"><Shield size={18} /></div>
                        <span>Admin<span className="accent">Panel</span></span>
                    </Link>
                    <button className="mob-close" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
                </div>

                <nav className="sidebar-links">
                    {adminNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-link ${pathname === item.href ? "active" : ""}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            {item.icon}<span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-bottom">
                    <Link href="/app" className="nav-link back-link">
                        <ChevronLeft size={18} /><span>Back to App</span>
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <div className="admin-main">
                <header className="admin-topbar">
                    <button className="mob-toggle" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
                    <div className="topbar-title">
                        <Shield size={18} style={{ color: "var(--danger)" }} />
                        <span>Admin Panel</span>
                    </div>
                    <div className="topbar-right">
                        <span className="admin-badge">ADMIN</span>
                    </div>
                </header>
                <main className="admin-content">{children}</main>
            </div>

            {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

            <style jsx>{`
        .admin-root{display:flex;min-height:100vh;background:var(--bg-primary)}
        .admin-sidebar{width:260px;background:var(--bg-secondary);border-right:1px solid var(--border-color);display:flex;flex-direction:column;position:fixed;top:0;bottom:0;left:0;z-index:200;transition:transform .3s}
        .sidebar-head{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;height:64px;border-bottom:1px solid var(--border-color)}
        .admin-logo{display:flex;align-items:center;gap:.5rem;font-size:1.125rem;font-weight:700;text-decoration:none;color:var(--text-primary)}
        .logo-ic{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#ff4466,#ff6b00);display:flex;align-items:center;justify-content:center;color:#fff}
        .accent{color:var(--danger)}
        .mob-close{display:none;background:transparent;color:var(--text-secondary);padding:.25rem}
        .sidebar-links{flex:1;padding:1rem .75rem;display:flex;flex-direction:column;gap:.25rem}
        .nav-link{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;border-radius:.75rem;color:var(--text-secondary);text-decoration:none;font-size:.9375rem;font-weight:500;transition:all .2s}
        .nav-link:hover{background:var(--bg-glass);color:var(--text-primary)}
        .nav-link.active{background:rgba(255,68,102,.12);color:var(--danger)}
        .sidebar-bottom{padding:1rem 1.25rem;border-top:1px solid var(--border-color)}
        .back-link{font-size:.8125rem;color:var(--text-tertiary)}
        .admin-main{flex:1;margin-left:260px;display:flex;flex-direction:column}
        .admin-topbar{height:64px;border-bottom:1px solid var(--border-color);display:flex;align-items:center;justify-content:space-between;padding:0 1.5rem;background:rgba(10,10,15,.9);backdrop-filter:blur(20px);position:sticky;top:0;z-index:100}
        .mob-toggle{display:none;background:transparent;color:var(--text-secondary);padding:.25rem}
        .topbar-title{display:flex;align-items:center;gap:.5rem;font-weight:600}
        .admin-badge{font-size:.6875rem;font-weight:700;padding:.25rem .75rem;border-radius:999px;background:var(--danger-dim);color:var(--danger);letter-spacing:.05em;text-transform:uppercase}
        .admin-content{flex:1;padding:2rem;max-width:1200px;width:100%}
        .overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:150}
        @media(max-width:1024px){
          .admin-sidebar{transform:translateX(-100%)}.admin-sidebar.open{transform:translateX(0)}
          .mob-close,.mob-toggle{display:flex}.overlay{display:block}
          .admin-main{margin-left:0}
        }
        @media(max-width:640px){.admin-content{padding:1rem}}
      `}</style>
        </div>
    );
}
