import React, { useState } from 'react';
import { ViewMode } from '../../types';

interface OnboardingViewProps {
  onComplete: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete, onNavigate }) => {
  const [selectedBlueprint, setSelectedBlueprint] = useState('manufacturing');
  const [attestationDownloaded, setAttestationDownloaded] = useState(false);

  const blueprints = [
    {
      id: 'manufacturing',
      title: 'Manufacturing & Industrial',
      standard: 'ISO 13374 / ISA-95 Core',
      icon: 'precision_manufacturing',
      desc: 'Deterministic digital twin mapping for turbines, CNC machines, SCADA loops, and bill-of-materials traceability.',
      nodes: '142,800+ Nodes',
      latency: '<10ms Latency',
      agents: '12 Pre-built Agents'
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Life Sciences',
      standard: 'HL7 / FHIR / DICOM',
      icon: 'clinical_notes',
      desc: 'ICU telemetry correlation, pharmacological contraindication graphs, and strict GxP audit pipelines.',
      nodes: '98,400+ Nodes',
      latency: 'HIPAA Compliant',
      agents: '8 Agents'
    },
    {
      id: 'logistics',
      title: 'Logistics & Supply Chain',
      standard: 'GS1 / EPCIS Standards',
      icon: 'local_shipping',
      desc: 'Swarm fleet telematics, cold-chain temperature excursion alerts, and multimodal routing optimization.',
      nodes: '112,000 Nodes',
      latency: 'Global GPS Sync',
      agents: '15 Agents'
    },
    {
      id: 'agritech',
      title: 'Agriculture & AgriTech',
      standard: 'NDVI / ISOAgLib',
      icon: 'agriculture',
      desc: 'Multispectral Sentinel satellite ingestion combined with LoRaWAN soil moisture meshes and automated irrigation.',
      nodes: '64,500 Nodes',
      latency: 'GeoTIFF Native',
      agents: '6 Agents'
    },
    {
      id: 'fintech',
      title: 'Finance & FinTech',
      standard: 'ISO 20022 / FIX',
      icon: 'account_balance',
      desc: 'Sub-millisecond AML anti-structuring analysis, liquidity routing graph, and counterparty sanctions graph.',
      nodes: '230,000 Nodes',
      latency: '<2ms Ingest',
      agents: '18 Agents'
    },
    {
      id: 'defense',
      title: 'Defense & Aerospace',
      standard: 'MIL-STD / ASIL-D',
      icon: 'shield',
      desc: 'Air-gapped deployment architecture, avionics bus streaming (ARINC 429), and cryptographically signed audit chains.',
      nodes: 'Air-Gapped Ready',
      latency: 'Zero Egress',
      agents: '9 Agents'
    }
  ];

  const handleDownloadAttestation = () => {
    setAttestationDownloaded(true);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      onboardingVersion: "PIPELINE_INIT_REV_4.92",
      selectedOntology: selectedBlueprint,
      deterministicGuarantee: "CRYPTOGRAPHICALLY AUDITABLE",
      axiomaticRoot: "0x774921bfe8901a",
      timestamp: new Date().toISOString()
    }, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `cognexa_setup_attestation_${Date.now()}.json`;
    a.click();
    setTimeout(() => setAttestationDownloaded(false), 3000);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in text-on-surface">
      {/* Top Onboarding Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md py-space-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="px-space-sm py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm tracking-widest uppercase font-bold">
              System Initialization
            </span>
            <span className="font-code-md text-code-md text-on-surface-variant flex items-center gap-space-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
              PIPELINE_INIT_REV_4.92
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
            Initialize Your Universal Intelligence Architecture
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl mt-space-xs">
            Configure domain ontologies, quick-connect enterprise ingest streams, and live telemetry to generate deterministic cross-domain insights in real time.
          </p>
        </div>

        <div className="flex items-center gap-space-md self-start md:self-auto bg-surface-container-lowest px-space-lg py-space-sm rounded-xl shadow-sm border border-outline-variant/20">
          <div className="p-2 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">timer</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Estimated Time</span>
            <span className="font-code-md text-code-md font-bold text-on-surface">3m 45s Remaining</span>
          </div>
        </div>
      </div>

      {/* 4-Step Interactive Stepper Rail */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg relative">
          {/* Step 1 */}
          <div className="flex items-start gap-space-md relative">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-code-md text-code-md font-bold shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wide">Step 01</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                <span className="font-code-md text-code-md text-tertiary font-semibold text-[11px]">100% Active</span>
              </div>
              <span className="font-headline-sm text-headline-sm font-semibold text-on-surface truncate">Domain Ontology</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Industry Knowledge Graph</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-space-md relative">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-code-md text-code-md font-bold shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wide">Step 02</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                <span className="font-code-md text-code-md text-tertiary font-semibold text-[11px]">Indexed</span>
              </div>
              <span className="font-headline-sm text-headline-sm font-semibold text-on-surface truncate">Enterprise Data</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">ERP &amp; SOP Synchronizer</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-space-md relative">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-code-md text-code-md font-bold shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wide">Step 03</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                <span className="font-code-md text-code-md text-tertiary font-semibold text-[11px]">100Hz Telemetry</span>
              </div>
              <span className="font-headline-sm text-headline-sm font-semibold text-on-surface truncate">Edge IoT Stream</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">High-Res Sensor Gateway</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-space-md relative">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-code-md text-code-md font-bold shadow-sm shrink-0 animate-pulse">
              04
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wide">Step 04</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                <span className="font-code-md text-code-md text-secondary font-semibold text-[11px]">Correlated Live</span>
              </div>
              <span className="font-headline-sm text-headline-sm font-semibold text-on-surface truncate">First Insight</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Deterministic Reasoning</span>
            </div>
          </div>
        </div>

        {/* Micro-progress track */}
        <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-space-lg overflow-hidden">
          <div className="bg-primary h-full w-[88%] rounded-full transition-all duration-700"></div>
        </div>
      </div>

      {/* Main Dual-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start">
        {/* Left Section (7 Columns): Domain Ontology & Source Cards */}
        <div className="xl:col-span-7 flex flex-col gap-space-xl">
          {/* Blueprints Section */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/15">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">account_tree</span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    1. Select Industry Domain Ontology Template
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Cognexa automatically constructs an initial axiomatic schema from field-proven ontologies.
                  </p>
                </div>
              </div>
              <span className="font-code-md text-code-md text-outline bg-surface-container-low px-space-sm py-0.5 rounded self-start sm:self-auto mt-space-xs sm:mt-0 font-bold">
                6 PRE-BUILT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {blueprints.map((bp) => {
                const isSelected = selectedBlueprint === bp.id;
                return (
                  <div
                    key={bp.id}
                    onClick={() => setSelectedBlueprint(bp.id)}
                    className={`relative p-space-md rounded-xl shadow-sm cursor-pointer transition-all flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-surface-container-low border-primary ring-1 ring-primary/40 shadow-md'
                        : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/20 opacity-85 hover:opacity-100'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 flex items-center gap-space-xs bg-primary text-on-primary px-space-xs py-0.5 rounded font-label-sm text-label-sm font-bold">
                        <span className="material-symbols-outlined text-[12px]">check</span>
                        <span>ACTIVE BLUEPRINT</span>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-space-sm mb-space-sm">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                        }`}>
                          <span className="material-symbols-outlined text-[18px]">{bp.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface leading-tight">
                            {bp.title}
                          </h3>
                          <span className="font-code-md text-code-md text-on-surface-variant text-[11px]">
                            {bp.standard}
                          </span>
                        </div>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                        {bp.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-space-xs font-code-md text-code-md text-on-surface-variant text-[11px] bg-surface-container-lowest px-space-sm py-1 rounded border border-outline-variant/15">
                      <span className="text-primary font-bold">{bp.nodes}</span>
                      <span>{bp.latency}</span>
                      <span className="text-tertiary">{bp.agents}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Steps 2 & 3: Inline Data Stream Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {/* Step 2 Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border border-outline-variant/20">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                    Step 02 Data Source
                  </span>
                  <span className="flex items-center gap-1 font-code-md text-code-md text-tertiary bg-surface-container-low px-space-xs py-0.5 rounded font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                    ACTIVE
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-space-xs">
                  SAP S/4HANA + Atlassian SOPs
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Munich Plant 04 ERP cluster synchronized. 14,290 records indexed with semantic entity linking.
                </p>
              </div>

              <div className="bg-surface-container-low p-space-sm rounded-lg font-code-md text-code-md space-y-1 border border-outline-variant/15">
                <div className="flex justify-between text-on-surface-variant text-[11px]">
                  <span>Ingest Latency</span>
                  <span className="text-on-surface font-semibold">24ms (gRPC)</span>
                </div>
                <div className="flex justify-between text-on-surface-variant text-[11px]">
                  <span>Verified Entities</span>
                  <span className="text-tertiary font-semibold">100% Deterministic</span>
                </div>
                <div className="flex justify-between text-on-surface-variant text-[11px]">
                  <span>Ontology Mapping</span>
                  <span className="text-primary font-semibold">ISA-95 ProductionOrder</span>
                </div>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border border-outline-variant/20">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                    Step 03 Edge Telemetry
                  </span>
                  <span className="flex items-center gap-1 font-code-md text-code-md text-tertiary bg-surface-container-low px-space-xs py-0.5 rounded font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                    100Hz STREAM
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-space-xs">
                  ESP32-S3 Accelerometer Array
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Turbine-07 Z-Axis vibration transducer broadcasting live spectral density via MQTT broker.
                </p>
              </div>

              <div className="bg-surface-container-low p-space-sm rounded-lg font-code-md text-code-md space-y-1 border border-outline-variant/15">
                <div className="flex justify-between text-on-surface-variant text-[11px]">
                  <span>Current RMS</span>
                  <span className="text-error font-semibold">4.82 mm/s (Harmonic Spike)</span>
                </div>
                <div className="flex justify-between text-on-surface-variant text-[11px]">
                  <span>Sampling Frequency</span>
                  <span className="text-on-surface font-semibold">10,000 samples/sec</span>
                </div>
                <div className="flex justify-between text-on-surface-variant text-[11px]">
                  <span>Packet Loss</span>
                  <span className="text-tertiary font-semibold">0.000% (Lossless Buffer)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (5 Columns): Prominent First Insight Live Correlation Card */}
        <div className="xl:col-span-5 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-md relative overflow-hidden border border-outline-variant/20">
            {/* Glowing top line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>

            {/* Header of Insight */}
            <div className="flex items-start justify-between gap-space-sm mb-space-md mt-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs mb-space-xs">
                  <span className="px-space-sm py-0.5 rounded bg-error text-on-error font-label-sm text-label-sm uppercase font-bold tracking-wider">
                    Autonomous Insight #001
                  </span>
                  <span className="px-space-sm py-0.5 rounded bg-surface-container text-on-surface-variant font-code-md text-code-md text-[11px]">
                    1.48s runtime
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Critical Operational Risk Averted
                </span>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-low text-tertiary flex items-center justify-center shrink-0 border border-outline-variant/20">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-space-md rounded-xl bg-surface-container-low mb-space-lg border border-outline-variant/15">
              <p className="font-body-md text-body-md text-on-surface font-medium leading-snug">
                Correlated <span className="text-error font-bold font-code-md">3.2kHz harmonic vibration spike</span> on Turbine-07 with off-spec synthetic lubricant <span className="text-primary font-bold font-code-md">Batch #B-409</span> recently logged in SAP QA.
              </p>
            </div>

            {/* Causal Trace Lineage Diagram */}
            <div className="flex flex-col mb-space-lg">
              <span className="font-label-sm text-label-sm text-outline uppercase font-bold tracking-wider mb-space-sm">
                Zero-Hallucination Causal Trace Lineage
              </span>
              <div className="space-y-space-xs relative">
                {/* Lineage Step 1 */}
                <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-between border border-outline-variant/15">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="w-6 h-6 rounded bg-error-container text-on-error-container flex items-center justify-center font-code-md text-code-md font-bold text-[10px]">
                      01
                    </span>
                    <div className="truncate">
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface block truncate">
                        IoT Sensor Anomaly
                      </span>
                      <span className="font-code-md text-code-md text-on-surface-variant text-[11px]">
                        ESP32 Z-Axis RMS &gt; 4.80 mm/s (Thres: 2.20)
                      </span>
                    </div>
                  </div>
                  <span className="font-code-md text-code-md text-tertiary text-[11px] font-semibold shrink-0">
                    P=1.000
                  </span>
                </div>

                <div className="flex items-center justify-center h-3 text-outline">
                  <span className="material-symbols-outlined text-[16px]">south</span>
                </div>

                {/* Lineage Step 2 */}
                <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-between border border-outline-variant/15">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="w-6 h-6 rounded bg-surface-container text-primary flex items-center justify-center font-code-md text-code-md font-bold text-[10px]">
                      02
                    </span>
                    <div className="truncate">
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface block truncate">
                        SAP ERP Quality Batch Record
                      </span>
                      <span className="font-code-md text-code-md text-on-surface-variant text-[11px]">
                        Batch #B-409 Viscosity: 88 cSt (Spec: 110-125)
                      </span>
                    </div>
                  </div>
                  <span className="font-code-md text-code-md text-tertiary text-[11px] font-semibold shrink-0">
                    Exact Match
                  </span>
                </div>

                <div className="flex items-center justify-center h-3 text-outline">
                  <span className="material-symbols-outlined text-[16px]">south</span>
                </div>

                {/* Lineage Step 3 */}
                <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-between border border-outline-variant/15">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="w-6 h-6 rounded bg-primary text-on-primary flex items-center justify-center font-code-md text-code-md font-bold text-[10px]">
                      03
                    </span>
                    <div className="truncate">
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface block truncate">
                        Autonomous Recommendation
                      </span>
                      <span className="font-code-md text-code-md text-on-surface-variant text-[11px]">
                        Throttle RPM to 1,200 &amp; Dispatch Line Tech
                      </span>
                    </div>
                  </div>
                  <span className="font-code-md text-code-md text-tertiary text-[11px] font-semibold shrink-0">
                    96.4% Conf
                  </span>
                </div>
              </div>
            </div>

            {/* FFT Live Correlator SVG */}
            <div className="p-space-md rounded-xl bg-surface-container-low mb-space-lg border border-outline-variant/15">
              <div className="flex justify-between items-center mb-space-xs">
                <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                  Fast Fourier Transform (FFT) Live Correlator
                </span>
                <span className="font-code-md text-code-md text-error font-bold text-[11px]">
                  3.2 kHz Resonance Detected
                </span>
              </div>
              <div className="w-full h-16 flex items-end">
                <svg className="w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 300 60">
                  <line stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="300" y1="15" y2="15"></line>
                  <line stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="300" y1="30" y2="30"></line>
                  <line stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="300" y1="45" y2="45"></line>
                  <path
                    d="M0,50 Q15,48 30,52 T60,51 T90,49 T120,53 T150,50 T180,48 T210,12 T225,5 T240,18 T255,48 T280,50 T300,49"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></path>
                  <circle className="fill-error animate-pulse" cx="225" cy="5" r="4"></circle>
                  <path
                    d="M0,50 Q15,48 30,52 T60,51 T90,49 T120,53 T150,50 T180,48 T210,12 T225,5 T240,18 T255,48 T280,50 T300,49 L300,60 L0,60 Z"
                    fill="currentColor"
                    fillOpacity="0.08"
                  ></path>
                </svg>
              </div>
              <div className="flex justify-between font-code-md text-code-md text-on-surface-variant text-[10px] mt-1">
                <span>0 Hz (Idle)</span>
                <span>1.6 kHz</span>
                <span className="text-error font-bold">3.2 kHz (Off-Spec Harmonic)</span>
                <span>6.4 kHz</span>
              </div>
            </div>

            {/* Business Impact Metrics */}
            <div className="grid grid-cols-2 gap-space-md mb-space-lg">
              <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col border border-outline-variant/15">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                  Averted Downtime
                </span>
                <span className="font-headline-md text-headline-md font-bold text-tertiary">$210,000</span>
                <span className="font-code-md text-code-md text-on-surface-variant text-[11px]">
                  Catastrophic Bearing Seize
                </span>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col border border-outline-variant/15">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                  Mean Time to Resolve
                </span>
                <span className="font-headline-md text-headline-md font-bold text-primary">18 Minutes</span>
                <span className="font-code-md text-code-md text-on-surface-variant text-[11px]">
                  vs 51m Historical Mean
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                onComplete();
                onNavigate('command-center');
              }}
              className="w-full h-11 bg-primary text-on-primary hover:bg-primary-container transition-all rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-sm shadow-md hover:shadow-lg cursor-pointer"
              type="button"
            >
              <span>Launch Live Command Center</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Engine State Badge */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/20">
            <div className="flex items-center gap-space-sm">
              <div className="w-3 h-3 rounded-full bg-tertiary animate-ping"></div>
              <span className="font-code-md text-code-md font-semibold text-on-surface">Cognitive Engine State: NOMINAL</span>
            </div>
            <span className="font-code-md text-code-md text-outline">Cluster Sync: 99.98%</span>
          </div>
        </div>
      </div>

      {/* Bottom Guarantee Banner */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg border border-outline-variant/20">
        <div className="flex items-start gap-space-md">
          <div className="p-2.5 rounded-xl bg-surface-container-low text-primary flex items-center justify-center shrink-0 border border-outline-variant/15">
            <span className="material-symbols-outlined text-[26px]">verified_user</span>
          </div>
          <div>
            <div className="flex items-center gap-space-sm">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Deterministic Zero-Hallucination Guarantee
              </h3>
              <span className="px-space-sm py-0.5 rounded bg-surface-container text-tertiary font-code-md text-code-md text-[11px] font-semibold">
                CRYPTOGRAPHICALLY AUDITABLE
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-3xl mt-0.5">
              Every synthesized insight produced by Cognexa is formally anchored to ontological axioms and source telemetry hashes. Statistical hallucination is computationally eliminated via bounded constraint logic.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-space-sm self-end lg:self-center shrink-0">
          <button
            onClick={handleDownloadAttestation}
            className="px-space-md h-9 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg transition-colors flex items-center gap-space-xs cursor-pointer border border-outline-variant/20"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {attestationDownloaded ? 'check' : 'description'}
            </span>
            <span>{attestationDownloaded ? 'Attestation Downloaded' : 'Download Setup Attestation'}</span>
          </button>
          <button
            onClick={() => {
              onComplete();
              onNavigate('command-center');
            }}
            className="px-space-lg h-9 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-semibold transition-colors flex items-center gap-space-xs shadow-sm cursor-pointer"
            type="button"
          >
            <span>Complete Onboarding</span>
            <span className="material-symbols-outlined text-[18px]">done_all</span>
          </button>
        </div>
      </div>
    </div>
  );
};
