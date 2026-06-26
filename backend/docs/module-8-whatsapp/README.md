# Module 8 — WhatsApp Integration (Backend)

## Overview
WhatsApp Business API (Meta) used for outbound notifications (status updates, invoices, OTP) and inbound customer messages.

## Provider
**Meta WhatsApp Business API** (primary)
Alternative: Gupshup (simpler setup, higher cost per message)

## File: `src/modules/notifications/whatsapp.service.ts`

## Outbound Messages

### Send Text Message
```ts
async sendTextMessage(to: string, body: string): Promise<void>
// POST https://graph.facebook.com/v19.0/{PHONE_NUMBER_ID}/messages
// Body: { messaging_product: "whatsapp", to, type: "text", text: { body } }
// Auth: Bearer WHATSAPP_API_TOKEN
```

### Send Template Message
```ts
async sendTemplateMessage(to: string, templateName: string, components: any[]): Promise<void>
// Use pre-approved Meta templates for transactional messages
```

### Send Document
```ts
async sendDocumentMessage(to: string, documentUrl: string, caption: string): Promise<void>
// For sending invoice PDFs
```

## Approved Templates (register in Meta Business Manager)
| Template Name | Variables | Used For |
|--------------|-----------|----------|
| `booking_confirmed` | `{{1}}` name, `{{2}}` ticketId, `{{3}}` date | Booking confirmation |
| `status_update` | `{{1}}` ticketId, `{{2}}` status, `{{3}}` note | Status change |
| `ready_for_delivery` | `{{1}}` name, `{{2}}` ticketId, `{{3}}` amount | Ready to collect |
| `invoice_sent` | `{{1}}` invoiceNumber, `{{2}}` amount, `{{3}}` pdfUrl | Invoice |
| `payment_received` | `{{1}}` amount, `{{2}}` ticketId | Payment ack |
| `otp` | `{{1}}` otp | OTP login |

## Inbound Webhook
```
POST /api/v1/webhooks/whatsapp
Headers: X-Hub-Signature-256 (verify with WHATSAPP_WEBHOOK_VERIFY_TOKEN)

Webhook verification (GET request from Meta):
  Query: hub.mode=subscribe, hub.verify_token, hub.challenge
  Return hub.challenge if token matches

Incoming message events:
  - Type "text": extract phone + message body
    - Search for active ticket by customer phone
    - If found: store as Message in DB, emit Socket.io to admin
    - If not found: reply with "How can we help? Book a service at {URL}"
  - Type "image"/"document": store fileUrl, notify admin
  - Status updates (delivered, read): update Notification record
```

## Phone Number Formatting
All WhatsApp numbers must be in E.164 format: `91XXXXXXXXXX` (no +, no spaces)
```ts
function formatWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.startsWith('91') ? cleaned : `91${cleaned}`;
}
```

## Error Handling
- API errors logged with template name, recipient, error code
- Failed sends: update Notification.status = FAILED, store errorMessage
- Bull retry: 3 attempts with exponential backoff (2s, 8s, 32s)
- Rate limit: Meta allows 1000 template messages/day on basic tier

## Environment Variables
```
WHATSAPP_API_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_WEBHOOK_VERIFY_TOKEN=
```
