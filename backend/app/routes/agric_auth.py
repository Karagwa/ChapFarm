from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..models import AgricultureAlert, FarmerReport, Farmer
from typing import List
from app.auth.jwt_handler import require_agriculture_authority
from ..database import get_session

router = APIRouter(prefix="/agric_auth", tags=["Agric Authority"])

@router.get("/Reports", response_model=List[dict])
async def get_reports(session: Session = Depends(get_session), user=Depends(require_agriculture_authority)):
    """Get all farmer reports with farmer details"""
    try:
        # Join FarmerReport with Farmer to get farmer details
        query = select(FarmerReport, Farmer).join(
            Farmer, FarmerReport.farmer_id == Farmer.id
        ).order_by(FarmerReport.timestamp.desc())
        
        results = session.exec(query).all()
        
        if not results:
            return []
        
        # Transform the results to include farmer information
        reports_with_farmer = []
        for report, farmer in results:
            reports_with_farmer.append({
                "id": report.id,
                "farmer_id": report.farmer_id,
                "farmer_name": farmer.name,
                "farmer_phone": farmer.phone,
                "farmer_location": farmer.location,
                "issue_type": report.issue_type,
                "description": report.description,
                "location": report.location,
                "status": report.status,
                "timestamp": report.timestamp.isoformat(),
            })
        
        return reports_with_farmer
        
    except Exception as e:
        print(f"Error fetching reports: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch reports")

@router.post("/Agric_alerts")
async def create_agric_alert(alert: AgricultureAlert, session: Session = Depends(get_session), user=Depends(require_agriculture_authority)):
    agric_alert = AgricultureAlert(
        alert_type=alert.alert_type,
        description=alert.description,
        severity=alert.severity,
        authority_id=alert.authority_id,
    )
    session.add(agric_alert)
    session.commit()
    session.refresh(agric_alert)
    return agric_alert

@router.patch("/reports/{report_id}/resolve")
async def resolve_farmer_report(report_id: int, session: Session = Depends(get_session), user=Depends(require_agriculture_authority)):
    report = session.get(FarmerReport, report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    report.status = "Resolved"
    session.add(report)
    session.commit()
    session.refresh(report)

    return {"message": "Report marked as resolved", "report_id": report.id, "status": report.status}

@router.get("/reports/summary")
async def get_report_summary(session: Session = Depends(get_session), user=Depends(require_agriculture_authority)):
    """Get comprehensive report summary statistics"""
    try:
        all_reports = session.exec(select(FarmerReport)).all()
        
        summary = {
            "total_reports": len(all_reports),
            "pending_reports": 0,
            "resolved_reports": 0,
            "in_progress_reports": 0,
        }
        
        for report in all_reports:
            status = report.status.lower()
            if status == "pending":
                summary["pending_reports"] += 1
            elif status == "resolved":
                summary["resolved_reports"] += 1
            elif status == "in progress":
                summary["in_progress_reports"] += 1

        return summary
        
    except Exception as e:
        print(f"Error fetching report summary: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch report summary")

@router.get("/alerts/count")
async def get_alert_count(session: Session = Depends(get_session), user=Depends(require_agriculture_authority)):
    try:
        alerts = session.exec(select(AgricultureAlert)).all()
        return {
            "total_alerts": len(alerts)
        }
    except Exception as e:
        print(f"Error fetching alert count: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch alert count")
