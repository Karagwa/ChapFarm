from fastapi import APIRouter, Depends, Request, Form
from fastapi.responses import PlainTextResponse
from sqlmodel import Session, select
from app.database import get_session
from app.models import Farmer, FarmerReport, TransportRequest, USSDSession, WeatherAlert, WeatherData
from datetime import datetime
from ..services.weather import format_weather_response
from app.models import Advice
from app.utils.AI_support import get_ai_advice
import json
import traceback # Import for detailed error logging

router = APIRouter()

@router.post("/ussd")
async def ussd_callback(
    sessionId: str = Form(...),
    serviceCode: str = Form(...),
    phoneNumber: str = Form(...),
    text: str = Form(""),
    session: Session = Depends(get_session)
):
    response = ""
    user_input = text.strip()

    try:
        # Get or create session
        db_session = session.exec(select(USSDSession).where(USSDSession.session_id == sessionId)).first()
        if not db_session:
            db_session = USSDSession(
                session_id=sessionId,
                phone_number=phoneNumber,
                last_step="INITIAL",
                farmer_id=None,
                temp_data={}
            )
            session.add(db_session)
            # No commit here yet, will commit at the end if successful

        # Get farmer associated with the phone number
        farmer = session.exec(select(Farmer).where(Farmer.phone == phoneNumber)).first()

        # CRITICAL FIX: Ensure db_session.farmer_id is always up-to-date
        # If a farmer exists for this phone number, link it to the session.
        # This covers cases where a session might have been created before registration,
        # or if db_session.farmer_id somehow became stale.
        if farmer and db_session.farmer_id != farmer.id:
            db_session.farmer_id = farmer.id
            session.add(db_session) # Mark db_session for update

        last_step = db_session.last_step or "INITIAL"

        # Initialize temp_data if it's None (important for new sessions or corrupted data)
        if db_session.temp_data is None:
            db_session.temp_data = {}

        # --- USSD Workflow Logic ---

        # INITIAL entry point or unhandled state
        if last_step == "INITIAL":
            if farmer:
                response = """CON Welcome back to ChapFarm
1. Get Weather Update
2. View Weather Alerts
3. Get Advice
4. Report issue
5. Request transport"""
            else:
                response = """CON Welcome to ChapFarm
1. Register
2. Get Weather (Guest)"""
            db_session.last_step = "MAIN_MENU"

        # MAIN_MENU handling user choices
        elif last_step == "MAIN_MENU":
            if not farmer: # Guest user
                if user_input == "1":
                    response = "CON Enter your full name:"
                    db_session.last_step = "REGISTER_NAME"
                elif user_input == "2":
                    response = """CON Weather Options:
1. Current Weather
2. 5-Day Forecast"""
                    db_session.last_step = "GUEST_WEATHER"
                else:
                    response = "END Invalid option. Please try again."
            else: # Registered farmer
                if user_input == "1":
                    response = """CON Weather Options:
1. Current Weather
2. 5-Day Forecast"""
                    db_session.last_step = "FARMER_WEATHER"
                elif user_input == "2":
                    response = "CON Enter your location for weather alerts:"
                    db_session.last_step = "ALERT_RESPONSE"
                elif user_input == "3":
                    response = "CON Enter your advice request:"
                    db_session.last_step = "GET_ADVICE"
                elif user_input == "4":
                    response = "CON Enter your issue type:"
                    db_session.last_step = "REPORT_ISSUE"
                elif user_input == "5":
                    response = """CON Select transport need:
1. Bicycle
2. Motorcycle
3. Van
4. Lorry"""
                    db_session.last_step = "REQUEST_TRANSPORT"
                else:
                    response = "END Invalid option. Please try again."

        # REGISTRATION flow
        elif last_step == "REGISTER_NAME":
            
            
            response = "CON Enter your location:"
            db_session.last_step = "REGISTER_LOCATION"

        elif last_step == "REGISTER_LOCATION":
            
            response = "CON Enter your region:"
            db_session.last_step = "REGISTER_REGION"
        # user_INPUT is return as 1*Ann Karagwa*Kampala*Central which is split by '*' to get the name, location, and region
        elif last_step == "REGISTER_REGION":
            user_input = user_input.strip().split("*") # Split by '*'
            name = user_input[1].strip() if len(user_input) > 0 else "Unknown" # this user_input[1] is the name
            location = user_input[2].strip() if len(user_input) > 1 else "Unknown"
            region = user_input[3].strip() if len(user_input) > 2 else "Unknown"
            new_farmer = Farmer(
                name=name,
                phone=phoneNumber,
                location=location,
                region=region # Assuming 'region' column exists in Farmer model
            )
            session.add(new_farmer)
            # No commit here yet. ID will be available after add for current transaction.
            # session.commit() # Removed
            # session.refresh(new_farmer) # Removed, not strictly needed before final commit

            # Link the newly created farmer's ID to the USSD session
            db_session.farmer_id = new_farmer.id
            response = f"""END Registration successful!
Name: {name}
Location: {location}
Region: {region}
You can now access full features."""
            db_session.last_step = "REGISTER_COMPLETE"

        # WEATHER inquiry flow
        elif last_step in ["FARMER_WEATHER", "GUEST_WEATHER"]:
            response = "CON Enter the location:"
            db_session.last_step = "WEATHER_ENTER_LOCATION"

        elif last_step == "WEATHER_ENTER_LOCATION":
            # user_input is expected to be like 1*1*Kampala
            user_input=user_input.split("*")
            option = user_input[1].strip() # Get the weather option selected
            location = user_input[2].strip() if len(user_input) > 2 else "Unknown" # Use user input location
            try:
                response = await format_weather_response(option, location)
                db_session.last_step = "WEATHER_RESPONSE"
            except Exception as e:
                print(f"Weather error: {e}")
                response = f"END Error fetching weather data. Please try again later. The error is {e}"
                db_session.last_step = "INITIAL" # Reset on error

        # GET ADVICE flow
        elif last_step == "GET_ADVICE":
            # user_input is expected to be like 1*Drought
            user_input = user_input.strip().split("*") # Split by '*'
            issue = user_input[1]
            try:
                advice_text = await get_ai_advice(user_input=issue, session=session)
                
                # session.commit() # Removed, commit at the end
                response = f"END Advice:\n{advice_text}"
            except Exception as e:
                print("AI ERROR:", e)
                response = "END Sorry, we couldn't get advice right now. Try again later."
            db_session.last_step = "ADVICE_RESPONSE"
            
        # WEATHER ALERTS flow
        elif last_step == "ALERT_ENTER_LOCATION":
            location = user_input.strip() # User input is directly the location
            if not location:
                response = "END Location cannot be empty for weather alerts. Please try again."
                db_session.last_step = "INITIAL"
            else:
                try:
                    # Call the dedicated format_alert_response function
                    response = await format_alert_response(location, session)
                    db_session.last_step = "ALERT_RESPONSE_FINAL" # A distinct state for final alert response
                    # No need to clear temp_data here, as only location was captured
                except Exception as e:
                    print(f"Alerts error: {traceback.format_exc()}")
                    response = "END Error fetching weather alerts. Please try again later."
                    db_session.last_step = "INITIAL"
            

        # REPORT ISSUE flow
        elif last_step == "REPORT_ISSUE":
            # user input is -4*Drought*Crops are drying out so we need to split by '*'
            
            response = "CON Enter your issue description:"
            db_session.last_step = "REPORT_DESCRIPTION"

        elif last_step == "REPORT_DESCRIPTION":
            user_input = user_input.strip().split("*")
            issue_type = user_input[1].strip() if len(user_input) > 1 else "Unknown" # this user_input[1] is the issue type
            description = user_input[2].strip() if len(user_input) > 2 else "No description provided"

            # CRITICAL CHECK: Ensure farmer_id is available before creating FarmerReport
            if db_session.farmer_id is None:
                response = "END You must be a registered farmer to report an issue. Please register first."
                db_session.last_step = "INITIAL" # Reset session
            else:
                # Get farmer's location for the report if needed by FarmerReport model
                current_farmer_location = farmer.location if farmer else "Unknown" # Assuming 'farmer' is still in scope

                new_report = FarmerReport(
                    farmer_id=db_session.farmer_id,
                    issue_type=issue_type,    # Matching database column name 'issue_type'
                    description=description,  # Matching database column name 'description'
                    location=current_farmer_location, # Adding location based on previous log
                    status="Pending"          # Explicitly setting status as per previous log
                )
                session.add(new_report)
                # session.commit() # Removed, commit at the end
                response = f"END Report submitted successfully!\nIssue: {issue_type}\nDescription: {description}"
                db_session.last_step = "REPORT_COMPLETE"

        # REQUEST TRANSPORT flow
        elif last_step == "REQUEST_TRANSPORT":
            
            transport_map = {
                "1": "Bicycle",
                "2": "Motorcycle",
                "3": "Van",
                "4": "Lorry"
            }
            
            response = "CON Enter pickup location:"
            db_session.last_step = "TRANSPORT_PICKUP"
           

        elif last_step == "TRANSPORT_PICKUP":
            db_session.temp_data["pickup_location"] = user_input
            response = "CON Enter delivery location:"
            db_session.last_step = "TRANSPORT_DELIVERY"

        elif last_step == "TRANSPORT_DELIVERY":
            user_input = user_input.strip().split("*") # Split by '*'
            
            transport_type = user_input[1].strip() if len(user_input) > 1 else db_session.temp_data.get("transport_type", "Unknown")
            if transport_type is "1":
                transport_type = "Bicycle"
            elif transport_type is "2":
                transport_type = "Motorcycle"
            elif transport_type is "3":
                transport_type = "Van"
            elif transport_type is "4":
                transport_type = "Lorry"
            else:
                transport_type = "Unknown"
            pickup_location = user_input[2].strip() if len(user_input) > 2 else db_session.temp_data.get("pickup_location", "Unknown")
            delivery_location = user_input[3].strip() if len(user_input) > 3 else "Unknown"

            # CRITICAL CHECK: Ensure farmer_id is available before creating TransportRequest
            if db_session.farmer_id is None:
                response = "END You must be a registered farmer to request transport. Please register first."
                db_session.last_step = "INITIAL" # Reset session
            else:
                new_transport_request = TransportRequest(
                    farmer_id=db_session.farmer_id,
                    pickup_location=pickup_location,
                    destination=delivery_location,
                    cargo_type=transport_type,
                    status="pending"
                )
                session.add(new_transport_request)
                # session.commit() # Removed, commit at the end
                response = f"END Transport request submitted successfully!\nType: {transport_type}\nPickup: {pickup_location}\nDelivery: {delivery_location}"
                db_session.last_step = "TRANSPORT_COMPLETE"

        # Fallback for unhandled states or session expiry
        else:
            response = "END Session expired or invalid state. Please try again."
            db_session.last_step = "INITIAL" # Reset to initial state

        # --- Final session update and commit for the entire request ---
        db_session.updated_at = datetime.utcnow()
        session.add(db_session) # Ensure db_session is in the session for update
        session.commit() # Commit all changes made within this request
        session.refresh(db_session) # Refresh to get any updated auto-generated fields

        return PlainTextResponse(response)

    except Exception as e:
        session.rollback() # Rollback all changes if any error occurs during processing
        print(f"An error occurred during USSD callback: {e}")
        traceback.print_exc() # Print full traceback for detailed debugging
        return PlainTextResponse("END An unexpected error occurred. Please try again later.")





