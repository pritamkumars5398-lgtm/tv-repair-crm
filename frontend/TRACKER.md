# Frontend Tracker — TV Repair CRM
> Mark ✅ when code exists and works. ⚠️ partial. ❌ not started. 🔲 optional.
> Verify against: this file → actual files in `frontend/` → running app.

**Last updated**: 2026-06-26
**Current phase**: Pre-development

---

## PHASE 1 — Project Foundation & Public Website

### 1.1 Project Setup
| Task | Status | File/Notes |
|------|--------|-----------|
| Next.js 14 initialized (App Router, TypeScript) | ❌ | `package.json` |
| Tailwind CSS configured with brand tokens | ❌ | `tailwind.config.ts` |
| shadcn/ui installed and configured | ❌ | `components/ui/` |
| Zustand installed | ❌ | `lib/stores/` |
| TanStack Query installed | ❌ | `lib/api/` |
| React Hook Form + Zod installed | ❌ | `lib/validations/` |
| Lucide React, Recharts, sonner installed | ❌ | |
| ESLint + Prettier configured | ❌ | `.eslintrc.js`, `.prettierrc` |
| Path alias `@/` → `src/` | ❌ | `tsconfig.json` |
| `.env.example` created | ❌ | `.env.example` |
| `lib/api/client.ts` (axios instance + interceptors) | ❌ | `lib/api/client.ts` |
| `middleware.ts` (role-based route guards) | ❌ | `middleware.ts` |

### 1.2 Layout & Navigation
| Task | Status | File/Notes |
|------|--------|-----------|
| `app/(website)/layout.tsx` | ❌ | |
| `Navbar.tsx` — sticky, logo, nav links, CTA | ❌ | `components/shared/Navbar.tsx` |
| Mobile hamburger menu | ❌ | inside Navbar |
| `Footer.tsx` — 4-col, dark, social icons | ❌ | `components/shared/Footer.tsx` |
| WhatsApp floating button (bottom-right) | ❌ | `components/shared/WhatsAppButton.tsx` |

### 1.3 Home Page
| Section | Status | File/Notes |
|---------|--------|-----------|
| Hero section (gradient, 2 CTAs) | ❌ | `app/(website)/page.tsx` |
| Stats Bar (4 stats) | ❌ | |
| Services Overview (6 cards) | ❌ | |
| Why Choose Us (4 tiles) | ❌ | |
| How It Works (4 steps) | ❌ | |
| Testimonials (3 cards) | ❌ | From API |
| CTA Banner | ❌ | |
| **Contact Information section** (address/phone/email cards) | ❌ | Required by spec |

### 1.4 About Us Page
| Task | Status | File/Notes |
|------|--------|-----------|
| Page created | ❌ | `app/(website)/about/page.tsx` |
| Company Profile + stats | ❌ | |
| Vision & Mission cards | ❌ | |
| Manufacturing Capabilities | ❌ | |
| Repair Expertise section | ❌ | |
| Team section | ❌ | |

### 1.5 Services Page
| Task | Status | File/Notes |
|------|--------|-----------|
| Page created | ❌ | `app/(website)/services/page.tsx` |
| TV Repair — LED TV Repair | ❌ | |
| TV Repair — Smart TV Repair | ❌ | |
| TV Repair — Motherboard/Power Supply Repair | ❌ | |
| TV Repair — Screen Replacement | ❌ | |
| TV Repair — Backlight Repair | ❌ | |
| TV Repair — Scratch Remover/Polarizer Change | ❌ | |
| "All Brands Supported" badge | ❌ | |
| Pick & Drop facility card | ❌ | |
| Speaker Manufacturing | ❌ | |
| Onsite Warranty for new speaker | ❌ | |
| Audio System Installation | ❌ | |
| Home Theater Installation | ❌ | |

### 1.6 Products Page
| Task | Status | File/Notes |
|------|--------|-----------|
| Page created | ❌ | `app/(website)/products/page.tsx` |
| Product catalog cards (image, name, specs, price) | ❌ | |
| Category filter bar | ❌ | |
| Product inquiry modal form | ❌ | → `POST /public/inquiries` |

### 1.7 Contact Page
| Task | Status | File/Notes |
|------|--------|-----------|
| Page created | ❌ | `app/(website)/contact/page.tsx` |
| Contact form | ❌ | → `POST /public/leads` |
| Google Map iframe embed | ❌ | |
| Click-to-Call button | ❌ | |
| WhatsApp Chat button | ❌ | |
| Address, hours, email display | ❌ | |

