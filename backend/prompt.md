# Backend Build Prompt — TV Repair CRM
## Phase-wise Master Prompt for Claude Agent

---

## Context (Read Before Every Phase)

You are building the **backend API** of a TV Repairing & Speaker Manufacturing CRM platform.

**Stack**: Node.js 20, Express.js, TypeScript, MySQL 8, Prisma ORM, Redis, Bull queues, Socket.io, AWS S3, Razorpay, JWT auth.

Always read `CLAUDE.md` and `agent.md` before writing any code.
Always read the relevant doc in `docs/<module>/` before implementing a module.

**Base API prefix**: `/api/v1/`
**Ticket ID format**: `TVR-{YYYY}-{NNNN}` (e.g., `TVR-2026-0001`)
**Response shape**: `{ success: boolean, data: any, message: string, meta?: { page, total } }`

**User roles**: `customer`, `technician`, `manager`, `admin`
**Auth**: JWT access token (15min) + refresh token (7d, httpOnly cookie)

---

## PHASE 1 — Project Foundation & Core Infrastructure

### Goal
Initialize the backend project, set up the database schema, configure all external service clients, and build auth + public endpoints needed for the website.

### Tasks

#### 1.1 Project Setup
```
Initialize Node.js project with TypeScript.
Install dependencies:
  express, prisma, @prisma/client, mysql2, redis (ioredis), bull,
  jsonwebtoken, bcrypt, zod, multer, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner,
  razorpay, socket.io, nodemailer, axios, helmet, cors, express-rate-limit,
  morgan, winston, dotenv, uuid

Dev dependencies:
  typescript, ts-node, nodemon, jest, supertest, @types/*

TypeScript config: strict mode, path aliases (@/* → src/*).
ESLint + Prettier configuration.
src/config/env.ts — load and validate all env vars with Zod at startup.
  - Fail fast: throw on missing required env vars.
src/config/database.ts — Prisma client singleton.
src/config/redis.ts — ioredis client singleton.
src/config/s3.ts — AWS S3 client.
src/config/razorpay.ts — Razorpay client.
src/shared/errors/AppError.ts — custom error class (message, statusCode, code).
src/shared/errors/error-handler.ts — global Express error middleware.
src/shared/utils/response.util.ts — sendSuccess(), sendError() helpers.
src/shared/utils/logger.ts — Winston structured logger.
src/app.ts — Express app: helmet, cors, json, morgan, rate-limit, routes.
src/server.ts — HTTP server + Socket.io attach + listen.
```

#### 1.2 Database Schema (prisma/schema.prisma)
```
Define all Prisma models:

User {
  id, role (CUSTOMER|TECHNICIAN|MANAGER|ADMIN), name, email (unique),
  phone (unique), passwordHash, isActive, createdAt, updatedAt, deletedAt
  Relations: leads, tickets, payments, messages, technician (TechnicianProfile)
}

TechnicianProfile {
  id, userId, employeeCode (unique), skills (Json), joiningDate,
  currentJobCount, rating, totalJobsCompleted
}

Lead {
  id, customerId?, name, phone, email?, source (WEBSITE|WHATSAPP|PHONE|FACEBOOK|
  GOOGLE|REFERRAL|CHATBOT), status (see pipeline), serviceType, notes,
  assignedToId?, createdAt, updatedAt, deletedAt
}

Ticket {
  id (TVR-YYYY-NNNN), customerId, leadId?, serviceType, deviceBrand?,
  deviceModel?, issueDescription, pickupRequired, address, city, pincode,
  status (see statuses), assignedTechnicianId?, estimatedCompletion?,
  photos (Json), createdAt, updatedAt, deletedAt
  Relations: statusHistory, payments, invoice, messages
}

TicketStatusHistory {
  id, ticketId, fromStatus, toStatus, changedByUserId, note, createdAt
}

Payment {
  id, ticketId, customerId, razorpayOrderId, razorpayPaymentId,
  razorpaySignature, amount, currency, status (PENDING|CAPTURED|FAILED|REFUNDED),
  type (SERVICE_VISIT_FEE|REPAIR_CHARGE|ADVANCE), createdAt
}

Invoice {
  id, ticketId, customerId, invoiceNumber (INV-YYYY-NNNN), lineItems (Json),
  subtotal, taxPercent, taxAmount, total, status (DRAFT|SENT|PAID|CANCELLED),
  pdfUrl?, sentAt?, paidAt?, createdAt, updatedAt
}

InventoryItem {
  id, name, category (TV_PART|SPEAKER_PART|ELECTRONIC|TOOL|OTHER),
  sku, quantity, reorderLevel, unitPrice, supplierId?, location,
  createdAt, updatedAt
}

Message {
  id, ticketId, senderId, senderRole, content, fileUrl?, fileType?,
  isRead, createdAt
}

Notification {
  id, userId, channel (SMS|EMAIL|WHATSAPP), template, status
  (QUEUED|SENT|FAILED), sentAt?, errorMessage?, createdAt
}

Content {
  id, section (TESTIMONIALS|TEAM|SERVICES|PRODUCTS|FAQ|HERO), key,
  value (Json), updatedAt, updatedById
}

Query {
  id, customerId, ticketId?, subject, message, status (OPEN|IN_PROGRESS|RESOLVED),
  createdAt, updatedAt
}

Vendor {
  id, name, contactPerson, phone, email, address, supplyCategory
  (TV_PARTS|SPEAKER_PARTS|ELECTRONIC|MIXED), isActive, createdAt, updatedAt
}

PurchaseOrder {
  id, vendorId, items (Json: [{name, qty, unitPrice}]), totalAmount,
  status (DRAFT|SENT|RECEIVED|CANCELLED), expectedDeliveryDate?,
  notes?, createdByUserId, createdAt, updatedAt
}

Estimate {
  id (EST-YYYY-NNNN), ticketId, customerId, lineItems (Json),
  laborCharge, partsCharge, taxPercent, taxAmount, total,
  status (DRAFT|SENT|APPROVED|REJECTED|CONVERTED),
  approvedAt?, rejectedAt?, convertedToInvoiceId?,
  pdfUrl?, createdAt, updatedAt
}

Service {
  id, name, category (TV_REPAIR|SPEAKER|INSTALLATION|OTHER),
  description, basePrice, estimatedDurationHours, isPickupAvailable,
  isActive, createdAt, updatedAt
}

CustomerRating {
  id, ticketId, customerId, rating (1–5 Int), comment?, createdAt
  @@unique([ticketId])  -- one rating per ticket
}

TechnicianLocation {
  id, technicianId, latitude, longitude, recordedAt
  -- Only keep last 24 hours; older rows deleted by cron
}

Attendance {
  id, technicianId, checkInAt, checkOutAt?, checkInLocation (Json)?,
  checkOutLocation (Json)?, createdAt
}

Run: npx prisma migrate dev --name init
Run: npx prisma generate
Create seed file: prisma/seed.ts (admin user, sample services, sample content)
```

