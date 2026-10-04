import React, { useState } from 'react';
import { ViewMode } from '../../types';

interface OnboardingViewProps {
  onComplete: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: 'Unified OT/IT Ingestion',
      subtitle: 'Connect SCADA, SAP S/4HANA & SOP Archives',
      desc: 'Cognexa connects to legacy and modern plant systems using Modbus, OPC-UA, MQTT, and enterprise ERP connectors with zero downtime.',
      icon: 'hub',
      badges: ['Modbus TCP', 'OPC-UA', 'SAP RFC', 'Confluence REST'],
    },
    {
      step: 2,
      title: 'Neuro-Symbolic Knowledge Graph',
      subtitle: 'Automated ISA-95 Cyber-Physical Ontology',
      desc: 'Dynamic graph linking sensor telemetry nodes with physical equipment assemblies, maintenance history, and engineering specifications.',
      icon: 'account_tree',
      badges: ['1,420 Nodes', '3,890 Edges', 'Milvus Embeddings', 'Neo4j/GraphDB'],
    },
    {
      step: 3,
      title: 'Autonomous Multi-Agent Swarm',
      subtitle: 'Argus, Atlas, Veritas & Scribe',
      desc: 'Collaborative autonomous agents continuously monitor anomalies, formulate mathematically sound root causes, and prepare surgical mitigations.',
      icon: 'smart_toy',
      badges: ['Sub-second Latency', 'AST Formal Proofs', 'HITL Safeguards'],
    },
    {
      step: 4,
      title: 'Cryptographic Audit & Compliance',
      subtitle: 'Tamper-Evident SHA-256 Ledger',
      desc: 'Every single autonomous decision, parameter change, and human approval is cryptographically anchored for strict ISO-9001 and IEC-62443 compliance.',
      icon: 'verified_user',
      badges: ['ISO-9001:2015', 'IEC 62443', 'Hardware Security Module'],
    }
  ];

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-8 animate-fade-in text-on-surface">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
          <span className="material-symbols-outlined text-sm">rocket_launch</span>
          Quickstart Onboarding
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">
          Welcome to Cognexa Universal Intel
        </h1>
        <p className="text-sm text-on-surface-variant font-mono">
          Real-time neuro-symbolic correlation across IoT endpoints, SCADA, SAP S/4HANA ERP, and autonomous AI agents.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between max-w-3xl mx-auto px-4">
        {steps.map((s) => (
          <div key={s.step} className="flex flex-col items-center relative">
            <button
              onClick={() => setCurrentStep(s.step)}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm transition-all cursor-pointer ${
                currentStep === s.step
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/30 ring-4 ring-primary/20'
                  : currentStep > s.step
                  ? 'bg-emerald-500 text-white'
                  : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              {currentStep > s.step ? (
                <span className="material-symbols-outlined text-lg">check</span>
              ) : (
                s.step
              )}
            </button>
            <span className="text-[11px] font-mono mt-2 text-on-surface-variant hidden sm:block">
              {s.title.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Active Step Card */}
      <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-surface-container border border-outline-variant/30 space-y-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-3xl">{steps[currentStep - 1].icon}</span>
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
              Step {currentStep} of 4
            </span>
            <h2 className="text-2xl font-bold text-on-surface mt-1">
              {steps[currentStep - 1].title}
            </h2>
            <h3 className="text-sm font-semibold text-secondary mt-0.5">
              {steps[currentStep - 1].subtitle}
            </h3>
          </div>
        </div>

        <p className="text-sm text-on-surface-variant leading-relaxed">
          {steps[currentStep - 1].desc}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {steps[currentStep - 1].badges.map((b) => (
            <span
              key={b}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-surface-container-high border border-outline-variant/20 text-on-surface"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="pt-6 border-t border-outline-variant/20 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous Step
          </button>

          <div className="flex items-center gap-3">
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:brightness-110 shadow-lg shadow-primary/25 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onComplete();
                  onNavigate('command-center');
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <span>Launch Command Center</span>
                <span className="material-symbols-outlined text-sm">check_circle</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
