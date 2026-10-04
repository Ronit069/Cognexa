import {
  PlantLocation,
  Incident,
  GraphNode,
  GraphEdge,
  AgentInfo,
  IoTDevice,
  ConnectorService,
  AuditRecord
} from '../types';

export const PLANTS: PlantLocation[] = [
  {
    id: 'munich-04',
    name: 'Munich Gigafactory 04',
    type: 'Advanced Manufacturing',
    cluster: 'Alpha Cluster: 99.98% Synced',
    syncPercent: 99.98
  },
  {
    id: 'austin-01',
    name: 'Austin Gigafactory 01',
    type: 'Powertrain & Battery Fab',
    cluster: 'Beta Cluster: 99.92% Synced',
    syncPercent: 99.92
  },
  {
    id: 'tokyo-02',
    name: 'Tokyo Precision Fab 02',
    type: 'Robotics & High-Precision Optics',
    cluster: 'Gamma Cluster: 100% Synced',
    syncPercent: 100
  }
];

export const CURRENT_INCIDENT: Incident = {
  id: 'INC-8942',
  title: 'Critical Bearing Race Micro-pitting & Harmonic Spike',
  asset: 'Turbine Assembly #07',
  facility: 'Munich Gigafactory 04',
  line: 'High-Yield Powertrain Line 3',
  severity: 'critical',
  timeAgo: '16m ago',
  detectedTime: '14:22:04 UTC',
  aiConfidence: 96.4,
  status: 'active',
  rootCause: 'Hydrodynamic boundary lubrication breakdown following introduction of off-spec synthetic oil batch #B-409, triggering micro-asperity friction under peak 110% line velocity.',
  recommendedAction: 'Throttle Munich Line 3 to 65% capacity immediately to stabilize thermals below 85°C, auto-generate SAP Work Order #40192 to Sarah Chen (Tech Lead, Shift B), and reserve replacement seal kit from Warehouse Bin #42.',
  vibrationPeak: '4.82 mm/s @ 3.2kHz',
  temperaturePeak: '98.38°C',
  coolantFlow: '14.2 L/min',
  acousticEmission: '88.4 dB',
  sources: [
    {
      title: 'Hydrodynamic Bearing Seal Replacement Manual (v4.2)',
      type: 'Doc #ENG-3392 • Confluence SOP',
      age: 'Updated 12d ago',
      snippet: 'Section 7.3: Thermal runaway exceeding 92°C with high harmonic vibration indicates micro-cavitation in low viscosity grease.'
    },
    {
      title: 'Synthetic Lubricant Viscosity Flag: Batch #B-409',
      type: 'PO #SAP-88192 • SAP S/4HANA',
      age: 'Quality Deviation',
      snippet: 'Munich QC Lab flagged -14% kinematic viscosity delta at 40°C. Batch was inadvertently released to Munich Line 3 reservoir yesterday.'
    },
    {
      title: 'Shift Supervisor Message Thread',
      type: '#mfg-line-ops • Shift Handover',
      age: 'Yesterday 23:40',
      snippet: '"Unusual high-pitched whine heard on Line 3 night shift - dismissed as casing acoustic resonance during ramp."'
    },
    {
      title: 'Turbine 04 Seizure After Low-Viscosity Batch Ingestion',
      type: 'Vector DB Match #INC-2023-11-04',
      age: '98.1% Geometric Match',
      snippet: 'Resulted in 18h unplanned outage in Stuttgart. Corrective seal swap Bin #42 took 34 minutes.'
    }
  ]
};

