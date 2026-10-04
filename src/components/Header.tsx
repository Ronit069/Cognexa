import React, { useState } from 'react';
import { PlantLocation } from '../types';

interface HeaderProps {
  plants: PlantLocation[];
  currentPlant: PlantLocation;
  onSelectPlant: (plant: PlantLocation) => void;
  onOpenSearch: () => void;
  onSimulateAnomaly: () => void;
  onExportAudit: () => void;
  unreadCount?: number;
  onOpenAskCognexa?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  plants,
  currentPlant,
  onSelectPlant,
  onOpenSearch,
  onSimulateAnomaly,
  onExportAudit,
  unreadCount = 2
}) => {
  const [plantDropdownOpen, setPlantDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.25)] border-b border-surface-container-high/30 select-none">
      <div className="h-16 w-full px-gutter-lg flex items-center justify-between gap-space-md">
        {/* Left: Plant Switcher & Cluster Sync Indicator */}
        <div className="flex items-center gap-space-md">
          <div className="relative">
            <button
              onClick={() => setPlantDropdownOpen(!plantDropdownOpen)}
              className="flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors border border-surface-container-high/40"
            >
              <span className="material-symbols-outlined text-primary text-base">factory</span>
              <div className="flex flex-col text-left">
                <span className="font-label-sm text-label-sm text-on-surface font-semibold leading-none">
                  {currentPlant.name}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px] leading-none mt-0.5">
                  {currentPlant.type}
                </span>
              </div>
              <span className="material-symbols-outlined text-xs text-on-surface-variant ml-1">
                expand_more
              </span>
            </button>

            {plantDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-surface-container-high/95 backdrop-blur-2xl rounded-xl shadow-2xl p-1.5 border border-surface-container-highest z-50 animate-fade">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline px-3 py-1.5 block">
                  Select Cyber-Physical Node
                </span>
                {plants.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPlant(p);
                      setPlantDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      p.id === currentPlant.id
                        ? 'bg-surface-container text-secondary font-semibold'
                        : 'text-on-surface hover:bg-surface-container-lowest'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md">{p.name}</span>
                      <span className="text-[10px] text-on-surface-variant">{p.type}</span>
                    </div>
                    <span className="font-mono text-[10px] text-secondary">{p.syncPercent}%</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-low text-on-surface-variant border border-surface-container-high/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="font-label-sm text-label-sm text-on-surface">Alpha Cluster:</span>
            <span className="font-label-sm text-label-sm text-secondary font-mono">{currentPlant.syncPercent}% Synced</span>
          </div>
        </div>

        {/* Center: Omnibar search trigger */}
        <div className="flex-1 max-w-xl mx-space-md hidden md:block">
          <div
            onClick={onOpenSearch}
            className="relative flex items-center w-full cursor-pointer group"
          >
            <span className="material-symbols-outlined absolute left-3 text-outline text-base group-hover:text-secondary transition-colors">
              search
            </span>
            <input
              readOnly
              onClick={onOpenSearch}
              className="w-full h-10 pl-9 pr-14 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner border border-surface-container-high/30 cursor-pointer"
              placeholder="Ask or search across 42M docs, logs, ERP records, and live IoT feeds..."
              type="text"
            />
            <span className="absolute right-2.5 font-label-sm text-label-sm text-outline bg-surface-container-high px-1.5 py-0.5 rounded font-mono shadow-sm">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right Action buttons & profile */}
        <div className="flex items-center gap-space-sm">
          <div className="hidden lg:flex items-center gap-space-xs">
            <button
              onClick={onSimulateAnomaly}
              className="flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors font-label-md text-label-md border border-surface-container-high/40 active:scale-95"
              title="Inject synthetic vibration & thermal spike into Turbine #07"
            >
              <span className="material-symbols-outlined text-sm text-secondary">tune</span>
              <span>Simulate Anomaly</span>
            </button>
            <button
              onClick={onExportAudit}
              className="flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors font-label-md text-label-md font-semibold active:scale-95 shadow-[0_0_16px_rgba(192,193,255,0.2)]"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Export Audit</span>
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              aria-label="Notifications"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors border border-surface-container-high/30"
            >
              <span className="material-symbols-outlined text-base">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest animate-pulse"></span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-surface-container-high/95 backdrop-blur-2xl rounded-xl shadow-2xl p-space-sm border border-surface-container-highest z-50">
                <div className="flex items-center justify-between p-2 border-b border-surface-container pb-2">
                  <span className="font-label-sm text-label-sm font-semibold uppercase text-on-surface font-mono">
                    Incident Alerts
                  </span>
                  <span className="text-[10px] text-secondary font-mono">Live Ingest</span>
                </div>
                <div className="space-y-1.5 py-2">
                  <div className="p-2 rounded bg-surface-container hover:bg-surface-container-highest transition-colors cursor-pointer">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-error font-mono font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-error"></span> INC-8942
                      </span>
                      <span className="text-outline text-[10px]">16m ago</span>
                    </div>
                    <p className="text-body-sm text-on-surface text-[12px] mt-0.5 line-clamp-1">
                      Turbine-07 harmonic vibration breached 4.82 mm/s
                    </p>
                  </div>
                  <div className="p-2 rounded bg-surface-container hover:bg-surface-container-highest transition-colors cursor-pointer">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-tertiary font-mono font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Agent Atlas
                      </span>
                      <span className="text-outline text-[10px]">3m ago</span>
                    </div>
                    <p className="text-body-sm text-on-surface text-[12px] mt-0.5 line-clamp-1">
                      Emergency coolant flush staged for Turbine-07
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile User avatar & metadata */}
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-space-sm pl-space-xs cursor-pointer group"
            >
              <div className="relative">
                <img
                  alt="Dr. Elena Rostova Profile"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-secondary/50 group-hover:ring-secondary transition-all"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1XiXjer_wRWwuEv7zZRvC3b21q9SyCmn3Ak_wx85X8nZCAetHJh5ovFXsF_4KC3WkjMnSZ3qUV7Gv_j1-dJr9r_s1iYOVU_yEn1kNa1lIMDnalq8uZq8C5DOLMuYogbOfl1xHfI0J_ZSwZe-Y-AQ4_7wl_InL3G8fUnucWsuR09e5N_-apGfxKhaKQwK8JsGydyYzSjjmbXqsTUOfAx_6T1AgrXPBC-unxT2GWJjYJsSWZqAPn61wpTIKE"
                  onError={(e) => {
                    // Fallback to avatar if blocked
                    (e.target as HTMLImageElement).src =
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuAeiWbn31nqP3DWI3uiRwyDr1fBLKb5cB00wNmQRHjyzfmW9QP3OjD1-Kt4XhU-rJHa3kE9k6vv4mUkC_PLk8P8bPa4tYq6WwKwFUOLgQKw4gu0LexwTsLOXRQcVfofs-nfxP1Manp4vGEdmIZHJ4eMBBfnXOnwrluopum1DyFMQd4D3Yp5Ykxh1LHrt0sKWHIPPrnCMY1S2G0Bv1YvEcZZTfk-Elc4Pe8a-I-xwQ_ZFTpQStXa-Dys';
                  }}
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-secondary ring-1 ring-surface-container-lowest"></span>
              </div>
              <div className="hidden 2xl:flex flex-col text-left">
                <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight group-hover:text-primary transition-colors">
                  Dr. Elena Rostova
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                  VP of Operations &amp; Engineering
                </span>
              </div>
            </div>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-surface-container-high/95 backdrop-blur-2xl rounded-xl shadow-2xl p-space-sm border border-surface-container-highest z-50">
                <div className="p-2 border-b border-surface-container">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold block">Dr. Elena Rostova</span>
                  <span className="text-xs text-on-surface-variant font-mono">elena.rostova@cognexa.corp</span>
                  <span className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/20 text-primary font-mono text-[10px]">
                    eIDAS HSM Token Active
                  </span>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => setProfileOpen(false)}
                    className="w-full text-left px-3 py-1.5 text-xs text-on-surface hover:bg-surface-container rounded transition-colors flex items-center justify-between"
                  >
                    <span>Hardware Token Diagnostics</span>
                    <span className="text-secondary font-mono">OK</span>
                  </button>
                  <button 
                    onClick={() => setProfileOpen(false)}
                    className="w-full text-left px-3 py-1.5 text-xs text-on-surface hover:bg-surface-container rounded transition-colors"
                  >
                    Signer Key: 0x9F4C...B82A
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
