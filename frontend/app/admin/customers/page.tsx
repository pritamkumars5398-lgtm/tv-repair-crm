'use client';

import { useState } from 'react';
import { Search, Loader2, UserCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/lib/api/admin';
import type { Customer } from '@/types';

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-customers', search, page],
    queryFn: () => adminApi.getCustomers({ search: search || undefined, page, limit: 20 }).then((r) => r.data),
  });

  const customers: Customer[] = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Customers</h1>
        <p className="text-sm text-neutral-500">{data?.total ?? 0} registered customers</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input type="text" placeholder="Search name or phone..." value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full pl-9 pr-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Total Repairs</th>
                <th className="px-4 py-3 text-left">Total Spent</th>
                <th className="px-4 py-3 text-left">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {isLoading ? (
                <tr><td colSpan={6} className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin text-primary-600 mx-auto" /></td></tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <UserCheck className="h-10 w-10 text-neutral-200 mx-auto mb-2" />
                    <p className="text-neutral-400">No customers found</p>
                  </td>
                </tr>
              ) : customers.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {c.name[0].toUpperCase()}
                      </div>
                      <span className="font-medium text-neutral-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{c.phone}</td>
                  <td className="px-4 py-3 text-neutral-500">{c.email ?? '—'}</td>
                  <td className="px-4 py-3 text-neutral-700 font-medium">{c.totalRepairs}</td>
                  <td className="px-4 py-3 font-semibold text-neutral-800">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-neutral-400 text-xs">{new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
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
