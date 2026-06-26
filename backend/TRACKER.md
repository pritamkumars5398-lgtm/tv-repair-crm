# Backend Tracker — TV Repair CRM
> Mark ✅ when code exists and endpoint works. ⚠️ partial. ❌ not started. 🔲 optional.
> Verify against: this file → actual files in `backend/src/` → API response in Postman/tests.

**Last updated**: 2026-06-26
**Current phase**: Pre-development

---

## LEGEND
```
✅  Done — code exists, tested
⚠️  Partial — started but incomplete
❌  Not started
🔲  Optional — confirm with client first
```

---

## PHASE 1 — Foundation & Infrastructure

### 1.1 Project Setup
| Task | Status | File |
|------|--------|------|
| Node.js + Express + TypeScript initialized | ❌ | `package.json`, `tsconfig.json` |
| All dependencies installed | ❌ | `package.json` |
| ESLint + Prettier configured | ❌ | `.eslintrc.js` |
| Path alias `@/*` → `src/*` | ❌ | `tsconfig.json` |
| `.env.example` created | ❌ | `.env.example` |
| `src/config/env.ts` (Zod validation, fail-fast) | ❌ | `src/config/env.ts` |
| `src/config/database.ts` (Prisma singleton) | ❌ | `src/config/database.ts` |
| `src/config/redis.ts` (ioredis singleton) | ❌ | `src/config/redis.ts` |
| `src/config/s3.ts` (AWS S3 client) | ❌ | `src/config/s3.ts` |
| `src/config/razorpay.ts` | ❌ | `src/config/razorpay.ts` |
| `AppError` custom error class | ❌ | `src/shared/errors/AppError.ts` |
| Global error handler middleware | ❌ | `src/shared/errors/error-handler.ts` |
| `sendSuccess()` / `sendError()` helpers | ❌ | `src/shared/utils/response.util.ts` |
| Winston logger | ❌ | `src/shared/utils/logger.ts` |
| `src/app.ts` (helmet, cors, json, morgan, rate-limit) | ❌ | `src/app.ts` |
| `src/server.ts` (HTTP + Socket.io + listen) | ❌ | `src/server.ts` |

### 1.2 Database Schema
| Model | Status | Notes |
|-------|--------|-------|
| `User` | ❌ | roles: CUSTOMER, TECHNICIAN, MANAGER, ADMIN |
| `TechnicianProfile` | ❌ | employeeCode, skills, rating |
| `Lead` | ❌ | all 7 sources, 9-stage pipeline |
| `Ticket` | ❌ | TVR-YYYY-NNNN primary key |
| `TicketStatusHistory` | ❌ | full audit log |
| `Payment` | ❌ | Razorpay fields, type enum |
| `Invoice` | ❌ | INV-YYYY-NNNN, line items JSON |
| `Estimate` | ❌ | EST-YYYY-NNNN, approve/reject flow |
| `InventoryItem` | ❌ | category, reorderLevel |
| `Vendor` | ❌ | supplyCategory |
| `PurchaseOrder` | ❌ | PO-YYYY-NNNN, items JSON |
| `Service` | ❌ | service catalog (isActive) |
| `Message` | ❌ | chat per ticket |
| `Notification` | ❌ | SMS/Email/WhatsApp log |
| `CustomerRating` | ❌ | 1–5 star, @@unique ticketId |
| `Query` | ❌ | customer support queries |
| `Content` | ❌ | CMS sections |
| `TechnicianLocation` | ❌ | optional GPS |
| `Attendance` | ❌ | optional check-in/out |
| Migration run (`prisma migrate dev`) | ❌ | |
| Seed file (`prisma/seed.ts`) | ❌ | admin user, sample services, content |

