'use client';

import { useState } from 'react';
import { Search, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminApi } from '@/lib/api/admin';
import type { Ticket, TicketStatus } from '@/types';

const STATUS_LABELS: Record<TicketStatus, string> = {
  tv_received:         'TV Received',
  diagnosis_completed: 'Diagnosed',
  parts_ordered:       'Parts Ordered',
  repair_in_progress:  'In Progress',
  quality_check:       'Quality Check',
  ready_for_delivery:  'Ready',
  delivered:           'Delivered',
};

const STATUS_COLORS: Record<TicketStatus, string> = {
  tv_received:         'bg-blue-100 text-blue-700',
  diagnosis_completed: 'bg-cyan-100 text-cyan-700',
  parts_ordered:       'bg-orange-100 text-orange-700',
  repair_in_progress:  'bg-yellow-100 text-yellow-800',
  quality_check:       'bg-indigo-100 text-indigo-700',
  ready_for_delivery:  'bg-teal-100 text-teal-700',
  delivered:           'bg-green-100 text-green-700',
};

const ALL_STATUSES = Object.keys(STATUS_LABELS) as TicketStatus[];

const SERVICE_LABELS: Record<string, string> = {
  TV_REPAIR: 'TV Repair', SPEAKER_REPAIR: 'Speaker', HOME_VISIT: 'Home Visit',
  SPEAKER_INSTALL: 'Speaker Install', HOME_THEATER: 'Home Theater',
};

export default function AdminTicketsPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-tickets', search, statusFilter, page],
    queryFn: () => adminApi.getTickets({ search: search || undefined, status: statusFilter || undefined, page, limit: 20 }).then((r) => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => adminApi.updateTicket(id, { status }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-tickets'] }); toast.success('Status updated'); },
    onError: () => toast.error('Update failed'),
  });

  const tickets: Ticket[] = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="space-y-5 max-w-7xl">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Tickets</h1>
        <p className="text-sm text-neutral-500">{data?.total ?? 0} total tickets</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input type="text" placeholder="Search ticket ID or customer..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
          <option value="">All Statuses</option>
          {ALL_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <th className="px-4 py-3 text-left">Ticket ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Technician</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Scheduled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {isLoading ? (
                <tr><td colSpan={6} className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin text-primary-600 mx-auto" /></td></tr>
              ) : tickets.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-neutral-400">No tickets found</td></tr>
              ) : tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded">{ticket.ticketId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-neutral-800">{ticket.customerName}</p>
                    <p className="text-xs text-neutral-400">{ticket.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{SERVICE_LABELS[ticket.serviceType] ?? ticket.serviceType}</td>
                  <td className="px-4 py-3 text-neutral-600">{ticket.technicianName ?? <span className="text-neutral-300">Unassigned</span>}</td>
                  <td className="px-4 py-3">
                    <select value={ticket.status}
                      onChange={(e) => updateMutation.mutate({ id: ticket.id, status: e.target.value })}
                      className={`text-xs font-medium px-2 py-0.5 rounded-full border-0 cursor-pointer focus:ring-1 focus:ring-primary-400 ${STATUS_COLORS[ticket.status]}`}>
                      {ALL_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-neutral-500 text-xs">
                    {ticket.scheduledAt ? new Date(ticket.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                  </td>
                </tr>
              ))}
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
