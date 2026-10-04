import React, { useState } from 'react';

export const ConnectorsView: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'active' | 'syncing' | 'offline'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [syncProgress, setSyncProgress] = useState(84);
  const [isPaused, setIsPaused] = useState(false);

  const mcpServers = [
    {
      id: 'mcp-local',
      name: 'Cognexa Local MCP',
      endpoint: 'Port 4040 • Stdio/SSE',
      status: 'active',
      statusLabel: 'RUNNING',
      desc: 'Local machine command execution layer, process virtualization, and contextual OS telemetry injection.',
      auth: 'Auth: mTLS + Unix Socket',
      action: 'Inspect Logs'
    },
    {
      id: 'mcp-factory',
      name: 'Factory Floor MCP',
      endpoint: 'SCADA / Siemens S7 PLC',
      status: 'active',
      statusLabel: 'GUARDED',
      desc: 'Direct deterministic tool calling into robotic arm actuation cells with real-time hardware safety interlocks.',
      auth: 'OPC-UA Bridge • 2.4ms',
      action: 'Telemetry'
    },
    {
      id: 'mcp-jira',
      name: 'Linear / Jira Toolset',
      endpoint: 'MCP Remote Agent API',
      status: 'active',
      statusLabel: 'SYNCED',
      desc: 'Agentic ticket creation, dynamic subtask decomposition, and bidirectional sprint velocity reasoning.',
      auth: '2,410 Issues Indexed',
      action: 'Re-map'
    }
  ];

  const erpSystems = [
    {
      id: 'erp-sap',
      name: 'SAP S/4HANA Enterprise',
      endpoint: 'OData v4 / RFC Gateway',
      status: 'syncing',
      statusLabel: 'SYNCING',
      desc: 'Synchronizing 4.2M materials, dynamic bills-of-materials (BOM), and vendor purchase order histories.',
      progress: 84
    },
    {
      id: 'erp-siemens',
      name: 'Siemens Teamcenter',
      endpoint: 'PLM Dispatcher Service',
      status: 'active',
      statusLabel: 'CONNECTED',
      desc: '320,000 JT/STEP CAD assemblies indexed with geometric vector embeddings for automated defect cross-referencing.',
      auth: '320k CAD nodes',
      action: 'Mesh Details'
    },
    {
      id: 'erp-salesforce',
      name: 'Salesforce Service Cloud',
      endpoint: 'OAuth 2.0 PKCE Flow',
      status: 'offline',
      statusLabel: 'DISCONNECTED',
      desc: 'Field technician case dispatch logs, warranty claim histories, and RMA failure classifications.',
      action: 'Connect Service Cloud'
    }
  ];

  const iotHardware = [
    {
      id: 'iot-hivemq',
      name: 'MQTT HiveMQ Cluster',
      tag: '100Hz',
      sub: 'TLS v1.3 • QoS 1',
      desc: '12,482 sensor telemetry topics streaming real-time vibration & thermal drift.',
      stat: '12,482 Nodes',
      meta: '0 Drops',
      status: 'active'
    },
    {
      id: 'iot-esp32',
      name: 'ESP32 Edge Micro-Nodes',
      tag: 'Mesh',
      sub: 'FreeRTOS OTA',
      desc: 'Custom vibration sensors deployed on high-wear spindle assembly enclosures.',
      stat: '8,940 Active',
      meta: '6 Low Battery',
      status: 'active'
    },
    {
      id: 'iot-cm4',
      name: 'Raspberry Pi CM4',
      tag: 'Edge OS',
      sub: 'Local TinyML Inferencing',
      desc: 'Embedded camera gateways processing visual anomalies on conveyor belts.',
      stat: '342 Gateways',
      meta: 'v2.1.4 FW',
      status: 'active'
    },
    {
      id: 'iot-rest',
      name: 'REST API Gateway',
      tag: 'Live',
      sub: 'Kong Ingress Controller',
      desc: 'External vendor webhooks, quality assurance test feeds, and lab analytics.',
      stat: '4.8k calls/m',
      meta: '99.99%',
      status: 'active'
    }
  ];

  const documents = [
    { name: 'Google Workspace', count: '1,248,900 docs indexed', icon: 'cloud', status: 'active' },
    { name: 'Microsoft SharePoint', count: '3,412,000 files chunked', icon: 'share', status: 'active' },
    { name: 'Atlassian Confluence', count: '82,400 SOP specs', icon: 'menu_book', status: 'active' },
    { name: 'Dropbox Enterprise', count: 'Standby / Idle', icon: 'inventory_2', status: 'offline' }
  ];

  const databases = [
    { name: 'PostgreSQL + TimescaleDB', sub: 'CDC WAL Debezium Reader', latency: '0.4ms', icon: 'storage', status: 'active' },
    { name: 'MySQL Enterprise Replica', sub: 'Read-Only Binlog Stream', latency: '0.8ms', icon: 'dns', status: 'active' },
    { name: 'MongoDB Atlas', sub: 'Standby Shard Cluster', latency: 'Paused', icon: 'account_tree', status: 'offline' }
  ];

  const repos = [
    { name: 'GitHub Enterprise', sub: '320 Monorepos Ingested', icon: 'code', status: 'active' },
    { name: 'Slack Enterprise Grid', sub: '24 Triage Channels Stream', icon: 'forum', status: 'active' },
    { name: 'Microsoft Exchange 365', sub: 'Safety Bulletin Dispatchers', icon: 'mail', status: 'active' }
  ];

  const matchesCategory = (status: string) => {
    if (filterCategory === 'all') return true;
    return status === filterCategory;
  };

  const matchesSearch = (text: string) => {
    if (!searchFilter.trim()) return true;
    return text.toLowerCase().includes(searchFilter.toLowerCase());
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in text-on-surface">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/20">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary/5 pointer-events-none blur-3xl"></div>
        <div className="absolute right-32 top-1/2 -translate-y-1/2 hidden 2xl:flex items-center gap-6 pointer-events-none opacity-40">
          <div className="w-40 h-28 flex flex-col justify-end">
            <svg className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 160 80">
              <path d="M0,55 C30,55 40,20 70,35 C100,50 120,10 160,25" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M0,70 C30,70 50,45 80,60 C110,75 130,30 160,40" opacity="0.6" strokeDasharray="3 3" strokeWidth="1.5"></path>
            </svg>
            <span className="font-code-md text-code-md text-outline text-right mt-1 font-mono">42.8M VECTORS</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-surface-container-high text-primary font-label-sm text-label-sm tracking-widest uppercase font-bold font-mono">
              <span className="material-symbols-outlined text-[14px]">lock_open</span>
              <span>Zero Data Lock-In Protocol</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
                    topology: "Cognexa Universal Integration Mesh",
                    nodes: 48,
                    indexedVectors: "42.8M",
                    p99Sla: "14ms",
                    exportTime: new Date().toISOString()
                  }, null, 2));
                  const a = document.createElement('a');
                  a.href = dataStr;
                  a.download = `cognexa_topology_${Date.now()}.json`;
                  a.click();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors shadow-sm cursor-pointer border border-outline-variant/20"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">download</span>
                <span>Export Topology</span>
              </button>
              <button
                onClick={() => alert("Launching MCP Protocol Builder wizard for local or remote transports...")}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg transition-all shadow-sm cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>+ Build Custom MCP Connector</span>
              </button>
            </div>
          </div>

          <div className="max-w-4xl space-y-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Vendor-independent, works on top of your existing systems.
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Cognexa extracts, synthesizes, and reasons across your legacy ERPs, cloud document silos, code repositories, IoT telemetry feeds, and agentic Model Context Protocol (MCP) servers via read-only zero-trust adapters.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <div className="flex flex-col p-3 rounded-xl bg-surface-container-low border border-outline-variant/15">
              <span className="font-label-sm text-label-sm uppercase text-outline font-semibold">Connected Systems</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-md text-headline-md font-bold text-on-surface">48</span>
                <span className="font-label-sm text-label-sm text-tertiary font-medium">100% active mesh</span>
              </div>
            </div>

            <div className="flex flex-col p-3 rounded-xl bg-surface-container-low border border-outline-variant/15">
              <span className="font-label-sm text-label-sm uppercase text-outline font-semibold">Indexed Records</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-md text-headline-md font-bold text-on-surface">42.8M</span>
                <span className="font-label-sm text-label-sm text-secondary font-medium">+142k/hr</span>
              </div>
            </div>

            <div className="flex flex-col p-3 rounded-xl bg-surface-container-low border border-outline-variant/15">
              <span className="font-label-sm text-label-sm uppercase text-outline font-semibold">Ingest Latency</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-md text-headline-md font-bold text-on-surface">14ms</span>
                <span className="font-label-sm text-label-sm text-tertiary font-medium">P99 SLA</span>
              </div>
            </div>

            <div className="flex flex-col p-3 rounded-xl bg-surface-container-low border border-outline-variant/15">
              <span className="font-label-sm text-label-sm uppercase text-outline font-semibold">Zero-Trust Layer</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-md text-headline-md font-bold text-tertiary">Zero-Copy</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Enforced</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl w-fit border border-outline-variant/20">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-1.5 text-label-lg font-label-lg rounded-lg transition-all cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All <span className="ml-1 text-label-sm text-on-surface-variant font-mono">18</span>
          </button>
          <button
            onClick={() => setFilterCategory('active')}
            className={`px-3.5 py-1.5 text-label-lg font-label-lg rounded-lg transition-all cursor-pointer ${
              filterCategory === 'active'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Active <span className="ml-1 text-label-sm text-tertiary font-semibold font-mono">12</span>
          </button>
          <button
            onClick={() => setFilterCategory('syncing')}
            className={`px-3.5 py-1.5 text-label-lg font-label-lg rounded-lg transition-all cursor-pointer ${
              filterCategory === 'syncing'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Syncing <span className="ml-1 text-label-sm text-secondary font-semibold font-mono">2</span>
          </button>
          <button
            onClick={() => setFilterCategory('offline')}
            className={`px-3.5 py-1.5 text-label-lg font-label-lg rounded-lg transition-all cursor-pointer ${
              filterCategory === 'offline'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Offline <span className="ml-1 text-label-sm text-error font-semibold font-mono">4</span>
          </button>
        </div>

        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-2.5 text-[18px] text-outline pointer-events-none">filter_list</span>
          <input
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-72 bg-surface-container-lowest text-on-surface placeholder:text-outline pl-8 pr-3 py-1.5 rounded-xl font-body-sm text-body-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/20"
            placeholder="Filter protocols, ports, DBs..."
            type="text"
          />
        </div>
      </div>

      {/* Main Connectors Flow */}
      <div className="space-y-10">
        {/* 1. Agentic MCP Servers */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Agentic MCP Servers</h2>
              <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-mono">
                Anthropic / Model Context Protocol
              </span>
            </div>
            <span className="font-code-md text-code-md text-outline">3 Protocols Discovered</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mcpServers.filter(s => matchesCategory(s.status) && matchesSearch(s.name + s.desc)).map((m) => (
              <div
                key={m.id}
                className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/20"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[22px]">terminal</span>
                      </div>
                      <div>
                        <h3 className="font-label-lg text-label-lg font-bold text-on-surface">{m.name}</h3>
                        <span className="font-code-md text-code-md text-outline font-mono text-[11px]">{m.endpoint}</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-tertiary font-semibold font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                      {m.statusLabel}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                    {m.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/15">
                  <span className="font-code-md text-code-md text-on-surface-variant font-mono text-[11px]">{m.auth}</span>
                  <button className="font-label-md text-label-md text-primary font-semibold hover:underline cursor-pointer">
                    {m.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. ERP & Industrial Lifecycle */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">ERP &amp; Industrial Lifecycle</h2>
              <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                Mission-Critical Deterministic Systems
              </span>
            </div>
            <span className="font-code-md text-code-md text-outline">3 Endpoints</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {erpSystems.filter(s => matchesCategory(s.status) && matchesSearch(s.name + s.desc)).map((e) => (
              <div
                key={e.id}
                className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/20"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[22px]">
                          {e.id === 'erp-sap' ? 'account_balance' : e.id === 'erp-siemens' ? 'view_in_ar' : 'cloud_sync'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-label-lg text-label-lg font-bold text-on-surface">{e.name}</h3>
                        <span className="font-code-md text-code-md text-outline font-mono text-[11px]">{e.endpoint}</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-mono font-semibold ${
                      e.status === 'active'
                        ? 'bg-surface-container-high text-tertiary'
                        : e.status === 'syncing'
                        ? 'bg-surface-container-high text-secondary'
                        : 'bg-surface-container text-outline'
                    }`}>
                      {e.status === 'syncing' && <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>}
                      {e.statusLabel}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                    {e.desc}
                  </p>
                </div>

                {e.progress ? (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-label-sm font-label-sm text-outline">
                      <span>Vectorizing BOM Ledger</span>
                      <span className="text-on-surface font-code-md font-bold">{syncProgress}%</span>
                    </div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${syncProgress}%` }}></div>
                    </div>
                  </div>
                ) : e.status === 'offline' ? (
                  <button className="w-full py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                    <span className="material-symbols-outlined text-[16px]">link</span>
                    <span>{e.action}</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between pt-3 bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/15">
                    <span className="font-code-md text-code-md text-on-surface-variant font-mono text-[11px]">{e.auth}</span>
                    <button className="font-label-md text-label-md text-primary font-semibold hover:underline cursor-pointer">
                      {e.action}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 3. IoT Protocols & Edge Hardware */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">IoT Protocols &amp; Edge Hardware</h2>
              <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                Sub-Millisecond High-Frequency Telemetry
              </span>
            </div>
            <span className="font-code-md text-code-md text-outline">21,764 Hardware Endpoints</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {iotHardware.filter(h => matchesCategory(h.status) && matchesSearch(h.name + h.desc)).map((hw) => (
              <div
                key={hw.id}
                className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/20 hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="material-symbols-outlined text-secondary text-[24px]">sensors</span>
                    <span className="px-2 py-0.5 rounded font-label-sm text-label-sm bg-surface-container text-tertiary font-semibold font-mono">
                      {hw.tag}
                    </span>
                  </div>
                  <h4 className="font-label-lg text-label-lg font-bold text-on-surface">{hw.name}</h4>
                  <span className="font-code-md text-code-md text-outline block mb-2 font-mono text-[11px]">{hw.sub}</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    {hw.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between text-code-md font-code-md text-on-surface font-mono">
                  <span className="text-tertiary font-bold">{hw.stat}</span>
                  <span className="text-outline">{hw.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 3-Column Sources: Documents, Databases, Repositories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Documents & Silos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">folder_copy</span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Documents &amp; Silos</h3>
              </div>
              <span className="font-code-md text-code-md text-outline">4 Sources</span>
            </div>
            <div className="space-y-2.5">
              {documents.map((d, i) => (
                <div key={i} className="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-outline-variant/15">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-primary">{d.icon}</span>
                    <div>
                      <p className="font-label-lg text-label-lg font-semibold text-on-surface">{d.name}</p>
                      <span className="font-code-md text-code-md text-outline font-mono text-[11px]">{d.count}</span>
                    </div>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${d.status === 'active' ? 'bg-tertiary' : 'bg-outline'}`}></span>
                </div>
              ))}
            </div>
          </div>

          {/* Databases & Vectors */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">database</span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Databases &amp; Vectors</h3>
              </div>
              <span className="font-code-md text-code-md text-outline">3 Storage Engines</span>
            </div>
            <div className="space-y-2.5">
              {databases.map((db, i) => (
                <div key={i} className="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-outline-variant/15">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-secondary">{db.icon}</span>
                    <div>
                      <p className="font-label-lg text-label-lg font-semibold text-on-surface">{db.name}</p>
                      <span className="font-code-md text-code-md text-outline font-mono text-[11px]">{db.sub}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded font-code-md text-code-md bg-surface-container text-tertiary font-mono font-semibold">
                    {db.latency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Repositories & Comms */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">hub</span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Repositories &amp; Comms</h3>
              </div>
              <span className="font-code-md text-code-md text-outline">3 Real-Time Pipelines</span>
            </div>
            <div className="space-y-2.5">
              {repos.map((r, i) => (
                <div key={i} className="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-outline-variant/15">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-tertiary">{r.icon}</span>
                    <div>
                      <p className="font-label-lg text-label-lg font-semibold text-on-surface">{r.name}</p>
                      <span className="font-code-md text-code-md text-outline font-mono text-[11px]">{r.sub}</span>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Active Pipeline Stage Card */}
        <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm space-y-6 border border-outline-variant/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/15">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-bold uppercase tracking-wider font-mono">
                  Active Pipeline
                </span>
                <span className="font-code-md text-code-md text-outline font-mono">PIPE-SAP-CONF-984</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                New Adapter Pipeline: SAP S/4HANA &amp; Confluence Sync
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-colors cursor-pointer border border-outline-variant/20"
              >
                {isPaused ? 'Resume Pipeline' : 'Pause Pipeline'}
              </button>
              <button
                onClick={() => alert("Showing raw ISA-95 normalized JSON-LD schema graph")}
                className="px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md font-semibold transition-colors cursor-pointer"
              >
                View Raw Graph
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/15">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-label-sm text-label-sm uppercase font-semibold text-tertiary">Step 1</span>
                <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
              </div>
              <h4 className="font-label-lg text-label-lg font-bold text-on-surface">Authentication</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">mTLS Certificates Verified with SAP Bastion</p>
            </div>

            <div className="flex flex-col p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/15">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-label-sm text-label-sm uppercase font-semibold text-tertiary">Step 2</span>
                <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
              </div>
              <h4 className="font-label-lg text-label-lg font-bold text-on-surface">Scope &amp; Grants</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">4 Grants Active (Read-Only Zero Copy)</p>
            </div>

            <div className="flex flex-col p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/15">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-label-sm text-label-sm uppercase font-semibold text-tertiary">Step 3</span>
                <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
              </div>
              <h4 className="font-label-lg text-label-lg font-bold text-on-surface">Sync Topology</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">5m Polling Interval + Webhook Push</p>
            </div>

            <div className="flex flex-col p-3.5 rounded-xl bg-surface-container-high border border-primary/20">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-label-sm text-label-sm uppercase font-semibold text-primary">Step 4</span>
                <span className={`material-symbols-outlined text-primary text-[18px] ${!isPaused ? 'animate-spin' : ''}`}>sync</span>
              </div>
              <h4 className="font-label-lg text-label-lg font-bold text-on-surface">Live Indexing</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Embedding {syncProgress}% • 3.5M Vectors Built</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low space-y-4 border border-outline-variant/15">
            <div className="flex flex-wrap items-center justify-between gap-2 text-label-sm font-label-sm text-on-surface-variant">
              <div className="flex items-center gap-4">
                <span>Target Index: <strong className="text-on-surface font-code-md">cognexa-mfg-v4</strong></span>
                <span>Chunk Size: <strong className="text-on-surface font-code-md">512 tokens</strong></span>
                <span>Dimensionality: <strong className="text-on-surface font-code-md">1536 (Float32)</strong></span>
              </div>
              <span className="font-code-md text-tertiary font-semibold">ETA: 4 minutes remaining</span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full rounded-full transition-all duration-700" style={{ width: `${syncProgress}%` }}></div>
            </div>
            <div className="flex items-center justify-between text-body-sm font-body-sm text-outline">
              <span className="font-code-md text-[11px]">Source: s4hana.internal.munich.cognexa/api/v4/materials</span>
              <span className="font-code-md text-[11px]">Throughput: 1,420 items/sec</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
