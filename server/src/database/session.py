from typing import Annotated, AsyncGenerator

from fastapi import Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession,
)

from src.config.setting import settings


DATABASE_URL = (
    f"postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PASSWORD}"
    f"@{settings.DB_HOST}/{settings.DB_NAME}"
    f"?{settings.DB_OPTIONS}"
)


engine = create_async_engine(
    DATABASE_URL,
    echo=settings.DEBUG,
    pool_pre_ping=True,   # important for Neon
)


AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    expire_on_commit=False,
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as db:
        yield db


DBSession = Annotated[AsyncSession, Depends(get_db)]


async def check_db():
    try:
        async with AsyncSessionLocal() as db:
            await db.execute(text("SELECT 1"))
        print("-------------------- Database connected successfully --------------------")
    except Exception as e:
        print("-------------------- Database connection failed:", e, " --------------------")