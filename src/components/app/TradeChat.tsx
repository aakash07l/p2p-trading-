"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import type { ChatMessage } from "@/types";

interface TradeChatProps {
    messages: ChatMessage[];
    onSend: (message: string) => void;
    currentUser: string;
}

export function TradeChat({ messages, onSend, currentUser }: TradeChatProps) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim()) {
            onSend(input.trim());
            setInput("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="trade-chat">
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`chat-msg ${msg.type === "system" ? "system" : msg.sender === currentUser ? "own" : "other"}`}
                    >
                        {msg.type === "system" ? (
                            <div className="system-msg">{msg.message}</div>
                        ) : (
                            <>
                                <div className="msg-header">
                                    <span className="msg-sender">{msg.senderName}</span>
                                    <span className="msg-time">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                </div>
                                <div className="msg-text">{msg.message}</div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="chat-input-area">
                <input
                    className="chat-input"
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="chat-send" onClick={handleSend} disabled={!input.trim()}>
                    <Send size={18} />
                </button>
            </div>

            <style jsx>{`
        .trade-chat {
          display: flex;
          flex-direction: column;
          height: 400px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          overflow: hidden;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .chat-msg {
          max-width: 80%;
          padding: 0.75rem 1rem;
          border-radius: 1rem;
        }
        .chat-msg.own {
          align-self: flex-end;
          background: var(--accent-primary-dim);
          border: 1px solid rgba(0, 212, 170, 0.2);
          border-bottom-right-radius: 0.25rem;
        }
        .chat-msg.other {
          align-self: flex-start;
          background: var(--bg-glass);
          border: 1px solid var(--border-color);
          border-bottom-left-radius: 0.25rem;
        }
        .chat-msg.system {
          align-self: center;
          max-width: 90%;
          padding: 0.5rem 1rem;
        }
        .system-msg {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-align: center;
          font-style: italic;
        }
        .msg-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.25rem;
        }
        .msg-sender {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-primary);
        }
        .msg-time {
          font-size: 0.6875rem;
          color: var(--text-muted);
        }
        .msg-text {
          font-size: 0.875rem;
          color: var(--text-primary);
          line-height: 1.5;
        }
        .chat-input-area {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-top: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }
        .chat-input {
          flex: 1;
          padding: 0.625rem 1rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          color: var(--text-primary);
          font-size: 0.875rem;
        }
        .chat-input::placeholder {
          color: var(--text-muted);
        }
        .chat-input:focus {
          border-color: var(--accent-primary);
        }
        .chat-send {
          width: 40px;
          height: 40px;
          border-radius: 0.75rem;
          background: var(--gradient-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 200ms ease;
        }
        .chat-send:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .chat-send:hover:not(:disabled) {
          box-shadow: 0 4px 16px rgba(0, 212, 170, 0.3);
          transform: scale(1.05);
        }
      `}</style>
        </div>
    );
}
