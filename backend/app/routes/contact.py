from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from sqlmodel import Session
from ..database import get_session
from ..auth.email_utils import send_contact_email, send_contact_confirmation_email
import logging

router = APIRouter(prefix="/contact", tags=["contact"])

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

@router.post("/send")
async def send_contact_message(
    contact_data: ContactRequest,
    session: Session = Depends(get_session)
):
    """Handle contact form submission"""
    try:
        # Validate input
        if not contact_data.name.strip():
            raise HTTPException(status_code=400, detail="Name is required")
        
        if not contact_data.message.strip():
            raise HTTPException(status_code=400, detail="Message is required")
        
        if len(contact_data.message) > 2000:
            raise HTTPException(status_code=400, detail="Message is too long (max 2000 characters)")
        
        # Send email to support team
        await send_contact_email(
            name=contact_data.name.strip(),
            email=contact_data.email,
            message=contact_data.message.strip()
        )
        
        # Send confirmation email to user
        await send_contact_confirmation_email(
            to_email=contact_data.email,
            name=contact_data.name.strip()
        )
        
        return {
            "success": True,
            "message": "Thank you for your message! We'll get back to you within 24-48 hours."
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Contact form error: {e}")
        raise HTTPException(
            status_code=500, 
            detail="Failed to send message. Please try again later."
        )