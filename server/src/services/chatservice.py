from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from src.database.models.chat import Chat
from src.database.models.message import Message
from src.database.models.user_chat import UserChat
from src.database.models.users import Users
from src.database.session import DBSession


async def get_user_chats(user_phone: str, db):
    result = await db.execute(select(Users).where(Users.phone_number == user_phone))
    user = result.scalar_one_or_none()
    if not user:
        raise ValueError("User not found")

    result = await db.execute(
        select(Chat)
        .join(UserChat)
        .where(UserChat.user_id == user.user_id)
        .options(
            selectinload(Chat.users).selectinload(UserChat.users),
            selectinload(Chat.messages),
        )
    )
    chats = result.scalars().unique().all()

    chat_items = []
    for chat in chats:
        other_members = [
            {
                "user_id": uc.users.user_id,
                "username": uc.users.username,
                "phone_number": uc.users.phone_number,
            }
            for uc in chat.users
            if uc.user_id != user.user_id and uc.users is not None
        ]

        last_message = None
        if chat.messages:
            sorted_messages = sorted(chat.messages, key=lambda m: m.timestamp or "", reverse=True)
            last_message = sorted_messages[0]

        chat_items.append({
            "chat_id": chat.chat_id,
            "chat_type": chat.chat_type,
            "members": other_members,
            "last_message": {
                "text": last_message.content,
                "timestamp": last_message.timestamp.isoformat() if last_message and last_message.timestamp else None,
            } if last_message else None,
            "updated_at": chat.updated_at.isoformat() if chat.updated_at else None,
        })

    return chat_items
