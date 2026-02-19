"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import {
    TrendingUp, TrendingDown, ArrowRight,
    ShoppingCart, Store, Activity, Clock,
} from "lucide-react";
import { AppNavbar } from "@/components/app/AppNavbar";
import { WalletInfo } from "@/components/app/WalletInfo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { DEFAULT_USDT_INR_RATE } from "@/lib/constants";

export default function AppDashboard() {
    const account = useActiveAccount();
    const [price, setPrice] = useState(DEFAULT_USDT_INR_RATE);
    const [priceChange] = useState(0.45);

    return (
        <>
            <AppNavbar />
            <div className="app-page">
                <div className="app-content">
                    <div className="page-header">
                        <div>
                            <h1 className="page-title">Dashboard</h1>
                            <p className="page-subtitle">Welcome to P2P.exchange — Your gateway to USDT ↔ INR trading</p>
                        </div>
                    </div>

                    {/* Price Banner */}
                    <Card className="price-banner" padding="lg">
                        <div className="price-main">
                            <div className="price-label">USDT / INR</div>
                            <div className="price-value">{formatINR(price)}</div>
                            <div className={`price-change ${priceChange >= 0 ? "positive" : "negative"}`}>
                                {priceChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                {priceChange >= 0 ? "+" : ""}{priceChange}%
                            </div>
                        </div>
                        <div className="price-actions">
                            <Link href="/app/buy">
                                <Button variant="primary" size="lg">
                                    <ShoppingCart size={18} /> Buy USDT
                                </Button>
                            </Link>
                            <Link href="/app/sell">
                                <Button variant="outline" size="lg">
                                    <Store size={18} /> Sell USDT
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Stats Grid */}
                    <div className="stats-grid">
                        <Card padding="md" hover>
                            <div className="stat-icon" style={{ background: "var(--accent-primary-dim)", color: "var(--accent-primary)" }}>
                                <Activity size={22} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-label">Total Volume</span>
                                <span className="stat-val">{formatINR(1250000)}</span>
                            </div>
                        </Card>
                        <Card padding="md" hover>
                            <div className="stat-icon" style={{ background: "var(--success-dim)", color: "var(--success)" }}>
                                <ShoppingCart size={22} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-label">Active Buy Orders</span>
                                <span className="stat-val">24</span>
                            </div>
                        </Card>
                        <Card padding="md" hover>
                            <div className="stat-icon" style={{ background: "var(--warning-dim)", color: "var(--warning)" }}>
                                <Store size={22} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-label">Active Sell Orders</span>
                                <span className="stat-val">18</span>
                            </div>
                        </Card>
                        <Card padding="md" hover>
                            <div className="stat-icon" style={{ background: "var(--info-dim)", color: "var(--info)" }}>
                                <Clock size={22} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-label">Avg. Completion</span>
                                <span className="stat-val">1.8 min</span>
                            </div>
                        </Card>
                    </div>

                    {/* Wallet Info */}
                    <div className="section">
                        <h2 className="section-title">Your Wallet</h2>
                        <WalletInfo />
                    </div>

                    {/* Quick Actions */}
                    <div className="section">
                        <h2 className="section-title">Quick Actions</h2>
                        <div className="quick-actions">
                            <Link href="/app/create-order" className="action-card">
                                <Card hover glow padding="md">
                                    <div className="action-inner">
                                        <div className="action-icon" style={{ background: "var(--accent-primary-dim)" }}>
                                            <ShoppingCart size={24} style={{ color: "var(--accent-primary)" }} />
                                        </div>
                                        <div>
                                            <h3>Create Buy Order</h3>
                                            <p>Set your price and wait for sellers</p>
                                        </div>
                                        <ArrowRight size={18} className="action-arrow" />
                                    </div>
                                </Card>
                            </Link>
                            <Link href="/app/create-order" className="action-card">
                                <Card hover glow padding="md">
                                    <div className="action-inner">
                                        <div className="action-icon" style={{ background: "var(--accent-secondary-dim)" }}>
                                            <Store size={24} style={{ color: "var(--accent-secondary)" }} />
                                        </div>
                                        <div>
                                            <h3>Create Sell Order</h3>
                                            <p>Offer your USDT to buyers</p>
                                        </div>
                                        <ArrowRight size={18} className="action-arrow" />
                                    </div>
                                </Card>
                            </Link>
                        </div>
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
          max-width: 1100px;
        }
        .page-header {
          margin-bottom: 2rem;
        }
        .page-title {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .page-subtitle {
          color: var(--text-tertiary);
          font-size: 0.9375rem;
          margin-top: 0.25rem;
        }
        .price-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--gradient-card) !important;
          margin-bottom: 1.5rem;
        }
        .price-label {
          font-size: 0.875rem;
          color: var(--text-tertiary);
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        .price-value {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .price-change {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          margin-top: 0.25rem;
        }
        .price-change.positive { color: var(--success); }
        .price-change.negative { color: var(--danger); }
        .price-actions {
          display: flex;
          gap: 0.75rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }
        .stat-label {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
        }
        .stat-val {
          font-size: 1.25rem;
          font-weight: 700;
          display: block;
          margin-top: 0.125rem;
        }
        .section {
          margin-bottom: 2rem;
        }
        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .quick-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .action-card {
          text-decoration: none;
          color: inherit;
        }
        .action-inner {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .action-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .action-inner h3 {
          font-size: 0.9375rem;
          font-weight: 600;
        }
        .action-inner p {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
        }
        @media (max-width: 1024px) {
          .app-content { margin-left: 0; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .price-banner { flex-direction: column; gap: 1.5rem; align-items: flex-start; }
        }
        @media (max-width: 640px) {
          .app-content { padding: 1rem; }
          .stats-grid { grid-template-columns: 1fr; }
          .quick-actions { grid-template-columns: 1fr; }
          .price-value { font-size: 2rem; }
        }
      `}</style>
        </>
    );
}
