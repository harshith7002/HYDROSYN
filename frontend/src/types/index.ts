export interface Station {
  id: number;
  name: string;
  county: string;
  coordinates: [number, number, number]; // [lng, lat, elev]
  elevation_m: number;
  ecological_zone: string;
  is_primary: boolean;
  sensors?: string[];
  status?: string;
  last_ping?: string;
}

export interface LatestObservation {
  timestamp: string;
  temperature_c: number;
  humidity_pct: number;
  pressure_hpa: number;
  rain_rate_mm: number;
  rain_accum_mm: number;
  uv_index: number;
  solar_irradiance_raw: number;
  wind_speed_ms: number;
  wind_gust_ms: number;
  wind_direction_deg: number;
  heat_index_c: number;
  wbgt_c: number;
  soil_moisture_pct: number;
  vpd_kpa: number;
  et0_mm_day: number;
  vci_pct: number;
  water_deficit_mm: number;
  is_simulated?: boolean;
}

export interface RiskSubScore {
  value: number;
  weight: number;
  contribution: number;
}

export interface RiskData {
  score: number;
  tier: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  color: string;
  tier_description: string;
  headline: string;
  model_metadata: {
    name: string;
    formula: string;
    weights: {
      soil_moisture: number;
      rainfall_deficit: number;
      temperature_stress: number;
      vegetation_stress: number;
    };
  };
  sub_scores: {
    soil_moisture_risk: RiskSubScore;
    rainfall_deficit_risk: RiskSubScore;
    temperature_stress_risk: RiskSubScore;
    vegetation_stress_risk: RiskSubScore;
  };
  explanation_bullets: string[];
}

export interface Anomaly {
  id: string;
  metric: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  badge: string;
  observed: string;
  potential_implication: string;
  suggested_action: string;
  confidence_pct: number;
}

export interface HeroAction {
  urgency: string;
  title: string;
  observation: string;
  risk: string;
  recommended_action: string;
  expected_impact: string;
}

export interface ActionItem {
  stakeholder: string;
  action_title: string;
  icon: string;
  observation: string;
  risk: string;
  recommended_action: string;
  expected_impact: string;
}

export interface ActionPlaybooks {
  hero_action: HeroAction;
  playbooks: {
    farmers: ActionItem[];
    water_managers: ActionItem[];
    community: ActionItem[];
    environmental_orgs: ActionItem[];
  };
}

export interface HistorySummary {
  total_rain_24h: number;
  sm_delta_24h: number;
  min_temp: number;
  max_temp: number;
  avg_humidity: number;
}

export interface ImpactStory {
  data_signal: string;
  insight: string;
  action: string;
  impact: string;
}

export interface IntelligenceResponse {
  source: string;
  is_demo_scenario: boolean;
  mode: string;
  station: Station;
  coordinates: [number, number, number];
  latest_observation: LatestObservation;
  history_summary: HistorySummary;
  risk: RiskData;
  anomalies: Anomaly[];
  actions: ActionPlaybooks;
  impact_story: ImpactStory;
  observations_count: number;
  timestamp: string;
}

export interface TrendPoint {
  timestamp: string;
  time_label: string;
  temperature_c: number;
  humidity_pct: number;
  soil_moisture_pct: number;
  rain_rate_mm: number;
  rain_accum_mm: number;
  vpd_kpa: number;
  et0_mm_day: number;
  risk_score: number;
  vci_pct: number;
}

export interface TrendsResponse {
  station_id: number;
  range: string;
  mode: string;
  points_count: number;
  data: TrendPoint[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  grounded_data?: Record<string, any>;
  model_used?: string;
}
