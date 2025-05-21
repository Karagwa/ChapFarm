import datetime
from fastapi import APIRouter, HTTPException, Query
from typing import List, Annotated
from sqlmodel import select
from ..models import Farmer, FarmerReport, WeatherAlert
from ..database import SessionDep

router = APIRouter(prefix="/farmers", tags=["Farmers"])

@router.post("")
def create_farmer(farmer: Farmer, session: SessionDep) -> Farmer:
    farmer.registered_at = datetime.datetime.now()
    session.add(farmer)
    session.commit()
    session.refresh(farmer)
    return farmer

@router.get("")
def read_farmers(session: SessionDep, offset: int = 0, limit: Annotated[int, Query(le=100)] = 100) -> List[Farmer]:
    return list(session.exec(select(Farmer).offset(offset).limit(limit)).all())

@router.get("/{farmer_id}")
def read_farmer_by_id(farmer_id: int, session: SessionDep) -> Farmer:
    farmer = session.get(Farmer, farmer_id)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return farmer

@router.delete("/{farmer_id}")
def delete_farmer(farmer_id: int, session: SessionDep) -> str:
    farmer = session.get(Farmer, farmer_id)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    session.delete(farmer)
    session.commit()
    return "Farmer deleted successfully"

# Farmer Reports Endpoints
@router.post("/reports")
def create_farmer_report(report: FarmerReport, session: SessionDep) -> FarmerReport:
    session.add(report)
    session.commit()
    session.refresh(report)
    return report

@router.get("/reports")
def read_farmer_reports(session: SessionDep) -> List[FarmerReport]:
    return list(session.exec(select(FarmerReport)).all())

@router.get("/alerts")
def read_weather_alerts(session: SessionDep) -> List[WeatherAlert]:
    return list(session.exec(select(WeatherAlert)).all())