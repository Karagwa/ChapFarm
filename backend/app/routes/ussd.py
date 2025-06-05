from fastapi import APIRouter, Depends, Request, Form
from fastapi.responses import PlainTextResponse
from httpx import request

from sqlmodel import Session, select
from app.database import get_session
from app.models import Farmer, FarmerReport, TransportRequest, USSDSession, WeatherData
from datetime import datetime
from ..services.weather import get_weather, get_forecast, get_weather_alert
from app.utils.AI_support import find_similar_advice
from app.models import Advice
from app.utils.AI_support import get_ai_advice

router = APIRouter()

#TODO: Refactor this code and remove the menu_stack variable and use a more efficient way to handle the menu stack
@router.post("/ussd/")
async def ussd_callback(
    session_id: str = Form(...),
    service_code: str = Form(...),
    phone_number: str = Form(...),
    text: str = Form(""),
    session=Depends(get_session)
):
    response = ""
    user_input = text.strip()

    # Get or create session
    db_session = session.exec(select(USSDSession).where(USSDSession.session_id == session_id)).first()
    if not db_session:
        db_session = USSDSession(session_id=session_id, last_step="INITIAL", farmer_id=0)
        session.add(db_session)
        session.commit()
        session.refresh(db_session)

    # Get farmer
    farmer = session.exec(select(Farmer).where(Farmer.phone == phone_number)).first()
    last_step = db_session.last_step

    # INITIAL
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

    # MAIN_MENU
    elif last_step == "MAIN_MENU":
        if not farmer:
            if user_input == "1":
                response = "CON Enter your full name:"
                db_session.last_step = "REGISTER_NAME"
            elif user_input == "2":
                response = """CON Weather Options:
1. Current Weather
2. 3-Day Forecast"""
                db_session.last_step = "GUEST_WEATHER"
            else:
                response = "END Invalid option. Please try again."
        else:
            if user_input == "1":
                response = """CON Weather Options:
1. Current Weather
2. 3-Day Forecast"""
                db_session.last_step = "FARMER_WEATHER"
            elif user_input == "2":
                response = await format_alert_response(farmer.location)
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

    # REGISTRATION
    elif last_step == "REGISTER_NAME":
        db_session.temp_data = db_session.temp_data or {}
        db_session.temp_data["name"] = user_input
        response = "CON Enter your location:"
        db_session.last_step = "REGISTER_LOCATION"
        
    elif last_step == "REGISTER_LOCATION":
        db_session.temp_data = db_session.temp_data or {}
        db_session.temp_data["location"] = user_input
        response = "CON Enter your region:"
        db_session.last_step = "REGISTER_REGION"

    elif last_step == "REGISTER_REGION":
        db_session.temp_data = db_session.temp_data or {}
        name = db_session.temp_data.get("name", "Farmer")
        location = db_session.temp_data.get("location", "Unknown")
        region = user_input
        new_farmer = Farmer(name=name, phone=phone_number, location=location, region=region, user_id=db_session.farmer_id)
        session.add(new_farmer)
        session.commit()
        db_session.farmer_id = new_farmer.id
        response = f"""END Registration successful!
Name: {name}
Location: {user_input}
You can now access full features."""
        db_session.last_step = "REGISTER_COMPLETE"

    # WEATHER
    elif last_step in ["FARMER_WEATHER", "GUEST_WEATHER"]:
        option = user_input
        location = farmer.location if farmer else None
        if location:
            try:
                response = await format_weather_response(option, location)
                db_session.last_step = "WEATHER_RESPONSE"
            except Exception:
                response = "END Error fetching weather data. Please try again later."
        else:
            db_session.temp_data = {"option": option}
            response = "CON Enter your location:"
            db_session.last_step = "WEATHER_ENTER_LOCATION"

    elif last_step == "WEATHER_ENTER_LOCATION":
        db_session.temp_data = db_session.temp_data or {}
        option = str(db_session.temp_data.get("option"))
        location = user_input
        try:
            response = await format_weather_response(option, location)
            db_session.last_step = "WEATHER_RESPONSE"
        except Exception:
            response = "END Error fetching weather data. Please try again later."

    # GET ADVICE
    elif last_step == "GET_ADVICE":
        
        issue = user_input.lower()
        try:
            advice_text = await get_ai_advice(user_input=issue, session=session)
            new_advice = Advice(query_text=issue, response_text=advice_text)
            session.add(new_advice)
            session.commit()
            response = f"END Advice:\n{advice_text}"
        except Exception as e:
            print("AI ERROR:", e)
            response = "END Sorry, we couldn't get advice right now. Try again later."
        db_session.last_step = "ADVICE_RESPONSE"

    # REPORT ISSUE
    elif last_step == "REPORT_ISSUE":
        db_session.temp_data = {"issue_type": user_input}
        response = "CON Enter your issue description:"
        db_session.last_step = "REPORT_DESCRIPTION"

    elif last_step == "REPORT_DESCRIPTION":
        db_session.temp_data = db_session.temp_data or {}
        issue_type = db_session.temp_data.get("issue_type")
        description = user_input
        new_report = FarmerReport(
            farmer_id=db_session.farmer_id,
            issue_type=issue_type or "Unknown",
            description=description
        )
        session.add(new_report)
        session.commit()
        response = f"END Report submitted successfully!\nIssue: {issue_type}\nDescription: {description}"
        db_session.last_step = "REPORT_COMPLETE"

    # REQUEST TRANSPORT
    elif last_step == "REQUEST_TRANSPORT":
        transport_type = user_input
        if transport_type in ["1", "2", "3", "4"]:
            transport_map = {
            "1": "Bicycle",
            "2": "Motorcycle",
            "3": "Van",
            "4": "Lorry"
            }
            transport = transport_map[transport_type]
            db_session.temp_data = {"transport_type": transport}
            response = "CON Enter pickup location:"
            db_session.last_step = "TRANSPORT_PICKUP"
        else:
            response = "END Invalid transport type selected."
            db_session.last_step = "TRANSPORT_COMPLETE"
    elif last_step == "TRANSPORT_PICKUP":
        if db_session.temp_data is None:
            db_session.temp_data = {}
        db_session.temp_data["pickup_location"] = user_input
        response = "CON Enter delivery location:"   
        db_session.last_step = "TRANSPORT_DELIVERY"
    elif last_step == "TRANSPORT_DELIVERY":
        if db_session.temp_data is None:
            db_session.temp_data = {}
        db_session.temp_data["delivery_location"] = user_input
        transport_type = db_session.temp_data.get("transport_type")
        pickup_location = db_session.temp_data.get("pickup_location")
        delivery_location = user_input
        new_transport_request = TransportRequest(
            farmer_id=db_session.farmer_id,
            transport_type=transport_type,
            pickup_location=pickup_location,
            dropoff_location=delivery_location,
            status="Pending"
        )
        session.add(new_transport_request)
        session.commit()
        response = f"END Transport request submitted successfully!\nType: {transport_type}\nPickup: {pickup_location}\nDelivery: {delivery_location}"
        db_session.last_step = "TRANSPORT_COMPLETE" 
            
    session.add(db_session)
    session.commit()
    return PlainTextResponse(response)

    



