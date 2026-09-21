import React from 'react';
import type { RiskData } from '../types';
import { AlertTriangle, Info, Calculator } from 'lucide-react';

interface RiskEngineCardProps {
  risk: RiskData;
}

export const RiskEngineCard: React.FC<RiskEngineCardProps> = ({ risk }) => {
  const { score, tier, color, headline, tier_description, sub_scores, explanation_bullets, model_metadata } = risk;

  const subScoreItems = [
    {
      key: 'soil_moisture_risk',
      label: 'Soil Moisture Deficit',
      weight: '40%',
      val: sub_scores.soil_moisture_risk.value,
      contribution: sub_scores.soil_moisture_risk.contribution,
      barColor: '#00f2fe'
    },
    {
      key: 'rainfall_deficit_risk',
      label: 'Precipitation Deficit',
      weight: '25%',
      val: sub_scores.rainfall_deficit_risk.value,
      contribution: sub_scores.rainfall_deficit_risk.contribution,
      barColor: '#38bdf8'
    },
    {
      key: 'temperature_stress_risk',
      label: 'Thermal Stress Load',
      weight: '20%',
      val: sub_scores.temperature_stress_risk.value,
      contribution: sub_scores.temperature_stress_risk.contribution,
      barColor: '#f97316'
    },
    {
      key: 'vegetation_stress_risk',
      label: 'Canopy/Vegetation Stress',
      weight: '15%',
      val: sub_scores.vegetation_stress_risk.value,
      contribution: sub_scores.vegetation_stress_risk.contribution,
      barColor: '#34d399'
    }
  ];

  return (
    <div className="glass-panel glass-panel-glow" style={{ padding: '24px 28px', marginBottom: 28 }}>
      {/* Top Header & Model Transparency Tag */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
              HYDROSYN Risk Engine
            </h2>
            <span style={{
              background: `${color}22`,
              color: color,
              border: `1px solid ${color}66`,
              padding: '3px 12px',
              borderRadius: 9999,
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.05em'
            }}>
              TIER: {tier}
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Calibrated biophysical decision intelligence & agro-hydrological stress index
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border-subtle)',
          padding: '6px 12px',
          borderRadius: 8,
          fontSize: '0.725rem',
          color: 'var(--text-secondary)'
        }}>
          <Calculator size={14} color="var(--accent-cyan)" />
          <span>Prototype Heuristic Risk Model v1.2</span>
        </div>
      </div>

      {/* Main 2-Column Risk Gauge & Factor Breakdown */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24,
        alignItems: 'center'
      }}>
        {/* Left: Large 0-100 Score Display */}
        <div style={{
          background: 'rgba(11, 20, 38, 0.85)',
          border: `1px solid ${color}44`,
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: `0 0 30px ${color}15`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
            Composite Water Stress Score
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '8px 0' }}>
            <span className="mono" style={{ fontSize: '4.5rem', fontWeight: 900, color: color, lineHeight: 1, letterSpacing: '-0.04em' }}>
              {score}
            </span>
            <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              / 100
            </span>
          </div>

          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
            {headline}
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: 360, lineHeight: 1.4 }}>
            {tier_description}
          </p>

          {/* Risk Level Color Bar */}
          <div style={{ width: '100%', marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>
              <span>Low (0-30)</span>
              <span>Mod (31-60)</span>
              <span>High (61-80)</span>
              <span>Crit (81-100)</span>
            </div>
            <div style={{
              height: 8,
              width: '100%',
              background: 'linear-gradient(90deg, #10b981 0%, #10b981 30%, #f59e0b 31%, #f59e0b 60%, #f97316 61%, #f97316 80%, #ef4444 81%, #ef4444 100%)',
              borderRadius: 4,
              position: 'relative'
            }}>
              {/* Needle Indicator */}
              <div style={{
                position: 'absolute',
                top: -4,
                left: `${Math.min(98, Math.max(2, score))}%`,
                transform: 'translateX(-50%)',
                width: 4,
                height: 16,
                background: '#ffffff',
                borderRadius: 2,
                boxShadow: '0 0 8px #ffffff'
              }} />
            </div>
          </div>
        </div>

        {/* Right: Transparent Mathematical Sub-Score Breakdown */}
        <div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Info size={16} color="var(--accent-cyan)" />
              <span>Transparent Component Breakdown</span>
            </div>
            <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Formula: {model_metadata.formula}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {subScoreItems.map((item) => (
              <div key={item.key} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 10,
                padding: '10px 14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.label} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>({item.weight} wt)</span>
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="mono" style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                      Risk: {item.val.toFixed(0)}%
                    </span>
                    <span className="mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: item.barColor }}>
                      +{item.contribution.toFixed(1)} pts
                    </span>
                  </div>
                </div>

                <div style={{
                  height: 6,
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: 3,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(100, Math.max(0, item.val))}%`,
                    background: item.barColor,
                    borderRadius: 3,
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* "Why is risk at this level?" Diagnostic Section */}
      <div style={{
        marginTop: 24,
        background: 'rgba(15, 26, 48, 0.6)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <AlertTriangle size={17} color={color} />
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
            Diagnostic Attribution: Why is risk {tier.toLowerCase()}?
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
          {explanation_bullets.map((bullet, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.4
            }}>
              <span style={{ color: color, fontWeight: 700 }}>•</span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
