'use client';

import { FileText, Download, Loader2 } from 'lucide-react';

export default function AdminInvoicesPage() {
  const isLoading = false;

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Invoices</h1>
        <p className="text-sm text-neutral-500">Manage service invoices and estimates.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 w-fit">
        {['Invoices', 'Estimates', 'Receipts'].map((t) => (
          <button key={t}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-neutral-900 shadow-sm">
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <th className="px-4 py-3 text-left">Invoice #</th>
                <th className="px-4 py-3 text-left">Ticket</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {isLoading ? (
                <tr><td colSpan={7} className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin text-primary-600 mx-auto" /></td></tr>
              ) : (
                <tr><td colSpan={7} className="py-14 text-center">
                  <FileText className="h-10 w-10 text-neutral-200 mx-auto mb-2" />
                  <p className="text-neutral-400 text-sm">No invoices yet.</p>
                  <p className="text-neutral-300 text-xs mt-1">Invoices are generated after repair completion.</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
