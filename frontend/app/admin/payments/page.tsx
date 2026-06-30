'use client';

import { useState } from 'react';
import { CreditCard, CheckCircle2, XCircle, Clock, RefreshCw, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/lib/api/admin';
import type { Payment, PaymentStatus } from '@/types';

const STATUS_CONFIG: Record<PaymentStatus, { label: string; icon: typeof CheckCircle2; color: string }> = {
  PENDING:  { label: 'Pending',  icon: Clock,        color: 'bg-yellow-100 text-yellow-700' },
  CAPTURED: { label: 'Paid',     icon: CheckCircle2, color: 'bg-green-100 text-green-700' },
  FAILED:   { label: 'Failed',   icon: XCircle,      color: 'bg-red-100 text-red-700' },
  REFUNDED: { label: 'Refunded', icon: RefreshCw,    color: 'bg-gray-100 text-gray-600' },
};

export default function AdminPaymentsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-payments', statusFilter, page],
    queryFn: () => adminApi.getPayments({ status: statusFilter || undefined, page, limit: 20 }).then((r) => r.data),
  });

  const payments: Payment[] = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = payments.filter((p) => p.status === 'CAPTURED').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Payments</h1>
        <p className="text-sm text-neutral-500">{data?.total ?? 0} transactions</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(Object.keys(STATUS_CONFIG) as PaymentStatus[]).map((status) => {
          const cfg = STATUS_CONFIG[status];
          const Icon = cfg.icon;
          const count = payments.filter((p) => p.status === status).length;
          return (
            <button key={status} onClick={() => setStatusFilter(statusFilter === status ? '' : status)}
              className={`bg-white rounded-xl border shadow-card p-4 text-left transition-all hover:shadow-md ${statusFilter === status ? 'border-primary-400 ring-2 ring-primary-100' : 'border-neutral-200'}`}>
              <div className={`inline-flex p-1.5 rounded-lg ${cfg.color} mb-2`}><Icon className="h-4 w-4" /></div>
              <p className="text-xl font-bold text-neutral-900">{count}</p>
              <p className="text-xs text-neutral-500">{cfg.label}</p>
            </button>
          );
        })}
      </div>

      {statusFilter === 'CAPTURED' && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm font-semibold text-green-800">
          Total collected (filtered): ₹{total.toLocaleString('en-IN')}
        </div>
      )}

      <div className="bg-white rounded-xl border border-neutral-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <th className="px-4 py-3 text-left">Ticket</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Payment ID</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {isLoading ? (
                <tr><td colSpan={5} className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin text-primary-600 mx-auto" /></td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center">
                  <CreditCard className="h-10 w-10 text-neutral-200 mx-auto mb-2" />
                  <p className="text-neutral-400">No payments found</p>
                </td></tr>
              ) : payments.map((p) => {
                const cfg = STATUS_CONFIG[p.status];
                return (
                  <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-primary-700">{p.ticketId}</td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">₹{p.amount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.color}`}>{cfg.label}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-400">{p.razorpayPaymentId ?? '—'}</td>
                    <td className="px-4 py-3 text-neutral-500 text-xs">{new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-100">
            <p className="text-xs text-neutral-500">Page {page} of {totalPages}</p>
            <div className="flex gap-1.5">
              <button onClick={() => setPage((p) => p - 1)} disabled={page === 1} className="p-1.5 rounded border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages} className="p-1.5 rounded border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
