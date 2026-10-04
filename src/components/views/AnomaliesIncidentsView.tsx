import React, { useState } from 'react';
import { ALL_INCIDENTS } from '../../data/mockData';
import { Incident, ViewMode } from '../../types';

interface AnomaliesIncidentsViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenAskCognexa: () => void;
}

export const AnomaliesIncidentsView: React.FC<AnomaliesIncidentsViewProps> = ({
  onNavigate,
  onOpenAskCognexa
}) => {
  const [selectedIncident, setSelectedIncident] = useState<Incident>(ALL_INCIDENTS[0]);
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high' | 'warning'>('all');
  const [isThrottled, setIsThrottled] = useState(false);
  const [comments, setComments] = useState<{ sender: string; role: string; time: string; text: string; avatar?: string }[]>([
    {
      sender: 'Dr. Sarah Chen',
      role: 'Plant Eng Lead',
      time: '14:24 UTC (10m ago)',
      text: 'Telemetry matches the March vibration signature. Throttling approved to 65%. Maintenance crew Marco & Dev dispatched to Line 3 bay.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT6XVJ1ShICA9T8OsS1Yk3c-SKgOfxvhNBTLebMWeFn4NMMstOH7rHAQFlw3fKpiqB3ScGfzXmHekmLN6Qbt6thsxfhWNg26452ZxM331LNS4WL5UdgyOs9Su9kMNc6LB4inHlNTLbDklYBs-HG8t0nhbQnF5u23LjmCCedPaQioq1d5BG8MNAl3xLa0Mp0bh3DbGg8mFR6hU4-Zi_yQI2NHPkvaoTA_kx17EagVO-33h2HOCbg5Mm'
    },
    {
      sender: 'Agent Atlas',
      role: 'Autonomous Co-pilot',
      time: '14:28 UTC (4m ago)',
      text: 'Noted. PLC register throttled line speed to 65%. Core bearing temperature decreased from 98.4°C down to 89.1°C in the last 6 minutes. Harmonic amplitude attenuated by 48%.'
    },
    {
      sender: 'Marco Klein',
      role: 'Field Tech Lead',
      time: '14:31 UTC (1m ago)',
      text: 'On site at Bay 02. Strobe inspection shows early micro-pitting on race surface. Preparing replacement assembly.'
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        sender: 'Dr. Elena Rostova',
        role: 'VP Operations',
        time: 'Just now',
        text: newComment
      }
    ]);
    setNewComment('');
    showToast('Instruction broadcast to field consoles and Agent Atlas.');
  };

  const filteredIncidents = ALL_INCIDENTS.filter((inc) => {
    if (severityFilter === 'all') return true;
    return inc.severity === severityFilter;
  });

  return (
    <div className="flex flex-col w-full select-none relative">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2 rounded-lg bg-secondary-container text-on-secondary-container font-label-sm text-label-sm shadow-xl flex items-center gap-2 border border-secondary">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* PAGE NOTIFICATION & CONTEXT BANNER */}
      <div className="relative w-full bg-surface-container-lowest px-gutter-lg py-space-sm flex flex-wrap items-center justify-between gap-space-md shadow-sm border-b border-surface-container-high/30">
        <div className="flex items-center gap-space-md flex-wrap">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error"></span>
            </span>
            <span className="font-label-md text-label-md uppercase tracking-wider text-error font-semibold font-mono">
              Incident Stream Active
            </span>
          </div>
          <span className="text-outline-variant font-label-sm text-label-sm">|</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5 font-mono">
            <span className="material-symbols-outlined text-xs text-secondary">memory</span>
            Causal Core Engine: <span className="text-secondary font-bold">NeuralGraph-v4.1</span>
          </span>
          <span className="hidden md:inline text-outline-variant font-label-sm text-label-sm">|</span>
          <span className="hidden md:flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-xs text-primary">security</span>
            HITL Guardrail: <span className="font-mono text-primary font-medium">Strict ISO-9001 Compliance</span>
          </span>
        </div>
        <div className="flex items-center gap-space-sm">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">Auto-refresh (1s)</span>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
        </div>
      </div>

      <div className="w-full px-gutter-lg py-space-md space-y-space-md max-w-[1720px] mx-auto">
        {/* TOP HEADER & OPERATIONAL COUNTERS */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-low p-space-lg rounded-xl shadow-md border border-surface-container-high/40">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-mono">
                Operations Command • Munich 04
              </span>
              <span className="text-outline-variant font-label-sm text-label-sm">•</span>
              <span className="font-label-sm text-label-sm text-tertiary font-mono">Triage Engine 4.2</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              Anomalies &amp; Incidents
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Autonomous triaged event feed &amp; deep root-cause synthesis across 14,820 cyber-physical telemetry nodes
            </p>
          </div>

          {/* Action Strip */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <button className="flex items-center gap-1.5 px-space-md py-2 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface text-label-md font-label-md transition-colors shadow-sm border border-surface-container-highest">
              <span className="material-symbols-outlined text-base text-secondary">schedule</span>
              <span>Last 24 Hours</span>
              <span className="material-symbols-outlined text-xs text-on-surface-variant ml-1">expand_more</span>
            </button>
            <button 
              onClick={() => showToast('RCA Dossier exported (PDF/JSON format with Merkle signatures)')}
              className="flex items-center gap-1.5 px-space-md py-2 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface text-label-md font-label-md transition-colors shadow-sm border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-base text-primary">download</span>
              <span>Export RCA Dossier</span>
            </button>
            <button 
              onClick={() => showToast('Deep correlation scan initiated across 14,820 telemetry nodes')}
              className="flex items-center gap-1.5 px-space-md py-2 rounded bg-primary text-on-primary hover:bg-primary-fixed-dim text-label-md font-label-md font-semibold transition-all shadow-[0_0_16px_rgba(99,102,241,0.35)]"
            >
              <span className="material-symbols-outlined text-base">radar</span>
              <span>Deep Correlation Scan</span>
            </button>
          </div>
        </div>

        {/* METRICS RIBBON (4 KPI Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Card 1 */}
          <div className="bg-surface-container-low p-space-md rounded-xl shadow-md flex items-center justify-between border border-surface-container-high/40">
            <div className="space-y-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-mono">
                Active Anomalies
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight font-mono">4</span>
                <span className="font-label-sm text-label-sm text-error font-mono font-medium">(1 Critical)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-label-sm text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-error"></span> 1 Crit •{' '}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> 2 High •{' '}
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 1 Warn
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error border border-error/20">
              <span className="material-symbols-outlined text-2xl">crisis_alert</span>
            </div>
          </div>

          {/* Card 2: MTTR */}
          <div className="relative bg-surface-container-low p-space-md rounded-xl shadow-md flex items-center justify-between ring-1 ring-secondary/40 shadow-[0_0_18px_rgba(93,230,255,0.15)] border border-secondary/30">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-mono">
                  MTTR (AI-Assisted)
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-secondary/15 text-[10px] font-label-sm text-secondary font-mono border border-secondary/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                  LIVE
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-xl text-headline-xl text-secondary font-bold tracking-tight font-mono">
                  18<span className="text-base text-on-surface-variant ml-0.5">m</span>
                </span>
                <span className="font-label-sm text-label-sm text-emerald-400 flex items-center font-mono">↓ 64%</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">vs. 51m legacy human baseline</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary ring-1 ring-secondary/50">
              <span className="material-symbols-outlined text-2xl">speed</span>
            </div>
          </div>

          {/* Card 3: Autonomous Mitigations */}
          <div className="bg-surface-container-low p-space-md rounded-xl shadow-md flex items-center justify-between border border-surface-container-high/40">
            <div className="space-y-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-mono">
                Autonomous Mitigations
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight font-mono">
                  91.2<span className="text-base text-on-surface-variant ml-0.5">%</span>
                </span>
                <span className="font-label-sm text-label-sm text-primary flex items-center font-mono">↑ 3.8%</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">42 of 46 events self-stabilized</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-2xl">auto_mode</span>
            </div>
          </div>

          {/* Card 4: Verification Queue */}
          <div className="bg-surface-container-low p-space-md rounded-xl shadow-md flex items-center justify-between border border-surface-container-high/40">
            <div className="space-y-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-mono">
                HITL Verification Queue
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-xl text-headline-xl text-tertiary font-bold tracking-tight font-mono">2</span>
                <span className="font-label-sm text-label-sm text-tertiary font-medium">Pending Action</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">Safety gate: Line throttle sign-off</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20">
              <span className="material-symbols-outlined text-2xl">gavel</span>
            </div>
          </div>
        </div>

        {/* WORKBENCH SPLIT: Master Triage List (Left) & Incident Detail (Right) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md items-start">
          {/* LEFT 4 COLS: ANOMALY TRIAGE LIST */}
          <div className="xl:col-span-4 space-y-space-md">
            <div className="bg-surface-container-low rounded-xl shadow-md overflow-hidden border border-surface-container-high/40">
              <div className="p-space-md space-y-3 bg-surface-container-low border-b border-surface-container-high/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-primary">filter_list</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Triage Stream</span>
                  </div>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-mono font-semibold">
                    {ALL_INCIDENTS.length} ACTIVE
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  <button
                    onClick={() => setSeverityFilter('all')}
                    className={`px-2.5 py-1 rounded font-label-sm text-label-sm font-semibold shrink-0 transition-colors ${
                      severityFilter === 'all'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    All ({ALL_INCIDENTS.length})
                  </button>
                  <button
                    onClick={() => setSeverityFilter('critical')}
                    className={`px-2.5 py-1 rounded font-label-sm text-label-sm font-medium shrink-0 flex items-center gap-1 transition-colors ${
                      severityFilter === 'critical'
                        ? 'bg-error text-on-error font-bold'
                        : 'bg-surface-container-high text-error hover:bg-surface-bright'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Critical (1)
                  </button>
                  <button
                    onClick={() => setSeverityFilter('high')}
                    className={`px-2.5 py-1 rounded font-label-sm text-label-sm shrink-0 transition-colors ${
                      severityFilter === 'high'
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-surface-container-high text-amber-300 hover:bg-surface-bright'
                    }`}
                  >
                    High (2)
                  </button>
                  <button
                    onClick={() => setSeverityFilter('warning')}
                    className={`px-2.5 py-1 rounded font-label-sm text-label-sm shrink-0 transition-colors ${
                      severityFilter === 'warning'
                        ? 'bg-secondary text-black font-bold'
                        : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Warn (1)
                  </button>
                </div>
              </div>

              {/* Triage List Cards */}
              <div className="p-space-sm space-y-2">
                {filteredIncidents.map((inc) => {
                  const isSelected = selectedIncident.id === inc.id;
                  return (
                    <div
                      key={inc.id}
                      onClick={() => setSelectedIncident(inc)}
                      className={`relative p-space-md rounded-lg text-on-surface cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-surface-container-high border-secondary/50 shadow-[0_0_18px_rgba(99,102,241,0.22)]'
                          : 'bg-surface-container-lowest/80 hover:bg-surface-container border-surface-container-high/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2.5 w-2.5">
                            {inc.severity === 'critical' && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                            )}
                            <span
                              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                                inc.severity === 'critical'
                                  ? 'bg-error'
                                  : inc.severity === 'high'
                                  ? 'bg-amber-400'
                                  : 'bg-secondary'
                              }`}
                            ></span>
                          </span>
                          <span className="font-label-md text-label-md font-mono font-bold text-on-surface">
                            #{inc.id}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-label-sm uppercase font-semibold ${
                              inc.severity === 'critical'
                                ? 'bg-error/20 text-error'
                                : inc.severity === 'high'
                                ? 'bg-amber-400/20 text-amber-300'
                                : 'bg-secondary/20 text-secondary'
                            }`}
                          >
                            {inc.severity}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                          {inc.timeAgo}
                        </span>
                      </div>

                      <h3 className="font-headline-sm text-body-lg font-semibold text-on-surface leading-tight">
                        {inc.asset} • {inc.line}
                      </h3>
                      <p className="font-body-sm text-body-sm text-secondary font-mono mt-0.5 line-clamp-1">
                        {inc.title}
                      </p>

                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-surface-container-high/30">
                        <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-xs text-tertiary">psychology</span>
                          <span>AI Conf:</span>
                          <span className="font-mono text-tertiary font-bold">{inc.aiConfidence}%</span>
                        </div>
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-secondary font-mono">
                          {inc.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PHYSICAL ASSET DIGITAL TWIN IMAGE CARD */}
            <div className="bg-surface-container-low rounded-xl p-space-md shadow-md space-y-3 border border-surface-container-high/40">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-secondary font-mono uppercase tracking-wider">
                  Physical Asset Digital Twin
                </span>
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-mono">
                  NODE: DE-MUC-T07
                </span>
              </div>
              <div className="relative w-full h-44 rounded-lg overflow-hidden bg-surface-container-lowest border border-surface-container-high/40">
                <img
                  className="w-full h-full object-cover"
                  alt="High-precision industrial gas turbine assembly"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAItL0sCnOfc_-4r5siA8j6FF9Vunk1uxzu0GEkNsHPrtVrArnOMzYquarNu-ehAJnOTidf90o1MuKwwnmcfi1CnfgXR8q9NIze0ETvhmE6EWo7BJByziFzZqINSjgAHKLciHQANCiSlhDlrXLWpxXe7PgGY51SA_2SGh277QMMAnydZx-qR2b3L-Gz001tul1oUCkRHlqkMYWd0BTcvdElX3mtN05IaBCI0vztHYgfwPak90g1FT2q"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md border border-surface-container-high/40">
                  <span className="font-label-sm text-label-sm text-on-surface font-mono">Bearing Race Pod 03</span>
                  <span className="font-label-sm text-label-sm text-error font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                    Micro-Spalling Detected
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center font-mono">
                <div className="bg-surface-container-lowest p-2 rounded border border-surface-container-high/30">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block text-[11px]">Bearing Model</span>
                  <p className="text-label-md text-on-surface font-semibold">SKF-6205 Ceramic</p>
                </div>
                <div className="bg-surface-container-lowest p-2 rounded border border-surface-container-high/30">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block text-[11px]">Lubricant In-Service</span>
                  <p className="text-label-md text-error font-semibold">Batch #B-409 (Synth)</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 8 COLS: DETAILED INCIDENT WORKSPACE */}
          <div className="xl:col-span-8 space-y-space-md">
            {/* INCIDENT HERO HEADER */}
            <div className="bg-surface-container-low p-space-lg rounded-xl shadow-md space-y-4 border border-surface-container-high/40">
              <div className="flex flex-wrap items-center justify-between gap-space-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-headline-sm text-on-surface">
                    INCIDENT #{selectedIncident.id}
                  </span>
                  <span className="relative inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold shadow-[0_0_12px_rgba(239,68,68,0.4)]">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                    CRITICAL ALERT
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm font-medium border border-tertiary/20">
                    Awaiting HITL Approval
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => onNavigate('knowledge-graph')}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-secondary font-label-sm text-label-sm font-semibold transition-colors border border-surface-container-highest"
                  >
                    <span className="material-symbols-outlined text-sm">account_tree</span>
                    <span>Open in Graph</span>
                  </button>
                  <button 
                    onClick={() => showToast('Alert silenced for 30 minutes on Line 3 console')}
                    className="p-1.5 rounded bg-surface-container-high hover:bg-error/20 text-on-surface-variant hover:text-error border border-surface-container-highest" 
                    title="Silence Alert"
                  >
                    <span className="material-symbols-outlined text-base">volume_off</span>
                  </button>
                </div>
              </div>

              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                  {selectedIncident.title}
                </h2>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1 text-on-surface font-medium">
                    <span className="material-symbols-outlined text-xs text-primary">factory</span>
                    {selectedIncident.asset} ({selectedIncident.facility} • {selectedIncident.line})
                  </span>
                  <span>•</span>
                  <span className="font-mono text-on-surface-variant">Detected: {selectedIncident.detectedTime}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono text-tertiary">
                    <span className="material-symbols-outlined text-xs">smart_toy</span>
                    Agent Atlas ({selectedIncident.aiConfidence}% Confidence)
                  </span>
                </div>
              </div>

              {/* High-Resolution Telemetry Timeline Chart */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl space-y-2 border border-surface-container-high/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-secondary">monitoring</span>
                    T-60min Telemetry Envelope: Vibration Velocity &amp; Causal Breach Window
                  </span>
                  <div className="flex items-center gap-3 font-label-sm text-label-sm font-mono">
                    <span className="flex items-center gap-1 text-tertiary">
                      <span className="w-2.5 h-0.5 bg-tertiary inline-block"></span> Baseline Envelope (2.2 mm/s)
                    </span>
                    <span className="flex items-center gap-1 text-secondary">
                      <span className="w-2.5 h-0.5 bg-secondary inline-block"></span> MPU6050 Vibration
                    </span>
                  </div>
                </div>

                <div className="relative w-full h-44 bg-surface-container-low/70 rounded-lg overflow-hidden flex items-end px-2 pt-2 border border-surface-container-high/30">
                  <div className="absolute top-0 bottom-0 left-[62%] right-[10%] bg-error/15 rounded pointer-events-none flex flex-col justify-between p-1.5 border-l border-r border-error/30">
                    <span className="font-label-sm text-[10px] text-error font-mono font-bold tracking-tight">
                      TRIGGER WINDOW (14:18 - 14:24 UTC)
                    </span>
                    <span className="font-label-sm text-[10px] text-error font-mono text-right">
                      Spike: {selectedIncident.vibrationPeak}
                    </span>
                  </div>

                  <svg className="w-full h-36 overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 120">
                    <rect fill="#8083ff" fillOpacity="0.12" height="30" width="700" x="0" y="65"></rect>
                    <line opacity="0.6" stroke="#8083ff" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="65" y2="65"></line>
                    <path
                      d="M 0,82 Q 40,80 80,83 T 160,81 T 240,84 T 320,80 T 400,82 L 440,78 Q 470,55 500,20 T 540,15 T 580,35 Q 610,65 650,42 L 700,50"
                      fill="none"
                      stroke="#5de6ff"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M 440,78 Q 470,55 500,20 T 540,15 T 580,35"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                    ></path>
                    <circle cx="500" cy="20" fill="#ef4444" r="4.5"></circle>
                    <circle cx="500" cy="20" fill="none" opacity="0.7" r="8" stroke="#ef4444" strokeWidth="1.5"></circle>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[11px] font-label-sm font-mono text-on-surface-variant pt-1">
                  <span>13:22 (Nominal 2.1mm/s)</span>
                  <span>13:45 (Line Speed 110%)</span>
                  <span className="text-error font-semibold">14:18 (Causal Inception)</span>
                  <span className="text-error font-bold">14:22:04 (BREACH {selectedIncident.vibrationPeak})</span>
                  <span className="text-secondary font-semibold">14:38 Live</span>
                </div>
              </div>
            </div>

            {/* THREE-PART CORE ANALYSIS WORKBENCH */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {/* 1. WHAT HAPPENED */}
              <div className="bg-surface-container-low p-space-md rounded-xl shadow-md flex flex-col justify-between space-y-3 border border-surface-container-high/40">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm text-secondary font-mono uppercase tracking-wider">
                      1. What Happened
                    </span>
                    <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-mono">
                      SCADA Stream
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Physical Telemetry Ingestion
                  </h3>

                  <div className="mt-3 space-y-2">
                    <div className="p-2 rounded bg-surface-container-lowest flex items-center justify-between border border-surface-container-high/30">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Vibration Velocity</span>
                        <p className="font-mono text-headline-sm text-error font-bold leading-none">{selectedIncident.vibrationPeak}</p>
                      </div>
                      <span className="font-label-sm text-label-sm text-error font-mono">+119% over lim</span>
                    </div>

                    <div className="p-2 rounded bg-surface-container-lowest flex items-center justify-between border border-surface-container-high/30">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Bearing Core Temp</span>
                        <p className="font-mono text-headline-sm text-amber-300 font-bold leading-none">{selectedIncident.temperaturePeak}</p>
                      </div>
                      <span className="font-label-sm text-label-sm text-amber-300 font-mono">Ceiling 85.0°C</span>
                    </div>

                    <div className="p-2 rounded bg-surface-container-lowest flex items-center justify-between border border-surface-container-high/30">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Coolant Flow</span>
                        <p className="font-mono text-body-lg text-on-surface font-bold leading-none">{selectedIncident.coolantFlow}</p>
                      </div>
                      <span className="font-label-sm text-label-sm text-amber-400 font-mono">↓ Dropping</span>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded bg-surface-container-lowest text-[11px] font-mono text-on-surface-variant space-y-1 border border-surface-container-high/30">
                  <span className="text-outline text-[10px] uppercase font-bold tracking-wider">RAW SENSOR PAYLOAD</span>
                  <p className="text-error truncate font-mono">[14:22:01.048] Z:4.82mm/s @3.2kHz</p>
                  <p className="text-secondary truncate font-mono">CRC32: 0x9AF4B • STATUS: BREACH</p>
                </div>
              </div>

              {/* 2. WHY IT HAPPENED */}
              <div className="bg-surface-container-low p-space-md rounded-xl shadow-md flex flex-col justify-between space-y-3 border border-surface-container-high/40">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm text-tertiary font-mono uppercase tracking-wider">
                      2. Why It Happened
                    </span>
                    <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-tertiary/20 text-tertiary font-mono">
                      Causal AI
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Ranked Probable Root-Causes
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                    {selectedIncident.rootCause}
                  </p>

                  <div className="mt-3 space-y-2">
                    <div className="p-2 rounded bg-surface-container-lowest space-y-1 border border-surface-container-high/30">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-on-surface font-semibold">#1 Lubricant Viscosity Drop</span>
                        <span className="font-label-sm text-label-sm text-tertiary font-mono font-bold">96.4% Prob</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-snug">
                        Correlated with ERP QA Certificate #QC-8821 (-14% kinematic viscosity deviation).
                      </p>
                    </div>

                    <div className="p-2 rounded bg-surface-container-lowest space-y-1 border border-surface-container-high/30">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-on-surface font-semibold">#2 Harmonic Load Resonance</span>
                        <span className="font-label-sm text-label-sm text-secondary font-mono font-bold">84.1% Prob</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-snug">
                        Line speed increase to 110% coincided with thermal acceleration.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between font-label-sm text-label-sm text-tertiary border-t border-surface-container-high/30">
                  <span className="flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-xs">auto_awesome</span> 34 Cross-Domain Citations
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant">Validated 14:23 UTC</span>
                </div>
              </div>

              {/* 3. WHAT TO DO */}
              <div className="bg-surface-container-low p-space-md rounded-xl shadow-md flex flex-col justify-between space-y-3 border border-surface-container-high/40">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm text-primary font-mono uppercase tracking-wider">
                      3. What To Do
                    </span>
                    <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-primary/20 text-primary font-mono">
                      HITL Escort
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Mitigation Strategy
                  </h3>

                  <div className="mt-3 p-3 rounded-lg bg-surface-container-lowest shadow-sm space-y-2 border border-surface-container-high/30">
                    <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-sm">shield</span>
                      RECOMMENDED INTERVENTION
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface leading-snug">
                      {selectedIncident.recommendedAction}
                    </p>
                    <div className="p-2 rounded bg-surface-container-high text-[11px] font-label-sm text-secondary font-mono space-y-0.5">
                      <p>• Projected Risk Averted: <span className="text-on-surface font-bold">$210,000 downtime</span></p>
                      <p>• Est. Thermal Recovery: &lt;82°C in 12 min</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      setIsThrottled(true);
                      showToast('Throttling confirmed to 65% capacity. Work Order #40192 queued.');
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-fixed-dim transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>{isThrottled ? 'Executing 65% Derate...' : 'Approve & Execute Throttle (65%)'}</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => showToast('Opened parameter adjustment palette')}
                      className="flex-1 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface text-label-sm font-label-sm font-medium transition-colors border border-surface-container-highest"
                    >
                      Modify Parameters
                    </button>
                    <button 
                      onClick={() => showToast('Incident snoozed for 1 hour')}
                      className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-error/20 text-error text-label-sm font-label-sm transition-colors border border-surface-container-highest"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM SECTION: COLLABORATION THREAD & HISTORICAL PRECEDENTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
              {/* Similar Past Incidents & SOPs */}
              <div className="bg-surface-container-low p-space-md rounded-xl shadow-md space-y-4 border border-surface-container-high/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-secondary font-mono uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">history</span> Similar Historical Incidents
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">Neural Search</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-surface-container-lowest space-y-1 border border-surface-container-high/30">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm font-mono text-on-surface font-semibold">
                        #INC-2023-1104 • Extruder 1 Race Seizure
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-label-sm text-label-sm font-mono font-bold">
                        98.1% Match
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                      Identical harmonic peak at 3.18kHz. Successfully mitigated via immediate 60% throttle and high-detergent lubricant flush. Total downtime: 42 mins.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface-container-lowest space-y-1 border border-surface-container-high/30">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm font-mono text-on-surface font-semibold">
                        #INC-2023-0812 • Turbine-02 Flange Fatigue
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-secondary/20 text-secondary font-label-sm text-label-sm font-mono font-bold">
                        89.4% Match
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                      Speed throttle prevented ceramic shattering. Bearing replaced during scheduled turnaround.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-surface-container-high/30">
                  <span className="font-label-sm text-label-sm text-primary font-mono uppercase tracking-wider block mb-2">
                    Linked Enterprise SOPs
                  </span>
                  <div className="space-y-1.5">
                    <button 
                      onClick={() => onNavigate('connectors')}
                      className="w-full flex items-center justify-between p-2 rounded bg-surface-container-lowest hover:bg-surface-container transition-colors text-left border border-surface-container-high/30"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-secondary">description</span>
                        <span className="font-body-sm text-body-sm text-on-surface">Confluence SOP-441: Bearing Replacement Manual v3.4</span>
                      </div>
                      <span className="material-symbols-outlined text-xs text-outline">launch</span>
                    </button>
                    <button 
                      onClick={() => onNavigate('connectors')}
                      className="w-full flex items-center justify-between p-2 rounded bg-surface-container-lowest hover:bg-surface-container transition-colors text-left border border-surface-container-high/30"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-emerald-400">inventory_2</span>
                        <span className="font-body-sm text-body-sm text-on-surface">SAP Maintenance Order #40192 (Auto-Drafted)</span>
                      </div>
                      <span className="material-symbols-outlined text-xs text-outline">launch</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Incident Triage Channel Thread */}
              <div className="bg-surface-container-low p-space-md rounded-xl shadow-md flex flex-col justify-between space-y-3 border border-surface-container-high/40">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm text-secondary font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-xs">forum</span> Live Incident Triage Channel
                    </span>
                    <span className="font-label-sm text-label-sm text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      3 Active Responders
                    </span>
                  </div>

                  {/* Message Stream */}
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {comments.map((c, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        {c.avatar ? (
                          <img
                            src={c.avatar}
                            alt={c.sender}
                            className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-primary/40"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary shrink-0 mt-0.5 font-bold font-mono text-xs">
                            {c.sender.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="space-y-1 flex-1">
                          <div className="flex items-baseline justify-between">
                            <span className="font-label-sm text-label-sm text-on-surface font-bold">
                              {c.sender} <span className="font-normal text-on-surface-variant font-mono text-[10px]">({c.role})</span>
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono text-[10px]">
                              {c.time}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm leading-relaxed border border-surface-container-high/30">
                            {c.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comment Input */}
                <div className="pt-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlePostComment();
                    }}
                    className="relative"
                  >
                    <input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full h-10 pl-3 pr-20 bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary shadow-inner border border-surface-container-high/40"
                      placeholder="Type instructions, @mention team, or #tag incident..."
                      type="text"
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="absolute right-1.5 top-1.5 px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm font-semibold rounded hover:bg-primary-fixed-dim transition-colors disabled:opacity-40"
                    >
                      Post
                    </button>
                  </form>
                  <div className="flex items-center justify-between mt-1.5 font-label-sm text-label-sm text-on-surface-variant text-[10px]">
                    <span>Press Enter to send • Agent Atlas auto-transcribes voice</span>
                    <span className="font-mono text-tertiary">Escort Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
