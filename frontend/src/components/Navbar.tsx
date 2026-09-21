import React from 'react';
import type { Station } from '../types';
import { Activity, Database, RefreshCw, MapPin, Radio } from 'lucide-react';

interface NavbarProps {
  stations: Station[];
  selectedStationId: number;
  onSelectStation: (id: number) => void;
  selectedMode: string;
  onSelectMode: (mode: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  onOpenSources: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stations,
  selectedStationId,
  onSelectStation,
  selectedMode,
  onSelectMode,
  onRefresh,
  isLoading,
  onOpenSources
}) => {
  return (
    <header className="navbar-container" style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(7, 12, 24, 0.92)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        {/* Brand & Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #00f2fe 0%, #0072ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.35)'
          }}>
            <Activity size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                HYDRO<span style={{ color: 'var(--accent-cyan)' }}>SYN</span>
              </span>
              <span className="badge badge-conduit" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                JKUAT CONDUIT POWERED
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Turning Environmental Signals into Actionable Intelligence
            </div>
          </div>
        </div>

        {/* Controls: Station Selector + Mode Toggle + Actions */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          {/* Station Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-surface)', padding: '6px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
            <MapPin size={16} color="var(--accent-cyan)" />
            <select
              value={selectedStationId}
              onChange={(e) => onSelectStation(Number(e.target.value))}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '0.825rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {stations.map(s => (
                <option key={s.id} value={s.id} style={{ background: '#0f1a30', color: '#fff' }}>
                  {s.id === 61 ? '★ [Live] ' : ''}{s.name} ({s.county})
                </option>
              ))}
            </select>
          </div>

          {/* Mode Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-surface)', padding: '6px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
            <Radio size={16} color={selectedMode === 'live' ? '#34d399' : '#fbbf24'} />
            <select
              value={selectedMode}
              onChange={(e) => onSelectMode(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: selectedMode === 'live' ? '#34d399' : '#fbbf24',
                fontFamily: 'inherit',
                fontSize: '0.825rem',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="live" style={{ background: '#0f1a30', color: '#34d399' }}>● Live Conduit Stream</option>
              <option value="drought_stress" style={{ background: '#0f1a30', color: '#fbbf24' }}>⚡ Demo: High Drought Stress</option>
              <option value="monsoon_flood" style={{ background: '#0f1a30', color: '#fbbf24' }}>⚡ Demo: Heavy Rain & Inflow</option>
              <option value="optimal_balance" style={{ background: '#0f1a30', color: '#fbbf24' }}>⚡ Demo: Optimal Water Balance</option>
            </select>
          </div>

          {/* Data Sources Modal Trigger */}
          <button
            onClick={onOpenSources}
            className="btn-outline"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            title="View Conduit Data & Science Methodology"
          >
            <Database size={15} />
            <span>Data Sources</span>
          </button>

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            className="btn-outline"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            disabled={isLoading}
            title="Refresh telemetry"
          >
            <RefreshCw size={14} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} />
            <span>{isLoading ? 'Syncing...' : 'Sync'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
