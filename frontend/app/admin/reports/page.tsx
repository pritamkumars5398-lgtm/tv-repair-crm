'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { adminApi } from '@/lib/api/admin';
import type { RevenueDataPoint } from '@/types';

const TABS = ['Revenue', 'Leads', 'Technicians'] as const;
type Tab = typeof TABS[number];

function toISO(date: Date) {
  return date.toISOString().split('T')[0];
}

export default function AdminReportsPage() {
  const [tab, setTab] = useState<Tab>('Revenue');
  const [from, setFrom] = useState(toISO(new Date(Date.now() - 30 * 86400000)));
  const [to, setTo] = useState(toISO(new Date()));

  const { data: revenue } = useQuery({
    queryKey: ['revenue-report', from, to],
    queryFn: () => adminApi.getRevenueChart(30).then((r) => r.data),
  });

  const { data: leadSources } = useQuery({
    queryKey: ['lead-sources-report'],
    queryFn: () => adminApi.getLeadSourceChart().then((r) => r.data),
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Reports</h1>
        <p className="text-sm text-neutral-500">Business analytics and performance insights.</p>
      </div>

      {/* Date range */}
      <div className="flex flex-wrap items-center gap-3 bg-white rounded-xl border border-neutral-200 shadow-card p-4">
        <p className="text-sm font-medium text-neutral-600">Date Range:</p>
        <div className="flex items-center gap-2">
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
            className="px-3 py-1.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <span className="text-neutral-400 text-sm">to</span>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
            className="px-3 py-1.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        {[
          { label: '7d', days: 7 }, { label: '30d', days: 30 }, { label: '90d', days: 90 },
        ].map((p) => (
          <button key={p.label} onClick={() => { setFrom(toISO(new Date(Date.now() - p.days * 86400000))); setTo(toISO(new Date())); }}
            className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            Last {p.label}
          </button>
        ))}
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Revenue tab */}
      {tab === 'Revenue' && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-5">
            <h2 className="font-semibold text-neutral-800 mb-4">Daily Revenue</h2>
            {revenue?.length ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={revenue}>
                  <XAxis dataKey="date" tick={{ fontSize: 11 }}
                    tickFormatter={(v: string) => new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-sm text-neutral-400">No revenue data for selected range</div>
            )}
          </div>
          {revenue?.length ? (
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Total Revenue', value: `₹${(revenue as RevenueDataPoint[]).reduce((s, d) => s + d.revenue, 0).toLocaleString('en-IN')}` },
                { label: 'Daily Average', value: `₹${Math.round((revenue as RevenueDataPoint[]).reduce((s, d) => s + d.revenue, 0) / (revenue as RevenueDataPoint[]).length || 0).toLocaleString('en-IN')}` },
                { label: 'Best Day', value: `₹${Math.max(...(revenue as RevenueDataPoint[]).map((d) => d.revenue)).toLocaleString('en-IN')}` },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl border border-neutral-200 shadow-card p-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}

      {/* Leads tab */}
      {tab === 'Leads' && (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-5">
          <h2 className="font-semibold text-neutral-800 mb-4">Leads by Source</h2>
          {leadSources?.length ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={leadSources}>
                <XAxis dataKey="source" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-sm text-neutral-400">No lead data available</div>
          )}
        </div>
      )}

      {/* Technicians tab */}
      {tab === 'Technicians' && (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-5">
          <h2 className="font-semibold text-neutral-800 mb-2">Technician Performance</h2>
          <p className="text-sm text-neutral-400">Coming soon — connect to reports API endpoint.</p>
        </div>
      )}
    </div>
  );
}
