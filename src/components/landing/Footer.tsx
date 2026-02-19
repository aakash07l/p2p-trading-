"use client";

import React from "react";
import Link from "next/link";
import { Zap, Twitter, Github, MessageCircle, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Link href="/" className="footer-logo">
                            <div className="logo-icon"><Zap size={18} /></div>
                            <span>P2P<span className="gradient-text">.exchange</span></span>
                        </Link>
                        <p className="footer-desc">
                            The fastest and most secure way to swap USDT ↔ INR directly with verified peers.
                        </p>
                        <div className="footer-socials">
                            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
                            <a href="#" aria-label="GitHub"><Github size={18} /></a>
                            <a href="#" aria-label="Telegram"><MessageCircle size={18} /></a>
                            <a href="#" aria-label="Email"><Mail size={18} /></a>
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <h4>Product</h4>
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                        <Link href="/app">Open App</Link>
                        <a href="#faq">FAQ</a>
                    </div>

                    <div className="footer-links-group">
                        <h4>Resources</h4>
                        <a href="#">Documentation</a>
                        <a href="#">API</a>
                        <a href="#">Status</a>
                        <a href="#">Blog</a>
                    </div>

                    <div className="footer-links-group">
                        <h4>Legal</h4>
                        <a href="#">Terms of Service</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">AML Policy</a>
                        <a href="#">Compliance</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 P2P.exchange — All Rights Reserved.</p>
                    <p className="footer-note">Built on Polygon • Powered by Thirdweb</p>
                </div>
            </div>

            <style jsx>{`
        .footer {
          padding: 4rem 0 0;
          border-top: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }
        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 3rem;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .footer-logo {
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
        .footer-desc {
          color: var(--text-tertiary);
          font-size: 0.875rem;
          line-height: 1.6;
          max-width: 300px;
        }
        .footer-socials {
          display: flex;
          gap: 0.75rem;
        }
        .footer-socials a {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--bg-glass);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          text-decoration: none;
          transition: all 200ms ease;
        }
        .footer-socials a:hover {
          background: var(--accent-primary-dim);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }
        .footer-links-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-links-group h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .footer-links-group a {
          color: var(--text-tertiary);
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 200ms ease;
        }
        .footer-links-group a:hover {
          color: var(--text-primary);
        }
        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding: 1.5rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8125rem;
          color: var(--text-muted);
        }
        .footer-note {
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .footer-brand {
            grid-column: span 2;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .footer-top {
            grid-template-columns: 1fr;
          }
          .footer-brand {
            grid-column: span 1;
          }
        }
      `}</style>
        </footer>
    );
}
