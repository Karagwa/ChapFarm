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

@router.patch("/reports/{report_id}/resolve")
async def resolve_farmer_report(report_id: int, session: Session = Depends(get_session)):
    report = session.get(FarmerReport, report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    report.status = "resolved"  # make sure your `FarmerReport` model has a status field
    session.add(report)
    session.commit()
    session.refresh(report)

    return {"message": "Report marked as resolved", "report_id": report.id, "status": report.status}


@router.get("/reports/summary")
async def get_report_summary(session: Session = Depends(get_session)):
    all_reports = session.exec(select(FarmerReport)).all()
    summary = {
        "total": len(all_reports),
        "pending": 0,
        "resolved": 0,
    }
    
    for report in all_reports:
        if report.status == "pending":
            summary["pending"] += 1
        elif report.status == "resolved":
            summary["resolved"] += 1

    return summary

@router.get("/alerts/count")
async def get_alert_count(session: Session = Depends(get_session)):
    alerts = session.exec(select(AgricultureAlert)).all()
    return {
        "total_alerts": len(alerts)
    }
