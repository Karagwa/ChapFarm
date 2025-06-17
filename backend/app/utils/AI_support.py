import json
import boto3
from sqlmodel import Session, select
from ..models import Advice
from ..utils.fuzzy import find_similar_advice
import os
from typing import Optional
from fastapi import FastAPI, HTTPException

# Initialize AWS Bedrock Client globally for the FastAPI app
try:
    bedrock = boto3.client("bedrock-runtime", region_name=os.getenv("AWS_REGION", "eu-north-1"))
    print("Bedrock client initialized successfully.")
except Exception as e:
    print(f"CRITICAL ERROR: Failed to initialize Bedrock client. Check AWS credentials and region. Details: {e}")
    # In a real application, you might want to exit or log a critical error here
    # raise e

def normalize_text(text: str) -> str:
    """Lowercase and strip to help fuzzy matching."""
    return text.lower().strip()

async def get_ai_advice(session: Session, user_input: str) -> str:
    # # First, try to fetch a similar existing response from DB
    # # Uncomment and ensure find_similar_advice is correctly implemented if you use DB caching
    # cached_response = find_similar_advice(session, user_input)
    # if cached_response:
    #     return cached_response

    # Define the model ID for Amazon Nova Lite
    # Ensure this exact model ID is enabled in your Bedrock account for the specified region
    model_id = "amazon.nova-lite-v1:0"

    # The prompt for the AI model
    system_prompt_text = """
    You are a trusted agricultural advisor supporting Ugandan farmers using feature phones.
    Your advice should be concise and easily understandable in plain English.
    Respond with advice in no more than 480 characters.
    """

    # Corrected request body for 'messages' API format
    request_body = {
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "text": user_input # The farmer's question
                    }
                ]
            }
        ],
        "system": [ # System prompt as a JSONArray
            {
                "text": system_prompt_text.strip()
            }
        ],
        "inferenceConfig": {
            "maxTokens": 480,
            "temperature": 0.2,
            "topP": 0.9,
        }
    }

    try:
        # Send request to Bedrock
        print(f"DEBUG: Invoking model: {model_id}")
        print(f"DEBUG: Request Body: {json.dumps(request_body, indent=2)}")

        response = bedrock.invoke_model(
            modelId=model_id,
            body=json.dumps(request_body),
            contentType="application/json",
            accept="application/json",
        )

        result = json.loads(response["body"].read())

        # --- CORRECTED PARSING LOGIC ---
        output_text = "No advice found." # Default in case parsing fails

        # Nova Lite's 'messages' API response places the assistant's content under 'output' -> 'message' -> 'content'
        if "output" in result and "message" in result["output"]:
            ai_message = result["output"]["message"]
            if ai_message.get("role") == "assistant" and "content" in ai_message:
                for content_block in ai_message["content"]:
                    if content_block.get("text"):
                        output_text = content_block["text"]
                        break # Found text, exit content loop
        # The WARNING about unexpected format is removed, as we now handle this specific format.
        # --- END CORRECTED PARSING LOGIC ---

        # Save the AI-generated advice to DB for future reference
        new_advice = Advice(query_text=user_input, response_text=output_text)
        session.add(new_advice)
        session.commit()
        session.refresh(new_advice)

        return output_text

    except boto3.exceptions.ClientError as e:
        error_code = e.response.get("Error", {}).get("Code")
        error_message = e.response.get("Error", {}).get("Message")
        print(f"ERROR: Bedrock Client Error ({error_code}): {error_message}")
        raise HTTPException(status_code=500, detail=f"Failed to get AI advice: AWS Bedrock error ({error_code}) - {error_message}")
    except json.JSONDecodeError as e:
        print(f"ERROR: Failed to parse JSON response from Bedrock: {e}")
        raise HTTPException(status_code=500, detail="Failed to get AI advice: Invalid JSON response from AI model.")
    except Exception as e:
        print(f"ERROR: An unexpected error occurred in get_ai_advice: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to get AI advice: An unexpected error occurred. {e}")