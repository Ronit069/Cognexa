import React, { useState, useEffect } from 'react';
import { ViewMode } from '../../types';

interface CommandCenterViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenAskCognexa: () => void;
}

export const CommandCenterView: React.FC<CommandCenterViewProps> = ({
  onNavigate,
  onOpenAskCognexa
}) => {
  const [bearingTemp, setBearingTemp] = useState(98.38);
  const [vibrationVal, setVibrationVal] = useState(4.82);
  const [isThrottled, setIsThrottled] = useState(false);
  const [actionApproved, setActionApproved] = useState(false);
  const [verificationConfirmed, setVerificationConfirmed] = useState(false);
  const [rawLogs, setRawLogs] = useState([
    { time: '14:38:08.102', tag: '[T07_BRG_TEMP]', temp: '98.42°C', rms: 'FFT_RMS: 4.82mm/s', stdev: 'STDEV: 0.18' },
    { time: '14:38:07.100', tag: '[T07_BRG_TEMP]', temp: '98.39°C', rms: 'FFT_RMS: 4.79mm/s', stdev: 'STDEV: 0.17' },
    { time: '14:38:06.098', tag: '[T07_BRG_TEMP]', temp: '98.31°C', rms: 'FFT_RMS: 4.76mm/s', stdev: 'STDEV: 0.16' }
  ]);
  const [selectedGraphNode, setSelectedGraphNode] = useState<{ id: string; label: string; desc: string; deg: number }>({
    id: '#T07_BRG',
    label: 'Node #T07_BRG',
    desc: 'SCADA telemetry node mapped to 3 ERP entities, 1 Jira ticket, and 2 active SOP directives.',
    deg: 5
  });

  // Simulated live fluctuating telemetry tick
  useEffect(() => {
    const timer = setInterval(() => {
      if (isThrottled) {
        // Cooling down
        setBearingTemp((prev) => Math.max(81.2, +(prev - 0.25).toFixed(2)));
        setVibrationVal((prev) => Math.max(2.15, +(prev - 0.08).toFixed(2)));
      } else {
        const fluctuation = (Math.random() * 0.2 - 0.1);
        const nextTemp = +(98.38 + fluctuation).toFixed(2);
        setBearingTemp(nextTemp);
        const nextVib = +(4.82 + (Math.random() * 0.1 - 0.05)).toFixed(2);
        setVibrationVal(nextVib);
      }

      // Add a fresh telemetry log entry
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      setRawLogs((prev) => [
        {
          time: timeStr,
          tag: '[T07_BRG_TEMP]',
          temp: `${(bearingTemp + (Math.random() * 0.1)).toFixed(2)}°C`,
          rms: `FFT_RMS: ${(vibrationVal).toFixed(2)}mm/s`,
          stdev: `STDEV: 0.18`
        },
        ...prev.slice(0, 3)
      ]);
    }, 2000);

    return () => clearInterval(timer);
  }, [isThrottled, bearingTemp, vibrationVal]);

  const handleApproveAction = () => {
    setActionApproved(true);
    setIsThrottled(true);
  };

  return (
    <div className="relative w-full px-gutter-lg py-space-lg flex flex-col gap-space-lg select-none">
      {/* AMBIENT COMMAND ATMOSPHERE OVERLAYS */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-64 right-1/4 w-[32rem] h-[24rem] bg-secondary-container/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-tertiary-container/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 1. PAGE HEADER & MISSION SUMMARY */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md relative z-10">
        <div className="flex flex-col gap-space-xs max-w-4xl">
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm border border-secondary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
              DEFCON 4 • AUTONOMOUS ESCORT ACTIVE
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-primary">security</span>
              Cryptographic Audit Node: #BER-NODE-891
            </span>
            <span className="font-label-sm text-label-sm text-outline px-1.5 py-0.5 rounded bg-surface-container-lowest font-mono">
              UTC 14:38:09
            </span>
          </div>

          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
            Global Operational Intelligence Command
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Real-time neuro-symbolic correlation of{' '}
            <span className="text-secondary font-label-md text-label-md font-semibold">14,820 IoT endpoints</span>{' '}
            across Siemens SCADA, SAP S/4HANA ERP, Confluence SOP archives, and live Jira incident telemetries.
          </p>
        </div>

        {/* Action Cluster */}
        <div className="flex items-center gap-space-sm flex-wrap self-start xl:self-end">
          <button
            onClick={() => onNavigate('anomalies-and-incidents')}
            className="flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-all shadow-sm border border-surface-container-highest/60"
          >
            <span className="material-symbols-outlined text-base text-secondary">psychology</span>
            <span>Run Predictive Diagnostic</span>
          </button>
          <button
            onClick={() => onNavigate('explainability-audit')}
            className="flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-all shadow-sm border border-surface-container-highest/60"
          >
            <span className="material-symbols-outlined text-base text-primary">policy</span>
            <span>Export Audit Trail</span>
          </button>
          <div className="flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface shadow-inner border border-surface-container-high/40">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
            </span>
            <div className="flex flex-col text-left">
              <span className="font-label-sm text-label-sm font-semibold uppercase text-secondary">System Health</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px]">Optimal • 99.98% Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Inquiries Omnibar */}
      <div className="relative w-full rounded-xl bg-surface-container/80 backdrop-blur-2xl shadow-lg p-space-md flex flex-col gap-space-sm border border-surface-container-high/40">
        <div className="flex items-center gap-space-md">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-container-high text-secondary flex-shrink-0 shadow-inner">
            <span className="material-symbols-outlined text-xl">auto_awesome</span>
          </div>
          <div 
            onClick={onOpenAskCognexa}
            className="flex-1 relative flex items-center cursor-pointer"
          >
            <input
              readOnly
              onClick={onOpenAskCognexa}
              className="w-full bg-transparent text-on-surface font-body-lg text-body-lg placeholder:text-outline focus:outline-none pr-28 py-1 cursor-pointer"
              placeholder="Ask Cognexa anything across telemetry, ERP records, sensor graphs, or procedures..."
              type="text"
            />
            <div className="absolute right-0 flex items-center gap-1.5 pointer-events-none">
              <span className="font-label-sm text-label-sm bg-surface-container-highest/80 text-on-surface-variant px-2 py-0.5 rounded font-mono shadow-sm">⌘K</span>
              <span className="font-label-sm text-label-sm bg-surface-container-highest/80 text-secondary px-2 py-0.5 rounded font-mono shadow-sm">Ctrl+Space</span>
            </div>
          </div>
          <button
            onClick={onOpenAskCognexa}
            className="hidden sm:flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-fixed transition-all font-label-md text-label-md font-semibold flex-shrink-0 shadow-[0_0_16px_rgba(192,193,255,0.3)]"
          >
            <span className="material-symbols-outlined text-sm">bolt</span>
            <span>Query Agents</span>
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs border-t border-surface-container-high/20">
          <div className="flex flex-wrap items-center gap-space-xs text-xs">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider mr-1">Quick Inquiries:</span>
            <button
              onClick={onOpenAskCognexa}
              className="px-space-sm py-1 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1 border border-surface-container-highest/40"
            >
              <span className="material-symbols-outlined text-xs text-secondary">insights</span> Correlate Motor-03 anomaly
            </button>
            <button
              onClick={onOpenAskCognexa}
              className="px-space-sm py-1 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1 border border-surface-container-highest/40"
            >
              <span className="material-symbols-outlined text-xs text-secondary">sensors</span> Check MPU6050 vibration thresholds
            </button>
            <button
              onClick={onOpenAskCognexa}
              className="px-space-sm py-1 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1 border border-surface-container-highest/40"
            >
              <span className="material-symbols-outlined text-xs text-tertiary">task_alt</span> Summarize pending approvals
            </button>
            <button
              onClick={onOpenAskCognexa}
              className="px-space-sm py-1 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1 border border-surface-container-highest/40"
            >
              <span className="material-symbols-outlined text-xs text-primary">sync</span> Audit Siemens SCADA sync
            </button>
          </div>
          <div className="flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#5de6ff]"></span>
              <span className="text-on-surface font-medium">All Systems Operational</span>
            </div>
            <span className="text-surface-container-highest">/</span>
            <span>14,820 Nodes Synced</span>
            <span className="text-surface-container-highest">/</span>
            <span className="text-secondary font-mono">14ms Latency</span>
          </div>
        </div>
      </div>

      {/* 2. TOP 4 KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md relative z-10">
        {/* KPI 1 */}
        <div 
          onClick={() => onNavigate('connectors')}
          className="p-space-lg rounded-xl bg-surface-container-low backdrop-blur-xl flex flex-col justify-between shadow-lg relative overflow-hidden group hover:bg-surface-container transition-all cursor-pointer border border-surface-container-high/40"
        >
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase font-semibold">Unified Entity Coverage</span>
              <span className="font-headline-xl text-headline-xl text-on-surface font-bold mt-1">98.4%</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shadow-inner">
              <span className="material-symbols-outlined text-xl">dataset</span>
            </div>
          </div>
          <div className="my-space-sm flex items-end justify-between gap-2">
            <div className="flex-1 h-8">
              <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 140 32">
                <path d="M0 24 L20 22 L40 25 L60 17 L80 19 L100 11 L120 14 L140 6" stroke="#5de6ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M0 24 L20 22 L40 25 L60 17 L80 19 L100 11 L120 14 L140 6 L140 32 L0 32 Z" fill="#5de6ff" fillOpacity="0.15"></path>
              </svg>
            </div>
            <span className="font-label-sm text-label-sm text-secondary bg-surface-container-high px-1.5 py-0.5 rounded font-mono">+2.1% wk</span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span>42.8M docs</span>
            <span>•</span>
            <span>14.8k sensors</span>
            <span>•</span>
            <span>89 ERP pipes</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div 
          onClick={() => onNavigate('anomalies-and-incidents')}
          className="p-space-lg rounded-xl bg-surface-container-low backdrop-blur-xl flex flex-col justify-between shadow-lg relative overflow-hidden group hover:bg-surface-container transition-all cursor-pointer border border-surface-container-high/40"
        >
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-error/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase font-semibold">Active Correlated Incidents</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-xl text-headline-xl text-error font-bold">3</span>
                <span className="font-label-md text-label-md text-on-surface-variant">Requiring Attention</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-error shadow-inner">
              <span className="material-symbols-outlined text-xl">emergency</span>
            </div>
          </div>
          <div className="my-space-sm flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">1 Critical</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">2 Warnings</span>
            <span className="ml-auto font-label-sm text-label-sm text-secondary font-mono">TTR -94%</span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span>Root Cause Latency: <strong className="text-on-surface font-mono">1.4s</strong></span>
            <span className="text-outline line-through">4.2h manual</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div 
          onClick={() => onNavigate('ai-agents')}
          className="p-space-lg rounded-xl bg-surface-container-low backdrop-blur-xl flex flex-col justify-between shadow-lg relative overflow-hidden group hover:bg-surface-container transition-all cursor-pointer border border-surface-container-high/40"
        >
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-tertiary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase font-semibold">Automated Reasoning Efficacy</span>
              <span className="font-headline-xl text-headline-xl text-tertiary font-bold mt-1">94.6%</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary shadow-inner">
              <span className="material-symbols-outlined text-xl">neurology</span>
            </div>
          </div>
          <div className="my-space-sm flex flex-col gap-1">
            <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden flex">
              <div className="bg-tertiary h-full rounded-full" style={{ width: '94.6%' }}></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-mono">
              <span>Deterministic Graph Pass</span>
              <span className="text-tertiary">Confidence: HIGH</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span>1,840 daily decisions</span>
            <span className="text-secondary font-mono">100% HITL Verified</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div 
          onClick={() => onNavigate('iot-devices')}
          className="p-space-lg rounded-xl bg-surface-container-low backdrop-blur-xl flex flex-col justify-between shadow-lg relative overflow-hidden group hover:bg-surface-container transition-all cursor-pointer border border-surface-container-high/40"
        >
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase font-semibold">IoT Telemetry Throughput</span>
              <span className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
                142.8k <span className="font-headline-sm text-headline-sm font-normal text-on-surface-variant">msg/s</span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined text-xl">sensors</span>
            </div>
          </div>
          <div className="my-space-sm flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-label-sm text-secondary font-mono">Edge Ingest Active</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface font-mono bg-surface-container-high px-2 py-0.5 rounded">12ms Latency</span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span>Buffer: <strong className="text-on-surface font-mono">0.03%</strong></span>
            <span className="text-secondary font-mono">0 dropped pkts</span>
          </div>
        </div>
      </div>

      {/* 3. HERO FEATURED CORRELATION SECTION (Side-by-side Digital + Physical) */}
      <div className="p-space-lg rounded-xl bg-surface-container-low backdrop-blur-2xl shadow-2xl relative z-10 flex flex-col gap-space-lg border border-surface-container-high/40">
        {/* Incident Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest/80 p-space-md rounded-xl border border-surface-container-high/30">
          <div className="flex items-center gap-space-md flex-wrap">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-error-container text-on-error-container shadow-md">
              <span className="material-symbols-outlined text-2xl animate-pulse">warning</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
                  LIVE CORRELATED INCIDENT #INC-8942
                </span>
                <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold tracking-wider uppercase">
                  Critical Alert
                </span>
                {isThrottled && (
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-mono text-xs font-semibold">
                    Throttled to 65% (Cooling Down)
                  </span>
                )}
              </div>
              <span className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                <span className="material-symbols-outlined text-sm text-secondary">factory</span>
                Turbine Assembly #07 (Munich Gigafactory 04 • High-Yield Powertrain Line 3)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm font-semibold border border-tertiary/20">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>96.4% AI Confidence (High Determinism)</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-mono border border-surface-container-highest">
              <span>First Detected:</span>
              <span className="text-on-surface font-semibold">14:22:04 UTC</span>
            </div>
          </div>
        </div>

        {/* Side-by-Side Split: Physical Telemetry vs Digital Organizational Knowledge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
          {/* LEFT: Physical IoT Telemetry (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col gap-space-md p-space-md rounded-xl bg-surface-container/70 border border-surface-container-high/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">sensors</span>
                <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Physical IoT Telemetry</h2>
              </div>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-mono flex items-center gap-1 border border-secondary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                120Hz Real-Time Stream
              </span>
            </div>

            {/* Bay 04 High-Speed Optical & FFT Stream */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="relative rounded-lg overflow-hidden h-44 bg-surface-container-low flex flex-col justify-end p-space-sm group border border-surface-container-high/40">
                <img 
                  className="absolute inset-0 w-full h-full object-cover" 
                  alt="Turbine Assembly Bay 04" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz3bBSbkL20Q52tL3GD4KrR6biJsi0g2yiMuVvuCWUi3wBYZQPbtfWkdZNHFBwtIY98O-_sVC93LQ4xci-i-tgLzd_oUd80sXjw4rm27v50Cgi5HVJ79jwNKMYz6oPDuf3eDPQKogxtiR0VbN2ZaMD2jUtJQvjHv0tHsNLPR5pSEptsNHTJ0eu48B_FhOU73R40ykftRrjIg0xUjlGlmohUcrvJXMCu-gaNixgVY1nCsparzcmiEyp" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="relative z-10 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wide">Optical Feed 04-A</span>
                  </div>
                  <span className="font-code-md text-[10px] bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded text-white font-mono">LIVE 4K 60FPS</span>
                </div>
              </div>

              {/* Sensor Gauges Cards */}
              <div className="md:col-span-2 grid grid-cols-3 gap-space-sm">
              {/* Sensor 1: Bearing Temp */}
              <div className="p-3 rounded-lg bg-surface-container-high flex flex-col justify-between border border-surface-container-highest/60">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>Bearing Temp</span>
                  <span className={`material-symbols-outlined text-xs ${bearingTemp > 85 ? 'text-error' : 'text-secondary'}`}>
                    trending_up
                  </span>
                </div>
                <div className="mt-2 flex flex-col">
                  <span className={`font-headline-lg text-headline-lg font-bold font-mono transition-colors ${bearingTemp > 85 ? 'text-error' : 'text-secondary'}`}>
                    {bearingTemp.toFixed(2)}°C
                  </span>
                  <span className="font-label-sm text-label-sm text-error/80 mt-0.5">Threshold: 85.0°C</span>
                </div>
                <div className="mt-2 w-full bg-surface-container-lowest h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-error h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (bearingTemp / 110) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Sensor 2: Vibration FFT */}
              <div className="p-3 rounded-lg bg-surface-container-high flex flex-col justify-between border border-surface-container-highest/60">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>Vibration FFT</span>
                  <span className="material-symbols-outlined text-xs text-secondary">vital_signs</span>
                </div>
                <div className="mt-2 flex flex-col">
                  <span className="font-headline-lg text-headline-lg font-bold text-secondary font-mono">
                    {vibrationVal.toFixed(2)} <span className="text-xs font-normal">mm/s</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary/80 mt-0.5">Spike @ 3.2kHz</span>
                </div>
                <div className="mt-2 w-full bg-surface-container-lowest h-1 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>

              {/* Sensor 3: Coolant Flow */}
              <div className="p-3 rounded-lg bg-surface-container-high flex flex-col justify-between border border-surface-container-highest/60">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>Coolant Flow</span>
                  <span className="material-symbols-outlined text-xs text-primary">water_drop</span>
                </div>
                <div className="mt-2 flex flex-col">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface font-mono">
                    14.2 <span className="text-xs font-normal">L/m</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Nominal Range</span>
                </div>
                <div className="mt-2 w-full bg-surface-container-lowest h-1 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '48%' }}></div>
                </div>
              </div>
            </div>
          </div>

            {/* Trend Chart SVG */}
            <div className="p-space-md rounded-lg bg-surface-container-lowest flex flex-col gap-2 border border-surface-container-high/40">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1.5 font-semibold text-on-surface">
                  <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                  Thermal Runaway Gradient (Munich L3-Turbine07)
                </span>
                <span className="font-mono text-outline">Window: 14:00 - 14:38 UTC</span>
              </div>
              <div className="h-28 w-full relative">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                  <line stroke="#2f3446" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="400" y1="25" y2="25"></line>
                  <line stroke="#2f3446" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="400" y1="50" y2="50"></line>
                  <line stroke="#2f3446" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="400" y1="75" y2="75"></line>
                  <line opacity="0.6" stroke="#ffb4ab" strokeDasharray="4,4" strokeWidth="1.5" x1="0" x2="400" y1="42" y2="42"></line>
                  <text className="text-[9px] font-mono" fill="#ffb4ab" x="5" y="38">CRITICAL SAFETY THRESHOLD: 85°C</text>
                  
                  {/* Dynamic path based on throttle status */}
                  <path 
                    d={isThrottled 
                      ? "M0 82 Q40 80 80 81 T160 78 T220 74 T280 68 T320 40 T360 55 T400 75" 
                      : "M0 82 Q40 80 80 81 T160 78 T220 74 T280 68 T320 40 T360 22 T400 14"
                    } 
                    fill="none" 
                    stroke={isThrottled ? "#5de6ff" : "#ffb4ab"} 
                    strokeWidth="2.5"
                    className="transition-all duration-700"
                  ></path>
                  <path 
                    d={isThrottled 
                      ? "M0 82 Q40 80 80 81 T160 78 T220 74 T280 68 T320 40 T360 55 T400 75 L400 100 L0 100 Z" 
                      : "M0 82 Q40 80 80 81 T160 78 T220 74 T280 68 T320 40 T360 22 T400 14 L400 100 L0 100 Z"
                    } 
                    fill={isThrottled ? "#5de6ff" : "#ffb4ab"} 
                    opacity="0.15"
                  ></path>
                  <circle className="animate-ping" cx="320" cy="40" fill="#ffb4ab" r="4"></circle>
                  <circle cx="320" cy="40" fill="#690005" r="3"></circle>
                  <text className="text-[9px] font-mono font-bold" fill="#ffb4ab" x="245" y="52">14:22 UTC Spikepoint</text>
                </svg>
              </div>
            </div>

            {/* Raw Sensor Stream Micro-Console */}
            <div className="rounded-lg bg-surface-container-lowest p-2.5 font-label-sm text-label-sm text-on-surface-variant font-mono flex flex-col gap-1 overflow-x-auto border border-surface-container-high/40">
              <div className="flex items-center justify-between text-outline text-[11px] pb-1 border-b border-surface-container-high/30">
                <span>RAW TELEMETRY INGEST [SCADA-OPC-UA]</span>
                <span className="text-secondary">PARITY: VALID</span>
              </div>
              {rawLogs.map((log, i) => (
                <div key={i} className="text-on-surface flex gap-2" style={{ opacity: 1 - i * 0.2 }}>
                  <span className="text-outline">{log.time}</span>
                  <span className="text-secondary">{log.tag}</span>
                  <span className="text-error font-bold">{log.temp}</span>
                  <span className="text-on-surface-variant">{log.rms}</span>
                  <span className="text-tertiary">{log.stdev}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Correlated Digital Knowledge Lineage (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col gap-space-md p-space-md rounded-xl bg-surface-container/70 border border-surface-container-high/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-lg">hub</span>
                <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Correlated Digital Knowledge Lineage</h2>
              </div>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-mono border border-tertiary/20">
                4 Context Sources Fused
              </span>
            </div>
            <div className="flex flex-col gap-space-sm flex-1 justify-between">
              {/* Confluence SOP */}
              <div 
                onClick={() => onNavigate('connectors')}
                className="p-3 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors flex items-start gap-3 cursor-pointer border border-surface-container-highest/40"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-base">description</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-primary font-mono">Doc #ENG-3392 • Confluence SOP</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Updated 12d ago</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-sm text-on-surface font-semibold truncate mt-0.5">
                    Hydrodynamic Bearing Seal Replacement Manual (v4.2)
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">
                    Section 7.3: Thermal runaway exceeding 92°C with high harmonic vibration indicates micro-cavitation in low viscosity grease.
                  </p>
                </div>
              </div>

              {/* SAP ERP Record */}
              <div 
                onClick={() => onNavigate('connectors')}
                className="p-3 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors flex items-start gap-3 cursor-pointer border border-surface-container-highest/40"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-base">receipt_long</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-secondary font-mono">PO #SAP-88192 • SAP S/4HANA</span>
                    <span className="font-label-sm text-label-sm text-error font-mono">Quality Deviation</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-sm text-on-surface font-semibold truncate mt-0.5">
                    Synthetic Lubricant Viscosity Flag: Batch #B-409
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">
                    Munich QC Lab flagged -14% kinematic viscosity delta at 40°C. Batch was inadvertently released to Munich Line 3 reservoir yesterday.
                  </p>
                </div>
              </div>

              {/* Slack / MS Teams Communication */}
              <div 
                onClick={() => onNavigate('anomalies-and-incidents')}
                className="p-3 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors flex items-start gap-3 cursor-pointer border border-surface-container-highest/40"
              >
                <div className="w-8 h-8 rounded-lg bg-tertiary-container/20 text-tertiary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-base">forum</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-tertiary font-mono">#mfg-line-ops • Shift Handover</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Yesterday 23:40</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-sm text-on-surface font-semibold truncate mt-0.5">
                    Shift Supervisor Message Thread
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">
                    "Unusual high-pitched whine heard on Line 3 night shift - dismissed as casing acoustic resonance during ramp."
                  </p>
                </div>
              </div>

              {/* Historical Incident Vector Match */}
              <div 
                onClick={() => onNavigate('explainability-audit')}
                className="p-3 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors flex items-start gap-3 cursor-pointer border border-surface-container-highest/40"
              >
                <div className="w-8 h-8 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-base">manage_search</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">Vector DB Match #INC-2023-11-04</span>
                    <span className="font-label-sm text-label-sm text-secondary font-mono font-semibold">98.1% Geometric Match</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-sm text-on-surface font-semibold truncate mt-0.5">
                    Turbine 04 Seizure After Low-Viscosity Batch Ingestion
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">
                    Resulted in 18h unplanned outage in Stuttgart. Corrective seal swap Bin #42 took 34 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM OF INCIDENT CARD: AI Reasoning Chain & Human-Approval Control */}
        <div className="flex flex-col gap-space-md p-space-md rounded-xl bg-surface-container-lowest/90 border border-surface-container-high/40">
          {/* Reasoning Chain Stepper */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold flex items-center gap-1.5 font-mono">
                <span className="material-symbols-outlined text-sm">schema</span>
                Transparent Autonomous Reasoning Chain (Deterministic Neuro-Symbolic Pass)
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">Inference Time: 34ms</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm mt-2">
              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-surface-container-high/30">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary-container/30 text-secondary font-mono font-bold text-xs flex items-center justify-center">1</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Anomaly Discrimination</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug">
                  Thermal gradient (+1.8°C/min) coupled with 3.2kHz harmonic indicates boundary lubrication failure, ruling out electrical short-circuit or gearbox overload.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-surface-container-high/30">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-tertiary-container/30 text-tertiary font-mono font-bold text-xs flex items-center justify-center">2</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Causal Lineage Corroboration</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug">
                  Correlated with SAP Batch #B-409 lubricant viscosity test failure record in Munich warehouse released 18 hours prior to Line 3 intake.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-surface-container-high/30">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-error-container text-on-error-container font-mono font-bold text-xs flex items-center justify-center">3</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Prognostic Time-To-Failure</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug">
                  Risk calculation: Projected catastrophic bearing seizure in <strong className="text-error font-mono">4 hours 15 minutes</strong> if unmitigated. Estimated downtime cost: €210,000.
                </p>
              </div>
            </div>
          </div>

          {/* Human-In-The-Loop Recommended Action Box */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-high/80 backdrop-blur-md border border-surface-container-highest">
            <div className="flex items-start gap-space-sm">
              <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                <span className="material-symbols-outlined text-xl">bolt</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-base font-bold text-on-surface">
                    Recommended Autonomous Action: Safe De-escalation
                  </span>
                  <span className={`font-label-sm text-label-sm px-2 py-0.5 rounded font-mono ${actionApproved ? 'bg-secondary-container/20 text-secondary' : 'bg-surface-container-lowest text-secondary'}`}>
                    {actionApproved ? 'Action Executed (65% Throttled)' : 'Awaiting Human Approval'}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-3xl">
                  Throttle Munich Line 3 to <strong className="text-on-surface font-mono">65% capacity</strong> immediately to stabilize thermals below 85°C, auto-generate SAP Work Order #40192 to <strong className="text-on-surface">Sarah Chen (Tech Lead, Shift B)</strong>, and reserve replacement seal kit from <strong className="text-secondary font-mono">Warehouse Bin #42</strong>.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm shrink-0 w-full lg:w-auto">
              {!actionApproved ? (
                <>
                  <button
                    onClick={handleApproveAction}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-dim font-headline-sm text-headline-sm text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Approve &amp; Execute Action</span>
                  </button>
                  <button
                    onClick={() => onNavigate('anomalies-and-incidents')}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-space-md py-3 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface font-headline-sm text-headline-sm text-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-base text-outline">tune</span>
                    <span>Modify / Reject</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary-container/20 text-secondary font-mono text-sm border border-secondary/30">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>Executing Line Derate to 65%...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECONDARY GRID: Knowledge Graph vs Autonomous AI Agents */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg relative z-10 items-start">
        {/* LEFT: Cross-Modal Semantic Knowledge Graph Explorer (7 Columns) */}
        <div className="xl:col-span-7 p-space-lg rounded-xl bg-surface-container-low backdrop-blur-xl flex flex-col gap-space-md shadow-lg border border-surface-container-high/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container-high/20">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">account_tree</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Cross-Modal Semantic Knowledge Graph</h3>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Direct entity relationship map with dynamic probability weight vectors</span>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg border border-surface-container-high/30">
              <button className="px-2.5 py-1 rounded bg-surface-container-high text-secondary font-label-sm text-label-sm font-semibold">Sensors</button>
              <button className="px-2.5 py-1 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm">ERP Docs</button>
              <button className="px-2.5 py-1 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm">Personnel</button>
            </div>
          </div>

          {/* Graph Search & Filter Tags */}
          <div className="flex flex-col sm:flex-row items-center gap-space-sm">
            <div className="relative w-full sm:flex-1">
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-outline text-sm">filter_alt</span>
              <input 
                className="w-full h-9 pl-8 pr-3 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-secondary border border-surface-container-high/40" 
                placeholder="Filter graph nodes..." 
                type="text" 
                defaultValue="Entity: Turbine-07 Munich"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
              <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm cursor-pointer hover:bg-surface-variant">Physical Only</span>
              <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm cursor-pointer hover:bg-surface-variant">SOPs &amp; Manuals</span>
              <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm cursor-pointer hover:bg-surface-variant">SAP Deps</span>
            </div>
          </div>

          {/* Interactive SVG Entity Node Graph Canvas */}
          <div className="relative w-full h-96 rounded-xl bg-surface-container-lowest overflow-hidden flex items-center justify-center shadow-inner border border-surface-container-high/40">
            <div className="absolute inset-0 bg-[radial-gradient(#2f3446_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            <svg className="w-full h-full" viewBox="0 0 650 360">
              {/* Node Links / Edges */}
              <path d="M120 180 L250 110" opacity="0.8" stroke="#5de6ff" strokeDasharray="4,4" strokeWidth="2"></path>
              <path d="M250 110 L410 110" opacity="0.8" stroke="#8083ff" strokeWidth="2"></path>
              <path d="M250 110 L330 240" opacity="0.9" stroke="#ddb7ff" strokeWidth="2"></path>
              <path d="M410 110 L540 80" opacity="0.7" stroke="#8083ff" strokeDasharray="2,2" strokeWidth="1.5"></path>
              <path d="M330 240 L500 240" opacity="0.8" stroke="#ddb7ff" strokeWidth="2"></path>
              <path d="M120 180 L330 240" opacity="0.5" stroke="#5de6ff" strokeWidth="1.5"></path>

              {/* Link Labels */}
              <rect fill="#161b2b" height="16" rx="4" width="45" x="165" y="135"></rect>
              <text className="text-[9px] font-mono" fill="#5de6ff" x="172" y="147">0.96 (p)</text>
              <rect fill="#161b2b" height="16" rx="4" width="45" x="315" y="98"></rect>
              <text className="text-[9px] font-mono" fill="#8083ff" x="322" y="110">1.00 (id)</text>
              <rect fill="#161b2b" height="16" rx="4" width="45" x="270" y="180"></rect>
              <text className="text-[9px] font-mono" fill="#ddb7ff" x="277" y="192">0.94 (rel)</text>

              {/* NODE 1: Physical Sensor */}
              <g 
                className="cursor-pointer" 
                transform="translate(120, 180)"
                onClick={() => setSelectedGraphNode({ id: '#T07_BRG', label: 'T-07 SENSOR', desc: 'SCADA telemetry node mapped to 3 ERP entities, 1 Jira ticket, and 2 active SOP directives.', deg: 5 })}
              >
                <circle fill="#1a1f30" r="28" stroke="#5de6ff" strokeWidth="2"></circle>
                <circle className="animate-ping" fill="#5de6ff" opacity="0.1" r="36"></circle>
                <text className="text-[10px] font-bold font-mono" fill="#dee1f9" textAnchor="middle" x="0" y="-4">T-07 SENSOR</text>
                <text className="text-[8px] font-mono" fill="#5de6ff" textAnchor="middle" x="0" y="10">{bearingTemp.toFixed(1)}°C LIVE</text>
              </g>

              {/* NODE 2: Controller Hub */}
              <g 
                className="cursor-pointer" 
                transform="translate(250, 110)"
                onClick={() => setSelectedGraphNode({ id: '#PLC_L3', label: 'LINE 3 PLC', desc: 'Siemens S7-1500 controller managing Powertrain Line 3 feed cadence and safety shutoff interlocks.', deg: 4 })}
              >
                <circle fill="#1a1f30" r="26" stroke="#8083ff" strokeWidth="2"></circle>
                <text className="text-[9px] font-bold font-mono" fill="#dee1f9" textAnchor="middle" x="0" y="-4">LINE 3 PLC</text>
                <text className="text-[8px] font-mono" fill="#8083ff" textAnchor="middle" x="0" y="8">Siemens S7</text>
              </g>

              {/* NODE 3: SAP Work Order */}
              <g 
                className="cursor-pointer" 
                transform="translate(410, 110)"
                onClick={() => setSelectedGraphNode({ id: '#SAP_40192', label: 'SAP #40192', desc: 'Maintenance order auto-staged for seal kit replacement and synthetic oil purge.', deg: 3 })}
              >
                <circle fill="#1a1f30" r="26" stroke="#c0c1ff" strokeWidth="1.5"></circle>
                <text className="text-[9px] font-bold font-mono" fill="#dee1f9" textAnchor="middle" x="0" y="-4">SAP #40192</text>
                <text className="text-[8px] font-mono" fill="#c0c1ff" textAnchor="middle" x="0" y="8">Work Order</text>
              </g>

              {/* NODE 4: PDF SOP Manual */}
              <g 
                className="cursor-pointer" 
                transform="translate(330, 240)"
                onClick={() => setSelectedGraphNode({ id: '#ENG_3392', label: 'ENG-3392', desc: 'Confluence standard operating procedure for hydrodynamic bearing race replacements.', deg: 4 })}
              >
                <circle fill="#1a1f30" r="26" stroke="#ddb7ff" strokeWidth="2"></circle>
                <text className="text-[9px] font-bold font-mono" fill="#dee1f9" textAnchor="middle" x="0" y="-4">ENG-3392</text>
                <text className="text-[8px] font-mono" fill="#ddb7ff" textAnchor="middle" x="0" y="8">PDF Manual</text>
              </g>

              {/* NODE 5: Assigned Lead Engineer */}
              <g 
                className="cursor-pointer" 
                transform="translate(500, 240)"
                onClick={() => setSelectedGraphNode({ id: '#SARAH_CHEN', label: 'Sarah Chen', desc: 'Lead reliability engineer and eIDAS Level 3 authorized signatory for Line 3 operations.', deg: 6 })}
              >
                <circle fill="#1a1f30" r="28" stroke="#2fd9f4" strokeWidth="1.5"></circle>
                <text className="text-[9px] font-bold" fill="#dee1f9" textAnchor="middle" x="0" y="-4">Sarah Chen</text>
                <text className="text-[8px] font-mono" fill="#2fd9f4" textAnchor="middle" x="0" y="8">Tech Lead (B)</text>
              </g>

              {/* NODE 6: Inventory Bin */}
              <g 
                className="cursor-pointer" 
                transform="translate(540, 80)"
                onClick={() => setSelectedGraphNode({ id: '#BIN_42', label: 'BIN #42', desc: 'Warehouse staging bin containing certified SKF-6205 hydrodynamic seal kits.', deg: 2 })}
              >
                <circle fill="#1a1f30" r="22" stroke="#908fa0" strokeWidth="1"></circle>
                <text className="text-[8px] font-mono" fill="#dee1f9" textAnchor="middle" x="0" y="-3">BIN #42</text>
                <text className="text-[7px]" fill="#908fa0" textAnchor="middle" x="0" y="7">Munich Stock</text>
              </g>
            </svg>

            {/* Selected Node Overlay Preview */}
            <div className="absolute bottom-3 right-3 p-3 rounded-lg bg-surface-container-high/90 backdrop-blur-md max-w-xs flex flex-col gap-1 shadow-lg border border-surface-container-highest">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span className="text-secondary font-mono font-bold">Selected: {selectedGraphNode.label}</span>
                <span>Degree: {selectedGraphNode.deg}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface leading-tight">
                {selectedGraphNode.desc}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="font-label-sm text-label-sm text-tertiary">Entropy: 0.08 (Low)</span>
                <button 
                  onClick={() => onNavigate('knowledge-graph')}
                  className="font-label-sm text-label-sm text-secondary hover:underline font-mono"
                >
                  Expand Subgraph →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Active Autonomous Reasoning Agents & Verification Queue (5 Columns) */}
        <div className="xl:col-span-5 p-space-lg rounded-xl bg-surface-container-low backdrop-blur-xl flex flex-col gap-space-md shadow-lg border border-surface-container-high/40">
          <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">smart_toy</span>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Autonomous Intelligence Agents</h3>
            </div>
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-container/30 text-primary font-mono">
              3 Active Escorts
            </span>
          </div>

          {/* Agent Stack */}
          <div className="flex flex-col gap-space-sm">
            {/* Agent 1: Atlas */}
            <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-2 shadow-sm border border-surface-container-high/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">precision_manufacturing</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-sm font-bold text-on-surface">Agent Atlas</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Predictive Asset Maintenance</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-secondary font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  ACTIVE
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Monitoring <strong className="text-on-surface font-mono">412 rotating machinery units</strong> across Munich, Austin, and Tokyo fabs.
              </p>
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1 bg-surface-container-lowest/50 p-2 rounded-lg">
                <span>Last Action: Scheduled valve purge</span>
                <span className="text-secondary font-mono">Approved: M. Keller</span>
              </div>
            </div>

            {/* Agent 2: Synapse */}
            <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-2 shadow-sm border border-surface-container-high/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-tertiary-container/20 text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">sync_alt</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-sm font-bold text-on-surface">Agent Synapse</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Supply Chain &amp; Inventory Reasoning</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-tertiary font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                  CORRELATING
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Detected lead time delay on high-temp seals via SAP ERP. Suggesting dynamic re-route from Nuremberg depot.
              </p>
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1 bg-surface-container-lowest/50 p-2 rounded-lg">
                <span>Supplier Re-route Confidence: <strong className="text-tertiary font-mono">91.2%</strong></span>
                <button 
                  onClick={() => onNavigate('ai-agents')}
                  className="text-primary hover:underline font-mono"
                >
                  Review Action →
                </button>
              </div>
            </div>

            {/* Agent 3: Veritas */}
            <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-2 shadow-sm border border-surface-container-high/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">verified</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-sm font-bold text-on-surface">Agent Veritas</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">ISO 9001 / OSHA Safety &amp; Compliance</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-primary font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  AUDITING
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Continuous OSHA workplace boundary verification &amp; ISO 9001 trace log attestation.
              </p>
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1 bg-surface-container-lowest/50 p-2 rounded-lg">
                <span>24h Violations: <strong className="text-on-surface font-mono">0 Detected</strong></span>
                <span className="text-secondary font-mono">100% Policy Parity</span>
              </div>
            </div>
          </div>

          {/* Verification Queue Box */}
          <div className="p-space-md rounded-xl bg-surface-container-high flex flex-col gap-2 shadow-md border border-surface-container-highest">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">approval</span>
                Operator Verification Queue
              </span>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono font-bold">
                {verificationConfirmed ? '1 Pending' : '2 Pending'}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm border border-surface-container-high">
              <div className="flex flex-col">
                <span className="text-on-surface font-semibold">Coolant Chiller Pump #3 Recalibration</span>
                <span className="text-[10px]">Proposed by Agent Atlas • Est. Energy Savings 4.1%</span>
              </div>
              <div className="flex items-center gap-2">
                {!verificationConfirmed ? (
                  <button 
                    onClick={() => setVerificationConfirmed(true)}
                    className="px-2.5 py-1 rounded bg-primary text-on-primary font-semibold hover:bg-primary-fixed-dim transition-colors cursor-pointer"
                  >
                    Confirm
                  </button>
                ) : (
                  <span className="text-secondary font-mono text-[11px] font-semibold">Confirmed</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SYSTEM LOGS & AUDIT PROVENANCE FOOTER STRIP */}
      <div 
        onClick={() => onNavigate('explainability-audit')}
        className="p-space-md rounded-xl bg-surface-container-low backdrop-blur-xl shadow-lg relative z-10 flex flex-col gap-space-sm border border-surface-container-high/40 cursor-pointer group"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-base">lock_clock</span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider">
              Explainability &amp; Provable Audit Ledger
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono hidden md:inline">
              • SHA-256 Block #008914-EE3
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary font-mono">
            All model weights &amp; inferences signed with eIDAS HSM token →
          </span>
        </div>

        {/* Live Terminal Snippet */}
        <div className="rounded-lg bg-surface-container-lowest p-3 font-label-sm text-label-sm font-mono flex flex-col gap-1 text-on-surface-variant overflow-x-auto shadow-inner border border-surface-container-high/40">
          <div className="flex items-center gap-2">
            <span className="text-outline">[14:38:09.412]</span>
            <span className="text-primary font-bold">INFO</span>
            <span className="text-on-surface">Embed-V4: Normalized 890 telemetry dimensions into latent manifold (dim=1536).</span>
            <span className="text-outline">t_cost=2.4ms</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-outline">[14:38:09.528]</span>
            <span className="text-secondary font-bold">GRAPH</span>
            <span className="text-on-surface">k-NN Traversal: Linked Munich_T07 -&gt; SAP_B409 (cosine_sim=0.9642, confidence_interval=[0.941, 0.982]).</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-outline">[14:38:09.680]</span>
            <span className="text-tertiary font-bold">ATTEST</span>
            <span className="text-on-surface">Model input hash: 0x9f4a...e12a committed to Immutable Ledger with operator token Dr. Rostova.</span>
            <span className="text-secondary font-bold">[VERIFIED]</span>
          </div>
        </div>
      </div>
    </div>
  );
};
