import openai
from datetime import datetime
import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

def log_conversation(prompt, response):
    with open('chat_log.txt', 'a') as f:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"\n[{timestamp}]\n")
        f.write(f"Prompt: {prompt}\n")
        f.write(f"Response: {response}\n")
        f.write("-" * 50 + "\n")

def chat_with_gpt(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        # Get the response text
        response_text = response.choices[0].message.content
        
        # Log the conversation
        log_conversation(prompt, response_text)
        
        return response_text
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return None

if __name__ == "__main__":
    # Check if prompt is provided
    if len(sys.argv) < 2:
        print("Please provide a prompt as a command-line argument")
        print("Usage: python openai_integration.py \"Your prompt here\"")
        sys.exit(1)
        
    # Get prompt from command line arguments
    prompt = sys.argv[1]
    
    # Get response
    response = chat_with_gpt(prompt)
    if response:
        print("Response:", response) 