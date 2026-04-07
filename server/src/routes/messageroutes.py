from fastapi import APIRouter, HTTPException

from src.common.response import Response as ApiResponse, send_response
from src.database.session import DBSession
from src.schema.messageSchema import MessageCreate
from src.services.messageservice import save_message

messageRouter = APIRouter(prefix="/messages", tags=["Messages"])


@messageRouter.post("/", response_model=ApiResponse)
async def create_message(message: MessageCreate, db: DBSession):
    try:
        saved_message = await save_message(message, db)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))

    return send_response(
        201,
        "Message saved successfully",
        {
            "message_id": saved_message.message_id,
            "chat_id": saved_message.chat_id,
            "sender_user_id": saved_message.sender_user_id,
            "content": saved_message.content,
            "message_type": saved_message.message_type,
            "timestamp": saved_message.timestamp.isoformat() if saved_message.timestamp else None,
            "is_read": saved_message.is_read,
            "is_delivered": saved_message.is_delivered,
        },
    )
