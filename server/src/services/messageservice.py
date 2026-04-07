from sqlalchemy import select

from src.database.models.chat import Chat
from src.database.models.message import Message
from src.database.models.users import Users
from src.database.session import DBSession


async def save_message(message_data, db: DBSession):
    result = await db.execute(select(Chat).where(Chat.chat_id == message_data.chat_id))
    chat = result.scalar_one_or_none()
    if not chat:
        raise ValueError("Chat not found")

    result = await db.execute(select(Users).where(Users.user_id == message_data.sender_user_id))
    sender = result.scalar_one_or_none()
    if not sender:
        raise ValueError("Sender user not found")

    new_message = Message(
        chat_id=message_data.chat_id,
        sender_user_id=message_data.sender_user_id,
        content=message_data.content,
        message_type=message_data.message_type,
    )

    db.add(new_message)
    await db.commit()
    await db.refresh(new_message)
    return new_message
