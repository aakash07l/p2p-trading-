"use client";

import React, { useState } from "react";
import { Save, Shield, DollarSign, Clock, Bell, Globe, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        platformName: "P2P.exchange",
        platformFee: "0.5",
        minTradeAmount: "10",
        maxTradeAmount: "50000",
        escrowTimeout: "30",
        autoReleaseHours: "24",
        maintenanceMode: false,
        newRegistrations: true,
        emailNotifications: true,
        disputeAlerts: true,
        kycRequired: false,
        twoFA: false,
        defaultChain: "polygon",
        usdtContract: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    });

    const [saved, setSaved] = useState(false);

    const updateSetting = (key: string, value: string | boolean) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div>
            <div className="hdr">
                <div>
                    <h1>Platform Settings</h1>
                    <p>Configure your P2P trading platform</p>
                </div>
                <Button variant="primary" onClick={handleSave}>
                    <Save size={16} /> {saved ? "Saved ✓" : "Save Changes"}
                </Button>
            </div>

            <div className="settings-grid">
                {/* General */}
                <Card padding="lg">
                    <div className="sec-head"><Globe size={18} /><h2>General</h2></div>
                    <div className="fields">
                        <Input label="Platform Name" value={settings.platformName} onChange={e => updateSetting("platformName", e.target.value)} />
                        <div className="toggle-row">
                            <div><span className="tl">Maintenance Mode</span><span className="td">Disable all trading temporarily</span></div>
                            <button className={`toggle ${settings.maintenanceMode ? "on" : ""}`} onClick={() => updateSetting("maintenanceMode", !settings.maintenanceMode)}>
                                <span className="toggle-knob" />
                            </button>
                        </div>
                        <div className="toggle-row">
                            <div><span className="tl">Allow New Registrations</span><span className="td">Users can create new accounts</span></div>
                            <button className={`toggle ${settings.newRegistrations ? "on" : ""}`} onClick={() => updateSetting("newRegistrations", !settings.newRegistrations)}>
                                <span className="toggle-knob" />
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Trading */}
                <Card padding="lg">
                    <div className="sec-head"><DollarSign size={18} /><h2>Trading</h2></div>
                    <div className="fields">
                        <Input label="Platform Fee (%)" type="number" value={settings.platformFee} onChange={e => updateSetting("platformFee", e.target.value)} suffix="%" />
                        <div className="field-row">
                            <Input label="Min Trade (USDT)" type="number" value={settings.minTradeAmount} onChange={e => updateSetting("minTradeAmount", e.target.value)} />
                            <Input label="Max Trade (USDT)" type="number" value={settings.maxTradeAmount} onChange={e => updateSetting("maxTradeAmount", e.target.value)} />
                        </div>
                    </div>
                </Card>

                {/* Escrow */}
                <Card padding="lg">
                    <div className="sec-head"><Clock size={18} /><h2>Escrow & Timing</h2></div>
                    <div className="fields">
                        <Input label="Escrow Timeout (min)" type="number" value={settings.escrowTimeout} onChange={e => updateSetting("escrowTimeout", e.target.value)} suffix="min" />
                        <Input label="Auto-Release After" type="number" value={settings.autoReleaseHours} onChange={e => updateSetting("autoReleaseHours", e.target.value)} suffix="hours" />
                    </div>
                </Card>

                {/* Notifications */}
                <Card padding="lg">
                    <div className="sec-head"><Bell size={18} /><h2>Notifications</h2></div>
                    <div className="fields">
                        <div className="toggle-row">
                            <div><span className="tl">Email Notifications</span><span className="td">Send email alerts for trades</span></div>
                            <button className={`toggle ${settings.emailNotifications ? "on" : ""}`} onClick={() => updateSetting("emailNotifications", !settings.emailNotifications)}>
                                <span className="toggle-knob" />
                            </button>
                        </div>
                        <div className="toggle-row">
                            <div><span className="tl">Dispute Alerts</span><span className="td">Instant alerts for disputed trades</span></div>
                            <button className={`toggle ${settings.disputeAlerts ? "on" : ""}`} onClick={() => updateSetting("disputeAlerts", !settings.disputeAlerts)}>
                                <span className="toggle-knob" />
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Security */}
                <Card padding="lg">
                    <div className="sec-head"><Shield size={18} /><h2>Security</h2></div>
                    <div className="fields">
                        <div className="toggle-row">
                            <div><span className="tl">Require KYC</span><span className="td">Users must verify identity before trading</span></div>
                            <button className={`toggle ${settings.kycRequired ? "on" : ""}`} onClick={() => updateSetting("kycRequired", !settings.kycRequired)}>
                                <span className="toggle-knob" />
                            </button>
                        </div>
                        <div className="toggle-row">
                            <div><span className="tl">Mandatory 2FA</span><span className="td">Enforce two-factor authentication</span></div>
                            <button className={`toggle ${settings.twoFA ? "on" : ""}`} onClick={() => updateSetting("twoFA", !settings.twoFA)}>
                                <span className="toggle-knob" />
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Blockchain */}
                <Card padding="lg">
                    <div className="sec-head"><Zap size={18} /><h2>Blockchain</h2></div>
                    <div className="fields">
                        <div className="field">
                            <label>Network</label>
                            <select className="sel" value={settings.defaultChain} onChange={e => updateSetting("defaultChain", e.target.value)}>
                                <option value="polygon">Polygon</option>
                                <option value="ethereum">Ethereum</option>
                                <option value="bsc">BSC</option>
                                <option value="arbitrum">Arbitrum</option>
                            </select>
                        </div>
                        <Input label="USDT Contract Address" value={settings.usdtContract} onChange={e => updateSetting("usdtContract", e.target.value)} />
                    </div>
                </Card>
            </div>

            <style jsx>{`
        .hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem}
        .hdr h1{font-size:1.75rem;font-weight:700}.hdr p{color:var(--text-tertiary);font-size:.9375rem;margin-top:.25rem}
        .settings-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem}
        .sec-head{display:flex;align-items:center;gap:.5rem;margin-bottom:1.25rem;color:var(--danger)}
        .sec-head h2{font-size:1rem;font-weight:600;color:var(--text-primary)}
        .fields{display:flex;flex-direction:column;gap:1rem}
        .field-row{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
        .toggle-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.75rem 0;border-bottom:1px solid var(--border-color)}
        .toggle-row:last-child{border-bottom:none}
        .tl{display:block;font-size:.875rem;font-weight:500}.td{display:block;font-size:.75rem;color:var(--text-muted);margin-top:.125rem}
        .toggle{width:48px;height:26px;border-radius:999px;background:var(--bg-tertiary);border:1px solid var(--border-color);position:relative;cursor:pointer;transition:all .3s;flex-shrink:0}
        .toggle.on{background:var(--danger);border-color:var(--danger)}
        .toggle-knob{position:absolute;width:20px;height:20px;border-radius:50%;background:#fff;top:2px;left:2px;transition:transform .3s;box-shadow:0 1px 3px rgba(0,0,0,.3)}
        .toggle.on .toggle-knob{transform:translateX(22px)}
        .field{display:flex;flex-direction:column;gap:.375rem}
        .field label{font-size:.875rem;font-weight:500;color:var(--text-secondary)}
        .sel{padding:.75rem 1rem;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:.75rem;color:var(--text-primary);font-size:.875rem}
        @media(max-width:768px){.settings-grid{grid-template-columns:1fr}.field-row{grid-template-columns:1fr}}
      `}</style>
        </div>
    );
}
