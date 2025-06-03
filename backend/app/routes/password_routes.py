import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.database import get_session
from app.models import User
from app.schemas import PasswordResetRequest, PasswordResetConfirm
from app.auth.email_utils import send_reset_email, send_success_email
from app.auth.security import hash_password

import secrets

router = APIRouter(prefix="/password", tags=["Password Management"])

import random
import datetime

@router.post("/request-password-reset")
async def request_reset(data: PasswordResetRequest, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == data.email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Generate 6-digit numeric code
    code = str(random.randint(100000, 999999))
    expiry = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)

    user.reset_code = code
    user.reset_code_expiry = expiry
    session.add(user)
    session.commit()

    await send_reset_email(user.email, code)
    return {"message": "Password reset code sent to email"}


@router.post("/reset-password")
async def reset_password(data: PasswordResetConfirm, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.reset_code == data.code)).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid reset code")

    if not user.reset_code_expiry or user.reset_code_expiry < datetime.datetime.utcnow():
        raise HTTPException(status_code=400, detail="Reset code has expired")

    user.password = hash_password(data.new_password)
    user.reset_code = None
    user.reset_code_expiry = datetime.datetime.min
    session.add(user)
    session.commit()
    
    await send_success_email(user.email, "Your password has been successfully reset.")

    return {"message": "Password reset successful"}


