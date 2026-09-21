import type { IntelligenceResponse, TrendsResponse, Station } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function fetchStationList(): Promise<Station[]> {
  try {
    const res = await fetch(`${API_BASE}/sites`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch stations`);
    const data = await res.json();
    return data.stations || [];
  } catch (err) {
    console.warn('[API] Could not reach backend for sites, using cached stations list:', err);
    return [
      {
        id: 61,
        name: "JKUAT Main Campus Field Station",
        county: "Kiambu / Juja",
        coordinates: [37.014528, -1.099736, 1523.0],
        elevation_m: 1523,
        ecological_zone: "Upper Midland Agro-Ecological Zone (Coffee/Maize)",
        is_primary: true
      },
      {
        id: 1,
        name: "Kenya Meteorological Department (KMD)",
        county: "Nairobi / Dagoretti Corner",
        coordinates: [36.7601, -1.30172, 1799.0],
        elevation_m: 1799,
        ecological_zone: "Highland Urban & Upper Catchment",
        is_primary: false
      },
      {
        id: 2,
        name: "KALRO Agricultural Research Center",
        county: "Kilifi / Mtwapa Coastal",
        coordinates: [39.742871, -3.935853, 21.0],
        elevation_m: 21,
        ecological_zone: "Coastal Lowland Humid Zone",
        is_primary: false
      },
      {
        id: 20,
        name: "KALRO Kisii Highland Farm",
        county: "Kisii / Lake Victoria Basin",
        coordinates: [34.775388, -0.677687, 1656.0],
        elevation_m: 1656,
        ecological_zone: "High Rainfall Agro-zone",
        is_primary: false
      }
    ];
  }
}

export async function fetchStationIntelligence(stationId: number, mode: string = 'live'): Promise<IntelligenceResponse> {
  const res = await fetch(`${API_BASE}/stations/${stationId}/intelligence?mode=${mode}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch intelligence`);
  return res.json();
}

export async function fetchStationTrends(stationId: number, range: string = '24h', mode: string = 'live'): Promise<TrendsResponse> {
  const res = await fetch(`${API_BASE}/stations/${stationId}/trends?range=${range}&mode=${mode}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch trends`);
  return res.json();
}

export async function sendAnalystChat(query: string, stationId: number, mode: string = 'live'): Promise<any> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      station_id: stationId,
      mode
    })
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to send chat`);
  return res.json();
}

export async function fetchDataSources(): Promise<any> {
  const res = await fetch(`${API_BASE}/sources`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch sources`);
  return res.json();
}
