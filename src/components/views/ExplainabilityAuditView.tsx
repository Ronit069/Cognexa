import React, { useState } from 'react';
import { AUDIT_RECORDS } from '../../data/mockData';
import { AuditRecord } from '../../types';

export const ExplainabilityAuditView: React.FC = () => {
  const [auditList] = useState<AuditRecord[]>(AUDIT_RECORDS);
  const [selectedAudit, setSelectedAudit] = useState<AuditRecord>(AUDIT_RECORDS[0]);
  const [searchQuery, setSearchQuery] = useState('Turbine-07');
  const [verifiedHash, setVerifiedHash] = useState<string | null>(null);
  const [outcomeFilter, setOutcomeFilter] = useState<'all' | 'approved' | 'mitigated' | 'rejected'>('all');
  const [minConf, setMinConf] = useState(85);

  const handleVerify = (hash: string) => {
    setVerifiedHash('verifying');
    setTimeout(() => {
      setVerifiedHash(hash);
    }, 800);
  };

  const filteredLogs = auditList.filter(item => {
    const matchesSearch = item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.actionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.triggerTelemetry.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (outcomeFilter === 'rejected' && item.outcome !== 'Rejected') return false;
    if (outcomeFilter === 'approved' && item.outcome !== 'Executed') return false;
    if (outcomeFilter === 'mitigated' && item.outcome === 'Rejected') return false;
    return true;
  });

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in text-on-surface">
      {/* Top Breadcrumb & Metadata Utility Band */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs font-code-md text-code-md text-on-surface-variant font-mono">
          <span className="flex items-center text-primary font-semibold">
            <span className="material-symbols-outlined text-[16px] mr-1">verified_user</span>
            COGNEXA AUDIT NODE #882
          </span>
          <span>/</span>
          <span>CLUSTER: MUNICH-04</span>
          <span>/</span>
          <span className="text-on-surface font-semibold">EPOCH-94281</span>
          <span className="inline-flex items-center ml-2 px-space-xs py-0.5 rounded bg-tertiary-fixed/30 text-tertiary font-label-sm text-label-sm font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-1 animate-ping"></span>
            HSM ATTESTED
          </span>
        </div>

        <div className="flex items-center gap-space-xs">
          <span className="font-code-md text-code-md text-on-surface-variant bg-surface-container px-space-sm py-1 rounded-lg font-mono">
            ROOT MERKLE: <strong className="text-on-surface font-semibold">0x7e29...f9a4</strong>
          </span>
          <span className="font-label-sm text-label-sm uppercase px-space-xs py-1 rounded bg-surface-container text-tertiary font-bold tracking-wider font-mono">
            eIDAS L3 Valid
          </span>
        </div>
      </div>

      {/* Main Section Header & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold mb-space-xs font-mono">
            <span className="material-symbols-outlined text-[14px]">policy</span>
            Autonomous Agent Governance &amp; Forensics
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
            Explainability Audit &amp; Decision Trace
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Deterministic verification, causal inference paths, and eIDAS Level 3 hardware attestation logs across all autonomous agent actions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <button
            onClick={() => handleVerify(selectedAudit.merkleHash)}
            className="flex items-center gap-space-xs px-space-md py-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-lg text-label-lg rounded-xl shadow-sm transition-all duration-150 border border-outline-variant/20 cursor-pointer"
            type="button"
          >
            <span className={`material-symbols-outlined text-[18px] text-tertiary ${verifiedHash === 'verifying' ? 'animate-spin' : ''}`}>
              {verifiedHash === selectedAudit.merkleHash ? 'verified' : 'fingerprint'}
            </span>
            <span>{verifiedHash === selectedAudit.merkleHash ? 'Merkle Proof Valid' : 'Verify Merkle Proofs'}</span>
          </button>

          <button
            onClick={() => alert("Replaying deterministic system state at " + selectedAudit.timestamp)}
            className="flex items-center gap-space-xs px-space-md py-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-lg text-label-lg rounded-xl shadow-sm transition-all duration-150 border border-outline-variant/20 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">fast_rewind</span>
            <span>Replay Snapshot</span>
          </button>

          <button
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditList, null, 2));
              const a = document.createElement('a');
              a.href = dataStr;
              a.download = `cognexa_audit_dossier_${Date.now()}.json`;
              a.click();
            }}
            className="flex items-center gap-space-xs px-space-lg py-2 bg-primary-container text-on-primary font-label-lg text-label-lg rounded-xl shadow-md hover:bg-primary transition-all cursor-pointer font-bold"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
            <span>Export Audit Dossier (PDF/JSON)</span>
          </button>
        </div>
      </div>

      {/* KPI Strip: 5 Cards with Visual Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
        {/* KPI 1 */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Audited Actions (24h)</span>
            <span className="material-symbols-outlined text-primary text-[20px]">task_alt</span>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">1,840</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="px-space-xs py-0.5 rounded bg-surface-container text-tertiary font-label-sm text-label-sm font-semibold">100% Attested</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-mono text-[11px]">0 crypt-failures</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-space-sm overflow-hidden">
            <div className="bg-primary-container h-full rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Mean Decision Conf</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">psychology</span>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">94.8%</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="font-code-md text-code-md text-secondary font-semibold font-mono text-[11px]">GNN + Vector RAG</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-space-sm overflow-hidden">
            <div className="bg-secondary-container h-full rounded-full" style={{ width: '94.8%' }}></div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">HITL Sign-Offs</span>
            <span className="material-symbols-outlined text-primary text-[20px]">how_to_reg</span>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">142 <span className="font-label-md text-label-md font-normal text-on-surface-variant">Approved</span></div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="px-space-xs py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">2 Rejected</span>
              <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">1 Esc</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-space-sm overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '97.2%' }}></div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Policy Compliance</span>
            <span className="material-symbols-outlined text-tertiary text-[20px]">shield</span>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">99.8%</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="font-code-md text-code-md text-on-surface-variant font-mono text-[11px]">ISO-26262 &amp; OSHA</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-space-sm overflow-hidden">
            <div className="bg-tertiary-container h-full rounded-full" style={{ width: '99.8%' }}></div>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Zero-Trust Ledger</span>
            <span className="material-symbols-outlined text-tertiary text-[20px]">lock</span>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-md text-headline-md font-bold text-tertiary tracking-tight">eIDAS L3</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="font-code-md text-code-md text-on-surface-variant truncate font-mono text-[11px]">HSM #HSM-EU-09</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-space-sm overflow-hidden">
            <div className="bg-tertiary h-full rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      {/* Operational Filter Omnibar */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/20">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[260px]">
            <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">search</span>
            <input
              className="w-full bg-surface-container-low text-on-surface pl-9 pr-24 py-2 rounded-lg font-body-sm text-body-sm focus:outline-none focus:bg-surface-container transition-all border border-outline-variant/20 font-mono"
              placeholder="Filter by telemetry signature, asset ID, or Merkle leaf..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-space-sm top-1/2 -translate-y-1/2 flex items-center gap-space-xs pointer-events-none">
              <span className="font-label-sm text-label-sm text-outline bg-surface-container px-space-xs py-0.5 rounded font-mono">LEAF REF</span>
              <span className="font-code-md text-code-md text-outline font-mono">⌘F</span>
            </div>
          </div>

          {/* Filter Controls Group */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-1.5 rounded-lg border border-outline-variant/20">
              <span className="material-symbols-outlined text-[16px] text-primary">smart_toy</span>
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Agent:</span>
              <span className="font-label-lg text-label-lg text-on-surface font-medium">All Autonomous (6)</span>
            </div>

            <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-1.5 rounded-lg border border-outline-variant/20">
              <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
              <span className="font-label-lg text-label-lg text-on-surface font-medium">Last 24 Hours</span>
            </div>

            {/* Outcome Filter Pills */}
            <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg border border-outline-variant/20">
              <button
                onClick={() => setOutcomeFilter('all')}
                className={`px-space-sm py-1 rounded font-label-sm text-label-sm cursor-pointer transition-all ${
                  outcomeFilter === 'all'
                    ? 'bg-surface-container-lowest shadow-sm font-bold text-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                All (1,840)
              </button>
              <button
                onClick={() => setOutcomeFilter('approved')}
                className={`px-space-sm py-1 rounded font-label-sm text-label-sm cursor-pointer transition-all ${
                  outcomeFilter === 'approved'
                    ? 'bg-surface-container-lowest shadow-sm font-bold text-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                Appr (1,684)
              </button>
              <button
                onClick={() => setOutcomeFilter('mitigated')}
                className={`px-space-sm py-1 rounded font-label-sm text-label-sm cursor-pointer transition-all ${
                  outcomeFilter === 'mitigated'
                    ? 'bg-surface-container-lowest shadow-sm font-bold text-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                Mitig (154)
              </button>
              <button
                onClick={() => setOutcomeFilter('rejected')}
                className={`px-space-sm py-1 rounded font-label-sm text-label-sm cursor-pointer transition-all ${
                  outcomeFilter === 'rejected'
                    ? 'bg-surface-container-lowest shadow-sm font-bold text-error'
                    : 'text-error hover:opacity-90'
                }`}
                type="button"
              >
                Rej (2)
              </button>
            </div>

            {/* Min Conf Slider */}
            <div className="hidden xl:flex items-center gap-space-xs bg-surface-container-low px-space-md py-1.5 rounded-lg border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Min Conf:</span>
              <span className="font-code-md text-code-md text-primary font-bold font-mono">≥ {minConf}%</span>
              <input
                type="range"
                min="50"
                max="99"
                value={minConf}
                onChange={(e) => setMinConf(Number(e.target.value))}
                className="w-16 accent-primary cursor-pointer ml-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Primary Intelligence Workbench: 60% Left Ledger, 40% Right Trace Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT 60%: Stream Ledger & Dynamic Confidence Plot */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          {/* Live Audit Stream Ledger */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col border border-outline-variant/20">
            {/* Table Header Control */}
            <div className="p-space-md flex items-center justify-between bg-surface-container-lowest border-b border-outline-variant/15">
              <div className="flex items-center gap-space-sm">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">Attested Audit Stream</span>
                <span className="font-code-md text-code-md text-outline font-mono text-[11px]">Real-Time Ingestion</span>
              </div>
              <span className="font-code-md text-code-md text-on-surface-variant font-mono text-[11px]">
                SYNCED TO ETH-L2 #8928
              </span>
            </div>

            {/* Data Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-mono">
                    <th className="py-2.5 px-space-md font-semibold">Timestamp</th>
                    <th className="py-2.5 px-space-md font-semibold">Action &amp; Agent</th>
                    <th className="py-2.5 px-space-md font-semibold">Trigger Signature</th>
                    <th className="py-2.5 px-space-md font-semibold">Lineage</th>
                    <th className="py-2.5 px-space-md font-semibold text-right">AI Conf</th>
                    <th className="py-2.5 px-space-md font-semibold">Auth Gate</th>
                    <th className="py-2.5 px-space-md font-semibold">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-on-surface font-body-sm text-body-sm">
                  {filteredLogs.map((item) => {
                    const isSelected = selectedAudit.id === item.id;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedAudit(item)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-surface-container text-primary font-medium'
                            : 'hover:bg-surface-container-low'
                        }`}
                      >
                        <td className="py-space-sm px-space-md whitespace-nowrap font-code-md text-code-md font-mono">
                          {item.timestamp}
                        </td>
                        <td className="py-space-sm px-space-md">
                          <div className="flex flex-col">
                            <span className="font-code-md text-code-md font-bold text-on-surface font-mono">{item.actionId}</span>
                            <span className="font-label-sm text-label-sm text-primary">{item.agentName}</span>
                          </div>
                        </td>
                        <td className="py-space-sm px-space-md font-mono text-xs">
                          <span className={item.triggerTelemetry.includes('Vibration') || item.triggerTelemetry.includes('Pressure') ? 'text-error font-semibold' : 'text-on-surface'}>
                            {item.triggerTelemetry}
                          </span>
                        </td>
                        <td className="py-space-sm px-space-md whitespace-nowrap font-mono text-xs">
                          <div className="flex items-center gap-1">
                            {item.lineageSources.map(s => (
                              <span key={s} className="px-1.5 py-0.5 rounded bg-surface-container-low text-[10px]">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-space-sm px-space-md text-right whitespace-nowrap font-mono">
                          <div className="flex items-center justify-end gap-1.5 font-bold text-tertiary">
                            <span>{item.aiConfidence}%</span>
                            <div className="w-8 bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                              <div className="bg-tertiary h-full rounded-full" style={{ width: `${item.aiConfidence}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-space-sm px-space-md whitespace-nowrap font-mono text-xs">
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container-low text-on-surface">
                            <span className="material-symbols-outlined text-[12px] text-tertiary">fingerprint</span>
                            {item.authorizer}
                          </span>
                        </td>
                        <td className="py-space-sm px-space-md whitespace-nowrap font-mono text-xs">
                          <span className={`inline-flex items-center px-space-xs py-0.5 rounded font-label-sm text-label-sm font-bold ${
                            item.outcome === 'Executed'
                              ? 'bg-surface-container-high text-primary'
                              : item.outcome === 'Rejected'
                              ? 'bg-error-container text-on-error-container'
                              : 'bg-surface-container text-tertiary'
                          }`}>
                            {item.outcome}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-space-sm px-space-md bg-surface-container-low flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant font-mono">
              <div className="flex items-center gap-space-sm">
                <span>Showing 1 - {filteredLogs.length} of 1,840 audited traces</span>
                <span className="bg-surface-container-lowest px-1.5 py-0.5 rounded text-primary font-bold">Latency: 14.2ms</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <button className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container" type="button">Prev</button>
                <button className="px-2.5 py-1 rounded bg-primary-container text-on-primary font-bold" type="button">1</button>
                <button className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container" type="button">2</button>
                <button className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container" type="button">Next</button>
              </div>
            </div>
          </div>

          {/* Analytical Trend Chart: Causal Confidence vs Human Interventions */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col border border-outline-variant/20">
            <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
              <div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-primary">monitoring</span>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Causal Confidence vs. Human Interventions (24h)
                  </h2>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Real-time GNN confidence baseline correlated with manual human intervention thresholds.
                </p>
              </div>

              <div className="flex items-center gap-space-md font-label-sm text-label-sm">
                <span className="flex items-center gap-1 text-on-surface">
                  <span className="w-3 h-0.5 bg-primary-container"></span>
                  Mean Model Confidence (GNN)
                </span>
                <span className="flex items-center gap-1 text-on-surface">
                  <span className="w-3 h-2 rounded bg-secondary-container"></span>
                  HITL Human Escalations
                </span>
              </div>
            </div>

            <div className="w-full h-44 relative bg-surface-container-low rounded-lg p-space-sm overflow-hidden flex items-end">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 120">
                <line className="text-outline-variant/30" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" x1="0" x2="600" y1="24" y2="24"></line>
                <line className="text-outline-variant/30" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" x1="0" x2="600" y1="60" y2="60"></line>
                <line className="text-outline-variant/30" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" x1="0" x2="600" y1="96" y2="96"></line>

                <rect className="fill-secondary-container" height="35" opacity="0.85" rx="2" width="12" x="40" y="80"></rect>
                <rect className="fill-secondary-container" height="20" opacity="0.85" rx="2" width="12" x="110" y="95"></rect>
                <rect className="fill-secondary-container" height="50" opacity="0.85" rx="2" width="12" x="180" y="65"></rect>
                <rect className="fill-secondary-container" height="15" opacity="0.85" rx="2" width="12" x="250" y="100"></rect>
                <rect className="fill-secondary-container" height="27" opacity="0.85" rx="2" width="12" x="320" y="88"></rect>
                <rect className="fill-secondary-container" height="60" opacity="0.85" rx="2" width="12" x="390" y="55"></rect>
                <rect className="fill-secondary-container" height="25" opacity="0.85" rx="2" width="12" x="460" y="90"></rect>
                <rect className="fill-secondary-container" height="13" opacity="0.85" rx="2" width="12" x="530" y="102"></rect>

                <polygon className="fill-primary/10" points="0,115 0,35 60,30 120,40 180,25 240,28 300,18 360,22 420,15 480,19 540,12 600,16 600,115"></polygon>
                <polyline className="text-primary-container" fill="none" points="0,35 60,30 120,40 180,25 240,28 300,18 360,22 420,15 480,19 540,12 600,16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></polyline>
                <circle className="fill-surface-container-lowest stroke-primary" cx="420" cy="15" r="4" strokeWidth="2.5"></circle>
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] font-code-md text-on-surface-variant mt-space-xs px-1 font-mono">
              <span>00:00 (UTC)</span>
              <span>04:00</span>
              <span>08:00</span>
              <span>12:00</span>
              <span className="text-primary font-bold">14:32:08 (EVENT)</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </div>
        </div>

        {/* RIGHT 40%: Deep Decision Trace Inspector Drawer */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col border border-outline-variant/20">
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-space-sm mb-space-md border-b border-outline-variant/15">
              <div>
                <div className="flex items-center gap-space-xs">
                  <span className="font-code-md text-code-md px-2 py-0.5 rounded bg-primary-container text-on-primary font-bold font-mono">
                    {selectedAudit.actionId}
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary font-bold px-2 py-0.5 rounded bg-surface-container font-mono">
                    ASIL-D VERIFIED
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-2">
                  {selectedAudit.summary}
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-mono mt-1">
                  Asset: <span className="font-semibold text-on-surface">{selectedAudit.assetSub}</span>
                </p>
              </div>
            </div>

            {/* Hardware & Merkle Certificate Pill Box */}
            <div className="bg-surface-container-low p-space-sm rounded-lg mb-space-lg flex flex-col gap-space-2xs border border-outline-variant/15">
              <div className="flex items-center justify-between font-label-sm text-label-sm">
                <span className="text-outline uppercase font-semibold">eIDAS L3 Hardware Attestation</span>
                <span className="text-tertiary font-bold flex items-center gap-1 font-mono">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Cryptographically Sealed
                </span>
              </div>
              <div className="font-code-md text-code-md text-on-surface truncate font-mono text-xs">
                Leaf Merkle: <span className="font-bold text-primary">{selectedAudit.merkleHash}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-code-md text-on-surface-variant font-mono">
                <span>Enclave: AMD SEV-SNP (HSM-04)</span>
                <span>Nonce: #774921</span>
              </div>
            </div>

            {/* Section Title: Deterministic Reasoning Chain */}
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider text-outline">
                4-Step Deterministic Reasoning Chain
              </span>
              <span className="font-code-md text-code-md text-tertiary font-mono font-semibold">
                Deterministic Valid
              </span>
            </div>

            {/* 4-Step Chain Flow */}
            <div className="flex flex-col gap-space-md relative pl-3 before:absolute before:left-5 before:top-2 before:bottom-3 before:w-0.5 before:bg-surface-container">
              {/* Step 1: Raw Inputs */}
              <div className="relative flex items-start gap-space-md">
                <div className="w-5 h-5 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-code-md text-[10px] font-bold shrink-0 z-10 shadow-sm">
                  1
                </div>
                <div className="bg-surface-container-low p-space-sm rounded-lg flex-1 border border-outline-variant/15">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">Raw Inputs &amp; Event Signature</span>
                    <span className="font-code-md text-code-md text-outline font-mono text-[10px]">{selectedAudit.timestamp}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    MPU6050 accelerometer emitted harmonic vibration resonance:
                  </p>
                  <div className="mt-1 bg-surface-container-lowest p-space-xs rounded font-code-md text-code-md text-error font-semibold flex items-center justify-between font-mono text-xs border border-outline-variant/15">
                    <span>{selectedAudit.triggerTelemetry}</span>
                    <span className="text-on-surface-variant text-[11px]">3.2 kHz Band</span>
                  </div>
                </div>
              </div>

              {/* Step 2: Retrieved Enterprise Context RAG */}
              <div className="relative flex items-start gap-space-md">
                <div className="w-5 h-5 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-code-md text-[10px] font-bold shrink-0 z-10 shadow-sm">
                  2
                </div>
                <div className="bg-surface-container-low p-space-sm rounded-lg flex-1 border border-outline-variant/15">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">Retrieved Enterprise Context (RAG)</span>
                    <span className="font-label-sm text-label-sm text-tertiary font-bold font-mono">Sim Score 0.94</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">
                    Vector lookup retrieved plant runbooks and quality records:
                  </p>
                  <div className="flex flex-col gap-1 font-code-md text-code-md font-mono text-[11px]">
                    <div className="bg-surface-container-lowest px-space-xs py-1 rounded text-on-surface flex items-center justify-between border border-outline-variant/15">
                      <span className="font-medium text-primary">SOP-441: High-RPM Bearing Harmonic Mitigation</span>
                      <span className="text-[10px] text-outline">PDF Sec 4.2</span>
                    </div>
                    <div className="bg-surface-container-lowest px-space-xs py-1 rounded text-on-surface flex items-center justify-between border border-outline-variant/15">
                      <span className="font-medium">SAP ERP Maintenance #QC-8821: Bearing Replace</span>
                      <span className="text-[10px] text-outline">3d Overdue</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Causal Graph Engine */}
              <div className="relative flex items-start gap-space-md">
                <div className="w-5 h-5 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-code-md text-[10px] font-bold shrink-0 z-10 shadow-sm">
                  3
                </div>
                <div className="bg-surface-container-low p-space-sm rounded-lg flex-1 border border-outline-variant/15">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">Graph Traversal Causal Engine</span>
                    <span className="font-code-md text-code-md text-primary font-bold font-mono">2-Hop Path</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Identified root cause hypothesis with p-value &lt; 0.001:
                  </p>
                  <div className="mt-1 bg-surface-container-lowest p-space-xs rounded font-code-md text-code-md text-on-surface font-mono text-[11px] border border-outline-variant/15">
                    <div className="text-on-surface-variant text-[10px] mb-0.5">CAUSAL INFERENCE VECTOR:</div>
                    <span className="text-on-surface font-semibold">[Vibration Harmonic] → [Bearing Cage Fatigue] → [Catastrophic Shaft Jam in &lt; 8 min]</span>
                  </div>
                </div>
              </div>

              {/* Step 4: Intervention & Financial Impact */}
              <div className="relative flex items-start gap-space-md">
                <div className="w-5 h-5 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-code-md text-[10px] font-bold shrink-0 z-10 shadow-sm">
                  4
                </div>
                <div className="bg-surface-container-low p-space-sm rounded-lg flex-1 border border-outline-variant/15">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">Intervention &amp; Financial Impact</span>
                    <span className="font-label-sm text-label-sm text-tertiary font-bold font-mono">$210,000 Saved</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Throttle reduced to 42% (safe envelope). Diverted active steam flow to Bypass Circuit 02. Prevented full catastrophic failure.
                  </p>
                </div>
              </div>
            </div>

            {/* Cryptographic Data Lineage Pipeline Diagram */}
            <div className="mt-space-lg pt-space-md border-t border-outline-variant/15">
              <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider text-outline block mb-space-sm">
                Cryptographic Data Lineage Pipeline
              </span>
              <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-sm border border-outline-variant/15">
                <div className="grid grid-cols-4 gap-space-xs text-center items-center">
                  <div className="bg-surface-container-lowest p-space-xs rounded shadow-sm flex flex-col items-center border border-outline-variant/15">
                    <span className="material-symbols-outlined text-[18px] text-primary">sensors</span>
                    <span className="font-label-sm text-label-sm font-bold text-on-surface mt-1">IoT Ingest</span>
                    <span className="font-code-md text-[10px] text-outline font-mono">MQTT / TLS1.3</span>
                  </div>
                  <div className="bg-surface-container-lowest p-space-xs rounded shadow-sm flex flex-col items-center border border-outline-variant/15">
                    <span className="material-symbols-outlined text-[18px] text-secondary">schema</span>
                    <span className="font-label-sm text-label-sm font-bold text-on-surface mt-1">Causal GNN</span>
                    <span className="font-code-md text-[10px] text-outline font-mono">Vector Graph</span>
                  </div>
                  <div className="bg-surface-container-lowest p-space-xs rounded shadow-sm flex flex-col items-center border border-outline-variant/15">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">gavel</span>
                    <span className="font-label-sm text-label-sm font-bold text-on-surface mt-1">HITL Gate</span>
                    <span className="font-code-md text-[10px] text-outline font-mono">Operator Sign</span>
                  </div>
                  <div className="bg-surface-container-lowest p-space-xs rounded shadow-sm flex flex-col items-center border border-outline-variant/15">
                    <span className="material-symbols-outlined text-[18px] text-primary">precision_manufacturing</span>
                    <span className="font-label-sm text-label-sm font-bold text-on-surface mt-1">SCADA PLC</span>
                    <span className="font-code-md text-[10px] text-outline font-mono">Direct Actuate</span>
                  </div>
                </div>
                <div className="flex items-center justify-between font-code-md text-[11px] text-on-surface-variant px-1 pt-1 font-mono">
                  <span>SHA256: {selectedAudit.merkleHash}</span>
                  <span className="text-tertiary font-bold">✓ Merkle Proof Verified</span>
                </div>
              </div>
            </div>

            {/* Interactive AI Explanation Invoker */}
            <div className="mt-space-lg pt-space-xs">
              <button
                onClick={() => alert(`Cognexa Plain-Language Explanation:\n\nTriggered by: ${selectedAudit.triggerTelemetry} at ${selectedAudit.timestamp}.\nRoot Cause: Spindle bearing spalling correlated with off-spec lubricant batch.\nAction Taken: ${selectedAudit.outcome} authorized by ${selectedAudit.authorizer}.\nFinancial Risk Mitigated: $210,000 unplanned downtime.`)}
                className="w-full flex items-center justify-center gap-space-sm py-2.5 px-space-md rounded-xl bg-surface-container-high hover:bg-surface-container text-primary font-label-lg text-label-lg font-bold transition-all shadow-sm cursor-pointer border border-outline-variant/20"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">neurology</span>
                <span>Ask Cognexa to Explain This Step in Plain Language</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