### 1.8 Service Booking Page (Multi-step)
| Task | Status | File/Notes |
|------|--------|-----------|
| Page created | ❌ | `app/(website)/book/page.tsx` |
| Progress bar (3 steps) | ❌ | |
| Step 1 — Customer name, phone, email | ❌ | |
| Step 1 — Service type dropdown (from API) | ❌ | → `GET /public/services` |
| Step 1 — Date + time slot picker | ❌ | |
| Step 1 — Issue description textarea | ❌ | |
| Step 1 — Photo upload (max 5, 5MB each) | ❌ | |
| Step 2 — Address fields | ❌ | |
| Step 2 — Pick & Drop toggle | ❌ | |
| Step 3 — Order summary | ❌ | |
| Step 3 — ₹250 charge display | ❌ | |
| Step 3 — Razorpay checkout (UPI/Cards/NetBanking) | ❌ | |
| Form state in Zustand across steps | ❌ | |

### 1.9 Booking Success Page
| Task | Status | File/Notes |
|------|--------|-----------|
| Page created | ❌ | `app/(website)/booking/success/page.tsx` |
| Animated green checkmark | ❌ | |
| Ticket ID displayed (TVR-YYYY-NNNN, monospace) | ❌ | |
| Service summary (type, date, address) | ❌ | |
| "Track Your Repair" CTA | ❌ | |

### 1.10 Repair Tracking Page (Public)
| Task | Status | File/Notes |
|------|--------|-----------|
| Page created | ❌ | `app/(website)/track/page.tsx` |
| Ticket ID search input | ❌ | |
| URL pre-fill (?id=TVR-XXXX) | ❌ | |
| Vertical status timeline | ❌ | `components/shared/StatusTimeline.tsx` |
| All 7 statuses shown | ❌ | |
| Timestamp + technician note per step | ❌ | |
| Empty / error states | ❌ | |

### 1.11 Chatbot Widget (Module 9)
| Task | Status | File/Notes |
|------|--------|-----------|
| Floating chat bubble | ❌ | `components/shared/ChatbotWidget.tsx` |
| Slide-up chat panel | ❌ | |
| FAQ: Service charges keyword | ❌ | |
| FAQ: Repair status keyword | ❌ | |
| FAQ: Business hours keyword | ❌ | |
| FAQ: Product information keyword | ❌ | |
| FAQ: Appointment booking (shows Book CTA) | ❌ | |
| Escalation to human (WhatsApp or chat) | ❌ | |

### Phase 1 SEO & Performance
| Task | Status | File/Notes |
|------|--------|-----------|
| OG tags on all public pages | ❌ | |
| JSON-LD LocalBusiness schema | ❌ | Home + Contact pages |
| All images use `next/image` | ❌ | |
| Responsive: 375px, 768px, 1280px | ❌ | |

---

## PHASE 2 — Customer Portal

### 2.1 Auth Pages
| Task | Status | File/Notes |
|------|--------|-----------|
| Login page (Phone + OTP) | ❌ | `app/(customer)/login/page.tsx` |
| Register page (Name, phone, email, OTP verify) | ❌ | `app/(customer)/register/page.tsx` |
| Auth state in Zustand | ❌ | `lib/stores/auth-store.ts` |

### 2.2 Customer Portal Layout
| Task | Status | File/Notes |
|------|--------|-----------|
| Portal layout | ❌ | `app/(customer)/layout.tsx` |
| Sidebar (desktop) | ❌ | My Repairs, Payments, Invoices, Queries, Profile |
| Bottom nav bar (mobile) | ❌ | |
| Topbar (greeting + notification bell) | ❌ | |

### 2.3 Customer Dashboard
| Task | Status | File/Notes |
|------|--------|-----------|
| Dashboard page | ❌ | `app/(customer)/dashboard/page.tsx` |
| Stat cards (Active, Completed, Pending Payments, Total Spent) | ❌ | |
| Recent repairs table | ❌ | |
| Quick action buttons | ❌ | |

### 2.4 My Repairs
| Task | Status | File/Notes |
|------|--------|-----------|
| Repairs list page | ❌ | `app/(customer)/repairs/page.tsx` |
| Status filter | ❌ | |
| Date range filter | ❌ | |

