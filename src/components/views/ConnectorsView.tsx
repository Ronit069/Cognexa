import React, { useState } from 'react';
import { CONNECTORS } from '../../data/mockData';
import { ConnectorService } from '../../types';

export const ConnectorsView: React.FC = () => {
  const [connectors, setConnectors] = useState<ConnectorService[]>(CONNECTORS);
  const [filterType, setFilterType] = useState<string>('all');
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSync = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      setConnectors(prev =>
        prev.map(c => c.id === id ? { ...c, metrics: 'Synced just now', status: 'connected' } : c)
      );
    }, 1200);
  };

  const filteredConnectors = filterType === 'all' 
    ? connectors 
    : connectors.filter(c => c.category.toLowerCase() === filterType.toLowerCase());

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'erp': return 'receipt_long';
      case 'iot': return 'sensors';
      case 'docs': return 'description';
      case 'db': return 'database';
      case 'repo': return 'code';
      default: return 'hub';
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in text-on-surface">
      {/* Top Banner / Pipeline Health */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">hub</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-on-surface">Universal Ingestion Pipeline & Connectors</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {connectors.filter(c => c.status !== 'available').length} Pipelines Active
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-mono mt-0.5">
              Bidirectional sync with SCADA, SAP S/4HANA ERP, Confluence SOP Knowledge, Kafka streams & Vector Store
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setSyncingId('all');
              setTimeout(() => {
                setSyncingId(null);
                setConnectors(prev => prev.map(c => ({ ...c, metrics: 'Synced just now' })));
              }, 1500);
            }}
            disabled={syncingId !== null}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-xs font-semibold hover:border-primary/50 transition-all text-on-surface hover:text-primary cursor-pointer disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-sm ${syncingId === 'all' ? 'animate-spin' : ''}`}>sync</span>
            {syncingId === 'all' ? 'Syncing All Feeds...' : 'Sync All Pipelines'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:brightness-110 shadow-lg shadow-primary/20 transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Add Enterprise Source
          </button>
        </div>
      </div>

      {/* Pipeline Throughput & Latency Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Total Ingestion Rate</p>
              <h3 className="text-2xl font-bold text-on-surface font-mono mt-1">124.8 MB/s</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-lg">speed</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-emerald-400 flex items-center gap-1 font-mono">
              <span className="material-symbols-outlined text-xs">trending_up</span> +8.4% peak
            </span>
            <span className="text-on-surface-variant/70 font-mono">1.8M events/min</span>
          </div>
          <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '74%' }}></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-secondary/30 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Semantic Vector Embeddings</p>
              <h3 className="text-2xl font-bold text-on-surface font-mono mt-1">18,492 Docs</h3>
            </div>
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
              <span className="material-symbols-outlined text-lg">database</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-secondary flex items-center gap-1 font-mono">
              <span className="material-symbols-outlined text-xs">verified</span> Milvus v2.3 Sync
            </span>
            <span className="text-on-surface-variant/70 font-mono">1536-dim embeddings</span>
          </div>
          <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-emerald-500/30 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">SCADA Telemetry Latency</p>
              <h3 className="text-2xl font-bold text-on-surface font-mono mt-1">14.2 ms</h3>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <span className="material-symbols-outlined text-lg">bolt</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-emerald-400 flex items-center gap-1 font-mono">
              <span className="material-symbols-outlined text-xs">check_circle</span> Zero Buffer Drops
            </span>
            <span className="text-on-surface-variant/70 font-mono">99.999% SLA</span>
          </div>
          <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '18%' }}></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-amber-500/30 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">ERP Work-Order Triggers</p>
              <h3 className="text-2xl font-bold text-on-surface font-mono mt-1">42 / Day</h3>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <span className="material-symbols-outlined text-lg">receipt_long</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-amber-400 flex items-center gap-1 font-mono">
              <span className="material-symbols-outlined text-xs">sync_alt</span> SAP RFC 2-Way
            </span>
            <span className="text-on-surface-variant/70 font-mono">Auto-PO Enabled</span>
          </div>
          <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div className="flex items-center gap-2">
          {['all', 'erp', 'iot', 'docs', 'db', 'repo'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase font-mono transition-all cursor-pointer ${
                filterType === cat
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {cat === 'all' ? 'All Pipelines' : cat}
            </button>
          ))}
        </div>
        <div className="text-xs text-on-surface-variant font-mono">
          Showing {filteredConnectors.length} enterprise pipelines
        </div>
      </div>

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnectors.map((c) => {
          const isCurrentlySyncing = syncingId === c.id || syncingId === 'all';
          return (
            <div
              key={c.id}
              className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-primary/40 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform border border-outline-variant/20">
                      <span className="material-symbols-outlined text-2xl">{getCategoryIcon(c.category)}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors text-base">{c.name}</h4>
                      <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
                        Category: {c.category}
                      </span>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono ${
                    c.status === 'connected' || c.status === 'running' || c.status === 'active' || c.status === 'synced'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      c.status !== 'available' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}></span>
                    {c.status}
                  </span>
                </div>

                <p className="mt-3 text-xs text-on-surface-variant line-clamp-2">
                  {c.description}
                </p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-outline-variant/10 text-on-surface-variant">
                    <span>Protocol / Schema</span>
                    <span className="font-mono text-on-surface select-all truncate max-w-[180px]">{c.protocol}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-outline-variant/10 text-on-surface-variant">
                    <span>{c.statLabel}</span>
                    <span className="font-mono font-bold text-primary">{c.statValue}</span>
                  </div>
                  <div className="flex justify-between py-1 text-on-surface-variant">
                    <span>Status / Metrics</span>
                    <span className="font-mono text-on-surface-variant/80">{c.metrics}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <button
                  onClick={() => handleSync(c.id)}
                  disabled={isCurrentlySyncing}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-xs font-semibold text-on-surface transition-all cursor-pointer disabled:opacity-50"
                >
                  <span className={`material-symbols-outlined text-sm ${isCurrentlySyncing ? 'animate-spin text-primary' : ''}`}>
                    sync
                  </span>
                  {isCurrentlySyncing ? 'Refreshing...' : 'Trigger Sync'}
                </button>

                <button className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary font-medium transition-colors cursor-pointer">
                  <span>Configure Pipeline</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enterprise Schema Mapping Card */}
      <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">schema</span>
              Neuro-Symbolic Schema Alignment Engine
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Autonomous cross-ontology normalization between IEC 62264 (ISA-95 manufacturing) and SAP S/4HANA Plant Maintenance (PM)
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-surface-container-high text-emerald-400 border border-emerald-500/20">
            Ontology Version: v3.11-STABLE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/20 space-y-1.5">
            <span className="text-on-surface-variant font-sans font-semibold">SCADA Tag Mapping</span>
            <div className="text-primary truncate">MODBUS://10.240.12.8:502/REG_40112</div>
            <div className="text-on-surface-variant text-[11px]">→ SensorNode_MPU6050_RMS_Z</div>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/20 space-y-1.5">
            <span className="text-on-surface-variant font-sans font-semibold">SAP Functional Location</span>
            <div className="text-primary truncate">PM-PLANT-MUN04-CELL-02-AX3</div>
            <div className="text-on-surface-variant text-[11px]">→ KnowledgeGraph::Asset::RobotArm_03</div>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/20 space-y-1.5">
            <span className="text-on-surface-variant font-sans font-semibold">Confluence SOP Linkage</span>
            <div className="text-primary truncate">CONF://MANUF/SOP-TURB-094</div>
            <div className="text-on-surface-variant text-[11px]">→ ProceduralRuleset::VibrationDamping</div>
          </div>
        </div>
      </div>
    </div>
  );
};
