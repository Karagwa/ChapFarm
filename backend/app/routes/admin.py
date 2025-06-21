from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, func
from typing import List

from app.models import AgricultureAlert, AgricultureAuthority, FarmerReport, TransportProvider, TransportRequest, User, Farmer, UserRole, WeatherAlert
from app.schemas import AdminDashboardSummaryResponse, UserCreate, UserRead, FarmerCreate, TransportProviderCreate, AgricultureAuthorityCreate, AdminCreate, RecentReportResponse, RecentActivityResponse
from app.database import get_session
from app.auth.security import hash_password
from app.auth.jwt_handler import decode_access_token, require_admin, require_transport_provider


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



@router.get(
    "/dashboard/summary",
    response_model=AdminDashboardSummaryResponse
)
def get_dashboard_summary(
    session: Session = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    """
    Retrieves summary statistics for the admin dashboard.
    Requires admin authentication.
    """
    try:
        # Use func.count() for efficient counting
        registered_users = session.exec(
            select(func.count(User.id))
        ).one()
        
        registered_farmers = session.exec(
            select(func.count(Farmer.id))
        ).one()
        
        registered_transport_providers = session.exec(
            select(func.count(TransportProvider.id))
        ).one()
        
        registered_authorities = session.exec(
            select(func.count(AgricultureAuthority.id))
        ).one()
        
        total_reports = session.exec(
            select(func.count(FarmerReport.id))
        ).one()
        
        pending_reports = session.exec(
            select(func.count(FarmerReport.id)).where(
                FarmerReport.status == "pending"
            )
        ).one()
        
        total_transport_requests = session.exec(
            select(func.count(TransportRequest.id))
        ).one()
        
        pending_transport_requests = session.exec(
            select(func.count(TransportRequest.id)).where(
                TransportRequest.status == "pending"
            )
        ).one()
        
        total_weather_alerts = session.exec(
            select(func.count(WeatherAlert.id))
        ).one()
        
        total_agriculture_alerts = session.exec(
            select(func.count(AgricultureAlert.id))
        ).one()

        # Return with field names matching the schema
        return AdminDashboardSummaryResponse(
            registered_users=registered_users,
            registered_farmers=registered_farmers,
            registered_transport_providers=registered_transport_providers,
            registered_authorities=registered_authorities,
            total_reports=total_reports,
            pending_reports=pending_reports,
            total_transport_requests=total_transport_requests,
            pending_transport_requests=pending_transport_requests,
            total_weather_alerts=total_weather_alerts,
            total_agriculture_alerts=total_agriculture_alerts
        )
        
    except Exception as e:
        print(f"Error in get_dashboard_summary: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve dashboard summary: {str(e)}"
        )

@router.get("/farmers")
def list_farmers(session: Session = Depends(get_session), admin_user: User = Depends(require_admin)):
    return session.exec(select(Farmer)).all()

@router.get("/transport-providers")
def list_transport_providers(session: Session = Depends(get_session), admin_user: User = Depends(require_admin)):
    return session.exec(select(TransportProvider)).all()

@router.get("/agriculture-authorities")
def list_agriculture_authorities(session: Session = Depends(get_session), admin_user: User = Depends(require_admin)):
    return session.exec(select(AgricultureAuthority)).all()

@router.get("/recent-reports")
def get_recent_reports(
    limit: int = 10,
    session: Session = Depends(get_session),
    admin_user: User = Depends(require_admin)
) -> List[RecentReportResponse]:
    """Get recent farmer reports"""
    reports = session.exec(
        select(FarmerReport, Farmer.name, Farmer.phone)
        .join(Farmer, FarmerReport.farmer_id == Farmer.id)
        .order_by(FarmerReport.timestamp.desc())
        .limit(limit)
    ).all()
    
    return [
        RecentReportResponse(
            id=report.FarmerReport.id,
            farmer_name=report.name,
            issue_type=report.FarmerReport.issue_type,
            description=report.FarmerReport.description,
            location=report.FarmerReport.location,
            status=report.FarmerReport.status,
            date=report.FarmerReport.timestamp.strftime("%d/%m/%Y"),
            phone=report.phone
        )
        for report in reports
    ]

@router.get("/recent-activity")
def get_recent_activity(
    limit: int = 10,
    session: Session = Depends(get_session),
    admin_user: User = Depends(require_admin)
) -> List[RecentActivityResponse]:
    """Get recent system activity"""
    
    # Get recent user registrations
    recent_users = session.exec(
        select(User)
        .order_by(User.created_at.desc())
        .limit(5)
    ).all()
    
    # Get recent report resolutions
    recent_resolved = session.exec(
        select(FarmerReport, Farmer.name)
        .join(Farmer, FarmerReport.farmer_id == Farmer.id)
        .where(FarmerReport.status == "resolved")
        .order_by(FarmerReport.timestamp.desc())
        .limit(5)
    ).all()
    
    activities = []
    
    # Add user registrations to activity
    for user in recent_users:
        activities.append(RecentActivityResponse(
            user=f"Admin User",
            activity=f"Created user account - {user.role.title()}",
            date=user.created_at.strftime("%d/%m/%Y"),
            timestamp=user.created_at
        ))
    
    # Add resolved reports to activity
    for report in recent_resolved:
        activities.append(RecentActivityResponse(
            user="Agricultural Authority",
            activity=f"Resolved issue - {report.FarmerReport.issue_type} report from {report.name}",
            date=report.FarmerReport.timestamp.strftime("%d/%m/%Y"),
            timestamp=report.FarmerReport.timestamp
        ))
    
    # Sort by timestamp and return latest
    activities.sort(key=lambda x: x.timestamp, reverse=True)
    return activities[:limit]