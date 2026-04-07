from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.database.models.base import Base


class Users(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String(20), nullable=False)
    username = Column(String(100), nullable=False)
    profile_picture = Column(String(255))
    status_message = Column(String(255))
    last_seen = Column(TIMESTAMP)
    created_at = Column(TIMESTAMP, server_default=func.now())
 
    messages = relationship("Message", back_populates="sender")
    chats = relationship("UserChat", back_populates="users")