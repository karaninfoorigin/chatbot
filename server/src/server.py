from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config.setting import settings
from src.database.session import check_db


# ROUTES



app = FastAPI(
    title="WhatsApp Clone",
    version="1.0.0"
)

# -----------------------------
# MIDDLEWARES
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:5174", settings.FRONTEND_URL],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# EXCEPTION HANDLER
# -----------------------------


# -----------------------------
# DATABASE CONNECTION TEST
# -----------------------------

check_db()


# -----------------------------
# ROUTES
# -----------------------------



# -----------------------------
# ROOT ROUTE
# -----------------------------

@app.get("/")
async def root():
    return {"message": "Task Management API Running"}