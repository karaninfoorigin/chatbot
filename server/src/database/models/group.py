from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base


class Group(Base):
    __tablename__ = "group"

    group_id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("chat.chat_id", ondelete="CASCADE"), unique=True)
    created_by_user_id = Column(Integer, ForeignKey("user.user_id"))
    group_name = Column(String(150))
    group_icon = Column(String(255))
    description = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())

    chat = relationship("Chat", back_populates="group")