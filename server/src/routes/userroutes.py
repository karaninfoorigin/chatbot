from fastapi import APIRouter, HTTPException, Response, Cookie
from schemas import PhoneRequest, AuthResponse
from server.src.services.userservice import login_or_register
from utils.jwthandler import decode_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


def validate_phone_number(phone: str):
    if not phone.isdigit():
        raise HTTPException(status_code=400, detail="Phone number must contain only digits")

    if len(phone) != 10:
        raise HTTPException(status_code=400, detail="Phone number must be 10 digits")

    if int(phone[0]) <= 5:
        raise HTTPException(status_code=400, detail="Phone number must start with digits 6-9")


@router.post("/login", response_model=AuthResponse)
async def login(data: PhoneRequest, response: Response):
    phone = data.phone_number.strip()

    validate_phone_number(phone)

    result = await login_or_register(phone)

    response.set_cookie(
        key="access_token",
        value=result["access_token"],
        httponly=True,
        secure=False,  
        samesite="Lax",
        max_age=86400
    )

    return {
        "id": result["id"],
        "phone_number": result["phone_number"],
        "message": result["message"]
    }


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}