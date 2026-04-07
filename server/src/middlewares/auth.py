from typing import Annotated
from utils.jwthandler import decode_access_token
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError
from src.common.app_error import AppError
from fastapi import Request

security = HTTPBearer()


def authenticate(
    request : Request,
):

    token = request.cookies.get("access_token")

    if not token:
        raise AppError("Access token required", 401)

    try:
        payload = decode_access_token(token)
        if not payload:
            raise AppError("Invalid token", 401)

        user_id = payload.get("user_id")

        if not user_id:
            raise AppError("Invalid token", 401)

        return user_id

    except JWTError:
        raise AppError("Invalid or expired token", 401)


ANNOTATED_AUTHENTICATE = Annotated[dict, Depends(authenticate)]