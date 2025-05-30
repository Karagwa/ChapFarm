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