### 1.3 Shared Utilities
| Task | Status | File |
|------|--------|------|
| `ticket-id.util.ts` (TVR-YYYY-NNNN generator) | ❌ | `src/shared/utils/ticket-id.util.ts` |
| `invoice-id.util.ts` (INV-YYYY-NNNN) | ❌ | `src/shared/utils/invoice-id.util.ts` |
| `estimate-id.util.ts` (EST-YYYY-NNNN) | ❌ | `src/shared/utils/estimate-id.util.ts` |
| `po-id.util.ts` (PO-YYYY-NNNN) | ❌ | `src/shared/utils/po-id.util.ts` |
| `otp.util.ts` (generate, store Redis, verify) | ❌ | `src/shared/utils/otp.util.ts` |
| Bull queues init (`notificationQueue`, `pdfQueue`) | ❌ | `src/jobs/queue.ts` |
| Socket.io `/chat` namespace + events | ❌ | `src/sockets/chat.socket.ts` |

### 1.4 Auth Module
| Endpoint | Status | Notes |
|----------|--------|-------|
| `POST /api/v1/auth/send-otp` | ❌ | 10-digit validation, Redis TTL 5min |
| `POST /api/v1/auth/verify-otp` | ❌ | upsert user, issue JWT |
| `POST /api/v1/auth/staff-login` | ❌ | bcrypt, roles: TECHNICIAN/MANAGER/ADMIN |
| `POST /api/v1/auth/refresh` | ❌ | httpOnly cookie |
| `POST /api/v1/auth/logout` | ❌ | clear cookie |
| `requireAuth` middleware | ❌ | `src/middleware/auth.middleware.ts` |
| `requireRole()` middleware | ❌ | |
| Rate limit: 3 OTP req/phone/10min | ❌ | Redis counter |
| Rate limit: 5 login attempts/IP/15min | ❌ | express-rate-limit |

### 1.5 Public Endpoints
| Endpoint | Status | Notes |
|----------|--------|-------|
| `POST /api/v1/public/leads` | ❌ | all 7 sources, queue admin notify |
| `POST /api/v1/public/inquiries` | ❌ | product inquiry |
| `GET /api/v1/public/track/:ticketId` | ❌ | rate limit 10/min, no PII |
| `GET /api/v1/public/content/:section` | ❌ | Redis cache 5min |
| `POST /api/v1/public/contact` | ❌ | |
| `GET /api/v1/public/services` | ❌ | isActive only, cache 10min |
| `POST /api/v1/public/ratings` | ❌ | post-delivery satisfaction (token-less) |

### 1.6 Booking + Payment Flow
| Endpoint | Status | Notes |
|----------|--------|-------|
| `POST /api/v1/public/bookings` | ❌ | create Lead + Razorpay order (₹250) |
| `POST /api/v1/public/bookings/verify-payment` | ❌ | verify sig → create Ticket + notify |
| `POST /api/v1/razorpay/webhook` | ❌ | sig verify, idempotent, raw body parser |

---

## PHASE 2 — Customer API

| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/customer/profile` | ❌ | |
| `PUT /api/v1/customer/profile` | ❌ | |
| `PUT /api/v1/customer/profile/password` | ❌ | bcrypt |
| `PUT /api/v1/customer/profile/notifications` | ❌ | SMS/Email/WhatsApp prefs |
| `GET /api/v1/customer/tickets` | ❌ | paginated, status filter |
| `GET /api/v1/customer/tickets/:ticketId` | ❌ | full detail, history, technician info |
| `POST /api/v1/customer/tickets/:ticketId/photos` | ❌ | Multer → S3 |
| `GET /api/v1/customer/payments` | ❌ | |
| `POST /api/v1/customer/payments/order` | ❌ | Razorpay order for invoice amount |
| `POST /api/v1/customer/payments/verify` | ❌ | verify sig → update Invoice |
| `GET /api/v1/customer/payments/:id/receipt/pdf` | ❌ | presigned S3 URL |
| `GET /api/v1/customer/invoices` | ❌ | |
| `GET /api/v1/customer/invoices/:invoiceId` | ❌ | |
| `GET /api/v1/customer/invoices/:invoiceId/pdf` | ❌ | generate if not exists |
| `GET /api/v1/customer/estimates/:estimateId` | ❌ | |
| `PUT /api/v1/customer/estimates/:estimateId/respond` | ❌ | APPROVED / REJECTED |
| `GET /api/v1/customer/queries` | ❌ | |
| `POST /api/v1/customer/queries` | ❌ | |
| `GET /api/v1/customer/tickets/:ticketId/messages` | ❌ | chat history + mark read |

---

## PHASE 3 — Technician API

| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/technician/jobs` | ❌ | filter by status/date |
| `GET /api/v1/technician/jobs/:ticketId` | ❌ | masked phone: 98XXXXX789 |
| `PUT /api/v1/technician/jobs/:ticketId/accept` | ❌ | status transition |
| `PUT /api/v1/technician/jobs/:ticketId/status` | ❌ | validate transition + history log + notify |
| `POST /api/v1/technician/jobs/:ticketId/photos` | ❌ | S3 upload, append to ticket.photos |
| `POST /api/v1/technician/jobs/:ticketId/notes` | ❌ | |
| `POST /api/v1/technician/jobs/:ticketId/parts-request` | ❌ | notify manager |
| `POST /api/v1/technician/jobs/:ticketId/estimate` | ❌ | EST-YYYY-NNNN, notify customer |
| `GET /api/v1/technician/jobs/:ticketId/service-report` | ❌ | PDF generation |
| `GET /api/v1/technician/stats` | ❌ | today/month summary |
| `GET /api/v1/technician/profile` | ❌ | |
| `PUT /api/v1/technician/profile` | ❌ | |
| `POST /api/v1/technician/location` | 🔲 | optional GPS |
| `POST /api/v1/technician/attendance/check-in` | 🔲 | optional |
| `POST /api/v1/technician/attendance/check-out` | 🔲 | optional |

---

## PHASE 4 — Admin & Manager API

### Lead Management
| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/admin/leads` | ❌ | all filters |
| `POST /api/v1/admin/leads` | ❌ | all 7 sources |
| `GET /api/v1/admin/leads/:leadId` | ❌ | |
| `PUT /api/v1/admin/leads/:leadId` | ❌ | status transition, auto-create Ticket on tv_received |
| `DELETE /api/v1/admin/leads/:leadId` | ❌ | soft delete |
| `POST /api/v1/admin/leads/bulk-assign` | ❌ | |

### Ticket Management
| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/admin/tickets` | ❌ | |
| `GET /api/v1/admin/tickets/:ticketId` | ❌ | |
| `PUT /api/v1/admin/tickets/:ticketId/assign` | ❌ | notify technician |
| `PUT /api/v1/admin/tickets/:ticketId/status` | ❌ | |
| `POST /api/v1/admin/tickets/:ticketId/notes` | ❌ | manager internal note |

### Customer & Technician
| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/admin/customers` | ❌ | |
| `GET /api/v1/admin/customers/:id` | ❌ | full history |
| `PUT /api/v1/admin/customers/:id` | ❌ | |
| `DELETE /api/v1/admin/customers/:id` | ❌ | soft delete |
| `GET /api/v1/admin/technicians` | ❌ | |
| `POST /api/v1/admin/technicians` | ❌ | create User + TechnicianProfile |
| `GET /api/v1/admin/technicians/:id` | ❌ | |
| `PUT /api/v1/admin/technicians/:id` | ❌ | |
| `DELETE /api/v1/admin/technicians/:id` | ❌ | soft delete |
| `GET /api/v1/admin/technicians/:id/performance` | ❌ | |
| `GET /api/v1/admin/technicians/locations` | 🔲 | optional GPS |

### Service Catalog (Module 14)
| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/admin/services` | ❌ | |
| `POST /api/v1/admin/services` | ❌ | |
| `GET /api/v1/admin/services/:id` | ❌ | |
| `PUT /api/v1/admin/services/:id` | ❌ | |
| `DELETE /api/v1/admin/services/:id` | ❌ | toggle isActive |

