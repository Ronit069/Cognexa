import React, { useState } from 'react';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workspace' | 'ai' | 'team' | 'notifications' | 'hsm' | 'appearance'>('workspace');
  const [exfiltrationShield, setExfiltrationShield] = useState(true);
  const [savingPolicy, setSavingPolicy] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resyncing, setResyncing] = useState(false);

  const handleSavePolicy = () => {
    setSavingPolicy(true);
    setTimeout(() => {
      setSavingPolicy(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }, 800);
  };

  const handleForceSync = () => {
    setResyncing(true);
    setTimeout(() => {
      setResyncing(false);
    }, 1200);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in text-on-surface">
      {/* Top Header & Context */}
      <div className="flex flex-col gap-space-lg">
        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <div className="flex items-center gap-space-sm mb-space-2xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary bg-primary-fixed px-space-xs py-0.5 rounded font-bold font-mono">
                Security Tier Level 4
              </span>
              <span className="font-code-md text-code-md text-outline">CFG::ORG-8924-EIDAS</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Workspace Settings &amp; Governance
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Manage global organization policies, role-based access control (RBAC), autonomous AI permissions, audit alerts, and security interlocks across physical and digital operational nodes.
            </p>
          </div>

          <div className="flex items-center gap-space-sm shrink-0">
            <button
              onClick={() => {
                const cfg = {
                  tier: 'Level 4',
                  entity: 'Cognexa Advanced Manufacturing Enterprise',
                  anchorNode: 'Munich Gigafactory 04',
                  hsmSlot: '#04 / AES-256',
                  sovereigntyEnclave: 'EU de-fra-1 (Frankfurt)',
                  auditRetention: '10 Years Immutable'
                };
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cfg, null, 2));
                const a = document.createElement('a');
                a.href = dataStr;
                a.download = `cognexa_governance_${Date.now()}.json`;
                a.click();
              }}
              className="flex items-center gap-space-xs px-space-md py-2 bg-surface-container text-on-surface font-label-lg text-label-lg rounded-lg shadow-sm hover:bg-surface-container-high transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">file_download</span>
              <span>Export Governance (JSON)</span>
            </button>

            <button
              onClick={handleSavePolicy}
              disabled={savingPolicy}
              className="flex items-center gap-space-xs px-space-md py-2 bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-md hover:bg-primary transition-all cursor-pointer disabled:opacity-75"
              type="button"
            >
              <span className={`material-symbols-outlined text-[18px] ${savingPolicy ? 'animate-spin' : ''}`}>
                {savedSuccess ? 'done_all' : savingPolicy ? 'sync' : 'verified_user'}
              </span>
              <span>{savedSuccess ? 'Policy State Synced!' : savingPolicy ? 'Applying Interlocks...' : 'Save Policy State'}</span>
            </button>
          </div>
        </div>

        {/* 3 Status KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/20">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">enhanced_encryption</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Security Interlock</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">HSM Enforced (eIDAS L3)</span>
              </div>
            </div>
            <span className="inline-flex items-center px-space-xs py-0.5 rounded text-tertiary font-label-sm text-label-sm bg-tertiary-fixed font-semibold">
              Active
            </span>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/20">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">speed</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">AI Boundary Profile</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Autonomy Level 2.8</span>
              </div>
            </div>
            <span className="inline-flex items-center px-space-xs py-0.5 rounded text-on-secondary-container font-label-sm text-label-sm bg-secondary-fixed font-semibold">
              Guarded
            </span>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/20">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[20px]">sync_saved_locally</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Integrity Audit</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Policy Verifier Synced</span>
              </div>
            </div>
            <span className="inline-flex items-center px-space-xs py-0.5 rounded text-tertiary-container font-code-md text-code-md bg-tertiary-fixed font-bold">
              0.4ms
            </span>
          </div>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs border-b border-outline-variant/30">
        <button
          onClick={() => setActiveTab('workspace')}
          className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
            activeTab === 'workspace'
              ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
              : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">factory</span>
          <span>Workspace &amp; Plant</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
            activeTab === 'ai'
              ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
              : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">psychology</span>
          <span>AI Permissions &amp; Limits</span>
          <span className="px-1.5 py-0.5 rounded font-label-sm text-label-sm bg-error-container text-on-error-container uppercase font-bold">
            Strict
          </span>
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
            activeTab === 'team'
              ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
              : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">groups</span>
          <span>Team &amp; Roles</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
              : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">notifications_active</span>
          <span>Notifications &amp; Escalation</span>
        </button>

        <button
          onClick={() => setActiveTab('hsm')}
          className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
            activeTab === 'hsm'
              ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
              : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">key</span>
          <span>HSM &amp; Cryptography</span>
        </button>

        <button
          onClick={() => setActiveTab('appearance')}
          className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
            activeTab === 'appearance'
              ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
              : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">palette</span>
          <span>Appearance &amp; Display</span>
        </button>
      </div>

      {/* Main Settings Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Column (8 Columns): Facility, Data Sovereignty, Sub-Facility Cells */}
        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          {/* Facility Identity Card */}
          <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col gap-space-lg border border-outline-variant/20">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[22px] text-primary">domain</span>
                <div className="flex flex-col">
                  <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    Facility Identity &amp; Primary Node
                  </h2>
                  <span className="font-body-sm text-body-sm text-outline">
                    Authoritative plant identification for verifiable multi-agent dispatch
                  </span>
                </div>
              </div>
              <span className="font-code-md text-code-md text-tertiary bg-surface-container-low px-space-xs py-0.5 rounded font-bold">
                CONNECTED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                  Legal Entity
                </label>
                <div className="flex items-center bg-surface-container-low px-space-md py-2 rounded-lg border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[18px] text-outline mr-space-xs">corporate_fare</span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    Cognexa Advanced Manufacturing Enterprise
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                  Operational Anchor Node
                </label>
                <div className="flex items-center bg-surface-container-low px-space-md py-2 rounded-lg border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[18px] text-outline mr-space-xs">precision_manufacturing</span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    Munich Gigafactory 04
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                  Cluster Sync Target
                </label>
                <div className="flex items-center justify-between bg-surface-container-low px-space-md py-2 rounded-lg border border-outline-variant/20">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      Alpha Cluster (Active Node 01)
                    </span>
                  </div>
                  <span className="font-code-md text-code-md font-semibold text-tertiary">99.98%</span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                  Facility Master Clock Timezone
                </label>
                <div className="flex items-center justify-between bg-surface-container-low px-space-md py-2 rounded-lg border border-outline-variant/20">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-outline">schedule</span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      UTC+01:00 (Europe/Berlin)
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold font-mono">
                    PTP Locked
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Data Sovereignty Card */}
          <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col gap-space-lg border border-outline-variant/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[22px] text-tertiary">shield</span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-sm">
                    <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                      Data Sovereignty &amp; Physical Residency Lock
                    </h2>
                    <span className="px-space-xs py-0.5 rounded font-label-sm text-label-sm bg-tertiary-fixed text-tertiary font-bold tracking-wider uppercase font-mono">
                      GDPR Enforced
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-outline">
                    Zero cross-border transfer guarantees for machine telemetry and camera visual vectors
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[22px] text-tertiary">lock</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Storage Enclave</span>
                <span className="font-body-md text-body-md text-on-surface font-semibold">EU de-fra-1 (Frankfurt)</span>
                <span className="font-code-md text-code-md text-outline">AWS Nitro ISO-27001</span>
              </div>
              <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Hardware Key Slot</span>
                <span className="font-body-md text-body-md text-on-surface font-semibold">HSM Slot #04 / AES-256</span>
                <span className="font-code-md text-code-md text-outline">FIPS 140-3 Level 3</span>
              </div>
              <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Audit Retention</span>
                <span className="font-body-md text-body-md text-on-surface font-semibold">10 Years Immutable</span>
                <span className="font-code-md text-code-md text-outline">WORM Compliance Active</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container border border-outline-variant/20">
              <div className="flex items-center gap-space-md">
                <span className="material-symbols-outlined text-[20px] text-primary">security_update_good</span>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    Real-Time Autonomous Exfiltration Shield
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Drops any telemetry pack packet with payload destinations outside the sovereign CIDR range
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setExfiltrationShield(!exfiltrationShield)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  exfiltrationShield ? 'bg-primary-container' : 'bg-surface-container-highest'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                  exfiltrationShield ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Sub-Facility Cell Distribution */}
          <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col gap-space-lg border border-outline-variant/20">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[22px] text-primary">lan</span>
                <div className="flex flex-col">
                  <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    Sub-Facility Cell Distribution
                  </h2>
                  <span className="font-body-sm text-body-sm text-outline">
                    Active production partitions connected to the central governance bus
                  </span>
                </div>
              </div>
              <button className="flex items-center gap-space-xs px-space-md py-1 bg-surface-container-low text-primary hover:bg-surface-container font-label-lg text-label-lg rounded-lg transition-colors cursor-pointer" type="button">
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                <span>Register New Cell</span>
              </button>
            </div>

            <div className="flex flex-col gap-space-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors gap-space-sm border border-outline-variant/15">
                <div className="flex items-center gap-space-md">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary font-code-md text-code-md font-bold shadow-sm">
                    01
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md text-body-md font-semibold text-on-surface">
                      Cell 01: Stamping &amp; Hydraulic Press
                    </span>
                    <span className="font-code-md text-code-md text-outline">
                      ID: CELL-MUC-STP-01 | 148 IoT Transducers
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-lg">
                  <div className="flex flex-col items-end">
                    <span className="font-code-md text-code-md font-bold text-tertiary">99.98% Health</span>
                    <span className="font-label-sm text-label-sm text-outline">Nominal Operation</span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-outline cursor-pointer hover:text-on-surface">more_vert</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors gap-space-sm border border-outline-variant/15">
                <div className="flex items-center gap-space-md">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary font-code-md text-code-md font-bold shadow-sm">
                    02
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md text-body-md font-semibold text-on-surface">
                      Cell 02: Battery Pack Robotic Assembly
                    </span>
                    <span className="font-code-md text-code-md text-outline">
                      ID: CELL-MUC-BAT-02 | 194 IoT Transducers
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-lg">
                  <div className="flex flex-col items-end">
                    <span className="font-code-md text-code-md font-bold text-tertiary">99.99% Health</span>
                    <span className="font-label-sm text-label-sm text-outline">Zero Fault Rate</span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-outline cursor-pointer hover:text-on-surface">more_vert</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors gap-space-sm border border-outline-variant/15">
                <div className="flex items-center gap-space-md">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary font-code-md text-code-md font-bold shadow-sm">
                    03
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md text-body-md font-semibold text-on-surface">
                      Cell 03: Final Assembly &amp; Diagnostics
                    </span>
                    <span className="font-code-md text-code-md text-outline">
                      ID: CELL-MUC-ASM-03 | 76 IoT Transducers
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-lg">
                  <div className="flex flex-col items-end">
                    <span className="font-code-md text-code-md font-bold text-secondary">98.42% Health</span>
                    <span className="font-label-sm text-label-sm text-outline">Degraded Sensor #12</span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-outline cursor-pointer hover:text-on-surface">more_vert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 Columns): Live Optical Feed, Scheduled Edge Resync, Governance Log Digest */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* Live Optical Bay Feed */}
          <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-primary">videocam</span>
                <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  Live Optical Bay Feed
                </h2>
              </div>
              <span className="flex items-center gap-space-xs text-error font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-error animate-ping"></span> Live Bay 04
              </span>
            </div>

            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container-high">
              <img
                className="w-full h-full object-cover"
                alt="High-angle cinematic telephoto surveillance view of an advanced automotive smart gigafactory manufacturing floor"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsp2sNJ-n4JbpsB-iOA-tV3ORS_YEydUeQWmFbEyhGWz_LqANhDy7w5-oEmuD7THv3c1cmkJ0VT4Fgvys4OzCTaP_8WAZskVa466__7W_bYp3uuSv1YWNHuBZqBqJ39zGlBtwdQI3hiQi3tjZZfzIQue3teF8wG1qcnAbyKiTYjVBhlZBIyJwjJSrunj7NSI8XxUUt1zyovdpfoN3Pijot9XQJM6vgoGHkXEBRnRJ7Qk5AGFWD-kHR"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-space-md">
                <div className="flex items-center justify-between w-full text-white">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-semibold tracking-wider uppercase">
                      CAM-BAY-NORTH-04
                    </span>
                    <span className="font-code-md text-code-md text-[11px] text-white/80">
                      Resolution: 3840x2160 @ 60fps
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-white cursor-pointer">fullscreen</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs pt-space-xs">
              <div className="flex items-center justify-between py-space-xs bg-surface-container-low px-space-md rounded border border-outline-variant/15">
                <span className="font-body-sm text-body-sm text-outline">Connected PLC Controllers</span>
                <span className="font-code-md text-code-md font-bold text-on-surface">418 Units</span>
              </div>
              <div className="flex items-center justify-between py-space-xs bg-surface-container-low px-space-md rounded border border-outline-variant/15">
                <span className="font-body-sm text-body-sm text-outline">Microservice Endpoints</span>
                <span className="font-code-md text-code-md font-bold text-on-surface">1,248 Active</span>
              </div>
              <div className="flex items-center justify-between py-space-xs bg-surface-container-low px-space-md rounded border border-outline-variant/15">
                <span className="font-body-sm text-body-sm text-outline">Average Loop Latency</span>
                <span className="font-code-md text-code-md font-bold text-tertiary">2.44 ms</span>
              </div>
              <div className="flex items-center justify-between py-space-xs bg-surface-container-low px-space-md rounded border border-outline-variant/15">
                <span className="font-body-sm text-body-sm text-outline">Security Partition ID</span>
                <span className="font-code-md text-code-md font-semibold text-primary">SEC-Z7-ENCLAVE</span>
              </div>
            </div>
          </div>

          {/* Scheduled Edge Resync Card */}
          <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-secondary">update</span>
                <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  Scheduled Edge Resync
                </h2>
              </div>
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold font-mono">
                T-02:14:00
              </span>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Deterministic state synchronizer ensures all edge inferencing models compile identical weights with the primary sovereign ledger.
            </p>

            <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs border border-outline-variant/15">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-outline uppercase">Next Window Target</span>
                <span className="font-code-md text-code-md text-on-surface font-semibold">03:00:00 CET</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-outline uppercase">Safety Threshold</span>
                <span className="font-code-md text-code-md text-tertiary font-semibold">&lt; 0.05% Drift</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-outline uppercase">Rollback Defense</span>
                <span className="font-label-sm text-label-sm text-primary font-bold uppercase font-mono">
                  Armed (Automatic)
                </span>
              </div>
            </div>

            <button
              onClick={handleForceSync}
              disabled={resyncing}
              className="w-full py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg rounded-lg transition-colors flex items-center justify-center gap-space-xs cursor-pointer border border-outline-variant/20 disabled:opacity-50"
              type="button"
            >
              <span className={`material-symbols-outlined text-[18px] ${resyncing ? 'animate-spin text-primary' : ''}`}>
                {resyncing ? 'sync' : 'play_circle'}
              </span>
              <span>{resyncing ? 'Synchronizing Model Weights...' : 'Force Synchronization Now'}</span>
            </button>
          </div>

          {/* Governance Log Digest */}
          <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md border border-outline-variant/20">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[20px] text-primary">policy</span>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                Governance Log Digest
              </h2>
            </div>

            <div className="flex flex-col gap-space-xs">
              <div className="flex items-start gap-space-xs py-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5">check_circle</span>
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">HSM Root rotation validated</span>
                  <span className="font-code-md text-code-md text-outline">12m ago by sec-bot-01</span>
                </div>
              </div>
              <div className="flex items-start gap-space-xs py-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5">check_circle</span>
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Policy Verifier 4.2 applied to Cell 02</span>
                  <span className="font-code-md text-code-md text-outline">1h 14m ago by system</span>
                </div>
              </div>
              <div className="flex items-start gap-space-xs py-1">
                <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">info</span>
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Auto-scaling bound locked at Level 2.8</span>
                  <span className="font-code-md text-code-md text-outline">3h ago by operator-admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
