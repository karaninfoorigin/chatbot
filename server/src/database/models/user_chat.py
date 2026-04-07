from sqlalchemy import Column, Integer, ForeignKey, String, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.database.models.base import Base


class UserChat(Base):
    __tablename__ = "user_chat"

    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), primary_key=True)
    chat_id = Column(Integer, ForeignKey("chat.chat_id", ondelete="CASCADE"), primary_key=True)

    role = Column(String(50))
    joined_at = Column(TIMESTAMP, server_default=func.now())

    users = relationship("Users", back_populates="chats")
    chat = relationship("Chat", back_populates="users")