async def format_alert_response(location: str, session: Session) -> str:
    """
    Fetches and formats active weather alerts for a given location from the database.
    """
    try:
        now = datetime.utcnow() # Use UTC for comparison with stored timestamps

        # Query the database for active alerts for the specified location
        # Filter by location (case-insensitive) and ensure the alert is currently effective
        stmt = select(WeatherAlert).where(
            WeatherAlert.location.ilike(f"%{location}%"), # Case-insensitive search
            WeatherAlert.effective_time <= now,
            WeatherAlert.expires_time >= now
        )
        
        result = await session.exec(stmt)
        alerts = result.scalars().all() # Get all matching alert objects

        if not alerts:
            return f"END No active weather alerts found for {location}."
        
        alert_messages = []
        alert_messages.append(f"END Active Weather Alerts for {location}:")
        for alert in alerts:
            # Format each alert nicely using fields from your WeatherAlert model
            alert_messages.append(
                f"- **{alert.alert_type}** ({alert.severity}, {alert.urgency_level}): {alert.alert_message}"
                f"\n Effective: {alert.effective_time.strftime('%Y-%m-%d %H:%M UTC')}"
                f"\n Expires: {alert.expires_time.strftime('%Y-%m-%d %H:%M UTC')}"
            )
        
        # Concatenate messages, ensuring they fit within USSD character limits if needed
        # (A single alert might be long, consider truncating or paginating for production)
        return "\n".join(alert_messages)

    except Exception as e:
        print(f"Error fetching alerts from database: {traceback.format_exc()}")
        # Do NOT expose raw exception details to the user in a production environment
        return "END Failed to retrieve weather alerts. Please try again later."