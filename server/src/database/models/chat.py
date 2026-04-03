from sqlalchemy import Column, Integer, String, TIMESTAMP, CheckConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base


class Chat(Base):
    __tablename__ = "chat"

    chat_id = Column(Integer, primary_key=True, index=True)
    chat_type = Column(String(20))
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        CheckConstraint("chat_type IN ('individual', 'group')"),
    )

    users = relationship("UserChat", back_populates="chat")
    messages = relationship("Message", back_populates="chat")
    group = relationship("Group", uselist=False, back_populates="chat")