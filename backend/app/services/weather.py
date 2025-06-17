import httpx
from datetime import datetime, timedelta
import os
from typing import Optional, List, Dict, Any
from fastapi import HTTPException
import json

# Load API Key from environment variables
# Make sure your environment variable is set to OPENWEATHER_API_KEY for consistency
#WEATHER_API_KEY=10760394ac7a790cfdd19c6561d09f4c
API_KEY = os.getenv("OPENWEATHER_API_KEY").strip()

# Base URLs for OpenWeatherMap API
BASE_GEO_URL = "http://api.openweathermap.org/geo/1.0/direct"
BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
BASE_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast" # 5-day / 3-hour forecast

async def _fetch_json(url: str) -> Dict[str, Any]:
    """
    Helper function to make an HTTP GET request, handle errors, and return JSON response.
    """
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Weather API Key is not configured. Please set the OPENWEATHER_API_KEY environment variable.")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status() # Raise an exception for 4xx or 5xx responses
            return response.json()
    except httpx.HTTPStatusError as http_err:
        print(f"HTTP error occurred: {http_err.response.status_code} - {http_err.response.text}")
        raise HTTPException(status_code=500, detail=f"Weather API HTTP error: {http_err.response.status_code} - {http_err.response.text}")
    except httpx.RequestError as req_err:
        print(f"Request error occurred: {req_err}")
        raise HTTPException(status_code=500, detail=f"Weather API request error: {req_err}")
    except json.JSONDecodeError as json_err:
        print(f"JSON decode error: {json_err}")
        raise HTTPException(status_code=500, detail=f"Weather API response parsing error: {json_err}")
    except Exception as err:
        print(f"An unexpected error occurred: {err}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {err}")

async def get_coordinates(location_name: str) -> Optional[Dict[str, Any]]:
    """
    Gets latitude, longitude, and timezone offset for a given location name in Uganda.
    Prioritizes "City" results if available.
    """
    geo_url = f"{BASE_GEO_URL}?q={location_name}&limit=5&appid={API_KEY}"
    data = await _fetch_json(geo_url)

    if not data:
        return None

    # Try to find an exact match for the location name in Uganda first
    # This loop is more specific and robust
    for city_data in data:
        if city_data.get("name", "").lower() == location_name.lower() and city_data.get("country") == 'UG':
            return {
                "lat": city_data['lat'],
                "lon": city_data['lon'],
                "timezone_offset": city_data.get('timezone', 0) # Timezone offset in seconds from UTC
            }
    
    # Fallback: find any result in Uganda, prioritizing those with "City" in name if not exact match
    for city_data in data:
        if city_data.get("country") == 'UG':
            return {
                "lat": city_data['lat'],
                "lon": city_data['lon'],
                "timezone_offset": city_data.get('timezone', 0)
            }

    return None # No matching Ugandan location found


async def get_current_weather_data(location: str) -> dict:
    """
    Gets current weather data for a specified location in Uganda.
    Returns temperatures in Celsius.
    """
    coords = await get_coordinates(location)
    if not coords:
        raise HTTPException(status_code=404, detail=f"Location '{location}' not found in Uganda or coordinates could not be retrieved.")

    lat = coords['lat']
    lon = coords['lon']

    # Add units=metric for Celsius
    weather_url = f"{BASE_WEATHER_URL}?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    
    current_weather_data = await _fetch_json(weather_url)
    return current_weather_data

async def get_5day_3hour_forecast_raw(location: str) -> dict:
    """
    Gets the raw 5-day / 3-hour forecast data from OpenWeatherMap.
    Returns temperatures in Celsius.
    """
    coords = await get_coordinates(location)
    if not coords:
        raise HTTPException(status_code=404, detail=f"Location '{location}' not found in Uganda or coordinates could not be retrieved.")

    lat = coords['lat']
    lon = coords['lon']

    # Add units=metric for Celsius
    forecast_url = f"{BASE_FORECAST_URL}?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    
    raw_forecast_data = await _fetch_json(forecast_url)
    return raw_forecast_data
