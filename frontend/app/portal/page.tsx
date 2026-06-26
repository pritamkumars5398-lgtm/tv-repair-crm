import Link from 'next/link';

export default function CustomerPortalPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold">Customer Portal</h1>
        <p className="mt-4 text-slate-600">Access service tickets, bookings, and repair tracking for your TV and speaker orders.</p>
        <div className="mt-8 space-y-4 text-sm text-slate-700">
          <p>• Track repair status in real time</p>
          <p>• View invoices and service history</p>
          <p>• Manage customer appointments and product details</p>
        </div>
        <Link href="/" className="mt-8 inline-flex rounded-xl bg-brand-500 px-5 py-3 text-white transition hover:bg-brand-700">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
