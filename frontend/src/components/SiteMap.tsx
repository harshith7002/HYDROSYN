import React from 'react';
import type { Station } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, CheckCircle } from 'lucide-react';

// Custom Marker icons
const createCustomIcon = (isPrimary: boolean, isSelected: boolean) => {
  const color = isSelected ? '#00f2fe' : (isPrimary ? '#38bdf8' : '#34d399');
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        width: ${isSelected ? '24px' : '18px'};
        height: ${isSelected ? '24px' : '18px'};
        background-color: ${color};
        border: 2px solid #ffffff;
        border-radius: 50%;
        box-shadow: 0 0 12px ${color};
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        ${isSelected ? '<div style="width: 8px; height: 8px; background: #000; border-radius: 50%;"></div>' : ''}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

interface SiteMapProps {
  stations: Station[];
  selectedStationId: number;
  onSelectStation: (id: number) => void;
}

export const SiteMap: React.FC<SiteMapProps> = ({
  stations,
  selectedStationId,
  onSelectStation
}) => {
  const selectedStation = stations.find(s => s.id === selectedStationId) || stations[0];
  const centerLat = selectedStation ? selectedStation.coordinates[1] : -1.0997;
  const centerLng = selectedStation ? selectedStation.coordinates[0] : 37.0145;

  return (
    <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Navigation size={20} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
              Kenya Environmental Monitoring Network
            </h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Real-time geospatial observation nodes across diverse Kenyan agro-ecological catchments
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00f2fe', boxShadow: '0 0 6px #00f2fe' }}></span> Selected Active Site
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8' }}></span> Primary JKUAT Hub
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }}></span> Regional Stations
          </span>
        </div>
      </div>

      {/* Map & Station Cards Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 20
      }}>
        {/* Leaflet Map */}
        <div style={{ height: 380, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
          <MapContainer
            center={[centerLat, centerLng]}
            zoom={7}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {stations.map((s) => {
              const isSelected = s.id === selectedStationId;
              return (
                <Marker
                  key={s.id}
                  position={[s.coordinates[1], s.coordinates[0]]}
                  icon={createCustomIcon(s.is_primary, isSelected)}
                  eventHandlers={{
                    click: () => onSelectStation(s.id)
                  }}
                >
                  <Popup>
                    <div style={{ padding: 4, minWidth: 180 }}>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.9rem', marginBottom: 2 }}>
                        {s.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: 6 }}>
                        {s.county} ({s.elevation_m}m ASL)
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                        {s.ecological_zone}
                      </div>
                      <button
                        onClick={() => onSelectStation(s.id)}
                        className="btn-primary"
                        style={{ width: '100%', padding: '4px 8px', fontSize: '0.75rem', justifyContent: 'center' }}
                      >
                        {isSelected ? '✓ Currently Monitoring' : 'Monitor This Site'}
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Station Quick Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 380, overflowY: 'auto' }}>
          {stations.map((s) => {
            const isSelected = s.id === selectedStationId;
            return (
              <div
                key={s.id}
                onClick={() => onSelectStation(s.id)}
                style={{
                  background: isSelected ? 'rgba(0, 242, 254, 0.08)' : 'rgba(15, 26, 48, 0.6)',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? 'var(--accent-cyan)' : '#fff' }}>
                      {s.name}
                    </span>
                    {s.is_primary && (
                      <span className="badge badge-conduit" style={{ fontSize: '0.6rem', padding: '1px 6px' }}>
                        PRIMARY
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                    {s.county} • Elev: {s.elevation_m}m • {s.ecological_zone}
                  </div>
                </div>

                {isSelected ? (
                  <CheckCircle size={18} color="var(--accent-cyan)" />
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Switch →
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