export const ALL_INCIDENTS: Incident[] = [
  CURRENT_INCIDENT,
  {
    id: 'INC-8939',
    title: 'Extruder #04 Thermal Runaway Gradient',
    asset: 'Extruder #04',
    facility: 'Munich Gigafactory 04',
    line: 'Feed Line 1',
    severity: 'high',
    timeAgo: '1h 12m',
    detectedTime: '13:26:10 UTC',
    aiConfidence: 91.0,
    status: 'mitigating',
    rootCause: 'Cross-referenced with raw resin batch #B-409 viscosity lab certs. Non-homogeneous melt phase causing thermal resistance spike.',
    recommendedAction: 'Apply 15% heater derate on Barrel Zones 3 & 4 and hold incoming raw resin batch for re-homogenization.',
    vibrationPeak: '2.14 mm/s',
    temperaturePeak: '104.2°C',
    coolantFlow: '18.1 L/min',
    acousticEmission: '72.1 dB',
    sources: [
      {
        title: 'Extruder Calibration Bulletin v2',
        type: 'Confluence SOP-204',
        age: '1mo ago',
        snippet: 'High thermal delta indicates polymer melt stall near nozzle plate.'
      }
    ]
  },
  {
    id: 'INC-8935',
    title: 'Chiller Pump B Cavitation & Flow Imbalance',
    asset: 'Chiller Pump B',
    facility: 'Munich Gigafactory 04',
    line: 'Substation C',
    severity: 'high',
    timeAgo: '2h 45m',
    detectedTime: '11:53:18 UTC',
    aiConfidence: 94.2,
    status: 'autonomous',
    rootCause: 'Correlated with OEM maintenance bulletin MB-902 (impeller aeration cavitation). Differential pressure delta 4.2 Bar.',
    recommendedAction: 'Autonomous chemical backflush cycle staged and dynamic bypass valve #B-04 engaged.',
    vibrationPeak: '3.65 mm/s',
    temperaturePeak: '71.5°C',
    coolantFlow: '11.8 L/min',
    acousticEmission: '84.0 dB',
    sources: [
      {
        title: 'OEM Chiller Service Manual MB-902',
        type: 'Technical Manual',
        age: '6mo ago',
        snippet: 'Impeller aeration cavitation requires automatic purge backflush.'
      }
    ]
  },
  {
    id: 'INC-8930',
    title: 'Robotic Arm #12 Motor Phase Current Asymmetry',
    asset: 'Robotic Arm #12',
    facility: 'Munich Gigafactory 04',
    line: 'Stamping Cell',
    severity: 'warning',
    timeAgo: '4h 08m',
    detectedTime: '10:30:00 UTC',
    aiConfidence: 88.5,
    status: 'stabilized',
    rootCause: 'Phase C inverter bus imbalance (+6.8% surge, 3.4A delta). Hall-effect sensor ACS-108 identified inverter gate driver aging.',
    recommendedAction: 'Harmonic load peak-shaved to Phase A & B. Scheduled capacitor swap at next scheduled shift turnaround.',
    vibrationPeak: '1.82 mm/s',
    temperaturePeak: '62.0°C',
    coolantFlow: '24.0 L/min',
    acousticEmission: '65.4 dB',
    sources: [
      {
        title: 'KUKA Robot Joint 3 Motor Spec',
        type: 'Hardware Datasheet',
        age: '1yr ago',
        snippet: 'Phase imbalance beyond 5% warrants inverter gate inspection.'
      }
    ]
  }
];

