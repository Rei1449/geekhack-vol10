from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.chats.routers import router as chat_router
from src.api.chatbot.routers import router as chatbot_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(chatbot_router)
