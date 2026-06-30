'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, Ticket, UserCheck, Package,
  FileText, CreditCard, BarChart2, Settings, Globe,
  LogOut, Menu, Bell, ChevronRight, Wrench,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/stores/auth-store';
import { authApi } from '@/lib/api/auth';

const allNavItems = [
  { href: '/admin/dashboard',   label: 'Dashboard',    icon: LayoutDashboard, roles: ['admin', 'manager'] },
  { href: '/admin/leads',       label: 'Leads',        icon: Users,           roles: ['admin', 'manager'] },
  { href: '/admin/tickets',     label: 'Tickets',      icon: Ticket,          roles: ['admin', 'manager'] },
  { href: '/admin/customers',   label: 'Customers',    icon: UserCheck,       roles: ['admin', 'manager'] },
  { href: '/admin/technicians', label: 'Technicians',  icon: Wrench,          roles: ['admin', 'manager'] },
  { href: '/admin/inventory',   label: 'Inventory',    icon: Package,         roles: ['admin'] },
  { href: '/admin/invoices',    label: 'Invoices',     icon: FileText,        roles: ['admin', 'manager'] },
  { href: '/admin/payments',    label: 'Payments',     icon: CreditCard,      roles: ['admin'] },
  { href: '/admin/reports',     label: 'Reports',      icon: BarChart2,       roles: ['admin', 'manager'] },
  { href: '/admin/content',     label: 'Website',      icon: Globe,           roles: ['admin'] },
  { href: '/admin/settings',    label: 'Settings',     icon: Settings,        roles: ['admin'] },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = allNavItems.filter((item) =>
    !user?.role || item.roles.includes(user.role)
  );

  async function handleLogout() {
    try { await authApi.logout(); } catch { /* ignore */ }
    clearAuth();
    toast.success('Logged out');
    router.push('/admin/login');
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-primary-800">
        <Link href="/" onClick={() => setSidebarOpen(false)}>
          <Image src="/logo.png" alt="RepairCart" width={120} height={40} className="h-8 w-auto brightness-0 invert" />
        </Link>
        <p className="text-xs text-primary-400 mt-2 font-medium uppercase tracking-wider">
          {user?.role === 'admin' ? 'Admin Panel' : 'Manager Panel'}
        </p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active ? 'bg-primary-700 text-white' : 'text-primary-200 hover:bg-primary-800 hover:text-white'
              }`}>
              <Icon className="h-4 w-4 shrink-0" />
              {label}
              {active && <ChevronRight className="h-3 w-3 ml-auto opacity-60" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-primary-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name ?? 'Admin'}</p>
            <p className="text-xs text-primary-300 capitalize">{user?.role ?? 'admin'}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-primary-300 hover:bg-primary-800 hover:text-white transition-all">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      <aside className="hidden lg:flex lg:flex-col w-64 bg-primary-900 shrink-0">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative z-50 flex flex-col w-64 bg-primary-900">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <p className="text-sm font-semibold text-neutral-900">
              {navItems.find((n) => pathname.startsWith(n.href))?.label ?? 'Admin'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-neutral-800">{user?.name}</p>
                <p className="text-xs text-neutral-400 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
