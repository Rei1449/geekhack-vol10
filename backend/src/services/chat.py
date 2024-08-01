from fastapi import WebSocket
from pydantic import BaseModel
from typing import List

import os
from dotenv import load_dotenv

import google.generativeai as genai

load_dotenv()

class Message(BaseModel):
  client_name: str
  message: str

class RoomMessage(BaseModel):
  client_name: str
  message: str
  room_users: List

class Location(BaseModel):
  client_name: str
  x: int
  y: int

class Profile(BaseModel):
  nickname: str
  img: str

class ChatBot(BaseModel):
  question: str
  room_users: List


class ConnectionManager:
  def __init__(self):
    self.active_connections: dict[str: dict['webSocket':WebSocket,'x':int,'y':int]] = {}

  async def connect(self, websocket: WebSocket, client_name: str) -> None:
    await websocket.accept()
    self.active_connections[client_name] = {}
    self.active_connections[client_name]['webSocket'] = websocket
    self.active_connections[client_name]['x'] = 0
    self.active_connections[client_name]['y'] = 0
    self.active_connections[client_name]['nickname'] = "ニックネーム"
    self.active_connections[client_name]['img'] = "https://avatars.githubusercontent.com/u/112296932?v=4"
    # print(self.active_connections)

  async def add_profile(self, client_name: str, nickname: str, img: str) -> None:
    self.active_connections[client_name]['nickname'] = nickname
    self.active_connections[client_name]['img'] = img
    for connection in self.active_connections: # この二行で全ユーザーにupdateしたuserの情報を送信
      await self.active_connections[connection]['webSocket'].send_json({"status":"add_profile","user_name": client_name, 'x': self.active_connections[client_name]['x'], 'y': self.active_connections[client_name]['y'], 'nickname':self.active_connections[client_name]['nickname'], 'img':self.active_connections[client_name]['img']})


  async def disconnect(self, client_name: str) -> None:
    print(client_name)
    self.active_connections.pop(client_name)
    for connection in self.active_connections:
      await self.active_connections[connection]['webSocket'].send_json({"status":"drop_user", "user_name": client_name})

  async def broadcast(self, client_name: str, message: str) -> None:
    for connection in self.active_connections:
      await self.active_connections[connection]['webSocket'].send_json({"user_name": client_name, "message": message})
  
  async def unicast(self, client_name: str, message: str, receiver_name: str) -> None:
    await self.active_connections[receiver_name]['webSocket'].send_json({"user_name": client_name, "message": message})

  async def multicast(self, client_name: str, message: str, receiver_users: List) -> None:
    for receiver_user in receiver_users:
      await self.active_connections[receiver_user]['webSocket'].send_json({"user_name": client_name, "message": message})

  async def location_update(self, client_name: str, x: int, y: int) -> None:
    # print(self.active_connections)
    self.active_connections[client_name]['x'] = x
    self.active_connections[client_name]['y'] = y
    # print(self.active_connections)
    for connection in self.active_connections:
      await self.active_connections[connection]['webSocket'].send_json({"status":"update_location","user_name": client_name, 'x': x, 'y': y})

  async def location_init(self, client_name: str) -> None:
    active_user = {} # 新規ユーザーに送る全ユーザーの情報を入れるdictを用意
    await self.active_connections[client_name]['webSocket'].send_json({"user_name": client_name}) # 新規ユーザーに自分のuser_nameを送信
    for connection in self.active_connections: # この二行で全ユーザーに新入りの情報を送信
      if client_name != connection:
        await self.active_connections[connection]['webSocket'].send_json({"status":"add_newuser","user_name": client_name, 'x': self.active_connections[client_name]['x'], 'y': self.active_connections[client_name]['y'], 'nickname':self.active_connections[client_name]['nickname'], 'img':self.active_connections[client_name]['img']})
        active_user[connection] = {}                                           # 以下数行で新入りに送る全ユーザーの情報を作成（元のデータにはwebSocket型が含まれているためjson化出来なかったので新しいものを作成）
        active_user[connection]['x'] = self.active_connections[connection]['x']
        active_user[connection]['y'] = self.active_connections[connection]['y']
        active_user[connection]['nickname'] = self.active_connections[connection]['nickname']
        active_user[connection]['img'] = self.active_connections[connection]['img']
    print(active_user)
    await self.active_connections[client_name]['webSocket'].send_json({"status":"all_user","user_locations": active_user})

  async def chatbot(self, question: str, receiver_users: List) -> None:
    res_text = cahbot_gemini_flash(question)
    for receiver_user in receiver_users:
      await self.active_connections[receiver_user]['webSocket'].send_json({"user_name": "chatbot", "message": res_text})

def cahbot_gemini_flash(question: str) -> str:
  genai.configure(api_key=os.environ["GEMINI_API_KEY"])
  model = genai.GenerativeModel("gemini-1.5-flash")
  response = model.generate_content(f"あなたはITやプログラミングに詳しい人です。必ず100文字以内で返答します。{question}")
  print(response.text)
  return response.text
