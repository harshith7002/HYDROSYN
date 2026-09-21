from typing import Dict, Any, List

class ActionEngine:
    """
    Action Recommendation & Impact Attribution Engine.
    Converts raw environmental measurements and risk states into segmented,
    actionable decisions for Farmers, Water Resource Managers, Local Communities, and Conservationists.
    """

    def generate_action_playbooks(self, telemetry: Dict[str, Any], risk: Dict[str, Any], anomalies: List[Dict[str, Any]]) -> Dict[str, Any]:
        score = risk.get("score", 50)
        tier = risk.get("tier", "MODERATE")
        latest = telemetry.get("latest_observation", {})
        
        temp = latest.get("temperature_c", 22.0)
        sm = latest.get("soil_moisture_pct", 30.0)
        rain_accum = latest.get("rain_accum_mm", 0.0)
        vpd = latest.get("vpd_kpa", 1.2)
        et0 = latest.get("et0_mm_day", 4.0)

        # 1. Primary Highlight Action (Hero Banner)
        if score >= 81: # CRITICAL
            hero_action = {
                "urgency": "IMMEDIATE (Within 6 Hours)",
                "title": "EMERGENCY SOIL DESICCATION & DEFICIT INTERVENTION",
                "observation": f"Soil moisture at critical threshold ({sm}%), atmospheric VPD extreme ({vpd} kPa), ET0 evaporative demand at {et0} mm/day with zero rainfall.",
                "risk": "Severe crop moisture starvation, irreversible wilting point approach, and accelerated groundwater drawdown.",
                "recommended_action": "Execute emergency precision drip irrigation in late evening/night. Prioritize high-value and shallow-rooted crops. Apply organic mulch immediately to seal remaining root-zone moisture.",
                "expected_impact": "Prevents up to 40% yield loss in flowering/fruiting stage crops while reducing evaporative water waste by 35% compared to broadcast watering."
            }
        elif score >= 61: # HIGH
            hero_action = {
                "urgency": "HIGH PRIORITY (Within 24 Hours)",
                "title": "WATER STRESS MITIGATION & IRRIGATION SCHEDULING",
                "observation": f"Soil moisture steadily decreasing ({sm}%), rainfall below seasonal baseline, and ambient temperature elevated ({temp}°C).",
                "risk": "Root-zone soil moisture entering crop stress threshold; prolonged deficit will impair biomass formation.",
                "recommended_action": "Monitor soil moisture closely over the next 24 hours. If moisture continues declining and rainfall remains absent, initiate scheduled irrigation cycle (approx. 18-22 mm equivalent).",
                "expected_impact": "Avoids crop drought shock, stabilizes vegetative development, and prevents unnecessary panic over-irrigation."
            }
        elif score >= 31: # MODERATE
            hero_action = {
                "urgency": "ROUTINE MONITORING (2-3 Days)",
                "title": "CONSERVATION WATER MANAGEMENT & SOIL RETENTION",
                "observation": f"Soil moisture moderate ({sm}%), moderate ET0 demand ({et0} mm/day), humidity at {latest.get('humidity_pct', 60)}%.",
                "risk": "Gradual soil drying under sustained daytime solar irradiance, though no immediate crop failure risk.",
                "recommended_action": "Maintain routine crop monitoring. Conserve surface water storage; ensure drip lines and canal gates are leak-free.",
                "expected_impact": "Maintains optimum soil microbial activity and saves up to 20% water storage for dry spell resilience."
            }
        else: # LOW
            hero_action = {
                "urgency": "OPTIMAL / PREVENTATIVE",
                "title": "OPTIMAL CONDITIONS — HARVEST & DRAINAGE MONITORING",
                "observation": f"Adequate soil moisture ({sm}%), balanced atmospheric vapor demand ({vpd} kPa), favorable temperature ({temp}°C).",
                "risk": "Low agro-climatic stress. Excess moisture could induce weed growth or minor fungal dampening if drainage is blocked.",
                "recommended_action": "No supplementary irrigation required. Utilize favorable conditions for planting, organic fertilizer application, or harvesting.",
                "expected_impact": "100% savings on irrigation energy and fuel costs while optimizing natural biological crop vigor."
            }

        # 2. Segmented Stakeholder Playbooks
        farmer_actions = [
            {
                "stakeholder": "Smallholder Farmers",
                "action_title": "Field Irrigation & Soil Protection",
                "icon": "Sprout",
                "observation": f"Topsoil moisture is {sm}% with current ET0 evaporative demand of {et0} mm/day.",
                "risk": f"{'Acute water stress threshold' if score > 60 else 'Stable root-zone moisture'}.",
                "recommended_action": "Irrigate between 18:30 and 21:00 to minimize evaporative drift; inspect soil at 15cm depth before turning pumps on." if score > 60 else "Postpone irrigation; rely on existing soil reservoir.",
                "expected_impact": "Optimized water application, conserving 1,200 to 2,500 liters of water per hectare per cycle."
            },
            {
                "stakeholder": "Smallholder Farmers",
                "action_title": "Crop Heat & Canopy Protection",
                "icon": "Sun",
                "observation": f"Heat index at {latest.get('heat_index_c', temp)}°C with UV index {latest.get('uv_index', 0)}.",
                "risk": "Leaf stomatal closure and pollen viability reduction during peak midday hours.",
                "recommended_action": "Apply organic surface mulch (straw or dried grass) to reduce soil surface temperature by 3-5°C.",
                "expected_impact": "Preserves root health and prevents blossom drop."
            }
        ]

        water_manager_actions = [
            {
                "stakeholder": "Water-Resource Managers",
                "action_title": "Catchment & Reservoir Inflow Balancing",
                "icon": "Waves",
                "observation": f"24-Hour rainfall total is {rain_accum:.1f} mm; basin net water deficit is {latest.get('water_deficit_mm', -3.0)} mm/day.",
                "risk": f"{'Rapid seasonal reservoir storage depletion' if score > 50 else 'Controlled watershed equilibrium'}.",
                "recommended_action": "Throttle agricultural canal release rates to tier-2 allocation guidelines and audit downstream pump extractions." if score > 50 else "Maintain standard baseload water distribution schedule.",
                "expected_impact": "Extends regional community reservoir buffer by 18-24 additional days during dry spells."
            },
            {
                "stakeholder": "Water-Resource Managers",
                "action_title": "Borehole & Aquifer Extraction Quota",
                "icon": "Database",
                "observation": f"Vapor Pressure Deficit at {vpd} kPa; environmental risk tier: {tier}.",
                "risk": "Localized groundwater table stress caused by simultaneous unplanned pumping by private farms.",
                "recommended_action": "Broadcast rotational pumping schedules across community irrigation zones.",
                "expected_impact": "Prevents pump burnout, avoids localized cone of depression, and preserves water pressure."
            }
        ]

        community_actions = [
            {
                "stakeholder": "Local Communities",
                "action_title": "Community Water Harvesting & Storage",
                "icon": "Users",
                "observation": f"Latest barometric pressure is {latest.get('pressure_hpa', 852.0)} hPa with wind at {latest.get('wind_speed_ms', 1.5)} m/s.",
                "risk": "Domestic water container depletion in rural off-grid villages.",
                "recommended_action": "Inspect rainwater harvesting tank gutters, clean first-flush diverters, and cover stored water to prevent vector breeding.",
                "expected_impact": "Ensures clean potable water reserves for 45+ households per storage unit."
            }
        ]

        env_org_actions = [
            {
                "stakeholder": "Environmental Organizations",
                "action_title": "Ecosystem Resilience & Tree Nursery Monitoring",
                "icon": "TreePine",
                "observation": f"Vegetation Condition Index (VCI) at {latest.get('vci_pct', 55)}% with soil moisture at {sm}%.",
                "risk": "Sapling mortality in reforestation zones during unbuffered dry intervals.",
                "recommended_action": "Activate community tree nursery watering teams and apply hydrogel or organic biochar around sapling root zones.",
                "expected_impact": "Increases seedling survival rate from 45% to over 85% during harsh weather anomalies."
            }
        ]

        return {
            "hero_action": hero_action,
            "playbooks": {
                "farmers": farmer_actions,
                "water_managers": water_manager_actions,
                "community": community_actions,
                "environmental_orgs": env_org_actions
            }
        }

action_engine = ActionEngine()
