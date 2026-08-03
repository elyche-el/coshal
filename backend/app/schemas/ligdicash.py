from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal


class LigdiCashPaymentRequest(BaseModel):
    order_id: str
    amount: Decimal
    currency: str = "USD"
    phone_number: str
    return_url: str
    cancel_url: str


class LigdiCashEscrowReleaseRequest(BaseModel):
    transaction_ref: str
    amount: Decimal
    recipient_phone: str
    reason: str = "order_completed"


class LigdiCashRefundRequest(BaseModel):
    transaction_ref: str
    amount: Decimal
    reason: str
