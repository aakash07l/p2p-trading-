"use client";

import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    padding?: "sm" | "md" | "lg";
    onClick?: () => void;
}

export function Card({
    children,
    className = "",
    hover = false,
    glow = false,
    padding = "md",
    onClick,
}: CardProps) {
    return (
        <div
            className={`card card-${padding} ${hover ? "card-hover" : ""} ${glow ? "card-glow" : ""} ${onClick ? "card-clickable" : ""} ${className}`}
            onClick={onClick}
        >
            {children}

            <style jsx>{`
        .card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          transition: all 250ms ease;
        }
        .card-sm { padding: 1rem; }
        .card-md { padding: 1.5rem; }
        .card-lg { padding: 2rem; }
        .card-hover:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-color-hover);
          transform: translateY(-2px);
        }
        .card-glow:hover {
          box-shadow: var(--shadow-glow);
        }
        .card-clickable {
          cursor: pointer;
        }
      `}</style>
        </div>
    );
}
