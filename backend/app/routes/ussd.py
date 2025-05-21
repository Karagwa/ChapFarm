from fastapi import APIRouter, Depends, Request, Form
from fastapi.responses import PlainTextResponse
from httpx import request
import openai
from sqlmodel import Session, select
from app.database import get_session
from app.models import Farmer, USSDSession, WeatherData
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
    #db_session.last_step= 
    if not db_session:
        db_session = USSDSession(session_id=session_id, last_step="INITIAL", farmer_id=0)
        session.add(db_session)
        session.commit()
        session.refresh(db_session)

    # Get farmer
    farmer = session.exec(select(Farmer).where(Farmer.phone == phone_number)).first()
    last_step = db_session.last_step

    # INITIAL STATE - Show menu
    if last_step == "INITIAL":
        if farmer:
            response = """CON Welcome back to ChapFarm
1. Get Weather Update
2. View Weather Alerts
3. Get Advice"""
        else:
            response = """CON Welcome to ChapFarm
1. Register
2. Get Weather (Guest)"""
        db_session.last_step = "MAIN_MENU"

    # MAIN_MENU
    elif last_step == "MAIN_MENU":
        if user_input == "1" and not farmer:
            response = "CON Enter your full name:"
            db_session.last_step = "REGISTER_NAME"
        elif user_input == "2" and not farmer:
            response = """CON Weather Options:
1. Current Weather
2. 3-Day Forecast"""
            db_session.last_step = "GUEST_WEATHER"
        elif user_input == "1" and farmer:
            response = """CON Weather Options:
1. Current Weather
2. 3-Day Forecast"""
            db_session.last_step = "FARMER_WEATHER"
        else:
            response = "END Invalid option. Please try again."
        if user_input == "2" and farmer:
            response = format_alert_response(farmer.location)
            db_session.last_step = "ALERT_RESPONSE"

        if user_input == "3" and farmer:
            response = "CON Enter your issue type:"
            db_session.last_step = "GET_ADVICE"
        else:
            response = "END Invalid option. Please try again."        

    # Registration flow
    elif last_step == "REGISTER_NAME":
        if db_session.temp_data is None:
            db_session.temp_data = {}
        db_session.temp_data["name"] = user_input
        response = "CON Enter your location:"
        db_session.last_step = "REGISTER_LOCATION"

    elif last_step == "REGISTER_LOCATION":
        if db_session.temp_data is None:
            db_session.temp_data = {}
        name = db_session.temp_data["name"]
        new_farmer = Farmer(name=name, phone=phone_number, location=user_input)
        session.add(new_farmer)
        session.commit()
        db_session.farmer_id = new_farmer.id
        response = f"""END Registration successful!
Name: {name}
Location: {user_input}
You can now access full features."""
        db_session.last_step = "REGISTER_COMPLETE"

    # Weather for registered farmer
    elif last_step in ["FARMER_WEATHER", "GUEST_WEATHER"]:
        option = user_input
        location = farmer.location if farmer else None

        if location:
            try:
                if not isinstance(option, str) or not option:
                    response = "END Invalid weather option selected."
                else:
                    response = await format_weather_response(option, location)
                db_session.last_step = "WEATHER_RESPONSE"
            except Exception:
                response = "END Error fetching weather data. Please try again later."
        else:
            db_session.temp_data = {"option": option}
            response = "CON Enter your location:"
            db_session.last_step = "WEATHER_ENTER_LOCATION"

    elif last_step == "WEATHER_ENTER_LOCATION":
        if db_session.temp_data is None:
            db_session.temp_data = {}
        option = str(db_session.temp_data.get("option"))
        location = user_input
        try:
            response = await format_weather_response(option, location)
            db_session.last_step = "WEATHER_RESPONSE"
        except Exception:
            response = "END Error fetching weather data. Please try again later."

    

    # Get advice flow
    elif last_step == "GET_ADVICE":
        issue = user_input.lower()

        # Check for similar advice
        existing_advices = session.exec(select(Advice)).all()
        issues_list = [adv.issue for adv in existing_advices]
    
        from app.utils.fuzzy import find_similar_advice
        result = find_similar_advice(session, issue)
        if result:
            match_issue, score = result
        else:
            match_issue, score = None, 0

        if match_issue:
            matched_advice = next((adv for adv in existing_advices if adv.issue == match_issue), None)
            if matched_advice:
                response = f"END Advice:\n{matched_advice.advice_text}"
            else:
                response = "END No matching advice found."
    else:
        
        try:
            if 'issue' not in locals():
                issue = user_input.lower()  # Ensure 'issue' is defined
            advice_text = await get_ai_advice(user_input=issue, session=session)  # Pass 'issue' and 'session'
            new_advice = Advice(query_text=issue, response_text=advice_text)
            session.add(new_advice)
            session.commit()
            response = f"END Advice:\n{advice_text}"
        except Exception as e:
            print("AI ERROR:", e)
            response = "END Sorry, we couldn't get advice right now. Try again later."
    
    db_session.last_step = "ADVICE_RESPONSE"

    

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

