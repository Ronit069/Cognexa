import React, { useState } from 'react';

export const SettingsView: React.FC = () => {
  const [autoMitigationThreshold, setAutoMitigationThreshold] = useState(95);
  const [hitlTimeout, setHitlTimeout] = useState(15);
  const [scadaFrequency, setScadaFrequency] = useState('100ms');
  const [enableCryptoProof, setEnableCryptoProof] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [sapAutoCommit, setSapAutoCommit] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-8 animate-fade-in text-on-surface">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/30">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Platform Settings & Operational Policies</h2>
          <p className="text-sm text-on-surface-variant font-mono mt-1">
            Configure neuro-symbolic inference bounds, HITL escalation rules, and hardware integration parameters.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:brightness-110 shadow-lg shadow-primary/25 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">save</span>
          Save Configurations
        </button>
      </div>

      {savedToast && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          Configuration policies successfully committed and distributed to edge gateways.
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Neuro-Symbolic Agent Policy */}
        <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-xl">smart_toy</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface">Autonomous Agent Swarm Policy</h3>
              <p className="text-xs text-on-surface-variant">Rules governing autonomous execution vs HITL</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span>Autonomous Mitigation Confidence Threshold</span>
                <span className="text-primary font-bold">{autoMitigationThreshold}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="99"
                value={autoMitigationThreshold}
                onChange={(e) => setAutoMitigationThreshold(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <span className="text-[11px] text-on-surface-variant block mt-1">
                Any mitigation action with certainty below this will require mandatory Human-In-The-Loop approval.
              </span>
            </div>

            <div>
              <label className="text-xs font-medium text-on-surface block mb-1">
                HITL Escalation Timeout (Minutes)
              </label>
              <input
                type="number"
                value={hitlTimeout}
                onChange={(e) => setHitlTimeout(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-xs font-mono text-on-surface focus:outline-none focus:border-primary"
              />
              <span className="text-[11px] text-on-surface-variant block mt-1">
                Time before unattended critical alerts escalate to Floor Lead pager.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-on-surface block">Automated SAP PM Work Orders</span>
                <span className="text-[11px] text-on-surface-variant">Allow Agent Atlas to create pending SAP RFC orders</span>
              </div>
              <button
                type="button"
                onClick={() => setSapAutoCommit(!sapAutoCommit)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  sapAutoCommit ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                  sapAutoCommit ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Ingestion & Hardware Telemetry */}
        <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary">
              <span className="material-symbols-outlined text-xl">sensors</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface">Telemetry & Edge Gateway Configuration</h3>
              <p className="text-xs text-on-surface-variant">SCADA sampling rate and cryptographic security</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-on-surface block mb-1">
                High-Frequency Telemetry Sampling
              </label>
              <select
                value={scadaFrequency}
                onChange={(e) => setScadaFrequency(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-xs font-mono text-on-surface focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="10ms">10ms (100 Hz - Ultra-Fast FFT analysis)</option>
                <option value="50ms">50ms (20 Hz - Standard High Precision)</option>
                <option value="100ms">100ms (10 Hz - Nominal Balanced)</option>
                <option value="500ms">500ms (2 Hz - Low Bandwidth)</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-on-surface block">Cryptographic SHA-256 Ledger</span>
                <span className="text-[11px] text-on-surface-variant">Sign every autonomous decision with local HSM</span>
              </div>
              <button
                type="button"
                onClick={() => setEnableCryptoProof(!enableCryptoProof)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  enableCryptoProof ? 'bg-emerald-500' : 'bg-surface-container-highest'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                  enableCryptoProof ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-on-surface block">Slack / PagerDuty Notification Hooks</span>
                <span className="text-[11px] text-on-surface-variant">Broadcast Level 4+ critical incidents immediately</span>
              </div>
              <button
                type="button"
                onClick={() => setSlackAlerts(!slackAlerts)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  slackAlerts ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                  slackAlerts ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
