# Module 4 — Payments (Backend)

## Overview
Razorpay integration for two scenarios: ₹250 service visit fee at booking time, and repair invoice payment from customer portal.

## Endpoints
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/v1/public/bookings` | None | Create booking + Razorpay order |
| POST | `/api/v1/public/bookings/verify-payment` | None | Verify signature, create ticket |
| POST | `/api/v1/customer/payments/order` | Customer | Create order for invoice |
| POST | `/api/v1/customer/payments/verify` | Customer | Verify invoice payment |
| GET | `/api/v1/customer/payments` | Customer | Payment history |
| GET | `/api/v1/admin/payments` | Admin | All transactions |
| GET | `/api/v1/admin/payments/summary` | Admin | Revenue summary |
| POST | `/api/v1/admin/payments/:id/refund` | Admin | Issue refund |
| POST | `/api/v1/razorpay/webhook` | None (sig verify) | Razorpay webhook |

## Booking + ₹250 Payment Flow

### Step 1 — Create Order
```
POST /api/v1/public/bookings
Body: { name, phone, email, serviceType, preferredDate, ... }

1. Find or create User by phone (role: CUSTOMER)
2. Create Lead (status: INSPECTION_SCHEDULED)
3. Create Payment record (status: PENDING, type: SERVICE_VISIT_FEE)
4. Create Razorpay Order:
   razorpay.orders.create({ amount: 25000, currency: "INR", receipt: paymentId })
5. Update Payment.razorpayOrderId
6. Return: { razorpayOrderId, razorpayKeyId, amount: 25000, paymentId }
```

### Step 2 — Verify Payment
```
POST /api/v1/public/bookings/verify-payment
Body: { razorpayOrderId, razorpayPaymentId, razorpaySignature }

1. Verify signature:
   expectedSig = HMAC-SHA256(razorpayOrderId + "|" + razorpayPaymentId, RAZORPAY_KEY_SECRET)
   if expectedSig !== razorpaySignature → return 400 "Invalid signature"

2. Find Payment by razorpayOrderId
3. If Payment.status === CAPTURED → return 409 "Already processed" (idempotency)
4. Update Payment: status=CAPTURED, razorpayPaymentId, razorpaySignature
5. Create Ticket:
   - Generate TVR-YYYY-NNNN ID
   - Copy booking data from Lead
   - status: tv_received
6. Update Lead: status=TV_RECEIVED, ticketId
7. Log TicketStatusHistory: null → tv_received
8. Queue notifications: BOOKING_CONFIRMED to customer (SMS + WhatsApp + Email)
9. Queue admin notification: new ticket created
10. Return: { ticketId: "TVR-2026-0001" }
```

## Razorpay Webhook Handler
```
POST /api/v1/razorpay/webhook
Headers: X-Razorpay-Signature

1. Verify: HMAC-SHA256(rawBody, RAZORPAY_WEBHOOK_SECRET)
2. Parse event type:
   - payment.captured → update Payment status (backup to verify-payment endpoint)
   - payment.failed → update Payment status, notify customer
   - refund.created → create Refund record, notify customer
3. Return 200 immediately (Razorpay retries if no 200)
```

## Refund Flow
```
POST /api/v1/admin/payments/:id/refund
Body: { reason, amount? }

1. Fetch Payment, ensure status is CAPTURED
2. Call razorpay.payments.refund(razorpayPaymentId, { amount, notes: { reason } })
3. Update Payment.status = REFUNDED
4. Queue REFUND_ISSUED notification to customer
5. Add note to linked Ticket
```

## Security
- Webhook secret separate from API key secret
- Raw body parser (`express.raw()`) required for webhook route — do NOT use `express.json()` on this route
- All payment amounts validated server-side — never trust client-sent amount
- Idempotency: check if paymentId already captured before processing
- Log all Razorpay API responses for audit trail
