import React, { useState } from 'react';
import { GRAPH_NODES, GRAPH_EDGES } from '../../data/mockData';
import { GraphNode } from '../../types';

interface KnowledgeGraphViewProps {
  onOpenAskCognexa: () => void;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({
  onOpenAskCognexa
}) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode>(GRAPH_NODES[0]);
  const [layoutMode, setLayoutMode] = useState<'force' | 'hierarchical' | 'radial'>('force');
  const [showAiInferences, setShowAiInferences] = useState(true);
  const [zoomScale, setZoomScale] = useState(1.0);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [minConfidence, setMinConfidence] = useState(85);
  const [temporalWindow, setTemporalWindow] = useState('24h');
  const [searchFilter, setSearchFilter] = useState('Turbine-07 (Munich Plant - Line 3)');
  const [isPlayingEvolution, setIsPlayingEvolution] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({
    machine: true,
    sensor: true,
    incident: true,
    maintenance: true,
    document: true,
    personnel: true,
    shift_log: true,
    scada: true
  });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleZoom = (delta: number) => {
    setZoomScale((prev) => Math.min(2.2, Math.max(0.4, +(prev + delta).toFixed(2))));
  };

  const handleRecenter = () => {
    setZoomScale(1.0);
    setPanOffset({ x: 0, y: 0 });
    triggerToast('Graph centered on focal asset: Turbine Assembly #07');
  };

  const handleExpandHop = () => {
    triggerToast('Expanded +1 Hop: Ingested 18 additional peripheral nodes from SCADA & SAP.');
  };

  const handlePlayEvolution = () => {
    setIsPlayingEvolution(!isPlayingEvolution);
    if (!isPlayingEvolution) {
      triggerToast('Replaying 24h temporal graph expansion & causal correlation cascade...');
    }
  };

  return (
    <div className="flex flex-col w-full text-on-surface select-none relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2 rounded-lg bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm shadow-xl animate-fade flex items-center gap-2 border border-tertiary">
          <span className="material-symbols-outlined text-sm">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP EXPLORER TOOLBAR */}
      <header className="flex flex-col gap-space-sm p-space-md bg-surface-container-lowest/90 backdrop-blur-md shadow-md z-30 border-b border-surface-container-high/30">
        <div className="flex flex-wrap items-center justify-between gap-space-md">
          {/* Search & Target Focal Node */}
          <div className="flex-1 min-w-[320px] max-w-2xl relative">
            <div className="relative flex items-center w-full">
              <span className="material-symbols-outlined absolute left-3.5 text-secondary text-base">hub</span>
              <input
                className="w-full h-10 pl-11 pr-24 rounded bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner border border-surface-container-high/40"
                id="graph-search-input"
                placeholder="Search entities, sensors, docs, CVEs, or personnel across 48,190 active graph nodes..."
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
              <div className="absolute right-2.5 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2" title="Live stream: Synced <1s ago">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="font-label-sm text-label-sm text-secondary bg-surface-container-high px-1.5 py-0.5 rounded font-mono">
                  NODE #704
                </span>
                <span className="font-label-sm text-label-sm text-outline bg-surface-container-high px-1.5 py-0.5 rounded font-mono">
                  /
                </span>
              </div>
            </div>
          </div>

