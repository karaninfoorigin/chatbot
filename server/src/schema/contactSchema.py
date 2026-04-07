from pydantic import BaseModel, Field


class ContactCreate(BaseModel):
    owner_phone: str = Field(..., min_length=10, max_length=10)
    contact_phone: str = Field(..., min_length=10, max_length=10)
    saved_name: str | None = None
