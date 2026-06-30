'use client';

import { useState } from 'react';
import { Search, Package, AlertTriangle, Plus, Minus, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminApi } from '@/lib/api/admin';
import type { InventoryItem } from '@/types';

const STATUS_CONFIG = {
  IN_STOCK:     { label: 'In Stock',     color: 'bg-green-100 text-green-700' },
  LOW_STOCK:    { label: 'Low Stock',    color: 'bg-yellow-100 text-yellow-700' },
  OUT_OF_STOCK: { label: 'Out of Stock', color: 'bg-red-100 text-red-700' },
};

export default function AdminInventoryPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [adjusting, setAdjusting] = useState<{ id: string; type: 'IN' | 'OUT' } | null>(null);
  const [qty, setQty] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-inventory', search],
    queryFn: () => adminApi.getInventory({ search: search || undefined }).then((r) => r.data),
  });

  const stockMutation = useMutation({
    mutationFn: ({ id, type, quantity }: { id: string; type: 'IN' | 'OUT'; quantity: number }) =>
      adminApi.updateStock(id, { quantity, type }),
    onSuccess: () => {
      toast.success('Stock updated');
      setAdjusting(null);
      setQty('');
      qc.invalidateQueries({ queryKey: ['admin-inventory'] });
    },
    onError: () => toast.error('Stock update failed'),
  });

  const items: InventoryItem[] = data?.items ?? [];
  const lowStockCount = items.filter((i) => i.status !== 'IN_STOCK').length;

  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Inventory</h1>
        <p className="text-sm text-neutral-500">{data?.total ?? 0} items tracked</p>
      </div>

      {lowStockCount > 0 && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
          <p className="text-sm text-red-700 font-medium">
            {lowStockCount} item{lowStockCount > 1 ? 's' : ''} below reorder level — immediate action required.
          </p>
        </div>
      )}

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input type="text" placeholder="Search parts..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <th className="px-4 py-3 text-left">Part / Item</th>
                <th className="px-4 py-3 text-left">SKU</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Qty</th>
                <th className="px-4 py-3 text-left">Reorder At</th>
                <th className="px-4 py-3 text-left">Unit Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {isLoading ? (
                <tr><td colSpan={8} className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin text-primary-600 mx-auto" /></td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={8} className="py-12 text-center">
                  <Package className="h-10 w-10 text-neutral-200 mx-auto mb-2" />
                  <p className="text-neutral-400">No items found</p>
                </td></tr>
              ) : items.map((item) => (
                <tr key={item.id} className={`hover:bg-neutral-50 transition-colors ${item.status !== 'IN_STOCK' ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3 font-medium text-neutral-800">{item.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-neutral-500">{item.sku}</td>
                  <td className="px-4 py-3 text-neutral-600">{item.category}</td>
                  <td className="px-4 py-3 font-bold text-neutral-900">{item.quantity}</td>
                  <td className="px-4 py-3 text-neutral-500">{item.reorderLevel}</td>
                  <td className="px-4 py-3 text-neutral-700">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_CONFIG[item.status].color}`}>
                      {STATUS_CONFIG[item.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => { setAdjusting({ id: item.id, type: 'IN' }); setQty(''); }}
                        className="p-1 rounded bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="Stock In">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => { setAdjusting({ id: item.id, type: 'OUT' }); setQty(''); }}
                        className="p-1 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors" title="Stock Out">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock adjustment inline modal */}
      {adjusting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
            <h2 className="font-bold text-neutral-900">Stock {adjusting.type === 'IN' ? 'In' : 'Out'}</h2>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Quantity</label>
              <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)}
                placeholder="Enter quantity"
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => stockMutation.mutate({ id: adjusting.id, type: adjusting.type, quantity: parseInt(qty) })}
                disabled={!qty || stockMutation.isPending}
                className={`flex-1 flex items-center justify-center gap-2 text-white text-sm font-semibold py-2.5 rounded-lg disabled:opacity-60 transition-colors ${adjusting.type === 'IN' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'}`}>
                {stockMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : `Confirm Stock ${adjusting.type}`}
              </button>
              <button onClick={() => setAdjusting(null)} className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
