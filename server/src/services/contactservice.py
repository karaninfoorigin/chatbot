from typing import Optional
from sqlalchemy import select
from src.database.models.users import Users
from src.database.models.contact import Contact


async def add_contact(owner_phone: str, contact_phone: str, saved_name: Optional[str], db):
    owner_result = await db.execute(select(Users).where(Users.phone_number == owner_phone))
    owner = owner_result.scalar_one_or_none()
    if not owner:
        raise ValueError("Owner user not found")

    contact_result = await db.execute(select(Users).where(Users.phone_number == contact_phone))
    contact_user = contact_result.scalar_one_or_none()

    if owner.phone_number == contact_phone:
        raise ValueError("Cannot add yourself as a contact")

    if not contact_user:
        contact_user = Users(
            phone_number=contact_phone,
            username=f"User{contact_phone[-4:]}",
        )
        db.add(contact_user)
        await db.commit()
        await db.refresh(contact_user)

    existing = await db.execute(
        select(Contact).where(
            Contact.owner_user_id == owner.user_id,
            Contact.contact_user_id == contact_user.user_id,
        )
    )
    existing_contact = existing.scalar_one_or_none()
    if existing_contact:
        return existing_contact

    new_contact = Contact(
        owner_user_id=owner.user_id,
        contact_user_id=contact_user.user_id,
        saved_name=saved_name or contact_user.username,
    )
    db.add(new_contact)
    await db.commit()
    await db.refresh(new_contact)
    return new_contact
