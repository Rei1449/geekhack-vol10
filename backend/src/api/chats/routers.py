from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

router = APIRouter()

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

manager = ConnectionManager()

@router.websocket("/ws/{client_name}/room/{room_id}")
async def websocket_endpoint(websocket: WebSocket, client_name: str, room_id: str):
  await manager.connect(websocket, client_name)
  try:
    while True:
      data = await websocket.receive_text()
      await manager.broadcast(f"Client #{client_name} says: {data}")
  except WebSocketDisconnect:
    manager.disconnect(websocket)
    await manager.broadcast(f"Client #{client_name} left the chat")

class Message(BaseModel):
  client_name: str
  message: str

@router.post("/chat")
async def send_message_all(message: Message):
  await manager.broadcast(message.client_name, message.message)
  return {"message": "Message sent"}

@router.post("/chat/user/{receiver_name}")
async def send_message_one(message: Message, receiver_name: str):
  await manager.unicast(message.client_name, message.message, receiver_name)
  return {"message": "Message sent"}
