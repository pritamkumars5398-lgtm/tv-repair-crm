'use client';

import { useState } from 'react';
import { Plus, X, Loader2, Star, CheckCircle2, XCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminApi } from '@/lib/api/admin';
import type { Technician } from '@/types';

export default function AdminTechniciansPage() {
  const qc = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', specialization: '' });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-technicians'],
    queryFn: () => adminApi.getTechnicians().then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: () => adminApi.createTechnician(form),
    onSuccess: () => {
      toast.success('Technician added');
      setShowModal(false);
      setForm({ name: '', phone: '', email: '', specialization: '' });
      qc.invalidateQueries({ queryKey: ['admin-technicians'] });
    },
    onError: () => toast.error('Failed to add technician'),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => adminApi.updateTechnician(id, { isActive }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-technicians'] }),
    onError: () => toast.error('Update failed'),
  });

  const technicians: Technician[] = data?.items ?? [];

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Technicians</h1>
          <p className="text-sm text-neutral-500">{technicians.length} technicians</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus className="h-4 w-4" /> Add Technician
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary-600" /></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {technicians.map((tech) => (
            <div key={tech.id} className="bg-white rounded-xl border border-neutral-200 shadow-card p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                    {tech.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">{tech.name}</p>
                    <p className="text-xs text-neutral-400">{tech.specialization}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleMutation.mutate({ id: tech.id, isActive: !tech.isActive })}
                  className={`shrink-0 ${tech.isActive ? 'text-green-500 hover:text-red-500' : 'text-red-400 hover:text-green-500'} transition-colors`}
                  title={tech.isActive ? 'Deactivate' : 'Activate'}
                >
                  {tech.isActive ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                </button>
              </div>
              <div className="space-y-1.5 text-sm text-neutral-600">
                <p>{tech.phone}</p>
                {tech.email && <p className="text-neutral-400 text-xs">{tech.email}</p>}
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-sm">
                <span className="text-neutral-500">{tech.jobsCompleted} jobs</span>
                {tech.rating && (
                  <span className="flex items-center gap-1 text-yellow-500 font-medium">
                    <Star className="h-3.5 w-3.5 fill-yellow-400" />{tech.rating.toFixed(1)}
                  </span>
                )}
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tech.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {tech.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-neutral-900">Add Technician</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500"><X className="h-5 w-5" /></button>
            </div>
            {([
              { field: 'name', label: 'Full Name', type: 'text' },
              { field: 'phone', label: 'Phone', type: 'tel' },
              { field: 'email', label: 'Email (optional)', type: 'email' },
              { field: 'specialization', label: 'Specialization', type: 'text' },
            ] as { field: keyof typeof form; label: string; type: string }[]).map(({ field, label, type }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>
                <input type={type} value={form[field]} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            ))}
            <div className="flex gap-2 pt-1">
              <button onClick={() => createMutation.mutate()} disabled={createMutation.isPending || !form.name || !form.phone}
                className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2.5 rounded-lg disabled:opacity-60 transition-colors">
                {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add Technician'}
              </button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
