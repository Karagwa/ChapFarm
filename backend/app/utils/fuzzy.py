import os
import openai
from rapidfuzz import process, fuzz
from sqlmodel import select
from app.models import Advice

def find_similar_advice(session, user_input: str, threshold: int = 85):
    existing_advice = session.exec(select(Advice)).all()
    queries = [advice.query_text for advice in existing_advice]
    
    match = process.extractOne(user_input, queries, scorer=fuzz.token_sort_ratio)
    if match and match[1] >= threshold:
        for advice in existing_advice:
            if advice.query_text == match[0]:
                return advice.response_text
    return None