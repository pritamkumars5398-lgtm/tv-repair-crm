# Database Schema Reference — TV Repair CRM Backend

## Engine
MySQL 8.0 via Prisma ORM. All models use `camelCase` in Prisma, map to `snake_case` in MySQL via `@@map`.

## Models Overview

### User
Central auth model. All human actors (customer, technician, manager, admin) are Users with a `role` field.
```
id            String   @id @default(uuid())
role          UserRole (CUSTOMER | TECHNICIAN | MANAGER | ADMIN)
name          String
email         String?  @unique
phone         String   @unique
passwordHash  String?  (null for OTP-only customers)
isActive      Boolean  @default(true)
createdAt     DateTime @default(now())
updatedAt     DateTime @updatedAt
deletedAt     DateTime? (soft delete)
```

### Lead
CRM pipeline entry. Every inquiry becomes a lead first.
```
id            String   @id @default(uuid())
name          String   (may differ from User.name if not yet a user)
phone         String
email         String?
source        LeadSource (WEBSITE | WHATSAPP | PHONE | FACEBOOK | GOOGLE | REFERRAL | CHATBOT)
status        LeadStatus (NEW_LEAD | CONTACTED | INSPECTION_SCHEDULED | TV_RECEIVED |
                          REPAIR_IN_PROGRESS | QUALITY_CHECK | READY_FOR_DELIVERY | DELIVERED | CLOSED)
serviceType   ServiceType
notes         String?  @db.Text
customerId    String?  (linked once user account created)
assignedToId  String?  (technician/manager User.id)
utmSource     String?
utmCampaign   String?
createdAt, updatedAt, deletedAt
```

### Ticket
Service ticket. Created from a lead after payment confirmed.
```
id            String   @id (TVR-YYYY-NNNN format, NOT uuid)
leadId        String?
customerId    String
serviceType   ServiceType
deviceBrand   String?
deviceModel   String?
issueDescription String @db.Text
pickupRequired   Boolean @default(false)
address       String
city          String
pincode       String
status        TicketStatus (same values as LeadStatus)
assignedTechnicianId String?
estimatedCompletion  DateTime?
photos        Json     (array of S3 URLs + metadata)
createdAt, updatedAt, deletedAt
```

### TicketStatusHistory
Audit log — never delete.
```
id            String   @id @default(uuid())
ticketId      String
fromStatus    TicketStatus
toStatus      TicketStatus
changedByUserId String
note          String?
createdAt     DateTime @default(now())
```

### Payment
One payment per transaction. Multiple payments per ticket possible (visit fee + repair fee).
```
id                  String  @id @default(uuid())
ticketId            String
customerId          String
razorpayOrderId     String  @unique
razorpayPaymentId   String? @unique
razorpaySignature   String?
amount              Int     (in paise, e.g. 25000 = ₹250)
currency            String  @default("INR")
status              PaymentStatus (PENDING | CAPTURED | FAILED | REFUNDED)
type                PaymentType (SERVICE_VISIT_FEE | REPAIR_CHARGE | ADVANCE)
createdAt           DateTime @default(now())
```

### Invoice
```
id            String   @id (INV-YYYY-NNNN format)
ticketId      String
customerId    String
lineItems     Json     ([{ description, quantity, unitPrice, total }])
subtotal      Decimal  @db.Decimal(10,2)
taxPercent    Decimal  @db.Decimal(5,2) @default(18)
taxAmount     Decimal  @db.Decimal(10,2)
total         Decimal  @db.Decimal(10,2)
status        InvoiceStatus (DRAFT | SENT | PAID | CANCELLED)
pdfUrl        String?  (S3 URL)
sentAt        DateTime?
paidAt        DateTime?
createdAt, updatedAt
```

### InventoryItem
```
id            String   @id @default(uuid())
name          String
category      InventoryCategory (TV_PART | SPEAKER_PART | ELECTRONIC | TOOL | OTHER)
sku           String   @unique
quantity      Int      @default(0)
reorderLevel  Int      @default(5)
unitPrice     Decimal  @db.Decimal(10,2)
supplierId    String?
location      String?
createdAt, updatedAt
```

### Message (Chat)
```
id            String   @id @default(uuid())
ticketId      String
senderId      String   (User.id)
senderRole    UserRole
content       String?  @db.Text
fileUrl       String?
fileType      String?  (image | pdf | other)
isRead        Boolean  @default(false)
createdAt     DateTime @default(now())
```

### Notification
```
id            String   @id @default(uuid())
userId        String
channel       NotificationChannel (SMS | EMAIL | WHATSAPP)
template      String   (e.g. "BOOKING_CONFIRMED")
variables     Json
status        NotificationStatus (QUEUED | SENT | FAILED)
sentAt        DateTime?
errorMessage  String?
createdAt     DateTime @default(now())
```

### Content (CMS)
```
id        String   @id @default(uuid())
section   ContentSection (TESTIMONIALS | TEAM | SERVICES | PRODUCTS | FAQ | HERO | SETTINGS)
key       String
value     Json
updatedAt DateTime @updatedAt
updatedById String
@@unique([section, key])
```

## Key Indexes
```
Lead: [status, createdAt], [phone], [assignedToId]
Ticket: [status, createdAt], [customerId], [assignedTechnicianId]
TicketStatusHistory: [ticketId, createdAt]
Payment: [razorpayOrderId], [ticketId], [customerId]
Message: [ticketId, createdAt]
InventoryItem: [category, quantity], [sku]
```

## Enum Reference

### ServiceType
`LED_TV_REPAIR | SMART_TV_REPAIR | MOTHERBOARD_REPAIR | SCREEN_REPLACEMENT | BACKLIGHT_REPAIR | POLARIZER_CHANGE | SPEAKER_MANUFACTURING | AUDIO_INSTALLATION | HOME_THEATER | PRODUCT_INQUIRY | OTHER`

### TicketStatus / LeadStatus
`new_lead | contacted | inspection_scheduled | tv_received | repair_in_progress | quality_check | ready_for_delivery | delivered | closed`

### Valid Status Transitions
```
new_lead → contacted
contacted → inspection_scheduled | closed
inspection_scheduled → tv_received | closed
tv_received → repair_in_progress
repair_in_progress → quality_check | repair_in_progress (re-open)
quality_check → ready_for_delivery | repair_in_progress (failed QC)
ready_for_delivery → delivered
delivered → closed
```
