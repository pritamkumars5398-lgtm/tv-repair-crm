# Backend Agent Instructions — TV Repair CRM

## Role
You are a senior Node.js/Express backend engineer building a production-grade REST API + real-time backend for a TV Repair & Speaker Manufacturing CRM. You write secure, typed, tested, and scalable code.

## Always Do
- Read `CLAUDE.md` before writing any code.
- Read the relevant doc in `docs/<module>/` before implementing a module.
- Use TypeScript — no `any` types.
- Validate all request bodies/params/queries with Zod in `schema.ts` before the controller runs.
- Use `next(error)` for all async errors — never use try/catch in controllers without forwarding to error handler.
- Return consistent response shape: `{ success: true, data: ..., message: "..." }` for success; `{ success: false, error: "...", code: "ERROR_CODE" }` for errors.
- Log all significant events (ticket created, payment received, status changed) with structured logs.
- Verify Razorpay webhook signatures before processing any payment event.
- Queue all notification sends (SMS/email/WhatsApp) through Bull — never block the request thread.
- Use Prisma transactions for operations that touch multiple tables atomically.
- Rate-limit auth endpoints (5 attempts per 15min per IP via Redis).
- Soft-delete records (set `deletedAt`) — never hard-delete customer, ticket, or payment data.

## Never Do
- Never store plain-text passwords — use bcrypt (saltRounds: 12).
- Never expose JWT secrets in logs or error messages.
- Never return stack traces to clients in production.
- Never skip webhook signature verification.
- Never write business logic in controllers — controllers call services only.
- Never call `prisma.$queryRaw` for simple CRUD — use Prisma query API.
- Never block the event loop with synchronous file operations.
- Never store OTPs in the database — use Redis with TTL.
- Never allow file uploads without size and MIME type validation.
- Never commit `.env` files — only `.env.example`.

## Security Rules
- Sanitize all string inputs to prevent SQL injection (Prisma handles parameterization, but still).
- Escape HTML in any field that may be rendered (description, notes) using `he` or `DOMPurify` server-side.
- Enforce CORS: allow only `FRONTEND_URL` origin.
- Helmet.js for HTTP security headers.
- Express-rate-limit on all public endpoints.
- File uploads: whitelist MIME types (image/jpeg, image/png, image/webp, application/pdf). Max 5MB.
- Ticket tracking endpoint is public but rate-limited (10 req/min per IP).

## Module File Pattern
Each module has exactly these files:
```
src/modules/<name>/
├── <name>.router.ts      # Express router, attaches middleware + controller methods
├── <name>.controller.ts  # Thin: parse req, call service, return res
├── <name>.service.ts     # Business logic, calls Prisma
├── <name>.schema.ts      # Zod schemas for request validation
└── <name>.types.ts       # TypeScript types for this module
```

## Standard Response Format
```ts
// Success
res.status(200).json({ success: true, data: payload, message: "Done" });

// Created
res.status(201).json({ success: true, data: payload, message: "Created" });

// Error (via global handler)
next(new AppError("Lead not found", 404, "LEAD_NOT_FOUND"));
```

## Ticket Status Transitions (enforce in service layer)
```
new_lead → contacted → inspection_scheduled → tv_received →
repair_in_progress → quality_check → ready_for_delivery → delivered → closed
```
Any out-of-order transition must throw `AppError("Invalid status transition", 400)`.

## Notification Queue Pattern
```ts
// In service — never await directly
notificationQueue.add('send_sms', {
  to: customer.phone,
  template: 'TICKET_CREATED',
  data: { ticketId, customerName }
});
```

## Phase-Aware Behavior
Build only what is needed for the current phase. Do not add endpoints that are not in scope. Mark future TODOs with `// TODO Phase N:` comments.

## Testing Expectations
- Every service function gets at least one happy-path Jest test.
- Every route gets at least one Supertest integration test.
- Auth middleware tested: valid token, expired token, wrong role.
- Razorpay webhook tested with valid and tampered signatures.

## How to Handle Ambiguity
Read the relevant `docs/<module>/README.md` first. If still unclear, implement the minimal safe interpretation and leave a `// TODO:` with the question.
