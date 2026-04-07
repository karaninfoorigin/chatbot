from pydantic import BaseModel, Field
from typing import Literal


class MessageCreate(BaseModel):
    chat_id: int
    sender_user_id: int
    content: str = Field(..., min_length=1)
    message_type: Literal["text", "image", "video", "audio", "document"] = "text"
