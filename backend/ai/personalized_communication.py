import os
import requests
from transformers import pipeline

# Load environment variables
api_key = os.environ.get("GROQ_API_KEY")
headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}

# Initialize the NLP pipeline for personalized communication
nlp = pipeline("text-generation", model="gpt-3")

def generate_personalized_message(user_data, context):
    """
    Generate a personalized message based on user data and context.
    
    Args:
        user_data (dict): Information about the user.
        context (str): The context or topic for the personalized message.
    
    Returns:
        str: The generated personalized message.
    """
    prompt = f"Generate a personalized message for the user with the following data: {user_data}. Context: {context}"
    response = nlp(prompt, max_length=150, num_return_sequences=1)
    return response[0]['generated_text']

def send_personalized_message(user_id, message):
    """
    Send the personalized message to the user.
    
    Args:
        user_id (str): The ID of the user.
        message (str): The personalized message to be sent.
    
    Returns:
        dict: The response from the messaging service.
    """
    url = f"https://api.messaging.service/send/{user_id}"
    payload = {
        "message": message
    }
    response = requests.post(url, headers=headers, json=payload)
    return response.json()

if __name__ == "__main__":
    # Example usage
    user_data = {
        "name": "John Doe",
        "preferences": ["fast shipping", "eco-friendly packaging"]
    }
    context = "shipment update"
    message = generate_personalized_message(user_data, context)
    user_id = "12345"
    response = send_personalized_message(user_id, message)
    print(response)
