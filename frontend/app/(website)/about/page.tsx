import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Award, Users, CheckCircle2, Wrench, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: '8+ years of expertise in TV repair and speaker manufacturing. Certified technicians, genuine parts, 30-day warranty.',
};

const stats = [
  { value: '2016',   label: 'Founded' },
  { value: '8+',     label: 'Years of service' },
  { value: '5,000+', label: 'Devices repaired' },
  { value: '15+',    label: 'Expert technicians' },
];

const capabilities = [
  'Component-level PCB repair and rework',
  'OLED, QLED, LED, and Smart TV diagnostics',
  'Custom speaker cabinet design and manufacturing',
  'Home theater audio system calibration',
  'Pick-up and drop-off service across the city',
  'Same-day repair for most common TV issues',
  'OEM and genuine spare parts sourcing',
  '30-day repair warranty on all services',
];

const brands = ['Samsung', 'LG', 'Sony', 'Panasonic', 'Mi', 'OnePlus', 'Vu', 'Hisense'];

const team = [
  { name: 'Amit Kumar',   role: 'Lead Technician',    exp: '10 yrs' },
  { name: 'Ravi Sharma',  role: 'Speaker Engineer',   exp: '7 yrs' },
  { name: 'Sunil Verma',  role: 'Field Technician',   exp: '5 yrs' },
  { name: 'Deepak Singh', role: 'Senior Technician',  exp: '8 yrs' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-neutral-900 text-white pt-32 pb-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1600&q=80"
          alt="TV repair workshop"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-4">About Us</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            RepairCart —<br />We Fix It Right
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl">
            Since 2016, we have been restoring TVs and crafting premium speakers with expertise, care, and commitment to quality.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-100">
            {stats.map((s) => (
              <div key={s.label} className="py-8 px-6 text-center">
                <p className="text-3xl font-bold text-neutral-900 mb-1">{s.value}</p>
                <p className="text-sm text-neutral-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Built on trust, driven by quality</h2>
              <div className="space-y-4 text-neutral-600 text-sm leading-relaxed">
                <p>
                  We started as a small TV repair workshop in Mumbai in 2016 with a simple belief: every customer deserves honest, quality service at a fair price. That philosophy has driven our growth from a 2-person team to a full-fledged service center with 15+ certified technicians.
                </p>
                <p>
                  Over the years, we expanded into speaker manufacturing — building custom, high-performance audio equipment for homes, offices, and events. Today we are one of Mumbai's most recommended TV repair and audio engineering services.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { icon: Award,        label: 'Factory Certified' },
                  { icon: Shield,       label: 'Genuine OEM Parts' },
                  { icon: CheckCircle2, label: '30-Day Warranty' },
                  { icon: Users,        label: 'Customer First' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <item.icon className="h-5 w-5 text-primary-600 shrink-0" strokeWidth={1.8} />
                    <p className="text-sm font-medium text-neutral-800">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="space-y-4">
              {/* Workshop photo */}
              <div className="relative rounded-xl overflow-hidden h-48 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&q=85"
                  alt="Technician at work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-neutral-900 text-white rounded-xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Vision</p>
                <p className="text-sm leading-relaxed text-neutral-300">
                  To be the most trusted home electronics service partner in India — where every customer gets fast, reliable, and affordable repair without worry.
                </p>
              </div>
              <div className="p-6 bg-primary-600 text-white rounded-xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-200 mb-3">Mission</p>
                <p className="text-sm leading-relaxed text-primary-100">
                  To deliver world-class TV repair and audio manufacturing using certified technicians, genuine parts, and transparent pricing — backed by a no-questions warranty.
                </p>
              </div>
              <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl">
                <Wrench className="h-5 w-5 text-primary-600 mb-2" strokeWidth={1.8} />
                <p className="text-sm font-semibold text-neutral-900 mb-2">All brands supported</p>
                <div className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <span key={b} className="text-xs font-medium text-neutral-600 bg-white border border-neutral-200 px-2.5 py-1 rounded-full">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Photo Strip */}
      <section className="py-0 overflow-hidden">
        <div className="grid grid-cols-3 h-52">
          {[
            'https://images.unsplash.com/photo-1593359863503-a54b98ade4d8?w=600&q=75',
            'https://images.unsplash.com/photo-1574717024453-354056adc766?w=600&q=75',
            'https://images.unsplash.com/photo-1545454675-3479531426e2?w=600&q=75',
          ].map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image src={src} alt="Workshop" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities + Team */}
      <section className="py-16 bg-neutral-50 border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-6">What we can do</h2>
              <ul className="space-y-3">
                {capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-neutral-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Our team</h2>
              <div className="grid grid-cols-2 gap-3">
                {team.map((m) => (
                  <div key={m.name} className="p-4 bg-white rounded-xl border border-neutral-200 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                      <Users className="h-5 w-5 text-primary-600" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{m.name}</p>
                      <p className="text-xs text-neutral-500">{m.role}</p>
                      <p className="text-xs text-primary-600 mt-0.5">{m.exp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Ready to get your TV fixed?</h2>
            <p className="text-neutral-400 text-sm">Certified technician at your doorstep for just ₹250.</p>
          </div>
          <Link href="/book" className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 shrink-0">
            Book a Service <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
