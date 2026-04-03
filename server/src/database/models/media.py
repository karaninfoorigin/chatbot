from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, BigInteger, CheckConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base


class Media(Base):
    __tablename__ = "media"

    media_id = Column(Integer, primary_key=True, index=True)
    message_id = Column(Integer, ForeignKey("message.message_id", ondelete="CASCADE"))

    file_url = Column(String(255))
    file_type = Column(String(20))
    file_size = Column(BigInteger)
    uploaded_at = Column(TIMESTAMP, server_default=func.now())

    __table_args__ = (
        CheckConstraint("file_type IN ('image','video','audio','document')"),
    )

    message = relationship("Message", back_populates="media")