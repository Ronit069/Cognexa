/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewMode, PlantLocation } from './types';
import { PLANTS, ALL_INCIDENTS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AskCognexaModal } from './components/AskCognexaModal';
import { FloatingAskButton } from './components/FloatingAskButton';

// Views
import { CommandCenterView } from './components/views/CommandCenterView';
import { KnowledgeGraphView } from './components/views/KnowledgeGraphView';
import { IoTDevicesView } from './components/views/IoTDevicesView';
import { AnomaliesIncidentsView } from './components/views/AnomaliesIncidentsView';
import { AgentsWorkflowsView } from './components/views/AgentsWorkflowsView';
import { ConnectorsView } from './components/views/ConnectorsView';
import { ExplainabilityAuditView } from './components/views/ExplainabilityAuditView';
import { SettingsView } from './components/views/SettingsView';
import { OnboardingView } from './components/views/OnboardingView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('command-center');
  const [currentPlant, setCurrentPlant] = useState<PlantLocation>(PLANTS[0]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [simulatedAlert, setSimulatedAlert] = useState<string | null>(null);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K for search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      // Ctrl+Space or Option+Space for Ask Cognexa
      if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault();
        setIsAskModalOpen(prev => !prev);
      }
      // Esc closes modals
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsAskModalOpen(false);
        setSimulatedAlert(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSimulateAnomaly = () => {
    const alertMessage = "SIMULATED ANOMALY: Spindle Bearing High Harmonic Resonant Spike detected on Robotic Arm Cell 02 (Axis 3). Divergence +3.8σ.";
    setSimulatedAlert(alertMessage);
    setTimeout(() => {
      setSimulatedAlert(null);
    }, 8000);
  };

  const handleExportAudit = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      facility: currentPlant,
      exportTimestamp: new Date().toISOString(),
      openIncidents: ALL_INCIDENTS,
      cryptographicHash: "0x89fc284b1029c9103eef88102a945d7b"
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cognexa_audit_${currentPlant.id}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex min-h-screen bg-surface-container-lowest text-on-surface font-sans selection:bg-primary/20 selection:text-primary">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        openIncidentsCount={ALL_INCIDENTS.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={setIsDarkMode}
        onOpenAskCognexa={() => setIsAskModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[280px] min-w-0 transition-all duration-300">
        {/* Sticky Header */}
        <Header
          plants={PLANTS}
          currentPlant={currentPlant}
          onSelectPlant={setCurrentPlant}
          onOpenSearch={() => setIsSearchOpen(true)}
          onSimulateAnomaly={handleSimulateAnomaly}
          onExportAudit={handleExportAudit}
          onOpenAskCognexa={() => setIsAskModalOpen(true)}
        />

        {/* Real-time Alert Toast */}
        {simulatedAlert && (
          <div className="mx-8 mt-4 p-4 rounded-2xl bg-error-container text-on-error-container border border-error/30 flex items-center justify-between shadow-2xl animate-bounce-subtle z-40">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl animate-pulse text-error">warning</span>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider block">Real-Time Anomaly Interlock</span>
                <p className="text-xs font-mono font-semibold">{simulatedAlert}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentView('anomalies-and-incidents');
                  setSimulatedAlert(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-error text-white font-mono text-xs font-bold hover:brightness-110 cursor-pointer shadow-sm"
              >
                Inspect Incident
              </button>
              <button
                onClick={() => setSimulatedAlert(null)}
                className="p-1 rounded-lg hover:bg-black/20 text-on-error-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>
        )}

        {/* View Router */}
        <main className="flex-1 pb-16">
          {currentView === 'command-center' && (
            <CommandCenterView
              onNavigate={setCurrentView}
              onOpenAskCognexa={() => setIsAskModalOpen(true)}
            />
          )}

          {currentView === 'knowledge-graph' && (
            <KnowledgeGraphView
              onOpenAskCognexa={() => setIsAskModalOpen(true)}
            />
          )}

          {currentView === 'iot-devices' && (
            <IoTDevicesView />
          )}

          {currentView === 'anomalies-and-incidents' && (
            <AnomaliesIncidentsView
              onNavigate={setCurrentView}
              onOpenAskCognexa={() => setIsAskModalOpen(true)}
            />
          )}

          {currentView === 'ai-agents' && (
            <AgentsWorkflowsView />
          )}

          {currentView === 'workflows' && (
            <AgentsWorkflowsView />
          )}

          {currentView === 'connectors' && (
            <ConnectorsView />
          )}

          {currentView === 'explainability-audit' && (
            <ExplainabilityAuditView />
          )}

          {currentView === 'settings' && (
            <SettingsView />
          )}

          {currentView === 'onboarding' && (
            <OnboardingView
              onComplete={() => setCurrentView('command-center')}
              onNavigate={setCurrentView}
            />
          )}
        </main>
      </div>

      {/* Floating Ask Cognexa Trigger */}
      <FloatingAskButton onClick={() => setIsAskModalOpen(true)} />

      {/* Ask Cognexa Neuro-Symbolic Dialog */}
      <AskCognexaModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        onExecuteAction={(action) => {
          if (action.includes('INC-8942') || action.includes('anomaly')) {
            setCurrentView('anomalies-and-incidents');
          } else if (action.includes('graph') || action.includes('ontology')) {
            setCurrentView('knowledge-graph');
          } else if (action.includes('sensor') || action.includes('device')) {
            setCurrentView('iot-devices');
          }
        }}
      />

      {/* Global ⌘K Quick-Switcher Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-surface-container rounded-2xl border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-outline-variant/20 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">search</span>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assets, telemetry tags, incidents, or SOPs... (Press ESC to close)"
                className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none font-mono"
              />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">
                ESC
              </span>
            </div>

            <div className="p-4 max-h-[380px] overflow-y-auto space-y-2 text-xs">
              <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
                Quick Navigation & Entities
              </span>

              <button
                onClick={() => {
                  setCurrentView('command-center');
                  setIsSearchOpen(false);
                }}
                className="w-full p-2.5 rounded-xl hover:bg-surface-container-high flex items-center justify-between text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-sm">dashboard</span>
                  <div>
                    <div className="font-semibold text-on-surface group-hover:text-primary">Operational Intelligence Command</div>
                    <div className="text-[11px] text-on-surface-variant">Global overview, live telemetry stream & correlation</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-on-surface-variant">View</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('anomalies-and-incidents');
                  setIsSearchOpen(false);
                }}
                className="w-full p-2.5 rounded-xl hover:bg-surface-container-high flex items-center justify-between text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error text-sm">warning</span>
                  <div>
                    <div className="font-semibold text-on-surface group-hover:text-error">Incident INC-8942: Spindle Bearing Anomaly</div>
                    <div className="text-[11px] text-on-surface-variant">Robotic Arm Cell 02 • Axis 3 Harmonic Spike</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-error/10 text-error">Critical</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('knowledge-graph');
                  setIsSearchOpen(false);
                }}
                className="w-full p-2.5 rounded-xl hover:bg-surface-container-high flex items-center justify-between text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm">account_tree</span>
                  <div>
                    <div className="font-semibold text-on-surface group-hover:text-secondary">Knowledge Graph Node #704</div>
                    <div className="text-[11px] text-on-surface-variant">Physical Spindle Bearing 2B ISA-95 Asset</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-on-surface-variant">Graph Node</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('iot-devices');
                  setIsSearchOpen(false);
                }}
                className="w-full p-2.5 rounded-xl hover:bg-surface-container-high flex items-center justify-between text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-400 text-sm">sensors</span>
                  <div>
                    <div className="font-semibold text-on-surface group-hover:text-emerald-400">SensorNode_MPU6050_01</div>
                    <div className="text-[11px] text-on-surface-variant">6-DoF IMU & High-Frequency Vibration Telemetry</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Online</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