#### 1.3 Shared Utilities
```
src/shared/utils/ticket-id.util.ts:
  generateTicketId(year: number, lastSequence: number): string
  Returns "TVR-2026-0001" format. Query DB for last ticket of year, increment.

src/shared/utils/invoice-id.util.ts:
  generateInvoiceId(year, seq): "INV-2026-0001"

src/shared/utils/estimate-id.util.ts:
  generateEstimateId(year, seq): "EST-2026-0001"

src/shared/utils/po-id.util.ts:
  generatePOId(year, seq): "PO-2026-0001"

src/shared/utils/otp.util.ts:
  generateOTP(): 6-digit string
  storeOTP(phone, otp): Redis SET with 5min TTL + attempt counter
  verifyOTP(phone, otp): check Redis, decrement attempts, return boolean
  Max 3 attempts; block further attempts if exceeded.

src/jobs/queue.ts:
  Create Bull queues: notificationQueue, pdfQueue
  Export queue instances for use across modules.

src/sockets/chat.socket.ts:
  Socket.io namespace /chat
  Events: join_room(ticketId), send_message, receive_message, typing, read_receipt
  Auth: verify JWT from handshake auth header
  On send_message: persist to DB then emit to room
```

#### 1.4 Auth Module — src/modules/auth/
```
POST /api/v1/auth/send-otp
  Body: { phone: string }
  - Validate phone format (10-digit Indian mobile)
  - Generate 6-digit OTP, store in Redis (key: otp:{phone})
  - Queue SMS via notificationQueue
  - Response: { success: true, message: "OTP sent" }

POST /api/v1/auth/verify-otp
  Body: { phone: string, otp: string }
  - Verify OTP from Redis
  - If user exists → login; if not → register (create User with role CUSTOMER)
  - Issue JWT access token + refresh token (httpOnly cookie)
  - Response: { success: true, data: { user, accessToken } }

POST /api/v1/auth/staff-login
  Body: { email: string, password: string }
  - Find user by email, verify bcrypt password
  - Check role is TECHNICIAN | MANAGER | ADMIN
  - Issue JWT + refresh token
  - Response: { success: true, data: { user, accessToken } }

POST /api/v1/auth/refresh
  - Read refresh token from httpOnly cookie
  - Verify, issue new access token
  - Response: { success: true, data: { accessToken } }

POST /api/v1/auth/logout
  - Clear refresh token cookie
  - Response: { success: true }

src/middleware/auth.middleware.ts:
  requireAuth: verify Bearer JWT, attach req.user
  requireRole(...roles): check req.user.role in roles list
```

