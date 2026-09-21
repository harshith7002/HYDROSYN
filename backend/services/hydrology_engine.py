import math
import numpy as np
import pandas as pd
from typing import Dict, Any, List

class HydrologyEngine:
    """
    Environmental & Hydrological synthesis engine.
    Transforms raw atmospheric telemetry (temperature, rainfall, humidity, solar radiation, wind)
    into physically-grounded hydrological variables:
    - Vapor Pressure Deficit (VPD in kPa)
    - FAO-56 Reference Evapotranspiration (ET0 in mm/day)
    - Dynamic Soil Moisture Estimation (Root-zone Water Content % via Antecedent Water Balance)
    - Vegetation Condition Index (VCI %) & Canopy Stress Factor
    - Net Water Deficit / Surplus (mm/day)
    """

    @staticmethod
    def calculate_vpd(temp_c: float, humidity_pct: float) -> float:
        """Calculates Vapor Pressure Deficit in kPa."""
        # Tetens formula for saturation vapor pressure es in kPa
        es = 0.61078 * math.exp((17.27 * temp_c) / (temp_c + 237.3))
        ea = es * (max(1.0, min(100.0, humidity_pct)) / 100.0)
        vpd = max(0.0, es - ea)
        return round(vpd, 2)

    @staticmethod
    def calculate_et0(temp_c: float, humidity_pct: float, wind_speed_ms: float, solar_uv: float, elevation_m: float = 1523.0) -> float:
        """
        Estimates daily equivalent Reference Evapotranspiration (ET0) using FAO-56 Penman-Monteith / Hargreaves.
        Output in mm/day.
        """
        # Solar radiation proxy from UV and daylight cycle (MJ/m2/day)
        rs_proxy = max(1.0, solar_uv * 2.8 + 8.5)
        
        # Atmospheric pressure in kPa from elevation
        p_kpa = 101.3 * math.pow((293.0 - 0.0065 * elevation_m) / 293.0, 5.26)
        psychrometric_gamma = 0.000665 * p_kpa
        
        # Slope of saturation vapor pressure curve Delta
        delta = (4098.0 * (0.61078 * math.exp((17.27 * temp_c) / (temp_c + 237.3)))) / math.pow(temp_c + 237.3, 2)
        
        es = 0.61078 * math.exp((17.27 * temp_c) / (temp_c + 237.3))
        ea = es * (humidity_pct / 100.0)
        
        # Radiation term + Aerodynamic term (FAO-56 PM equation)
        net_radiation = rs_proxy * 0.408 # Net equivalent evaporation in mm
        u2 = max(0.5, wind_speed_ms)
        
        num = (0.408 * delta * net_radiation) + (psychrometric_gamma * (900.0 / (temp_c + 273.0)) * u2 * (es - ea))
        den = delta + (psychrometric_gamma * (1.0 + 0.34 * u2))
        
        et0 = num / den if den > 0 else 3.5
        return round(max(0.8, min(10.0, et0)), 2)

    def process_series_hydrology(self, series: List[Dict[str, Any]], elevation_m: float = 1523.0) -> List[Dict[str, Any]]:
        """
        Enriches chronological telemetry series with synthesized soil moisture, VPD, ET0, and water balance.
        """
        if not series:
            return []

        df = pd.DataFrame(series)
        
        # Calculate VPD and ET0 row by row
        df['vpd_kpa'] = df.apply(lambda r: self.calculate_vpd(r['temperature_c'], r['humidity_pct']), axis=1)
        df['et0_mm_day'] = df.apply(lambda r: self.calculate_et0(
            r['temperature_c'], r['humidity_pct'], r['wind_speed_ms'], r['uv_index'], elevation_m
        ), axis=1)

        # Dynamic Soil Moisture simulation via Antecedent Precipitation Index (API) & Water Balance
        # Initial soil moisture state calibrated around 42% (or derived from recent rain)
        soil_moisture = []
        decay_k = 0.94 # Daily soil retention coefficient (decay)
        field_capacity = 65.0
        wilting_point = 14.0
        
        current_sm = 38.0
        
        # Check cumulative rain in series
        total_rain = df['rain_rate_mm'].sum()
        if total_rain > 5.0:
            current_sm = min(field_capacity, 45.0 + total_rain * 1.5)
        elif total_rain < 0.2:
            current_sm = 24.5

        for idx, row in df.iterrows():
            rain_in = row['rain_rate_mm'] * 0.85 # effective infiltration
            evap_demand = (row['et0_mm_day'] / 288.0) * (row['vpd_kpa'] / 1.5) # 5-min step evaporation loss
            
            # Step decay
            current_sm = current_sm * (decay_k ** (1.0 / 288.0)) + (rain_in * 2.5) - (evap_demand * 1.2)
            current_sm = max(wilting_point, min(field_capacity, current_sm))
            
            soil_moisture.append(round(current_sm, 1))

        df['soil_moisture_pct'] = soil_moisture
        
        # Vegetation Condition Index (VCI) simulation based on soil moisture and thermal load
        vci_series = []
        for idx, row in df.iterrows():
            sm = row['soil_moisture_pct']
            temp = row['temperature_c']
            # VCI scale 0-100: healthy when sm > 35 and temp moderate (18-26)
            sm_factor = (sm - wilting_point) / (field_capacity - wilting_point) * 80.0
            temp_penalty = max(0.0, (temp - 27.0) * 3.5)
            vci = max(10.0, min(95.0, sm_factor + 20.0 - temp_penalty))
            vci_series.append(round(vci, 1))

        df['vci_pct'] = vci_series
        
        # Water Deficit (mm/day): Rain rate accumulated vs ET0
        df['water_deficit_mm'] = (df['rain_accum_mm'] - (df['et0_mm_day'] / 24.0)).round(2)
        
        return df.to_dict(orient='records')

hydrology_engine = HydrologyEngine()
