from fastapi import WebSocket
from pydantic import BaseModel
from typing import List

class ConnectionManager:
  def __init__(self):
    self.active_connections: dict[str, WebSocket] = {}

  async def connect(self, websocket: WebSocket, client_name: str) -> None:
    await websocket.accept()
    self.active_connections[client_name] = websocket

  def disconnect(self, client_name: str) -> None:
    self.active_connections.pop(client_name)

  async def broadcast(self, client_name: str, message: str) -> None:
    for connection in self.active_connections:
      await self.active_connections[connection].send_json({"user_name": client_name, "message": message})
  
  async def unicast(self, client_name: str, message: str, receiver_name: str) -> None:
    await self.active_connections[receiver_name].send_json({"user_name": client_name, "message": message})

  async def broadcast(self, client_name: str, message: str, receiver_users: List) -> None:
    for receiver_user in receiver_users:
      await self.active_connections[receiver_user].send_json({"user_name": client_name, "message": message})

class Message(BaseModel):
  client_name: str
  message: str

class RoomMessage(BaseModel):
  client_name: str
  message: str
  room_users: List
