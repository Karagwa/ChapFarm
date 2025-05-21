from rapidfuzz import process, fuzz
from sqlmodel import select
from app.models import Advice

def find_similar_advice(session, user_input: str, threshold: int = 85) -> str | None:
    """Search for a similar previous query using fuzzy matching."""
    existing_advice = session.exec(select(Advice)).all()
    queries = [advice.query_text for advice in existing_advice]

    match = process.extractOne(user_input, queries, scorer=fuzz.token_sort_ratio)
    if match and match[1] >= threshold:
        matched_query = match[0]
        matched_advice = next((a for a in existing_advice if a.query_text == matched_query), None)
        return matched_advice.response_text if matched_advice else None

    return None
