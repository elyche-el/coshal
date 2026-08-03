"""Modèle Utilisateur - Basé sur auth.users Supabase + profiles public"""
import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Boolean, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class Profile(Base):
    __tablename__ = "profiles"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name: Mapped[str] = mapped_column(Text, nullable=False)
    avatar_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    role: Mapped[str] = mapped_column(String(50), nullable=False)
    country: Mapped[str] = mapped_column(Text, nullable=False)
    city: Mapped[str | None] = mapped_column(Text, nullable=True)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)
    website: Mapped[str | None] = mapped_column(Text, nullable=True)
    phone: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    freelancer_profile = relationship("FreelancerProfile", back_populates="profile", uselist=False)
    services = relationship("Service", back_populates="freelancer", foreign_keys="Service.freelancer_id")
    orders_as_client = relationship("Order", back_populates="client", foreign_keys="Order.client_id")
    orders_as_freelancer = relationship("Order", back_populates="freelancer", foreign_keys="Order.freelancer_id")

class FreelancerProfile(Base):
    __tablename__ = "freelancer_profiles"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    headline: Mapped[str | None] = mapped_column(Text, nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    skills: Mapped[list | None] = mapped_column(Text, nullable=True)
    languages: Mapped[list | None] = mapped_column(Text, nullable=True)
    portfolio_urls: Mapped[list | None] = mapped_column(Text, nullable=True)
    average_rating: Mapped[float | None] = mapped_column(nullable=True)
    total_reviews: Mapped[int | None] = mapped_column(nullable=True)
    total_sales: Mapped[int | None] = mapped_column(nullable=True)
    verified: Mapped[bool | None] = mapped_column(Boolean, default=False)
    available: Mapped[bool | None] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    profile = relationship("Profile", back_populates="freelancer_profile")
