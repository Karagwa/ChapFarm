# app/routes/weather_routes.py

from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from sqlmodel import select

from ..models import WeatherData
from ..database import SessionDep, get_session
from ..services.weather import get_current_weather_data, get_5day_3hour_forecast_raw

router = APIRouter(prefix="/weather", tags=["Weather"])

@router.get("/current")
async def current_weather(location: str):
    return await get_current_weather_data(location)

@router.get("/forecast")
async def forecast(location: str, days: int = 3):
    return await get_5day_3hour_forecast_raw(location, days)

# @router.post("/alert")
# async def weather_alert(location: str, db: Session = Depends(get_session)):
#     return await get_weather_alert(location, db)

@router.get("/weather")
def read_weather_data(session: SessionDep) -> List[WeatherData]:
    return session.exec(select(WeatherData)).all() #type: ignore

