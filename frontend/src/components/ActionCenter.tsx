import React, { useState } from 'react';
import type { ActionPlaybooks } from '../types';
import { 
  Zap, 
  Sprout, 
  Waves, 
  Users, 
  TreePine, 
  Clock, 
  Target
} from 'lucide-react';

interface ActionCenterProps {
  actions: ActionPlaybooks;
}

export const ActionCenter: React.FC<ActionCenterProps> = ({ actions }) => {
  const [selectedPersona, setSelectedPersona] = useState<'farmers' | 'water_managers' | 'community' | 'environmental_orgs'>('farmers');
  const { hero_action, playbooks } = actions;

  const currentPlaybook = playbooks[selectedPersona] || [];

  return (
    <div className="glass-panel glass-panel-glow" style={{ padding: '24px 28px', marginBottom: 28 }}>
      {/* Top Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={18} color="#fff" />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
              Action Center: Operational Recommendations
            </h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Converting environmental signals and risk indices into measurable field interventions
          </p>
        </div>

        <span className="badge" style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
          DECISION MATRIX ACTIVE
        </span>
      </div>

      {/* Hero Immediate Intervention Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(239, 68, 68, 0.08) 100%)',
        border: '1px solid rgba(249, 115, 22, 0.35)',
        borderRadius: 'var(--radius-md)',
        padding: '20px 24px',
        marginBottom: 24,
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="badge" style={{ background: '#f97316', color: '#fff', fontSize: '0.7rem' }}>
            <Clock size={12} /> {hero_action.urgency}
          </span>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>
            {hero_action.title}
          </span>
        </div>

        {/* 4-Column Structured Flow: Observation -> Risk -> Action -> Impact */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginTop: 14
        }}>
          {/* 1. Observation */}
          <div style={{ background: 'rgba(15, 26, 48, 0.8)', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: 4 }}>
              1. Observation
            </div>
            <div style={{ fontSize: '0.8rem', color: '#f1f5f9', lineHeight: 1.4 }}>
              {hero_action.observation}
            </div>
          </div>

          {/* 2. Risk */}
          <div style={{ background: 'rgba(15, 26, 48, 0.8)', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fb923c', textTransform: 'uppercase', marginBottom: 4 }}>
              2. Risk Implication
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {hero_action.risk}
            </div>
          </div>

          {/* 3. Recommended Action */}
          <div style={{ background: 'rgba(15, 26, 48, 0.8)', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(249, 115, 22, 0.3)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#f97316', textTransform: 'uppercase', marginBottom: 4 }}>
              3. Recommended Action
            </div>
            <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600, lineHeight: 1.4 }}>
              {hero_action.recommended_action}
            </div>
          </div>

          {/* 4. Expected Impact */}
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', marginBottom: 4 }}>
              4. Expected Impact
            </div>
            <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600, lineHeight: 1.4 }}>
              {hero_action.expected_impact}
            </div>
          </div>
        </div>
      </div>

      {/* Stakeholder Persona Navigation */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 14,
        marginBottom: 20
      }}>
        <button
          className={`btn-outline ${selectedPersona === 'farmers' ? 'active' : ''}`}
          onClick={() => setSelectedPersona('farmers')}
        >
          <Sprout size={16} />
          <span>Smallholder Farmers</span>
        </button>
        <button
          className={`btn-outline ${selectedPersona === 'water_managers' ? 'active' : ''}`}
          onClick={() => setSelectedPersona('water_managers')}
        >
          <Waves size={16} />
          <span>Water-Resource Managers</span>
        </button>
        <button
          className={`btn-outline ${selectedPersona === 'community' ? 'active' : ''}`}
          onClick={() => setSelectedPersona('community')}
        >
          <Users size={16} />
          <span>Local Communities</span>
        </button>
        <button
          className={`btn-outline ${selectedPersona === 'environmental_orgs' ? 'active' : ''}`}
          onClick={() => setSelectedPersona('environmental_orgs')}
        >
          <TreePine size={16} />
          <span>Environmental Organizations</span>
        </button>
      </div>

      {/* Persona Specific Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {currentPlaybook.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(15, 26, 48, 0.7)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 12
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                  {item.action_title}
                </span>
                <span className="badge" style={{ background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)', fontSize: '0.65rem' }}>
                  {item.stakeholder}
                </span>
              </div>

              {/* 4-Stage Mini Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Observation:
                  </span>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {item.observation}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fb923c', textTransform: 'uppercase' }}>
                    Risk:
                  </span>
                  <div style={{ fontSize: '0.8rem', color: '#f1f5f9' }}>
                    {item.risk}
                  </div>
                </div>

                <div style={{ background: 'rgba(0, 242, 254, 0.05)', padding: '8px 10px', borderRadius: 6, borderLeft: '3px solid var(--accent-cyan)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                    Recommended Action:
                  </span>
                  <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600 }}>
                    {item.recommended_action}
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              paddingTop: 10,
              fontSize: '0.775rem',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Target size={14} />
              <span><strong>Impact:</strong> {item.expected_impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
