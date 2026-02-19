"use client";

import React from "react";
import { Shield, Zap, Lock, Globe, Wallet, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
    {
        icon: <Shield size={28} />,
        title: "Secure & Transparent",
        description: "Swap directly with verified peers — fully on-chain with smart contract escrow protection.",
        color: "var(--accent-primary)",
        bg: "var(--accent-primary-dim)",
    },
    {
        icon: <Lock size={28} />,
        title: "Privacy First",
        description: "Your identity stays private. No unnecessary KYC data shared with third parties.",
        color: "var(--accent-secondary)",
        bg: "var(--accent-secondary-dim)",
    },
    {
        icon: <Zap size={28} />,
        title: "Blazing Fast",
        description: "Complete trades in under 2 minutes. Near-instant settlements powered by Polygon network.",
        color: "var(--warning)",
        bg: "var(--warning-dim)",
    },
    {
        icon: <Globe size={28} />,
        title: "Decentralized",
        description: "No central authority controls your transactions. You retain absolute ownership of your assets.",
        color: "var(--info)",
        bg: "var(--info-dim)",
    },
    {
        icon: <Wallet size={28} />,
        title: "Built-in Wallet",
        description: "No MetaMask or external wallet needed. Sign up with email or phone — wallet is auto-created.",
        color: "var(--success)",
        bg: "var(--success-dim)",
    },
    {
        icon: <Users size={28} />,
        title: "Indian Payment Methods",
        description: "Pay with UPI, IMPS, NEFT, Google Pay, PhonePe, Paytm — whatever works for you.",
        color: "var(--danger)",
        bg: "var(--danger-dim)",
    },
];

export function Features() {
    return (
        <section id="features" className="features-section">
            <div className="container">
                <div className="section-header animate-fadeIn">
                    <span className="section-badge">Features</span>
                    <h2 className="section-title">
                        Why Choose <span className="gradient-text">P2P.exchange</span>
                    </h2>
                    <p className="section-subtitle">
                        Built for Indian traders who want fast, secure, and hassle-free USDT trading.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, i) => (
                        <Card key={i} hover glow className="feature-card animate-fadeInUp" padding="lg">
                            <div className="feature-icon" style={{ background: feature.bg, color: feature.color }}>
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .features-section {
          padding: 6rem 0;
          position: relative;
        }
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-badge {
          display: inline-block;
          padding: 0.375rem 1rem;
          background: var(--accent-primary-dim);
          color: var(--accent-primary);
          border-radius: 999px;
          font-size: 0.8125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }
        .section-title {
          font-size: var(--font-size-4xl);
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .section-subtitle {
          color: var(--text-secondary);
          font-size: var(--font-size-lg);
          max-width: 500px;
          margin: 0 auto;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .feature-card {
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
        }
        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }
        .feature-card:nth-child(5) { animation-delay: 0.5s; }
        .feature-card:nth-child(6) { animation-delay: 0.6s; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
          .features-section {
            padding: 4rem 0;
          }
        }
      `}</style>

            <style jsx global>{`
        .feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .feature-desc {
          color: var(--text-secondary);
          font-size: 0.9375rem;
          line-height: 1.6;
        }
      `}</style>
        </section>
    );
}
