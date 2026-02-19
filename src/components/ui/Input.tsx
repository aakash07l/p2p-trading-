"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: React.ReactNode;
    suffix?: React.ReactNode;
}

export function Input({
    label,
    error,
    hint,
    icon,
    suffix,
    className = "",
    ...props
}: InputProps) {
    return (
        <div className={`input-wrapper ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <div className={`input-container ${error ? "input-error" : ""}`}>
                {icon && <span className="input-icon">{icon}</span>}
                <input className="input-field" {...props} />
                {suffix && <span className="input-suffix">{suffix}</span>}
            </div>
            {error && <span className="input-error-text">{error}</span>}
            {hint && !error && <span className="input-hint">{hint}</span>}

            <style jsx>{`
        .input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }
        .input-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .input-container {
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          padding: 0 1rem;
          transition: all 250ms ease;
          gap: 0.5rem;
        }
        .input-container:focus-within {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px var(--accent-primary-dim);
        }
        .input-error {
          border-color: var(--danger) !important;
        }
        .input-error:focus-within {
          box-shadow: 0 0 0 3px var(--danger-dim) !important;
        }
        .input-icon {
          color: var(--text-tertiary);
          display: flex;
          font-size: 1.125rem;
        }
        .input-field {
          flex: 1;
          padding: 0.75rem 0;
          background: transparent;
          color: var(--text-primary);
          font-size: 1rem;
          width: 100%;
        }
        .input-field::placeholder {
          color: var(--text-muted);
        }
        .input-suffix {
          color: var(--text-tertiary);
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
        }
        .input-error-text {
          font-size: 0.75rem;
          color: var(--danger);
        }
        .input-hint {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }
      `}</style>
        </div>
    );
}
