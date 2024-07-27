from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.chat import router as chat_router
from src.routers.bot import router as bot_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(bot_router)
