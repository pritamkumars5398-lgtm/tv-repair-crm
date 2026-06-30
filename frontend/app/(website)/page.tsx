import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Tv, Zap, Wrench, Monitor, Lightbulb, Sparkles,
  Speaker, Headphones, Shield, Clock, CheckCircle2,
  Star, ArrowRight, Phone, Mail, MapPin, ChevronRight,
} from 'lucide-react';
import { HeroSlideshow } from '@/components/website/HeroSlideshow';

export const metadata: Metadata = {
  title: 'RepairCart — TV Repair & Speaker Manufacturing in Mumbai',
  description: 'RepairCart — Expert LED & Smart TV repair, screen replacement, and premium speaker manufacturing in Mumbai. Certified technicians, genuine parts, 30-day warranty.',
};

const services = [
  { icon: Tv,         title: 'LED TV Repair',         desc: 'All brands. Any issue fixed.' },
  { icon: Zap,        title: 'Smart TV Repair',        desc: 'Android TV, webOS, Tizen.' },
  { icon: Wrench,     title: 'Motherboard Repair',     desc: 'Component-level PCB repair.' },
  { icon: Monitor,    title: 'Screen Replacement',     desc: 'Genuine panels, all sizes.' },
  { icon: Lightbulb,  title: 'Backlight Repair',       desc: 'LED strips & driver repair.' },
  { icon: Sparkles,   title: 'Polarizer Change',       desc: 'Screen clarity restoration.' },
  { icon: Speaker,    title: 'Speaker Manufacturing',  desc: 'Custom premium speakers.' },
  { icon: Headphones, title: 'Home Theater Setup',     desc: 'Full surround installation.' },
];

const stats = [
  { value: '5,000+', label: 'TVs Repaired' },
  { value: '4,200+', label: 'Happy Customers' },
  { value: '8+',     label: 'Years Experience' },
  { value: '50+',    label: 'Brands Supported' },
];

const features = [
  { icon: Shield,       title: 'Certified Technicians', desc: 'Factory-trained and certified for all major TV brands.' },
  { icon: CheckCircle2, title: 'Genuine Parts',          desc: 'OEM-grade components only. No cheap imitations.' },
  { icon: Clock,        title: 'Same-Day Service',       desc: 'Most repairs done the same day at our workshop.' },
  { icon: Star,         title: '30-Day Warranty',        desc: 'Every repair covered by our worry-free warranty.' },
];

const testimonials = [
  { name: 'Rahul Sharma', rating: 5, text: 'Samsung 55" had a black screen. Diagnosed and fixed in 6 hours. Excellent, professional service.', service: 'LED TV Repair' },
  { name: 'Priya Mehta',  rating: 5, text: 'Technician arrived on time, explained the issue clearly. TV has been working perfectly for months.', service: 'Smart TV Repair' },
  { name: 'Suresh Patel', rating: 5, text: 'Ordered custom speakers for my living room. Exceptional build quality and sound. Highly recommend!', service: 'Speaker Manufacturing' },
];

