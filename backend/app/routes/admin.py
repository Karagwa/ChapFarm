from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from app.models import AgricultureAuthority, TransportProvider, User, Farmer, UserRole
from app.schemas import UserCreate, UserRead, FarmerCreate, TransportProviderCreate, AgricultureAuthorityCreate, AdminCreate
from app.database import get_session
from app.auth.security import hash_password
from app.auth.jwt_handler import decode_access_token, require_admin


router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)

# Register another admin
@router.post("/admins/register", status_code=201, include_in_schema=False)
def register_admin(
    data: AdminCreate,
    session: Session = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    # Check if user already exists
    existing_user = session.exec(select(User).where(User.email == data.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(data.password)

    new_admin = User(
        email=data.email,
        username=data.username,
        password=hashed_password,
        role=UserRole.admin,
    )

    session.add(new_admin)
    session.commit()
    session.refresh(new_admin)

    return {
        "message": "Admin registered successfully",
        "user_id": new_admin.id,
    }

# Register a farmer
@router.post("/farmers/register", status_code=201)
def register_farmer(
    data: FarmerCreate,
    session: Session = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    # Check if the user already exists
    existing_user = session.exec(select(User).where(User.email == data.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # Hash the password
    hashed_password = hash_password(data.password)
    
    # Create a new user
    new_user = User(
        email=data.email,
        username=data.username,
        password=hashed_password,
        role=UserRole.farmer
    )
    
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    
    # Create the farmer
    new_farmer = Farmer(
        name=data.name,
        phone=data.phone,
        location=data.location,
        user_id=new_user.id
    )
    
    session.add(new_farmer)
    session.commit()
    session.refresh(new_farmer)
    
    return {
        "message": "Farmer registered successfully", 
        "user_id": new_user.id,
        "farmer_id": new_farmer.id
    }

# Register a transport provider
@router.post("/transport/register", status_code=201)
def register_transport_provider(
    data: TransportProviderCreate,
    session: Session = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    # Check if the user already exists
    existing_user = session.exec(select(User).where(User.email == data.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # Hash the password
    hashed_password = hash_password(data.password)
    
    # Create a new user
    new_user = User(
        email=data.email,
        username=data.username,
        password=hashed_password,
        role=UserRole.transport_provider
    )
    
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    
    # Create the transport provider
    # Assuming you have a TransportProvider model
    new_transport = TransportProvider(
        name=data.name,
        phone=data.phone,
        vehicle_type=data.vehicle_type, 
        location="Default Location",  # Replace with actual location if required
        user_id=new_user.id
    )
    
    session.add(new_transport)
    session.commit()
    session.refresh(new_transport)
    
    return {
        "message": "Transport provider registered successfully", 
        "user_id": new_user.id,
        "transport_id": new_transport.id
    }

# AgricultureAuthority registration
@router.post("/authority/register", status_code=201)
def register_agriculture_authority(
    data: AgricultureAuthorityCreate,
    session: Session = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    # Check if the user already exists
    existing_user = session.exec(select(User).where(User.email == data.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # Hash the password
    hashed_password = hash_password(data.password)
    
    # Create a new user
    new_user = User(
        email=data.email,
        username=data.username,
        password=hashed_password,
        role=UserRole.agricultural_authority
    )
    
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    
    # Create the agriculture authority
    # Assuming you have an AgricultureAuthority model
    new_authority = AgricultureAuthority(
        institution_name=data.institution_name,
        name=data.name,
        phone=data.phone,
        location=data.location,
        user_id=new_user.id
    )
    
    session.add(new_authority)
    session.commit()
    session.refresh(new_authority)
    
    return {
        "message": "Agriculture authority registered successfully", 
        "user_id": new_user.id,
        "authority_id": new_authority.id
    }

# User management endpoints
# View all users
@router.get("/users", response_model=List[UserRead])
def list_all_users(session: Session = Depends(get_session), 
                   admin_user: User = Depends(require_admin)):
    
    users = session.exec(select(User)).all()
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users

# Change user role
@router.patch("/users/{user_id}/role")
def change_user_role(user_id: int, new_role: UserRole, session: Session = Depends(get_session), 
                     admin_user: User = Depends(require_admin)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = new_role
    session.add(user)
    session.commit()
    session.refresh(user)
    return {"message": "Role updated", "user_id": user.id, "new_role": user.role}

# Deactivate a user
@router.delete("/users/{user_id}")
def deactivate_user(user_id: int, session: Session = Depends(get_session), 
                    admin_user: User = Depends(require_admin)):
    
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_active = False
    session.add(user)
    session.commit()
    return {"message": "User deactivated"}