export const GRAPH_NODES: GraphNode[] = [
  {
    id: 'turbine-07',
    title: 'Turbine Assembly #07',
    label: 'T-07',
    type: 'machine',
    x: 550,
    y: 350,
    status: 'critical',
    val: '98.4°C LIVE',
    degree: 14,
    entropy: '0.08 (Low)',
    metadata: {
      UUID: 'TURB-MNCH-07-L3',
      Model: 'Siemens Simotics T-800',
      Uptime: '99.14% (114d trip-free)',
      Lead: 'Sarah Chen (Eng)',
      Protocol: 'Siemens OPC-UA:4840'
    }
  },
  {
    id: 'sensor-mpu',
    title: 'MPU6050 Tri-Axis Accelerometer',
    label: 'MPU6050',
    type: 'sensor',
    x: 360,
    y: 210,
    status: 'critical',
    val: '4.82 mm/s',
    degree: 4,
    metadata: {
      SensorID: 'SENS-MPU-8921',
      Rate: '120Hz Stream',
      Harmonic: '3.2kHz Peak'
    }
  },
  {
    id: 'sensor-dht',
    title: 'DHT22 Thermal Probe (Line 3)',
    label: 'DHT22',
    type: 'sensor',
    x: 230,
    y: 330,
    status: 'warning',
    val: '79.2°C',
    degree: 3,
    metadata: {
      SensorID: 'SENS-DHT-049',
      Threshold: '85.0°C Safety Ceiling'
    }
  },
  {
    id: 'sensor-acs',
    title: 'ACS712 Current Transducer',
    label: 'ACS712',
    type: 'sensor',
    x: 430,
    y: 520,
    status: 'nominal',
    val: '41.8 A',
    degree: 3,
    metadata: {
      SensorID: 'SENS-ACS-108',
      PF: '0.94 Inductive'
    }
  },
  {
    id: 'sys-plc',
    title: 'Siemens S7-1500 Controller',
    label: 'LINE 3 PLC',
    type: 'scada',
    x: 300,
    y: 470,
    status: 'nominal',
    val: 'Profinet IP',
    degree: 5,
    metadata: {
      Firmware: 'v3.1.2-sec',
      IP: '192.168.1.42'
    }
  },
  {
    id: 'incident-8942',
    title: 'INC-8942 Bearing Race Spalling',
    label: '#INC-8942',
    type: 'incident',
    x: 570,
    y: 160,
    status: 'critical',
    val: 'CRIT ALERT',
    degree: 6,
    metadata: {
      Confidence: '96.4% Deterministic Pass',
      CostAverted: '$210,000'
    }
  },
  {
    id: 'doc-sop',
    title: 'Confluence SOP-441 Lubrication Standard',
    label: 'ENG-3392',
    type: 'document',
    x: 720,
    y: 180,
    status: 'nominal',
    val: 'v4.2 Manual',
    degree: 4,
    metadata: {
      Author: 'Technical Ops Committee',
      Updated: '12d ago'
    }
  },
  {
    id: 'person-sarah',
    title: 'Sarah Chen (Reliability Lead)',
    label: 'Sarah Chen',
    type: 'personnel',
    x: 840,
    y: 280,
    status: 'nominal',
    val: 'Tech Lead B',
    degree: 8,
    metadata: {
      Role: 'VP Operations & Lead Architect',
      Badge: 'eIDAS Level 3 Biometric'
    }
  },
  {
    id: 'chat-handover',
    title: 'Shift 3 Handover Note #882',
    label: 'Shift Log',
    type: 'shift_log',
    x: 880,
    y: 150,
    status: 'warning',
    val: 'Whine Note',
    degree: 3,
    metadata: {
      Channel: '#mfg-line-ops',
      Timestamp: 'Yesterday 23:40'
    }
  },
  {
    id: 'sap-wo',
    title: 'SAP Work Order #40192',
    label: 'SAP #40192',
    type: 'maintenance',
    x: 780,
    y: 480,
    status: 'nominal',
    val: 'Work Order',
    degree: 5,
    metadata: {
      Batch: '#B-409',
      Bin: 'Warehouse Bin #42'
    }
  }
];

