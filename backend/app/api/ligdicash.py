import json
from datetime import datetime, timezone
from decimal import Decimal
from fastapi import APIRouter, Depends, HTTPException, Request, Header, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.core.database import get_db
from app.core.security import get_current_user
from app.core.ligdicash import ligdicash_service, LigdiCashError
from app.models.user import User
from app.models.order import Order
from app.models.transaction import Transaction
from app.schemas.ligdicash import LigdiCashPaymentRequest, LigdiCashEscrowReleaseRequest

router = APIRouter()


@router.post("/pay/initiate")
async def initiate_payment(payload: LigdiCashPaymentRequest, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Order).where(Order.id == payload.order_id, Order.buyer_id == current_user.id))
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Commande introuvable")
    if order.status != "pending_payment":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Statut invalide: {order.status}")
    try:
        ligdicash_result = await ligdicash_service.initiate_payment(amount=payload.amount, phone_number=payload.phone_number, order_ref=str(order.id), return_url=payload.return_url, cancel_url=payload.cancel_url)
        transaction = Transaction(order_id=order.id, user_id=current_user.id, ligdicash_tx_ref=ligdicash_result["transaction_ref"], ligdicash_pay_token=ligdicash_result.get("pay_token"), amount=payload.amount, currency=payload.currency, tx_type="escrow_hold", tx_status="pending", platform_fee=Decimal(str(float(payload.amount) * settings.LIGDICASH_PLATFORM_FEE_PERCENT / 100)))
        db.add(transaction)
        order.status = "payment_escrow"
        await db.flush()
        return {"transaction_ref": ligdicash_result["transaction_ref"], "pay_token": ligdicash_result.get("pay_token"), "redirect_url": ligdicash_result.get("redirect_url"), "status": "pending"}
    except LigdiCashError as e:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(e))


@router.post("/webhook")
async def ligdicash_webhook(request: Request, x_ligdicash_signature: str = Header(None, alias="X-LigdiCash-Signature"), db: AsyncSession = Depends(get_db)):
    raw_body = await request.body()
    body_str = raw_body.decode("utf-8")
    if not x_ligdicash_signature:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Signature manquante")
    if not ligdicash_service.verify_webhook_signature(body_str, x_ligdicash_signature):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Signature invalide")
    try:
        payload = json.loads(body_str)
    except json.JSONDecodeError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="JSON invalide")
    transaction_ref = payload.get("transaction_ref")
    tx_status = payload.get("status")
    if not transaction_ref or not tx_status:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Payload incomplet")
    result = await db.execute(select(Transaction).where(Transaction.ligdicash_tx_ref == transaction_ref))
    transaction = result.scalar_one_or_none()
    if not transaction:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Transaction {transaction_ref} introuvable")
    transaction.ligdicash_raw_data = payload
    transaction.webhook_received_at = datetime.now(timezone.utc)
    transaction.webhook_signature = x_ligdicash_signature
    if tx_status in ("success", "completed"):
        transaction.tx_status = "completed"
        order_result = await db.execute(select(Order).where(Order.id == transaction.order_id))
        order = order_result.scalar_one_or_none()
        if order:
            order.status = "in_progress"
    elif tx_status in ("failed", "cancelled"):
        transaction.tx_status = "failed"
        order_result = await db.execute(select(Order).where(Order.id == transaction.order_id))
        order = order_result.scalar_one_or_none()
        if order:
            order.status = "cancelled"
    elif tx_status in ("pending", "processing"):
        transaction.tx_status = "processing"
    else:
        transaction.tx_status = "pending"
    await db.flush()
    return {"received": True, "transaction_ref": transaction_ref, "status": tx_status}


@router.post("/escrow/release")
async def release_escrow(payload: LigdiCashEscrowReleaseRequest, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Transaction).where(Transaction.ligdicash_tx_ref == payload.transaction_ref))
    transaction = result.scalar_one_or_none()
    if not transaction:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction introuvable")
    order_result = await db.execute(select(Order).where(Order.id == transaction.order_id))
    order = order_result.scalar_one_or_none()
    if not order or order.buyer_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Non autorisé")
    try:
        result = await ligdicash_service.release_escrow(transaction_ref=payload.transaction_ref, amount=payload.amount, recipient_phone=payload.recipient_phone)
        release_tx = Transaction(order_id=order.id, user_id=current_user.id, amount=payload.amount, tx_type="escrow_release", tx_status="completed", ligdicash_tx_ref=result.get("transaction_ref"))
        db.add(release_tx)
        order.status = "completed"
        order.completed_at = datetime.now(timezone.utc)
        await db.flush()
        return {"status": "released", "detail": "Fonds libérés avec succès"}
    except LigdiCashError as e:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(e))


@router.get("/status/{transaction_ref}")
async def get_payment_status(transaction_ref: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Transaction).where(Transaction.ligdicash_tx_ref == transaction_ref))
    tx = result.scalar_one_or_none()
    if tx:
        return {"transaction_ref": transaction_ref, "status": tx.tx_status, "order_status": tx.order.status if tx.order else None}
    try:
        return await ligdicash_service.check_payment_status(transaction_ref)
    except LigdiCashError as e:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(e))
