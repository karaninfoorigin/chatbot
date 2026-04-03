# services/userservice.py
from db import get_db
from utils.jwthandler import create_access_token


async def login_or_register(phone_number: str):
    conn = await get_db()

    try:
        user = await conn.fetchrow(
            "SELECT id, phone_number FROM users WHERE phone_number = $1",
            phone_number
        )

        if user:
            token = create_access_token({"user_id": user["id"]})

            return {
                "id": user["id"],
                "phone_number": user["phone_number"],
                "access_token": token,
                "message": "User logged in"
            }

        new_user = await conn.fetchrow(
            """
            INSERT INTO users (phone_number)
            VALUES ($1)
            RETURNING id, phone_number
            """,
            phone_number
        )

        token = create_access_token({"user_id": new_user["id"]})

        return {
            "id": new_user["id"],
            "phone_number": new_user["phone_number"],
            "access_token": token,
            "message": "User registered and logged in"
        }

    finally:
        await conn.close()