          {/* Controls & Toggle Stack */}
          <div className="flex flex-wrap items-center gap-space-sm">
            {/* Layout Mode Toggle */}
            <div className="flex items-center p-0.5 rounded bg-surface-container-low shadow-sm border border-surface-container-high/40">
              <button
                onClick={() => setLayoutMode('force')}
                className={`flex items-center gap-1 px-space-sm py-1.5 rounded font-label-sm text-label-sm transition-all ${
                  layoutMode === 'force'
                    ? 'bg-surface-container-high text-on-surface font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-xs text-secondary">scatter_plot</span>
                <span>Force-Directed</span>
              </button>
              <button
                onClick={() => setLayoutMode('hierarchical')}
                className={`flex items-center gap-1 px-space-sm py-1.5 rounded font-label-sm text-label-sm transition-all ${
                  layoutMode === 'hierarchical'
                    ? 'bg-surface-container-high text-on-surface font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-xs">account_tree</span>
                <span>Hierarchical</span>
              </button>
              <button
                onClick={() => setLayoutMode('radial')}
                className={`flex items-center gap-1 px-space-sm py-1.5 rounded font-label-sm text-label-sm transition-all ${
                  layoutMode === 'radial'
                    ? 'bg-surface-container-high text-on-surface font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-xs">donut_large</span>
                <span>Radial Cluster</span>
              </button>
            </div>

            {/* AI-Inferred Links Highlight Toggle */}
            <button
              onClick={() => setShowAiInferences(!showAiInferences)}
              className={`group relative flex items-center gap-2 px-space-md py-1.5 rounded shadow-sm transition-all border ${
                showAiInferences
                  ? 'bg-tertiary-container/30 text-tertiary border-tertiary/40 shadow-[0_0_16px_rgba(183,109,255,0.25)]'
                  : 'bg-surface-container-low text-outline border-surface-container-high'
              }`}
            >
              <span className="relative flex h-2 w-2">
                {showAiInferences && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${showAiInferences ? 'bg-tertiary' : 'bg-outline'}`}></span>
              </span>
              <span className="font-label-sm text-label-sm font-semibold tracking-wide">
                AI Inferences: <span className="font-mono">{showAiInferences ? 'ACTIVE (34)' : 'MUTED (0)'}</span>
              </span>
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
            </button>

            {/* Viewport Controls */}
            <div className="flex items-center rounded bg-surface-container-low shadow-sm p-0.5 border border-surface-container-high/40">
              <button
                onClick={() => handleZoom(0.15)}
                className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-sm">zoom_in</span>
              </button>
              <button
                onClick={() => handleZoom(-0.15)}
                className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-sm">zoom_out</span>
              </button>
              <button
                onClick={handleRecenter}
                className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"
                title="Fit to Canvas"
              >
                <span className="material-symbols-outlined text-sm">fit_screen</span>
              </button>
              <button
                onClick={() => setZoomScale(1.0)}
                className="px-2 py-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded font-label-sm text-label-sm font-mono"
                title="Reset View"
              >
                {Math.round(zoomScale * 100)}%
              </button>
            </div>
          </div>
        </div>

        {/* Sub-bar Stats & Quick Filter State */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs font-label-sm text-label-sm text-on-surface-variant border-t border-surface-container-high/20">
          <div className="flex items-center gap-space-md flex-wrap">
            <div className="flex items-center gap-1.5 text-secondary">
              <span className="material-symbols-outlined text-sm">share</span>
              <span className="font-mono text-on-surface">48,190</span> Nodes
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-outline">timeline</span>
              <span className="font-mono text-on-surface">142,850</span> Edges
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1.5 bg-surface-container-low px-2 py-0.5 rounded border border-surface-container-high/40">
              <span className="text-tertiary">Deterministic Faithfulness:</span>
              <span className="font-mono text-secondary font-semibold">96.4%</span>
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1.5 text-outline">
              <span>Active Subgraph:</span>
              <span className="text-on-surface font-mono">2-Hop Horizon (Line 3 Extrusion / Powertrain)</span>
            </div>
          </div>

          <div className="flex items-center gap-space-xs">
            <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface text-[11px] font-mono">K-Core: 4</span>
            <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface text-[11px] font-mono">Modularity: 0.824</span>
          </div>
        </div>
      </header>

      {/* 3-PANE WORKBENCH BODY */}
      <div className="relative flex flex-1 w-full overflow-hidden min-h-[calc(100vh-14rem)]">
        {/* LEFT: ONTOLOGY & FACET FILTER PANEL (320px) */}
        <aside className="w-80 shrink-0 bg-surface-container-lowest/95 backdrop-blur-xl flex flex-col justify-between shadow-xl z-20 overflow-y-auto max-h-[calc(100vh-14rem)] border-r border-surface-container-high/40">
          <div className="p-space-md flex flex-col gap-space-md">
            {/* Panel Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-base">tune</span>
                <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">Graph Facets</span>
              </div>
              <button
                onClick={() => {
                  setActiveFilters({
                    machine: true,
                    sensor: true,
                    incident: true,
                    maintenance: true,
                    document: true,
                    personnel: true,
                    shift_log: true,
                    scada: true
                  });
                  setMinConfidence(85);
                  setShowAiInferences(true);
                  triggerToast('Filters reset to default state');
                }}
                className="font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* Node Types Filter Checklist */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-1">
                <span>Entity Class</span>
                <span>Count</span>
              </div>

              {[
                { key: 'machine', label: 'Machine', color: 'bg-[#6366F1]', count: '142' },
                { key: 'sensor', label: 'Sensor / Telemetry', color: 'bg-[#22D3EE]', count: '12,482' },
                { key: 'incident', label: 'Incident / Anomaly', color: 'bg-[#EF4444]', count: '28', textErr: true },
                { key: 'maintenance', label: 'Maintenance Order', color: 'bg-[#38BDF8]', count: '1,412' },
                { key: 'document', label: 'Document / SOP', color: 'bg-[#F59E0B]', count: '8,920' },
                { key: 'personnel', label: 'Personnel / Operator', color: 'bg-[#10B981]', count: '340' },
                { key: 'shift_log', label: 'Shift Logs & Chats', color: 'bg-[#A855F7]', count: '14,890' },
                { key: 'scada', label: 'SCADA / PLC / ERP', color: 'bg-[#94A3B8]', count: '18' }
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center justify-between px-space-sm py-1.5 rounded hover:bg-surface-container-high cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={activeFilters[item.key] ?? true}
                      onChange={(e) => setActiveFilters({ ...activeFilters, [item.key]: e.target.checked })}
                      className="w-3.5 h-3.5 rounded bg-surface-container text-primary focus:ring-0 cursor-pointer"
                    />
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-sm`}></span>
                    <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <span className={`font-label-sm text-label-sm font-mono ${item.textErr ? 'text-error font-semibold' : 'text-on-surface-variant'}`}>
                    {item.count}
                  </span>
                </label>
              ))}
            </div>

            {/* Relationship Edge Legend */}
            <div className="flex flex-col gap-space-xs p-space-sm rounded bg-surface-container-low border border-surface-container-high/40">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-0.5">
                Edge Semantic Class
              </span>
              <div className="flex items-center gap-2 text-[11px] font-label-sm text-on-surface">
                <span className="w-6 h-0.5 bg-outline"></span>
                <span>Deterministic Physical / API Link</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-label-sm text-tertiary">
                <span className="w-6 h-0.5 border-t-2 border-dashed border-tertiary shadow-[0_0_8px_rgba(183,109,255,0.7)]"></span>
                <span>AI Neural Inference / Causal Arc</span>
              </div>
            </div>

            {/* AI Confidence Threshold */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">Min AI Confidence</span>
                <span className="font-label-sm text-label-sm text-tertiary font-mono font-bold bg-surface-container-high px-1.5 py-0.5 rounded border border-surface-container-highest">
                  ≥ {minConfidence}%
                </span>
              </div>
              <input
                className="w-full h-1 bg-surface-container-high rounded accent-tertiary cursor-pointer"
                max="99"
                min="50"
                type="range"
                value={minConfidence}
                onChange={(e) => setMinConfidence(Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] font-mono text-outline">
                <span>50% (Exploratory)</span>
                <span>99% (Strict)</span>
              </div>
            </div>

            {/* Temporal Filter with Sparkline Spikes */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">Temporal Window</span>
                <span className="font-label-sm text-label-sm text-secondary font-mono">{temporalWindow}</span>
              </div>
              <div className="relative h-9 w-full bg-surface-container-low rounded flex items-end px-1 gap-1 overflow-hidden border border-surface-container-high/40">
                {[20, 30, 25, 40, 35, 50, 45, 70, 85, 95, 60, 40, 55, 30].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`w-[6%] rounded-t ${
                      h > 90 ? 'bg-error animate-pulse' : h > 75 ? 'bg-tertiary' : 'bg-secondary/60'
                    }`}
                  ></div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-1">
                {['1h', '24h', '7d', '30d'].map((win) => (
                  <button
                    key={win}
                    onClick={() => setTemporalWindow(win)}
                    className={`py-1 text-center font-label-sm text-label-sm rounded transition-colors ${
                      temporalWindow === win
                        ? 'bg-primary text-on-primary font-semibold'
                        : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {win}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingestion Source Connectors */}
            <div className="flex flex-col gap-1.5 pb-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Source Connectors
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Siemens SCADA', 'SAP ERP S/4', 'Confluence', 'AWS IoT Core', 'Jira & Git'].map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-surface-container-high text-on-surface text-[11px] font-label-sm border border-surface-container-highest"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Graph Health Status */}
          <div className="p-space-sm bg-surface-container-low/70 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-surface-container-high/30">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Ingestion: 1.4k events/sec
            </span>
            <span className="font-mono text-secondary">SYNCED</span>
          </div>
        </aside>

        {/* CENTER: PANORAMIC INTERACTIVE GRAPH CANVAS */}
        <main className="relative flex-1 bg-surface-container-lowest overflow-hidden flex flex-col justify-center items-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#5de6ff_1px,transparent_1px)] [background-size:32px_32px]"></div>

          {/* Coordinate Compass HUD Overlays */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
            <div className="px-2.5 py-1 rounded bg-surface-container-lowest/80 backdrop-blur text-secondary font-mono text-[11px] border border-surface-container-high/40">
              HORIZON: MUNICH_GIGA_04 // SUBGRAPH_LINE3
            </div>
            <div className="px-2 py-1 rounded bg-surface-container-lowest/80 text-outline font-mono text-[11px] border border-surface-container-high/40">
              COORDS: X:412.8 Y:-109.4 Z:0
            </div>
          </div>

          {/* SVG GRAPH ENGINE VIEWPORT */}
          <div
            className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform duration-300"
            style={{
              transform: `scale(${zoomScale}) translate(${panOffset.x}px, ${panOffset.y}px)`
            }}
          >
            <svg
              className="w-full h-full min-h-[640px]"
              viewBox="0 0 1100 700"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter height="200%" id="glow-violet" width="200%" x="-50%" y="-50%">
                  <feGaussianBlur result="blur" stdDeviation="6"></feGaussianBlur>
                  <feMerge>
                    <feMergeNode in="blur"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
                <filter height="200%" id="glow-cyan" width="200%" x="-50%" y="-50%">
                  <feGaussianBlur result="blur" stdDeviation="4"></feGaussianBlur>
                  <feMerge>
                    <feMergeNode in="blur"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
                <filter height="200%" id="glow-red" width="200%" x="-50%" y="-50%">
                  <feGaussianBlur result="blur" stdDeviation="8"></feGaussianBlur>
                  <feMerge>
                    <feMergeNode in="blur"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>

                <marker id="arrow-cyan" markerHeight="6" markerWidth="6" orient="auto-start-reverse" refX="24" refY="5" viewBox="0 0 10 10">
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#5de6ff"></path>
                </marker>
                <marker id="arrow-violet" markerHeight="6" markerWidth="6" orient="auto-start-reverse" refX="24" refY="5" viewBox="0 0 10 10">
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#ddb7ff"></path>
                </marker>
                <marker id="arrow-default" markerHeight="5" markerWidth="5" orient="auto-start-reverse" refX="24" refY="5" viewBox="0 0 10 10">
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#908fa0"></path>
                </marker>
              </defs>

              {/* 1. DETERMINISTIC EDGES */}
              <g className="stroke-outline-variant/60" strokeWidth="1.75">
                <line markerEnd="url(#arrow-default)" x1="550" x2="300" y1="350" y2="470"></line>
                <line markerEnd="url(#arrow-cyan)" stroke="#5de6ff" strokeOpacity="0.8" x1="550" x2="360" y1="350" y2="210"></line>
                <line markerEnd="url(#arrow-cyan)" stroke="#5de6ff" strokeOpacity="0.8" x1="550" x2="230" y1="350" y2="330"></line>
                <line markerEnd="url(#arrow-cyan)" stroke="#5de6ff" strokeOpacity="0.8" x1="550" x2="430" y1="350" y2="520"></line>
                <line markerEnd="url(#arrow-default)" x1="550" x2="720" y1="350" y2="180"></line>
                <line markerEnd="url(#arrow-default)" x1="550" x2="840" y1="350" y2="280"></line>
                <line markerEnd="url(#arrow-default)" x1="550" x2="780" y1="350" y2="480"></line>
                <line markerEnd="url(#arrow-default)" stroke="#ffb4ab" strokeWidth="2" x1="570" x2="550" y1="160" y2="350"></line>
              </g>

              {/* 2. AI-INFERRED CAUSAL EDGES */}
              {showAiInferences && (
                <g className="transition-opacity duration-300">
                  <path
                    d="M 360 210 Q 450 140 570 160"
                    fill="none"
                    filter="url(#glow-violet)"
                    markerEnd="url(#arrow-violet)"
                    stroke="#ddb7ff"
                    strokeDasharray="6,4"
                    strokeWidth="2.5"
                  ></path>
                  <path
                    d="M 880 150 Q 720 120 570 160"
                    fill="none"
                    filter="url(#glow-violet)"
                    markerEnd="url(#arrow-violet)"
                    stroke="#ddb7ff"
                    strokeDasharray="6,4"
                    strokeWidth="2.5"
                  ></path>
                  <path
                    d="M 780 480 Q 710 320 570 160"
                    fill="none"
                    filter="url(#glow-violet)"
                    markerEnd="url(#arrow-violet)"
                    stroke="#ddb7ff"
                    strokeDasharray="6,4"
                    strokeWidth="2.5"
                  ></path>
                  <line
                    filter="url(#glow-violet)"
                    stroke="#ddb7ff"
                    strokeDasharray="4,4"
                    strokeWidth="1.8"
                    x1="720"
                    x2="840"
                    y1="180"
                    y2="280"
                  ></line>
                </g>
              )}

              {/* 3. EDGE LABELS */}
              <g className="font-mono text-[10px]">
                {showAiInferences && (
                  <>
                    <rect fill="#161b2b" height="18" rx="9" width="112" x="420" y="145"></rect>
                    <text fill="#ddb7ff" fontWeight="600" textAnchor="middle" x="476" y="157">
                      inferred_cause 96.4%
                    </text>
                    <rect fill="#161b2b" height="18" rx="9" width="124" x="690" y="115"></rect>
                    <text fill="#ddb7ff" textAnchor="middle" x="752" y="127">
                      whine_correlated 91%
                    </text>
                  </>
                )}
                <rect fill="#080d1d" height="16" opacity="0.85" rx="4" width="94" x="640" y="420"></rect>
                <text fill="#908fa0" textAnchor="middle" x="687" y="432">maintained_by</text>
                <rect fill="#080d1d" height="16" opacity="0.85" rx="4" width="92" x="685" y="305"></rect>
                <text fill="#908fa0" textAnchor="middle" x="731" y="317">supervised_by</text>
                <rect fill="#080d1d" height="16" opacity="0.85" rx="4" width="80" x="420" y="270"></rect>
                <text fill="#5de6ff" textAnchor="middle" x="460" y="282">vibration_feed</text>
              </g>

              {/* 4. GRAPH NODES */}
              {/* Node MPU6050 */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedNode(GRAPH_NODES[1])}
                transform="translate(360, 210)"
              >
                <circle fill="#161b2b" r="26"></circle>
                <circle className="group-hover:stroke-width-3" fill="none" r="26" stroke="#22D3EE" strokeWidth="2"></circle>
                <circle fill="#22D3EE" filter="url(#glow-cyan)" r="7"></circle>
                <text fill="#dee1f9" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle" y="-32">
                  MPU6050 Tri-Axis
                </text>
                <text fill="#22D3EE" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" y="42">
                  4.82 mm/s [HIGH]
                </text>
              </g>

              {/* Node DHT22 */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedNode(GRAPH_NODES[2])}
                transform="translate(230, 330)"
              >
                <circle fill="#161b2b" r="22"></circle>
                <circle fill="none" r="22" stroke="#22D3EE" strokeWidth="1.5"></circle>
                <circle fill="#22D3EE" r="5"></circle>
                <text fill="#c7c4d7" fontFamily="Inter" fontSize="11" textAnchor="middle" y="-28">DHT22 Thermal</text>
                <text fill="#22D3EE" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" y="36">79.2°C</text>
              </g>

              {/* Node ACS712 */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedNode(GRAPH_NODES[3])}
                transform="translate(430, 520)"
              >
                <circle fill="#161b2b" r="22"></circle>
                <circle fill="none" r="22" stroke="#22D3EE" strokeWidth="1.5"></circle>
                <circle fill="#22D3EE" r="5"></circle>
                <text fill="#c7c4d7" fontFamily="Inter" fontSize="11" textAnchor="middle" y="-28">ACS712 Motor Load</text>
                <text fill="#22D3EE" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" y="36">41.8 A</text>
              </g>

              {/* Node PLC */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedNode(GRAPH_NODES[4])}
                transform="translate(300, 470)"
              >
                <rect fill="#161b2b" height="48" rx="8" width="48" x="-24" y="-24"></rect>
                <rect fill="none" height="48" rx="8" stroke="#94A3B8" strokeWidth="2" width="48" x="-24" y="-24"></rect>
                <text fill="#94A3B8" fontFamily="JetBrains Mono" fontSize="12" fontWeight="700" textAnchor="middle" y="4">PLC</text>
                <text fill="#c7c4d7" fontFamily="Inter" fontSize="11" textAnchor="middle" y="38">Siemens S7-1500</text>
              </g>

              {/* Node INC-8942 */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedNode(GRAPH_NODES[5])}
                transform="translate(570, 160)"
              >
                <circle className="animate-ping" fill="none" r="36" stroke="#EF4444" strokeOpacity="0.4" strokeWidth="1.5"></circle>
                <polygon fill="#161b2b" filter="url(#glow-red)" points="0,-28 28,18 -28,18" stroke="#EF4444" strokeWidth="2.5"></polygon>
                <text fill="#EF4444" fontFamily="JetBrains Mono" fontSize="13" fontWeight="800" textAnchor="middle" y="8">!</text>
                <text fill="#ffb4ab" fontFamily="Inter" fontSize="12" fontWeight="700" textAnchor="middle" y="-36">INC-8942 (CRITICAL)</text>
                <text fill="#EF4444" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" y="34">Bearing Spalling</text>
              </g>

              {/* Node SOP-441 */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedNode(GRAPH_NODES[6])}
                transform="translate(720, 180)"
              >
                <rect fill="#161b2b" height="44" rx="6" width="44" x="-22" y="-22"></rect>
                <rect fill="none" height="44" rx="6" stroke="#F59E0B" strokeWidth="2" width="44" x="-22" y="-22"></rect>
                <text fill="#F59E0B" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" textAnchor="middle" y="5">SOP</text>
                <text fill="#dee1f9" fontFamily="Inter" fontSize="11" textAnchor="middle" y="-28">SOP-441 Lubrication</text>
                <text fill="#F59E0B" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" y="36">v3.4 Rev</text>
              </g>

              {/* Node Sarah Chen */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedNode(GRAPH_NODES[7])}
                transform="translate(840, 280)"
              >
                <circle fill="#161b2b" r="24"></circle>
                <circle fill="none" r="24" stroke="#10B981" strokeWidth="2"></circle>
                <circle fill="#10B981" fillOpacity="0.2" r="16"></circle>
                <text fill="#10B981" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" textAnchor="middle" y="4">SC</text>
                <text fill="#dee1f9" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle" y="-32">Sarah Chen</text>
                <text fill="#10B981" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" y="38">Lead Reliability Eng</text>
              </g>

              {/* Node Shift 3 Log */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedNode(GRAPH_NODES[8])}
                transform="translate(880, 150)"
              >
                <circle fill="#161b2b" r="20"></circle>
                <circle fill="none" r="20" stroke="#A855F7" strokeWidth="1.75"></circle>
                <text fill="#A855F7" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle" y="4">LOG</text>
                <text fill="#dee1f9" fontFamily="Inter" fontSize="11" textAnchor="middle" y="-26">Shift 3 Whine Note</text>
                <text fill="#A855F7" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" y="34">@3.2kHz Acoustic</text>
              </g>

              {/* Node SAP WO */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedNode(GRAPH_NODES[9])}
                transform="translate(780, 480)"
              >
                <rect fill="#161b2b" height="40" rx="4" width="48" x="-24" y="-20"></rect>
                <rect fill="none" height="40" rx="4" stroke="#38BDF8" strokeWidth="2" width="48" x="-24" y="-20"></rect>
                <text fill="#38BDF8" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle" y="5">SAP</text>
                <text fill="#dee1f9" fontFamily="Inter" fontSize="11" textAnchor="middle" y="-26">WO #40192</text>
                <text fill="#38BDF8" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" y="36">Batch #B-409</text>
              </g>

              {/* FOCAL NODE: Turbine-07 */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedNode(GRAPH_NODES[0])}
                transform="translate(550, 350)"
              >
                <circle className="animate-ping" fill="none" r="56" stroke="#8083ff" strokeOpacity="0.3" strokeWidth="1.5"></circle>
                <circle className="animate-spin" fill="none" r="46" stroke="#EF4444" strokeDasharray="4,3" strokeWidth="2" style={{ animationDuration: '25s' }}></circle>
                <circle fill="#161b2b" filter="url(#glow-cyan)" r="38" stroke="#6366F1" strokeWidth="3.5"></circle>
                <text fill="#e1e0ff" fontFamily="JetBrains Mono" fontSize="20" fontWeight="900" textAnchor="middle" y="7">T-07</text>
                <rect fill="#080d1d" height="22" rx="11" stroke="#6366F1" strokeWidth="1" width="190" x="-95" y="-62"></rect>
                <text fill="#ffffff" fontFamily="Inter" fontSize="12" fontWeight="700" textAnchor="middle" y="-47">TURBINE ASSEMBLY #07</text>
                <rect fill="#93000a" height="18" opacity="0.9" rx="4" width="170" x="-85" y="46"></rect>
                <text fill="#ffdad6" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle" y="59">HARMONIC VIBRATION TRIP RISK</text>
              </g>
            </svg>
          </div>

          {/* FLOATING HUD MINIMAP (Bottom-Left) */}
          <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-1.5 p-space-sm rounded bg-surface-container-lowest/90 backdrop-blur-xl shadow-2xl border border-surface-container-high/40">
            <div className="flex items-center justify-between font-label-sm text-label-sm text-outline mb-1">
              <span className="flex items-center gap-1 font-mono uppercase text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Spatial Radar
              </span>
              <span className="font-mono text-[10px]">LOD: HIGH</span>
            </div>
            <div className="relative w-36 h-24 bg-surface-container-high/60 rounded overflow-hidden border border-surface-container-highest">
              <div className="absolute w-2 h-2 rounded-full bg-error left-1/2 top-1/3 -translate-x-1/2 animate-ping"></div>
              <div className="absolute w-2.5 h-2.5 rounded-full bg-primary left-1/2 top-1/2 -translate-x-1/2 shadow-sm"></div>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-secondary left-1/3 top-1/4"></div>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-tertiary right-1/4 top-1/4"></div>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-outline-variant right-1/4 bottom-1/4"></div>
              <div className="absolute inset-2 bg-secondary/10 rounded border border-secondary/30"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-on-surface-variant">
              <span>DENSITY: 2.4/k</span>
              <span className="text-secondary font-mono">Z: {zoomScale.toFixed(2)}x</span>
            </div>
          </div>

          {/* Quick Action Floating Bar (Bottom-Center) */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-space-xs p-1 rounded-full bg-surface-container-high/90 backdrop-blur-xl shadow-xl border border-surface-container-highest">
            <button
              onClick={handleRecenter}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-bright text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs text-secondary">my_location</span>
              <span>Center Focal</span>
            </button>
            <button
              onClick={handleExpandHop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-bright text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs text-tertiary">hub</span>
              <span>Expand +1 Hop</span>
            </button>
            <button
              onClick={handlePlayEvolution}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer ${
                isPlayingEvolution ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container hover:bg-surface-bright'
              }`}
            >
              <span className="material-symbols-outlined text-xs text-primary">play_arrow</span>
              <span>{isPlayingEvolution ? 'Replaying...' : 'Play Evolution'}</span>
            </button>
          </div>
        </main>

        {/* RIGHT: ACTIVE NODE INSPECTION & CONTEXTUAL MEMORY DRAWER (384px) */}
        <aside className="w-96 shrink-0 bg-surface-container-lowest/95 backdrop-blur-xl flex flex-col justify-between shadow-2xl z-20 overflow-y-auto max-h-[calc(100vh-14rem)] border-l border-surface-container-high/40">
          <div className="flex flex-col gap-space-md p-space-lg">
            {/* Active Selection Header */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-primary/20 text-primary uppercase font-mono font-semibold">
                  {selectedNode.type.toUpperCase()} ASSET NODE
                </span>
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-error bg-error-container/30 px-2 py-0.5 rounded font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                  CRITICAL STATE
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight mt-1">
                {selectedNode.title}
              </h2>
              <span className="font-label-sm text-label-sm text-secondary font-mono">
                UUID: {selectedNode.metadata?.UUID || 'TURB-MNCH-07-L3'} • {selectedNode.metadata?.Model || 'Siemens Simotics'}
              </span>
            </div>

            {/* AI Primary Action CTA */}
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenAskCognexa}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-space-md rounded bg-primary text-on-primary hover:bg-primary-fixed-dim transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.35)] group cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                <span className="font-label-md text-label-md font-bold">Ask Cognexa about this Node</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={handleExpandHop}
                  className="flex items-center justify-center gap-1.5 py-1.5 px-space-sm rounded bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors border border-surface-container-high/40"
                >
                  <span className="material-symbols-outlined text-xs text-secondary">schema</span>
                  <span>2-Hop Subgraph</span>
                </button>
                <button 
                  onClick={() => triggerToast('Exported complete RDF lineage graph JSON')}
                  className="flex items-center justify-center gap-1.5 py-1.5 px-space-sm rounded bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors border border-surface-container-high/40"
                >
                  <span className="material-symbols-outlined text-xs">download</span>
                  <span>Export Lineage</span>
                </button>
              </div>
            </div>

            {/* Autonomous Causal Synthesis Box */}
            <div className="p-space-md rounded bg-tertiary-container/15 shadow-[0_0_24px_-4px_rgba(168,85,247,0.15)] flex flex-col gap-space-xs border border-tertiary/20">
              <div className="flex items-center gap-1.5 text-tertiary font-label-sm text-label-sm font-semibold font-mono">
                <span className="material-symbols-outlined text-sm">psychology</span>
                <span>Cognitive Root-Cause Synthesis</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface leading-snug">
                {selectedNode.title} is exhibiting anomalous vibration (<span className="font-mono text-error font-semibold">4.82 mm/s</span> @ 3.2kHz harmonic) strongly correlated (<span className="font-mono text-tertiary font-bold">96.4%</span>) with degradation in SAP Batch <span className="font-mono text-secondary">#B-409</span> lubricant. Three historical bearing race spallings occurred under identical thermal gradients.
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-outline pt-1 border-t border-tertiary/20">
                <span>Graph Distance: 1 hop</span>
                <span className="text-tertiary font-semibold">Verified by Neural Reasoner</span>
              </div>
            </div>

            {/* Node Metadata & Properties Grid */}
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-mono">
                Asset Properties
              </span>
              <div className="grid grid-cols-2 gap-2 p-space-sm rounded bg-surface-container-low font-mono text-[11px] border border-surface-container-high/30">
                <div>
                  <div className="text-outline text-[10px]">Ingestion Pipe</div>
                  <div className="text-on-surface truncate">{selectedNode.metadata?.Protocol || 'Siemens OPC-UA:4840'}</div>
                </div>
                <div>
                  <div className="text-outline text-[10px]">Operational Uptime</div>
                  <div className="text-secondary">{selectedNode.metadata?.Uptime || '99.14% (114d trip-free)'}</div>
                </div>
                <div>
                  <div className="text-outline text-[10px]">Connected Degree</div>
                  <div className="text-on-surface font-semibold">{selectedNode.degree} (6 Det, 8 AI)</div>
                </div>
                <div>
                  <div className="text-outline text-[10px]">Responsible Lead</div>
                  <div className="text-on-surface truncate">{selectedNode.metadata?.Lead || 'Sarah Chen (Eng)'}</div>
                </div>
              </div>
            </div>

            {/* Connected Entities Roster */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-mono">
                  Connected Entities (6)
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-mono">Top Impact</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { title: 'INC-8942 Bearing Spalling', sub: 'Incident • affects', badge: 'CRIT', badgeColor: 'bg-error-container/40 text-error', dot: 'bg-[#EF4444]' },
                  { title: 'MPU6050 Accelerometer', sub: 'Sensor • 4.82 mm/s live', badge: '120Hz', badgeColor: 'bg-surface-container-high text-secondary', dot: 'bg-[#22D3EE]' },
                  { title: 'SAP Work Order #40192', sub: 'Maintenance • Seal & Lube', badge: 'Batch-409', badgeColor: 'bg-surface-container-high text-on-surface-variant', dot: 'bg-[#38BDF8]' },
                  { title: 'Confluence SOP-441', sub: 'Document • Thermal Limits', badge: 'v3.4', badgeColor: 'bg-surface-container-high text-on-surface-variant', dot: 'bg-[#F59E0B]' }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer group border border-surface-container-high/30"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.dot}`}></span>
                      <div className="flex flex-col">
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-secondary font-medium">
                          {item.title}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline font-mono">{item.sub}</span>
                      </div>
                    </div>
                    <span className={`font-label-sm text-label-sm px-1.5 py-0.5 rounded font-mono ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contextual Memory Chronological Timeline */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-mono">
                  Contextual Memory
                </span>
                <span className="font-label-sm text-label-sm text-tertiary font-mono">Episodic Trace</span>
              </div>
              <div className="relative pl-4 space-y-3 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
                <div className="relative flex flex-col gap-0.5">
                  <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-error ring-4 ring-surface-container-lowest"></div>
                  <span className="font-label-sm text-label-sm font-mono text-error font-semibold">14:22 UTC (Today)</span>
                  <p className="font-body-sm text-body-sm text-on-surface">
                    Vibration spike @ 3.2kHz harmonic detected by MPU6050 (<span className="font-mono text-tertiary">96.4% confidence</span>).
                  </p>
                </div>
                <div className="relative flex flex-col gap-0.5">
                  <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-secondary ring-4 ring-surface-container-lowest"></div>
                  <span className="font-label-sm text-label-sm font-mono text-on-surface-variant">08:30 UTC (Yesterday)</span>
                  <p className="font-body-sm text-body-sm text-on-surface">
                    SAP Batch #B-409 Lubricant loaded into intake reservoir during shift cycle 2.
                  </p>
                </div>
                <div className="relative flex flex-col gap-0.5">
                  <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-outline ring-4 ring-surface-container-lowest"></div>
                  <span className="font-label-sm text-label-sm font-mono text-on-surface-variant">3 Weeks ago</span>
                  <p className="font-body-sm text-body-sm text-on-surface">
                    Jira ticket #ENG-3392 closed: mechanical seal replacement cleared by Sarah Chen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Provenance & Cryptographic Audit Footer */}
          <div className="p-space-sm bg-surface-container-low flex flex-col gap-1 font-label-sm text-label-sm border-t border-surface-container-high/30">
            <div className="flex items-center justify-between text-outline text-[10px]">
              <span>STATE HASH</span>
              <span className="font-mono text-secondary">SHA-256: 8f3c...b04a</span>
            </div>
            <div className="flex items-center justify-between text-outline text-[10px]">
              <span>VERIFICATION</span>
              <span className="text-tertiary">Deterministic Lineage Validated</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
