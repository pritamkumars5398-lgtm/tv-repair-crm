'use client';

import { useState } from 'react';
import { Save, Loader2, Bell, CreditCard, Globe, Shield, Plug } from 'lucide-react';
import { toast } from 'sonner';

const TABS = [
  { id: 'general',       label: 'General',       icon: Globe },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'payment',       label: 'Payment',        icon: CreditCard },
  { id: 'rbac',          label: 'Roles & Access', icon: Shield },
  { id: 'integrations',  label: 'Integrations',  icon: Plug },
] as const;

type TabId = typeof TABS[number]['id'];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [saving, setSaving] = useState(false);

  const [general, setGeneral] = useState({
    businessName: 'RepairCart',
    phone: '+91 98765 43210',
    email: 'info@repaircart.in',
    address: '123 Service Street, Electronics Hub, Mumbai – 400001',
    workingHours: 'Mon–Sat: 9:00 AM – 7:00 PM',
    whatsappNumber: '919876543210',
  });

  const [notifications, setNotifications] = useState({
    smsEnabled: true,
    emailEnabled: true,
    whatsappEnabled: true,
    notifyOnNewLead: true,
    notifyOnStatusChange: true,
    notifyOnPayment: true,
  });

  const [payment, setPayment] = useState({
    razorpayKeyId: '',
    razorpaySecret: '',
    visitFee: '250',
    taxPercent: '18',
  });

  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success('Settings saved');
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Settings</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Configure your business, notifications, and integrations.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab list */}
        <nav className="flex lg:flex-col gap-1 lg:w-48 shrink-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                activeTab === id
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        <div className="flex-1 bg-white rounded-xl border border-neutral-200 shadow-card p-6 space-y-5">

          {/* General */}
          {activeTab === 'general' && (
            <>
              <h2 className="font-semibold text-neutral-800">Business Information</h2>
              {([
                { key: 'businessName', label: 'Business Name' },
                { key: 'phone',        label: 'Phone Number' },
                { key: 'email',        label: 'Email Address' },
                { key: 'whatsappNumber', label: 'WhatsApp Number (with country code)' },
                { key: 'workingHours', label: 'Working Hours' },
              ] as { key: keyof typeof general; label: string }[]).map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">{label}</label>
                  <input
                    type="text"
                    value={general[key]}
                    onChange={(e) => setGeneral((g) => ({ ...g, [key]: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Address</label>
                <textarea
                  rows={2}
                  value={general.address}
                  onChange={(e) => setGeneral((g) => ({ ...g, address: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
            </>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <>
              <h2 className="font-semibold text-neutral-800">Notification Channels</h2>
              <div className="space-y-3">
                {([
                  { key: 'smsEnabled',             label: 'SMS Notifications',               desc: 'Send OTP and status updates via SMS' },
                  { key: 'emailEnabled',            label: 'Email Notifications',             desc: 'Send invoices and confirmations by email' },
                  { key: 'whatsappEnabled',         label: 'WhatsApp Notifications',          desc: 'Send booking and status updates via WhatsApp' },
                  { key: 'notifyOnNewLead',         label: 'Alert on new lead',               desc: 'Notify admin when a new lead is created' },
                  { key: 'notifyOnStatusChange',    label: 'Alert on ticket status change',   desc: 'Notify customer when repair status updates' },
                  { key: 'notifyOnPayment',         label: 'Alert on payment received',       desc: 'Notify admin when payment is captured' },
                ] as { key: keyof typeof notifications; label: string; desc: string }[]).map(({ key, label, desc }) => (
                  <label key={key} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={(e) => setNotifications((n) => ({ ...n, [key]: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-neutral-800 group-hover:text-primary-700">{label}</p>
                      <p className="text-xs text-neutral-400">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Payment */}
          {activeTab === 'payment' && (
            <>
              <h2 className="font-semibold text-neutral-800">Payment Configuration</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Razorpay Key ID</label>
                    <input type="text" value={payment.razorpayKeyId}
                      onChange={(e) => setPayment((p) => ({ ...p, razorpayKeyId: e.target.value }))}
                      placeholder="rzp_live_..."
                      className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Razorpay Secret</label>
                    <input type="password" value={payment.razorpaySecret}
                      onChange={(e) => setPayment((p) => ({ ...p, razorpaySecret: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Service Visit Fee (₹)</label>
                    <input type="number" value={payment.visitFee}
                      onChange={(e) => setPayment((p) => ({ ...p, visitFee: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">GST / Tax (%)</label>
                    <input type="number" value={payment.taxPercent}
                      onChange={(e) => setPayment((p) => ({ ...p, taxPercent: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* RBAC */}
          {activeTab === 'rbac' && (
            <>
              <h2 className="font-semibold text-neutral-800">Roles & Permissions</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-100 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      <th className="pb-3 text-left">Permission</th>
                      <th className="pb-3 text-center">Admin</th>
                      <th className="pb-3 text-center">Manager</th>
                      <th className="pb-3 text-center">Technician</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {[
                      { perm: 'View Dashboard',      admin: true, manager: true,  tech: false },
                      { perm: 'Manage Leads',        admin: true, manager: true,  tech: false },
                      { perm: 'Manage Tickets',      admin: true, manager: true,  tech: true },
                      { perm: 'View Inventory',      admin: true, manager: false, tech: false },
                      { perm: 'Manage Payments',     admin: true, manager: false, tech: false },
                      { perm: 'View Reports',        admin: true, manager: true,  tech: false },
                      { perm: 'Edit Settings',       admin: true, manager: false, tech: false },
                      { perm: 'Manage Technicians',  admin: true, manager: false, tech: false },
                    ].map(({ perm, admin, manager, tech }) => (
                      <tr key={perm}>
                        <td className="py-2.5 text-neutral-700 font-medium">{perm}</td>
                        {[admin, manager, tech].map((has, i) => (
                          <td key={i} className="py-2.5 text-center">
                            <span className={`inline-block h-5 w-5 rounded-full ${has ? 'bg-green-100 text-green-600' : 'bg-neutral-100 text-neutral-300'} flex items-center justify-center mx-auto text-xs`}>
                              {has ? '✓' : '—'}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-neutral-400">Role permissions are enforced on the backend. This is a reference view.</p>
            </>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <>
              <h2 className="font-semibold text-neutral-800">Integrations</h2>
              <div className="space-y-4">
                {[
                  { name: 'Razorpay', desc: 'Payment gateway for bookings and invoices', status: 'Connected', color: 'bg-green-100 text-green-700' },
                  { name: 'WhatsApp Business API', desc: 'Automated notifications and chatbot', status: 'Not configured', color: 'bg-yellow-100 text-yellow-700' },
                  { name: 'Google Maps', desc: 'Address autocomplete and service area map', status: 'Not configured', color: 'bg-yellow-100 text-yellow-700' },
                  { name: 'Sentry', desc: 'Error monitoring and performance tracking', status: 'Not configured', color: 'bg-neutral-100 text-neutral-500' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                    <div>
                      <p className="font-medium text-neutral-800 text-sm">{item.name}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{item.desc}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Save button */}
          {activeTab !== 'rbac' && activeTab !== 'integrations' && (
            <div className="pt-2 border-t border-neutral-100">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