export const GRAPH_EDGES: GraphEdge[] = [
  { id: 'e1', source: 'turbine-07', target: 'sys-plc', label: 'controlled_by', isAiInferred: false },
  { id: 'e2', source: 'turbine-07', target: 'sensor-mpu', label: 'vibration_feed', weight: '0.96 (p)', isAiInferred: false },
  { id: 'e3', source: 'turbine-07', target: 'sensor-dht', label: 'thermal_feed', isAiInferred: false },
  { id: 'e4', source: 'turbine-07', target: 'sensor-acs', label: 'current_draw', isAiInferred: false },
  { id: 'e5', source: 'turbine-07', target: 'doc-sop', label: 'governed_by', weight: '0.94 (rel)', isAiInferred: false },
  { id: 'e6', source: 'turbine-07', target: 'person-sarah', label: 'supervised_by', isAiInferred: false },
  { id: 'e7', source: 'turbine-07', target: 'sap-wo', label: 'maintenance_ref', weight: '1.00 (id)', isAiInferred: false },
  { id: 'e8', source: 'incident-8942', target: 'turbine-07', label: 'affects_asset', isAiInferred: false },
  { id: 'e9', source: 'sensor-mpu', target: 'incident-8942', label: 'inferred_cause', confidence: 96.4, isAiInferred: true },
  { id: 'e10', source: 'chat-handover', target: 'incident-8942', label: 'acoustic_whine_corr', confidence: 91.2, isAiInferred: true },
  { id: 'e11', source: 'sap-wo', target: 'incident-8942', label: 'viscosity_hypothesis', confidence: 88.7, isAiInferred: true },
  { id: 'e12', source: 'doc-sop', target: 'person-sarah', label: 'derate_protocol', confidence: 98.0, isAiInferred: true }
];

export const AGENTS: AgentInfo[] = [
  {
    id: 'agent-atlas',
    name: 'Agent Atlas',
    role: 'Predictive Asset Maintenance',
    status: 'running',
    description: 'Supervises predictive component life cycles, schedules mechanical work orders, and correlates vibration anomalies across 412 rotating machinery units.',
    tasks24h: 412,
    precision: '99.4%',
    pending: 12,
    scopes: ['Read: SCADA/SAP', 'Write: ERP W/O', 'Derate ≤15%'],
    liveFocus: 'Bearing lubrication viscosity analysis: Turbine-07',
    executionTime: '120ms',
    confidence: '98.4%'
  },
  {
    id: 'agent-argus',
    name: 'Agent Argus',
    role: 'Edge Telemetry Sentinel',
    status: 'polling',
    description: 'Perpetual high-frequency spectral monitoring across thousands of vibrational, thermal, and electrical telemetry nodes with 100Hz real-time FFT.',
    tasks24h: 14820,
    precision: '99.9%',
    pending: 28,
    scopes: ['Read: MQTT/OPC-UA', 'Emit: Incidents', 'Edge Snapshots'],
    liveFocus: 'FFT Harmonic tracking: Powertrain Line 3',
    executionTime: '14ms',
    confidence: '99.1%'
  },
  {
    id: 'agent-veritas',
    name: 'Agent Veritas',
    role: 'ISO 9001 / Governance & Ledger',
    status: 'auditing',
    description: 'Cryptographic ledger attestor enforcing zero-trust compliance, safety interlocks, and continuous ISO/OSHA regulatory certifications.',
    tasks24h: 1840,
    precision: '100%',
    pending: 0,
    scopes: ['Read: Audit Trails', 'Sign: HSM Blocks', 'Veto Override'],
    liveFocus: 'Verifying eIDAS provenance for Turbine #07 derate',
    executionTime: '22ms',
    confidence: '100%'
  },
  {
    id: 'agent-scribe',
    name: 'Agent Scribe',
    role: 'Neural Synthesis & Reporting',
    status: 'standby',
    description: 'Auto-synthesizes incident RCA briefs, shift handover dossiers, and generates Confluence/Jira documentation packages with mathematical provenance.',
    tasks24h: 48,
    precision: '98.7%',
    pending: 3,
    scopes: ['Read: Confluence/Jira', 'Draft: RCA Dossiers', 'Gen: Shift Brief'],
    liveFocus: 'Line 3 thermal anomaly summary for Shift B handover',
    executionTime: '42m next',
    confidence: '98.7%'
  }
];