#### 1.5 Public Endpoints (Website Forms)
```
POST /api/v1/public/leads
  Body: { name, phone, email?, serviceType, source, notes? }
  - Create Lead record with status NEW_LEAD
  - Queue WhatsApp notification to admin
  - Response: { success: true, data: { leadId } }

POST /api/v1/public/inquiries
  Body: { name, phone, email, productInterest, message }
  - Store as Lead with source=WEBSITE, serviceType=PRODUCT_INQUIRY
  - Queue email notification to business
  - Response: { success: true }

GET /api/v1/public/track/:ticketId
  - Validate TVR-YYYY-NNNN format
  - Return ticket status + TicketStatusHistory (without customer PII)
  - Rate limit: 10 req/min per IP
  - Response: { status, statusHistory: [{status, note, createdAt}] }

GET /api/v1/public/content/:section
  - Return Content records for given section
  - Response: cached 5min in Redis

POST /api/v1/public/contact
  Body: { name, phone, email, message }
  - Store as Lead, queue email to business
```

#### 1.6 Payment — Booking Flow
```
POST /api/v1/public/bookings
  Auth: optional (guest or logged-in customer)
  Body: { name, phone, email, serviceType, preferredDate, preferredTimeSlot,
          issueDescription, address, city, pincode, pickupRequired, photos[] }
  - Create/find Customer user (by phone)
  - Create Lead (status: INSPECTION_SCHEDULED)
  - Create Razorpay Order (amount: 25000 paise = ₹250)
  - Response: { success: true, data: { razorpayOrderId, razorpayKeyId, amount } }

POST /api/v1/public/bookings/verify-payment
  Body: { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingData }
  - Verify Razorpay signature: HMAC-SHA256
  - If valid:
    - Update Payment status to CAPTURED
    - Create Ticket (generate TVR-YYYY-NNNN ID)
    - Update Lead status to TV_RECEIVED (awaiting pickup/visit)
    - Queue notifications: SMS + WhatsApp + Email to customer
    - Queue admin notification
  - Response: { success: true, data: { ticketId } }

POST /api/v1/razorpay/webhook
  - Verify Razorpay-Signature header
  - Handle: payment.captured, payment.failed, refund.created
  - Idempotent: check if payment already processed
```

### Phase 1 Deliverables Checklist
- [ ] Project initialized (TypeScript, Express, Prisma)
- [ ] All env vars validated at startup
- [ ] All config singletons (DB, Redis, S3, Razorpay)
- [ ] Prisma schema with all models + migration run
- [ ] Database seed file
- [ ] Shared utilities (ticket ID, invoice ID, OTP, logger, response helpers)
- [ ] Bull queues initialized
- [ ] Socket.io chat infrastructure
- [ ] Auth module (OTP + staff login + refresh + logout)
- [ ] Auth + role middleware
- [ ] Public endpoints (lead form, inquiry, tracking, content)
- [ ] Booking + Razorpay payment flow
- [ ] Razorpay webhook handler
- [ ] Global error handler
- [ ] Rate limiting on all public + auth routes

---

## PHASE 2 — Customer API

### Goal
Build all authenticated endpoints for the customer portal.

### Tasks

#### 2.1 Customer Profile
```
GET  /api/v1/customer/profile
PUT  /api/v1/customer/profile
  Body: { name, email, address }
PUT  /api/v1/customer/profile/password
  Body: { currentPassword, newPassword }
PUT  /api/v1/customer/profile/notifications
  Body: { smsEnabled, emailEnabled, whatsappEnabled }
```

#### 2.2 Customer Tickets
```
GET /api/v1/customer/tickets
  Query: status?, page?, limit?
  - Return tickets for req.user.id
  - Include latest status from statusHistory

GET /api/v1/customer/tickets/:ticketId
  - Full ticket detail
  - Status history with timestamps + notes
  - Assigned technician (name, phone)
  - Photos (customer + technician uploaded)
  - Estimate and invoice summary

POST /api/v1/customer/tickets/:ticketId/photos
  - Upload additional photos (Multer → S3)
  - Append to ticket.photos JSON array
```

#### 2.3 Customer Payments
```
GET /api/v1/customer/payments
  - All payment transactions for customer
  - Include ticket ID, amount, status, date

POST /api/v1/customer/payments/order
  Body: { ticketId, type: "REPAIR_CHARGE" }
  - Create Razorpay order for outstanding invoice amount
  - Response: { razorpayOrderId, amount, razorpayKeyId }

POST /api/v1/customer/payments/verify
  Body: { razorpayOrderId, razorpayPaymentId, razorpaySignature }
  - Verify signature
  - Update Payment + Invoice status
  - Queue payment confirmation notifications
```

