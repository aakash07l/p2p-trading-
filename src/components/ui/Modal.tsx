"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg";
}

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content modal-${size}`} onClick={(e) => e.stopPropagation()}>
                {title && (
                    <div className="modal-header">
                        <h3>{title}</h3>
                        <button className="modal-close" onClick={onClose}>
                            <X size={20} />
                        </button>
                    </div>
                )}
                <div className="modal-body">{children}</div>
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--z-modal);
          padding: 1rem;
          animation: fadeIn 0.2s ease;
        }
        .modal-content {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease;
        }
        .modal-sm { max-width: 400px; }
        .modal-md { max-width: 560px; }
        .modal-lg { max-width: 720px; }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.5rem 0;
        }
        .modal-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .modal-close {
          background: var(--bg-glass);
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: 0.5rem;
          display: flex;
          transition: all 200ms ease;
        }
        .modal-close:hover {
          background: var(--bg-glass-strong);
          color: var(--text-primary);
        }
        .modal-body {
          padding: 1.5rem;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
        </div>
    );
}
