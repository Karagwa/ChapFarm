from jose import JWTError, jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import APIKeyHeader, OAuth2PasswordBearer
from sqlmodel import Session, select
from app.database import get_session
from app.models import User
load_dotenv()

SECRET_KEY= os.getenv("JWT_SECRET_KEY", "supersecret")
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")
def create_access_token(data: dict):
    to_encode = data.copy()
    # Convert sub to string if it exists
    if 'sub' in to_encode:
        to_encode['sub'] = str(to_encode['sub'])
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    
def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # Debug 1: Verify token is received
    print(f"Received token: {token}")  
    
    try:
        # Debug 2: Verify secret key and algorithm
        print(f"Using SECRET_KEY: {SECRET_KEY}, ALGORITHM: {ALGORITHM}")
        
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"Decoded payload: {payload}")  # Debug 3
        
        user_id = payload.get("sub")
        if user_id is None:
            print("Error: 'sub' claim missing in token")  # Debug 4
            raise credentials_exception
            
        try:
            user_id = int(user_id)
        except ValueError:
            print(f"Error: 'sub' claim is not integer: {user_id}")  # Debug 5
            raise credentials_exception
            
    except JWTError as e:
        print(f"JWT Error: {str(e)}")  # Debug 6
        raise credentials_exception

    # Debug 7: Verify user lookup
    user = session.exec(select(User).where(User.id == user_id)).first()
    print(f"User lookup result: {user}")
    
    if user is None:
        print(f"No user found for ID: {user_id}")  # Debug 8
        raise credentials_exception

    return user


def require_admin(user: User = Depends(get_current_user)) -> User:
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admins only!")
    return user

def require_transport_provider(user: User = Depends(get_current_user)) -> User:
    if user.role != "transport_provider":
        raise HTTPException(status_code=403, detail="Only transport providers allowed")
    return user

def require_agriculture_authority(user: User = Depends(get_current_user)) -> User:
    if user.role != "agriculture_authority":
        raise HTTPException(status_code=403, detail="Only agriculture authorities allowed")
    return user
