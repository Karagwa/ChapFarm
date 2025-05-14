
import os
import openai
from backend.app.models import Advice
from backend.app.utils.fuzzy import find_similar_advice

from sqlmodel import Session
openai.api_key = os.getenv("GROQ_API_KEY")
openai.api_base = "https://api.groq.com/openai/v1"

async def get_ai_advice(session, user_input: str) -> str:
    # Try to get from saved advice
    cached_response = find_similar_advice(session, user_input)
    if cached_response:
        return cached_response

    # Otherwise, call Groq
    try:
        completion = await openai.ChatCompletion.acreate(
            model="llama3-8b-8192",  # Groq's model name
            messages=[
                {"role": "system", "content": "You're a smart agriculture assistant helping farmers with crop and weather-related advice."},
                {"role": "user", "content": user_input}
            ]
        )
        response = completion.choices[0].message.content.strip()

        # Save to DB
        new_advice = Advice(query_text=user_input, response_text=response)
        session.add(new_advice)
        session.commit()
        return response
    except Exception as e:
        return "END Sorry, I couldn't process your request right now. Please try again later."



