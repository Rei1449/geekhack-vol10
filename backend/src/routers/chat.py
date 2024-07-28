from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from src.services.chat import ConnectionManager, Message, RoomMessage, Location, Profile

router = APIRouter()

manager = ConnectionManager()

@router.websocket("/ws/{client_name}")
async def websocket_endpoint(websocket: WebSocket, client_name: str):
  print("おはよう")
  # print(nickname,img)
  await manager.connect(websocket, client_name)
  try:
    await manager.location_init(client_name)
    while True:
      data = await websocket.receive_text()
      await manager.broadcast(f"Client #{client_name} says: {data}")
  except WebSocketDisconnect:
    manager.disconnect(websocket)
    # await manager.broadcast(f"Client #{client_name} left the chat")

@router.post("/user/addprofile/{client_name}")
async def add_profile(message:Profile, client_name: str):
  await manager.add_profile(client_name, message.nickname, message.img)
  return {"message": "add profile"}

@router.post("/chat")
async def send_message_all(message: Message):
  await manager.broadcast(message.client_name, message.message)
  return {"message": "message all"}

@router.post("/chat/user/{receiver_name}")
async def send_message_one(message: Message, receiver_name: str):
  await manager.unicast(message.client_name, message.message, receiver_name)
  return {"message": "Message user"}

@router.post("/chat/room")
async def send_message_room(messages: RoomMessage):
  await manager.multicast(messages.client_name, messages.message, messages.room_users)
  return {"message": "Message room"}

@router.post("/location")
async def location_update(location: Location):
  await manager.location_update(location.client_name, location.x, location.y)
  return {"location": "location all"}

