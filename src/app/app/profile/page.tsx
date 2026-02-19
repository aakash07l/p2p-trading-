"use client";

import React, { useState } from "react";
import { User, Shield, Star, TrendingUp, Plus, Trash2 } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { AppNavbar } from "@/components/app/AppNavbar";
import { WalletInfo } from "@/components/app/WalletInfo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { formatINR } from "@/lib/utils";
import { PAYMENT_METHODS } from "@/lib/constants";

export default function ProfilePage() {
    const account = useActiveAccount();
    const [showAddPayment, setShowAddPayment] = useState(false);
    const [paymentType, setPaymentType] = useState("upi");
    const [paymentDetails, setPaymentDetails] = useState("");
    const [paymentLabel, setPaymentLabel] = useState("");
    const [savedPayments, setSavedPayments] = useState([
        { id: "1", type: "upi", details: "user@upi", label: "My UPI" },
        { id: "2", type: "bank", details: "HDFC ****1234", label: "HDFC Account" },
    ]);

    const addPayment = () => {
        if (paymentDetails && paymentLabel) {
            setSavedPayments(prev => [...prev, {
                id: Date.now().toString(), type: paymentType,
                details: paymentDetails, label: paymentLabel,
            }]);
            setPaymentDetails(""); setPaymentLabel(""); setShowAddPayment(false);
        }
    };

    const removePayment = (id: string) => {
        setSavedPayments(prev => prev.filter(p => p.id !== id));
    };

    return (
        <>
            <AppNavbar />
            <div className="pg"><div className="ct">
                <h1 className="pt"><User size={22} style={{ marginRight: 8, color: "var(--accent-secondary)" }} />Profile</h1>
                <p className="ps">Manage your account and payment methods</p>

                <div className="grid2">
                    <div className="left">
                        <Card padding="lg">
                            <div className="profile-top">
                                <div className="avatar">{account ? account.address.slice(2, 4).toUpperCase() : "??"}</div>
                                <div><h2 className="name">Trader</h2><p className="addr">{account?.address ? `${account.address.slice(0, 8)}...${account.address.slice(-6)}` : "Not Connected"}</p></div>
                            </div>
                            <div className="stats-row">
                                <div className="stat"><Star size={16} style={{ color: "var(--warning)" }} /><div><span className="sv">4.8</span><span className="sl">Rating</span></div></div>
                                <div className="stat"><TrendingUp size={16} style={{ color: "var(--success)" }} /><div><span className="sv">48</span><span className="sl">Trades</span></div></div>
                                <div className="stat"><Shield size={16} style={{ color: "var(--accent-primary)" }} /><div><span className="sv">{formatINR(425000)}</span><span className="sl">Volume</span></div></div>
                            </div>
                        </Card>
                        <WalletInfo />
                    </div>

                    <div className="right">
                        <Card padding="lg">
                            <div className="sec-head">
                                <h3>Payment Methods</h3>
                                <Button variant="outline" size="sm" onClick={() => setShowAddPayment(true)}><Plus size={14} /> Add</Button>
                            </div>
                            <div className="pm-list">
                                {savedPayments.map(pm => {
                                    const info = PAYMENT_METHODS.find(p => p.id === pm.type);
                                    return (
                                        <div key={pm.id} className="pm-item">
                                            <div className="pm-icon">{info?.icon || "💳"}</div>
                                            <div className="pm-info"><span className="pm-label">{pm.label}</span><span className="pm-det">{pm.details}</span></div>
                                            <button className="pm-del" onClick={() => removePayment(pm.id)}><Trash2 size={14} /></button>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>
                </div>

                <Modal isOpen={showAddPayment} onClose={() => setShowAddPayment(false)} title="Add Payment Method" size="sm">
                    <div className="modal-form">
                        <div className="field">
                            <label>Type</label>
                            <select value={paymentType} onChange={e => setPaymentType(e.target.value)} className="sel">
                                {PAYMENT_METHODS.map(pm => <option key={pm.id} value={pm.id}>{pm.icon} {pm.label}</option>)}
                            </select>
                        </div>
                        <Input label="Label" placeholder="e.g. My UPI" value={paymentLabel} onChange={e => setPaymentLabel(e.target.value)} />
                        <Input label="Details" placeholder="e.g. user@upi or HDFC ****1234" value={paymentDetails} onChange={e => setPaymentDetails(e.target.value)} />
                        <Button variant="primary" fullWidth onClick={addPayment} disabled={!paymentDetails || !paymentLabel}>Add Payment Method</Button>
                    </div>
                </Modal>
            </div></div>

            <style jsx>{`
        .pg{padding-top:64px;min-height:100vh}.ct{margin-left:260px;padding:2rem;max-width:1000px}
        .pt{font-size:1.75rem;font-weight:700;display:flex;align-items:center}.ps{color:var(--text-tertiary);font-size:.9375rem;margin:.25rem 0 1.5rem}
        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
        .left,.right{display:flex;flex-direction:column;gap:1rem}
        .profile-top{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem}
        .avatar{width:56px;height:56px;border-radius:16px;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.25rem;color:#fff}
        .name{font-size:1.25rem;font-weight:700}.addr{font-size:.8125rem;color:var(--text-tertiary);font-family:monospace}
        .stats-row{display:flex;gap:1.5rem}
        .stat{display:flex;align-items:center;gap:.5rem}.sv{font-weight:700;font-size:1rem;display:block}.sl{font-size:.75rem;color:var(--text-tertiary)}
        .sec-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
        .sec-head h3{font-size:1rem;font-weight:600}
        .pm-list{display:flex;flex-direction:column;gap:.5rem}
        .pm-item{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;background:var(--bg-glass);border:1px solid var(--border-color);border-radius:.75rem;transition:all .2s}
        .pm-item:hover{border-color:var(--border-color-hover)}
        .pm-icon{font-size:1.25rem}.pm-info{flex:1}.pm-label{font-weight:500;font-size:.875rem;display:block}.pm-det{font-size:.75rem;color:var(--text-tertiary)}
        .pm-del{background:transparent;color:var(--text-muted);padding:.25rem;transition:color .2s}.pm-del:hover{color:var(--danger)}
        .modal-form{display:flex;flex-direction:column;gap:1rem}
        .field{display:flex;flex-direction:column;gap:.375rem}.field label{font-size:.875rem;font-weight:500;color:var(--text-secondary)}
        .sel{padding:.75rem 1rem;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:.75rem;color:var(--text-primary);font-size:.875rem}
        @media(max-width:1024px){.ct{margin-left:0}.grid2{grid-template-columns:1fr}}
        @media(max-width:640px){.ct{padding:1rem}}
      `}</style>
        </>
    );
}
