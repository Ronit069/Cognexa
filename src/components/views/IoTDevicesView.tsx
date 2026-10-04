import React, { useState } from 'react';
import { IOT_DEVICES } from '../../data/mockData';
import { IoTDevice } from '../../types';

export const IoTDevicesView: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<IoTDevice>(IOT_DEVICES[0]);
  const [activeTab, setActiveTab] = useState<'all' | 'online' | 'warning' | 'critical' | 'provisioning'>('all');
  const [streaming, setStreaming] = useState(true);
  const [wizardOpen, setWizardOpen] = useState(true);
  const [wizardStep, setWizardStep] = useState(2);
  const [selectedBleDevice, setSelectedBleDevice] = useState('ESP32-NEW-880B');
  const [targetSsid, setTargetSsid] = useState('Munich-Ind-IoT-Mesh-04');
  const [mqttBroker, setMqttBroker] = useState('tls://broker.edge.mnch04.internal:8883');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const filteredDevices = IOT_DEVICES.filter((d) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'critical') return d.status === 'critical';
    if (activeTab === 'warning') return d.status === 'warning';
    if (activeTab === 'online') return d.status === 'healthy' || d.status === 'nominal';
    return true;
  });

  return (
    <div className="p-gutter-lg flex flex-col gap-space-lg w-full max-w-[1720px] mx-auto select-none relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2 rounded-lg bg-secondary-container text-on-secondary-container font-label-sm text-label-sm shadow-xl flex items-center gap-2 border border-secondary">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* PAGE HEADER & ACTION CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-sm">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm border border-secondary/20 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"></span>
              CLUSTER TELEMETRY SYNCED
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
              Cluster: MNCH-04-IOT
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
            IoT Edge &amp; Sensor Fleet Management
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            12,482 connected micro-controllers, industrial gateways, and multi-modal edge sensors across Munich Gigafactory 04
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            onClick={() => showToast('Diagnostics: All 342 edge gateways responding within 18ms SLA.')}
            className="flex items-center gap-1.5 px-space-md py-2 rounded bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all border border-surface-container-high/40"
          >
            <span className="material-symbols-outlined text-secondary text-base">sensors</span>
            <span>Gateway Diagnostics</span>
          </button>
          <button
            onClick={() => showToast('Fleet OTA Staged: 14 pending nodes awaiting quiet shift window.')}
            className="flex items-center gap-1.5 px-space-md py-2 rounded bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all border border-surface-container-high/40"
          >
            <span className="material-symbols-outlined text-tertiary text-base">system_update_alt</span>
            <span>Fleet Bulk OTA Update</span>
            <span className="font-label-sm text-label-sm bg-surface-container-highest px-1.5 py-0.2 rounded text-secondary font-mono">
              14 Pending
            </span>
          </button>
          <button
            onClick={() => setWizardOpen(true)}
            className="flex items-center gap-1.5 px-space-lg py-2 rounded bg-primary text-on-primary hover:bg-primary-fixed-dim font-label-md text-label-md font-semibold shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Add Device</span>
          </button>
        </div>
      </div>

      {/* SUMMARY METRIC CHIPS / FLEET COUNTERS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-space-sm">
        {/* Node Chip 1: ESP32 */}
        <div className="rounded bg-surface-container-low p-space-md shadow-md flex flex-col justify-between gap-space-xs group hover:bg-surface-container transition-all border border-surface-container-high/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-secondary">memory</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">ESP32 Sensor Nodes</span>
            </div>
            <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-secondary font-mono">
              WiFi / BLE
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface font-mono">8,940</span>
            <span className="font-label-sm text-label-sm text-secondary font-mono">Active</span>
            <span className="font-label-sm text-label-sm text-error ml-auto font-mono">14 Offline</span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span>Sync Ratio</span>
            <span className="font-mono text-on-surface">99.8%</span>
          </div>
        </div>

        {/* Node Chip 2: RPi Gateways */}
        <div className="rounded bg-surface-container-low p-space-md shadow-md flex flex-col justify-between gap-space-xs group hover:bg-surface-container transition-all border border-surface-container-high/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-primary">router</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">RPi4 / CM4 Gateways</span>
            </div>
            <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-mono">
              Eth + LTE
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface font-mono">342</span>
            <span className="font-label-sm text-label-sm text-secondary font-mono">100% Online</span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span>Avg Edge CPU</span>
            <span className="font-mono text-on-surface">28% (Stable)</span>
          </div>
        </div>

        {/* Node Chip 3: Vibration (MPU6050) */}
        <div className="rounded bg-surface-container-low p-space-md shadow-md flex flex-col justify-between gap-space-xs group hover:bg-surface-container transition-all border border-surface-container-high/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-error">vibration</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">Vibration (MPU6050)</span>
            </div>
            <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-error/10 text-error font-mono">
              3 Alerts
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface font-mono">1,840</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Sensors</span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span>Telemetry Ingest</span>
            <span className="font-mono text-on-surface">100Hz Ingest</span>
          </div>
        </div>

        {/* Node Chip 4: Temp & Humidity */}
        <div className="rounded bg-surface-container-low p-space-md shadow-md flex flex-col justify-between gap-space-xs group hover:bg-surface-container transition-all border border-surface-container-high/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-tertiary">thermostat</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">Temp / RH (PT100)</span>
            </div>
            <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-tertiary font-mono">
              1 Warning
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface font-mono">5,420</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Probes</span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span>Polling Window</span>
            <span className="font-mono text-on-surface">10s Poll</span>
          </div>
        </div>

        {/* Node Chip 5: Current & Power */}
        <div className="rounded bg-surface-container-low p-space-md shadow-md flex flex-col justify-between gap-space-xs group hover:bg-surface-container transition-all border border-surface-container-high/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-secondary">bolt</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">Current (ACS712)</span>
            </div>
            <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-secondary font-mono">
              1kHz
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface font-mono">4,222</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">CT Probes</span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span>Phase Balance</span>
            <span className="font-mono text-secondary">99.1% (Nominal)</span>
          </div>
        </div>
      </div>

      {/* CONTROLS, FILTER & VIEW TOGGLE BAR */}
      <div className="p-space-sm rounded bg-surface-container-low flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-md border border-surface-container-high/40">
        <div className="flex flex-1 flex-col md:flex-row items-stretch md:items-center gap-space-md">
          <div className="relative flex items-center min-w-[320px]">
            <span className="material-symbols-outlined absolute left-3 text-outline text-base">search</span>
            <input
              className="w-full h-10 pl-9 pr-10 rounded bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner border border-surface-container-high/30"
              placeholder="Search devices by name, MAC, IP, asset, or firmware..."
              type="text"
            />
            <span className="absolute right-3 font-label-sm text-label-sm text-outline bg-surface-container-high px-1.5 py-0.5 rounded font-mono">
              /
            </span>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 p-0.5 rounded bg-surface-container-lowest overflow-x-auto border border-surface-container-high/30">
            {[
              { id: 'all', label: 'All', count: '12,482' },
              { id: 'online', label: 'Online', count: '12,420' },
              { id: 'warning', label: 'Warning', count: '48', color: 'text-tertiary' },
              { id: 'critical', label: 'Critical', count: '14', color: 'text-error' },
              { id: 'provisioning', label: 'Provisioning', count: '3' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-space-md py-1.5 rounded font-label-md text-label-md transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                    : `${tab.color || 'text-on-surface-variant'} hover:text-on-surface`
                }`}
              >
                {tab.label} <span className="font-mono opacity-70 text-xs">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Protocols, Asset Group & View Switcher */}
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="hidden sm:flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container-highest text-secondary font-mono border border-secondary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              MQTT 100Hz
            </span>
            <span className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high cursor-pointer font-mono">REST</span>
            <span className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high cursor-pointer font-mono">OPC-UA</span>
            <span className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high cursor-pointer font-mono">Modbus TCP</span>
            <span className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high cursor-pointer font-mono">BLE</span>
          </div>

          <div className="h-5 w-px bg-surface-container-highest hidden sm:block"></div>

          <div className="flex items-center bg-surface-container-lowest p-0.5 rounded border border-surface-container-high/40">
            <button className="p-1.5 rounded bg-surface-container-high text-secondary" title="Grid View">
              <span className="material-symbols-outlined text-base">grid_view</span>
            </button>
            <button className="p-1.5 rounded text-outline hover:text-on-surface" title="Table View">
              <span className="material-symbols-outlined text-base">table_rows</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SPLIT LAYOUT (Master Explorer + Detail Drawer) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        {/* LEFT AREA: SENSOR FLEET GRID (7 cols) */}
        <div className="xl:col-span-7 flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Active Sensor Fleet ({filteredDevices.length} Primary Nodes)
            </span>
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
              <span>Sort by:</span>
              <span className="text-secondary font-mono cursor-pointer hover:underline">Anomaly Severity ↓</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {filteredDevices.map((dev) => {
              const isSelected = selectedDevice.id === dev.id;
              return (
                <div
                  key={dev.id}
                  onClick={() => setSelectedDevice(dev)}
                  className={`relative rounded-lg p-space-lg shadow-md flex flex-col justify-between gap-space-md cursor-pointer group transition-all transform hover:-translate-y-0.5 border ${
                    isSelected
                      ? 'bg-surface-container-high ring-1 ring-secondary/50 border-secondary/40 shadow-xl'
                      : 'bg-surface-container-low hover:bg-surface-container border-surface-container-high/40'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-px left-6 right-6 h-0.5 bg-gradient-to-r from-secondary via-primary to-error"></div>
                  )}

                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          {dev.status === 'critical' ? (
                            <>
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error"></span>
                            </>
                          ) : (
                            <span
                              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                                dev.status === 'warning' ? 'bg-tertiary' : 'bg-secondary'
                              }`}
                            ></span>
                          )}
                        </span>
                        <div>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight group-hover:text-secondary transition-colors">
                            {dev.name}
                          </h3>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">{dev.location}</span>
                        </div>
                      </div>
                      <span
                        className={`font-label-sm text-label-sm px-2 py-0.5 rounded font-bold font-mono ${
                          dev.status === 'critical'
                            ? 'bg-error-container text-on-error-container'
                            : dev.status === 'warning'
                            ? 'bg-tertiary-container/30 text-tertiary'
                            : 'bg-secondary-container/20 text-secondary'
                        }`}
                      >
                        {dev.badge}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-1 font-label-sm text-label-sm">
                      <span className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-primary font-mono">
                        {dev.model}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-secondary font-mono">
                        {dev.protocol}
                      </span>
                    </div>
                  </div>

                  {/* Hardware Vitals Bar */}
                  <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded bg-surface-container-lowest/80 font-label-sm text-label-sm border border-surface-container-high/30">
                    <div className="flex flex-col">
                      <span className="text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-secondary">wifi</span> Link
                      </span>
                      <span className="font-mono text-on-surface">{dev.rssi || 'OK'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-secondary">power</span> Power
                      </span>
                      <span className="font-mono text-on-surface">{dev.power || '24V'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-primary">schedule</span> Last
                      </span>
                      <span className="font-mono text-secondary">{dev.lastSeen}</span>
                    </div>
                  </div>

                  {/* Metric Readout & Chart */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-label-sm text-label-sm">
                      <span className="text-on-surface-variant flex items-center gap-1">
                        <span
                          className={`material-symbols-outlined text-xs ${
                            dev.status === 'critical' ? 'text-error' : 'text-secondary'
                          }`}
                        >
                          {dev.status === 'critical' ? 'warning' : 'insights'}
                        </span>{' '}
                        {dev.metricLabel}
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          dev.status === 'critical' ? 'text-error' : 'text-secondary'
                        }`}
                      >
                        {dev.metricValue}
                      </span>
                    </div>
                    <div className="h-14 w-full bg-surface-container-lowest rounded p-1.5 flex items-center border border-surface-container-high/30">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 40">
                        {dev.status === 'critical' ? (
                          <>
                            <path
                              d="M 0,26 Q 25,24 50,25 T 90,26 L 115,28 L 130,22 L 145,35 L 160,5 L 175,38 L 190,4 L 200,28"
                              fill="none"
                              stroke="#ffb4ab"
                              strokeWidth="2"
                            ></path>
                            <circle className="fill-error animate-ping" cx="190" cy="4" r="3"></circle>
                            <circle cx="190" cy="4" fill="#ffb4ab" r="2.5"></circle>
                          </>
                        ) : dev.status === 'warning' ? (
                          <path
                            d="M 0,32 Q 40,30 80,27 T 140,20 L 180,14 L 200,10"
                            fill="none"
                            stroke="#ddb7ff"
                            strokeWidth="2"
                          ></path>
                        ) : (
                          <path
                            d="M 0,20 Q 25,5 50,20 T 100,20 T 150,20 T 200,20"
                            fill="none"
                            stroke="#5de6ff"
                            strokeWidth="1.6"
                          ></path>
                        )}
                      </svg>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant font-mono">
                      <span>{dev.subMetric}</span>
                    </div>
                  </div>

                  {/* Footer Asset Tag */}
                  <div className="flex items-center justify-between pt-2 border-t border-surface-container-highest">
                    <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm truncate">
                      <span className="material-symbols-outlined text-xs text-outline">precision_manufacturing</span>
                      <span className="truncate">{dev.assetName}</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      Inspect →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Factory Floor Context Banner */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md border border-surface-container-high/40">
            <div className="flex items-center gap-space-md">
              <img
                className="w-16 h-12 rounded-lg object-cover shadow-sm shrink-0"
                alt="High precision industrial cleanroom automated factory floor"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzWogTx64LEDR1B2JHz0KmwF7OYUz1Pbt7dMDQabQHiWzrCaxf42G-pOobTdTvnLfrkpUejrRCt1b7iDpIcNAbd6nrqm1BkGuCZwXAFbt8kkIe_BT7N_QW2F8iAu7pQlOmJ64siGXMy5sd2WmVCNJJ0su0viNdGtFesmxhdBVeu0uQZgpQA64SKAClMx35aHkqdng7TrwLF19kY0ILDcd0HujtAvinJ2KzUcpknn36mrTU9jllvpdZ"
              />
              <div>
                <div className="font-label-lg text-label-lg font-bold text-on-surface">Physical Rig: Sector Gantry 04-Nord</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">Assigned Gateway: RPi4-GW-MNCH-02 with dual-redundant LoRaWAN + CAN-bus backhaul</div>
              </div>
            </div>
            <button
              onClick={() => showToast('Streaming 3D Twin for Sector Gantry 04-Nord')}
              className="px-space-md py-1.5 bg-surface-container text-primary hover:bg-surface-container-high transition-colors rounded font-label-md text-label-md font-semibold shrink-0 cursor-pointer shadow-sm"
              type="button"
            >
              Inspect Rack 3D Twin
            </button>
          </div>

          {/* Mesh Diagnostics Strip */}
          <div className="rounded bg-surface-container-low p-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm border border-surface-container-high/40">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-base">alt_route</span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Active Mesh Connectivity Routing: BLE 5.3 + 6LoWPAN
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Auto-rebalancing every 15 min. Zero packet loss recorded in last 4 hours.
                </span>
              </div>
            </div>
            <button 
              onClick={() => showToast('Opening 148-node 6LoWPAN physical mesh topology')}
              className="px-space-md py-1.5 rounded bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm font-mono whitespace-nowrap border border-surface-container-high/40 cursor-pointer"
            >
              View Mesh Map (148 Links)
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: EXPANDED SELECTED DEVICE INSPECTOR (5 cols) */}
        <div className="xl:col-span-5 rounded-lg bg-surface-container-low p-space-lg shadow-2xl flex flex-col gap-space-lg border border-surface-container-high/40">
          {/* Detail Header */}
          <div className="flex flex-col gap-space-sm pb-space-md border-b border-surface-container-highest">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    {selectedDevice.name}
                  </h2>
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold font-mono ${
                      selectedDevice.status === 'critical'
                        ? 'bg-error-container text-on-error-container'
                        : selectedDevice.status === 'warning'
                        ? 'bg-tertiary-container/30 text-tertiary'
                        : 'bg-secondary-container/20 text-secondary'
                    }`}
                  >
                    {selectedDevice.status.toUpperCase()}
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {selectedDevice.model} • High-Frequency Probe
                </span>
              </div>

              {/* Quick Device Operations */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => showToast(`Ping returned in 8ms for ${selectedDevice.name}`)}
                  className="p-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface border border-surface-container-highest"
                  title="Send Ping"
                >
                  <span className="material-symbols-outlined text-sm">network_ping</span>
                </button>
                <button
                  onClick={() => showToast(`Zero-calibration complete on ${selectedDevice.name}`)}
                  className="p-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface border border-surface-container-highest"
                  title="Zero-Calibrate"
                >
                  <span className="material-symbols-outlined text-sm">square_foot</span>
                </button>
                <button
                  onClick={() => showToast(`Reboot signal transmitted to ${selectedDevice.name}`)}
                  className="p-1.5 rounded bg-surface-container hover:bg-surface-container-high text-error border border-surface-container-highest"
                  title="Reboot Node"
                >
                  <span className="material-symbols-outlined text-sm">restart_alt</span>
                </button>
              </div>
            </div>

            {/* Network Identifiers & Firmware Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 rounded bg-surface-container-lowest font-label-sm text-label-sm font-mono border border-surface-container-high/30">
              <div>
                <span className="text-outline block text-[10px]">MAC ADDRESS</span>
                <span className="text-on-surface">{selectedDevice.mac}</span>
              </div>
              <div>
                <span className="text-outline block text-[10px]">IP LEASE</span>
                <span className="text-secondary">{selectedDevice.ip}</span>
              </div>
              <div>
                <span className="text-outline block text-[10px]">FIRMWARE</span>
                <span className="text-tertiary">{selectedDevice.firmware}</span>
              </div>
            </div>
          </div>

          {/* AI BASELINE VS ACTUAL BEHAVIOR (DUAL CURVE) */}
          <div className="flex flex-col gap-space-sm p-space-md rounded bg-surface-container border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-tertiary text-base">auto_awesome</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  AI Baseline vs. Actual Behavior
                </span>
              </div>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-mono">
                96.4% AI CONF
              </span>
            </div>

            {/* Divergence Callout Banner */}
            <div className="p-2.5 rounded bg-error-container/20 text-on-error-container flex items-start gap-2 border border-error-container/40">
              <span className="material-symbols-outlined text-error text-base mt-0.5">report</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm font-bold text-error">
                  Anomaly Divergence: +37.8% above baseline 3-sigma envelope
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Cognexa Neural Diagnostics predicts: <strong>Hydrodynamic Bearing Race Micro-pitting</strong> in {selectedDevice.assetName} within 72 operating hours.
                </span>
              </div>
            </div>

            {/* SVG Dual-Curve Graph */}
            <div className="h-44 w-full bg-surface-container-lowest rounded p-2 relative flex flex-col justify-end border border-surface-container-high/40">
              <div className="absolute top-2 left-3 flex items-center gap-4 font-label-sm text-label-sm font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-tertiary inline-block"></span>
                  <span className="text-on-surface-variant text-[11px]">Gaussian AI Baseline (90-day)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-error inline-block"></span>
                  <span className="text-error text-[11px]">Actual Stream (Z-axis MPU6050)</span>
                </div>
              </div>

              <svg className="w-full h-32" preserveAspectRatio="none" viewBox="0 0 400 120">
                <defs>
                  <linearGradient id="baselineBand" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#b76dff" stopOpacity="0.25"></stop>
                    <stop offset="100%" stopColor="#b76dff" stopOpacity="0.0"></stop>
                  </linearGradient>
                </defs>
                <line stroke="#25293a" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="400" y1="30" y2="30"></line>
                <line stroke="#25293a" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="400" y1="70" y2="70"></line>
                <polygon fill="url(#baselineBand)" points="0,68 40,66 80,70 120,67 160,69 200,66 240,68 280,67 320,69 360,68 400,67 400,85 360,86 320,85 280,86 240,84 200,85 160,86 120,84 80,87 40,85 0,86"></polygon>
                <path d="M 0,76 Q 80,74 160,77 T 320,76 T 400,75" fill="none" stroke="#ddb7ff" strokeDasharray="4,2" strokeWidth="1.5"></path>
                <path d="M 0,75 L 40,73 L 80,78 L 120,72 L 160,79 L 200,70 L 220,62 L 250,45 L 280,18 L 310,95 L 340,12 L 370,102 L 390,14 L 400,82" fill="none" stroke="#ffb4ab" strokeWidth="2.5"></path>
                <circle className="fill-error animate-ping" cx="280" cy="18" r="4"></circle>
                <circle cx="280" cy="18" fill="#ffb4ab" r="3"></circle>
                <line stroke="#ffb4ab" strokeDasharray="2,2" strokeWidth="1" x1="280" x2="280" y1="18" y2="110"></line>
              </svg>

              <div className="flex items-center justify-between text-[10px] font-label-sm text-outline font-mono pt-1">
                <span>-60s</span>
                <span>-45s</span>
                <span>-30s</span>
                <span className="text-error font-bold">-15s (Spike Ingest)</span>
                <span>Live (T-0)</span>
              </div>
            </div>
          </div>

          {/* RAW DATA STREAM MONOSPACE CONSOLE */}
          <div className="flex flex-col gap-2 rounded bg-surface-container-lowest p-space-md shadow-inner border border-surface-container-high/40">
            <div className="flex items-center justify-between pb-1 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${streaming ? 'bg-secondary animate-pulse' : 'bg-outline'}`}></span>
                <span className="font-label-sm text-label-sm text-on-surface font-mono font-semibold truncate">
                  telemetry/munich/line3/{selectedDevice.name.toLowerCase()}/raw
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setStreaming(!streaming)}
                  className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-mono transition-colors ${
                    streaming ? 'bg-surface-container text-on-surface-variant hover:text-on-surface' : 'bg-primary text-on-primary'
                  }`}
                >
                  {streaming ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={() => showToast('Raw telemetry JSON copied to clipboard')}
                  className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-mono"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="h-28 overflow-y-auto font-label-sm text-label-sm text-on-surface-variant font-mono space-y-1 select-all">
              <div className="text-outline">[14:42:01.048] {`{"sensor":"MPU6050","axis_z":4.82,"axis_x":0.12,"axis_y":0.18,"fft_peak_hz":3200,"temp_die":44.2,"crc":"0xA9F2"}`}</div>
              <div className="text-error">[14:42:01.148] {`{"ALERT":"THRESHOLD_BREACH","metric":"axis_z","val":4.82,"limit":2.20,"delta":"+119%","state":"CRITICAL"}`}</div>
              <div className="text-outline">[14:42:01.248] {`{"sensor":"MPU6050","axis_z":4.79,"axis_x":0.14,"axis_y":0.19,"fft_peak_hz":3210,"temp_die":44.3,"crc":"0x01B8"}`}</div>
              <div className="text-secondary">[14:42:01.348] {`{"mesh_parent":"RPi4-GW-MNCH-02","rssi_dbm":-54,"packets_queued":0,"buffer_free_pct":88}`}</div>
              <div className="text-outline">[14:42:01.448] {`{"sensor":"MPU6050","axis_z":4.85,"axis_x":0.11,"axis_y":0.17,"fft_peak_hz":3195,"temp_die":44.2,"crc":"0x884E"}`}</div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-label-sm font-mono text-outline pt-1 border-t border-surface-container-high">
              <span>Parity Check: CRC-16 Valid</span>
              <span className="text-secondary font-mono">Stream: 100pkts/sec</span>
            </div>
          </div>

          {/* DEVICE HARDWARE HEALTH & DIAGNOSTICS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
            <div className="p-2.5 rounded bg-surface-container font-label-sm text-label-sm border border-surface-container-high/40">
              <span className="text-on-surface-variant block text-[10px]">SRAM UTIL</span>
              <span className="font-mono text-on-surface font-bold text-body-lg">61%</span>
              <span className="text-outline text-[10px] block">312KB/512KB</span>
            </div>
            <div className="p-2.5 rounded bg-surface-container font-label-sm text-label-sm border border-surface-container-high/40">
              <span className="text-on-surface-variant block text-[10px]">SPI FLASH</span>
              <span className="font-mono text-on-surface font-bold text-body-lg">52.5%</span>
              <span className="text-outline text-[10px] block">4.2MB/8.0MB</span>
            </div>
            <div className="p-2.5 rounded bg-surface-container font-label-sm text-label-sm border border-surface-container-high/40">
              <span className="text-on-surface-variant block text-[10px]">SNR MARGIN</span>
              <span className="font-mono text-secondary font-bold text-body-lg">32 dB</span>
              <span className="text-secondary text-[10px] block">Excellent</span>
            </div>
            <div className="p-2.5 rounded bg-surface-container font-label-sm text-label-sm border border-surface-container-high/40">
              <span className="text-on-surface-variant block text-[10px]">DIE TEMP</span>
              <span className="font-mono text-on-surface font-bold text-body-lg">44.2°C</span>
              <span className="text-secondary text-[10px] block">Optimal</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-STEP "ADD DEVICE" ONBOARDING WORKFLOW (EXPANDABLE WORKBENCH CARD) */}
      {wizardOpen && (
        <div className="rounded-lg bg-surface-container-low p-space-lg shadow-xl flex flex-col gap-space-lg border border-surface-container-high/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container-high">
            <div className="flex items-center gap-space-sm">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-base">developer_board</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  New Edge Node Provisioning Wizard
                </h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  4-step automated sensor onboarding, zero-touch certificate injection, and semantic twin assignment
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm text-secondary font-mono">Auto-Discovery BLE Active</span>
              <button
                onClick={() => setWizardOpen(false)}
                className="p-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>

          {/* Stepper Header Badges */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-sm">
            <div
              onClick={() => setWizardStep(1)}
              className={`p-space-sm rounded flex items-center gap-space-sm cursor-pointer transition-colors ${
                wizardStep === 1
                  ? 'bg-surface-container-high ring-1 ring-primary'
                  : 'bg-surface-container opacity-90'
              }`}
            >
              <div className="h-6 w-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface font-bold">1. Choose Type</span>
                <span className="font-label-sm text-label-sm text-secondary font-mono">ESP32-S3 Node Selected</span>
              </div>
            </div>

            <div
              onClick={() => setWizardStep(2)}
              className={`p-space-sm rounded flex items-center gap-space-sm cursor-pointer transition-colors ${
                wizardStep === 2
                  ? 'bg-surface-container-high ring-1 ring-primary shadow-[0_0_16px_rgba(99,102,241,0.2)]'
                  : 'bg-surface-container'
              }`}
            >
              <div className="h-6 w-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs font-mono">
                2
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-primary font-bold">2. Connect &amp; Handshake</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">BLE Provisioning &amp; TLS Cert</span>
              </div>
            </div>

            <div
              onClick={() => setWizardStep(3)}
              className={`p-space-sm rounded flex items-center gap-space-sm cursor-pointer transition-colors ${
                wizardStep === 3
                  ? 'bg-surface-container-high ring-1 ring-primary'
                  : 'bg-surface-container opacity-60'
              }`}
            >
              <div className="h-6 w-6 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-xs font-mono">
                3
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface">3. Calibrate &amp; Ingest</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Zero-offset &amp; FFT setup</span>
              </div>
            </div>

            <div
              onClick={() => setWizardStep(4)}
              className={`p-space-sm rounded flex items-center gap-space-sm cursor-pointer transition-colors ${
                wizardStep === 4
                  ? 'bg-surface-container-high ring-1 ring-primary'
                  : 'bg-surface-container opacity-60'
              }`}
            >
              <div className="h-6 w-6 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-xs font-mono">
                4
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface">4. Map to Asset</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Twin lineage &amp; ERP tag</span>
              </div>
            </div>
          </div>

          {/* Active Step 2 Configuration Canvas */}
          <div className="p-space-lg rounded bg-surface-container-lowest grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center border border-surface-container-high/40">
            {/* BLE Discovery List */}
            <div className="lg:col-span-6 flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-base">bluetooth_searching</span>
                  Discovered Unclaimed Edge Devices Nearby
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-mono">Scanning 2.4GHz...</span>
              </div>
              <div className="space-y-2">
                <div
                  onClick={() => setSelectedBleDevice('ESP32-NEW-880B')}
                  className={`p-space-sm rounded flex items-center justify-between cursor-pointer border ${
                    selectedBleDevice === 'ESP32-NEW-880B'
                      ? 'bg-surface-container-high ring-1 ring-secondary/50 border-secondary/40'
                      : 'bg-surface-container hover:bg-surface-container-high border-surface-container-highest'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">sensors</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-bold font-mono">ESP32-NEW-880B</span>
                      <span className="font-label-sm text-label-sm text-outline font-mono">
                        MAC: E8:68:E7:01:88:0B • RSSI: -42dBm (Strong)
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-secondary/10 text-secondary font-mono font-bold">
                    READY
                  </span>
                </div>

                <div
                  onClick={() => setSelectedBleDevice('ESP32-NEW-910C')}
                  className={`p-space-sm rounded flex items-center justify-between cursor-pointer border ${
                    selectedBleDevice === 'ESP32-NEW-910C'
                      ? 'bg-surface-container-high ring-1 ring-secondary/50 border-secondary/40'
                      : 'bg-surface-container hover:bg-surface-container-high border-surface-container-highest'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-outline text-base">sensors</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-bold font-mono">ESP32-NEW-910C</span>
                      <span className="font-label-sm text-label-sm text-outline font-mono">
                        MAC: E8:68:E7:03:91:0C • RSSI: -68dBm
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-highest text-outline font-mono">
                    UNPAIRED
                  </span>
                </div>
              </div>
            </div>

            {/* Connection Protocol Parameters */}
            <div className="lg:col-span-6 flex flex-col gap-space-sm pl-0 lg:pl-space-md border-t lg:border-t-0 lg:border-l border-surface-container-high">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Provisioning Credentials &amp; TLS Handshake
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant font-mono">TARGET AP SSID</label>
                  <input
                    value={targetSsid}
                    onChange={(e) => setTargetSsid(e.target.value)}
                    className="h-9 px-2.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-mono border border-surface-container-high/40 focus:ring-1 focus:ring-primary focus:outline-none"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant font-mono">MQTT BROKER HOST</label>
                  <input
                    value={mqttBroker}
                    onChange={(e) => setMqttBroker(e.target.value)}
                    className="h-9 px-2.5 rounded bg-surface-container text-secondary font-label-sm text-label-sm font-mono border border-surface-container-high/40 focus:ring-1 focus:ring-primary focus:outline-none"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="material-symbols-outlined text-secondary text-sm">verified_user</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Cognexa mTLS x509 Micro-Certificates will be generated and flashed over BLE soft-channel.
                </span>
              </div>
            </div>
          </div>

          {/* Wizard Action Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs">
            <button
              onClick={() => setWizardStep(Math.max(1, wizardStep - 1))}
              className="px-space-md py-1.5 rounded bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md"
            >
              ← Back to Device Selection
            </button>
            <div className="flex items-center gap-space-sm">
              <button
                onClick={() => setWizardOpen(false)}
                className="px-space-md py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md"
              >
                Cancel Provisioning
              </button>
              <button
                onClick={() => {
                  showToast(`Device ${selectedBleDevice} provisioned successfully! Assigned to line.`);
                  setWizardOpen(false);
                }}
                className="px-space-lg py-2 rounded bg-primary text-on-primary hover:bg-primary-fixed-dim font-label-md text-label-md font-semibold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Next: Calibrate Device</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
