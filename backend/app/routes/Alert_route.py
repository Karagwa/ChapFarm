from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from ..models import AlertRequest, Farmer, AgricultureAlert
from ..database import get_session
import africastalking
from datetime import datetime

# Initialize Africa's Talking
africastalking.initialize(
    username='sandbox',
    api_key='atsk_ed7ac825ff115627674527ffb114b2c2382ffbb6874ed0957cbbab1efa2b81ad4308e5ed'
)
sms = africastalking.SMS

alert_router = APIRouter(prefix="/alerts", tags=["Alerts"])

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

    # Store the alert in the database
    db_alert = AgricultureAlert(
        alert_type=alert.alert_type,
        description=alert.message,
        severity=alert.severity,
        timestamp=datetime.utcnow(),
        # Optionally set authority_id if you have it in the request or session
    )
    session.add(db_alert)
    session.commit()
    session.refresh(db_alert)

    try:
        result = sms.send(
            f"{alert.title}\n{alert.message}",
            phone_numbers,
            sender_id="78954"
        )
        return {"status": "success", "result": result, "alert_id": db_alert.id}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f"Failed to send alert: {str(ex)}")

# Make alert_router available for import
__all__ = ["alert_router"]