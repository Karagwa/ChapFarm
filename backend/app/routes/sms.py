from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import List, Optional
import africastalking

from ..models import AlertRequest, Farmer, AgricultureAlert
from ..database import get_session

# Initialize Africa's Talking
africastalking.initialize(
    username='sandbox',
    api_key='atsk_ed7ac825ff115627674527ffb114b2c2382ffbb6874ed0957cbbab1efa2b81ad4308e5ed'
)
sms = africastalking.SMS

sms_router = APIRouter(prefix="/sms", tags=["SMS"])
alert_router = APIRouter(prefix="/alerts", tags=["Alerts"])

# Define request body model for bulk SMS
class BulkSMSRequest(BaseModel):
    phone_numbers: List[str]
    message: str
    from_: Optional[str] = "ChapFarm"  # Default sender ID
    telco: Optional[str] = None  # Optional telco parameter (e.g., "Safaricom")

@sms_router.post("/send-bulk-sms/")
def send_bulk_sms(request: BulkSMSRequest, session: Session = Depends(get_session)):
    try:
        result = sms.send(
            to=request.phone_numbers,
            message=request.message,
            from_=request.from_,
            telco=request.telco  # Include telco if provided
        )
        return {"status": "success", "result": result}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))

# Keep existing single SMS route
@sms_router.post("/send-sms/")
def send_sms(request: BulkSMSRequest, session: Session = Depends(get_session)):
    try:
        result = sms.send(
            to=[request.phone_numbers[0]],  # Use the first number for single SMS
            message=request.message,
            from_=request.from_
        )
        return {"status": "success", "result": result}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))

@alert_router.post("/send")
def send_alert(alert: AlertRequest, session: Session = Depends(get_session)):
    print("Region received:", alert.region)  # Debug print

    if alert.region == "All":
        statement = select(Farmer.phone)
    else:
        statement = select(Farmer.phone).where(Farmer.region == alert.region)
    results = session.exec(statement).all()
    print("Query results:", results)  # Debug print

    phone_numbers = results
    print("Phone numbers:", phone_numbers)  # Debug print

    if not phone_numbers:
        raise HTTPException(status_code=404, detail="No phone numbers found for the selected region.")

    try:
        result = sms.send(
            f"{alert.title}\n{alert.message}",
            phone_numbers,
            sender_id="78954"
        )
        return {"status": "success", "result": result}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f"Failed to send alert: {str(ex)}")

# Export routers for main.py
__all__ = ["sms_router", "alert_router"]