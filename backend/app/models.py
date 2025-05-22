from datetime import datetime, timedelta
from pydantic import BaseModel, Field
from typing import Literal, Optional, List, Dict, Any

from enum import Enum
from app.schemas import UserRole

from sqlmodel import JSON, Column, SQLModel, Field, Relationship


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(max_length=50, unique=True, index=True)
    email: str = Field(max_length=100, unique=True, index=True)
    password: str = Field(max_length=100)
    role: UserRole = Field(default=UserRole.admin)


    reset_token: Optional[str] = None
    reset_token_expiry: datetime = Field(default_factory=lambda: datetime.now() + timedelta(hours=0.5))

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

class Farmer(SQLModel, table=True):
    id:int = Field(default=None, primary_key=True)
    name:str = Field(max_length=100, index=True)
    phone:str = Field(max_length=15, index=True)
    location:str = Field(max_length=100, index=True)
    registered_at:datetime = Field(default_factory=datetime.utcnow)

    reports: List['FarmerReport'] = Relationship(back_populates="farmer")
    sessions: List['USSDSession'] = Relationship(back_populates="farmer")

class WeatherData(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    location: str = Field(index=True)
    temperature:float # Temperature in Celsius
    precipitation:float
    recorded_at:datetime = Field(default_factory=datetime.utcnow)


class WeatherAlert(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    location: str = Field(index=True)
    alert_message: str
    severity: str  # Example: "High", "Medium", "Low"
    alert_type: str  # Example: "Flood", "Drought", "Frost"
    urgency_level: str  # Example: "Immediate", "Advisory"
    certainty_level: str  # Example: "High", "Medium", "Low"
    effective_time: datetime  # When the alert becomes effective
    expires_time: datetime  # When the alert expires
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class FarmerReport(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    farmer_id: int = Field(foreign_key="farmer.id")
    issue_type: str  # Example: "Flooding", "Pests", "Drought"
    description: Optional[str] = None
    location: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    farmer: Optional[Farmer] = Relationship(back_populates="reports")

class USSDSession(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    farmer_id: int = Field(foreign_key="farmer.id")
    session_id: str = Field(unique=True)
    last_step: Optional[str] = None  # Example: "MAIN_MENU", "WEATHER_REQUEST"
    temp_data: Optional[Dict] = Field(default=None, sa_column=Column(JSON))
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    farmer: Optional[Farmer] = Relationship(back_populates="sessions")

class Advice(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    query_text: str
    response_text: str
    

class TransportRequest(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    farmer_id: int = Field(foreign_key="farmer.id")
    transport_type: Optional[str] = None  # Example: "Truck", "Van", "Bicycle"
    pickup_location: Optional[str] = None
    dropoff_location: Optional[str] = None
    status: str  # Example: "Pending", "Completed", "Cancelled"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    farmer: Optional[Farmer] = Relationship(back_populates="transport_requests")
    
class AgricultureAlert(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    alert_type: str  # Example: "Pest", "Disease", "Weather"
    description: Optional[str] = None
    severity: str  # Example: "High", "Medium", "Low"
    timestamp: datetime = Field(default_factory=datetime.utcnow)