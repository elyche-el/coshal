"""Configuration settings for Coshal MVP."""
import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""
    APP_NAME: str = "coshal"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./coshal.db")
    # Set SECRET_KEY in the environment; do not use a known fallback.
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    BACKEND_CORS_ORIGINS: list = []

    class Config:
        case_sensitive = True


settings = Settings()