export const IOT_DEVICES: IoTDevice[] = [
  {
    id: 'esp32-704a',
    name: 'ESP32-NODE-704A',
    location: 'Turbine-07 Z-Axis',
    model: 'ESP32-S3 Dual-Core (240MHz)',
    type: 'mcu',
    status: 'critical',
    badge: 'CRITICAL SPIKE',
    protocol: 'MQTT / TLS 1.3',
    rssi: '-54 dBm (4 bars)',
    power: '24V Hardwired',
    lastSeen: '300ms ago',
    metricLabel: 'MPU6050 Vibration',
    metricValue: '4.82 mm/s @ 3.2kHz',
    subMetric: 'Threshold: 2.20 mm/s (+119% over baseline)',
    assetName: 'Turbine Assembly #07 (Line 3)',
    mac: '08:3A:8D:19:FC:70',
    ip: '10.14.82.114',
    firmware: 'v3.2.4-prod',
    cpuLoad: '44.2°C Die Temp'
  },
  {
    id: 'rpi4-gw-02',
    name: 'RPi4-GW-MNCH-02',
    location: 'Line 3 Master Gateway',
    model: 'CM4 Quad 1.5GHz (ARM64)',
    type: 'gateway',
    status: 'healthy',
    badge: 'HEALTHY',
    protocol: 'OPC-UA / MQTT Broker',
    rssi: 'Gigabit Eth',
    power: 'PoE 48V',
    lastSeen: '12ms ago',
    metricLabel: 'Gateway CPU Core Load',
    metricValue: '24.2% (Normal)',
    subMetric: '142 Connected Subnodes • 1.4k msg/s',
    assetName: 'Cell Distribution Rack 03',
    mac: 'DC:A6:32:41:9B:21',
    ip: '10.14.0.12',
    firmware: 'v4.1.9-rt-kernel',
    cpuLoad: '24.2%',
    ram: '3.1GB / 4.0GB',
    uptime: '142d 18h'
  },
  {
    id: 'sens-dht-049',
    name: 'SENS-DHT-049',
    location: 'Extrusion Chamber #04',
    model: 'PT100 RTD High-Heat',
    type: 'sensor',
    status: 'warning',
    badge: 'HIGH TEMP',
    protocol: 'Modbus RS485',
    rssi: 'RS485 Bus OK',
    power: '12V DC Loop',
    lastSeen: '1.2s ago',
    metricLabel: 'Chamber Core Temperature',
    metricValue: '92.4°C / 42.1% RH',
    subMetric: 'Safe Threshold: <88.0°C (Ceiling reached)',
    assetName: 'Die Cast Heating Block B',
    mac: '00:1E:C0:92:44:09',
    ip: '10.14.82.204',
    firmware: 'v2.1.0-modbus'
  },
  {
    id: 'sens-acs-108',
    name: 'SENS-ACS-108',
    location: 'Inverter Bus Substation C',
    model: 'ACS712 Hall Sensor',
    type: 'transducer',
    status: 'nominal',
    badge: 'NOMINAL',
    protocol: 'REST / HTTPS',
    rssi: '-62 dBm',
    power: 'LiFePO4 94%',
    lastSeen: '800ms ago',
    metricLabel: 'Phase C RMS Current',
    metricValue: '28.4 A (Base 24.0A)',
    subMetric: 'Phase Balance: 91.2% • PF 0.94',
    assetName: 'Main Motor Feeder Line 3',
    mac: 'A4:CF:12:88:51:7E',
    ip: '10.14.82.119',
    firmware: 'v1.8.4'
  }
];

