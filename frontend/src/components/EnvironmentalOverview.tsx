import React from 'react';
import type { LatestObservation, HistorySummary } from '../types';
import { 
  Thermometer, 
  CloudRain, 
  Droplet, 
  Leaf, 
  Sun, 
  Wind, 
  Gauge, 
  Waves,
  Activity
} from 'lucide-react';

interface EnvironmentalOverviewProps {
  observation: LatestObservation;
  historySummary: HistorySummary;
}

export const EnvironmentalOverview: React.FC<EnvironmentalOverviewProps> = ({
  observation,
  historySummary
}) => {
  const cards = [
    {
      id: 'temp',
      title: 'Ambient Temperature',
      value: `${observation.temperature_c.toFixed(1)}`,
      unit: '°C',
      sensor: 'SHT31 / BMX280 / MCP',
      icon: <Thermometer size={20} color="#fb7185" />,
      subtext: `Heat Index: ${observation.heat_index_c.toFixed(1)}°C • WBGT: ${observation.wbgt_c.toFixed(1)}°C`,
      status: observation.temperature_c > 28 ? 'Elevated Heat Load' : (observation.temperature_c < 16 ? 'Cool Highland' : 'Optimal Thermal Band'),
      statusColor: observation.temperature_c > 28 ? '#fb923c' : '#34d399',
      progress: Math.min(100, Math.max(0, (observation.temperature_c / 40) * 100))
    },
    {
      id: 'rain',
      title: 'Precipitation Inflow',
      value: `${observation.rain_rate_mm.toFixed(1)}`,
      unit: 'mm/h',
      sensor: 'Dual Tipping Bucket Gauge (rg/rgp)',
      icon: <CloudRain size={20} color="#38bdf8" />,
      subtext: `24h Accumulated: ${historySummary.total_rain_24h.toFixed(1)} mm`,
      status: historySummary.total_rain_24h < 0.5 ? 'Deficit (Dry Interval)' : (historySummary.total_rain_24h > 15 ? 'Active Saturation' : 'Moderate Influx'),
      statusColor: historySummary.total_rain_24h < 0.5 ? '#f59e0b' : '#38bdf8',
      progress: Math.min(100, (historySummary.total_rain_24h / 25) * 100)
    },
    {
      id: 'soil_moisture',
      title: 'Root-Zone Soil Moisture',
      value: `${observation.soil_moisture_pct.toFixed(1)}`,
      unit: '%',
      sensor: 'Antecedent Water-Balance Model',
      icon: <Droplet size={20} color="#00f2fe" />,
      subtext: `24h Delta: ${historySummary.sm_delta_24h >= 0 ? '+' : ''}${historySummary.sm_delta_24h.toFixed(1)}%`,
      status: observation.soil_moisture_pct < 22 ? 'Critical Depletion' : (observation.soil_moisture_pct < 32 ? 'Water Stress Threshold' : 'Adequate Reservoir'),
      statusColor: observation.soil_moisture_pct < 22 ? '#ef4444' : (observation.soil_moisture_pct < 32 ? '#f97316' : '#10b981'),
      progress: Math.min(100, Math.max(0, (observation.soil_moisture_pct / 65) * 100))
    },
    {
      id: 'vpd',
      title: 'Vapor Pressure Deficit (VPD)',
      value: `${observation.vpd_kpa.toFixed(2)}`,
      unit: 'kPa',
      sensor: 'Tetens Atmospheric Psychrometry',
      icon: <Waves size={20} color="#a855f7" />,
      subtext: `RH: ${observation.humidity_pct.toFixed(0)}% • ET₀: ${observation.et0_mm_day.toFixed(1)} mm/d`,
      status: observation.vpd_kpa > 1.8 ? 'High Transpiration Pull' : (observation.vpd_kpa < 0.5 ? 'Low Evaporation' : 'Balanced Transpiration'),
      statusColor: observation.vpd_kpa > 1.8 ? '#f97316' : '#a855f7',
      progress: Math.min(100, (observation.vpd_kpa / 3.0) * 100)
    },
    {
      id: 'vci',
      title: 'Vegetation Condition Index',
      value: `${observation.vci_pct.toFixed(0)}`,
      unit: '%',
      sensor: 'Canopy Biophysical Synthesis',
      icon: <Leaf size={20} color="#34d399" />,
      subtext: `Water Balance: ${observation.water_deficit_mm.toFixed(1)} mm/day`,
      status: observation.vci_pct < 35 ? 'Severe Canopy Stress' : (observation.vci_pct < 55 ? 'Moderate Vigor' : 'High Vegetative Health'),
      statusColor: observation.vci_pct < 35 ? '#ef4444' : (observation.vci_pct < 55 ? '#f59e0b' : '#34d399'),
      progress: observation.vci_pct
    },
    {
      id: 'uv',
      title: 'Solar Radiation & UV Index',
      value: `${observation.uv_index.toFixed(1)}`,
      unit: '#',
      sensor: 'SI1145 Tri-Band Radiometer (su1/si1)',
      icon: <Sun size={20} color="#facc15" />,
      subtext: `IR Intensity: ${observation.solar_irradiance_raw.toFixed(0)} counts`,
      status: observation.uv_index > 8 ? 'Very High UV Exposure' : (observation.uv_index > 5 ? 'Moderate Daylight' : 'Low / Night'),
      statusColor: observation.uv_index > 8 ? '#f97316' : '#facc15',
      progress: Math.min(100, (observation.uv_index / 12) * 100)
    },
    {
      id: 'wind',
      title: 'Wind & Gust Velocity',
      value: `${observation.wind_speed_ms.toFixed(1)}`,
      unit: 'm/s',
      sensor: 'Anemometer Array (ws/wg/wd)',
      icon: <Wind size={20} color="#60a5fa" />,
      subtext: `Peak Gust: ${observation.wind_gust_ms.toFixed(1)} m/s (${observation.wind_direction_deg.toFixed(0)}°)`,
      status: observation.wind_gust_ms > 8.0 ? 'High Drift Risk' : 'Light Breeze',
      statusColor: observation.wind_gust_ms > 8.0 ? '#f59e0b' : '#60a5fa',
      progress: Math.min(100, (observation.wind_speed_ms / 15) * 100)
    },
    {
      id: 'pressure',
      title: 'Barometric Pressure',
      value: `${observation.pressure_hpa.toFixed(1)}`,
      unit: 'hPa',
      sensor: 'BMX280 Digital Barometer (bp1)',
      icon: <Gauge size={20} color="#38bdf8" />,
      subtext: 'Highland Orographic Reference',
      status: 'Atmospheric Stability Normal',
      statusColor: '#38bdf8',
      progress: 60
    }
  ];

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
            Environmental Intelligence Telemetry
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Real-time calibrated observations with sensor attribution and physical units
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <Activity size={14} color="var(--accent-cyan)" />
          <span>8 Live Sensor Channels</span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16
      }}>
        {cards.map((c) => (
          <div key={c.id} className="glass-panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {c.title}
                </span>
                <div style={{
                  padding: 6,
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {c.icon}
                </div>
              </div>

              {/* Value + Unit */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                <span className="mono" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
                  {c.value}
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                  {c.unit}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{
                height: 4,
                width: '100%',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 2,
                overflow: 'hidden',
                marginBottom: 10
              }}>
                <div style={{
                  height: '100%',
                  width: `${c.progress}%`,
                  background: c.statusColor,
                  borderRadius: 2,
                  transition: 'width 0.5s ease'
                }} />
              </div>

              {/* Status Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: c.statusColor
                }} />
                <span style={{ fontSize: '0.725rem', fontWeight: 600, color: c.statusColor }}>
                  {c.status}
                </span>
              </div>
            </div>

            {/* Footer / Sensor Attribution */}
            <div style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: 8,
              marginTop: 4,
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <div>{c.subtext}</div>
              <div className="mono" style={{ fontSize: '0.65rem', color: '#475569' }}>
                {c.sensor}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
