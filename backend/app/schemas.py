from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional

from enum import Enum

class UserRole(str, Enum):
    admin = "admin"
    transport_provider = "transport_provider"
    agricultural_authority = "agricultural_authority"
    farmer = "farmer"


class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    role: UserRole

class UserRead(BaseModel):
    id: int
    email: EmailStr
    username: str
    role: UserRole

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    
class TokenData(BaseModel):
    id: Optional[int] = None
    username: Optional[str] = None
    role: Optional[UserRole] = None

class LoginData(BaseModel):
    username: str
    password: str



class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    code: str
    new_password: str


class FarmerCreate(BaseModel):
    name: str
    phone: str
    location: str
    username: str
    email: EmailStr
    password: str


class TransportProviderCreate(BaseModel):
    name: str
    phone: str
    vehicle_type: str
    location: str
    username: str
    email: EmailStr
    password: str


class AgricultureAuthorityCreate(BaseModel):
    institution_name: str
    name: str
    phone: str
    location: str
    username: str
    email: EmailStr
    password: str


class AdminCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    
class SMSRequest(BaseModel):
    to: str
    message: str
    from_: str = "your_sender_id_here"
    
class AdminDashboardSummaryResponse(BaseModel):
    registered_users: int
    registered_farmers: int
    registered_authorities: int
    registered_transport_providers: int
    total_reports: int
    pending_reports: int
    total_transport_requests: int
    pending_transport_requests: int
    total_weather_alerts: int
    total_agriculture_alerts: int
class RecentReportResponse(BaseModel):
    id: int
    farmer_name: str
    issue_type: str
    description: str
    location: str
    status: str
    date: str
    phone: str

class RecentActivityResponse(BaseModel):
    user: str
    activity: str
    date: str
    timestamp: datetime
    

    
    class Config:
        from_attributes = True
        

