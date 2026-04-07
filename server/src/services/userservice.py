from sqlalchemy import select, text
from src.database.models import Users  # Your SQLAlchemy User model
from src.database.session import get_db, DBSession
from utils.jwthandler import create_access_token

async def login_or_register(phone_number: str, db: DBSession):
    # Check if user exists
    result = await db.execute(text("select * from users where phone_number = '8989887877';"))
    print(result.fetchone())
    user = result.scalar_one_or_none()

    if user:
        token = create_access_token({"user_id": user.id})
        return {
            "id": user.id,
            "phone_number": user.phone_number,
            "access_token": token,
            "message": "User logged in"
        }

    # If user doesn’t exist, create
    new_user = Users(phone_number=phone_number)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    token = create_access_token({"user_id": new_user.id})

    return {
        "id": new_user.id,
        "phone_number": new_user.phone_number,
        "access_token": token,
        "message": "User registered and logged in"
    }