export const CONNECTORS: ConnectorService[] = [
  {
    id: 'mcp-local',
    name: 'Cognexa Local MCP',
    category: 'mcp',
    protocol: 'Stdio / SSE (Port 4040)',
    status: 'running',
    description: '34 tool contracts exposed to agent swarms. Includes runtime memory injection and vector lookup primitives.',
    metrics: '148,290 executions',
    statLabel: 'Tool Executions (24h)',
    statValue: '148,290'
  },
  {
    id: 'mcp-floor',
    name: 'Factory Floor MCP',
    category: 'mcp',
    protocol: 'SCADA / PLC Interlocks',
    status: 'guarded',
    description: 'Actuator write-back with automated Human-In-The-Loop safety gates and hardware cryptographic checks.',
    metrics: '0 violations',
    statLabel: 'Safety Interlocks',
    statValue: 'Zero Violations'
  },
  {
    id: 'mcp-linear',
    name: 'Linear / Jira Toolset',
    category: 'mcp',
    protocol: 'Issue Resolution Webhook',
    status: 'synced',
    description: 'Real-time incident ticket mutation, sprint blocker auto-classification, and cross-team contextual stitching.',
    metrics: '4,280 tickets',
    statLabel: 'Daily Mutations',
    statValue: '4,280 Tickets'
  },
  {
    id: 'erp-sap',
    name: 'SAP S/4HANA',
    category: 'erp',
    protocol: 'NetWeaver RFC / OData',
    status: 'connected',
    description: '4.2M materials, bills of materials (BOM), maintenance plant notifications, and open work orders.',
    metrics: 'Synced 6m ago',
    statLabel: 'Node Integrity',
    statValue: '100% Deterministic'
  },
  {
    id: 'erp-siemens',
    name: 'Siemens Teamcenter',
    category: 'erp',
    protocol: 'PLM XML / SOA',
    status: 'connected',
    description: '320,000 CAD assemblies, engineering change notices (ECN), and digital twin metadata specs.',
    metrics: 'Synced 22m ago',
    statLabel: 'Graph Extraction',
    statValue: 'Vectorized 3D AST'
  },
  {
    id: 'erp-salesforce',
    name: 'Salesforce CRM',
    category: 'erp',
    protocol: 'REST Streaming API',
    status: 'available',
    description: 'Warranty contracts, customer SLA status, field service engineering dispatches, and historical returns.',
    metrics: 'Not ingested',
    statLabel: 'Auth Scheme',
    statValue: 'OAuth2.0 / JWT'
  },
  {
    id: 'iot-mqtt',
    name: 'MQTT Broker (HiveMQ)',
    category: 'iot',
    protocol: 'TLS 8883 (100Hz)',
    status: 'running',
    description: 'High-frequency telemetry ingest queue with zero dropped packet parity buffer.',
    metrics: '12,482 nodes',
    statLabel: 'Active Devices',
    statValue: '12,482 Nodes'
  },
  {
    id: 'cloud-gdrive',
    name: 'Google Drive',
    category: 'docs',
    protocol: 'OAuth2 Verified',
    status: 'active',
    description: 'Technical CAD exports, spreadsheets, and shift handover reports indexed into RAG embeddings.',
    metrics: '1,248,900 docs',
    statLabel: 'Docs Indexed',
    statValue: '1,248,900'
  },
  {
    id: 'cloud-confluence',
    name: 'Confluence Cloud',
    category: 'docs',
    protocol: 'Atlassian Cloud API',
    status: 'synced',
    description: 'Standard Operating Procedures (SOPs), maintenance manuals, and equipment troubleshooting guides.',
    metrics: '82,400 SOPs',
    statLabel: 'SOPs & Runbooks',
    statValue: '82,400'
  },
  {
    id: 'db-postgres',
    name: 'PostgreSQL + TimescaleDB',
    category: 'db',
    protocol: 'Read Replica Pool',
    status: 'active',
    description: 'High-rate telemetry timeseries and historical sensor log warehouse.',
    metrics: '18.4M records',
    statLabel: 'Timeseries Records',
    statValue: '18.4M'
  },
  {
    id: 'repo-github',
    name: 'GitHub Enterprise',
    category: 'repo',
    protocol: 'GitHub App / Webhooks',
    status: 'connected',
    description: '1,420 repos spanning PLC ladder logic, microservice backends, and firmware binaries.',
    metrics: '1,420 repos',
    statLabel: 'Tracked Repositories',
    statValue: '1,420'
  }
];

