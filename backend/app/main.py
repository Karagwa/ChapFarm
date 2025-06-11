from datetime import datetime
from typing import Annotated, List
from fastapi import FastAPI, Form, HTTPException, Query, Request
from fastapi import Depends
from fastapi.responses import PlainTextResponse
import httpx
from sqlmodel import select, Session

from app.routes import auth_routes, password_routes

from .database import SessionDep, create_db_and_tables, get_session
from .models import Farmer, FarmerReport, WeatherAlert, WeatherData

from .routes.ussd import router as ussd_router
from .routes.farmer_routes import router as farmer_router
from .routes.weather_routes import router as weather_router
from .routes.password_routes import router as password_router
from .routes.auth_routes import router as auth_router
from .routes.transport_routes import router as transport_router
from .routes.agric_auth import router as agric_auth_router
from .routes.admin import router as admin_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    swagger_ui_init_oauth={
    "clientId": "treasure",  # Can be any string
    "appName": "Chap-Farm"
}
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()  # This will create tables on app startup

app.include_router(ussd_router)
app.include_router(farmer_router)
app.include_router(weather_router)
app.include_router(password_router)
app.include_router(auth_router)
app.include_router(transport_router)
app.include_router(agric_auth_router)
app.include_router(admin_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

