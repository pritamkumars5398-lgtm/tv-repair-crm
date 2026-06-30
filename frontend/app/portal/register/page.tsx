'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/stores/auth-store';

type Step = 'details' | 'otp';

export default function CustomerRegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [step, setStep] = useState<Step>('details');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [otp, setOtp] = useState('');

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.length < 2) { toast.error('Enter your full name'); return; }
    if (!/^[6-9]\d{9}$/.test(form.phone)) { toast.error('Enter a valid 10-digit mobile number'); return; }
    setLoading(true);
    try {
      await authApi.sendOtp(form.phone);
      toast.success('OTP sent to ' + form.phone);
      setStep('otp');
    } catch {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) { toast.error('Enter the 6-digit OTP'); return; }
    setLoading(true);
    try {
      const res = await authApi.register({ ...form, otp });
      setAuth(res.data.user, res.data.token);
      toast.success('Account created! Welcome, ' + res.data.user.name);
      router.push('/portal/dashboard');
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/"><Image src="/logo.png" alt="RepairCart" width={140} height={48} className="h-10 w-auto mx-auto" /></Link>
          <h1 className="mt-6 text-2xl font-bold text-neutral-900">Create Account</h1>
          <p className="mt-1 text-sm text-neutral-500">Track repairs and manage your service history</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-8">
          {step === 'details' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Rajesh Kumar"
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400 font-medium">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full pl-12 pr-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email <span className="text-neutral-400">(optional)</span></label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="rajesh@example.com"
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60 mt-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><UserPlus className="h-4 w-4" /> Send OTP</>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <p className="text-sm text-neutral-600 text-center">OTP sent to <strong>+91 {form.phone}</strong></p>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Enter OTP</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full text-center text-xl tracking-[0.5em] px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Account'}
              </button>
              <button type="button" onClick={() => setStep('details')} className="w-full text-sm text-neutral-500 hover:text-neutral-700">← Go back</button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <p className="text-sm text-neutral-500">
              Already have an account?{' '}
              <Link href="/portal/login" className="text-primary-600 font-medium hover:underline">Login</Link>
            </p>
          </div>
        </div>
        <p className="text-center mt-4 text-xs text-neutral-400">
          <Link href="/" className="hover:text-neutral-600">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}