export const AUDIT_RECORDS: AuditRecord[] = [
  {
    id: 'aud-01',
    timestamp: '14:28:12.409',
    timeAgo: '3m ago',
    actionId: 'DEC-8942-01',
    agentName: 'Agent Atlas',
    triggerTelemetry: 'Vibration > 4.82 mm/s',
    assetSub: 'Turbine #07 • 3.2kHz Harm.',
    lineageSources: ['SCADA', 'SAP S/4', 'SOP-441'],
    aiConfidence: 96.4,
    tier: 'L3',
    authorizer: 'Dr. Sarah Chen',
    authMethod: 'HSM Biometric',
    outcome: 'Executed',
    executionTimeMs: 398,
    merkleHash: '0x9b8f...312c',
    summary: 'Autonomous derate of Turbine 07 motor to 65% capacity and SAP Work Order #40192 dispatch after detecting 3.2kHz vibration spalling correlated with Batch #B-409.'
  },
  {
    id: 'aud-02',
    timestamp: '14:26:01.118',
    timeAgo: '5m ago',
    actionId: 'DEC-8939-04',
    agentName: 'Agent Argus',
    triggerTelemetry: 'Thermal Grad > 18°C/m',
    assetSub: 'Cooling Loop B-02',
    lineageSources: ['Modbus', 'Timescale'],
    aiConfidence: 91.0,
    tier: 'L2',
    authorizer: 'Auto-Guardrail',
    authMethod: 'POL-8842-ISO',
    outcome: 'Throttled 65%',
    executionTimeMs: 240,
    merkleHash: '0x81b7...d480',
    summary: 'Extruder thermal rate limit exceeded. Automatically stepped back feeder heater by 15% to avoid nozzle crystalization.'
  },
  {
    id: 'aud-03',
    timestamp: '14:19:44.892',
    timeAgo: '12m ago',
    actionId: 'DEC-8935-02',
    agentName: 'Agent Veritas',
    triggerTelemetry: 'Modbus Timeout (850ms)',
    assetSub: 'Inverter Rack #12',
    lineageSources: ['Syslog', 'Jira-402'],
    aiConfidence: 94.2,
    tier: 'L2',
    authorizer: 'Marco Valenti',
    authMethod: 'Field Tech Lead',
    outcome: 'Executed',
    executionTimeMs: 180,
    merkleHash: '0x3ef9...221b',
    summary: 'Restaged secondary redundant CAN bus transceiver following intermittent ACK drop.'
  },
  {
    id: 'aud-04',
    timestamp: '14:11:05.301',
    timeAgo: '20m ago',
    actionId: 'DEC-8928-11',
    agentName: 'Agent Scribe',
    triggerTelemetry: 'Toolpath Feed Deviation',
    assetSub: 'CNC Gantry 04',
    lineageSources: ['OPC UA', 'CAM Repo'],
    aiConfidence: 88.5,
    tier: 'L1',
    authorizer: 'Auto-Derated',
    authMethod: 'CNC SafeMode',
    outcome: 'Auto-Derated',
    executionTimeMs: 310,
    merkleHash: '0x992a...f411',
    summary: 'Micro-stepping deviation detected on Y-axis ballscrew. Feed rate halved until end of block.'
  },
  {
    id: 'aud-05',
    timestamp: '13:54:19.044',
    timeAgo: '37m ago',
    actionId: 'DEC-8919-09',
    agentName: 'Agent Atlas',
    triggerTelemetry: 'Aux Hydr Pressure Delta',
    assetSub: 'Press Line 01',
    lineageSources: ['SCADA', 'SAP S/4'],
    aiConfidence: 78.2,
    tier: 'Low',
    authorizer: 'Klaus M. (Rejected)',
    authMethod: 'Manual Calibration',
    outcome: 'Rejected',
    executionTimeMs: 420,
    merkleHash: '0x44c1...aa89',
    summary: 'Low-confidence proposal to adjust relief valve rejected by quality lead Klaus M. in favor of manual test gauge reading.'
  },
  {
    id: 'aud-06',
    timestamp: '13:42:30.612',
    timeAgo: '49m ago',
    actionId: 'DEC-8902-15',
    agentName: 'Agent Argus',
    triggerTelemetry: 'Conveyor Speed Jitter',
    assetSub: 'Packaging Cell 04',
    lineageSources: ['Modbus', 'WMS Hub'],
    aiConfidence: 95.1,
    tier: 'L3',
    authorizer: 'Autonomous',
    authMethod: 'Policy #AUT-201',
    outcome: 'Executed',
    executionTimeMs: 145,
    merkleHash: '0x1102...89ee',
    summary: 'Encoder phase alignment optimized dynamically, restoring 0.5m/s line cadence without package collisions.'
  }
];

