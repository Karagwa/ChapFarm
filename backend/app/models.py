from datetime import datetime, timedelta
from pydantic import BaseModel, Field
from typing import Literal, Optional, List, Dict, Any

from enum import Enum
from app.schemas import UserRole
from sqlalchemy import JSON as SQLAlchemyJSON

from sqlmodel import  Column, SQLModel, Field, Relationship, JSON


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(max_length=50, unique=True, index=True)
    email: str = Field(max_length=100, unique=True, index=True)
    password: str = Field(max_length=100)
    role: UserRole = Field(default=UserRole.admin)


    reset_code: Optional[str] = None
    reset_code_expiry: datetime = Field(default_factory=lambda: datetime.now() + timedelta(hours=0.5))

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    
    # Relationships
    farmer: Optional["Farmer"] = Relationship(back_populates="user")
    transport_provider: Optional["TransportProvider"] = Relationship(back_populates="user")
    authority: Optional["AgricultureAuthority"] = Relationship(back_populates="user")
    admin: Optional["Admin"] = Relationship(back_populates="user")
    

class Farmer(SQLModel, table=True):
    id:int = Field(default=None, primary_key=True)
    name:str = Field(max_length=100, index=True)
    phone:str = Field(max_length=15, index=True)
    location:str = Field(max_length=100, index=True)
    region:str = Field(max_length=50, index=True, default="Unknown")  # Optional region field
    registered_at:datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user_id: Optional[int] = Field(foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="farmer")
    transport_requests: List['TransportRequest'] = Relationship(back_populates="farmer")
    reports: List['FarmerReport'] = Relationship(back_populates="farmer")
    sessions: List['USSDSession'] = Relationship(back_populates="farmer")
    

class TransportProvider(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=100, index=True)
    phone: str
    location: str
    vehicle_type: Optional[str] = None  #TODO: Change to Enum if needed
    registered_at: datetime = Field(default_factory=datetime.utcnow)

    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="transport_provider")

    #transport_requests: List["TransportRequest"] = Relationship(back_populates="transport_provider")

class AgricultureAuthority(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    institution_name: str = Field(max_length=100, index=True)
    name: str
    phone: str
    location: str
    registered_at: datetime = Field(default_factory=datetime.utcnow)

    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="authority")

    alerts: List["AgricultureAlert"] = Relationship(back_populates="authority") 

class Admin(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str = Field(max_length=100, unique=True, index=True)
    phone: str = Field(max_length=15, index=True)
    registered_at: datetime = Field(default_factory=datetime.utcnow)

    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="admin")   
class AgricultureAlert(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    alert_type: str  # Example: "Pest", "Disease", "Weather"
    description: Optional[str] = None
    severity: str  # Example: "High", "Medium", "Low"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    authority_id: Optional[int] = Field(foreign_key="agricultureauthority.id")
    authority: Optional[AgricultureAuthority] = Relationship(back_populates="alerts")

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
    status: str =Field(default="Pending")  # Example: "Pending", "Resolved", "In Progress"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    farmer: Optional[Farmer] = Relationship(back_populates="reports")



class USSDSession(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: str = Field(unique=True, index=True)
    phone_number: str = Field(index=True)
    farmer_id: Optional[int] = Field(default=None, foreign_key="farmer.id")
    current_step: str = Field(default="main_menu")
    last_step: str = Field(default="INITIAL")
    
    # Use JSON field for storing temporary data
    temp_data: Optional[Dict[str, Any]] = Field(default=None, sa_column=Column(SQLAlchemyJSON))
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    farmer: Optional["Farmer"] = Relationship(back_populates="sessions")
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
    
    
