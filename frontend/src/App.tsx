import React, { useState, useEffect } from 'react';
import type { Station, IntelligenceResponse } from './types';
import { fetchStationList, fetchStationIntelligence } from './api/client';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { EnvironmentalOverview } from './components/EnvironmentalOverview';
import { RiskEngineCard } from './components/RiskEngineCard';
import { TrendAnalysis } from './components/TrendAnalysis';
import { AnomalyAlerts } from './components/AnomalyAlerts';
import { AiAnalyst } from './components/AiAnalyst';
import { ActionCenter } from './components/ActionCenter';
import { ImpactPipeline } from './components/ImpactPipeline';
import { SiteMap } from './components/SiteMap';
import { DataSourcesModal } from './components/DataSourcesModal';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Bot, 
  Zap, 
  MapPin, 
  Activity, 
  RefreshCw, 
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

export const App: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStationId, setSelectedStationId] = useState<number>(61); // Site 61 = JKUAT Main Campus
  const [selectedMode, setSelectedMode] = useState<string>('live');
  const [intelligence, setIntelligence] = useState<IntelligenceResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'all' | 'dashboard' | 'risk_trends' | 'ai_analyst' | 'action_center' | 'map'>('all');
  const [isSourcesOpen, setIsSourcesOpen] = useState<boolean>(false);

  // Load Station Catalog on mount
  useEffect(() => {
    fetchStationList()
      .then(list => {
        setStations(list);
        if (list.length > 0 && !list.some(s => s.id === selectedStationId)) {
          setSelectedStationId(list[0].id);
        }
      })
      .catch(err => {
        console.error('[App] Failed to load stations:', err);
      });
  }, []);

  // Load Station Intelligence when station or mode changes
  const loadIntelligence = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchStationIntelligence(selectedStationId, selectedMode);
      setIntelligence(data);
    } catch (err: any) {
      console.error('[App] Failed to load intelligence:', err);
      setError(err.message || 'Failed to connect to backend intelligence service.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadIntelligence();
  }, [selectedStationId, selectedMode]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar
        stations={stations}
        selectedStationId={selectedStationId}
        onSelectStation={setSelectedStationId}
        selectedMode={selectedMode}
        onSelectMode={setSelectedMode}
        onRefresh={loadIntelligence}
        isLoading={isLoading}
        onOpenSources={() => setIsSourcesOpen(true)}
      />

      {/* Main Content Area */}
      <main className="app-container" style={{ flex: 1, marginTop: 20 }}>
        {/* Navigation View Filter Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 20,
          background: 'var(--bg-surface)',
          padding: '6px 12px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <button
              className={`btn-outline ${activeView === 'all' ? 'active' : ''}`}
              onClick={() => setActiveView('all')}
              style={{ fontSize: '0.8rem', padding: '5px 12px' }}
            >
              <LayoutDashboard size={14} />
              <span>Full Master Flow</span>
            </button>
            <button
              className={`btn-outline ${activeView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveView('dashboard')}
              style={{ fontSize: '0.8rem', padding: '5px 12px' }}
            >
              <Activity size={14} />
              <span>Telemetry & Overview</span>
            </button>
            <button
              className={`btn-outline ${activeView === 'risk_trends' ? 'active' : ''}`}
              onClick={() => setActiveView('risk_trends')}
              style={{ fontSize: '0.8rem', padding: '5px 12px' }}
            >
              <ShieldAlert size={14} />
              <span>Risk & Trends</span>
            </button>
            <button
              className={`btn-outline ${activeView === 'action_center' ? 'active' : ''}`}
              onClick={() => setActiveView('action_center')}
              style={{ fontSize: '0.8rem', padding: '5px 12px' }}
            >
              <Zap size={14} />
              <span>Action Center</span>
            </button>
            <button
              className={`btn-outline ${activeView === 'ai_analyst' ? 'active' : ''}`}
              onClick={() => setActiveView('ai_analyst')}
              style={{ fontSize: '0.8rem', padding: '5px 12px' }}
            >
              <Bot size={14} />
              <span>AI Analyst</span>
            </button>
            <button
              className={`btn-outline ${activeView === 'map' ? 'active' : ''}`}
              onClick={() => setActiveView('map')}
              style={{ fontSize: '0.8rem', padding: '5px 12px' }}
            >
              <MapPin size={14} />
              <span>Kenya Sites Map</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            <span>Platform Status:</span>
            <span style={{ color: '#34d399', fontWeight: 600 }}>ONLINE</span>
          </div>
        </div>

        {/* Loading / Error States */}
        {isLoading && !intelligence && (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <RefreshCw size={36} color="var(--accent-cyan)" style={{ animation: 'spin 1.2s linear infinite', margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              Synthesizing JKUAT Conduit Telemetry...
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Executing hydrological calculations, risk engine weighting, and anomaly detection.
            </p>
          </div>
        )}

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 24px',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 16
          }}>
            <AlertTriangle size={28} color="#ef4444" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: 2 }}>
                Telemetry Ingestion Notice
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {error}
              </div>
            </div>
            <button onClick={loadIntelligence} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              Retry Sync
            </button>
          </div>
        )}

        {/* Render Views when Data is Available */}
        {intelligence && (
          <>
            {/* Top Station & Hackathon Hero Header */}
            <HeroHeader intelligence={intelligence} />

            {/* View: All or Dashboard */}
            {(activeView === 'all' || activeView === 'dashboard') && (
              <EnvironmentalOverview
                observation={intelligence.latest_observation}
                historySummary={intelligence.history_summary}
              />
            )}

            {/* View: All or Risk & Trends */}
            {(activeView === 'all' || activeView === 'risk_trends') && (
              <>
                <RiskEngineCard risk={intelligence.risk} />
                <TrendAnalysis stationId={selectedStationId} mode={selectedMode} />
                <AnomalyAlerts anomalies={intelligence.anomalies} />
              </>
            )}

            {/* View: All or Action Center */}
            {(activeView === 'all' || activeView === 'action_center') && (
              <>
                <ActionCenter actions={intelligence.actions} />
                <ImpactPipeline impactStory={intelligence.impact_story} />
              </>
            )}

            {/* View: All or AI Analyst */}
            {(activeView === 'all' || activeView === 'ai_analyst') && (
              <AiAnalyst intelligence={intelligence} />
            )}

            {/* View: All or Map */}
            {(activeView === 'all' || activeView === 'map') && (
              <SiteMap
                stations={stations}
                selectedStationId={selectedStationId}
                onSelectStation={setSelectedStationId}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(7, 12, 24, 0.95)',
        padding: '24px',
        marginTop: 40
      }}>
        <div style={{
          maxWidth: 1440,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            <span style={{ fontWeight: 700, color: '#fff' }}>HYDROSYN</span> — Environmental Decision-Intelligence Platform
            <div style={{ fontSize: '0.725rem', marginTop: 2 }}>
              Hack The Weather 2026: “From Data to Impact” • Integrated with JKUAT Conduit (JHUB Africa)
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setIsSourcesOpen(true)}
              style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              Data Sources & Methodology
            </button>
            <a
              href="https://conduit.jhubafrica.com/"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <span>Conduit Platform</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </footer>

      {/* Data Sources Modal */}
      <DataSourcesModal
        isOpen={isSourcesOpen}
        onClose={() => setIsSourcesOpen(false)}
      />
    </div>
  );
};

export default App;
