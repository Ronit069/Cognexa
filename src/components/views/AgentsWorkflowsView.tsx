import React, { useState } from 'react';
import { AGENTS } from '../../data/mockData';

export const AgentsWorkflowsView: React.FC = () => {
  const [agents, setAgents] = useState(AGENTS);
  const [signedStep, setSignedStep] = useState(false);
  const [selectedCanvasNode, setSelectedCanvasNode] = useState('node-03');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleToggleAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'running' || a.status === 'polling' || a.status === 'auditing' ? 'standby' : 'running';
          showToast(`${a.name} transitioned to ${nextStatus.toUpperCase()}`);
          return { ...a, status: nextStatus as any };
        }
        return a;
      })
    );
  };

  return (
    <div className="p-gutter-lg flex flex-col gap-space-lg w-full max-w-[1720px] mx-auto select-none relative">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2 rounded-lg bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm shadow-xl flex items-center gap-2 border border-tertiary">
          <span className="material-symbols-outlined text-sm">verified</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* TOP SECTION HEADER & STATS BAR */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md pb-space-xs">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-mono">
              OPERATIONS COMMAND
            </span>
            <span className="text-outline text-xs">•</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">MUNICH 04</span>
            <span className="text-outline text-xs">•</span>
            <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-mono text-[10px]">
              Orchestration Engine v4.2
            </span>
          </div>
          <div className="flex items-baseline gap-space-md flex-wrap">
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
              Autonomous Agents &amp; Workflow Studio
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
            Coordinate neuro-symbolic multi-agent swarms, configure autonomous trigger gates, and design human-in-the-loop operational pipelines across cyber-physical assets.
          </p>
        </div>

        {/* Quick Action Controls & Real-Time Status */}
        <div className="flex items-center gap-space-sm flex-wrap self-start xl:self-auto">
          <div className="flex items-center gap-2 px-space-md py-1.5 rounded-lg bg-surface-container-low shadow-sm border border-surface-container-high/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface font-mono leading-none">Strict ISO-9001</span>
              <span className="font-label-sm text-label-sm text-secondary text-[10px] leading-none mt-0.5 font-mono">
                POLICY ACTIVE
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-space-md py-1.5 rounded-lg bg-surface-container-low shadow-sm border border-surface-container-high/40">
            <span className="material-symbols-outlined text-sm text-primary">speed</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface font-mono leading-none">44.8k ops/hr</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px] leading-none mt-0.5 font-mono">
                EXECUTION RATE
              </span>
            </div>
          </div>

          <button 
            onClick={() => showToast('Simulating complete WF-8842 pipeline run')}
            className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface transition-colors font-label-md text-label-md border border-surface-container-highest"
          >
            <span className="material-symbols-outlined text-sm text-secondary">play_arrow</span>
            <span>Test Pipeline</span>
          </button>
          <button 
            onClick={() => showToast('Agent Template Generator initialized')}
            className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-dim transition-all shadow-[0_0_20px_rgba(192,193,255,0.25)] font-label-md text-label-md font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">smart_toy</span>
            <span>Deploy New Agent</span>
          </button>
        </div>
      </header>

      {/* SWARM HEADER */}
      <div className="flex items-center justify-between pt-1 -mb-1">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary shadow-[0_0_8px_rgba(93,230,255,0.7)]"></span>
          </span>
          <span className="font-label-sm text-label-sm text-on-surface font-bold uppercase tracking-wider font-mono">
            Active Swarm Fleet
          </span>
          <span className="text-outline text-xs">•</span>
          <span className="font-label-sm text-label-sm text-secondary font-mono">{agents.length} Agents Online</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-on-surface-variant">
          <span className="hidden sm:inline-block">Realtime telemetry feed active</span>
          <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-semibold border border-secondary/20">
            LIVE SYNC
          </span>
        </div>
      </div>

      {/* PART A: ACTIVE AGENT FLEET (4 Cards) */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between shadow-md hover:bg-surface-container transition-all group relative overflow-hidden border border-surface-container-high/40"
          >
            <div>
              <div className="flex items-start justify-between mb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shadow-inner border border-surface-container-highest">
                    <span className="material-symbols-outlined text-xl">
                      {agent.id === 'agent-atlas'
                        ? 'precision_manufacturing'
                        : agent.id === 'agent-argus'
                        ? 'radar'
                        : agent.id === 'agent-veritas'
                        ? 'verified_user'
                        : 'auto_stories'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                      {agent.name}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono uppercase text-[10px]">
                      {agent.role}
                    </span>
                  </div>
                </div>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary font-label-sm text-label-sm font-mono text-[10px] border border-secondary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  {agent.status.toUpperCase()}
                </span>
              </div>

              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm line-clamp-2">
                {agent.description}
              </p>

              {/* Metrics Matrix */}
              <div className="grid grid-cols-3 gap-1 p-2 rounded-lg bg-surface-container-lowest/80 mb-space-sm font-mono text-center border border-surface-container-high/30">
                <div>
                  <div className="font-label-sm text-label-sm text-on-surface font-bold">{agent.tasks24h}</div>
                  <div className="font-label-sm text-label-sm text-outline text-[9px] uppercase">Tasks 24h</div>
                </div>
                <div>
                  <div className="font-label-sm text-label-sm text-secondary font-bold">{agent.precision}</div>
                  <div className="font-label-sm text-label-sm text-outline text-[9px] uppercase">Precision</div>
                </div>
                <div>
                  <div className="font-label-sm text-label-sm text-primary font-bold">{agent.pending}</div>
                  <div className="font-label-sm text-label-sm text-outline text-[9px] uppercase">Pending</div>
                </div>
              </div>

              {/* Scope Access */}
              <div className="space-y-1 mb-space-sm">
                <span className="font-label-sm text-label-sm text-outline text-[10px] uppercase font-mono block">
                  Scope Access
                </span>
                <div className="flex flex-wrap gap-1">
                  {agent.scopes.map((scope, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm text-[10px] font-mono border border-surface-container-highest"
                    >
                      {scope}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Task Stream */}
              <div className="p-2 rounded bg-surface-container-high/60 mb-space-md border border-surface-container-highest/40">
                <div className="flex items-center gap-1.5 text-secondary mb-1">
                  <span className="material-symbols-outlined text-xs animate-spin">sync</span>
                  <span className="font-label-sm text-label-sm font-mono text-[10px] uppercase tracking-wider font-semibold">
                    Live Focus
                  </span>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface font-mono text-[11px] truncate">
                  {agent.liveFocus}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-space-xs border-t border-surface-container-high/30">
              <button
                onClick={() => handleToggleAgent(agent.id)}
                className="px-space-sm py-1 rounded bg-surface-container-high hover:bg-surface-variant text-on-surface text-label-sm font-label-sm font-mono transition-colors border border-surface-container-highest"
              >
                {agent.status === 'standby' ? 'Resume Agent' : 'Pause Agent'}
              </button>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => showToast(`Configuring security scope for ${agent.name}`)}
                  className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-base">tune</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* PART B: VISUAL WORKFLOW BUILDER STUDIO */}
      <section className="rounded-xl bg-surface-container-lowest/80 backdrop-blur-xl flex flex-col shadow-2xl overflow-hidden border border-surface-container-high/40">
        {/* Studio Header Bar */}
        <div className="px-space-lg py-3 bg-surface-container-low flex flex-wrap items-center justify-between gap-space-md shadow-sm border-b border-surface-container-high/30">
          <div className="flex items-center gap-space-md">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shadow-sm border border-surface-container-highest">
              <span className="material-symbols-outlined text-lg">account_tree</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  WF-8842: Vibration Spike Autonomous Mitigation &amp; ERP Dispatch
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-mono text-[10px] border border-secondary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                  DEPLOYED • PRODUCTION
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">v2.4</span>
                <span className="text-outline text-xs">•</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                  Modified 12m ago by Dr. Sarah Chen
                </span>
                <span className="text-outline text-xs">•</span>
                <span className="font-label-sm text-label-sm text-tertiary font-mono">ISO-26262 Compliant Pipeline</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => showToast('Simulating mock trigger: Injecting 4.82 mm/s reading')}
              className="flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface text-label-md font-label-md transition-colors border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-sm text-secondary">smart_display</span>
              <span>Mock Simulation</span>
            </button>
            <button 
              onClick={() => showToast('Workflow changes deployed to production runtimes')}
              className="flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-dim transition-all shadow-[0_0_16px_rgba(192,193,255,0.3)] font-label-md text-label-md font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              <span>Deploy Changes</span>
            </button>
          </div>
        </div>

        {/* Studio Body (3-Column Layout) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 min-h-[640px] relative">
          {/* Column A: Left Palette (3 cols) */}
          <div className="xl:col-span-3 bg-surface-container-low/70 p-space-md flex flex-col gap-space-md border-r border-surface-container-high/40">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-outline text-base">search</span>
              <input
                className="w-full h-9 pl-8 pr-3 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner border border-surface-container-high/30"
                placeholder="Search blocks..."
                type="text"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-space-md pr-1">
              <div>
                <span className="font-label-sm text-label-sm text-secondary font-mono tracking-wider uppercase font-semibold block mb-2">
                  1. Triggers
                </span>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high cursor-grab flex items-center justify-between border border-surface-container-highest/30">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-base">bolt</span>
                      <span className="font-body-sm text-body-sm text-on-surface">Sensor Threshold Breach</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline font-mono text-[10px]">IoT</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high cursor-grab flex items-center justify-between border border-surface-container-highest/30">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant text-base">schedule</span>
                      <span className="font-body-sm text-body-sm text-on-surface">Cron / Shift Interval</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline font-mono text-[10px]">TIME</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-label-sm text-label-sm text-tertiary font-mono tracking-wider uppercase font-semibold block mb-2">
                  2. Reasoning &amp; AI
                </span>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high cursor-grab flex items-center justify-between border border-surface-container-highest/30">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary text-base">psychology</span>
                      <span className="font-body-sm text-body-sm text-on-surface">Causal AI Root-Cause</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-tertiary font-mono text-[10px]">GNN</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high cursor-grab flex items-center justify-between border border-surface-container-highest/30">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary-fixed-dim text-base">find_in_page</span>
                      <span className="font-body-sm text-body-sm text-on-surface">Document / SOP Correlator</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline font-mono text-[10px]">RAG</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-label-sm text-label-sm text-primary font-mono tracking-wider uppercase font-semibold block mb-2">
                  3. Governance &amp; Gates
                </span>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high cursor-grab flex items-center justify-between border border-surface-container-highest/30">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-base">how_to_reg</span>
                      <span className="font-body-sm text-body-sm text-on-surface">Human-in-the-Loop Sign-off</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary font-mono text-[10px]">HITL</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high cursor-grab flex items-center justify-between border border-surface-container-highest/30">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-base">lock</span>
                      <span className="font-body-sm text-body-sm text-on-surface">Cryptographic Attestation</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline font-mono text-[10px]">HSM</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-label-sm text-label-sm text-on-surface font-mono tracking-wider uppercase font-semibold block mb-2">
                  4. Execution Actions
                </span>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high cursor-grab flex items-center justify-between border border-surface-container-highest/30">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-base">confirmation_number</span>
                      <span className="font-body-sm text-body-sm text-on-surface">SAP S/4HANA Work Order</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline font-mono text-[10px]">ERP</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high cursor-grab flex items-center justify-between border border-surface-container-highest/30">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-base">tune</span>
                      <span className="font-body-sm text-body-sm text-on-surface">Direct SCADA Throttle / Trip</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline font-mono text-[10px]">PLC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column B: Center Interactive Canvas (6 cols) */}
          <div className="xl:col-span-6 bg-surface-container-lowest relative p-space-lg flex flex-col justify-center overflow-x-auto min-h-[620px]">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#dee1f9_1px,transparent_1px)] [background-size:24px_24px]"></div>

            <div className="relative z-10 flex flex-col gap-space-lg items-center py-4 min-w-[560px]">
              {/* NODE 1 */}
              <div
                onClick={() => setSelectedCanvasNode('node-01')}
                className={`w-full max-w-md rounded-xl p-space-md shadow-lg relative cursor-pointer transition-all border ${
                  selectedCanvasNode === 'node-01'
                    ? 'bg-surface-container-high ring-1 ring-secondary border-secondary/50'
                    : 'bg-surface-container-high/80 border-surface-container-highest'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-mono text-[10px] font-bold">
                    TRIGGER • TELEMETRY SPIKE
                  </span>
                  <span className="font-label-sm text-label-sm text-outline font-mono text-[10px]">#NODE-01</span>
                </div>
                <div className="flex items-start gap-space-sm mb-2">
                  <span className="material-symbols-outlined text-secondary mt-0.5">vibration</span>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      MPU6050 Vibration Spike &gt; 3.5 mm/s
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Asset: Turbine-07 (Line 3) • Peak: 4.82 mm/s</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-outline border-t border-surface-container-high/40">
                  <span>Ingest: 100Hz MQTT</span>
                  <span className="text-secondary font-bold">CONDITION MET</span>
                </div>
              </div>

              {/* Vector arrow */}
              <div className="flex flex-col items-center -my-2">
                <div className="w-0.5 h-6 bg-secondary"></div>
                <span className="material-symbols-outlined text-secondary text-sm -mt-1.5">arrow_drop_down</span>
              </div>

              {/* NODE 2 */}
              <div
                onClick={() => setSelectedCanvasNode('node-02')}
                className={`w-full max-w-md rounded-xl p-space-md shadow-xl relative cursor-pointer transition-all border ${
                  selectedCanvasNode === 'node-02'
                    ? 'bg-surface-container-high ring-1 ring-tertiary border-tertiary/50'
                    : 'bg-surface-container-high/80 border-surface-container-highest'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm font-mono text-[10px] font-bold">
                    AI REASONING • CAUSAL INFERENCE
                  </span>
                  <span className="font-label-sm text-label-sm text-outline font-mono text-[10px]">#NODE-02</span>
                </div>
                <div className="flex items-start gap-space-sm mb-2">
                  <span className="material-symbols-outlined text-tertiary mt-0.5">neurology</span>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Cognexa Neural Causal Engine
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Graph-GNN + Technical Manual Vector Search</p>
                  </div>
                </div>
                <div className="p-2 rounded bg-surface-container-lowest/80 mb-2 font-mono text-[11px] border border-surface-container-high/30">
                  <div className="text-on-surface">Diagnosis: <span className="text-tertiary font-bold">Bearing race micro-pitting</span></div>
                  <div className="text-outline">Confidence: <span className="text-secondary font-bold">96.4%</span> • Linked Lot: #B-409</div>
                </div>
              </div>

              {/* Vector arrow */}
              <div className="flex flex-col items-center -my-2">
                <div className="w-0.5 h-6 bg-tertiary"></div>
                <span className="material-symbols-outlined text-tertiary text-sm -mt-1.5">arrow_drop_down</span>
              </div>

              {/* NODE 3: Human Safety Gate (Selected) */}
              <div
                onClick={() => setSelectedCanvasNode('node-03')}
                className={`w-full max-w-md rounded-xl p-space-md shadow-xl relative cursor-pointer transition-all border ${
                  selectedCanvasNode === 'node-03'
                    ? 'bg-surface-container-high ring-2 ring-primary border-primary/60 shadow-[0_0_24px_rgba(99,102,241,0.25)]'
                    : 'bg-surface-container-high/80 border-surface-container-highest'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary font-label-sm text-label-sm font-mono text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                    GOVERNANCE • HUMAN SAFETY GATE
                  </span>
                  <span className="font-label-sm text-label-sm text-primary font-mono text-[10px] font-bold">
                    SELECTED
                  </span>
                </div>
                <div className="flex items-start gap-space-sm mb-2">
                  <span className="material-symbols-outlined text-primary mt-0.5">verified_user</span>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Human-in-the-Loop Safety Gate
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Target: Lead Plant Engineer (Dr. Sarah Chen)
                    </p>
                  </div>
                </div>
                <div className="p-2 rounded bg-surface-container-lowest/90 font-mono text-[11px] space-y-1 border border-surface-container-high/30">
                  <div className="flex justify-between text-outline">
                    <span>Policy Interlock:</span>
                    <span className="text-on-surface font-semibold">eIDAS Level 3 Required</span>
                  </div>
                  <div className="flex justify-between text-outline">
                    <span>Timeout Window:</span>
                    <span className="text-primary font-semibold">15 min (Escalate to Dir.)</span>
                  </div>
                </div>
              </div>

              {/* Parallel Flow Indicators */}
              <div className="w-72 flex justify-between px-12 -my-2">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-secondary"></div>
                  <span className="material-symbols-outlined text-secondary text-sm -mt-1.5">arrow_drop_down</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-secondary"></div>
                  <span className="material-symbols-outlined text-secondary text-sm -mt-1.5">arrow_drop_down</span>
                </div>
              </div>

              {/* PARALLEL NODES 4 & 5 */}
              <div className="grid grid-cols-2 gap-space-md w-full max-w-lg">
                <div
                  onClick={() => setSelectedCanvasNode('node-04')}
                  className="rounded-xl bg-surface-container-high p-space-sm shadow-md flex flex-col justify-between cursor-pointer border border-surface-container-highest"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary font-label-sm text-label-sm font-mono text-[9px] font-bold">
                        ACTION • ERP
                      </span>
                      <span className="font-label-sm text-label-sm text-outline font-mono text-[9px]">#NODE-04</span>
                    </div>
                    <h5 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-sm">
                      Create SAP Work Order
                    </h5>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">Order #40192 • Priority P1</p>
                  </div>
                  <div className="mt-2 pt-1 font-mono text-[10px] text-outline">
                    Kit: SKF-6205 Bearing (Bay 02)
                  </div>
                </div>

                <div
                  onClick={() => setSelectedCanvasNode('node-05')}
                  className="rounded-xl bg-surface-container-high p-space-sm shadow-md flex flex-col justify-between cursor-pointer border border-surface-container-highest"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm font-mono text-[9px] font-bold">
                        ACTION • NOTIFY
                      </span>
                      <span className="font-label-sm text-label-sm text-outline font-mono text-[9px]">#NODE-05</span>
                    </div>
                    <h5 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-sm">
                      Dispatch Tech &amp; Alert
                    </h5>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">Paging Tech Marco &amp; Sarah</p>
                  </div>
                  <div className="mt-2 pt-1 font-mono text-[10px] text-outline">
                    Broadcast: Slack #line-3-ops
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column C: Right Contextual Node Inspector (3 cols) */}
          <div className="xl:col-span-3 bg-surface-container-low/70 p-space-md flex flex-col justify-between border-l border-surface-container-high/40">
            <div className="space-y-space-md">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">tune</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold text-base">
                    Node Inspector
                  </span>
                </div>
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-primary-container/20 text-primary font-mono text-[10px]">
                  #NODE-03
                </span>
              </div>

              <div className="space-y-space-sm">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant font-mono block mb-1">
                    Approval Strategy
                  </label>
                  <div className="p-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm border border-surface-container-high/30">
                    Multi-Stakeholder Safety Gate
                  </div>
                </div>

                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant font-mono block mb-1">
                    Designated Approver
                  </label>
                  <div className="p-2 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-between border border-surface-container-high/30">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        className="w-5 h-5 rounded-full object-cover shrink-0"
                        alt="Dr. Sarah Chen"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCxNbs4X1arJiJq_YgJs4R-GrVXA7m-QMG4jxyDGkAXGshpD9Wm6VtqqRrkJrKCnkTUK1PsC6iwwqL1DITO12lSZVi1pPHQLGHkxfIbE9UMYneZyav_kYH3taqCYBZUaGZ4FS4c1i0KmHvr1QkipP8we9Hyql029mAuy4OhYUcakSiIgY86bwzY0VhxK7YkvK-cqxgr_56KUWGfIUBNwSTl569WR-N47Yvhbx-_3aoG_zrm0pZdlFr"
                      />
                      <span className="font-body-sm text-body-sm text-on-surface truncate">Dr. Sarah Chen</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary font-mono text-[10px]">L3 AUTH</span>
                  </div>
                </div>

                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant font-mono block mb-1">
                    Timeout Fallback Policy
                  </label>
                  <div className="p-2 rounded-lg bg-surface-container-lowest text-on-surface-variant font-mono text-[11px] leading-tight border border-surface-container-high/30">
                    Auto-derate motor to safe idle (60%) if unacknowledged after 900s.
                  </div>
                </div>

                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant font-mono block mb-1">
                    Cryptographic Token Requirement
                  </label>
                  <div className="p-2 rounded-lg bg-surface-container-lowest flex items-center justify-between border border-surface-container-high/30">
                    <span className="font-body-sm text-body-sm text-on-surface">eIDAS Hardware Token</span>
                    <span className="font-label-sm text-label-sm text-tertiary font-mono text-[10px]">STRICT</span>
                  </div>
                </div>

                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant font-mono block mb-1">
                    Context Payload Injected
                  </label>
                  <div className="p-2 rounded-lg bg-surface-container-lowest space-y-1 font-mono text-[11px] border border-surface-container-high/30">
                    <div className="flex items-center justify-between text-outline">
                      <span>Physical FFT Curve:</span>
                      <span className="text-secondary">ATTACHED</span>
                    </div>
                    <div className="flex items-center justify-between text-outline">
                      <span>Est. Downtime:</span>
                      <span className="text-error font-semibold">$210,000</span>
                    </div>
                    <div className="flex items-center justify-between text-outline">
                      <span>Linked Protocol:</span>
                      <span className="text-primary truncate max-w-[130px]">Confluence SOP-441</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-space-md space-y-2">
              <button 
                onClick={() => showToast('Configuration applied to Safety Gate #NODE-03')}
                className="w-full py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow"
              >
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>Apply Configuration</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PART C: LIVE RUN TRACE & CRYPTOGRAPHIC AUDIT LOG */}
      <section className="rounded-xl bg-surface-container-low p-space-lg shadow-xl flex flex-col gap-space-md border border-surface-container-high/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm pb-space-xs">
          <div className="flex items-center gap-space-md flex-wrap">
            <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary border border-surface-container-highest">
              <span className="material-symbols-outlined text-xl">terminal</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Live Execution Trace &amp; Cryptographic Audit Log
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-mono text-[10px]">
                  RUN #EXEC-99120-B
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Deterministic step-by-step telemetry, neuro-symbolic reasoning logs, and human-in-the-loop attestation events.
              </p>
            </div>
          </div>
        </div>

        {/* Execution Progress Step Ribbon */}
        <div className="p-space-sm rounded-lg bg-surface-container-lowest/80 flex items-center justify-between flex-wrap gap-space-sm font-mono text-xs border border-surface-container-high/30">
          <div className="flex items-center gap-2">
            <span className="text-secondary font-bold">Status:</span>
            <span className="text-on-surface">
              {signedStep ? 'Step 3 Approved • Moving to Step 4 & 5 Execution' : 'Step 3 of 5 (Awaiting Operator Sign-off)'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant text-[11px]">
            <div>Elapsed Time: <span className="text-on-surface font-bold">1m 24s</span></div>
            <div>Resource Usage: <span className="text-primary font-bold">0.04 Credits</span></div>
            <div>Hash Provenance: <span className="text-tertiary">0x8a7...df9</span></div>
          </div>
        </div>

        {/* Log Entries Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-outline uppercase text-[10px] tracking-wider bg-surface-container-high/50">
                <th className="py-2.5 px-space-md rounded-l-lg">Step / Time</th>
                <th className="py-2.5 px-space-md">Node Reference</th>
                <th className="py-2.5 px-space-md">Event Type</th>
                <th className="py-2.5 px-space-md">Payload &amp; Deterministic Output</th>
                <th className="py-2.5 px-space-md rounded-r-lg text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-surface-container-high/30 transition-colors">
                <td className="py-3 px-space-md text-on-surface-variant">
                  <span className="text-secondary font-bold">01</span> • 14:18:22.014
                </td>
                <td className="py-3 px-space-md text-on-surface">#NODE-01 (MPU6050)</td>
                <td className="py-3 px-space-md">
                  <span className="px-1.5 py-0.5 rounded bg-secondary/10 text-secondary text-[10px]">TRIGGER_PASS</span>
                </td>
                <td className="py-3 px-space-md text-on-surface-variant font-mono">
                  Sensor <span className="text-on-surface font-semibold">MPU6050_Z</span> registered{' '}
                  <span className="text-secondary font-bold">4.82 mm/s</span> (trip boundary: &gt;3.50 mm/s). Event ID #EVT-4091.
                </td>
                <td className="py-3 px-space-md text-right">
                  <span className="text-secondary font-bold">COMPLETED</span>
                </td>
              </tr>

              <tr className="hover:bg-surface-container-high/30 transition-colors">
                <td className="py-3 px-space-md text-on-surface-variant">
                  <span className="text-tertiary font-bold">02</span> • 14:18:22.420
                </td>
                <td className="py-3 px-space-md text-on-surface">#NODE-02 (Causal-GNN)</td>
                <td className="py-3 px-space-md">
                  <span className="px-1.5 py-0.5 rounded bg-tertiary-container/20 text-tertiary text-[10px]">INFERENCE_OK</span>
                </td>
                <td className="py-3 px-space-md text-on-surface-variant font-mono">
                  Root cause identified in <span className="text-on-surface">398ms</span>:{' '}
                  <span className="text-tertiary font-semibold">Lubricant spalling on outer race</span>. Causal graph correlated 34 edge points.
                </td>
                <td className="py-3 px-space-md text-right">
                  <span className="text-secondary font-bold">COMPLETED</span>
                </td>
              </tr>

              <tr className={`transition-colors ${signedStep ? 'bg-secondary/10' : 'bg-primary/5 hover:bg-primary/10'}`}>
                <td className="py-3 px-space-md text-on-surface-variant">
                  <span className="text-primary font-bold">03</span> • 14:18:23.100
                </td>
                <td className="py-3 px-space-md text-on-surface">#NODE-03 (HITL Safety)</td>
                <td className="py-3 px-space-md">
                  <span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary text-[10px] animate-pulse">
                    {signedStep ? 'SIGNED_OK' : 'AWAITING_SIG'}
                  </span>
                </td>
                <td className="py-3 px-space-md text-on-surface font-mono">
                  {signedStep ? (
                    <span className="text-secondary font-semibold">
                      Biometric signature validated via Dr. Sarah Chen (FIDO2 Token L3). Work Order dispatched.
                    </span>
                  ) : (
                    <span>
                      Dispatched interactive verification prompt to <span className="text-primary font-bold">Dr. Sarah Chen</span>. Awaiting biometric hardware token signature.
                    </span>
                  )}
                </td>
                <td className="py-3 px-space-md text-right">
                  {!signedStep ? (
                    <button
                      onClick={() => {
                        setSignedStep(true);
                        showToast('Biometric signature validated via Dr. Sarah Chen token #BER-NODE-891');
                      }}
                      className="px-2.5 py-1 rounded bg-primary text-on-primary font-bold text-[11px] hover:bg-primary-fixed-dim transition-colors cursor-pointer shadow-md"
                    >
                      SIGN NOW
                    </button>
                  ) : (
                    <span className="text-secondary font-bold">COMPLETED</span>
                  )}
                </td>
              </tr>

              <tr className="opacity-60 hover:opacity-90 transition-opacity">
                <td className="py-3 px-space-md text-outline">
                  <span>04</span> • QUEUED
                </td>
                <td className="py-3 px-space-md text-outline">#NODE-04 (SAP-PM)</td>
                <td className="py-3 px-space-md">
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-outline text-[10px]">SCHEDULED</span>
                </td>
                <td className="py-3 px-space-md text-outline font-mono">
                  Create SAP S/4HANA Work Order. Staged payload: Bay 02 Kit, Priority P1. Idempotency Key #IDEMP-8842-A.
                </td>
                <td className="py-3 px-space-md text-right text-outline">
                  {signedStep ? <span className="text-secondary">EXECUTING...</span> : 'PENDING PRE-REQ'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
