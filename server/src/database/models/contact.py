from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.database.models.base import Base


class Contact(Base):
    __tablename__ = "contact"

    contact_id = Column(Integer, primary_key=True, index=True)
    owner_user_id = Column(Integer, ForeignKey("user.user_id", ondelete="CASCADE"))
    contact_user_id = Column(Integer, ForeignKey("user.user_id", ondelete="CASCADE"))

    saved_name = Column(String(100))
    added_at = Column(TIMESTAMP, server_default=func.now())

    owner = relationship("User", foreign_keys=[owner_user_id])