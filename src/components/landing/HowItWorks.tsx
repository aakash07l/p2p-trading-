"use client";

import React from "react";
import { UserPlus, Search, CreditCard, CheckCircle } from "lucide-react";

const steps = [
    {
        icon: <UserPlus size={24} />,
        step: "01",
        title: "Sign Up Instantly",
        description: "Create an account with your email or phone. Your crypto wallet is created automatically — no MetaMask needed.",
    },
    {
        icon: <Search size={24} />,
        step: "02",
        title: "Find or Create an Order",
        description: "Browse available buy/sell offers or create your own. Set your price, amount, and preferred payment method.",
    },
    {
        icon: <CreditCard size={24} />,
        step: "03",
        title: "Make Payment",
        description: "Pay via UPI, IMPS, bank transfer, or other Indian payment methods. USDT is held in escrow during the trade.",
    },
    {
        icon: <CheckCircle size={24} />,
        step: "04",
        title: "Receive Your Crypto/INR",
        description: "Once payment is confirmed, USDT is released to the buyer. Fast, secure, and fully transparent.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="hiw-section">
            <div className="container">
                <div className="section-header" style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <span className="hiw-badge">How It Works</span>
                    <h2 className="hiw-title">
                        Get Started in <span className="gradient-text">4 Simple Steps</span>
                    </h2>
                    <p className="hiw-subtitle">
                        From sign-up to your first trade — it takes less than 5 minutes.
                    </p>
                </div>

                <div className="hiw-timeline">
                    {steps.map((step, i) => (
                        <div key={i} className="hiw-step" style={{ animationDelay: `${i * 0.15}s` }}>
                            <div className="hiw-step-number">
                                <span className="step-num">{step.step}</span>
                                <div className="step-icon">{step.icon}</div>
                            </div>
                            <div className="hiw-step-content">
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                            {i < steps.length - 1 && <div className="hiw-connector" />}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .hiw-section {
          padding: 6rem 0;
          position: relative;
        }
        .hiw-badge {
          display: inline-block;
          padding: 0.375rem 1rem;
          background: var(--accent-secondary-dim);
          color: var(--accent-secondary);
          border-radius: 999px;
          font-size: 0.8125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }
        .hiw-title {
          font-size: var(--font-size-4xl);
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .hiw-subtitle {
          color: var(--text-secondary);
          font-size: var(--font-size-lg);
        }
        .hiw-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 700px;
          margin: 0 auto;
        }
        .hiw-step {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          position: relative;
          padding-bottom: 3rem;
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hiw-step-number {
          position: relative;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .step-num {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.1em;
        }
        .step-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: var(--shadow-glow);
        }
        .hiw-connector {
          position: absolute;
          left: 27px;
          top: 90px;
          width: 2px;
          height: calc(100% - 90px);
          background: linear-gradient(to bottom, var(--accent-primary), transparent);
          opacity: 0.3;
        }
        .hiw-step-content {
          padding-top: 1.25rem;
        }
        .hiw-step-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .hiw-step-content p {
          color: var(--text-secondary);
          font-size: 0.9375rem;
          line-height: 1.6;
        }
        @media (max-width: 640px) {
          .hiw-section { padding: 4rem 0; }
          .hiw-step { gap: 1rem; }
        }
      `}</style>
        </section>
    );
}
