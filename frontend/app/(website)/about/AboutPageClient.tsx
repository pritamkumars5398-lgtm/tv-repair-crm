"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Shield, Award, Users, CheckCircle2, Wrench, ArrowRight } from 'lucide-react';

const stats = [
  { value: '2016', label: 'Founded' },
  { value: '8+', label: 'Years of service' },
  { value: '5,000+', label: 'Devices repaired' },
  { value: '15+', label: 'Expert technicians' },
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
  { name: 'Amit Kumar', role: 'Lead Technician', exp: '10 yrs' },
  { name: 'Ravi Sharma', role: 'Speaker Engineer', exp: '7 yrs' },
  { name: 'Sunil Verma', role: 'Field Technician', exp: '5 yrs' },
  { name: 'Deepak Singh', role: 'Senior Technician', exp: '8 yrs' },
];

export default function AboutPageClient() {
  useEffect(() => {
    AOS.init({ once: true, duration: 900, easing: 'ease-out-cubic', offset: 120 });
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"
            alt="TV repair workshop"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/80 to-primary-950/50" />
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] items-center">
            <div className="max-w-2xl">
              <p data-aos="fade-right" className="text-primary-400 text-sm font-bold uppercase tracking-[0.2em] mb-4">About Us</p>
              <h1 data-aos="fade-up" data-aos-delay="100" className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                RepairCart — your trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-300">TV repair</span> and speaker service.
              </h1>
              <p data-aos="fade-up" data-aos-delay="200" className="mt-8 text-lg sm:text-xl leading-relaxed text-slate-300 max-w-xl font-light">
                Since 2016, we have restored thousands of screens and built premium audio solutions with honest pricing, certified technicians, and a 30-day warranty.
              </p>
              <div data-aos="fade-up" data-aos-delay="300" className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center rounded-full bg-primary-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-500 hover:-translate-y-1"
                >
                  Book a repair
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 text-sm font-bold text-white transition-all hover:border-white/40 hover:bg-white/10 hover:-translate-y-1">
                  Contact us
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl" data-aos="fade-left" data-aos-delay="400">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-400 mb-4">What makes us different</p>
                <div className="space-y-4 text-slate-200">
                  <p className="leading-relaxed font-medium">Fast service, transparent pricing, and expert repair for all major TV brands.</p>
                  <p className="leading-relaxed font-medium">Custom speaker solutions with precision tuning and reliable support.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl bg-white/5 p-6 text-slate-100 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors duration-300"
                    data-aos="zoom-in"
                    data-aos-delay={index * 100 + 500}
                  >
                    <p className="text-4xl font-bold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm text-slate-400 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute -left-40 top-40 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div data-aos="fade-right">
              <div className="inline-flex items-center gap-3 rounded-full bg-primary-50 border border-primary-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-700 shadow-sm">
                Trusted since 2016
              </div>
              <h2 className="mt-8 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl leading-tight">
                Built on trust, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-orange-400">driven by quality.</span>
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600">
                We began as a small TV repair workshop in Mumbai and grew through honest service, genuine parts, and customer-first care. Today, RepairCart is recognized for fast diagnostics, expert repairs, and premium speaker craftsmanship.
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                Our focus remains the same: deliver reliable repairs with clear pricing, quick turnarounds, and a warranty you can trust.
              </p>

              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                {[
                  { icon: Award, label: 'Certified Quality' },
                  { icon: Shield, label: 'Genuine Parts' },
                  { icon: CheckCircle2, label: '30-Day Warranty' },
                  { icon: Users, label: 'Customer-first care' },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-5 hover:shadow-md hover:border-primary-100 transition-all duration-300"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                      <item.icon className="h-6 w-6 text-primary-600" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-900">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50" data-aos="fade-left">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=85"
                    alt="Technician at work"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="rounded-[2.5rem] bg-slate-950 p-10 text-white shadow-2xl" data-aos="fade-up">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Vision</p>
                <p className="text-xl leading-relaxed font-medium">
                  To be the most trusted home electronics service partner in India — where every customer receives fast, reliable, and affordable repair without worry.
                </p>
              </div>
              <div className="rounded-[2.5rem] bg-gradient-to-br from-primary-600 to-primary-700 p-10 text-white shadow-2xl shadow-primary-600/30" data-aos="fade-up" data-aos-delay={100}>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-200 mb-4">Mission</p>
                <p className="text-xl leading-relaxed text-primary-50 font-medium">
                  Deliver world-class TV repair and audio manufacturing using certified technicians, genuine parts, and transparent pricing — backed by a no-questions warranty.
                </p>
              </div>
              <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/50" data-aos="fade-up" data-aos-delay={200}>
                <div className="flex items-center gap-4 text-slate-900 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-primary-600" strokeWidth={2} />
                  </div>
                  <p className="text-lg font-bold">All brand support</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <span key={brand} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-1" data-aos="fade-up">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=75',
              'https://images.unsplash.com/photo-1512218168354-509d5d1dcb8f?auto=format&fit=crop&w=900&q=75',
              'https://images.unsplash.com/photo-1508896694512-9b57a5a6f2d3?auto=format&fit=crop&w=900&q=75',
            ].map((src, index) => (
              <div key={index} className="relative aspect-video overflow-hidden rounded-3xl bg-slate-900" data-aos="fade-up" data-aos-delay={index * 80}>
                <Image src={src} alt="Workshop" fill className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-xl shadow-slate-200/50" data-aos="fade-right">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">What we can do</h2>
              <ul className="space-y-5">
                {capabilities.map((capability, index) => (
                  <li key={capability} className="flex gap-4 items-start" data-aos="fade-up" data-aos-delay={index * 70}>
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span className="text-base leading-relaxed text-slate-700 font-medium">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-xl shadow-slate-200/50" data-aos="fade-left">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Our team</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {team.map((member, index) => (
                  <div key={member.name} className="rounded-3xl bg-slate-50 border border-slate-100 p-6 hover:shadow-md hover:border-primary-100 transition-all duration-300" data-aos="zoom-in" data-aos-delay={index * 100}>
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm text-primary-600">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-900">{member.name}</p>
                        <p className="text-sm font-medium text-slate-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="mt-5 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                      {member.exp} experience
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary-900/30 via-slate-950 to-slate-950" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row gap-10 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl p-10 sm:p-14 lg:items-center lg:justify-between shadow-2xl" data-aos="zoom-in">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-400">Book your service</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-5xl leading-tight">Ready to get your TV fixed today?</h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Certified technician at your doorstep for just ₹250, with quick pick-up and reliable repair backed by warranty.
              </p>
            </div>
            <Link
              href="/book"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-500 hover:-translate-y-1"
            >
              Book a Service <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
