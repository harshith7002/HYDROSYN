import React from 'react';
import type { Anomaly } from '../types';
import { AlertOctagon, CheckCircle2 } from 'lucide-react';

interface AnomalyAlertsProps {
  anomalies: Anomaly[];
}

export const AnomalyAlerts: React.FC<AnomalyAlertsProps> = ({ anomalies }) => {
  return (
    <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AlertOctagon size={20} color={anomalies.length > 0 ? '#f97316' : '#10b981'} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
            Environmental Anomaly Detection
          </h2>
        </div>
        <span className="badge" style={{
          background: anomalies.length > 0 ? 'rgba(249, 115, 22, 0.15)' : 'rgba(16, 185, 129, 0.15)',
          color: anomalies.length > 0 ? '#f97316' : '#10b981',
          border: `1px solid ${anomalies.length > 0 ? '#f9731644' : '#10b98144'}`
        }}>
          {anomalies.length > 0 ? `${anomalies.length} ACTIVE ANOMALIES` : 'NOMINAL BASELINE'}
        </span>
      </div>

      {anomalies.length === 0 ? (
        <div style={{
          background: 'rgba(16, 185, 129, 0.05)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <CheckCircle2 size={24} color="#10b981" />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
              All environmental signals are tracking within normal standard deviations
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              No sudden thermal spikes, rainfall deficits, or abnormal vapor pressure drying detected against the 14-day seasonal baseline.
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {anomalies.map((anom) => {
            const isCrit = anom.severity === 'CRITICAL';
            const isHigh = anom.severity === 'HIGH';
            const badgeColor = isCrit ? '#ef4444' : (isHigh ? '#f97316' : '#f59e0b');

            return (
              <div
                key={anom.id}
                style={{
                  background: 'rgba(15, 26, 48, 0.75)',
                  borderLeft: `4px solid ${badgeColor}`,
                  borderTop: '1px solid var(--border-subtle)',
                  borderRight: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                  borderRadius: '0 12px 12px 0',
                  padding: '16px 20px'
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: badgeColor }}>
                      {anom.badge}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                      {anom.metric}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>Confidence: <strong className="mono" style={{ color: 'var(--accent-cyan)' }}>{anom.confidence_pct}%</strong></span>
                    <span className="badge" style={{ background: `${badgeColor}22`, color: badgeColor, border: `1px solid ${badgeColor}55`, fontSize: '0.65rem' }}>
                      {anom.severity}
                    </span>
                  </div>
                </div>

                {/* 3-Part Anomaly Explanation */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginTop: 10 }}>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px 12px', borderRadius: 8 }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: 2 }}>
                      Observed:
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#f1f5f9', lineHeight: 1.4 }}>
                      {anom.observed}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px 12px', borderRadius: 8 }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fb923c', textTransform: 'uppercase', marginBottom: 2 }}>
                      Potential Implication:
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {anom.potential_implication}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px 12px', borderRadius: 8 }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', marginBottom: 2 }}>
                      Suggested Action:
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600, lineHeight: 1.4 }}>
                      {anom.suggested_action}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
