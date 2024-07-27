from fastapi import WebSocket
from pydantic import BaseModel
from typing import List

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

class ConnectionManager:
  def __init__(self):
    self.active_connections: dict[str: dict['webSocket':WebSocket,'x':int,'y':int]] = {}

  async def connect(self, websocket: WebSocket, client_name: str) -> None:
    await websocket.accept()
    self.active_connections[client_name] = {}
    self.active_connections[client_name]['webSocket'] = websocket
    self.active_connections[client_name]['x'] = 0
    self.active_connections[client_name]['y'] = 0
    # print(self.active_connections)

  def disconnect(self, client_name: str) -> None:
    self.active_connections.pop(client_name)

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
      await self.active_connections[connection]['webSocket'].send_json({"user_name": client_name, 'x': x, 'y': y})
