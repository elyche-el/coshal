import hashlib
import hmac
import json
import httpx
from decimal import Decimal
from app.core.config import settings, get_ligdicash_base_url


class LigdiCashService:
    def __init__(self):
        self.api_key = settings.LIGDICASH_API_KEY
        self.api_secret = settings.LIGDICASH_API_SECRET
        self.webhook_secret = settings.LIGDICASH_WEBHOOK_SECRET
        self.base_url = get_ligdicash_base_url()

    def _headers(self) -> dict:
        return {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json", "X-Sandbox": str(settings.LIGDICASH_SANDBOX).lower()}

    def _sign(self, payload: str) -> str:
        return hmac.new(self.api_secret.encode(), payload.encode(), hashlib.sha256).hexdigest()

    def verify_webhook_signature(self, payload: str, signature: str) -> bool:
        expected = hmac.new(self.webhook_secret.encode(), payload.encode(), hashlib.sha256).hexdigest()
        return hmac.compare_digest(expected, signature)

    async def initiate_payment(self, amount: Decimal, phone_number: str, order_ref: str, return_url: str, cancel_url: str) -> dict:
        payload = {"amount": float(amount), "currency": "USD", "phone": phone_number, "description": f"Coshal #{order_ref[:8]}", "reference": order_ref, "return_url": return_url, "cancel_url": cancel_url, "escrow": True, "escrow_duration": 30}
        body_str = json.dumps(payload, sort_keys=True)
        headers = self._headers()
        headers["X-Signature"] = self._sign(body_str)
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(f"{self.base_url}/payments/initiate", json=payload, headers=headers)
        if resp.status_code != 200:
            raise LigdiCashError(f"Échec paiement: {resp.text}")
        return resp.json()

    async def check_payment_status(self, tx_ref: str) -> dict:
        headers = self._headers()
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.get(f"{self.base_url}/payments/{tx_ref}/status", headers=headers)
        if resp.status_code != 200:
            raise LigdiCashError(f"Échec statut: {resp.text}")
        return resp.json()

    async def release_escrow(self, tx_ref: str, amount: Decimal, recipient_phone: str) -> dict:
        payload = {"transaction_ref": tx_ref, "amount": float(amount), "recipient_phone": recipient_phone, "reason": "order_completed"}
        body_str = json.dumps(payload, sort_keys=True)
        headers = self._headers()
        headers["X-Signature"] = self._sign(body_str)
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(f"{self.base_url}/escrow/release", json=payload, headers=headers)
        if resp.status_code != 200:
            raise LigdiCashError(f"Échec escrow: {resp.text}")
        return resp.json()

    async def refund_payment(self, tx_ref: str, amount: Decimal, reason: str) -> dict:
        payload = {"transaction_ref": tx_ref, "amount": float(amount), "reason": reason}
        body_str = json.dumps(payload, sort_keys=True)
        headers = self._headers()
        headers["X-Signature"] = self._sign(body_str)
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(f"{self.base_url}/payments/refund", json=payload, headers=headers)
        if resp.status_code != 200:
            raise LigdiCashError(f"Échec refund: {resp.text}")
        return resp.json()


class LigdiCashError(Exception):
    pass


ligdicash_service = LigdiCashService()
