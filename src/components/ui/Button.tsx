"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    children,
    className = "",
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${fullWidth ? "btn-full" : ""} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className="spinner" />}
            {children}

            <style jsx>{`
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
          border-radius: 0.75rem;
          transition: all 250ms ease;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
        .btn-md {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        }
        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }
        .btn-full {
          width: 100%;
        }
        .btn-primary {
          background: var(--gradient-primary);
          color: white;
          border: none;
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 212, 170, 0.3);
        }
        .btn-secondary {
          background: var(--accent-secondary);
          color: white;
          border: none;
        }
        .btn-secondary:hover:not(:disabled) {
          background: var(--accent-secondary-hover);
          transform: translateY(-2px);
        }
        .btn-outline {
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }
        .btn-outline:hover:not(:disabled) {
          background: var(--bg-glass);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }
        .btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: none;
        }
        .btn-ghost:hover:not(:disabled) {
          background: var(--bg-glass);
          color: var(--text-primary);
        }
        .btn-danger {
          background: var(--danger);
          color: white;
          border: none;
        }
        .btn-danger:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </button>
    );
}