### Inventory
| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/admin/inventory` | ❌ | TV Spare Parts, Speaker Components, Electronic Parts |
| `POST /api/v1/admin/inventory` | ❌ | |
| `GET /api/v1/admin/inventory/:id` | ❌ | |
| `PUT /api/v1/admin/inventory/:id` | ❌ | |
| `DELETE /api/v1/admin/inventory/:id` | ❌ | |
| `POST /api/v1/admin/inventory/:id/stock-in` | ❌ | |
| `POST /api/v1/admin/inventory/:id/stock-out` | ❌ | |
| `GET /api/v1/admin/inventory/alerts/low-stock` | ❌ | |

### Vendors & Purchase Orders (Module 11)
| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/admin/vendors` | ❌ | |
| `POST /api/v1/admin/vendors` | ❌ | |
| `GET /api/v1/admin/vendors/:id` | ❌ | |
| `PUT /api/v1/admin/vendors/:id` | ❌ | |
| `DELETE /api/v1/admin/vendors/:id` | ❌ | |
| `GET /api/v1/admin/purchase-orders` | ❌ | |
| `POST /api/v1/admin/purchase-orders` | ❌ | |
| `GET /api/v1/admin/purchase-orders/:id` | ❌ | |
| `PUT /api/v1/admin/purchase-orders/:id/send` | ❌ | email vendor |
| `PUT /api/v1/admin/purchase-orders/:id/receive` | ❌ | auto stock-in all items |
| `GET /api/v1/admin/purchase-orders/:id/pdf` | ❌ | |

### Estimates (Module 12)
| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/admin/estimates` | ❌ | |
| `POST /api/v1/admin/estimates` | ❌ | EST-YYYY-NNNN |
| `GET /api/v1/admin/estimates/:id` | ❌ | |
| `PUT /api/v1/admin/estimates/:id` | ❌ | edit while DRAFT |
| `POST /api/v1/admin/estimates/:id/send` | ❌ | notify customer |
| `POST /api/v1/admin/estimates/:id/convert-to-invoice` | ❌ | |
| `GET /api/v1/admin/estimates/:id/pdf` | ❌ | |

### Invoices (Module 12)
| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/admin/invoices` | ❌ | |
| `POST /api/v1/admin/invoices` | ❌ | INV-YYYY-NNNN, Tax/Service Invoice type |
| `GET /api/v1/admin/invoices/:id` | ❌ | |
| `PUT /api/v1/admin/invoices/:id` | ❌ | edit while DRAFT |
| `POST /api/v1/admin/invoices/:id/send` | ❌ | PDF → email + WhatsApp |
| `GET /api/v1/admin/invoices/:id/pdf` | ❌ | presigned S3 URL |

### Payment Management
| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/admin/payments` | ❌ | |
| `GET /api/v1/admin/payments/summary` | ❌ | today/week/month revenue |
| `POST /api/v1/admin/payments/:id/refund` | ❌ | Razorpay refund API |
| `GET /api/v1/admin/payments/:id/receipt/pdf` | ❌ | auto-generated on capture |

### Reports & Analytics (Module 13)
| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/admin/reports/leads` | ❌ | by source/status, funnel |
| `GET /api/v1/admin/reports/revenue` | ❌ | by service type, method |
| `GET /api/v1/admin/reports/technician-performance` | ❌ | |
| `GET /api/v1/admin/reports/tickets` | ❌ | SLA compliance |
| `GET /api/v1/admin/reports/customers` | ❌ | repeat, lifetime value |
| `GET /api/v1/admin/reports/satisfaction` | ❌ | avg rating, distribution |
| `GET /api/v1/admin/reports/export` | ❌ | CSV/Excel/PDF via Bull queue |
| `GET /api/v1/admin/reports/export/:jobId/status` | ❌ | poll for export completion |

