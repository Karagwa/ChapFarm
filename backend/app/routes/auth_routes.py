from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.database import get_session
from app.models import User
from app.schemas import UserCreate, LoginData, Token, UserRead
from app.auth.security import hash_password, verify_password
from app.auth.jwt_handler import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])



from fastapi.security import OAuth2PasswordRequestForm

@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    user = session.exec(select(User).where(User.username == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Ensure sub is converted to string here
    token_data = {"sub": str(user.id), "role": user.role}
    return {"access_token": create_access_token(token_data)}


@router.get("/users", response_model=List[UserRead])
def get_users(session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return [
        UserRead(
            id=user.id if user.id is not None else 0,  # Default to 0 if id is None
            email=user.email,
            username=user.username,
            role=user.role
        )
        for user in users
    ]
