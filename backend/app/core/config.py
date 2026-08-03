from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "Coshal API"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/coshal"
    JWT_SECRET_KEY: str = "change-me"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    LIGDICASH_API_KEY: str = ""
    LIGDICASH_API_SECRET: str = ""
    LIGDICASH_BASE_URL: str = "https://api.ligdicash.com/v1"
    LIGDICASH_SANDBOX_URL: str = "https://api.sandbox.ligdicash.com/v1"
    LIGDICASH_SANDBOX: bool = True
    LIGDICASH_WEBHOOK_SECRET: str = ""
    LIGDICASH_PLATFORM_FEE_PERCENT: float = 10.0
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "https://coshal.com"]
    PLATFORM_NAME: str = "Coshal"
    PLATFORM_URL: str = "https://coshal.com"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()


def get_ligdicash_base_url() -> str:
    return settings.LIGDICASH_SANDBOX_URL if settings.LIGDICASH_SANDBOX else settings.LIGDICASH_BASE_URL