#### 2.4 Customer Invoices
```
GET /api/v1/customer/invoices
  - All invoices for customer

GET /api/v1/customer/invoices/:invoiceId
  - Invoice detail with line items

GET /api/v1/customer/invoices/:invoiceId/pdf
  - Generate PDF if not exists, store in S3, return presigned URL
  - Cache URL in Redis for 1 hour
```

#### 2.5 Customer Queries
```
GET  /api/v1/customer/queries
POST /api/v1/customer/queries
  Body: { subject, ticketId?, message, fileUrl? }
GET  /api/v1/customer/queries/:queryId
```

#### 2.6 Chat (Customer)
```
GET /api/v1/customer/tickets/:ticketId/messages
  - Paginated chat history for ticket
  - Mark unread messages as read (update isRead)

(Real-time via Socket.io — see Phase 1 socket setup)
```

### Phase 2 Deliverables Checklist
- [ ] Customer profile CRUD + password change + notification prefs
- [ ] Customer ticket list + detail (with history, technician, photos)
- [ ] Photo upload to S3
- [ ] Customer payments (list + create order + verify)
- [ ] Customer invoices (list + detail + PDF download)
- [ ] Customer queries (list + create)
- [ ] Chat message history endpoint + mark-read

---

## PHASE 3 — Technician API

### Goal
Build all authenticated endpoints for the technician dashboard.

### Tasks

#### 3.1 Technician Jobs
```
GET /api/v1/technician/jobs
  Query: status? (assigned|accepted|in_progress|completed), date?
  - Jobs assigned to req.user.id

GET /api/v1/technician/jobs/:ticketId
  - Full ticket info + customer contact (masked phone: 98XXXXX789)
  - Current status + history

PUT /api/v1/technician/jobs/:ticketId/accept
  - Change status: inspection_scheduled → tv_received (or home_visit)
  - Log in TicketStatusHistory

PUT /api/v1/technician/jobs/:ticketId/status
  Body: { status, note? }
  - Validate transition is valid (see CLAUDE.md status machine)
  - Log TicketStatusHistory
  - Queue customer notification for status change

POST /api/v1/technician/jobs/:ticketId/photos
  - Upload before/after photos to S3
  - Append to ticket.photos

POST /api/v1/technician/jobs/:ticketId/notes
  Body: { note }
  - Add repair note to ticket

POST /api/v1/technician/jobs/:ticketId/parts-request
  Body: { parts: [{ name, partNumber?, quantity, estimatedCost }] }
  - Create parts request (stored as JSON on ticket, status: PENDING_APPROVAL)
  - Notify manager

GET /api/v1/technician/jobs/:ticketId/service-report
  - Generate service report PDF
  - Include: ticket info, repair notes, photos, technician signature placeholder
  - Return presigned S3 URL
```

#### 3.2 Technician Dashboard Stats
```
GET /api/v1/technician/stats
  - { todayJobs, completedToday, activeJobs, thisMonthCompleted, rating }
```

#### 3.3 Technician Profile
```
GET /api/v1/technician/profile
PUT /api/v1/technician/profile — update contact info, skills
```

#### 3.4 Repair Estimate (MODULE 12 requirement)
```
POST /api/v1/technician/jobs/:ticketId/estimate
  Body: { laborCharge, parts: [{name, qty, unitPrice}], taxPercent, notes? }
  - Create Estimate record (EST-YYYY-NNNN)
  - Status: SENT
  - Queue ESTIMATE_SENT notification: SMS + WhatsApp + Email to customer
    "Your repair estimate for {ticketId}: ₹{total}. Approve at: {approvalUrl}"
  - Response: { estimateId }

PUT /api/v1/customer/estimates/:estimateId/respond
  Body: { action: "APPROVED" | "REJECTED", note? }
  Auth: Customer
  - Update Estimate.status
  - Queue admin/technician notification
  - If APPROVED: technician sees green "Estimate Approved — Start Repair" badge
```

#### 3.5 GPS Location (Optional — MODULE 10)
```
POST /api/v1/technician/location
  Body: { latitude, longitude }
  Auth: Technician
  - Upsert latest TechnicianLocation (keep only last 24h rows)
  - Rate limit: max 1 req per 30 seconds per technician

POST /api/v1/technician/attendance/check-in
  Body: { latitude?, longitude? }
POST /api/v1/technician/attendance/check-out
  Body: { latitude?, longitude? }

GET /api/v1/admin/technicians/locations
  Auth: Admin/Manager
  - Return all active technicians with latest lat/lng (last 10 min)
  - Used for map view in admin panel
```

### Phase 3 Deliverables Checklist
- [ ] Technician job list (with filters)
- [ ] Job detail (with masked customer phone)
- [ ] Accept/reject job
- [ ] Status update with validation + history logging
- [ ] Photo upload (before/after)
- [ ] Repair notes
- [ ] Parts request (notify manager)
- [ ] Repair estimate create + customer approval flow
- [ ] Service report PDF generation
- [ ] Dashboard stats
- [ ] Technician profile
- [ ] GPS location + attendance (optional)

