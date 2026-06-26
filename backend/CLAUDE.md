# TV Repair CRM — Backend

## Project Identity
This is the **backend API** for a TV Repairing & Speaker Manufacturing business CRM. It serves the public website, customer portal, technician app, and admin panel.

## Tech Stack
- **Runtime**: Node.js 20 (LTS)
- **Framework**: Express.js (TypeScript)
- **Database**: MySQL 8 via Prisma ORM
- **Auth**: JWT (access token 15min + refresh token 7d in httpOnly cookie)
- **File Storage**: AWS S3 (photos, invoices, documents)
- **Email**: Nodemailer + SendGrid
- **SMS**: MSG91 or Fast2SMS
- **WhatsApp**: WhatsApp Business API (Meta) or Gupshup
- **Payment**: Razorpay
- **Real-time**: Socket.io
- **PDF**: Puppeteer or pdfmake
- **Queue**: Bull (Redis-backed) for async jobs (notifications, PDF gen)
- **Caching**: Redis (sessions, OTP, rate limiting)
- **Validation**: Zod
- **Testing**: Jest + Supertest

## Folder Structure
```
backend/
├── src/
│   ├── config/           # env config, database, redis, s3 clients
│   ├── modules/
│   │   ├── auth/         # JWT, OTP, refresh token
│   │   ├── leads/        # Lead CRUD, pipeline transitions
│   │   ├── tickets/      # Ticket lifecycle, tracking
│   │   ├── customers/    # Customer profiles
│   │   ├── technicians/  # Technician profiles, job assignment
│   │   ├── payments/     # Razorpay integration, transaction logging
│   │   ├── invoices/     # Invoice generation, PDF
│   │   ├── inventory/    # Stock management
│   │   ├── chat/         # Socket.io chat, message history
│   │   ├── notifications/ # SMS, Email, WhatsApp queue jobs
│   │   ├── reports/      # Analytics queries
│   │   ├── admin/        # Admin-only endpoints
│   │   └── content/      # CMS content management
│   ├── middleware/
│   │   ├── auth.middleware.ts     # JWT verification
│   │   ├── role.middleware.ts     # Role-based access
│   │   ├── validate.middleware.ts # Zod request validation
│   │   ├── upload.middleware.ts   # Multer + S3
│   │   └── ratelimit.middleware.ts
│   ├── shared/
│   │   ├── utils/         # helpers, formatters, ticket ID generator
│   │   ├── types/         # Shared TypeScript types
│   │   └── errors/        # Custom error classes, error handler
│   ├── jobs/              # Bull queue job processors
│   ├── sockets/           # Socket.io event handlers
│   └── app.ts             # Express app setup
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/
├── tests/
├── docs/                  # Module-wise documentation
├── .env.example
├── CLAUDE.md              # This file
└── agent.md               # AI agent instructions
```

## Database — MySQL via Prisma
Key models (see `prisma/schema.prisma`):
- `User` (customers, technicians, admins — role-based)
- `Lead` (lead pipeline)
- `Ticket` (service ticket with status history)
- `TicketStatus` (audit log of every status change)
- `Payment` (Razorpay transaction)
- `Invoice` (line items, totals)
- `InventoryItem` (spare parts, stock)
- `Message` (chat messages, per ticket)
- `Notification` (log of sent SMS/email/WhatsApp)
- `Content` (CMS data — testimonials, products)

## Ticket ID Generation
Format: `TVR-{YYYY}-{NNNN}` (zero-padded sequential per year)
Example: `TVR-2026-0001`
Implemented in `shared/utils/ticket-id.util.ts`

## API Structure
All routes prefixed `/api/v1/`

| Prefix | Audience |
|--------|----------|
| `/api/v1/auth/` | All users |
| `/api/v1/public/` | No auth (website forms) |
| `/api/v1/customer/` | Customer role |
| `/api/v1/technician/` | Technician role |
| `/api/v1/manager/` | Manager role |
| `/api/v1/admin/` | Admin role |

## Auth Flow
1. Customer: phone → OTP (Redis, 5min TTL) → verify → JWT issued
2. Staff (technician/admin): email + password → JWT issued
3. JWT: 15min access token + 7d refresh token (httpOnly cookie)
4. Refresh: `POST /api/v1/auth/refresh` → new access token

## Environment Variables
```
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_REGION=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
MSG91_AUTH_KEY=
SENDGRID_API_KEY=
WHATSAPP_API_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
FRONTEND_URL=
PORT=4000
```

## Key Principles
- All routes use `validate.middleware.ts` with Zod schemas before controller
- All DB queries go through Prisma — no raw SQL except complex report queries
- All async errors use `next(error)` — global error handler in `app.ts`
- Razorpay webhooks verified with signature before processing
- File uploads: Multer → S3 directly (stream, no disk write)
- Bull queues handle all notifications (never block request thread)
- Rate limiting on auth routes: 5 attempts / 15min per IP
- OTPs: 6-digit, Redis TTL 5min, max 3 attempts
- Soft deletes for customers, leads, tickets (deletedAt field)

## Coding Conventions
- File names: `kebab-case.ts`
- Each module: `router.ts`, `controller.ts`, `service.ts`, `schema.ts`
- Controllers are thin — business logic in services
- Services are thin — DB queries in a separate `repository.ts` if complex
- Always return consistent JSON: `{ success, data, message, meta? }`
- HTTP status codes: 200 (ok), 201 (created), 400 (validation), 401 (unauth),
  403 (forbidden), 404 (not found), 409 (conflict), 500 (server error)
