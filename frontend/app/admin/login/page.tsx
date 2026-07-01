'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Phone, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/stores/auth-store';
import type { UserRole } from '@/types';

type Step = 'phone' | 'otp';

export default function AdminLoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone) && phone !== '1234567890') { 
      toast.error('Enter a valid 10-digit mobile number'); 
      return; 
    }
    setLoading(true);
    
    // Simulate slight delay for realism
    setTimeout(() => {
      setAuth({
        id: 'admin-dev',
        name: 'Admin User',
        email: 'admin@longwell.com',
        phone: phone,
        role: role
      }, 'mock-admin-token');
      
      toast.success(`Welcome back, Admin!`);
      router.push('/admin/dashboard');
      setLoading(false);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Premium Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/">
            <Image src="/logo.png" alt="RepairCart" width={140} height={48} className="h-10 w-auto mx-auto brightness-0 invert" />
          </Link>
          <div className="mt-8 inline-flex items-center justify-center w-16 h-16 bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.2)] backdrop-blur-md">
            <Shield className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="mt-5 text-3xl font-extrabold text-white tracking-tight">Admin Portal</h1>
          <p className="mt-2 text-sm text-slate-400 font-medium tracking-wide">Authorised personnel only</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[24px] shadow-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors appearance-none"
              >
                <option value="admin" className="text-slate-900">System Admin</option>
                <option value="manager" className="text-slate-900">Branch Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Mobile Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">+91</span>
                <input
                  type="tel" inputMode="numeric" maxLength={10}
                  value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  className="w-full pl-14 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors placeholder:text-slate-500 font-medium"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-cyan-600 hover:from-primary-500 hover:to-cyan-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-60">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><ArrowRight className="h-4 w-4" /> Login to Dashboard</>}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center mt-8 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-300 transition-colors">← Return to Public Site</Link>
        </p>
      </div>
    </div>
  );
}
