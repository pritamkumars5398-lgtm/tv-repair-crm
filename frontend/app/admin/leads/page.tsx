'use client';

import { useState } from 'react';
import { Search, Plus, Loader2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminApi } from '@/lib/api/admin';
import type { Lead, LeadStatus, LeadSource } from '@/types';

const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW:                 'bg-blue-100 text-blue-700',
  CONTACTED:           'bg-cyan-100 text-cyan-700',
  INSPECTION_SCHEDULED:'bg-violet-100 text-violet-700',
  TV_RECEIVED:         'bg-orange-100 text-orange-700',
  REPAIR_IN_PROGRESS:  'bg-yellow-100 text-yellow-800',
  QUALITY_CHECK:       'bg-indigo-100 text-indigo-700',
  READY:               'bg-teal-100 text-teal-700',
  DELIVERED:           'bg-green-100 text-green-700',
  CLOSED:              'bg-neutral-100 text-neutral-600',
};

const SOURCE_COLORS: Record<LeadSource, string> = {
  WEBSITE:    'bg-blue-50 text-blue-600',
  WHATSAPP:   'bg-green-50 text-green-600',
  CHATBOT:    'bg-purple-50 text-purple-600',
  PHONE_CALL: 'bg-orange-50 text-orange-600',
  FACEBOOK:   'bg-indigo-50 text-indigo-600',
  GOOGLE:     'bg-red-50 text-red-600',
  REFERRAL:   'bg-teal-50 text-teal-600',
};

const STATUSES: LeadStatus[] = ['NEW','CONTACTED','INSPECTION_SCHEDULED','TV_RECEIVED','REPAIR_IN_PROGRESS','QUALITY_CHECK','READY','DELIVERED','CLOSED'];

export default function AdminLeadsPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', phone: '', email: '', source: 'WEBSITE' as LeadSource, serviceType: 'TV_REPAIR', message: '' });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-leads', search, statusFilter, page],
    queryFn: () => adminApi.getLeads({ search: search || undefined, status: statusFilter || undefined, page, limit: 20 }).then((r) => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Lead> }) => adminApi.updateLead(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-leads'] });
      toast.success('Lead updated');
    },
    onError: () => toast.error('Update failed'),
  });

  const createMutation = useMutation({
    mutationFn: () => adminApi.createLead(newLead),
    onSuccess: () => {
      toast.success('Lead created');
      setShowModal(false);
      setNewLead({ name: '', phone: '', email: '', source: 'WEBSITE', serviceType: 'TV_REPAIR', message: '' });
      qc.invalidateQueries({ queryKey: ['admin-leads'] });
    },
    onError: () => toast.error('Failed to create lead'),
  });

  const leads: Lead[] = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Leads</h1>
          <p className="text-sm text-neutral-500">{total} total leads</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus className="h-4 w-4" /> Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input type="text" placeholder="Search name or phone..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Source</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {isLoading ? (
                <tr><td colSpan={6} className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin text-primary-600 mx-auto" /></td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-neutral-400 text-sm">No leads found</td></tr>
              ) : leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-neutral-800">{lead.name}</p>
                    <p className="text-xs text-neutral-400">{lead.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${SOURCE_COLORS[lead.source]}`}>{lead.source}</span>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{lead.serviceType?.replace(/_/g, ' ') ?? '—'}</td>
                  <td className="px-4 py-3">
                    <select value={lead.status}
                      onChange={(e) => updateMutation.mutate({ id: lead.id, data: { status: e.target.value as LeadStatus } })}
                      className={`text-xs font-medium px-2 py-0.5 rounded-full border-0 cursor-pointer focus:ring-1 focus:ring-primary-400 ${STATUS_COLORS[lead.status]}`}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-neutral-500 text-xs">{new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${lead.phone}`} className="text-xs text-primary-600 hover:underline">Call</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-100">
            <p className="text-xs text-neutral-500">Page {page} of {totalPages}</p>
            <div className="flex gap-1.5">
              <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}
                className="p-1.5 rounded border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40 transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}
                className="p-1.5 rounded border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-neutral-900">Add New Lead</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            {(['name','phone','email'] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-neutral-700 mb-1 capitalize">{field} {field === 'email' && <span className="text-neutral-400">(optional)</span>}</label>
                <input type={field === 'email' ? 'email' : 'text'} value={newLead[field]}
                  onChange={(e) => setNewLead((l) => ({ ...l, [field]: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Source</label>
              <select value={newLead.source} onChange={(e) => setNewLead((l) => ({ ...l, source: e.target.value as LeadSource }))}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                {(['WEBSITE','WHATSAPP','PHONE_CALL','FACEBOOK','GOOGLE','REFERRAL'] as LeadSource[]).map((s) =>
                  <option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Notes</label>
              <textarea rows={2} value={newLead.message} onChange={(e) => setNewLead((l) => ({ ...l, message: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={() => createMutation.mutate()} disabled={createMutation.isPending || !newLead.name || !newLead.phone}
                className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60">
                {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Lead'}
              </button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
