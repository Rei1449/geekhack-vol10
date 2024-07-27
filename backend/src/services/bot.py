import os
from dotenv import load_dotenv

from pydantic import BaseModel

import google.generativeai as genai

load_dotenv()

class ChatBot(BaseModel):
  langage: str

def cahbot_gemini_flash(langage: str) -> str:
  genai.configure(api_key=os.environ["GEMINI_API_KEY"])
  model = genai.GenerativeModel("gemini-1.5-flash")
  response = model.generate_content(f"あなたは{langage}に詳しい人です。必ず一単語のみを返答します。{langage}に関連すニッチな技術の単語を教えてください")
  print(response.text)
  return response.text
