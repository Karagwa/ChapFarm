from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from pydantic import BaseModel
from typing import List, Optional
import africastalking

from ..schemas import SMSRequest
from ..database import get_session

# Initialize Africa's Talking
africastalking.initialize(
    username='your_username_here',
    api_key='your_api_key_here'
)
sms = africastalking.SMS

router = APIRouter(prefix="/sms", tags=["SMS"])

# Define request body model for bulk SMS
class BulkSMSRequest(BaseModel):
    phone_numbers: List[str]
    message: str
    from_: Optional[str] = "your_sender_id_here"  # Default sender ID
    telco: Optional[str] = None  # Optional telco parameter (e.g., "Safaricom")

@router.post("/send-bulk-sms/")
async def send_bulk_sms(request: BulkSMSRequest, session: Session = Depends(get_session)):
    try:
        result = await sms.send( #type: ignore
            to=request.phone_numbers,
            message=request.message,
            from_=request.from_,
            telco=request.telco  # Include telco if provided
        )
        return {"status": "success", "result": result}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))

# Keep existing single SMS route
@router.post("/send-sms/")
async def send_sms(request: SMSRequest, session: Session = Depends(get_session)):
    try:
        result = await sms.send(    #type: ignore
            to=[request.to],
            message=request.message,
            from_=request.from_
        )
        return {"status": "success", "result": result}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))