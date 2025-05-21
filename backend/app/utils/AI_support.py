import json
import boto3
from sqlmodel import Session, select
from ..models import Advice
from ..utils.fuzzy import find_similar_advice

# AWS Bedrock Client
bedrock = boto3.client("bedrock-runtime", region_name="eu-north-1")


def normalize_text(text: str) -> str:
    """Lowercase and strip to help fuzzy matching."""
    return text.lower().strip()


async def get_ai_advice(session: Session, user_input: str) -> str:
    # First, try to fetch a similar existing response from DB
    cached_response = find_similar_advice(session, user_input)
    if cached_response:
        return cached_response

    # Prepare Bedrock prompt
    prompt = f"""
    You are a trusted agricultural advisor supporting Ugandan farmers using feature phones.
    Your advice should be concise, localized, and easily understandable in plain English or Luganda-influenced phrasing.

    Farmer's Question: {user_input}

    Respond with advice in no more than 3 SMS messages (max 480 characters).
    Advice:
    """

    body = {
        "inputText": prompt.strip(),
        "textGenerationConfig": {
            "maxTokens": 480,
            "temperature": 0.2,
            "topP": 0.9,
        },
    }

    try:
        # Send request to Bedrock
        response = bedrock.invoke_model(
            modelId="amazon.titan-text-express-v1",
            body=json.dumps(body),
            contentType="application/json",
            accept="application/json",
        )

        result = json.loads(response["body"].read())
        output_text = result.get("results", [{}])[0].get("outputText", "No advice found.")

        # Save the AI-generated advice to DB for future reference
        new_advice = Advice(query_text=user_input, response_text=output_text)
        session.add(new_advice)
        session.commit()

        return output_text

    except Exception as e:
        # Optional: log error somewhere
        return "END Sorry, I couldn't process your request right now. Please try again later."
