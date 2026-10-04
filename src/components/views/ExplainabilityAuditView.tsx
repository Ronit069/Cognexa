import React, { useState } from 'react';
import { AUDIT_RECORDS } from '../../data/mockData';
import { AuditRecord } from '../../types';

export const ExplainabilityAuditView: React.FC = () => {
  const [auditList] = useState<AuditRecord[]>(AUDIT_RECORDS);
  const [selectedAudit, setSelectedAudit] = useState<AuditRecord>(AUDIT_RECORDS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedHash, setVerifiedHash] = useState<string | null>(null);

  const handleVerify = (hash: string) => {
    setVerifiedHash('verifying');
    setTimeout(() => {
      setVerifiedHash(hash);
    }, 800);
  };

  const filteredLogs = auditList.filter(item => 
    item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.actionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.merkleHash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in text-on-surface">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-on-surface">Neuro-Symbolic Explainability & Cryptographic Audit Ledger</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Ledger Chain Height #1,842,910
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-mono mt-0.5">
              Tamper-evident ISO-9001:2015 & IEC 62443 trace of all autonomous agent decisions, safety interlocks, and ERP triggers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditList, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", `cognexa_audit_ledger_${Date.now()}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-xs font-semibold hover:border-primary/50 transition-all text-on-surface hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export Verifiable JSON-LD
          </button>
        </div>
      </div>

      {/* Compliance & Drift Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-emerald-500/30 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Cryptographic Integrity</p>
              <h3 className="text-2xl font-bold text-emerald-400 font-mono mt-1">100.0% Verified</h3>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <span className="material-symbols-outlined text-lg">shield_lock</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-on-surface-variant font-mono">
            SHA-256 Merkle root anchoring in local HSM
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Model Drift (PSI Metric)</p>
              <h3 className="text-2xl font-bold text-on-surface font-mono mt-1">0.014</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-lg">ssid_chart</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-emerald-400 font-mono">
            Within Nominal &lt;0.05 Threshold
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-secondary/30 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Formal Logic Coverage</p>
              <h3 className="text-2xl font-bold text-on-surface font-mono mt-1">99.4% AST</h3>
            </div>
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
              <span className="material-symbols-outlined text-lg">account_tree</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-on-surface-variant font-mono">
            Zero unprovable hallucinated tokens
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-amber-500/30 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">HITL Override Rate</p>
              <h3 className="text-2xl font-bold text-on-surface font-mono mt-1">0.42%</h3>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <span className="material-symbols-outlined text-lg">handyman</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-on-surface-variant font-mono">
            99.58% autonomous consensus
          </p>
        </div>
      </div>

      {/* Main 2-Pane Workbench: Audit Feed & Deep Reasoner Proof */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Audit Trail List */}
        <div className="lg:col-span-5 rounded-2xl bg-surface-container border border-outline-variant/20 p-5 flex flex-col h-[750px]">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
            <h3 className="font-bold text-sm tracking-wide uppercase text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">history</span>
              Ledger Blocks
            </h3>
            <span className="text-xs font-mono text-on-surface-variant">{filteredLogs.length} events logged</span>
          </div>

          <div className="my-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-sm">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audit trail, agent, or hash..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {filteredLogs.map((item) => {
              const isSelected = selectedAudit.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedAudit(item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-surface-container-highest border-primary/60 shadow-md ring-1 ring-primary/20'
                      : 'bg-surface-container-low border-outline-variant/15 hover:border-outline-variant/40 hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono font-bold text-primary">{item.actionId}</span>
                    <span className="font-mono text-[10px] text-on-surface-variant">{item.timeAgo}</span>
                  </div>

                  <p className="font-semibold text-on-surface mt-1 line-clamp-1">{item.summary}</p>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-on-surface-variant font-mono">
                    <span>Agent: <span className="text-on-surface font-semibold">{item.agentName}</span></span>
                    <span className={`px-2 py-0.5 rounded ${
                      item.outcome.toLowerCase().includes('executed')
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {item.outcome}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-outline-variant/10 text-[10px] font-mono text-on-surface-variant/70 truncate">
                    Hash: {item.merkleHash} • Auth: {item.authorizer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Deep Reasoner & Predicate Logic Proof */}
        <div className="lg:col-span-7 rounded-2xl bg-surface-container border border-outline-variant/20 p-6 flex flex-col h-[750px] overflow-y-auto space-y-6">
          {/* Header of Selected Record */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-primary/20 text-primary">
                  {selectedAudit.actionId}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
                  Tier {selectedAudit.tier}
                </span>
              </div>
              <h3 className="font-bold text-lg text-on-surface mt-2">{selectedAudit.summary}</h3>
              <p className="text-xs text-on-surface-variant font-mono mt-1">
                Asset: <span className="text-primary font-bold">{selectedAudit.assetSub}</span> • Time: {selectedAudit.timestamp}
              </p>
            </div>

            <button
              onClick={() => handleVerify(selectedAudit.merkleHash)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono font-semibold transition-all cursor-pointer self-start sm:self-center"
            >
              <span className={`material-symbols-outlined text-sm ${verifiedHash === 'verifying' ? 'animate-spin' : ''}`}>
                {verifiedHash === selectedAudit.merkleHash ? 'check_circle' : 'security'}
              </span>
              {verifiedHash === 'verifying' ? 'Checking HSM...' : verifiedHash === selectedAudit.merkleHash ? 'Block Verified' : 'Verify Integrity'}
            </button>
          </div>

          {/* Cryptographic Signature Card */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
              Cryptographic Receipt & Merkle Proof
            </span>
            <div className="font-mono text-xs text-on-surface bg-surface-container-highest p-3 rounded-lg break-all select-all border border-outline-variant/20">
              <span className="text-primary font-bold">SHA256:</span> {selectedAudit.merkleHash}
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant pt-1">
              <span>Authorizer: {selectedAudit.authorizer} ({selectedAudit.authMethod})</span>
              <span>Execution Time: {selectedAudit.executionTimeMs}ms</span>
            </div>
          </div>

          {/* Lineage Sources */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-on-surface-variant">
              Correlated Multi-Modal Ingestion Lineage
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedAudit.lineageSources.map((src) => (
                <span
                  key={src}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-surface-container-high border border-outline-variant/30 text-secondary"
                >
                  SOURCE: {src}
                </span>
              ))}
            </div>
          </div>

          {/* Abstract Syntax Tree & Predicate Proof */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">alt_route</span>
              First-Order Predicate Logic Formulation
            </h4>
            <div className="p-4 rounded-xl bg-surface-container-highest/60 border border-outline-variant/20 font-mono text-xs text-on-surface space-y-2">
              <div className="text-primary font-semibold">∀ t ∈ [T_anomaly - 15m, T_anomaly]:</div>
              <div className="pl-4 text-emerald-400">
                (RMS_Vibration(Spindle, t) &gt; 4.5 mm/s) ∧ (Trigger: "{selectedAudit.triggerTelemetry}")
              </div>
              <div className="pl-4 text-secondary">
                ⇒ RootCause(SpallingBearingDefect, Confidence = {(selectedAudit.aiConfidence / 100).toFixed(3)})
              </div>
              <div className="pl-4 text-amber-400">
                ⇒ PrescribedAction({selectedAudit.outcome}, LineageVerified = True)
              </div>
            </div>
          </div>

          {/* Deterministic Reasoning Tree */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">account_tree</span>
              Deterministic Reasoning Execution Trace
            </h4>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px]">1</span>
                <div>
                  <div className="font-semibold text-on-surface">Data Ingestion & SCADA FFT Transformation</div>
                  <div className="text-on-surface-variant text-[11px] mt-0.5">MPU6050 Accelerometer streaming at 1000Hz. Fast Fourier Transform identified 120Hz harmonic resonant frequency spike.</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px]">2</span>
                <div>
                  <div className="font-semibold text-on-surface">Knowledge Graph Traversal & Cross-Ontology Matching</div>
                  <div className="text-on-surface-variant text-[11px] mt-0.5">Cross-referenced SAP PM asset ID against Confluence SOP-TURB-094 Section 4.2.</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px]">3</span>
                <div>
                  <div className="font-semibold text-on-surface">Autonomous Consensus Interlock & ERP Work Order</div>
                  <div className="text-on-surface-variant text-[11px] mt-0.5">Dispatched RFC payload to SAP S/4HANA with WorkOrder. Human-in-the-loop bypass threshold verified ({selectedAudit.aiConfidence}% &gt; 95%).</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
