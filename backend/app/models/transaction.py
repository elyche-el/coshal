import uuid
from datetime import datetime, timezone
from decimal import Decimal
from sqlalchemy import String, Text, Numeric, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class Transaction(Base):
    __tablename__ = "transactions"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    ligdicash_tx_ref: Mapped[str | None] = mapped_column(String(255), unique=True, nullable=True)
    ligdicash_pay_token: Mapped[str | None] = mapped_column(String(255), nullable=True)
    ligdicash_raw_data: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    amount: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    currency: Mapped[str] = mapped_column(String(3), default="USD")
    tx_type: Mapped[str] = mapped_column(Enum("payment", "escrow_hold", "escrow_release", "refund", "payout", name="transaction_type"), nullable=False)
    tx_status: Mapped[str] = mapped_column(Enum("pending", "processing", "completed", "failed", "reversed", name="transaction_status"), default="pending")
    ligdicash_fee: Mapped[Decimal] = mapped_column(Numeric(12, 2), default=0)
    platform_fee: Mapped[Decimal] = mapped_column(Numeric(12, 2), default=0)
    webhook_received_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    webhook_signature: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    order = relationship("Order", back_populates="transactions")
    user = relationship("User", back_populates="transactions")
