import React from 'react';
import { X, Database, ShieldCheck, ExternalLink, Cpu } from 'lucide-react';

interface DataSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataSourcesModal: React.FC<DataSourcesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 10, 20, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 20
    }}>
      <div className="glass-panel" style={{
        maxWidth: 760,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px 32px',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: 4
          }}
        >
          <X size={22} />
        </button>

        {/* Modal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <Database size={24} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
            Data Architecture & Methodology Ledger
          </h2>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
          Strict transparency regarding observational origin, scientific derivations, and heuristic modeling
        </p>

        {/* PRIMARY DATA SECTION */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.85rem',
            fontWeight: 800,
            color: '#34d399',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 10
          }}>
            <ShieldCheck size={16} />
            <span>Primary Observation Source (Direct Grounding)</span>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.06)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>
                JKUAT Conduit Environmental Platform (3D-PAWS Network)
              </h3>
              <a
                href="https://conduit.jhubafrica.com/"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', textDecoration: 'none' }}
              >
                <span>conduit.jhubafrica.com</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 10 }}>
              Provider: JHUB Africa & Jomo Kenyatta University of Agriculture and Technology (JKUAT).
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600 }}>
              Direct Sensor Telemetry Streams:
            </div>
            <ul style={{ fontSize: '0.775rem', color: '#e2e8f0', paddingLeft: 18, lineHeight: 1.5 }}>
              <li><strong>Precipitation:</strong> Dual tipping-bucket rain gauges measuring instantaneous rate (<span className="mono">rg</span>), persistent accumulation (<span className="mono">rgp</span>), and total (<span className="mono">rgt</span>).</li>
              <li><strong>Thermal Array:</strong> Multi-sensor calibration via SHT31 (<span className="mono">st1</span>), BMX280 (<span className="mono">bt1</span>), MCP9808 (<span className="mono">mt1</span>), Wet Bulb Globe Temperature (<span className="mono">wbgt</span>), and Heat Index (<span className="mono">hi</span>).</li>
              <li><strong>Relative Humidity:</strong> SHT31 high-accuracy capacitive sensor (<span className="mono">sh1</span>).</li>
              <li><strong>Barometric Pressure:</strong> BMX280 digital pressure sensor (<span className="mono">bp1</span>).</li>
              <li><strong>Solar Radiation:</strong> SI1145 Tri-band sensor monitoring Ultraviolet (<span className="mono">su1</span>), Infrared (<span className="mono">si1</span>), and Visible light (<span className="mono">sv1</span>).</li>
              <li><strong>Wind Dynamics:</strong> Calibrated Anemometer array measuring Wind Speed (<span className="mono">ws</span>), Wind Gusts (<span className="mono">wg</span>), and Wind Direction (<span className="mono">wd</span>).</li>
            </ul>
          </div>
        </div>

        {/* SECONDARY DERIVED BIOPHYSICAL MODELS */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.85rem',
            fontWeight: 800,
            color: 'var(--accent-cyan)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 10
          }}>
            <Cpu size={16} />
            <span>Secondary Biophysical & Hydrological Models</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: 'rgba(15, 26, 48, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '12px 16px' }}>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.85rem', marginBottom: 2 }}>
                FAO-56 Penman-Monteith Evapotranspiration Model (ET₀)
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Computes daily equivalent atmospheric crop water demand (mm/day) derived from Conduit solar irradiance, temperature, humidity, and wind speed.
              </div>
            </div>

            <div style={{ background: 'rgba(15, 26, 48, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '12px 16px' }}>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.85rem', marginBottom: 2 }}>
                Antecedent Precipitation & Root-Zone Water Balance
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Simulates root-zone soil moisture dynamic depletion (%) using standard infiltration rates and daily decay factor k=0.94.
              </div>
            </div>

            <div style={{ background: 'rgba(15, 26, 48, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '12px 16px' }}>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.85rem', marginBottom: 2 }}>
                HYDROSYN Multi-Criteria Risk Heuristic Engine v1.2
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Composite 0-100 Water Stress Index: <code>40% Soil Moisture Deficit + 25% Rainfall Deficit + 20% Thermal Stress + 15% Vegetation Stress</code>.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: 8,
          padding: '12px 16px',
          fontSize: '0.725rem',
          color: '#fbbf24',
          lineHeight: 1.4
        }}>
          <strong>Scientific Attribution:</strong> Measurements originating from the JKUAT Conduit station are marked as PRIMARY live observational data. Derived indices (ET0, VPD, Soil Moisture %) are computed using standard hydrological equations to turn raw weather into actionable decisions.
        </div>
      </div>
    </div>
  );
};
