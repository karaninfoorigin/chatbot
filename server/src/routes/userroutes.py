from fastapi import APIRouter, HTTPException, Response, Cookie
from src.schema.authSchema import PhoneRequest
from src.services.userservice import login_or_register, fetchMe
from utils.jwthandler import decode_access_token
from src.common.response import Response as authResponse, send_response
from src.database.session import DBSession, get_db
from fastapi import Depends
from src.middlewares.auth import authenticate
userRouter = APIRouter(prefix="/auth", tags=["Auth"])


def validate_phone_number(phone: str):
    if not phone.isdigit():
        raise HTTPException(status_code=400, detail="Phone number must contain only digits")

    if len(phone) != 10:
        raise HTTPException(status_code=400, detail="Phone number must be 10 digits")

    if int(phone[0]) <= 5:
        raise HTTPException(status_code=400, detail="Phone number must start with digits 6-9")


@userRouter.post("/login", response_model=authResponse)
async def login(data: PhoneRequest, response: Response, db: DBSession):
    print("i am here ")
    phone = data.phone.strip()
    validate_phone_number(phone)

    result = await login_or_register(phone, db)
    print("i am in the login route")
    response.set_cookie(
        key="access_token",
        value=result["access_token"],
        httponly=True,
        secure=False,
        samesite="Lax",
        max_age=86400
    )

    return send_response(201, "Logged In Successfully", result)


@userRouter.get("/fetchMe")
async def fetchMeRoute(response: Response, db : DBSession, user_id : int = Depends(authenticate)):
    return await fetchMe(user_id, db)

@userRouter.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}