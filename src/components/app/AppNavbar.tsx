"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Zap, Home, ShoppingCart, Store, PlusCircle,
    History, User, Menu, X, LogOut,
} from "lucide-react";
import { ConnectButton, useActiveAccount, useDisconnect } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { client } from "@/lib/thirdweb";
import { SUPPORTED_CHAIN } from "@/lib/constants";

const wallets = [
    inAppWallet({
        auth: {
            options: ["email", "phone", "google", "apple"],
        },
    }),
];

const navItems = [
    { href: "/app", icon: <Home size={20} />, label: "Dashboard" },
    { href: "/app/buy", icon: <ShoppingCart size={20} />, label: "Buy USDT" },
    { href: "/app/sell", icon: <Store size={20} />, label: "Sell USDT" },
    { href: "/app/create-order", icon: <PlusCircle size={20} />, label: "Create Order" },
    { href: "/app/orders", icon: <History size={20} />, label: "My Orders" },
    { href: "/app/profile", icon: <User size={20} />, label: "Profile" },
];

export function AppNavbar() {
    const pathname = usePathname();
    const account = useActiveAccount();
    const { disconnect } = useDisconnect();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Top Bar */}
            <header className="topbar">
                <div className="topbar-inner">
                    <div className="topbar-left">
                        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Menu size={22} />
                        </button>
                        <Link href="/" className="topbar-logo">
                            <div className="logo-icon"><Zap size={16} /></div>
                            <span>P2P<span className="gradient-text">.exchange</span></span>
                        </Link>
                    </div>
                    <div className="topbar-right">
                        <ConnectButton
                            client={client}
                            wallets={wallets}
                            chain={SUPPORTED_CHAIN}
                            connectModal={{
                                title: "P2P.exchange Login",
                                size: "compact",
                            }}
                            theme="dark"
                        />
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
                <div className="sidebar-header">
                    <Link href="/" className="sidebar-logo">
                        <div className="logo-icon"><Zap size={18} /></div>
                        <span>P2P<span className="gradient-text">.exchange</span></span>
                    </Link>
                    <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`sidebar-link ${pathname === item.href ? "active" : ""}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    {account && (
                        <div className="sidebar-wallet">
                            <div className="wallet-dot" />
                            <span className="wallet-addr">
                                {account.address.slice(0, 6)}...{account.address.slice(-4)}
                            </span>
                        </div>
                    )}
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

            <style jsx>{`
        .topbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: rgba(10, 10, 15, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          z-index: var(--z-sticky);
        }
        .topbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          padding: 0 1.5rem;
        }
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .sidebar-toggle {
          display: none;
          background: transparent;
          color: var(--text-secondary);
          padding: 0.25rem;
        }
        .topbar-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          text-decoration: none;
          color: var(--text-primary);
        }
        .logo-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 260px;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          z-index: calc(var(--z-sticky) + 10);
          display: flex;
          flex-direction: column;
          transition: transform 300ms ease;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          height: 64px;
          border-bottom: 1px solid var(--border-color);
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          text-decoration: none;
          color: var(--text-primary);
        }
        .sidebar-close {
          display: none;
          background: transparent;
          color: var(--text-secondary);
          padding: 0.25rem;
        }
        .sidebar-nav {
          flex: 1;
          padding: 1rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          transition: all 200ms ease;
        }
        .sidebar-link:hover {
          background: var(--bg-glass);
          color: var(--text-primary);
        }
        .sidebar-link.active {
          background: var(--accent-primary-dim);
          color: var(--accent-primary);
        }
        .sidebar-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid var(--border-color);
        }
        .sidebar-wallet {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--text-tertiary);
        }
        .wallet-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--success);
          box-shadow: 0 0 8px var(--success);
        }
        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: calc(var(--z-sticky) + 5);
        }

        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar-open {
            transform: translateX(0);
          }
          .sidebar-toggle { display: flex; }
          .sidebar-close { display: flex; }
          .sidebar-overlay { display: block; }
          .topbar-logo { display: flex; }
        }

        @media (min-width: 1025px) {
          .topbar {
            left: 260px;
          }
          .topbar-logo { display: none; }
        }
      `}</style>
        </>
    );
}