### 2.5 Repair Detail
| Task | Status | File/Notes |
|------|--------|-----------|
| Repair detail page | ❌ | `app/(customer)/repairs/[ticketId]/page.tsx` |
| Status timeline | ❌ | |
| Technician info | ❌ | |
| Customer + technician photos | ❌ | |
| Repair notes | ❌ | |
| Estimate + invoice section | ❌ | |
| Payment history | ❌ | |

### 2.6 Chat Panel
| Task | Status | File/Notes |
|------|--------|-----------|
| Chat panel component | ❌ | `components/customer/ChatPanel.tsx` |
| Socket.io connection | ❌ | |
| Message list | ❌ | |
| File/image attachment | ❌ | |
| Read receipts | ❌ | |
| Typing indicator | ❌ | |

### 2.7 Payments
| Task | Status | File/Notes |
|------|--------|-----------|
| Payments page | ❌ | `app/(customer)/payments/page.tsx` |
| Transaction list | ❌ | |
| Pay Now → Razorpay | ❌ | |
| Receipt download (PDF) | ❌ | |

### 2.8 Invoices
| Task | Status | File/Notes |
|------|--------|-----------|
| Invoices page | ❌ | `app/(customer)/invoices/page.tsx` |
| Invoice list | ❌ | |
| PDF download | ❌ | |

### 2.9 Estimate Approval (Module 12)
| Task | Status | File/Notes |
|------|--------|-----------|
| Estimate detail in portal | ❌ | `app/(customer)/estimates/[id]/page.tsx` |
| Approve / Reject buttons | ❌ | |

### 2.10 Raise Query
| Task | Status | File/Notes |
|------|--------|-----------|
| Queries page | ❌ | `app/(customer)/queries/page.tsx` |
| Query form | ❌ | |
| Query list + replies | ❌ | |

### 2.11 Customer Profile
| Task | Status | File/Notes |
|------|--------|-----------|
| Profile page | ❌ | `app/(customer)/profile/page.tsx` |
| Edit name, email, phone, address | ❌ | |
| Change password | ❌ | |
| Notification preferences (SMS/Email/WhatsApp toggles) | ❌ | |

---

## PHASE 3 — Technician Dashboard

| Task | Status | File/Notes |
|------|--------|-----------|
| Technician login | ❌ | `app/(technician)/login/page.tsx` |
| Technician layout | ❌ | `app/(technician)/layout.tsx` |
| Dashboard (today summary, job queue) | ❌ | `app/(technician)/dashboard/page.tsx` |
| Job detail page | ❌ | `app/(technician)/jobs/[ticketId]/page.tsx` |
| Accept / Reject job | ❌ | |
| Status update dropdown | ❌ | |
| Add repair note | ❌ | |
| Photo upload (before/after) | ❌ | |
| **Create Estimate (after diagnosis)** | ❌ | |
| Customer estimate approval badge | ❌ | |
| Parts request form | ❌ | |
| Generate service report (PDF) | ❌ | |
| Job history page | ❌ | `app/(technician)/jobs/history/page.tsx` |
| Performance summary | ❌ | |
| GPS: Share location (optional) | 🔲 | Confirm with client |
| Attendance: Check-in/Check-out (optional) | 🔲 | Confirm with client |

---

## PHASE 4 — Admin & Manager Panel

### Layout & Auth
| Task | Status | File/Notes |
|------|--------|-----------|
| Admin login + role detection | ❌ | `app/(admin)/login/page.tsx` |
| Admin layout (sidebar + topbar) | ❌ | `app/(admin)/layout.tsx` |
| Role-aware sidebar menu | ❌ | Admin vs Manager items |

### Dashboard
| Task | Status | File/Notes |
|------|--------|-----------|
| 8 KPI cards | ❌ | Total Leads, New Leads, Pending Leads, Completed Jobs, Revenue, Technician Perf, Active Tickets, Pending Payments |
| Lead Kanban (drag-and-drop, @dnd-kit) | ❌ | |
| Revenue trend chart (Recharts line) | ❌ | |
| Leads by source chart (pie) | ❌ | |
| Ticket status chart (donut) | ❌ | |
| Activity feed (Socket.io real-time) | ❌ | |

