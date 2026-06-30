import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Tv, Zap, Wrench, Monitor, Lightbulb, Sparkles,
  Speaker, Shield, Headphones, Music, Truck, CheckCircle2, ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'LED TV repair, Smart TV repair, screen replacement, motherboard repair, speaker manufacturing and home theater installation.',
};

const panelServices = [
  { icon: Tv, title: 'LED TV Panel Repair', desc: 'Repair panels up to 85 inch in our Class 100K Clean Room facility.', feature: 'Up to 85"', img: 'https://images.unsplash.com/photo-1593359863503-a54b98ade4d8?w=600&q=75' },
  { icon: Zap, title: 'Mobile Touch Repair', desc: 'OGS (Folder) repairs, replacing glasses, touch panels, and polarizers.', feature: 'Class 10K', img: 'https://images.unsplash.com/photo-1461151304267-38535e596517?w=600&q=75' },
  { icon: Shield, title: 'DOA Management', desc: 'Prevent abuse at ASCs by master checking and refurbishing DOA stocks.', feature: 'Cost saving', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=75' },
  { icon: Sparkles, title: 'Refurbishment (ETN)', desc: 'Equal to New product refurbishment for redeployment in sales or service.', feature: 'ETN Standard', img: 'https://images.unsplash.com/photo-1574717024453-354056adc766?w=600&q=75' },
];

const mfgServices = [
  { icon: Speaker, title: 'Speaker Manufacturing', desc: 'Portable speakers, tower speakers, and home theater system manufacturing.', feature: '4000 sq ft mfg', img: 'https://images.unsplash.com/photo-1545454675-3479531426e2?w=600&q=75' },
  { icon: Headphones, title: 'Intercom Systems', desc: 'Multi-line intercom system production with rigorous OQA testing.', feature: 'High Volume', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { icon: Monitor, title: 'Recycling Services', desc: 'Assist partners in recycling Beyond Economic Repair products correctly.', feature: 'Eco-friendly', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=75' },
  { icon: Wrench, title: 'PCB Level Repair', desc: 'Component level repair for Air Conditioners, washing machines and more.', feature: 'L4 Level', img: 'https://images.unsplash.com/photo-1558618047-3b45e2b4c1b2?w=600&q=75' },
];

const brands = ['Intex', 'Aiwa', 'Sansui', 'Bajaj', 'Amazon', 'Flipkart', 'Reliance Digital', 'Croma', 'Veego', 'TMB', 'Modish'];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-950 text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary-900/40 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092918056-0c4c3aebb8e9?w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <p data-aos="fade-right" className="text-primary-400 text-sm font-bold uppercase tracking-[0.2em] mb-4">What We Do</p>
          <h1 data-aos="fade-up" data-aos-delay="100" className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">Our <span className="text-white bg-clip-text bg-gradient-to-r from-primary-400 to-orange-300">Services</span></h1>
          <p data-aos="fade-up" data-aos-delay="200" className="text-slate-300 text-lg max-w-xl mx-auto sm:mx-0 font-light leading-relaxed">
            From panel repairs up to 85 inch to bulk DOA management and manufacturing, Longwell Electronics offers total solutions.
          </p>
        </div>
      </section>

      {/* TV Repair */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6" data-aos="fade-up">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">B2B Repair Services</h2>
              <p className="text-lg text-slate-500">Yield up to 85% for field failure units. Comprehensive DOA & ETN support.</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full shadow-sm">
              <CheckCircle2 className="h-4 w-4" /> All {brands.length} brands supported
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {panelServices.map((svc, index) => (
              <div
                key={svc.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-primary-100 overflow-hidden transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <Image src={svc.img} alt={svc.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-bold text-white bg-primary-600/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-white/20">{svc.feature}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow relative">
                  <div className="absolute -top-10 right-8 h-16 w-16 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-slate-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 z-10">
                    <svc.icon className="h-7 w-7" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 pr-16">{svc.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3" data-aos="fade-up" data-aos-delay="200">
            {brands.map((b) => (
              <span key={b} className="px-5 py-2 text-sm font-semibold text-slate-600 bg-white shadow-sm hover:shadow-md rounded-full border border-slate-200 transition-all cursor-default hover:text-primary-600 hover:border-primary-200">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pick & Drop */}
      <section className="py-12 bg-white relative z-10 mx-4 sm:mx-auto max-w-6xl -mt-12 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100" data-aos="zoom-in">
        <div className="px-6 sm:px-10">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 shadow-inner">
                <Truck className="h-8 w-8" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900 mb-1">Reverse Logistics Management</p>
                <p className="text-sm text-slate-500 max-w-md">We offer extensive domestic logistics and transportation services for all RMA panels and products.</p>
              </div>
            </div>
            <Link href="/contact" className="shrink-0 w-full md:w-auto text-center px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white text-sm font-bold rounded-full shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-1">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Speaker Manufacturing & Value Add */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-slate-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-14" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Manufacturing & Value Add Services</h2>
            <p className="text-lg text-slate-500">Custom speaker manufacturing and extensive recycling support.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mfgServices.map((svc, index) => (
              <div
                key={svc.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-primary-200 shadow-sm hover:shadow-xl hover:-translate-y-2 overflow-hidden transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <Image src={svc.img} alt={svc.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-300" />
                </div>
                <div className="p-8 flex flex-col flex-grow bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 group-hover:bg-primary-50 text-slate-600 group-hover:text-primary-600 flex items-center justify-center shrink-0 transition-colors duration-300">
                      <svc.icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <p className="text-lg font-bold text-slate-900">{svc.title}</p>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">{svc.desc}</p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Highlight</span>
                    <p className="text-base font-black text-primary-600">{svc.feature}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-slate-900 to-slate-900" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-aos="zoom-in">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 sm:p-14 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">Discuss your requirements</h2>
              <p className="text-slate-400 text-lg">Talk to our experts about DOA management, recycling, or bulk panel repairs.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
              <Link href="/contact" className="flex justify-center items-center px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white text-base font-bold rounded-full shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-1">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
