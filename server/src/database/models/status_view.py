from sqlalchemy import Column, Integer, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from database import Base


class StatusView(Base):
    __tablename__ = "status_view"

    viewer_user_id = Column(Integer, ForeignKey("user.user_id", ondelete="CASCADE"), primary_key=True)
    status_id = Column(Integer, ForeignKey("status_story.status_id", ondelete="CASCADE"), primary_key=True)

    viewed_at = Column(TIMESTAMP, server_default=func.now())