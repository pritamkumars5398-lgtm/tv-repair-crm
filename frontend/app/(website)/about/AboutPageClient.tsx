"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Shield, Award, Users, CheckCircle2, Wrench, ArrowRight } from 'lucide-react';
import { CompanyProfile } from '@/components/website/CompanyProfile';

const capabilities = [
  'Display Repair up to 85Inch LED TV',
  'Polarizer replacement facility',
  'Mobile Phone Displays OGS (Folder) repair',
  'Component-level PCB repair up to L4 level',
  'Custom speaker cabinet design and manufacturing',
  'DOA Management and Reverse Logistics',
  'OEM and genuine spare parts sourcing from China',
  'Equal to New (ETN) product refurbishment',
];

const clientele = [
  'INTEX', 'Aiwa', 'Sansui', 'Bajaj Allianz', 'ARG', 'Oscar', 'Zebronics', 'Zopper',
  'Modish', 'Veego', 'Foxsky', 'Amazon', 'Melbon', 'Croma', 'Flipkart', 'Murphy',
  'F&D', 'Reliance Digital', 'Impex', 'TMB'
];
const journey = [
  { year: '1984', title: 'Audio Cassettes' },
  { year: '1987', title: 'Push button phone' },
  { year: '1992', title: 'Walkman & Audio cassette player' },
  { year: '1995', title: 'Video games' },
  { year: '2002', title: 'Intercom' },
  { year: '2004', title: 'Multimedia home theater system' },
  { year: '2008', title: 'LED Bulb' },
  { year: '2014', title: 'Mobile phone' },
  { year: '2018', title: 'LED TV, PCB of AC, Washing machine and other house hold electronics' },
];

const infraFeatures = [
  'We operate in area of 20000sq feet state of art repairing center with latest Testing, Store, Bonding, Polarization machine, clean room and inspection and quality check center.',
  'Esd flooring with esd protecting area.',
  'Class 100K clean room for panel work.',
  'Temprature maintain reliability room.',
  '4000 sq. ft. clean room area.',
  '6000 sq. ft. area for store.',
  '6000 sq. ft. area for production (Speaker, Home theater, Multi line intercom system...)',
  '40ft container can park have big parking space.',
  'Lift facility available for material movement.'
];

const whyUs = [
  'LONGWELL ELECTRONICS provides remarkable quality in products and services at best price. And our wide experience distinguishes us from others.',
  'We have a team of well qualified and experienced service engineers.',
  'Along with repair and manufacturing, Longwell Electronics is Expertise in import and export and marketing assistance for their client.',
  'Longwell Electronics has experts to assist their clients how to reduce after sales cost.',
  'We have office in China also (SHENZHEN), so get Original Spare parts At BEST PRICE.'
];

const strengthsText = 'We have a close relationship with Chinese players from same field who keep us updated with the trends and technology. As we have office in china also so we import and get almost all spare parts from their. This help us to increase our yield percentage.';
const strengths = [
  'Display Repair upto 85Inch LED TV.',
  'Polarizer replacement facility.',
  'Yield up to 85% for field failure units and up to 90% for line rejection.',
  'Development Source for LED TV Strip.',
  'Motherboard repair up to L4 level.',
  'Own CRM for device tracking and repaired Product life cycle management.',
  'Reverse Logistics Management.'
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
              <p data-aos="fade-right" className="text-primary-400 text-sm font-bold uppercase tracking-[0.2em] mb-4"><span className='text-white'>About Us</span></p>
              <h1 data-aos="fade-up" data-aos-delay="100" className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                Longwell Electronics — <span className="text-white bg-clip-text bg-gradient-to-r from-primary-400 to-orange-300">world class</span> repair environment.
              </h1>
              <p data-aos="fade-up" data-aos-delay="200" className="mt-8 text-lg sm:text-xl leading-relaxed text-slate-300 max-w-xl font-light">
                Since 1984, we have provided remarkable quality in products and services at the best price. Our wide experience and advanced infrastructure distinguishes us.
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
                Established 1984
              </div>
              <h2 className="mt-8 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl leading-tight">
                A legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-orange-400">innovation & quality.</span>
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600">
                Starting with audio cassettes in 1984, we evolved into a comprehensive electronics manufacturing and repair powerhouse. Today, we handle advanced LED TV panels, mobile displays, and complex PCBs.
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                With a close relationship with Chinese players and an office in Shenzhen, we ensure the availability of original spare parts at the best prices, resulting in a yield percentage of up to 90%.
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
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Our Vision</p>
                <p className="text-xl leading-relaxed font-medium">
                  is to be the number one company in terms of <span className="text-primary-400 font-bold">quality service</span> where we cater all electronics products.
                </p>
              </div>
              <div className="rounded-[2.5rem] bg-gradient-to-br from-primary-600 to-primary-700 p-10 text-white shadow-2xl shadow-primary-600/30" data-aos="fade-up" data-aos-delay={100}>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-200 mb-4">Mission</p>
                <p className="text-xl leading-relaxed text-primary-50 font-medium">
                  is to provide the world class repairing solution covering almost every brand.
                </p>
              </div>
              <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/50" data-aos="fade-up" data-aos-delay={200}>
                <div className="flex items-center gap-4 text-slate-900 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary-600" strokeWidth={2} />
                  </div>
                  <p className="text-lg font-bold">Our clientele</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {clientele.map((brand) => (
                    <span key={brand} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:border-primary-200 hover:text-primary-700 transition-colors shadow-sm cursor-default">
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

      <CompanyProfile />

      <section className="bg-slate-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary-900/30 via-slate-950 to-slate-950" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row gap-10 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl p-10 sm:p-14 lg:items-center lg:justify-between shadow-2xl" data-aos="zoom-in">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-400">Partner with Us</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-5xl leading-tight">Need a reliable service partner?</h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                From DOA management and OEM repairs to comprehensive recycling solutions, we provide scalable end-to-end services.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-500 hover:-translate-y-1"
            >
              Contact Us Now <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
