'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, Ticket, UserCheck, Package,
  FileText, CreditCard, BarChart2, Settings, Globe,
  LogOut, Menu, Bell, ChevronRight, Wrench, ChevronDown, User,
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <div className="flex flex-col h-full bg-[#020617] relative overflow-hidden">
      {/* Premium sidebar background glow */}
      <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-primary-600/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-cyan-600/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="p-6 border-b border-white/10 relative z-10">
        <Link href="/" onClick={() => setSidebarOpen(false)}>
          <Image src="/logo.png" alt="RepairCart" width={140} height={45} className="h-9 w-auto brightness-0 invert" />
        </Link>
        <div className="mt-4 flex items-center gap-2">
          <span className="flex w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
            {user?.role === 'admin' ? 'System Admin' : 'Branch Manager'}
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto relative z-10 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
        <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Main Menu</p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                active 
                ? 'bg-gradient-to-r from-primary-600/20 to-cyan-600/20 border border-cyan-500/30 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                : 'text-slate-400 border border-transparent hover:bg-white/5 hover:text-white'
              }`}>
              <Icon className={`h-4 w-4 shrink-0 transition-colors ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
              {label}
              {active && <ChevronRight className="h-4 w-4 ml-auto text-cyan-500" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 relative z-10 bg-white/[0.02] mt-auto">
        <button onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transform hover:-translate-y-0.5">
          <LogOut className="h-5 w-5" /> SIGN OUT
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <aside className="hidden lg:flex lg:flex-col w-72 shrink-0 border-r border-slate-200/50 shadow-2xl z-20">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative z-50 flex flex-col w-72 shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {navItems.find((n) => pathname.startsWith(n.href))?.label ?? 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-5">
            {/* Search (Mock) */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" placeholder="Quick search..." className="bg-transparent border-none focus:outline-none text-sm ml-2 text-slate-700 placeholder:text-slate-400 w-48" />
            </div>

            <button className="relative p-2.5 rounded-full text-slate-500 hover:bg-slate-100 hover:text-primary-600 transition-colors border border-transparent hover:border-slate-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <div className="relative">
              <div 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-200"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:shadow-lg transition-all">
                  {user?.name?.[0]?.toUpperCase() ?? 'A'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-bold text-slate-700 leading-tight group-hover:text-primary-600 transition-colors">{user?.name ?? 'Admin'}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{user?.role ?? 'Role'}</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-400 hidden sm:block transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-sm font-bold text-slate-800">{user?.name ?? 'Admin User'}</p>
                      <p className="text-xs text-slate-500 font-medium truncate">{user?.phone ?? '+91 9999999999'}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link href="/admin/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                        <User className="h-4 w-4" /> My Profile
                      </Link>
                      <Link href="/admin/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                        <Settings className="h-4 w-4" /> Account Settings
                      </Link>
                    </div>
                    <div className="p-2 border-t border-slate-100">
                      <button onClick={() => { setDropdownOpen(false); handleLogout(); }} className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-bold text-rose-500 bg-rose-50 hover:bg-rose-500 hover:text-white transition-colors">
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-slate-50/50">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
