from datetime import datetime
from typing import Annotated, List
from fastapi import FastAPI, Form, HTTPException, Query, Request
from fastapi import Depends
from fastapi.responses import PlainTextResponse
import httpx
from sqlmodel import select, Session

from app.database import SessionDep, create_db_and_tables, get_session
from app.models import Farmer, FarmerReport, WeatherAlert, WeatherData

from app.routes.ussd import router as ussd_router

app = FastAPI()
app.include_router(ussd_router)
API_KEY="4f24d63dca7048f2a1b225649250304"
BASE_URL= "https://api.weatherapi.com/v1"

@app.on_event("startup")
async def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/farmers")
def create_farmer(farmer: Farmer, session:SessionDep) -> Farmer:

    farmer.registered_at = datetime.now() #set the registered_at field to the current date and time
    session.add(farmer) #add the new Farmer to the Session instance,
    session.commit() #commit the changes to the database
    session.refresh(farmer) #refresh the instance with the new data from the database
    return farmer #return the Farmer instance with the new data


@app.get("/farmers")
def read_farmers(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
)-> List[Farmer]:
    farmers=session.exec(select(Farmer).offset(offset).limit(limit)).all()
    return farmers

@app.get("/farmers/{farmer_id}")
def read_farmer_by_id(farmer_id: int, session: SessionDep) -> Farmer:
    farmer = session.get(Farmer, farmer_id)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return farmer

@app.delete("delete/farmers/{farmer_id}")
def delete_farmer(farmer_id: int, session: SessionDep) -> str:
    farmer = session.get(Farmer, farmer_id)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    session.delete(farmer)
    session.commit()
    return "Farmer deleted successfully"

# Weather Data Endpoints
@app.post("/weather")
def create_weather_data(weather: WeatherData, session: SessionDep) -> WeatherData:
    session.add(weather)
    session.commit()
    session.refresh(weather)
    return weather

@app.get("/weather")
def read_weather_data(session: SessionDep) -> List[WeatherData]:
    return session.exec(select(WeatherData)).all()

@app.get("/weather/{location}")
async def get_weather(location: str)-> dict:
    url = f"{BASE_URL}/current.json?key={API_KEY}&q={location}"
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)

            # If the request fails or the API returns a non-200 status
            response.raise_for_status()

            return response.json()
    except httpx.HTTPStatusError as http_err:
        raise HTTPException(status_code=500, detail=f"HTTP error occurred: {http_err}")
    except httpx.RequestError as req_err:
        raise HTTPException(status_code=500, detail=f"Request error occurred: {req_err}")
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {err}")

@app.get("/forecast/{location}/{days}")
async def get_forecast(location: str, days: int) -> dict:
    url = f"{BASE_URL}/forecast.json?key={API_KEY}&q={location}&days={days}"
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)

            # If the request fails or the API returns a non-200 status
            response.raise_for_status()

            return response.json()
    except httpx.HTTPStatusError as http_err:
        raise HTTPException(status_code=500, detail=f"HTTP error occurred: {http_err}")
    except httpx.RequestError as req_err:
        raise HTTPException(status_code=500, detail=f"Request error occurred: {req_err}")
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {err}")

# Weather Alerts Endpoints
@app.get("/alerts/{location}")
async def get_weather_alert(location: str, session: SessionDep) -> WeatherAlert:
    url = f"{BASE_URL}/alerts.json?key={API_KEY}&q={location}"
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)

            # If the request fails or the API returns a non-200 status
            response.raise_for_status()

            alert_data = response.json()
            alert = WeatherAlert(
                location=location,
                alert_message=alert_data.get("headline", "No alert message available"),
                severity=alert_data.get("severity", "Unknown"),
                alert_type=alert_data.get("alert_type", "Unknown"),
                urgency_level=alert_data.get("urgency", "Unknown"), 
                certainty_level=alert_data.get("certainty", "Unknown"),
                effective_time=alert_data.get("effective_time", datetime.now()),
                expires_time=alert_data.get("expires_time", datetime.now()),
                timestamp=datetime.now()
            )
            session.add(alert)
            session.commit()
            session.refresh(alert)
            return alert
    except httpx.HTTPStatusError as http_err:
        raise HTTPException(status_code=500, detail=f"HTTP error occurred: {http_err}")
    except httpx.RequestError as req_err:
        raise HTTPException(status_code=500, detail=f"Request error occurred: {req_err}")
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {err}")
    
@app.get("/alerts")
def read_weather_alerts(session: SessionDep) -> List[WeatherAlert]:
    return session.exec(select(WeatherAlert)).all()

# Farmer Reports Endpoints
@app.post("/reports")
def create_farmer_report(report: FarmerReport, session: SessionDep) -> FarmerReport:
    session.add(report)
    session.commit()
    session.refresh(report)
    return report

@app.get("/reports")
def read_farmer_reports(session: SessionDep) -> List[FarmerReport]:
    return session.exec(select(FarmerReport)).all()

