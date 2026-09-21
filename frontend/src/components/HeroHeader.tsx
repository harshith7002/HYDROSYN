import React from 'react';
import type { IntelligenceResponse } from '../types';
import { MapPin, Mountain, Trees, Clock, Sparkles } from 'lucide-react';

interface HeroHeaderProps {
  intelligence: IntelligenceResponse;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ intelligence }) => {
  const { station, latest_observation, mode, is_demo_scenario, source } = intelligence;

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Top Hackathon Banner */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(0, 242, 254, 0.08) 0%, rgba(0, 114, 255, 0.08) 100%)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '8px 16px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem' }}>
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>HACK THE WEATHER 2026</span>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <span style={{ color: 'var(--text-secondary)' }}>Theme: “From Data to Impact”</span>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>JKUAT Conduit Platform Integration</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {is_demo_scenario ? (
            <span className="badge badge-demo">
              <Sparkles size={12} /> SCENARIO: {mode.toUpperCase()}
            </span>
          ) : (
            <span className="badge badge-live">
              <span className="pulse-dot"></span> LIVE CONDUIT FEED
            </span>
          )}
        </div>
      </div>

      {/* Main Station Metadata Strip */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
                {station.name}
              </h1>
              {station.is_primary && (
                <span className="badge badge-conduit" style={{ fontSize: '0.7rem' }}>
                  PRIMARY FIELD HUB
                </span>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <MapPin size={14} color="var(--accent-cyan)" /> {station.county} ({station.coordinates[1].toFixed(4)}°N, {station.coordinates[0].toFixed(4)}°E)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Mountain size={14} color="#38bdf8" /> Elev: {station.elevation_m}m ASL
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Trees size={14} color="#34d399" /> {station.ecological_zone}
              </span>
            </div>
          </div>

          {/* Quick telemetry sync indicator */}
          <div style={{
            background: 'rgba(15, 26, 48, 0.8)',
            padding: '10px 16px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 4
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Clock size={13} />
              <span>Latest Observation:</span>
              <span className="mono" style={{ color: '#fff', fontWeight: 600 }}>
                {new Date(latest_observation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-blue)' }}>
              Source: <span className="mono">{source}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