---

## PHASE 4 — Admin & Manager API

### Goal
Build the full CRM admin API for lead management, ticket oversight, technician assignment, inventory, invoicing, reports, and content management.

### Tasks

#### 4.1 Lead Management
```
GET    /api/v1/admin/leads
  Query: status?, source?, assignedTo?, dateFrom?, dateTo?, search?, page, limit
  
POST   /api/v1/admin/leads
  Body: { name, phone, email?, source, serviceType, notes?, assignedToId? }

GET    /api/v1/admin/leads/:leadId
PUT    /api/v1/admin/leads/:leadId
  Body: { status?, assignedToId?, notes? }
  - Validate status transition
  - Log status change
  - If status → tv_received: auto-create Ticket

DELETE /api/v1/admin/leads/:leadId (soft delete)

POST /api/v1/admin/leads/bulk-assign
  Body: { leadIds: string[], technicianId: string }
```

#### 4.2 Ticket Management
```
GET  /api/v1/admin/tickets
  Query: status?, technicianId?, dateFrom?, dateTo?, search?, page, limit

GET  /api/v1/admin/tickets/:ticketId
PUT  /api/v1/admin/tickets/:ticketId/assign
  Body: { technicianId }
  - Assign/reassign technician
  - Notify technician via SMS/WhatsApp

PUT  /api/v1/admin/tickets/:ticketId/status
  Body: { status, note? }

POST /api/v1/admin/tickets/:ticketId/notes
  Body: { note } — manager internal note
```

#### 4.3 Customer Management
```
GET  /api/v1/admin/customers
  Query: search?, page, limit

GET  /api/v1/admin/customers/:customerId
  - Profile + full ticket history + payment history

PUT  /api/v1/admin/customers/:customerId
DELETE /api/v1/admin/customers/:customerId (soft delete)
```

#### 4.4 Technician Management
```
GET    /api/v1/admin/technicians
POST   /api/v1/admin/technicians
  Body: { name, email, phone, password, skills, joiningDate }
  - Create User (role: TECHNICIAN) + TechnicianProfile
  - Hash password

GET    /api/v1/admin/technicians/:technicianId
  - Profile + current jobs + performance stats

PUT    /api/v1/admin/technicians/:technicianId
DELETE /api/v1/admin/technicians/:technicianId (soft delete, unassign jobs)

GET    /api/v1/admin/technicians/:technicianId/performance
  - jobs completed per month (last 12 months), avg completion time, rating
```

#### 4.5 Inventory
```
GET  /api/v1/admin/inventory
  Query: category?, lowStock? (boolean), search?, page, limit

POST /api/v1/admin/inventory
  Body: { name, category, sku, quantity, reorderLevel, unitPrice, vendorId? }

GET  /api/v1/admin/inventory/:itemId
PUT  /api/v1/admin/inventory/:itemId
DELETE /api/v1/admin/inventory/:itemId

POST /api/v1/admin/inventory/:itemId/stock-in
  Body: { quantity, note?, purchaseOrderId? }

POST /api/v1/admin/inventory/:itemId/stock-out
  Body: { quantity, ticketId?, note? }

GET  /api/v1/admin/inventory/alerts/low-stock
  - All items where quantity <= reorderLevel
```

#### 4.5b Vendor Management (MODULE 11)
```
GET    /api/v1/admin/vendors
POST   /api/v1/admin/vendors
  Body: { name, contactPerson, phone, email, address, supplyCategory }
GET    /api/v1/admin/vendors/:vendorId
PUT    /api/v1/admin/vendors/:vendorId
DELETE /api/v1/admin/vendors/:vendorId
```

#### 4.5c Purchase Orders (MODULE 11)
```
GET    /api/v1/admin/purchase-orders
  Query: vendorId?, status?, dateFrom?, dateTo?, page, limit

POST   /api/v1/admin/purchase-orders
  Body: { vendorId, items: [{inventoryItemId, name, qty, unitPrice}],
          expectedDeliveryDate, notes? }
  - Create PO with status DRAFT
  - Calculate totalAmount

GET    /api/v1/admin/purchase-orders/:poId
PUT    /api/v1/admin/purchase-orders/:poId/send
  - Status: SENT; queue email to vendor
PUT    /api/v1/admin/purchase-orders/:poId/receive
  - Status: RECEIVED
  - Auto stock-in each item in PO: call inventory stock-in for each
GET    /api/v1/admin/purchase-orders/:poId/pdf
  - Generate PO PDF, return presigned URL
```

