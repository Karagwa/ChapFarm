from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.database import get_session
from app.models import User
from app.schemas import UserCreate, LoginData, Token, UserRead
from app.auth.security import hash_password, verify_password
from app.auth.jwt_handler import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token)
def register(user: UserCreate, session: Session = Depends(get_session)):
    try:
        if session.exec(select(User).where(User.email == user.email)).first():
            raise HTTPException(status_code=400, detail="Email already registered")
        hashed = hash_password(user.password)
        db_user = User(
            email=user.email,
            username=user.username,
            password=hashed,
            role=user.role
        )
        print("Adding user to session...")
        session.add(db_user)
        print("Committing user to database...")
        session.commit()
        print("User committed to database.")
        registered_user = session.exec(select(User).where(User.email == user.email)).first()
        print("Registered user:", registered_user)
        if not registered_user:
            raise HTTPException(status_code=500, detail="Failed to retrieve registered user")
        token = create_access_token({"sub": registered_user.username, "role": registered_user.role})
        return {"access_token": token}
    except Exception as e:
        #session.rollback()
        print(f"Error registering user: {e}")
        raise HTTPException(status_code=500, detail="Failed to register user")


@router.post("/login", response_model=Token)
def login(login: LoginData, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.username == login.username)).first()
    if not user or not verify_password(login.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.username, "role": user.role})
    return {"access_token": token}

# @router.get("/users", response_model=User)
# def get_users(session: Session = Depends(get_session)):
#     users = session.exec(select(User)).all()
#     if not users:
#         raise HTTPException(status_code=404, detail="No users found")
#     return users

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
