from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import engine
from app.api.v1 import auth, services, orders, ligdicash, users


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        pass
    yield
    await engine.dispose()


app = FastAPI(
    title="Coshal API",
    description="Plateforme de freelancing - Backend API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(services.router, prefix="/api/v1/services", tags=["Services"])
app.include_router(orders.router, prefix="/api/v1/orders", tags=["Orders"])
app.include_router(ligdicash.router, prefix="/api/v1/ligdicash", tags=["LigdiCash"])


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "coshal-api", "version": "1.0.0"}
