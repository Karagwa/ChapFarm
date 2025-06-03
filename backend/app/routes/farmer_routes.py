import datetime
from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Annotated
from sqlmodel import select
from ..models import Farmer, FarmerReport, WeatherAlert, User

from ..database import SessionDep
from app.auth.jwt_handler import decode_access_token, require_admin, require_agriculture_authority

router = APIRouter(prefix="/farmers", tags=["Farmers"])

@router.get("")
def read_farmers(session: SessionDep, offset: int = 0, limit: Annotated[int, Query(le=100)] = 100) -> List[Farmer]:
    return list(session.exec(select(Farmer).offset(offset).limit(limit)).all())

@router.get("/{farmer_id}")
def read_farmer_by_id(
    farmer_id: int,
    session: SessionDep,
    admin_user: User = Depends(require_admin)) -> Farmer:
    farmer = session.get(Farmer, farmer_id)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return farmer

@router.delete("/{farmer_id}")
def delete_farmer(farmer_id: int, session: SessionDep, admin_user: User = Depends(require_admin)) -> str:
    farmer = session.get(Farmer, farmer_id)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    session.delete(farmer)
    session.commit()
    return "Farmer deleted successfully"

# Farmer Reports Endpoints
# @router.post("/reports")
# def create_farmer_report(report: FarmerReport, session: SessionDep) -> FarmerReport:
#     session.add(report)
#     session.commit()
#     session.refresh(report)
#     return report

@router.get("/reports")
def read_farmer_reports(session: SessionDep, admin_user: User = Depends(require_admin)) -> List[FarmerReport]:
    return list(session.exec(select(FarmerReport)).all())

@router.get("/alerts")
def read_weather_alerts(session: SessionDep, admin_user: User = Depends(require_admin)) -> List[WeatherAlert]:
    return list(session.exec(select(WeatherAlert)).all())