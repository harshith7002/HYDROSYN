# HYDROSYN 🌊🌱
> **Turning Environmental Signals into Actionable Intelligence**  
> *Built for Hack The Weather 2026 — “From Data to Impact”*

HYDROSYN is a production-grade environmental decision-intelligence platform that synthesizes real-world meteorological and environmental observations from the **JKUAT Conduit Platform** (`https://conduit.jhubafrica.com/`) into transparent risk scores, early warning signals, grounded AI analysis, and targeted stakeholder action plans for water resilience and agriculture.

---

## 🌟 The Core Journey

```
Environmental Data (JKUAT Conduit 3D-PAWS)
        ↓
Data Processing & Hydrological Modeling (ET0, VPD, Soil Moisture Deficit)
        ↓
Environmental Intelligence
        ↓
Risk Detection (0–100 Water Stress Heuristic Model)
        ↓
AI Explanation (HYDROSYN Intelligence Grounded Analyst)
        ↓
Actionable Recommendation (Farmer, Water Manager, Community Playbooks)
        ↓
Measurable Impact (Water Waste Reduction, Crop Yield Preservation, Resilience)
```

---

## 🎯 Primary Stakeholders & Solved Questions

1. **Smallholder Farmers**: *"Is water stress increasing? Should I irrigate today? When should I water to minimize evaporation?"*
2. **Water-Resource Managers**: *"Is catchment inflow abnormal? How should canal release quotas be throttled?"*
3. **Local Communities**: *"Are rainwater harvesting tanks depleting? Is an extreme thermal or radiation anomaly present?"*
4. **Environmental Organizations**: *"Are tree nurseries and vegetative canopies showing signs of drought desiccation?"*

---

## 🛰️ JKUAT Conduit Data Integration

HYDROSYN directly integrates with the **JKUAT Conduit / 3D-PAWS CHORDS meteorological network** across Kenya, capturing 1-minute to 5-minute interval observations from stations including:
- **Site 61 (Primary Field Hub)**: JKUAT Main Campus Field Station, Juja, Kiambu (`[37.0145°E, -1.0997°N, 1523m ASL]`)
- **Site 1**: Kenya Meteorological Department (KMD Dagoretti, Nairobi)
- **Site 2**: KALRO Agricultural Research Center (Mtwapa, Kilifi Coast)
- **Site 20**: KALRO Kisii Highland Farm (Lake Victoria Basin)
- **Site 40**: FEWSNET Laikipia Pastoral Monitoring (Nanyuki Plateau)
- **Site 65**: Tana River Bura Irrigation Scheme (Lower Catchment)

### Ingested Multi-Channel Telemetry:
* **Precipitation**: Dual tipping-bucket gauges (`rg` rate mm/h, `rgp` persistent mm, `rgt` total mm)
* **Thermal Profile**: Multi-sensor array with SHT31 (`st1`), BMX280 (`bt1`), MCP9808 (`mt1`), Heat Index (`hi`), Wet Bulb Globe Temp (`wbgt`)
* **Atmospheric Moisture**: SHT31 relative humidity (`sh1` %)
* **Barometric Pressure**: BMX280 digital barometer (`bp1` hPa)
* **Solar Radiation**: SI1145 tri-band radiometer for Ultraviolet (`su1`), Infrared (`si1`), and Visible light (`sv1`)
* **Wind Dynamics**: Calibrated anemometer for Wind Speed (`ws`), Wind Gusts (`wg`), and Direction (`wd`)

---

## 🔬 Biophysical & Risk Modeling

### 1. Transparent Water Stress Risk Score (0–100)
$$\text{Water Stress Score} = 0.40 \cdot \text{Soil Moisture Risk} + 0.25 \cdot \text{Rainfall Deficit} + 0.20 \cdot \text{Temperature Stress} + 0.15 \cdot \text{Vegetation Stress}$$

* **0–30: LOW** — Optimal hydrological balance; standard monitoring.
* **31–60: MODERATE** — Evaporative demand outpacing natural recharge; conservation irrigation planning.
* **61–80: HIGH** — Root-zone moisture entering depletion threshold; targeted irrigation scheduled.
* **81–100: CRITICAL** — Severe agro-climatic deficit; emergency desiccation protocols activated.

### 2. Derived Biophysical Indices
* **Vapor Pressure Deficit (VPD in kPa)**: Tetens saturation psychrometry calculating plant transpiration stress.
* **Reference Evapotranspiration ($ET_0$ in mm/day)**: FAO-56 Penman-Monteith equation driven by solar radiation, temperature, humidity, and wind.
* **Root-Zone Soil Moisture (%)**: Dynamic Antecedent Precipitation & Infiltration Water Balance with daily decay coefficient $k=0.94$.
* **Vegetation Condition Index (VCI %)**: Canopy biophysical vigor proxy.

---

## ⚡ Key Features

1. **Environmental Intelligence Dashboard**: Real-time cards for temperature, rainfall, soil moisture, VCI, UV index, VPD, pressure, and wind with live units and attribution.
2. **Explainable Risk Engine**: Transparent 0–100 gauge with exact mathematical weight contributions and diagnostic attribution bullets (*"Why is risk at this level?"*).
3. **Multi-Horizon Trend Analytics**: Interactive Recharts time-series for 24h, 7d, and 30d windows.
4. **Environmental Anomaly Detection**: Statistical Z-score and rate-of-change triggers detecting thermal spikes, rapid soil moisture drop, rainfall deficits, and extreme UV.
5. **Action Center (The Core Engine)**: Converts observations into structured 4-part action items: `Observation → Risk → Recommended Action → Expected Impact`.
6. **HYDROSYN Intelligence (AI Analyst)**: Grounded assistant answering natural language inquiries strictly against live station state with citation chips.
7. **Kenya Geospatial Site Map**: Leaflet interactive map with real-time station nodes across Kenyan agro-ecological zones.
8. **Live Stream vs Demo Scenarios**: Seamless switcher between Live Conduit Stream and calibrated scenarios (*High Drought Stress, Heavy Rain & Inflow, Optimal Water Balance*).

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Backend Setup (FastAPI)
```bash
# Navigate to project root
cd c:\Users\HP\Downloads\HYDROSYN

# Install backend dependencies
pip install -r backend/requirements.txt

# Run FastAPI backend server (Port 8000)
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
* Backend API docs available at: `http://localhost:8000/docs`

### 2. Frontend Setup (React + TypeScript + Vite)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite dev server (Port 5173)
npm run dev
```
* Open your browser at: `http://localhost:5173`

---

## 🏗️ Architecture

```
React 18 + TypeScript Frontend (Vite)
            ↓ REST API
FastAPI Backend (Python 3.13)
            ↓
Data Service & Adapter Layer ↔ JKUAT Conduit (3D-PAWS)
            ↓
Hydrological Engine (FAO-56 ET0, VPD, Soil Moisture)
            ↓
HYDROSYN Risk Engine (Multi-Factor Heuristic)
            ↓
HYDROSYN Intelligence (Grounded AI Analyst Layer)
```

---

## 👥 Hackathon Team & Acknowledgments
* **Platform**: JKUAT Conduit Climate Platform (JHUB Africa / JKUAT)
* **Hackathon**: Hack The Weather 2026 — “From Data to Impact”
* **Developed by**: HYDROSYN Team
