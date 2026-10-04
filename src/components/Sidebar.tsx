import React from 'react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  openIncidentsCount?: number;
  isDarkMode: boolean;
  onToggleDarkMode: (dark: boolean) => void;
  onOpenAskCognexa: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  openIncidentsCount = 3,
  isDarkMode,
  onToggleDarkMode,
  onOpenAskCognexa
}) => {
  const navItems = [
    { id: 'command-center', label: 'Command Center', icon: 'grid_view', path: 'command-center' },
    { id: 'ask-cognexa', label: 'Ask Cognexa', icon: 'auto_awesome', badge: 'AI', badgeColor: 'bg-tertiary-container/30 text-tertiary', iconColor: 'text-tertiary' },
    { id: 'knowledge-graph', label: 'Knowledge Graph', icon: 'account_tree', iconColor: 'text-secondary' },
    { id: 'iot-devices', label: 'IoT Devices', icon: 'sensors', pulse: true },
    { id: 'anomalies-and-incidents', label: 'Anomalies & Incidents', icon: 'warning', iconColor: 'text-error', count: openIncidentsCount, countColor: 'bg-error-container text-on-error-container font-bold' },
    { id: 'ai-agents', label: 'AI Agents', icon: 'smart_toy' },
    { id: 'workflows', label: 'Workflows', icon: 'schema' },
    { id: 'connectors', label: 'Connectors', icon: 'cable' },
    { id: 'explainability-audit', label: 'Explainability Audit', icon: 'verified_user' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'onboarding', label: 'Onboarding', icon: 'flag' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest/90 backdrop-blur-2xl z-50 flex flex-col justify-between shadow-[0_1px_12px_rgba(0,0,0,0.5)] border-r border-surface-container-high/30 select-none">
      <div className="flex flex-col min-h-0">
        {/* Brand header */}
        <div className="h-16 px-space-lg flex items-center justify-between bg-surface-container-low/50 border-b border-surface-container-high/20">
          <div 
            className="flex items-center gap-space-sm cursor-pointer group"
            onClick={() => onSelectView('command-center')}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-0.5 rounded-full bg-secondary opacity-40 blur-sm group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden ring-1 ring-secondary/50">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1W2dpF8cbZQxBzNzpKmIV0vf2F-Z1pSqQ5Qk4z85ipAm7WcVt2uAGKpt_E0MdEAXlp_FnzaD0yIoqzMT1ysQDOk33_ymAIsGTeHod3I5jyFhFiulxKYdXxH2FOA4U7UzEjRhyPTg_qAhqjBRq82Y3_HJnRpap6mXYHP8zQ4SCBcd6NWe4E0utOSxWTT1H3p0V55PJ2jLXOoO7MVf89GMl1tayM39GUmsBZqdTbgzS55Eh2ppYoVh0wQUg"
                  alt="COGNEXA Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to stylized SVG icon if network blocked
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="material-symbols-outlined text-secondary text-base absolute">hub</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold group-hover:text-primary transition-colors">
                COGNEXA
              </span>
              <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                Universal Intel
              </span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-mono">
            v4.2
          </span>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'ask-cognexa') {
                    onOpenAskCognexa();
                  } else {
                    onSelectView(item.id as ViewMode);
                  }
                }}
                className={`w-full flex items-center justify-between px-space-md py-2 rounded-lg transition-all text-left text-body-md font-body-md ${
                  isActive
                    ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm ring-1 ring-secondary/30'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <span
                    className={`material-symbols-outlined text-lg ${
                      isActive ? 'text-primary' : item.iconColor || 'text-on-surface-variant'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className={`font-label-sm text-label-sm px-space-xs py-0.5 rounded font-mono ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.pulse && (
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`font-label-sm text-label-sm px-1.5 py-0.5 rounded-full font-mono ${item.countColor}`}>
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer system status & theme switcher */}
      <div className="p-space-sm flex flex-col gap-space-sm bg-surface-container-lowest/60 border-t border-surface-container-high/20">
        <div className="rounded-lg bg-surface-container-low p-space-sm shadow-[0_2px_10px_rgba(0,0,0,0.3)] border border-surface-container-high/40">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                Operational
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">18ms</span>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
            14,820 live nodes synchronized
          </div>
        </div>

        <div className="flex items-center justify-between px-space-md py-space-xs rounded-lg bg-surface-container-high">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-sm text-on-surface-variant">dark_mode</span>
            <span className="font-label-md text-label-md text-on-surface-variant">Interface</span>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-lowest p-0.5 rounded-full">
            <button
              aria-label="Dark mode"
              onClick={() => onToggleDarkMode(true)}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                isDarkMode ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-xs">dark_mode</span>
            </button>
            <button
              aria-label="Light mode"
              onClick={() => onToggleDarkMode(false)}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                !isDarkMode ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-xs">light_mode</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
