"use client";

import React from "react";
import { useActiveAccount } from "thirdweb/react";
import { Wallet, Copy, ExternalLink, Check } from "lucide-react";

export function WalletInfo() {
    const account = useActiveAccount();
    const [copied, setCopied] = React.useState(false);

    const copyAddress = () => {
        if (account?.address) {
            navigator.clipboard.writeText(account.address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!account) {
        return (
            <div className="wallet-info wallet-disconnected">
                <Wallet size={20} />
                <span>Connect wallet to start trading</span>

                <style jsx>{`
          .wallet-info {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 1.25rem;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 1rem;
          }
          .wallet-disconnected {
            color: var(--text-tertiary);
            font-size: 0.875rem;
          }
        `}</style>
            </div>
        );
    }

    return (
        <div className="wallet-info">
            <div className="wallet-header">
                <div className="wallet-status">
                    <div className="status-dot online" />
                    <span>Connected</span>
                </div>
                <span className="wallet-chain">Polygon</span>
            </div>
            <div className="wallet-address-row">
                <code className="wallet-address">
                    {account.address.slice(0, 10)}...{account.address.slice(-8)}
                </code>
                <button className="wallet-action" onClick={copyAddress}>
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
                <a
                    className="wallet-action"
                    href={`https://polygonscan.com/address/${account.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ExternalLink size={14} />
                </a>
            </div>

            <style jsx>{`
        .wallet-info {
          padding: 1rem 1.25rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .wallet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .wallet-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--success);
          font-weight: 500;
        }
        .wallet-chain {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          background: var(--accent-secondary-dim);
          color: var(--accent-secondary);
          border-radius: 999px;
          font-weight: 600;
        }
        .wallet-address-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .wallet-address {
          flex: 1;
          font-size: 0.8125rem;
          color: var(--text-tertiary);
          font-family: monospace;
        }
        .wallet-action {
          background: var(--bg-glass);
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          padding: 0.375rem;
          border-radius: 0.375rem;
          cursor: pointer;
          display: flex;
          transition: all 200ms ease;
          text-decoration: none;
        }
        .wallet-action:hover {
          background: var(--bg-glass-strong);
          color: var(--text-primary);
        }
      `}</style>
        </div>
    );
}
