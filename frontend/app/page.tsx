import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <section className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-700">TV Repair CRM</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Repair booking, ticket tracking, and operations for TV & speaker service teams.</h1>
          <p className="max-w-3xl text-lg text-slate-600">A mobile-first dashboard and customer portal experience built with Next.js, Tailwind CSS, React Query, Zustand, and TypeScript.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/portal" className="rounded-xl bg-brand-500 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-700">
              Customer Portal
            </Link>
            <Link href="/technician" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Technician Dashboard
            </Link>
            <Link href="/manager" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Manager / Admin Panel
            </Link>
            <Link href="/admin" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Admin Dashboard
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
