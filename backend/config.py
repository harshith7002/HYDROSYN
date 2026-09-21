import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    PROJECT_NAME: str = "HYDROSYN"
    TAGLINE: str = "Turning Environmental Signals into Actionable Intelligence"
    CONDUIT_BASE_URL: str = os.getenv("CONDUIT_BASE_URL", "https://3d-fewsnet.icdp.ucar.edu/api/v1")
    CONDUIT_EMAIL: str = os.getenv("CONDUIT_EMAIL", "3dpaws@meteo.go.ke")
    CONDUIT_API_KEY: str = os.getenv("CONDUIT_API_KEY", "71VcHDXG-zo1ezcgxAts")
    DEFAULT_STATION_ID: int = int(os.getenv("DEFAULT_STATION_ID", "61"))
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    CACHE_TTL_SECONDS: int = int(os.getenv("CACHE_TTL_SECONDS", "120"))

settings = Settings()