#### 4.6 Estimates (MODULE 12 — Repair Estimate)
```
GET  /api/v1/admin/estimates
  Query: status?, ticketId?, dateFrom?, dateTo?, page, limit

POST /api/v1/admin/estimates
  Body: { ticketId, laborCharge, parts: [{name, qty, unitPrice}], taxPercent }
  - Same as technician estimate endpoint but callable by admin
  - Generate estimateId (EST-YYYY-NNNN)

GET  /api/v1/admin/estimates/:estimateId
PUT  /api/v1/admin/estimates/:estimateId (edit while DRAFT)
POST /api/v1/admin/estimates/:estimateId/send
  - Queue ESTIMATE_SENT notification
  - Status: SENT
POST /api/v1/admin/estimates/:estimateId/convert-to-invoice
  - Create Invoice from Estimate
  - Update Estimate.status = CONVERTED, Estimate.convertedToInvoiceId
GET  /api/v1/admin/estimates/:estimateId/pdf
```

#### 4.7 Invoice Management (MODULE 12 — Tax Invoice + Service Invoice)
```
GET  /api/v1/admin/invoices
  Query: status?, dateFrom?, dateTo?, page, limit

POST /api/v1/admin/invoices
  Body: { ticketId, estimateId?, lineItems: [{ description, quantity, unitPrice }],
          taxPercent, invoiceType: "TAX_INVOICE" | "SERVICE_INVOICE" }
  - Generate invoiceId (INV-YYYY-NNNN)
  - Calculate subtotal, taxAmount, total
  - Status: DRAFT

GET  /api/v1/admin/invoices/:invoiceId
PUT  /api/v1/admin/invoices/:invoiceId (update while DRAFT)

POST /api/v1/admin/invoices/:invoiceId/send
  - Generate PDF (Tax Invoice format with GST fields), upload to S3
  - Queue INVOICE_SENT: email + WhatsApp to customer with PDF link
  - Status: SENT

GET  /api/v1/admin/invoices/:invoiceId/pdf
  - Return presigned S3 URL
```

#### 4.7b Payment Receipt (MODULE 12)
```
GET /api/v1/admin/payments/:paymentId/receipt/pdf
  Auth: Admin or the customer who made the payment
  - Generate receipt PDF: payment ID, amount, method, date, ticket ID
  - Returns presigned S3 URL (cache 1 hour in Redis)
  - Also accessible at: GET /api/v1/customer/payments/:paymentId/receipt/pdf

Receipt auto-generated on PAYMENT_CAPTURED event in webhook handler.
```

#### 4.7 Payment Management
```
GET /api/v1/admin/payments
  Query: status?, dateFrom?, dateTo?, page, limit
  - All transactions with customer + ticket info

GET /api/v1/admin/payments/summary
  - { todayRevenue, weekRevenue, monthRevenue, pendingAmount }

POST /api/v1/admin/payments/:paymentId/refund
  Body: { reason, amount? }
  - Razorpay refund API call
  - Update Payment status to REFUNDED
```

#### 4.7c Service Catalog Management (MODULE 14 — Manage Services)
```
GET    /api/v1/admin/services
POST   /api/v1/admin/services
  Body: { name, category, description, basePrice, estimatedDurationHours,
          isPickupAvailable, isActive }
GET    /api/v1/admin/services/:serviceId
PUT    /api/v1/admin/services/:serviceId
DELETE /api/v1/admin/services/:serviceId (soft-delete or toggle isActive)

GET /api/v1/public/services
  - Return all isActive=true services (cached in Redis 10min)
  - Used by booking form dropdown + services page
```

#### 4.8 Reports & Analytics
```
GET /api/v1/admin/reports/leads
  Query: dateFrom, dateTo, groupBy (day|week|month)
  - Total leads, by source breakdown, by status breakdown, conversion rate
  - Returns data arrays suitable for Recharts

GET /api/v1/admin/reports/revenue
  Query: dateFrom, dateTo, groupBy
  - Total revenue, by service type, by payment method

GET /api/v1/admin/reports/technician-performance
  Query: dateFrom, dateTo, technicianId?
  - Jobs assigned, completed, avg completion time, repeat complaints

GET /api/v1/admin/reports/tickets
  Query: dateFrom, dateTo
  - By status, by service type, SLA compliance (completed within 3 days)

GET /api/v1/admin/reports/customers
  Query: dateFrom, dateTo
  - New customers, repeat customers, lifetime value top 10

GET /api/v1/admin/reports/satisfaction
  Query: dateFrom, dateTo
  - Avg rating, rating distribution (1–5 star counts), total ratings,
    low-rated tickets list (rating <= 2, for follow-up)
  - Returns Recharts-ready arrays

GET /api/v1/admin/reports/export
  Query: type (leads|revenue|tickets), format (csv|excel|pdf), dateFrom, dateTo
  - Generate file, upload to S3, return presigned URL
  - Queue heavy exports as Bull job, return jobId; client polls for completion
```

