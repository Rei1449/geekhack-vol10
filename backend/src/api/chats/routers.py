from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

router = APIRouter()

class ConnectionManager:
  def __init__(self):
    self.active_connections: dict[str, WebSocket] = {}

  async def connect(self, websocket: WebSocket, client_name: str) -> None:
    await websocket.accept()
    self.active_connections[client_name] = websocket

  def disconnect(self, client_name: str) -> None:
    self.active_connections.pop(client_name)

  async def broadcast(self, message: str):
    for connection in self.active_connections:
      await self.active_connections[connection].send_text(message)

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
