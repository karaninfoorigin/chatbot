from sqlalchemy import select
from src.database.models.users import Users  # Your SQLAlchemy User model
from src.database.session import get_db, DBSession
from utils.jwthandler import create_access_token

async def login_or_register(phone_number: str, db: DBSession):
    # Check if user exists
    result = await db.execute(select(Users).where(Users.phone_number == phone_number))
    user = result.scalar_one_or_none()

    if user:
        token = create_access_token({"user_id": user.user_id})
        return {
            "id": user.user_id,
            "phone_number": user.phone_number,
            "access_token": token,
            "message": "User logged in"
        }

    # If user doesn’t exist, create
    new_user = Users(phone_number=phone_number, username=f"User{phone_number[-4:]}")
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    token = create_access_token({"user_id": new_user.user_id})

    return {
        "id": new_user.user_id,
        "phone_number": new_user.phone_number,
        "access_token": token,
        "message": "User registered and logged in"
    }