#### 4.8b Customer Satisfaction Rating (MODULE 13)
```
POST /api/v1/public/ratings
  Body: { ticketId, rating (1–5), comment? }
  No auth required (token-less link from SMS/WhatsApp).
  - Validate ticketId exists and status is delivered/closed
  - Check @@unique: one rating per ticket (return 409 if already rated)
  - Create CustomerRating record
  - Queue internal notification to admin: "New {rating}★ rating for {ticketId}"
  - Response: { success: true, message: "Thank you for your feedback!" }

After ticket → delivered, in notification processor:
  Queue SATISFACTION_SURVEY job with 2-hour delay:
    SMS: "Rate your TV repair experience (Ticket: {ticketId}): {ratingUrl}"
    WhatsApp: same message
  ratingUrl = {FRONTEND_URL}/rate?ticketId={ticketId}
```

#### 4.9 Content Management
```
GET /api/v1/admin/content/:section
PUT /api/v1/admin/content/:section
  Body: { key, value: any }
  - Update Content record
  - Invalidate Redis cache for public/content/:section

POST /api/v1/admin/content/upload
  - Upload image to S3, return URL (for product images, team photos)
```

#### 4.10 Settings
```
GET /api/v1/admin/settings
PUT /api/v1/admin/settings
  Body: partial { businessName, address, phone, email, workingHours,
                  serviceVisitFee, smsTemplates, emailTemplates,
                  whatsappTemplates }
  - Store in Content section "SETTINGS"

GET /api/v1/admin/users
POST /api/v1/admin/users
  Body: { name, email, password, role (ADMIN|MANAGER) }
PUT /api/v1/admin/users/:userId
  Body: { isActive, role }
```

### Phase 4 Deliverables Checklist
- [ ] Lead management (full CRUD + all 7 sources + bulk assign + status transitions)
- [ ] Ticket management (assign, status update, manager notes)
- [ ] Customer management (list, detail, soft delete)
- [ ] Technician management (CRUD + performance stats)
- [ ] Inventory (CRUD + stock-in/out + low stock alerts)
- [ ] Vendor management (CRUD)
- [ ] Purchase orders (create, send, receive → auto stock-in, PDF)
- [ ] Estimates (create, send, customer approve/reject, convert to invoice)
- [ ] Invoices (Tax Invoice + Service Invoice, PDF, send via email+WhatsApp)
- [ ] Payment receipts (auto-gen PDF on payment capture)
- [ ] Service catalog management (CRUD + public endpoint)
- [ ] Payment management (list, summary, refund)
- [ ] All 7 analytics report endpoints (leads, revenue, technicians, tickets, customers, satisfaction, export)
- [ ] Customer satisfaction rating endpoint (public, token-less)
- [ ] Export to CSV/Excel/PDF via Bull queue
- [ ] Content management (CRUD + image upload)
- [ ] Settings management (including payment reminder templates)
- [ ] Admin user management (RBAC)

---

## PHASE 5 — Notifications, Queues & Polish

### Goal
Complete all notification templates, wire up Bull queue processors, add comprehensive tests, and deploy.

### Tasks

#### 5.1 Notification Queue Processors
```
src/jobs/notification.processor.ts — Bull processor for notificationQueue:

Templates to implement:
  BOOKING_CONFIRMED: SMS + WhatsApp + Email
    "Dear {name}, your TV repair booking is confirmed! Ticket ID: {ticketId}.
    Technician will visit on {date}. Track: {trackingUrl}"

  TICKET_STATUS_CHANGED: SMS + WhatsApp
    "Update on your TV repair {ticketId}: Status changed to {status}. {note}"

  TECHNICIAN_ASSIGNED: SMS
    "Technician {techName} ({techPhone}) will visit you today for ticket {ticketId}."

  READY_FOR_DELIVERY: SMS + WhatsApp
    "Great news! Your TV is ready for delivery. Ticket: {ticketId}. 
    Please arrange payment: {invoiceUrl}"

  INVOICE_SENT: Email + WhatsApp
    "Invoice #{invoiceNumber} for ₹{amount} sent. Download: {pdfUrl}"

  PAYMENT_RECEIVED: SMS + Email
    "Payment of ₹{amount} received for ticket {ticketId}. Receipt: {receiptUrl}"

  PAYMENT_REMINDER: SMS + WhatsApp
    "Reminder: Invoice #{invoiceNumber} for ₹{amount} for ticket {ticketId}
    is pending. Pay now: {paymentUrl}"
    Triggered: 24 hours after INVOICE_SENT if not paid.
    Triggered again: 48 hours after if still not paid.
    Max 2 reminders per invoice.

  ESTIMATE_SENT: SMS + WhatsApp + Email
    "Repair estimate for {ticketId}: ₹{total}. Review & approve: {approvalUrl}"

  SATISFACTION_SURVEY: SMS + WhatsApp
    "How was your TV repair experience? Rate us: {ratingUrl} (Ticket: {ticketId})"
    Sent 2 hours after status → delivered.

  DELIVERY_ALERT: SMS + WhatsApp
    "Your TV (Ticket: {ticketId}) has been delivered. Thank you!"

  OTP: SMS
    "Your OTP for TV Repair CRM login is {otp}. Valid for 5 minutes."

Each processor:
  1. Fetch template from settings
  2. Replace variables
  3. Call SMS/WhatsApp/Email service
  4. Update Notification record (status: SENT or FAILED + errorMessage)
  5. Retry failed notifications 3 times with exponential backoff
```

