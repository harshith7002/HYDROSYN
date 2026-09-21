import React from 'react';
import type { ImpactStory } from '../types';
import { Database, Lightbulb, Zap, Award } from 'lucide-react';

interface ImpactPipelineProps {
  impactStory: ImpactStory;
}

export const ImpactPipeline: React.FC<ImpactPipelineProps> = ({ impactStory }) => {
  const steps = [
    {
      step: '01',
      stage: 'RAW DATA',
      title: 'Conduit Telemetry Ingestion',
      desc: impactStory.data_signal,
      subtext: 'High-frequency 3D-PAWS sensors (SHT31, BMX280, SI1145, Rain Gauges)',
      icon: <Database size={22} color="#00f2fe" />,
      color: '#00f2fe',
      bg: 'rgba(0, 242, 254, 0.08)'
    },
    {
      step: '02',
      stage: 'INSIGHT',
      title: 'Environmental Synthesis',
      desc: impactStory.insight,
      subtext: 'Soil Moisture Deficit, VPD Psychrometry, FAO-56 PM ET0 & 0-100 Risk Engine',
      icon: <Lightbulb size={22} color="#fbbf24" />,
      color: '#fbbf24',
      bg: 'rgba(251, 191, 36, 0.08)'
    },
    {
      step: '03',
      stage: 'ACTION',
      title: 'Targeted Interventions',
      desc: impactStory.action,
      subtext: 'Persona-segmented playbooks for Farmers, Water Managers, and Communities',
      icon: <Zap size={22} color="#f97316" />,
      color: '#f97316',
      bg: 'rgba(249, 115, 22, 0.08)'
    },
    {
      step: '04',
      stage: 'IMPACT',
      title: 'Measurable Resilience',
      desc: impactStory.impact,
      subtext: 'Up to 35% water conservation, 25% crop yield preservation, early warning lead time',
      icon: <Award size={22} color="#34d399" />,
      color: '#34d399',
      bg: 'rgba(52, 211, 153, 0.1)'
    }
  ];

  return (
    <div className="glass-panel glass-panel-glow" style={{ padding: '24px 28px', marginBottom: 28 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span className="badge badge-conduit" style={{ marginBottom: 8 }}>
          HACK THE WEATHER 2026 EVALUATION CRITERIA
        </span>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>
          The HYDROSYN Decision Journey: <span className="gradient-text">Data to Impact</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: 680, margin: '6px auto 0 auto' }}>
          Bridging the critical gap between raw weather measurements and life-saving on-the-ground action.
        </p>
      </div>

      {/* 4-Stage Horizontal Responsive Flow */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
        position: 'relative'
      }}>
        {steps.map((s) => (
          <div
            key={s.step}
            style={{
              background: 'rgba(11, 20, 38, 0.85)',
              border: `1px solid ${s.color}33`,
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: `0 8px 20px rgba(0,0,0,0.3)`
            }}
          >
            <div>
              {/* Top Row: Icon + Step Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: s.bg,
                  border: `1px solid ${s.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {s.icon}
                </div>
                <span className="mono" style={{ fontSize: '0.85rem', fontWeight: 800, color: s.color }}>
                  STAGE {s.step}
                </span>
              </div>

              {/* Stage label & Title */}
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {s.stage}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                {s.title}
              </h3>

              {/* Dynamic story text */}
              <p style={{ fontSize: '0.8rem', color: '#f1f5f9', lineHeight: 1.45, marginBottom: 12 }}>
                {s.desc}
              </p>
            </div>

            {/* Footer / Subtext */}
            <div style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              paddingTop: 8,
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              lineHeight: 1.3
            }}>
              {s.subtext}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
