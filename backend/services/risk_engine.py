from typing import Dict, Any, List, Tuple
import numpy as np

class RiskEngine:
    """
    Transparent, explainable Environmental Risk Engine.
    Implements multi-criteria risk scoring for agro-hydrological stress,
    heat load, and water resource depletion.
    """

    # Model Weights (Transparent Heuristic Multi-Criteria Baseline)
    WEIGHT_SOIL_MOISTURE = 0.40
    WEIGHT_RAINFALL_DEFICIT = 0.25
    WEIGHT_TEMPERATURE_STRESS = 0.20
    WEIGHT_VEGETATION_STRESS = 0.15

    # Threshold baselines for Kenyan Agro-Ecological Zones
    BASELINE_OPTIMAL_SM = 42.0 # % volumetric equivalent
    BASELINE_MIN_SM = 18.0     # % permanent wilting threshold
    BASELINE_TEMP_OPTIMAL = 22.0 # °C
    BASELINE_TEMP_HEAT_STRESS = 31.0 # °C
    BASELINE_RAIN_EXPECTED_24H = 3.5 # mm/24h in humid/sub-humid zone
    BASELINE_VCI_HEALTHY = 65.0 # %

    def calculate_water_stress(self, latest: Dict[str, Any], history_summary: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculates normalized Water Stress Score (0-100) and factor attribution tree.
        """
        sm = float(latest.get("soil_moisture_pct", 30.0))
        rain_24h = float(history_summary.get("total_rain_24h", 0.0))
        temp = float(latest.get("temperature_c", 22.0))
        vci = float(latest.get("vci_pct", 50.0))
        vpd = float(latest.get("vpd_kpa", 1.2))

        # 1. Soil Moisture Risk (0 - 100)
        # When SM <= BASELINE_MIN_SM (18%), risk is 100. When SM >= 48%, risk is 0.
        if sm <= self.BASELINE_MIN_SM:
            sm_risk = 100.0
        elif sm >= 48.0:
            sm_risk = max(0.0, (65.0 - sm) * 0.5)
        else:
            sm_risk = ((48.0 - sm) / (48.0 - self.BASELINE_MIN_SM)) * 100.0
        sm_risk = round(max(0.0, min(100.0, sm_risk)), 1)

        # 2. Rainfall Deficit Risk (0 - 100)
        # Below expected baseline (3.5mm), deficit rises to 100 if 0mm rain
        if rain_24h >= self.BASELINE_RAIN_EXPECTED_24H:
            rain_risk = 0.0
        else:
            rain_risk = ((self.BASELINE_RAIN_EXPECTED_24H - rain_24h) / self.BASELINE_RAIN_EXPECTED_24H) * 100.0
        rain_risk = round(max(0.0, min(100.0, rain_risk)), 1)

        # 3. Temperature Stress Risk (0 - 100)
        # Optimal 18-24°C = low risk. Above 24°C scales up. Above 32°C = 100 risk.
        if temp <= 22.0:
            temp_risk = max(0.0, (15.0 - temp) * 6.0) if temp < 15.0 else 0.0 # cold stress if < 15
        elif temp >= self.BASELINE_TEMP_HEAT_STRESS:
            temp_risk = 100.0
        else:
            temp_risk = ((temp - 22.0) / (self.BASELINE_TEMP_HEAT_STRESS - 22.0)) * 100.0
        temp_risk = round(max(0.0, min(100.0, temp_risk)), 1)

        # 4. Vegetation Stress Risk (0 - 100)
        # VCI > 65% is healthy (0 risk). VCI < 25% is severe stress (100 risk).
        if vci >= self.BASELINE_VCI_HEALTHY:
            veg_risk = 0.0
        elif vci <= 25.0:
            veg_risk = 100.0
        else:
            veg_risk = ((self.BASELINE_VCI_HEALTHY - vci) / (self.BASELINE_VCI_HEALTHY - 25.0)) * 100.0
        veg_risk = round(max(0.0, min(100.0, veg_risk)), 1)

        # Weighted aggregate score
        raw_score = (
            self.WEIGHT_SOIL_MOISTURE * sm_risk +
            self.WEIGHT_RAINFALL_DEFICIT * rain_risk +
            self.WEIGHT_TEMPERATURE_STRESS * temp_risk +
            self.WEIGHT_VEGETATION_STRESS * veg_risk
        )
        score = int(round(raw_score))
        score = max(0, min(100, score))

        # Risk Classification Tier
        if score <= 30:
            tier = "LOW"
            color = "#10b981" # Emerald Green
            tier_desc = "Optimal hydrological balance. Soil moisture adequate, thermal load within normal crop tolerance."
        elif score <= 60:
            tier = "MODERATE"
            color = "#f59e0b" # Amber
            tier_desc = "Moderate moisture depletion detected. Evaporative demand outpacing precipitation recharge."
        elif score <= 80:
            tier = "HIGH"
            color = "#f97316" # Orange-Red
            tier_desc = "Significant water stress. Root-zone moisture entering depletion threshold with elevated atmospheric VPD."
        else:
            tier = "CRITICAL"
            color = "#ef4444" # Crimson Red
            tier_desc = "Severe agro-climatic deficit. High probability of permanent crop wilting and depleted local storage."

        # Factor explanations ("Why is risk at this level?")
        reasons = []
        sm_delta_24h = history_summary.get("sm_delta_24h", -4.2)
        temp_delta_baseline = round(temp - self.BASELINE_TEMP_OPTIMAL, 1)

        if sm_risk >= 50:
            reasons.append(f"Root-zone soil moisture is critically low at {sm}% (Depletion threshold: 25%)")
        elif sm_delta_24h < -2.0:
            reasons.append(f"Soil moisture declined {abs(sm_delta_24h):.1f}% over the last 24 hours without recharge")
        else:
            reasons.append(f"Soil moisture currently stable at {sm}%")

        if rain_24h < 0.5:
            reasons.append(f"Zero effective precipitation recorded in past 24h (Expected seasonal baseline: {self.BASELINE_RAIN_EXPECTED_24H} mm)")
        elif rain_24h < self.BASELINE_RAIN_EXPECTED_24H:
            reasons.append(f"Rainfall ({rain_24h:.1f} mm) is {int((1 - rain_24h/self.BASELINE_RAIN_EXPECTED_24H)*100)}% below recent 24h baseline")
        else:
            reasons.append(f"Precipitation influx ({rain_24h:.1f} mm) provided active surface recharge")

        if temp > 25.0:
            reasons.append(f"Ambient temperature ({temp:.1f}°C) is {temp_delta_baseline:+.1f}°C above local optimal baseline, accelerating ET0 ({latest.get('et0_mm_day', 4.0)} mm/day)")
        else:
            reasons.append(f"Thermal load ({temp:.1f}°C) is within manageable physiological limits")

        if vpd > 1.8:
            reasons.append(f"High atmospheric vapor pressure deficit ({vpd} kPa) inducing plant stomatal closure")

        return {
            "score": score,
            "tier": tier,
            "color": color,
            "tier_description": tier_desc,
            "headline": f"Water Stress: {score} / 100 — {tier}",
            "model_metadata": {
                "name": "HYDROSYN Multi-Criteria Water Stress Heuristic Model v1.2",
                "formula": "Water Stress = 40% Soil Moisture Risk + 25% Rainfall Deficit + 20% Temperature Stress + 15% Vegetation Stress",
                "weights": {
                    "soil_moisture": self.WEIGHT_SOIL_MOISTURE,
                    "rainfall_deficit": self.WEIGHT_RAINFALL_DEFICIT,
                    "temperature_stress": self.WEIGHT_TEMPERATURE_STRESS,
                    "vegetation_stress": self.WEIGHT_VEGETATION_STRESS
                }
            },
            "sub_scores": {
                "soil_moisture_risk": {"value": sm_risk, "weight": 40, "contribution": round(sm_risk * 0.40, 1)},
                "rainfall_deficit_risk": {"value": rain_risk, "weight": 25, "contribution": round(rain_risk * 0.25, 1)},
                "temperature_stress_risk": {"value": temp_risk, "weight": 20, "contribution": round(temp_risk * 0.20, 1)},
                "vegetation_stress_risk": {"value": veg_risk, "weight": 15, "contribution": round(veg_risk * 0.15, 1)}
            },
            "explanation_bullets": reasons
        }

risk_engine = RiskEngine()
