export type ViewMode = 
  | 'command-center'
  | 'ask-cognexa'
  | 'knowledge-graph'
  | 'iot-devices'
  | 'anomalies-and-incidents'
  | 'ai-agents'
  | 'workflows'
  | 'connectors'
  | 'explainability-audit'
  | 'settings'
  | 'onboarding';

export interface PlantLocation {
  id: string;
  name: string;
  type: string;
  cluster: string;
  syncPercent: number;
}

export interface TelemetryPoint {
  time: string;
  vibration: number;
  temperature: number;
  coolantFlow: number;
  current: number;
}

export interface Incident {
  id: string;
  title: string;
  asset: string;
  facility: string;
  line: string;
  severity: 'critical' | 'high' | 'warning' | 'nominal';
  timeAgo: string;
  detectedTime: string;
  aiConfidence: number;
  status: 'active' | 'mitigating' | 'autonomous' | 'stabilized' | 'resolved';
  rootCause: string;
  recommendedAction: string;
  vibrationPeak: string;
  temperaturePeak: string;
  coolantFlow: string;
  acousticEmission: string;
  sources: { title: string; type: string; age: string; snippet: string }[];
}

export interface GraphNode {
  id: string;
  title: string;
  label: string;
  type: 'machine' | 'sensor' | 'incident' | 'maintenance' | 'document' | 'personnel' | 'shift_log' | 'scada';
  x: number;
  y: number;
  status?: string;
  val?: string;
  degree: number;
  entropy?: string;
  metadata?: Record<string, string>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  weight?: string;
  isAiInferred: boolean;
  confidence?: number;
}

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: 'running' | 'polling' | 'auditing' | 'standby' | 'active' | 'correlating';
  description: string;
  tasks24h: number;
  precision: string;
  pending: number;
  scopes: string[];
  liveFocus: string;
  executionTime?: string;
  confidence?: string;
}

export interface IoTDevice {
  id: string;
  name: string;
  location: string;
  model: string;
  type: 'mcu' | 'gateway' | 'sensor' | 'transducer';
  status: 'critical' | 'healthy' | 'warning' | 'nominal';
  badge: string;
  protocol: string;
  rssi?: string;
  power?: string;
  lastSeen: string;
  metricLabel: string;
  metricValue: string;
  subMetric: string;
  assetName: string;
  mac: string;
  ip: string;
  firmware: string;
  cpuLoad?: string;
  ram?: string;
  uptime?: string;
}

export interface ConnectorService {
  id: string;
  name: string;
  category: 'mcp' | 'erp' | 'iot' | 'docs' | 'db' | 'repo';
  protocol: string;
  status: 'running' | 'connected' | 'guarded' | 'synced' | 'active' | 'available' | 'idle' | 'streaming';
  description: string;
  metrics: string;
  statLabel: string;
  statValue: string;
  type?: string;
  icon?: string;
  endpoint?: string;
  syncRate?: string;
  recordsIndexed?: number;
  lastSync?: string;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  timeAgo: string;
  actionId: string;
  agentName: string;
  triggerTelemetry: string;
  assetSub: string;
  lineageSources: string[];
  aiConfidence: number;
  tier: string;
  authorizer: string;
  authMethod: string;
  outcome: 'Executed' | 'Throttled 65%' | 'Auto-Derated' | 'Rejected';
  executionTimeMs: number;
  merkleHash: string;
  summary: string;
}
