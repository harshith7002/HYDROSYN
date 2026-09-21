import React, { useState, useEffect } from 'react';
import type { TrendPoint } from '../types';
import { fetchStationTrends } from '../api/client';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { LineChart as ChartIcon, BarChart3, Droplets, Thermometer, ShieldAlert, RefreshCw } from 'lucide-react';

interface TrendAnalysisProps {
  stationId: number;
  mode: string;
}

export const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ stationId, mode }) => {
  const [range, setRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [activeTab, setActiveTab] = useState<'risk' | 'water' | 'thermal' | 'et0'>('risk');
  const [trendData, setTrendData] = useState<TrendPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const loadTrends = async () => {
      setIsLoading(true);
      try {
        const res = await fetchStationTrends(stationId, range, mode);
        if (isMounted) {
          setTrendData(res.data || []);
        }
      } catch (err) {
        console.error('[TrendAnalysis] Failed to fetch trends:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadTrends();
    return () => { isMounted = false; };
  }, [stationId, range, mode]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(15, 26, 48, 0.95)',
          border: '1px solid var(--border-focus)',
          borderRadius: 8,
          padding: '10px 14px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          fontSize: '0.75rem',
          color: '#fff'
        }}>
          <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: 4 }}>
            {label}
          </div>
          {payload.map((entry: any, index: number) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '3px 0' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color }} />
              <span style={{ color: 'var(--text-secondary)' }}>{entry.name}:</span>
              <span className="mono" style={{ fontWeight: 700, color: '#fff' }}>
                {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
                {entry.name.includes('Temp') ? '°C' : ''}
                {entry.name.includes('Moisture') || entry.name.includes('Humidity') || entry.name.includes('VCI') ? '%' : ''}
                {entry.name.includes('Rain') ? ' mm' : ''}
                {entry.name.includes('VPD') ? ' kPa' : ''}
                {entry.name.includes('ET') ? ' mm/d' : ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: 28 }}>
      {/* Header & Controls */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 20
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ChartIcon size={20} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
              Historical Environmental Trends
            </h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            High-resolution multi-variable time-series across calibrated observation intervals
          </p>
        </div>

        {/* Time Horizon Selector (24h, 7d, 30d) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-surface)', padding: 4, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
          <button
            className={`btn-outline ${range === '24h' ? 'active' : ''}`}
            onClick={() => setRange('24h')}
            style={{ padding: '4px 12px', fontSize: '0.75rem' }}
          >
            24 Hours
          </button>
          <button
            className={`btn-outline ${range === '7d' ? 'active' : ''}`}
            onClick={() => setRange('7d')}
            style={{ padding: '4px 12px', fontSize: '0.75rem' }}
          >
            7 Days
          </button>
          <button
            className={`btn-outline ${range === '30d' ? 'active' : ''}`}
            onClick={() => setRange('30d')}
            style={{ padding: '4px 12px', fontSize: '0.75rem' }}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Chart Metric Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 12,
        marginBottom: 20
      }}>
        <button
          className={`btn-outline ${activeTab === 'risk' ? 'active' : ''}`}
          onClick={() => setActiveTab('risk')}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}
        >
          <ShieldAlert size={14} color="#f97316" />
          <span>Water Stress Risk Index</span>
        </button>
        <button
          className={`btn-outline ${activeTab === 'water' ? 'active' : ''}`}
          onClick={() => setActiveTab('water')}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}
        >
          <Droplets size={14} color="#00f2fe" />
          <span>Rainfall & Soil Moisture</span>
        </button>
        <button
          className={`btn-outline ${activeTab === 'thermal' ? 'active' : ''}`}
          onClick={() => setActiveTab('thermal')}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}
        >
          <Thermometer size={14} color="#fb7185" />
          <span>Temperature & Vapor Deficit (VPD)</span>
        </button>
        <button
          className={`btn-outline ${activeTab === 'et0' ? 'active' : ''}`}
          onClick={() => setActiveTab('et0')}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}
        >
          <BarChart3 size={14} color="#34d399" />
          <span>Evapotranspiration & VCI</span>
        </button>
      </div>

      {/* Chart Canvas */}
      <div style={{ height: 320, width: '100%', position: 'relative' }}>
        {isLoading ? (
          <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            color: 'var(--text-muted)'
          }}>
            <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite' }} />
            <span>Loading time-series telemetry...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'risk' ? (
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time_label" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="risk_score" name="Water Stress Risk (0-100)" stroke="#f97316" strokeWidth={2.5} fillOpacity={1} fill="url(#riskGrad)" />
              </AreaChart>
            ) : activeTab === 'water' ? (
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time_label" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" domain={[0, 70]} stroke="#00f2fe" fontSize={11} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 20]} stroke="#38bdf8" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Line yAxisId="left" type="monotone" dataKey="soil_moisture_pct" name="Soil Moisture (%)" stroke="#00f2fe" strokeWidth={2.5} dot={false} />
                <Line yAxisId="right" type="stepAfter" dataKey="rain_rate_mm" name="Rain Rate (mm/h)" stroke="#38bdf8" strokeWidth={2} dot={false} />
              </LineChart>
            ) : activeTab === 'thermal' ? (
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time_label" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis yAxisId="temp" domain={[10, 38]} stroke="#fb7185" fontSize={11} tickLine={false} />
                <YAxis yAxisId="vpd" orientation="right" domain={[0, 3.5]} stroke="#a855f7" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Line yAxisId="temp" type="monotone" dataKey="temperature_c" name="Temperature (°C)" stroke="#fb7185" strokeWidth={2.5} dot={false} />
                <Line yAxisId="vpd" type="monotone" dataKey="vpd_kpa" name="Vapor Pressure Deficit (kPa)" stroke="#a855f7" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            ) : (
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="vciGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time_label" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Area type="monotone" dataKey="vci_pct" name="Vegetation Condition Index (%)" stroke="#34d399" strokeWidth={2} fill="url(#vciGrad)" />
                <Line type="monotone" dataKey="et0_mm_day" name="ET0 (mm/day)" stroke="#facc15" strokeWidth={2} dot={false} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
