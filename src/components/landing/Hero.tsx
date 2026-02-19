"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
    return (
        <section className="hero">
            {/* Animated background elements */}
            <div className="hero-bg">
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />
                <div className="hero-orb hero-orb-3" />
                <div className="hero-grid" />
            </div>

            <div className="hero-content container">
                <div className="hero-badge animate-fadeIn">
                    <Shield size={14} />
                    <span>Secure P2P Trading Platform</span>
                </div>

                <h1 className="hero-title animate-fadeIn" style={{ animationDelay: "0.1s" }}>
                    Swap <span className="gradient-text">USDT ↔ INR</span><br />
                    Instantly & Securely
                </h1>

                <p className="hero-subtitle animate-fadeIn" style={{ animationDelay: "0.2s" }}>
                    Trade USDT directly with verified peers using UPI, IMPS, or bank transfer.
                    No bank freeze worries. Embedded wallet — no MetaMask needed.
                </p>

                <div className="hero-actions animate-fadeIn" style={{ animationDelay: "0.3s" }}>
                    <Link href="/app">
                        <Button variant="primary" size="lg">
                            Start Trading <ArrowRight size={18} />
                        </Button>
                    </Link>
                    <a href="#how-it-works">
                        <Button variant="outline" size="lg">
                            How It Works
                        </Button>
                    </a>
                </div>

                <div className="hero-stats animate-fadeIn" style={{ animationDelay: "0.4s" }}>
                    <div className="stat">
                        <div className="stat-value">₹50Cr+</div>
                        <div className="stat-label">Trading Volume</div>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat">
                        <div className="stat-value">10K+</div>
                        <div className="stat-label">Active Traders</div>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat">
                        <div className="stat-value">&lt;2min</div>
                        <div className="stat-label">Avg. Trade Time</div>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat">
                        <div className="stat-value">
                            <TrendingUp size={16} style={{ display: "inline", marginRight: 4 }} />
                            ₹85.50
                        </div>
                        <div className="stat-label">USDT/INR Rate</div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 8rem 0 4rem;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }
        .hero-orb-1 {
          width: 600px;
          height: 600px;
          background: rgba(0, 212, 170, 0.15);
          top: -200px;
          right: -100px;
          animation: float 8s ease-in-out infinite;
        }
        .hero-orb-2 {
          width: 400px;
          height: 400px;
          background: rgba(124, 92, 255, 0.15);
          bottom: -100px;
          left: -100px;
          animation: float 10s ease-in-out infinite reverse;
        }
        .hero-orb-3 {
          width: 300px;
          height: 300px;
          background: rgba(0, 212, 170, 0.1);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: float 6s ease-in-out infinite;
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
        }
        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--accent-primary-dim);
          border: 1px solid rgba(0, 212, 170, 0.2);
          border-radius: 999px;
          color: var(--accent-primary);
          font-size: 0.875rem;
          font-weight: 500;
        }
        .hero-title {
          font-size: var(--font-size-6xl);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          max-width: 800px;
        }
        .hero-subtitle {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.7;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-top: 3rem;
          padding: 1.5rem 2.5rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .stat {
          text-align: center;
        }
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-label {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
          margin-top: 0.25rem;
        }
        .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--border-color);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @media (max-width: 768px) {
          .hero { padding: 7rem 0 3rem; }
          .hero-stats {
            flex-wrap: wrap;
            gap: 1.5rem;
            padding: 1.25rem 1.5rem;
          }
          .stat-divider { display: none; }
          .hero-actions { flex-direction: column; width: 100%; }
        }
      `}</style>
        </section>
    );
}