### Lead Management
| Task | Status | File/Notes |
|------|--------|-----------|
| Leads table | ❌ | `app/(admin)/leads/page.tsx` |
| Filters (status, source, date, technician, search) | ❌ | |
| Add Lead modal (all 7 sources in dropdown) | ❌ | |
| Lead detail drawer (slide-over) | ❌ | |
| Bulk assign + change status | ❌ | |
| Export leads | ❌ | |

### Ticket Management
| Task | Status | File/Notes |
|------|--------|-----------|
| Tickets table | ❌ | `app/(admin)/tickets/page.tsx` |
| Assign/reassign technician | ❌ | |
| Status update | ❌ | |
| Manager notes | ❌ | |

### Other CRM Modules
| Task | Status | File/Notes |
|------|--------|-----------|
| Customer management | ❌ | `app/(admin)/customers/page.tsx` |
| Technician management | ❌ | `app/(admin)/technicians/page.tsx` |
| **Manage Services (service catalog)** | ❌ | `app/(admin)/services/page.tsx` |

### Inventory & Vendors
| Task | Status | File/Notes |
|------|--------|-----------|
| Inventory table (TV/Speaker/Electronic parts) | ❌ | `app/(admin)/inventory/page.tsx` |
| Low stock alert banner | ❌ | |
| Stock-in / Stock-out actions | ❌ | |
| Stock movement history | ❌ | |
| **Vendor management page** | ❌ | `app/(admin)/vendors/page.tsx` |
| **Purchase Orders — create/send/receive** | ❌ | |

### Estimates & Billing
| Task | Status | File/Notes |
|------|--------|-----------|
| **Estimates tab (create, send, approve)** | ❌ | `app/(admin)/invoices/page.tsx` → Estimates tab |
| **Convert estimate to invoice** | ❌ | |
| Tax Invoice — create | ❌ | Invoices tab |
| Service Invoice — create | ❌ | |
| Invoice send (email + WhatsApp) | ❌ | |
| Invoice PDF download | ❌ | |
| **Payment Receipt download** | ❌ | Receipts tab |

### Payments & Reports
| Task | Status | File/Notes |
|------|--------|-----------|
| Payment management table | ❌ | `app/(admin)/payments/page.tsx` |
| Revenue summary | ❌ | |
| Refund action | ❌ | |
| Export CSV/Excel | ❌ | |
| Reports — Daily Leads (bar chart) | ❌ | `app/(admin)/reports/page.tsx` |
| Reports — Monthly Revenue (line chart) | ❌ | |
| Reports — Technician Performance | ❌ | |
| Reports — Service Completion Rate | ❌ | |
| Reports — **Customer Satisfaction** (star avg) | ❌ | Needs rating data |
| Reports — Repeat Customers | ❌ | |
| Export per report (PDF/Excel/CSV) | ❌ | |

### Content, Settings & Rating
| Task | Status | File/Notes |
|------|--------|-----------|
| Website content management | ❌ | `app/(admin)/content/page.tsx` |
| Settings (General, Notifications, Payment, RBAC, Integrations) | ❌ | `app/(admin)/settings/page.tsx` |
| **Customer rating page** (/rate) | ❌ | `app/(website)/rate/page.tsx` |
| Technician GPS map view (optional) | 🔲 | `app/(admin)/map/page.tsx` |

---

## PHASE 5 — Polish & Deployment

| Task | Status | File/Notes |
|------|--------|-----------|
| Lighthouse 90+ on all public pages | ❌ | |
| WebP images + lazy loading | ❌ | |
| next/font (Inter + Poppins) | ❌ | |
| Code-split admin routes | ❌ | |
| Suspense + loading.tsx per segment | ❌ | |
| Sitemap (next-sitemap) | ❌ | |
| robots.txt | ❌ | |
| Global error.tsx + not-found.tsx | ❌ | |
| Sentry integration | ❌ | |
| Unit tests (Zod schemas) | ❌ | |
| Integration tests (MSW) | ❌ | |
| Cypress E2E (booking flow) | ❌ | |
| Dockerfile (standalone output) | ❌ | |
| docker-compose | ❌ | |
| GitHub Actions CI/CD | ❌ | |

---

## HOW TO USE
```
# Count remaining tasks
grep -c "❌" frontend/TRACKER.md

# Find all incomplete tasks
grep "❌" frontend/TRACKER.md
```
When a task is done: change `❌` → `✅`, update "Last updated" date.
