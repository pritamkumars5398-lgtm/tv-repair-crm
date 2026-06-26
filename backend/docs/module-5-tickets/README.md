# Module 5 — Ticket Management (Backend)

## Overview
Core of the CRM. Tickets are created after payment confirmation. Lifecycle managed through status transitions with full audit history.

## Ticket ID
Format: `TVR-{YYYY}-{NNNN}` — e.g., `TVR-2026-0001`
Generated in `src/shared/utils/ticket-id.util.ts`:
```ts
// Query: SELECT id FROM tickets WHERE id LIKE 'TVR-{year}-%' ORDER BY id DESC LIMIT 1
// Parse last sequence number, increment, zero-pad to 4 digits
```
Sequence resets per year (TVR-2026-9999 → TVR-2027-0001).

## Endpoints
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/v1/public/track/:ticketId` | None | Public status tracker |
| GET | `/api/v1/customer/tickets` | Customer | My tickets |
| GET | `/api/v1/customer/tickets/:id` | Customer | Ticket detail |
| PUT | `/api/v1/technician/jobs/:id/status` | Technician | Update status |
| PUT | `/api/v1/admin/tickets/:id/assign` | Admin/Manager | Assign technician |
| PUT | `/api/v1/admin/tickets/:id/status` | Admin/Manager | Override status |
| GET | `/api/v1/admin/tickets` | Admin/Manager | All tickets |

## Status Machine
Enforced in `tickets.service.ts → validateTransition()`:
```
new_lead            → contacted
contacted           → inspection_scheduled, closed
inspection_scheduled → tv_received, closed
tv_received         → repair_in_progress
repair_in_progress  → quality_check, repair_in_progress
quality_check       → ready_for_delivery, repair_in_progress
ready_for_delivery  → delivered
delivered           → closed
```
Any unlisted transition throws `AppError("Invalid status transition", 400, "INVALID_TRANSITION")`.

## Status Change Flow
```ts
// In tickets.service.ts
async updateStatus(ticketId, newStatus, changedByUserId, note?) {
  const ticket = await prisma.ticket.findUniqueOrThrow({ where: { id: ticketId } });
  validateTransition(ticket.status, newStatus); // throws if invalid
  
  await prisma.$transaction([
    prisma.ticket.update({ where: { id: ticketId }, data: { status: newStatus } }),
    prisma.ticketStatusHistory.create({
      data: { ticketId, fromStatus: ticket.status, toStatus: newStatus, changedByUserId, note }
    })
  ]);
  
  // Queue notification
  notificationQueue.add('send_notification', {
    type: 'TICKET_STATUS_CHANGED',
    ticketId,
    customerId: ticket.customerId,
    newStatus,
    note
  });
}
```

## Public Tracking Endpoint
```
GET /api/v1/public/track/:ticketId
- Rate limit: 10 req/min per IP
- Validate TVR-YYYY-NNNN format
- Return ticket status + history WITHOUT PII (no customer name/phone/address)
- Cache response in Redis for 60 seconds
```

## Photo Storage
Photos stored as JSON array on Ticket:
```json
[
  {
    "url": "https://s3.../TVR-2026-0001/photo1.jpg",
    "uploadedBy": "user-uuid",
    "uploadedByRole": "CUSTOMER",
    "type": "BEFORE",
    "uploadedAt": "2026-06-20T10:00:00Z"
  }
]
```
Upload via `POST /api/v1/customer/tickets/:id/photos` (Multer → S3 stream).
Max 5MB per file, accepted types: image/jpeg, image/png, image/webp.

## Notifications Triggered by Status Changes
| Status | Notification |
|--------|-------------|
| tv_received | "We received your TV for repair" |
| repair_in_progress | "Repair has started on your TV" |
| quality_check | "Quality check in progress" |
| ready_for_delivery | "Your TV is ready! Invoice attached" |
| delivered | "Delivery confirmed. Thank you!" |
