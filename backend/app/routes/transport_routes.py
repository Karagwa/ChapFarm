from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.models import TransportRequest, User
from app.database import get_session

from app.auth.jwt_handler import decode_access_token, require_transport_provider

router= APIRouter(prefix="/transport", tags=["Transport"])

@router.get("/tranport_requests", response_model=List[TransportRequest])
async def get_transport_requests(
    session: Session = Depends(get_session),
        transport_provider: User = Depends(require_transport_provider),
    ):
        transport_requests = session.execute(select(TransportRequest)).scalars().all()
        if not transport_requests:
            raise HTTPException(status_code=404, detail="No transport requests found")
        return transport_requests

@router.patch("/transport_requests/{request_id}", response_model=TransportRequest)
async def update_transport_request(
    request_id: int, request: TransportRequest,
    session: Session = Depends(get_session),
    transport_provider: User = Depends(require_transport_provider)
    ):
    db_request = session.get(TransportRequest, request_id)
    if not db_request:
        raise HTTPException(status_code=404, detail="Transport request not found")
    db_request.status = request.status
    
    session.add(db_request)
    session.commit()
    session.refresh(db_request)
    #TODO send notification to farmer via USSD
    return db_request     

