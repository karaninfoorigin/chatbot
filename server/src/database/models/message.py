from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean, TIMESTAMP, CheckConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.database.models.base import Base


class Message(Base):
    __tablename__ = "message"

    message_id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("chat.chat_id", ondelete="CASCADE"))
    sender_user_id = Column(Integer, ForeignKey("users.user_id"))

    content = Column(Text)
    message_type = Column(String(20))
    timestamp = Column(TIMESTAMP, server_default=func.now())

    is_read = Column(Boolean, default=False)
    is_delivered = Column(Boolean, default=False)

    __table_args__ = (
        CheckConstraint("message_type IN ('text','image','video','audio','document')"),
    )

    chat = relationship("Chat", back_populates="messages")
    sender = relationship("Users", back_populates="messages")
    media = relationship("Media", back_populates="message")