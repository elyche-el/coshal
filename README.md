# Coshal — Plateforme de Freelancing Africaine

![Coshal Banner](https://img.shields.io/badge/Coshal-v1.0-10B981?style=for-the-badge)
![Stack](https://img.shields.io/badge/Next.js-FastAPI-PostgreSQL-131B2E?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)

> **La plateforme de freelancing pensée pour l'Afrique et l'international.**
> Paiement sécurisé par LigdiCash, séquestre intégré, catalogue public optimisé SEO.

---

## 🚀 Stack Technique

| Couche         | Technologie                        |
| -------------- | ---------------------------------- |
| **Frontend**   | Next.js 14 + React 18 + Tailwind CSS |
| **Backend**    | Python 3.12 + FastAPI              |
| **Base de données** | PostgreSQL 16                 |
| **ORM**        | SQLAlchemy 2.0 (async)             |
| **Paiement**   | LigdiCash API (Mobile Money + Escrow) |

---

## 🎨 Design System

| Élément               | Couleur / Code  |
| --------------------- | --------------- |
| Fond principal        | `#0B0F19` (Noir profond) |
| Conteneurs, cartes    | `#131B2E` (Bleu nuit) |
| Barres de navigation  | `#131B2E` / `#1E2235` |
| CTA, prix, succès     | `#10B981` (Vert vif) |
| Mode sombre           | Natif + forcé |

---

## ⚡ Démarrage Rapide

```bash
git clone https://github.com/elyche-el/coshal.git
cd coshal
docker compose up -d

# Frontend : http://localhost:3000
# API Docs  : http://localhost:8000/api/docs
```

---

## 🔐 Sécurité & Paiement LigdiCash

1. Client initie la commande
2. Paiement LigdiCash (Mobile Money)
3. Webhook HMAC-SHA256 sécurisé confirme le paiement
4. Fonds placés en séquestre (Escrow)
5. Freelance livre le service
6. Client valide → Fonds libérés vers le freelance

---

## 📝 Licence

MIT © 2026 Coshal