export const ONBOARDING_TEMPLATES = [
  {
    id: 'manufacturing',
    title: 'Manufacturing & Industrial',
    version: 'v4.8 • Deterministic Causal Core',
    icon: 'precision_manufacturing',
    isDefault: true,
    description: 'High-throughput industrial framework tuned for real-time predictive maintenance, SCADA integration, sub-millisecond vibration FFT spectral analysis, ERP bill-of-materials traversal, and automated ISO-9001 compliance attestations.',
    nodesCount: '142,800+',
    latency: '<10ms',
    agentsCount: '12 Agents',
    standards: ['ISO 10816', 'OPC-UA v1.05', 'Modbus TCP']
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Life Sciences',
    version: 'HIPAA / eIDAS Ready',
    icon: 'medical_services',
    isDefault: false,
    description: 'Biometric ICU multi-stream telemetry, DICOM spatial PACS parsing, HL7/FHIR pipelines, clinical workflow trace, and GxP regulatory audit trails.',
    nodesCount: '88,000+',
    latency: '<25ms',
    agentsCount: '8 Agents',
    standards: ['HL7 FHIR', 'DICOM v3', 'GxP Annex 11']
  },
  {
    id: 'logistics',
    title: 'Logistics & Supply Chain',
    version: 'GS1 Compliant',
    icon: 'local_shipping',
    isDefault: false,
    description: 'Autonomous fleet telematics, dynamic multi-modal route optimization, cold chain sensor monitoring, and warehouse robotics swarm coordination.',
    nodesCount: '112,000+',
    latency: '<50ms',
    agentsCount: '9 Agents',
    standards: ['GS1 EPCIS', 'MQTT-SN', 'WMS EDI']
  },
  {
    id: 'agritech',
    title: 'Agriculture & AgriTech',
    version: 'ISOBUS / AgGateway',
    icon: 'psychiatry',
    isDefault: false,
    description: 'Multispectral satellite index analysis, sub-surface soil moisture array mesh, drone spray mapping, and localized microclimate crop yield models.',
    nodesCount: '45,000+',
    latency: '<200ms',
    agentsCount: '6 Agents',
    standards: ['ISOBUS 11783', 'LoRaWAN', 'AgGateway']
  },
  {
    id: 'fintech',
    title: 'Finance & FinTech',
    version: 'SOC2 / ISO-27001',
    icon: 'account_balance',
    isDefault: false,
    description: 'Microsecond transaction graph synthesis, automated AML / sanctions correlation, real-time risk attestation, and regulatory reporting agents.',
    nodesCount: '94,000+',
    latency: '<2ms',
    agentsCount: '14 Agents',
    standards: ['FIX 5.0', 'ISO 20022', 'PCI-DSS']
  },
  {
    id: 'smartcampus',
    title: 'Education & Smart Campus',
    version: 'BACnet / KNX',
    icon: 'domain',
    isDefault: false,
    description: 'Occupancy-driven HVAC thermal optimization, multi-zone microgrid power balancing, and dynamic safety ingress and egress flow controls.',
    nodesCount: '36,000+',
    latency: '<100ms',
    agentsCount: '5 Agents',
    standards: ['BACnet IP', 'KNX TP', 'OpenADR']
  },
  {
    id: 'defense',
    title: 'Government & Defense Aerospace',
    version: 'Air-Gapped Ready',
    icon: 'shield',
    isDefault: false,
    description: 'MIL-STD-810H environmental qualification models, ASIL-D protocols, post-quantum zero-trust envelope verification.',
    nodesCount: '210,000+',
    latency: '<1ms',
    agentsCount: '16 Agents',
    standards: ['MIL-STD-810H', 'DO-178C', 'NIST SP 800-53']
  }
];
