import React, { useState, useEffect, useRef } from 'react';

interface AskCognexaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteAction?: (actionText: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'cognexa';
  text: string;
  timestamp: string;
  confidence?: string;
  sources?: string[];
  actionBtn?: { label: string; action: string };
}

export const AskCognexaModal: React.FC<AskCognexaModalProps> = ({
  isOpen,
  onClose,
  onExecuteAction
}) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      sender: 'cognexa',
      text: 'Cognexa Neuro-Symbolic Engine online. I have unified access across 14,820 live IoT nodes, Siemens SCADA registers, SAP S/4HANA ERP records, and 42.8M indexed enterprise documents. How can I assist your operational decisions?',
      timestamp: 'Just now',
      confidence: '99.4% (Deterministic)'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || query;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    setTimeout(() => {
      let botResponse: Message;

      const lower = text.toLowerCase();
      if (lower.includes('motor-03') || lower.includes('turbine') || lower.includes('vibration') || lower.includes('inc-8942')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'cognexa',
          text: 'Vibration anomaly detected on Turbine Assembly #07 (MPU6050_Z = 4.82 mm/s @ 3.2kHz). Causal graph traversal correlates this with off-spec synthetic oil Batch #B-409 (-14% kinematic viscosity delta flagged by Munich QC Lab yesterday). Projected bearing race failure window is 4.8 hours if unmitigated.',
          timestamp: 'Just now',
          confidence: '96.4% AI Confidence (High Determinism)',
          sources: ['Doc #ENG-3392 (Confluence SOP-441)', 'PO #SAP-88192 (SAP S/4HANA)', 'SCADA Stream #882'],
          actionBtn: { label: 'Execute Safe De-escalation (Throttle 65%)', action: 'throttle-turbine' }
        };
      } else if (lower.includes('approval') || lower.includes('pending') || lower.includes('hitl')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'cognexa',
          text: 'There are currently 2 pending verification gates: \n1. [P1] Throttle Turbine Line 3 to 65% capacity & dispatch SKF-6205 seal kit to Sarah Chen.\n2. [P2] Coolant Chiller Pump #3 recalibration proposed by Agent Atlas (Est. Energy Savings 4.1%).',
          timestamp: 'Just now',
          confidence: '100% Policy Interlock Parity',
          sources: ['Operator Verification Queue', 'ISO 9001 Compliance Attestation Block #88914-EE3']
        };
      } else if (lower.includes('mpu6050') || lower.includes('threshold')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'cognexa',
          text: 'MPU6050 Accelerometer (ID: SENS-MPU-8921) baseline threshold is 2.20 mm/s RMS. Current reading is 4.82 mm/s (+119% above safety ceiling). Peak harmonic detected at 3,200 Hz with 120Hz live ingestion rate via OPC-UA/MQTT.',
          timestamp: 'Just now',
          confidence: '99.8% Parity Verified',
          sources: ['SCADA OPC-UA:4840', 'ESP32 Node #704A Firmware v3.2.4']
        };
      } else if (lower.includes('audit') || lower.includes('scada') || lower.includes('siemens')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'cognexa',
          text: 'Siemens SCADA S7-1500 cluster (192.168.1.42) is 99.98% synchronized with zero dropped frame packets across 14,820 live nodes. Latency is currently 18ms with active SHA-256 eIDAS block #008914-EE3 attestation.',
          timestamp: 'Just now',
          confidence: 'eIDAS Level 3 Verified',
          sources: ['Siemens Profinet Bus', 'Cryptographic Ledger #BER-NODE-891']
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'cognexa',
          text: `Synthesized analysis for "${text}": All 14,820 live telemetry nodes are operating in normal bounds except Turbine-07 and Extruder-04. Knowledge lineage confirms deterministic adherence to ISO 9001 protocols.`,
          timestamp: 'Just now',
          confidence: '95.2% Confidence',
          sources: ['Unified Entity Graph', 'SAP ERP S/4HANA', 'TimescaleDB Timeseries']
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade select-none">
      <div 
        className="relative w-full max-w-3xl rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-[0_0_50px_rgba(93,230,255,0.15)] flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-space-md bg-surface-container-low flex items-center justify-between border-b border-surface-container-high/40">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-tertiary-container text-on-tertiary-container flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-base">auto_awesome</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">Ask Cognexa</span>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-mono">
                  Neuro-Symbolic Copilot
                </span>
              </div>
              <span className="text-[11px] font-mono text-on-surface-variant">Cross-modal query across telemetry, ERP, SOPs &amp; SCADA</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-outline text-xs font-mono hidden sm:inline">ESC to close</span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-space-md py-2 bg-surface-container/40 border-b border-surface-container-high/20 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-outline uppercase text-[10px] font-mono font-semibold shrink-0">Quick:</span>
          <button
            onClick={() => handleSend('Correlate Motor-03 anomaly and Turbine-07')}
            className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-secondary font-label-sm text-label-sm whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-xs">insights</span> Correlate Turbine-07
          </button>
          <button
            onClick={() => handleSend('Check MPU6050 vibration thresholds')}
            className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-secondary font-label-sm text-label-sm whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-xs">sensors</span> MPU6050 Thresholds
          </button>
          <button
            onClick={() => handleSend('Summarize pending approvals in HITL queue')}
            className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-tertiary font-label-sm text-label-sm whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-xs">task_alt</span> Pending Approvals
          </button>
          <button
            onClick={() => handleSend('Audit Siemens SCADA sync & latency')}
            className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-xs">sync</span> Audit SCADA Sync
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-space-md space-y-space-md min-h-[300px]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-space-md ${
                  m.sender === 'user'
                    ? 'bg-primary text-on-primary font-body-md text-body-md rounded-br-none shadow-md'
                    : 'bg-surface-container-low text-on-surface rounded-bl-none border border-surface-container-high/60 shadow-lg'
                }`}
              >
                {m.sender === 'cognexa' && (
                  <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-surface-container text-xs">
                    <span className="font-label-sm text-label-sm text-tertiary font-mono font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">neurology</span>
                      Cognexa Synthesis
                    </span>
                    {m.confidence && (
                      <span className="font-mono text-[10px] text-secondary bg-surface-container-highest px-1.5 py-0.2 rounded">
                        {m.confidence}
                      </span>
                    )}
                  </div>
                )}

                <p className="font-body-md text-body-md leading-relaxed whitespace-pre-line">{m.text}</p>

                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-surface-container-high/40">
                    <span className="text-[10px] font-mono text-outline uppercase tracking-wider block mb-1">
                      Correlated Lineage Sources:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.sources.map((src, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-surface-container text-secondary text-[10px] font-mono border border-surface-container-highest"
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {m.actionBtn && (
                  <div className="mt-3 pt-2 border-t border-surface-container-high/40 flex justify-end">
                    <button
                      onClick={() => {
                        onExecuteAction?.(m.actionBtn!.action);
                        onClose();
                      }}
                      className="px-space-md py-1.5 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-bold hover:bg-secondary-fixed transition-colors shadow-md flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">bolt</span>
                      <span>{m.actionBtn.label}</span>
                    </button>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-outline mt-1 font-mono px-1">{m.timestamp}</span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-container-low max-w-xs text-on-surface-variant font-mono text-xs animate-pulse">
              <span className="material-symbols-outlined text-base animate-spin text-tertiary">sync</span>
              <span>Traversing knowledge graph &amp; SCADA bus...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-space-md bg-surface-container-low border-t border-surface-container-high/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything across 42M docs, SCADA registers, or IoT telemetries..."
              className="w-full h-12 pl-4 pr-24 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary border border-surface-container-high/40"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="absolute right-2 px-space-md py-1.5 rounded-lg bg-primary text-on-primary disabled:opacity-40 font-label-md text-label-md font-semibold transition-all hover:bg-primary-fixed-dim"
            >
              Ask
            </button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-outline font-mono mt-2 px-1">
            <span>Powered by Cognexa Universal Intelligence Engine</span>
            <span>Cryptographically Signed Lineage</span>
          </div>
        </div>
      </div>
    </div>
  );
};