### Content & Settings
| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /api/v1/admin/content/:section` | ❌ | |
| `PUT /api/v1/admin/content/:section` | ❌ | invalidate Redis cache |
| `POST /api/v1/admin/content/upload` | ❌ | S3 image upload |
| `GET /api/v1/admin/settings` | ❌ | |
| `PUT /api/v1/admin/settings` | ❌ | templates, fee, keys |
| `GET /api/v1/admin/users` | ❌ | admin/manager user list |
| `POST /api/v1/admin/users` | ❌ | create admin/manager |
| `PUT /api/v1/admin/users/:id` | ❌ | toggle isActive, change role |

---

## PHASE 5 — Notifications, PDFs & Deployment

### Notification Templates
| Template | Channel | Status | Trigger |
|----------|---------|--------|---------|
| `BOOKING_CONFIRMED` | SMS + WhatsApp + Email | ❌ | On booking verify-payment |
| `TICKET_STATUS_CHANGED` | SMS + WhatsApp | ❌ | On any status update |
| `TECHNICIAN_ASSIGNED` | SMS | ❌ | On admin assign |
| `ESTIMATE_SENT` | SMS + WhatsApp + Email | ❌ | On estimate send |
| `READY_FOR_DELIVERY` | SMS + WhatsApp | ❌ | On status ready_for_delivery |
| `DELIVERY_ALERT` | SMS + WhatsApp | ❌ | On status delivered |
| `INVOICE_SENT` | Email + WhatsApp | ❌ | On invoice send |
| `PAYMENT_RECEIVED` | SMS + Email | ❌ | On payment capture |
| **`PAYMENT_REMINDER`** | SMS + WhatsApp | ❌ | 24h + 48h after invoice if unpaid |
| **`SATISFACTION_SURVEY`** | SMS + WhatsApp | ❌ | 2h after delivered status |
| `OTP` | SMS | ❌ | On send-otp |

### PDF Generation
| Document | Status | Notes |
|----------|--------|-------|
| Tax Invoice PDF (Puppeteer) | ❌ | GST fields, letterhead |
| Service Invoice PDF | ❌ | |
| Repair Estimate PDF | ❌ | |
| Payment Receipt PDF | ❌ | auto on capture |
| Service Report PDF (technician) | ❌ | before/after photos |
| Purchase Order PDF | ❌ | |

### WhatsApp Integration
| Task | Status | Notes |
|------|--------|-------|
| `POST /api/v1/webhooks/whatsapp` (inbound) | ❌ | sig verify |
| Webhook verification (GET, hub.challenge) | ❌ | |
| Inbound text → create CRM message | ❌ | |
| Delivery receipts → update Notification | ❌ | |

### Testing
| Task | Status | File |
|------|--------|------|
| Unit: ticket-id.util | ❌ | `tests/utils/ticket-id.test.ts` |
| Unit: otp.util | ❌ | |
| Unit: auth.service | ❌ | |
| Unit: tickets.service (status transitions) | ❌ | |
| Unit: payments.service (Razorpay sig verify) | ❌ | |
| Integration: `POST /auth/verify-otp` | ❌ | |
| Integration: `POST /public/bookings` | ❌ | |
| Integration: `GET /public/track/:id` | ❌ | |
| Integration: `PUT /technician/jobs/:id/status` | ❌ | valid + invalid transitions |
| Integration: `POST /razorpay/webhook` | ❌ | valid + tampered sig |

### Deployment
| Task | Status | Notes |
|------|--------|-------|
| Dockerfile (Node 20 alpine, multi-stage) | ❌ | |
| docker-compose (backend + mysql + redis) | ❌ | |
| Health checks on DB + Redis | ❌ | |
| `prisma migrate deploy` in startup | ❌ | init container pattern |
| GitHub Actions CI (lint, typecheck, test, build) | ❌ | |
| GitHub Actions CD (ECR push + deploy) | ❌ | |
| Nginx config (reverse proxy + WS upgrade) | ❌ | |

---

## HOW TO USE
```bash
# Count remaining tasks
grep -c "❌" backend/TRACKER.md

# Find all incomplete tasks
grep "❌" backend/TRACKER.md

# Find optional tasks
grep "🔲" backend/TRACKER.md
```
When a task is done: change `❌` → `✅`, update "Last updated" date at top.
When partially done: use `⚠️` and add a note in the same row.
