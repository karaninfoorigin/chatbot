from fastapi import APIRouter, Depends, HTTPException
from src.common.response import send_response
from src.database.session import get_db
from src.schema.contactSchema import ContactCreate
from src.services.contactservice import add_contact, get_contacts

contactRouter = APIRouter(prefix="/contacts", tags=["Contacts"])


@contactRouter.post("/", response_model=dict)
async def create_contact(data: ContactCreate, db = Depends(get_db)):
    try:
        contact = await add_contact(data.owner_phone, data.contact_phone, data.saved_name, db)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))

    return send_response(
        201,
        "Contact added successfully",
        {
            "contact_id": contact.contact_id,
            "owner_user_id": contact.owner_user_id,
            "contact_user_id": contact.contact_user_id,
            "saved_name": contact.saved_name,
            "added_at": contact.added_at.isoformat() if contact.added_at else None,
        },
    )


@contactRouter.get("/", response_model=dict)
async def fetch_contacts(owner_phone: str, db = Depends(get_db)):
    try:
        contacts = await get_contacts(owner_phone, db)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))

    return send_response(200, "Contacts fetched successfully", contacts)
