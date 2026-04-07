from fastapi import APIRouter, Depends, HTTPException
from src.common.response import send_response
from src.database.session import get_db
from src.services.chatservice import get_user_chats

chatRouter = APIRouter(prefix="/chats", tags=["Chats"])


@chatRouter.get("/", response_model=dict)
async def fetch_chats(user_phone: str, db = Depends(get_db)):
    try:
        chats = await get_user_chats(user_phone, db)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))

    return send_response(200, "Chats fetched successfully", chats)
