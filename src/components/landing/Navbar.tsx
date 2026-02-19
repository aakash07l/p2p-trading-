"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
            <div className="navbar-inner container-wide">
                <Link href="/" className="navbar-logo">
                    <div className="logo-icon">
                        <Zap size={20} />
                    </div>
                    <span className="logo-text">P2P<span className="gradient-text">.exchange</span></span>
                </Link>

                <div className="navbar-links">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#faq">FAQ</a>
                </div>

                <div className="navbar-actions">
                    <Link href="/app">
                        <Button variant="primary" size="sm">Open App</Button>
                    </Link>
                </div>

                <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {mobileOpen && (
                <div className="mobile-menu">
                    <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
                    <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How It Works</a>
                    <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
                    <Link href="/app" onClick={() => setMobileOpen(false)}>
                        <Button variant="primary" fullWidth>Open App</Button>
                    </Link>
                </div>
            )}

            <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-sticky);
          transition: all 300ms ease;
          padding: 1rem 0;
        }
        .navbar-scrolled {
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          padding: 0.75rem 0;
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 700;
          text-decoration: none;
          color: var(--text-primary);
        }
        .logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .logo-text {
          letter-spacing: -0.02em;
        }
        .navbar-links {
          display: flex;
          gap: 2rem;
        }
        .navbar-links a {
          color: var(--text-secondary);
          font-size: 0.9375rem;
          font-weight: 500;
          transition: color 200ms ease;
          text-decoration: none;
        }
        .navbar-links a:hover {
          color: var(--text-primary);
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .mobile-toggle {
          display: none;
          background: transparent;
          color: var(--text-primary);
          padding: 0.5rem;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          animation: slideDown 0.3s ease;
        }
        .mobile-menu a {
          color: var(--text-secondary);
          font-size: 1rem;
          padding: 0.5rem 0;
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .navbar-links, .navbar-actions { display: none; }
          .mobile-toggle { display: flex; }
          .mobile-menu { display: flex; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </nav>
    );
}
