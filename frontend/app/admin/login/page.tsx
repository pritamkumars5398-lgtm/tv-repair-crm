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

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) { toast.error('Enter a valid 10-digit mobile number'); return; }
    setLoading(true);
    try {
      await authApi.sendOtp(phone);
      toast.success('OTP sent to ' + phone);
      setStep('otp');
    } catch { toast.error('Failed to send OTP.'); }
    finally { setLoading(false); }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) { toast.error('Enter the 6-digit OTP'); return; }
    setLoading(true);
    try {
      const res = await authApi.verifyOtp(phone, otp, role);
      setAuth(res.data.user, res.data.token);
      toast.success('Welcome, ' + res.data.user.name);
      router.push('/admin/dashboard');
    } catch { toast.error('Invalid OTP or insufficient permissions.'); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-primary-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <Image src="/logo.png" alt="RepairCart" width={140} height={48} className="h-10 w-auto mx-auto brightness-0 invert" />
          </Link>
          <div className="mt-6 inline-flex items-center justify-center w-14 h-14 bg-primary-700 rounded-2xl">
            <Shield className="h-7 w-7 text-primary-200" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">Admin / Manager Login</h1>
          <p className="mt-1 text-sm text-primary-300">Authorised personnel only</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400 font-medium">+91</span>
                  <input
                    type="tel" inputMode="numeric" maxLength={10}
                    value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full pl-12 pr-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Phone className="h-4 w-4" /> Send OTP</>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <p className="text-sm text-neutral-600 text-center">OTP sent to <strong>+91 {phone}</strong></p>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Enter OTP</label>
                <input
                  type="text" inputMode="numeric" maxLength={6}
                  value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full text-center text-xl tracking-[0.5em] px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ArrowRight className="h-4 w-4" /> Verify & Login</>}
              </button>
              <button type="button" onClick={() => setStep('phone')} className="w-full text-sm text-neutral-500 hover:text-neutral-700">← Change number</button>
            </form>
          )}
        </div>
        <p className="text-center mt-4 text-xs text-primary-400">
          <Link href="/" className="hover:text-primary-200">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}
