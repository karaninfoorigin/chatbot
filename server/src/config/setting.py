from pathlib import Path
from pydantic import ConfigDict
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
class Setting(BaseSettings):
    model_config = ConfigDict(env_file=BASE_DIR / ".env")

    ENV: str = "development"
    PORT: int = 8000

    DB_PROTOCOL: str = "postgresql"
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "12345"
    DB_HOST: str = "localhost"
    DB_NAME: str = ""
    DB_OPTIONS: str = ""

    DEBUG: bool = True
    APP_NAME: str = "WhatsApp Clone"

    JWT_SECRET: str = ""
    REFRESH_SECRET: str = ""

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    FRONTEND_URL: str = "http://localhost:5173"

settings = Setting()

# print(settings)