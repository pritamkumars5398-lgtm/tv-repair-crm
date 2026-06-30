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

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-slate-950 text-white pt-32 pb-24 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/40 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p data-aos="fade-up" className="text-primary-400 text-sm font-bold uppercase tracking-[0.2em] mb-5">
                RepairCart — We Fix It Right
              </p>
              <h1 data-aos="fade-up" data-aos-delay="100" className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                What needs<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-300">repairing?</span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="200" className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl font-light">
                LED TVs, Smart TVs, speakers, home theaters — we fix everything with certified technicians and genuine parts.
              </p>
              <div data-aos="fade-up" data-aos-delay="300" className="flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-full shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                  Book a Repair — ₹250 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/track"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 text-sm"
                >
                  Track Your Repair
                </Link>
              </div>
            </div>
            {/* Hero image card */}
            <div className="hidden lg:block relative" data-aos="zoom-in" data-aos-delay="200">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/50 border border-white/10 h-[400px]">
                <HeroSlideshow />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
              </div>
              {/* Floating badge */}
              <div data-aos="fade-up" data-aos-delay="500" className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">30-Day Warranty</p>
                  <p className="text-xs text-slate-300">On every repair</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white py-12 relative z-10 -mt-8 mx-4 sm:mx-auto max-w-6xl rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100" data-aos="fade-up" data-aos-delay="400">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {stats.map((s, index) => (
            <div key={s.label} className="py-6 px-6 text-center group">
              <p className="text-3xl font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors duration-300">{s.value}</p>
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-primary-50/50 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Premium Repair Services</h2>
            <p className="text-neutral-500">Expert repairs with genuine parts, transparent pricing, and comprehensive warranty. Select a service to begin.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, index) => (
              <Link
                key={svc.title}
                href="/book"
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="group relative flex flex-col gap-4 p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-primary-600/5 hover:-translate-y-1 hover:border-primary-200 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-5 shadow-inner">
                    <svc.icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-neutral-900 mb-2">{svc.title}</p>
                    <p className="text-sm text-neutral-500 leading-relaxed">{svc.desc}</p>
                  </div>
                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center text-xs font-semibold text-primary-600 group-hover:text-primary-700">
                      Book Service <ArrowRight className="ml-1 h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="200">
            <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg transition-all text-sm shadow-md hover:shadow-lg">
              Explore All Services <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative rounded-[2rem] overflow-hidden h-[500px] shadow-2xl shadow-slate-200/50" data-aos="fade-right">
              <Image
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900&q=85"
                alt="TV repair workshop"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20">
                  <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                    <Shield className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-900">Certified Workshop</p>
                    <p className="text-sm text-slate-500">All major brand authorized</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Text */}
            <div>
              <p data-aos="fade-up" className="text-primary-600 text-sm font-bold uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Repairs done right,<br />every single time.
              </h2>
              <p data-aos="fade-up" data-aos-delay="200" className="text-slate-600 leading-relaxed mb-10 text-lg">
                We have been fixing TVs and building speakers in Mumbai since 2016. Our certified technicians use only genuine parts and back every repair with a 30-day warranty.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {features.map((f, i) => (
                  <div key={f.title} data-aos="fade-up" data-aos-delay={300 + (i * 50)} className="group p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300">
                    <div className="h-10 w-10 rounded-lg bg-slate-50 group-hover:bg-primary-50 flex items-center justify-center mb-4 transition-colors duration-300">
                      <f.icon className="h-5 w-5 text-primary-600" strokeWidth={2} />
                    </div>
                    <p className="text-base font-bold text-slate-900 mb-2">{f.title}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
              <div data-aos="fade-up" data-aos-delay="500">
                <Link href="/about" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-primary-300 hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-semibold rounded-full transition-all text-sm shadow-sm">
                  Learn more about us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
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
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-slate-500 text-lg">Get your TV repaired in 4 simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Book Online',        desc: 'Fill a quick form and pay ₹250 service visit fee to confirm.',           img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=75' },
              { step: '02', title: 'Technician Visits',  desc: 'Certified technician arrives at your home at the scheduled time.',       img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=75' },
              { step: '03', title: 'Diagnosis & Quote',  desc: 'We identify the issue and share a repair estimate before starting.',     img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=75' },
              { step: '04', title: 'Repaired & Returned',desc: 'Your TV is fixed and returned with a 30-day warranty.',                  img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=75' },
            ].map((item, i) => (
              <div key={item.step} className="relative group" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-5xl font-black text-white/90 leading-none drop-shadow-md">{item.step}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-lg font-bold text-slate-900 mb-2">{item.title}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                {i < 3 && <ChevronRight className="hidden lg:block absolute top-24 -right-6 -translate-y-1/2 h-8 w-8 text-primary-300/50 z-10" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">What customers say</h2>
            <p className="text-slate-500 text-lg">Trusted by thousands of households across Mumbai.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <div key={t.name} data-aos="fade-up" data-aos-delay={index * 100} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                  <Star className="h-5 w-5 text-primary-600 fill-primary-600" />
                </div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-base text-slate-700 leading-relaxed mb-8 font-medium">"{t.text}"</p>
                <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="text-xs text-primary-600 font-medium mt-1">{t.service}</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1600&q=80"
          alt="TV repair background"
          fill
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-14 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl" data-aos="zoom-in">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to fix your TV?</h2>
              <p className="text-slate-300 text-lg max-w-xl">Book a certified technician today. Same-day service in most Mumbai areas for just ₹250 visit fee.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
              <Link href="/book" className="flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-full transition-all shadow-lg shadow-primary-600/30 hover:-translate-y-1">
                Book a Repair
              </Link>
              <Link href="/contact" className="flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/20 transition-all backdrop-blur-md hover:-translate-y-1">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Info ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: 'Our Workshop',    content: '123 Service Street, Electronics Hub,\nMumbai – 400001', href: undefined },
              { icon: Phone,  title: 'Call / WhatsApp', content: '+91 98765 43210',    href: 'tel:9876543210',         sub: 'Mon–Sat, 9am–7pm' },
              { icon: Mail,   title: 'Email Us',        content: 'info@tvrepair.in',   href: 'mailto:info@tvrepair.in', sub: 'Reply within 2 hours' },
            ].map((item, index) => (
              <div key={item.title} data-aos="fade-up" data-aos-delay={index * 100} className="flex items-start gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary-200 transition-colors duration-300 shadow-sm hover:shadow-md">
                <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 text-primary-600">
                  <item.icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-base font-bold text-slate-900 mb-1">{item.title}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-slate-600 hover:text-primary-600 block transition-colors">{item.content}</a>
                  ) : (
                    <p className="text-sm text-slate-600 whitespace-pre-line">{item.content}</p>
                  )}
                  {item.sub && <p className="text-xs font-medium text-slate-400 mt-2">{item.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