const brands = ['Samsung', 'LG', 'Sony', 'Panasonic', 'Mi', 'OnePlus', 'Vu', 'Hisense', 'TCL', 'Philips'];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'RepairCart',
  description: 'Expert LED & Smart TV repair, screen replacement, and premium speaker manufacturing in Mumbai.',
  url: 'https://www.repaircart.in',
  telephone: '+919876543210',
  email: 'info@repaircart.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Service Street, Electronics Hub',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400001',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 18.9, longitude: 72.8 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '19:00' },
  ],
  priceRange: '₹₹',
  image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '4200' },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      {/* ── Hero ── */}
      <section className="relative bg-neutral-900 text-white pt-32 pb-24 overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1600&q=80"
          alt="Technician repairing TV"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-5">
                RepairCart — We Fix It Right
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
                What needs<br />
                <span className="text-primary-400">repairing?</span>
              </h1>
              <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-xl">
                LED TVs, Smart TVs, speakers, home theaters — we fix everything with certified technicians and genuine parts.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-lg transition-all text-sm"
                >
                  Book a Repair — ₹250 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/track"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg border border-white/20 transition-all text-sm"
                >
                  Track Your Repair
                </Link>
              </div>
            </div>
            {/* Hero image card */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 h-80">
                <HeroSlideshow />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-xl flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-900">30-Day Warranty</p>
                  <p className="text-xs text-neutral-500">On every repair</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
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

      {/* ── Services Grid ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-1">Our Services</h2>
            <p className="text-neutral-500 text-sm">Select a service to book a repair visit.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {services.map((svc) => (
              <Link
                key={svc.title}
                href="/book"
                className="group flex flex-col gap-4 p-5 bg-neutral-50 hover:bg-primary-50 rounded-xl border border-neutral-200 hover:border-primary-300 transition-all duration-150"
              >
                <div className="h-11 w-11 rounded-lg bg-white border border-neutral-200 group-hover:border-primary-200 flex items-center justify-center shadow-sm transition-all">
                  <svc.icon className="h-5 w-5 text-primary-600" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 mb-0.5">{svc.title}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">{svc.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
              View all services <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden h-96 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900&q=85"
                alt="TV repair workshop"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center gap-3 bg-white/95 rounded-xl px-4 py-3 shadow-lg">
                  <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                    <Shield className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">Certified Workshop</p>
                    <p className="text-xs text-neutral-500">All major brand authorized</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Text */}
            <div>
              <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4 leading-tight">
                Repairs done right,<br />every single time.
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-8 text-sm">
                We have been fixing TVs and building speakers in Mumbai since 2016. Our certified technicians use only genuine parts and back every repair with a 30-day warranty.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((f) => (
                  <div key={f.title} className="p-4 bg-white rounded-xl border border-neutral-200">
                    <f.icon className="h-5 w-5 text-primary-600 mb-2" strokeWidth={1.8} />
                    <p className="text-sm font-semibold text-neutral-900 mb-1">{f.title}</p>
                    <p className="text-xs text-neutral-500 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                Learn about us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brands ── */}
      <section className="py-14 bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-8">
            All brands supported
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {brands.map((brand) => (
              <span
                key={brand}
                className="px-5 py-2 bg-white text-sm font-medium text-neutral-700 rounded-full border border-neutral-200 shadow-sm"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-neutral-50 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">How it works</h2>
            <p className="text-neutral-500 text-sm">Get your TV repaired in 4 simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Book Online',        desc: 'Fill a quick form and pay ₹250 service visit fee to confirm.',           img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=75' },
              { step: '02', title: 'Technician Visits',  desc: 'Certified technician arrives at your home at the scheduled time.',       img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=75' },
              { step: '03', title: 'Diagnosis & Quote',  desc: 'We identify the issue and share a repair estimate before starting.',     img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=75' },
              { step: '04', title: 'Repaired & Returned',desc: 'Your TV is fixed and returned with a 30-day warranty.',                  img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=75' },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                  <div className="relative h-36 bg-neutral-100">
                    <Image src={item.img} alt={item.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-neutral-900/40" />
                    <span className="absolute top-3 left-3 text-3xl font-bold text-white/30 leading-none">{item.step}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-neutral-900 mb-1">{item.title}</p>
                    <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                {i < 3 && <ChevronRight className="hidden lg:block absolute top-1/3 -right-4 -translate-y-1/2 h-5 w-5 text-neutral-300 z-10" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-1">What customers say</h2>
            <p className="text-neutral-500 text-sm">Trusted by thousands of households across Mumbai.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed mb-5">{t.text}</p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.service}</p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1600&q=80"
          alt="TV repair background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/80" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Ready to fix your TV?</h2>
            <p className="text-neutral-300 text-sm">Same-day service in most Mumbai areas. ₹250 visit fee.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/book" className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-lg text-sm transition-all">
              Book a Repair
            </Link>
            <Link href="/contact" className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg text-sm border border-white/20 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact Info ── */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: 'Our Workshop',    content: '123 Service Street, Electronics Hub,\nMumbai – 400001', href: undefined },
              { icon: Phone,  title: 'Call / WhatsApp', content: '+91 98765 43210',    href: 'tel:9876543210',         sub: 'Mon–Sat, 9am–7pm' },
              { icon: Mail,   title: 'Email Us',        content: 'info@tvrepair.in',   href: 'mailto:info@tvrepair.in', sub: 'Reply within 2 hours' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-neutral-600" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 mb-0.5">{item.title}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-primary-600 hover:text-primary-700 block">{item.content}</a>
                  ) : (
                    <p className="text-sm text-neutral-500 whitespace-pre-line">{item.content}</p>
                  )}
                  {item.sub && <p className="text-xs text-neutral-400 mt-0.5">{item.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
