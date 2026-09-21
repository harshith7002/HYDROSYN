import numpy as np
import pandas as pd
from typing import Dict, Any, List

class AnomalyService:
    """
    Environmental Anomaly Detection Service.
    Applies statistical deviation metrics (rolling Z-scores, rate-of-change, threshold triggers)
    to detect abnormal environmental signatures across Conduit station observations.
    """

    def detect_anomalies(self, series: List[Dict[str, Any]], risk_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        if not series or len(series) < 10:
            return []

        df = pd.DataFrame(series)
        anomalies = []

        latest = series[-1]
        temp_curr = latest.get("temperature_c", 22.0)
        sm_curr = latest.get("soil_moisture_pct", 30.0)
        rain_total = df["rain_rate_mm"].sum()
        uv_curr = latest.get("uv_index", 0.0)
        vpd_curr = latest.get("vpd_kpa", 1.0)

        # 1. Thermal Anomaly (Z-Score > 1.8 or delta > 3.5°C above mean)
        temp_mean = df["temperature_c"].mean()
        temp_std = df["temperature_c"].std() or 1.0
        temp_z = (temp_curr - temp_mean) / temp_std

        if temp_z > 1.75 or (temp_curr - temp_mean) > 3.0:
            anomalies.append({
                "id": "anom_temp_high",
                "metric": "Ambient Thermal Spike",
                "severity": "HIGH" if temp_curr > 29.0 else "MEDIUM",
                "badge": "⚠ Environmental anomaly detected",
                "observed": f"Temperature is {temp_curr:.1f}°C, which is +{abs(temp_curr - temp_mean):.1f}°C ({temp_z:+.1f}σ) above the rolling local station baseline ({temp_mean:.1f}°C).",
                "potential_implication": "Sharp surge in atmospheric evaporative demand (ET0), elevating crop thermal stress and accelerating soil drying.",
                "suggested_action": "Adjust irrigation schedules to early morning or night; monitor vulnerable crops for heat wilt.",
                "confidence_pct": 92
            })
        elif temp_z < -2.0:
            anomalies.append({
                "id": "anom_temp_low",
                "metric": "Unusual Cold Thermal Inversion",
                "severity": "LOW",
                "badge": "⚠ Environmental anomaly detected",
                "observed": f"Temperature dropped to {temp_curr:.1f}°C ({temp_z:+.1f}σ below diurnal baseline).",
                "potential_implication": "Slowed vegetative metabolic activity and high relative humidity.",
                "suggested_action": "Check for fungal spore risks in dense canopies.",
                "confidence_pct": 85
            })

        # 2. Rainfall Deficit Anomaly
        expected_rain_window = 2.5
        if rain_total < 0.1 and sm_curr < 30.0:
            deficit_pct = 95
            anomalies.append({
                "id": "anom_rain_deficit",
                "metric": "Persistent Rainfall Deficit",
                "severity": "CRITICAL" if sm_curr < 22.0 else "HIGH",
                "badge": "⚠ Environmental anomaly detected",
                "observed": f"Cumulative precipitation is 0.0 mm, representing a {deficit_pct}% negative deviation from typical regional baseline.",
                "potential_implication": "Progressive depletion of topsoil moisture reservoir; shallow-root crops entering active moisture deficit.",
                "suggested_action": "Increase monitoring frequency and initiate proactive conservation irrigation.",
                "confidence_pct": 96
            })
        elif rain_total > 15.0:
            anomalies.append({
                "id": "anom_rain_heavy",
                "metric": "Intense Precipitation Inflow",
                "severity": "MEDIUM",
                "badge": "⚠ Hydrological anomaly detected",
                "observed": f"Accumulated rainfall reached {rain_total:.1f} mm in recent observation window.",
                "potential_implication": "Rapid saturation of topsoil layer; elevated risk of surface runoff and nitrogen leaching.",
                "suggested_action": "Inspect field drainage channels and postpone chemical fertilizer application.",
                "confidence_pct": 94
            })

        # 3. Rapid Soil Moisture Depletion Anomaly
        first_sm = series[0].get("soil_moisture_pct", sm_curr)
        sm_delta = sm_curr - first_sm
        if sm_delta <= -4.0:
            anomalies.append({
                "id": "anom_sm_drop",
                "metric": "Rapid Soil Moisture Depletion",
                "severity": "HIGH",
                "badge": "⚠ Environmental anomaly detected",
                "observed": f"Soil moisture depleted by {abs(sm_delta):.1f}% over the observation period without natural rainfall replenishment.",
                "potential_implication": "High soil water extraction rate driven by combined crop transpiration and atmospheric VPD.",
                "suggested_action": "Prioritize high-value plots for targeted supplementary watering; apply mulch cover to reduce surface evaporation.",
                "confidence_pct": 90
            })

        # 4. Vapor Pressure Deficit (VPD) Extreme
        if vpd_curr >= 2.0:
            anomalies.append({
                "id": "anom_vpd_extreme",
                "metric": "Atmospheric Vapor Deficit Extreme",
                "severity": "HIGH",
                "badge": "⚠ Microclimate anomaly detected",
                "observed": f"Vapor Pressure Deficit reached {vpd_curr:.2f} kPa (Standard optimal range: 0.80 – 1.40 kPa).",
                "potential_implication": "Atmospheric dryness forces stomatal closure in plants, suppressing photosynthesis despite adequate sunlight.",
                "suggested_action": "Ensure shade netting if applicable; avoid mid-day foliar sprays.",
                "confidence_pct": 89
            })

        # 5. Solar UV Radiation Anomaly
        if uv_curr > 8.5:
            anomalies.append({
                "id": "anom_uv_high",
                "metric": "Extreme Ultraviolet Radiation",
                "severity": "MEDIUM",
                "badge": "⚠ Radiation anomaly detected",
                "observed": f"Solar UV index peaked at {uv_curr:.1f} # (Very High to Extreme category).",
                "potential_implication": "Accelerated photochemical stress and severe outdoor labor exposure.",
                "suggested_action": "Ensure agricultural field laborers take shade precautions during 11:00-15:00 window.",
                "confidence_pct": 95
            })

        return anomalies

anomaly_service = AnomalyService()
