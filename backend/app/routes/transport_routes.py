from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.models import TransportRequest, User, Farmer
from app.database import get_session
from app.auth.jwt_handler import require_transport_provider
from pydantic import BaseModel
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/transport", tags=["Transport"])

class StatusUpdateRequest(BaseModel):
    status: str

@router.get("/transport_requests")
async def get_transport_requests(
    session: Session = Depends(get_session),
    transport_provider: User = Depends(require_transport_provider),
):
    """Get all transport requests with farmer details"""
    try:
        # Join TransportRequest with Farmer to get farmer details
        query = select(TransportRequest, Farmer).join(
            Farmer, TransportRequest.farmer_id == Farmer.id
        ).order_by(TransportRequest.timestamp.desc())
        
        results = session.exec(query).all()
        
        if not results:
            return []
        
        # Transform the results to match your exact model structure
        transport_requests = []
        for transport_request, farmer in results:
            transport_requests.append({
                "id": transport_request.id,
                "farmer_id": transport_request.farmer_id,
                "farmer_name": farmer.name,
                "farmer_phone": farmer.phone,
                "farmer_location": farmer.location,
                "transport_type": transport_request.transport_type,
                "pickup_location": transport_request.pickup_location,
                "dropoff_location": transport_request.dropoff_location,
                "status": transport_request.status,
                "timestamp": transport_request.timestamp.isoformat(),
            })
        
        return transport_requests
        
    except Exception as e:
        print(f"Error fetching transport requests: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch transport requests")

@router.patch("/transport_requests/{request_id}")
async def update_transport_request(
    request_id: int, 
    status_update: StatusUpdateRequest,  # Properly typed Pydantic model
    session: Session = Depends(get_session),
    transport_provider: User = Depends(require_transport_provider)
):
    """Update transport request status"""
    try:
        logger.info(f"Transport provider {transport_provider.id} updating request {request_id} to status {status_update.status}")
        
        # Get the transport request
        db_request = session.get(TransportRequest, request_id)
        if not db_request:
            logger.warning(f"Transport request {request_id} not found")
            raise HTTPException(status_code=404, detail="Transport request not found")
        
        # Validate status
        valid_statuses = ["Pending", "Accepted", "Rejected", "Completed", "Cancelled", "In Transit"]
        
        if status_update.status not in valid_statuses:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid status '{status_update.status}'. Must be one of: {valid_statuses}"
            )
        
        # Validate status transitions to prevent invalid state changes
        current_status = db_request.status
        valid_transitions = {
            "Pending": ["Accepted", "Rejected", "Cancelled"],
            "Accepted": ["In Transit", "Cancelled"],
            "In Transit": ["Completed", "Cancelled"],
            "Completed": [],  # Final state
            "Rejected": [],   # Final state
            "Cancelled": []   # Final state
        }
        
        if (current_status in valid_transitions and 
            status_update.status not in valid_transitions[current_status]):
            raise HTTPException(
                status_code=400,
                detail=f"Cannot transition from '{current_status}' to '{status_update.status}'. Valid transitions: {valid_transitions.get(current_status, [])}"
            )
        
        # Store old status for logging and response
        old_status = db_request.status
        
        # Update the status
        db_request.status = status_update.status
        
        # Add timestamp for updates if your model supports it
        from datetime import datetime
        if hasattr(db_request, 'updated_at'):
            db_request.updated_at = datetime.utcnow()
        
        session.add(db_request)
        session.commit()
        session.refresh(db_request)
        
        logger.info(f"Successfully updated transport request {request_id} from '{old_status}' to '{status_update.status}'")
        
        return {
            "message": f"Transport request {request_id} status updated from '{old_status}' to '{status_update.status}'",
            "request_id": request_id,
            "old_status": old_status,
            "new_status": status_update.status,
            "success": True
        }
        
    except HTTPException:
        session.rollback()
        raise
    except Exception as e:
        session.rollback()
        logger.error(f"Unexpected error updating transport request {request_id}: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to update transport request: {str(e)}"
        )

@router.get("/transport_requests/history")
async def get_transport_history(
    session: Session = Depends(get_session),
    transport_provider: User = Depends(require_transport_provider)
):
    """Get transport history for completed/cancelled requests"""
    try:
        query = select(TransportRequest, Farmer).join(
            Farmer, TransportRequest.farmer_id == Farmer.id
        ).where(
            TransportRequest.status.in_(["Completed", "Cancelled", "Rejected"])
        ).order_by(TransportRequest.timestamp.desc())
        
        results = session.exec(query).all()
        
        if not results:
            return []
        
        # Transform the results
        history = []
        for transport_request, farmer in results:
            history.append({
                "id": transport_request.id,
                "farmer_id": transport_request.farmer_id,
                "farmer_name": farmer.name,
                "farmer_phone": farmer.phone,
                "farmer_location": farmer.location,
                "transport_type": transport_request.transport_type,
                "pickup_location": transport_request.pickup_location,
                "dropoff_location": transport_request.dropoff_location,
                "status": transport_request.status,
                "timestamp": transport_request.timestamp.isoformat(),
            })
        
        return history
        
    except Exception as e:
        print(f"Error fetching transport history: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch transport history")

# Add this new endpoint to your existing transport_routes.py file

@router.get("/summary")
async def get_transport_summary(
    session: Session = Depends(get_session),
    transport_provider: User = Depends(require_transport_provider)
):
    """Get transport summary statistics for the dashboard"""
    try:
        # Get all transport requests
        all_requests_query = select(TransportRequest).join(
            Farmer, TransportRequest.farmer_id == Farmer.id
        )
        all_requests = session.exec(all_requests_query).all()
        
        # Calculate statistics
        total_requests = len(all_requests)
        active_requests = len([req for req in all_requests if req.status in ["Pending", "Accepted", "In Transit"]])
        completed_requests = len([req for req in all_requests if req.status == "Completed"])
        pending_requests = len([req for req in all_requests if req.status == "Pending"])
        accepted_requests = len([req for req in all_requests if req.status == "Accepted"])
        in_transit_requests = len([req for req in all_requests if req.status == "In Transit"])
        rejected_requests = len([req for req in all_requests if req.status == "Rejected"])
        cancelled_requests = len([req for req in all_requests if req.status == "Cancelled"])
        
        # Get recent activity (last 7 days)
        from datetime import datetime, timedelta
        seven_days_ago = datetime.utcnow() - timedelta(days=7)
        recent_requests = len([req for req in all_requests if req.timestamp >= seven_days_ago])
        
        # Get today's requests
        today = datetime.utcnow().date()
        today_requests = len([req for req in all_requests if req.timestamp.date() == today])
        
        return {
            "total_requests": total_requests,
            "active_requests": active_requests,
            "completed_requests": completed_requests,
            "pending_requests": pending_requests,
            "accepted_requests": accepted_requests,
            "in_transit_requests": in_transit_requests,
            "rejected_requests": rejected_requests,
            "cancelled_requests": cancelled_requests,
            "recent_requests": recent_requests,
            "today_requests": today_requests,
            "status_breakdown": {
                "Pending": pending_requests,
                "Accepted": accepted_requests,
                "In Transit": in_transit_requests,
                "Completed": completed_requests,
                "Rejected": rejected_requests,
                "Cancelled": cancelled_requests
            }
        }
        
    except Exception as e:
        print(f"Error fetching transport summary: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch transport summary")