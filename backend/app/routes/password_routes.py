import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.database import get_session
from app.models import User
from app.schemas import PasswordResetRequest, PasswordResetConfirm
from app.auth.email_utils import send_reset_email
from app.auth.security import hash_password

import secrets

router = APIRouter(prefix="/password", tags=["Password Management"])

@router.post("/request-password-reset")
async def request_reset(data: PasswordResetRequest, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == data.email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    token = secrets.token_urlsafe(32)
    user.reset_token = token
    session.add(user)
    session.commit()

    await send_reset_email(user.email, token)
    return {"message": "Password reset email sent"}

@router.post("/reset-password")
def reset_password(data: PasswordResetConfirm, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.reset_token == data.token)).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid token")
    if user.reset_token_expiry < datetime.datetime.now():
        raise HTTPException(status_code=400, detail="Token has expired")
    user.hashed_password = hash_password(data.new_password)
    user.reset_token = None
    user.reset_token_expiry = datetime.datetime.min  # Reset to a default datetime
    session.add(user)
    session.commit()
    return {"message": "Password reset successful"}

