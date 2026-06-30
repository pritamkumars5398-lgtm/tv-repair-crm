'use client';

import { Users, Ticket, IndianRupee, Wrench, CreditCard, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { adminApi } from '@/lib/api/admin';
import type { RevenueDataPoint, LeadSourceDataPoint } from '@/types';

const KPI_CONFIG = [
  { key: 'newLeadsToday',       label: 'New Leads Today',    icon: Users,        color: 'bg-blue-50 text-blue-600' },
  { key: 'activeTickets',       label: 'Active Tickets',     icon: Ticket,       color: 'bg-yellow-50 text-yellow-600' },
  { key: 'techniciansOnField',  label: 'On Field',           icon: Wrench,       color: 'bg-indigo-50 text-indigo-600' },
  { key: 'revenueThisMonth',    label: 'Revenue (Month)',    icon: IndianRupee,  color: 'bg-green-50 text-green-600', prefix: '₹' },
  { key: 'pendingPayments',     label: 'Pending Payments',   icon: CreditCard,   color: 'bg-orange-50 text-orange-600' },
  { key: 'completedJobsToday',  label: 'Completed Today',    icon: CheckCircle2, color: 'bg-teal-50 text-teal-600' },
];

const PIE_COLORS = ['#3b82f6', '#25D366', '#f97316', '#6366f1', '#eab308', '#94a3b8'];

export default function AdminDashboardPage() {
  const { data: stats } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: () => adminApi.getDashboard().then((r) => r.data),
    refetchInterval: 60_000,
  });

  const { data: revenue } = useQuery({
    queryKey: ['revenue-chart'],
    queryFn: () => adminApi.getRevenueChart(30).then((r) => r.data),
  });

  const { data: leadSources } = useQuery({
    queryKey: ['lead-source-chart'],
    queryFn: () => adminApi.getLeadSourceChart().then((r) => r.data),
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Live overview of your business.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {KPI_CONFIG.map(({ key, label, icon: Icon, color, prefix }) => {
          const raw = stats?.[key as keyof typeof stats] ?? 0;
          const value = prefix ? `${prefix}${Number(raw).toLocaleString('en-IN')}` : String(raw);
          return (
            <div key={key} className="bg-white rounded-xl border border-neutral-200 shadow-card p-4">
              <div className={`inline-flex p-2 rounded-lg ${color} mb-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-neutral-900">{stats ? value : '—'}</p>
              <p className="text-xs text-neutral-500 mt-0.5 leading-tight">{label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Revenue trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 shadow-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-primary-600" />
            <h2 className="font-semibold text-neutral-800 text-sm">Revenue — Last 30 Days</h2>
          </div>
          {revenue?.length ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenue}>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v: string) => new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-sm text-neutral-400">No data yet</div>
          )}
        </div>

        {/* Lead sources pie */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="h-4 w-4 text-accent-500" />
            <h2 className="font-semibold text-neutral-800 text-sm">Leads by Source</h2>
          </div>
          {leadSources?.length ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={leadSources} dataKey="count" nameKey="source" cx="50%" cy="50%" outerRadius={70} label={({ source }: LeadSourceDataPoint) => source}>
                  {leadSources.map((_: LeadSourceDataPoint, i: number) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-sm text-neutral-400">No data yet</div>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { href: '/admin/leads',   label: 'Manage Leads',   sub: 'View and assign leads' },
          { href: '/admin/tickets', label: 'Open Tickets',   sub: 'Track active repairs' },
          { href: '/admin/reports', label: 'Reports',        sub: 'Revenue & performance' },
        ].map((item) => (
          <a key={item.href} href={item.href}
            className="bg-white rounded-xl border border-neutral-200 shadow-card p-4 hover:border-primary-300 hover:shadow-md transition-all group">
            <p className="font-semibold text-neutral-800 text-sm group-hover:text-primary-700">{item.label}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{item.sub}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
