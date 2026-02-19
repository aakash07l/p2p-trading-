"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    ArrowLeft, Clock, Shield, CheckCircle,
    AlertTriangle, Send, Copy, Info,
} from "lucide-react";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import { AppNavbar } from "@/components/app/AppNavbar";
import { TradeChat } from "@/components/app/TradeChat";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatINR, formatUSDT, generateId } from "@/lib/utils";
import type { Trade, ChatMessage } from "@/types";

export default function TradePage() {
    const params = useParams();
    const account = useActiveAccount();
    const userAddress = account?.address || "0xYourWallet";

    const [trade, setTrade] = useState<Trade>({
        id: params.id as string,
        orderId: "s1",
        buyerAddress: userAddress,
        sellerAddress: "0x1234...abcd",
        buyerName: "You",
        sellerName: "CryptoKing",
        amount: 500,
        totalINR: 42750,
        price: 85.5,
        paymentMethod: "upi",
        status: "pending",
        messages: [
            {
                id: "sys1",
                sender: "system",
                senderName: "System",
                message: "Trade initiated. Buyer should send ₹42,750 via UPI to the seller.",
                timestamp: new Date().toISOString(),
                type: "system",
            },
            {
                id: "msg1",
                sender: "0x1234...abcd",
                senderName: "CryptoKing",
                message: "Hi! Please send the payment to my UPI ID: crypto@upi. Let me know once done!",
                timestamp: new Date().toISOString(),
                type: "text",
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 1800000).toISOString(), // 30 min
    });

    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();
            const expires = new Date(trade.expiresAt).getTime();
            const diff = expires - now;
            if (diff <= 0) {
                setTimeLeft("Expired");
                clearInterval(timer);
            } else {
                const mins = Math.floor(diff / 60000);
                const secs = Math.floor((diff % 60000) / 1000);
                setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [trade.expiresAt]);

    const handleSendMessage = (message: string) => {
        const newMsg: ChatMessage = {
            id: generateId(),
            sender: userAddress,
            senderName: "You",
            message,
            timestamp: new Date().toISOString(),
            type: "text",
        };
        setTrade((prev) => ({
            ...prev,
            messages: [...prev.messages, newMsg],
        }));
    };

    const handlePaymentSent = () => {
        setTrade((prev) => ({
            ...prev,
            status: "payment_sent",
            messages: [
                ...prev.messages,
                {
                    id: generateId(),
                    sender: "system",
                    senderName: "System",
                    message: "Buyer marked payment as sent. Waiting for seller confirmation.",
                    timestamp: new Date().toISOString(),
                    type: "system",
                },
            ],
        }));
    };

    const handleRelease = () => {
        setTrade((prev) => ({
            ...prev,
            status: "released",
            messages: [
                ...prev.messages,
                {
                    id: generateId(),
                    sender: "system",
                    senderName: "System",
                    message: "✅ USDT released! Trade completed successfully.",
                    timestamp: new Date().toISOString(),
                    type: "system",
                },
            ],
        }));
    };

    const getStatusInfo = () => {
        switch (trade.status) {
            case "pending":
                return { label: "Awaiting Payment", color: "var(--warning)", bg: "var(--warning-dim)", icon: <Clock size={16} /> };
            case "payment_sent":
                return { label: "Payment Sent", color: "var(--info)", bg: "var(--info-dim)", icon: <Send size={16} /> };
            case "payment_confirmed":
                return { label: "Payment Confirmed", color: "var(--accent-primary)", bg: "var(--accent-primary-dim)", icon: <CheckCircle size={16} /> };
            case "released":
                return { label: "Completed", color: "var(--success)", bg: "var(--success-dim)", icon: <CheckCircle size={16} /> };
            case "disputed":
                return { label: "Disputed", color: "var(--danger)", bg: "var(--danger-dim)", icon: <AlertTriangle size={16} /> };
            default:
                return { label: "Unknown", color: "var(--text-tertiary)", bg: "var(--bg-glass)", icon: <Info size={16} /> };
        }
    };

    const status = getStatusInfo();

    return (
        <>
            <AppNavbar />
            <div className="app-page">
                <div className="app-content">
                    <Link href="/app/buy" className="back-link">
                        <ArrowLeft size={18} /> Back to Orders
                    </Link>

                    <div className="trade-header">
                        <h1 className="page-title">Trade #{(params.id as string).slice(0, 6)}</h1>
                        <div className="trade-status" style={{ background: status.bg, color: status.color }}>
                            {status.icon} {status.label}
                        </div>
                    </div>

                    <div className="trade-layout">
                        {/* Trade Details */}
                        <div className="trade-details">
                            <Card padding="md">
                                <h3 className="card-title">Trade Details</h3>
                                <div className="detail-list">
                                    <div className="detail-item">
                                        <span className="detail-label">Amount</span>
                                        <span className="detail-value">{formatUSDT(trade.amount)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Price</span>
                                        <span className="detail-value">{formatINR(trade.price)} / USDT</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Total</span>
                                        <span className="detail-value highlight">{formatINR(trade.totalINR)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Payment</span>
                                        <span className="detail-value">📱 UPI</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Seller</span>
                                        <span className="detail-value">{trade.sellerName}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Time Left</span>
                                        <span className="detail-value timer">{timeLeft}</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Action Buttons */}
                            <div className="trade-actions">
                                {trade.status === "pending" && (
                                    <Button variant="primary" fullWidth size="lg" onClick={handlePaymentSent}>
                                        <Send size={18} /> I Have Sent Payment
                                    </Button>
                                )}
                                {trade.status === "payment_sent" && (
                                    <Button variant="primary" fullWidth size="lg" onClick={handleRelease}>
                                        <CheckCircle size={18} /> Release USDT
                                    </Button>
                                )}
                                {trade.status === "released" && (
                                    <div className="completion-banner">
                                        <CheckCircle size={24} />
                                        <div>
                                            <h4>Trade Completed!</h4>
                                            <p>USDT has been transferred successfully.</p>
                                        </div>
                                    </div>
                                )}
                                {trade.status !== "released" && trade.status !== "disputed" && (
                                    <Button variant="outline" fullWidth>
                                        <AlertTriangle size={16} /> Report Dispute
                                    </Button>
                                )}
                            </div>

                            {/* Security Notice */}
                            <Card padding="sm">
                                <div className="security-notice">
                                    <Shield size={16} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
                                    <p>USDT is held in smart contract escrow until the trade is confirmed by both parties.</p>
                                </div>
                            </Card>
                        </div>

                        {/* Chat */}
                        <div className="trade-chat-wrapper">
                            <h3 className="card-title">Trade Chat</h3>
                            <TradeChat
                                messages={trade.messages}
                                onSend={handleSendMessage}
                                currentUser={userAddress}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .app-page { padding-top: 64px; min-height: 100vh; }
        .app-content { margin-left: 260px; padding: 2rem; max-width: 1100px; }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-tertiary);
          font-size: 0.875rem;
          margin-bottom: 1rem;
          text-decoration: none;
          transition: color 200ms ease;
        }
        .back-link:hover { color: var(--text-primary); }
        .trade-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .page-title { font-size: 1.5rem; font-weight: 700; }
        .trade-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-size: 0.8125rem;
          font-weight: 600;
        }
        .trade-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .trade-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .card-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-secondary);
        }
        .detail-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }
        .detail-item:last-child { border-bottom: none; padding-bottom: 0; }
        .detail-label { font-size: 0.875rem; color: var(--text-tertiary); }
        .detail-value { font-size: 0.9375rem; font-weight: 600; }
        .detail-value.highlight { color: var(--accent-primary); font-size: 1.125rem; }
        .detail-value.timer { color: var(--warning); font-family: monospace; font-size: 1.125rem; }
        .trade-actions { display: flex; flex-direction: column; gap: 0.75rem; }
        .completion-banner {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--success-dim);
          border: 1px solid rgba(0, 214, 143, 0.3);
          border-radius: 0.75rem;
          color: var(--success);
        }
        .completion-banner h4 { font-size: 0.9375rem; font-weight: 600; }
        .completion-banner p { font-size: 0.8125rem; opacity: 0.8; }
        .security-notice {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--text-tertiary);
          line-height: 1.5;
        }
        .trade-chat-wrapper { }
        @media (max-width: 1024px) {
          .app-content { margin-left: 0; }
          .trade-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .app-content { padding: 1rem; }
          .trade-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }
      `}</style>
        </>
    );
}
