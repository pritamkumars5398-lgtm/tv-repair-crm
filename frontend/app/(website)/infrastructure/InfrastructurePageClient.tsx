"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Building2, Wind, ShieldCheck, Box, Settings, ArrowRight } from 'lucide-react';

const facilities = [
  { icon: Building2, title: '20,000 Sq. Ft. Area', desc: 'Sprawling facility designed for high-volume manufacturing and repair.' },
  { icon: Wind, title: 'Class 100K Clean Room', desc: 'Air showered and specialized environments for precise panel bonding.' },
  { icon: Settings, title: 'Automated SOPs', desc: 'Fully automated standard operating procedures ensuring consistent high yield.' },
  { icon: ShieldCheck, title: 'OQA Area', desc: 'Dedicated Outgoing Quality Assurance zone for 100% inspection before dispatch.' },
  { icon: Box, title: 'Advanced Packaging', desc: 'Specialized packaging machines with shrink wrap and wooden boxes for safe logistics.' },
];

const images = [
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80',
  'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=900&q=80',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&q=80',
  'https://images.unsplash.com/photo-1581092335878-2d9fd86aecf3?w=900&q=80',
];

export default function InfrastructurePageClient() {
  useEffect(() => {
    AOS.init({ once: true, duration: 900, easing: 'ease-out-cubic', offset: 120 });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
            alt="Infrastructure facility"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/80 to-primary-950/50" />

        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 text-center sm:text-left">
          <p data-aos="fade-right" className="text-primary-400 text-sm font-bold uppercase tracking-[0.2em] mb-4"><span className='text-white'>World Class Facility</span></p>
          <h1 data-aos="fade-up" data-aos-delay="100" className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            State-of-the-art <span className="text-white bg-clip-text bg-gradient-to-r from-primary-400 to-orange-300">Infrastructure.</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className="mt-8 text-lg sm:text-xl leading-relaxed text-slate-300 max-w-xl mx-auto sm:mx-0 font-light">
            Explore our 20,000 sq. ft. workspace, equipped with Class 1000 and 10000 clean rooms, bonding machines, and a dedicated quality assurance area.
          </p>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Facility Highlights</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Our infrastructure is engineered for maximum yield and quality control. From initial soaking to final packaging, every step is optimized.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={facility.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6">
                  <facility.icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{facility.title}</h3>
                <p className="text-slate-500 leading-relaxed">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-white mb-4">Inside Our Facility</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              A glimpse into our production, repair, and testing environments.
            </p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((src, index) => (
              <div key={index} data-aos="zoom-in" data-aos-delay={index * 100} className="relative overflow-hidden rounded-3xl group break-inside-avoid">
                <div className="aspect-auto">
                  <Image
                    src={src}
                    alt={`Facility ${index + 1}`}
                    width={900}
                    height={600}
                    className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-aos="zoom-in">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Want to see it yourself?</h2>
              <p className="text-slate-500 text-lg">Partner with us and visit our Noida facility to witness our operations.</p>
            </div>
            <Link href="/contact" className="shrink-0 w-full md:w-auto text-center px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white text-base font-bold rounded-full shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-1">
              Contact Us <ArrowRight className="inline-block ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