#### 5.2 PDF Generation Processor
```
src/jobs/pdf.processor.ts — Bull processor for pdfQueue:

Invoice PDF: Puppeteer renders HTML template to PDF
  - Company header, logo, address, GST number
  - Invoice number, date, customer details
  - Line items table with quantities and amounts
  - Subtotal, tax, total
  - Payment status, payment method
  - Footer with terms

Service Report PDF:
  - Ticket info, customer info, device details
  - Issue description, repair notes
  - Before/after photos
  - Technician name + date
  - Quality check sign-off

Store PDF to S3, update invoice.pdfUrl or ticket.reportUrl
Emit socket event to admin/customer when ready
```

#### 5.3 WhatsApp Integration
```
src/modules/notifications/whatsapp.service.ts
  - Use Meta WhatsApp Business API
  - sendTextMessage(to, body)
  - sendTemplateMessage(to, templateName, components)
  - sendDocumentMessage(to, documentUrl, caption)
  - Webhook handler: POST /api/v1/webhooks/whatsapp
    - Incoming messages → create query or update chat
    - Delivery receipts → update Notification.status
```

#### 5.4 Testing
```
Unit tests (Jest):
  - shared/utils/ticket-id.util.test.ts
  - shared/utils/otp.util.test.ts
  - modules/auth/auth.service.test.ts
  - modules/tickets/tickets.service.test.ts (status transitions)
  - modules/payments/payments.service.test.ts (Razorpay signature verification)

Integration tests (Supertest):
  - POST /api/v1/auth/verify-otp — success and failure cases
  - POST /api/v1/public/bookings — full booking flow
  - GET  /api/v1/public/track/:ticketId — found and not found
  - GET  /api/v1/customer/tickets — auth required
  - PUT  /api/v1/technician/jobs/:id/status — valid and invalid transitions
  - POST /api/v1/admin/invoices — create and validate
  - POST /api/v1/razorpay/webhook — valid and tampered signature

Test setup: separate test DB, seed before each test suite, teardown after.
```

#### 5.5 Deployment
```
Dockerfile:
  - Node 20 alpine base
  - Multi-stage: builder + production
  - Copy prisma schema, generate client in build stage
  - Non-root user

docker-compose.yml:
  Services: backend, mysql, redis
  Health checks on DB and Redis
  Environment from .env file

GitHub Actions CI:
  - On PR: lint, typecheck, test, build
  - On merge to main: build Docker image, push to ECR/GHCR, deploy

Database migrations in deployment:
  - Run `npx prisma migrate deploy` as part of deployment startup
  - Never run in container entrypoint (race condition); use init container.

Nginx (if applicable):
  - Reverse proxy to backend:4000
  - WebSocket upgrade for Socket.io (/socket.io/ path)
  - Rate limiting at Nginx level
```

### Phase 5 Deliverables Checklist
- [ ] All notification templates implemented (SMS, Email, WhatsApp)
- [ ] Bull processors with retry logic
- [ ] Invoice PDF generation with Puppeteer
- [ ] Service report PDF generation
- [ ] WhatsApp Business API integration + webhook
- [ ] Unit tests for all services
- [ ] Integration tests for all route groups
- [ ] Dockerfile + docker-compose
- [ ] GitHub Actions CI/CD
- [ ] Deployment runbook in docs/

---

## How to Use This Prompt

**Start a new phase**:
> "I am starting Backend Phase 1. Read the context section and Phase 1 tasks. Begin with task 1.1 Project Setup."

**Resume mid-phase**:
> "We completed backend tasks 1.1–1.4. Continue with 1.5 Public Endpoints."

**Debug an endpoint**:
> "The POST /api/v1/public/bookings endpoint is returning 500. Read src/modules/tickets/ and src/modules/payments/ and investigate."

**Cross-reference frontend**:
> "The frontend booking form (Phase 1 task 1.8) is calling POST /api/v1/public/bookings. Ensure the backend response matches what the frontend expects: { razorpayOrderId, razorpayKeyId, amount }."

**Always provide**:
1. Which phase and task
2. What is already built (if resuming)
3. Any error messages or unexpected behavior
4. Frontend API call expectations (if coordinating)
