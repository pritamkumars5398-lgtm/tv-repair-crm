# Module 13 — Reports & Analytics (Backend)

## Overview
Analytics endpoints that power the admin dashboard charts and the Reports page. All queries accept `dateFrom` and `dateTo` range params.

## Endpoints
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/v1/admin/reports/leads` | Admin/Manager | Lead funnel analytics |
| GET | `/api/v1/admin/reports/revenue` | Admin | Revenue analytics |
| GET | `/api/v1/admin/reports/technician-performance` | Admin/Manager | Per-technician stats |
| GET | `/api/v1/admin/reports/tickets` | Admin/Manager | Ticket analytics |
| GET | `/api/v1/admin/reports/customers` | Admin | Customer analytics |
| GET | `/api/v1/admin/reports/export` | Admin | Export to CSV/Excel/PDF |

## Lead Report
```
GET /api/v1/admin/reports/leads?dateFrom=2026-06-01&dateTo=2026-06-30&groupBy=day

Response data shape (Recharts-ready):
{
  summary: { total, converted, conversionRate, bySource: {...}, byStatus: {...} },
  trend: [{ date: "2026-06-01", count: 12 }, ...],
  sourceBreakdown: [{ source: "WEBSITE", count: 45 }, ...],
  funnelDropoff: [
    { stage: "new_lead", count: 100 },
    { stage: "contacted", count: 78 },
    ...
  ]
}
```

## Revenue Report
```
GET /api/v1/admin/reports/revenue?dateFrom=...&dateTo=...&groupBy=week

{
  summary: { total, serviceVisitFees, repairCharges, avgOrderValue },
  trend: [{ period: "2026-W25", revenue: 45000 }, ...],
  byServiceType: [{ serviceType: "LED_TV_REPAIR", revenue: 23000 }, ...],
  byPaymentMethod: [{ method: "UPI", count: 34, amount: 12000 }, ...]
}
```
Revenue = sum of CAPTURED payments in date range. Amount in rupees (divide paise by 100).

## Technician Performance Report
```
GET /api/v1/admin/reports/technician-performance?dateFrom=...&dateTo=...&technicianId?=

Per technician:
  - jobsAssigned, jobsCompleted, completionRate
  - avgCompletionTimeHours (time from tv_received to delivered)
  - pendingJobs
  - rating (if collected)

Sorted by: jobsCompleted DESC
```

## Ticket Analytics
```
GET /api/v1/admin/reports/tickets?dateFrom=...&dateTo=...

{
  summary: { total, completed, inProgress, overdue },
  byStatus: [{ status: "repair_in_progress", count: 23 }, ...],
  byServiceType: [...],
  slaCompliance: {
    within24h: 12,
    within48h: 8,
    beyond48h: 4,
    complianceRate: 0.71
  },
  avgResolutionHours: 36
}
```

## Export Flow (Bull Queue)
Heavy exports (date ranges > 30 days) are queued:
```
POST /api/v1/admin/reports/export
Body: { type, format, dateFrom, dateTo }

1. Add job to pdfQueue (or export queue)
2. Return: { jobId, estimatedSeconds: 30 }

GET /api/v1/admin/reports/export/:jobId/status
Returns: { status: "processing" | "done" | "failed", downloadUrl? }

On complete: upload file to S3, return presigned URL (valid 30min)
```

Small exports (< 30 days, CSV): return file directly (stream response).

## Query Optimization
- Use raw Prisma queries (`$queryRaw`) for GROUP BY aggregations
- Index on `createdAt` for all major models
- Cache report results in Redis for 10 minutes (invalidate on ticket/payment write)
- For dashboard stats (KPI cards): use lightweight COUNT queries, cache 5min
