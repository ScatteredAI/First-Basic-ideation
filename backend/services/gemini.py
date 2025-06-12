# backend/services/gemini.py
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

print(f"Using API key: {os.getenv('GEMINI_API_KEY')[:5]}...")  # First 5 chars
print(f"Available models: {[m.name for m in genai.list_models()]}")

def ask_gemini(prompt: str) -> str:
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"AI Analysis Error: {str(e)}"