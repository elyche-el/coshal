from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.service import Service

router = APIRouter()


@router.get("/")
async def list_services(
    category: str = Query(None), search: str = Query(None),
    min_price: float = Query(None), max_price: float = Query(None),
    seller_id: str = Query(None), sort: str = Query("newest"),
    page: int = Query(1, ge=1), limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    query = select(Service).where(Service.status == "published")
    if seller_id:
        query = query.where(Service.seller_id == seller_id)
    if sort == "price_asc":
        query = query.order_by(Service.base_price.asc())
    elif sort == "price_desc":
        query = query.order_by(Service.base_price.desc())
    elif sort == "popular":
        query = query.order_by(Service.order_count.desc())
    else:
        query = query.order_by(Service.created_at.desc())
    offset = (page - 1) * limit
    query = query.offset(offset).limit(limit)
    result = await db.execute(query)
    services = result.scalars().all()
    return {"services": services, "page": page, "limit": limit}


@router.get("/{service_id}")
async def get_service(service_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.id == service_id, Service.status == "published"))
    service = result.scalar_one_or_none()
    if not service:
        raise HTTPException(status_code=404, detail="Service introuvable")
    service.view_count = (service.view_count or 0) + 1
    return service
