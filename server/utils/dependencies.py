# utils/dependencies.py
from fastapi import Cookie, HTTPException
from utils.jwthandler import decode_access_token


async def get_current_user(access_token: str = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    payload = decode_access_token(access_token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return payload["user_id"]