async def format_weather_response(option: str, location: str):
    if option == "1":
        weather = await get_weather(location)
        current = weather.get("current", {})
        condition = current.get("condition", {}).get("text", "NA")
        temp_c = current.get("temp_c", 0)
        precip_mm = current.get("precip_mm", 0)
        return f"""END Current Weather in {location}:\n Condition: {condition} \nTemp: {temp_c}°C\nRain: {precip_mm}mm"""
    
    elif option == "2":
        forecast = await get_forecast(location, 3)
        forecast_days = forecast.get("forecast", {}).get("forecastday", [])
        forecast_text = ""
        for day in forecast_days[:3]:
            date = day.get("date", "")
            condition = day.get("day", {}).get("condition", {}).get("text", "")
            max_temp = day.get("day", {}).get("maxtemp_c", "N/A")
            min_temp = day.get("day", {}).get("mintemp_c", "N/A")
            precip_mm = day.get("day", {}).get("precip_mm", "N/A")
            forecast_text += f"\n{date} - {condition}: {min_temp}°C to {max_temp}°C with {precip_mm}mm rain"
        return f"""END 3-Day Forecast for {location}:{forecast_text}"""
    else:
        return "END Invalid weather option selected."

async def format_alert_response(location: str):
    # Fetch weather alerts from the API
    alerts = await get_weather_alert(location, session=Depends(get_session))
    if not alerts:
        return "END No weather alerts available."
    
    alert_text = ""
    for alert in alerts:
        alert_type = alert[0] if len(alert) > 0 else "Unknown"
        alert_message = alert[1] if len(alert) > 1 else "No message available"
        severity = alert[2] if len(alert) > 2 else "Unknown"
        alert_text += f"\n{alert_type}: {alert_message} (Severity: {severity})"
    
    return f"END Weather Alerts for {location}:{alert_text}"

