from fastapi import APIRouter
from .services import cahbot_gemini_flash, ChatBot

router = APIRouter()

@router.post("/chatbot")
async def chatbot_gemini(chatbot: ChatBot):
  res = cahbot_gemini_flash(chatbot.langage)
  return {"message": res}
