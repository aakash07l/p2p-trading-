"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star, Clock } from "lucide-react";
import type { Order } from "@/types";
import { formatINR, formatUSDT, timeAgo, getCompletionRate } from "@/lib/utils";
import { PAYMENT_METHODS } from "@/lib/constants";

interface OrderCardProps {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    const completionRate = getCompletionRate(order.completedTrades, order.totalTrades);

    const getPaymentLabel = (id: string) => {
        const pm = PAYMENT_METHODS.find((p) => p.id === id);
        return pm ? `${pm.icon} ${pm.label}` : id;
    };

    return (
        <div className="order-card">
            <div className="order-top">
                <div className="order-user">
                    <div className="user-avatar">
                        {order.userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{order.userName}</span>
                        <span className="user-stats">
                            {order.completedTrades} trades • {completionRate}% completion
                        </span>
                    </div>
                </div>
                <div className={`order-type-badge ${order.type}`}>
                    {order.type === "buy" ? "Buying" : "Selling"}
                </div>
            </div>

            <div className="order-details">
                <div className="detail-row">
                    <span className="detail-label">Price</span>
                    <span className="detail-value price">{formatINR(order.price)}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Amount</span>
                    <span className="detail-value">{formatUSDT(order.amount)}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Limit</span>
                    <span className="detail-value">
                        {formatINR(order.minLimit)} - {formatINR(order.maxLimit)}
                    </span>
                </div>
            </div>

            <div className="order-payments">
                {order.paymentMethods.map((pm) => (
                    <span key={pm} className="payment-tag">{getPaymentLabel(pm)}</span>
                ))}
            </div>

            <div className="order-bottom">
                <span className="order-time">
                    <Clock size={12} />
                    {timeAgo(order.createdAt)}
                </span>
                <Link href={`/app/trade/${order.id}`} className="trade-btn">
                    {order.type === "sell" ? "Buy" : "Sell"} USDT <ArrowRight size={16} />
                </Link>
            </div>

            <style jsx>{`
        .order-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 1.25rem;
          transition: all 250ms ease;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .order-card:hover {
          border-color: var(--border-color-hover);
          background: var(--bg-card-hover);
          transform: translateY(-2px);
        }
        .order-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .order-user {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          color: white;
        }
        .user-name {
          font-weight: 600;
          font-size: 0.9375rem;
        }
        .user-stats {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }
        .user-info {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }
        .order-type-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .order-type-badge.buy {
          background: var(--success-dim);
          color: var(--success);
        }
        .order-type-badge.sell {
          background: var(--danger-dim);
          color: var(--danger);
        }
        .order-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem;
          background: var(--bg-glass);
          border-radius: 0.75rem;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .detail-label {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
        }
        .detail-value {
          font-size: 0.875rem;
          font-weight: 500;
        }
        .detail-value.price {
          color: var(--accent-primary);
          font-weight: 700;
          font-size: 1rem;
        }
        .order-payments {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }
        .payment-tag {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-color);
          border-radius: 0.375rem;
          color: var(--text-secondary);
        }
        .order-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-color);
        }
        .order-time {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .trade-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          background: var(--gradient-primary);
          color: white;
          border-radius: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 200ms ease;
        }
        .trade-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0, 212, 170, 0.3);
        }
      `}</style>
        </div>
    );
}