async def format_weather_response(option: str, location: str) -> str:
    """
    Formats weather responses based on the chosen option.
    Option "1" for current weather, "2" for 5-day/9AM forecast.
    """
    if option == "1":
        # Call the corrected data retrieval function
        current_weather = await get_current_weather_data(location)
        
        # Extract data based on OpenWeatherMap's current weather API response structure
        location_name_from_api = current_weather.get("name", location)
        
        main_data = current_weather.get("main", {})
        temp_c = main_data.get("temp", "N/A") # Already in Celsius due to &units=metric
        humidity = main_data.get("humidity", "N/A")
        
        weather_description_list = current_weather.get("weather", [])
        condition = weather_description_list[0].get("description", "N/A") if weather_description_list else "N/A"
        
        # OpenWeatherMap provides rain volume in 'rain' object (e.g., {"1h": 2.73})
        rain_1h = current_weather.get("rain", {}).get("1h", 0.0) # Rain volume for last 1 hour, default 0.0
        
        return (
            f"END Current Weather in {location_name_from_api}:\n"
            f"Condition: {condition.capitalize()}\n"
            f"Temperature: {temp_c}°C\n"
            f"Humidity: {humidity}%\n"
            f"Rain (last 1 hr): {rain_1h}mm"
        )

    elif option == "2":
        # Call the corrected data retrieval function for raw forecast data
        full_forecast_data = await get_5day_3hour_forecast_raw(location)
        
        if not full_forecast_data:
            return f"END Could not retrieve forecast data for {location}."

        # Get timezone offset for the city from the API response for local time conversion
        city_timezone_offset_seconds = full_forecast_data.get("city", {}).get("timezone", 0)
        
        # Define the desired local hour for the forecast
        desired_local_hour = 9 # For 9 AM local time

        forecast_entries = full_forecast_data.get("list", [])
        forecast_text_lines = []
        seen_dates = set()

        for entry in forecast_entries:
            utc_dt_str = entry.get("dt_txt")
            if not utc_dt_str:
                continue

            # Parse UTC datetime string and convert to local time
            utc_dt = datetime.strptime(utc_dt_str, "%Y-%m-%d %H:%M:%S")
            local_dt = utc_dt + timedelta(seconds=city_timezone_offset_seconds)

            current_local_date = local_dt.date()
            current_local_hour = local_dt.hour

            # Check if this is a new day and the local hour matches our target
            if current_local_date not in seen_dates and current_local_hour == desired_local_hour:
                temp_c = entry.get("main", {}).get("temp", "N/A") # Already in Celsius
                
                weather_info = entry.get("weather", [{}])[0]
                condition = weather_info.get("description", "N/A")
                
                # OpenWeatherMap 5-day forecast provides rain volume in 'rain.3h'
                rain_3h_mm = entry.get("rain", {}).get("3h", 0.0) # Rain volume for preceding 3 hours, default 0.0
                
                wind_speed_mps = entry.get("wind", {}).get("speed", "N/A")
                humidity_percent = entry.get("main", {}).get("humidity", "N/A")

                forecast_text_lines.append(
                    f"\n{current_local_date.strftime('%Y-%m-%d')} ({local_dt.strftime('%I%p').lower()} local): "
                    f"Condition: {condition.capitalize()},\n Temp: {temp_c}°C, "
                    f"\nRain(3h): {rain_3h_mm}mm"
                )
                seen_dates.add(current_local_date)

                # Stop after finding 5 days of 9 AM forecast
                if len(seen_dates) >= 5:
                    break
        
        if not forecast_text_lines:
            return (
                f"END No 9 AM local time forecast available for {location} for the next 5 days. "
                "The 3-hour forecast intervals might not align exactly with 9 AM local time for all days. "
                "Consider requesting hourly forecasts if higher precision is needed (might require a paid plan)."
            )

        return f"END 5-Day Forecast for {location} (9 AM Local Time):{''.join(forecast_text_lines)}"

    else:
        return "END Invalid weather option selected. Please choose '1' for current weather or '2' for 5-day forecast."
    
    
# Note: WeatherAlert and SessionDep are kept as placeholders if you need them for database ops.
# They are not used in the weather fetching logic itself.
# from ..database import SessionDep
# from ..models import WeatherAlert
# async def get_weather_alert(location: str) -> dict:
#     url = f"{BASE_URL}/alerts.json?key={API_KEY}&q={location}"
#     try:
#         async with httpx.AsyncClient() as client:
#             response = await client.get(url)

#             # If the request fails or the API returns a non-200 status
#             response.raise_for_status()

#             return response.json()
#     except httpx.HTTPStatusError as http_err:
#         raise HTTPException(status_code=500, detail=f"HTTP error occurred: {http_err}")
#     except httpx.RequestError as req_err:
#         raise HTTPException(status_code=500, detail=f"Request error occurred: {req_err}")
#     except Exception as err:
#         raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {err}")


# async def get_weather_alert(location: str, session: SessionDep) -> WeatherAlert:
#     url = f"{BASE_URL}/alerts.json?key={API_KEY}&q={location}"
#     try:
#         async with httpx.AsyncClient() as client:
#             response = await client.get(url)

#             # If the request fails or the API returns a non-200 status
#             response.raise_for_status()

#             alert_data = response.json()
#             alert = WeatherAlert(
#                 location=location,
#                 alert_message=alert_data.get("headline", "No alert message available"),
#                 severity=alert_data.get("severity", "Unknown"),
#                 alert_type=alert_data.get("alert_type", "Unknown"),
#                 urgency_level=alert_data.get("urgency", "Unknown"), 
#                 certainty_level=alert_data.get("certainty", "Unknown"),
#                 effective_time=alert_data.get("effective_time", datetime.now()),
#                 expires_time=alert_data.get("expires_time", datetime.now()),
#                 timestamp=datetime.now()
#             )
#             session.add(alert)
#             session.commit()
#             session.refresh(alert)
#             return alert
#     except httpx.HTTPStatusError as http_err:
#         raise HTTPException(status_code=500, detail=f"HTTP error occurred: {http_err}")
#     except httpx.RequestError as req_err:
#         raise HTTPException(status_code=500, detail=f"Request error occurred: {req_err}")
#     except Exception as err:
#         raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {err}")