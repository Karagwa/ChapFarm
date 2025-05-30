from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..models import AgricultureAlert, FarmerReport
from typing import List

from ..database import get_session



router= APIRouter(prefix="/agric_auth", tags=["Agric Authority"])
@router.get("/Reports", response_model=List[FarmerReport])
async def get_reports(session: Session = Depends(get_session)):
    reports = session.exec(select(FarmerReport)).all() # Fetch all reports
    if not reports:
        raise HTTPException(status_code=404, detail="No Reports found")
    else:
        return reports

@router.post("/Agric_alerts")
async def create_agric_alert(alert: AgricultureAlert, session: Session = Depends(get_session)):
    agric_alert = AgricultureAlert(
        alert_type=alert.alert_type,
        description=alert.description,
        severity=alert.severity,
        authority_id=alert.authority_id,  # Include authority_id
    )
    session.add(agric_alert)
    session.commit()
    session.refresh(agric_alert)
    #TODO: send notification to farmers via USSD
    return agric_alert
    
#Add message to farmers via USSD   
