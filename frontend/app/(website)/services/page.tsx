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

const tvServices = [
  { icon: Tv,        title: 'LED TV Repair',              desc: 'Complete diagnosis and repair for all LED TV brands — Samsung, LG, Sony, Mi, and more.', price: 'From ₹500',   img: 'https://images.unsplash.com/photo-1593359863503-a54b98ade4d8?w=600&q=75' },
  { icon: Zap,       title: 'Smart TV Repair',            desc: 'Software and hardware repairs for Android TV, webOS, Tizen, and other Smart TV platforms.', price: 'From ₹600', img: 'https://images.unsplash.com/photo-1461151304267-38535e596517?w=600&q=75' },
  { icon: Wrench,    title: 'Motherboard / Power Supply', desc: 'Component-level PCB repair, capacitor replacement, power supply board diagnostics.', price: 'From ₹800',         img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=75' },
  { icon: Monitor,   title: 'Screen Replacement',         desc: 'Genuine LED and LCD panel replacement for all screen sizes from 24" to 85".', price: 'From ₹3,500',            img: 'https://images.unsplash.com/photo-1574717024453-354056adc766?w=600&q=75' },
  { icon: Lightbulb, title: 'Backlight Repair',           desc: 'LED strip replacement, backlight driver repair and inverter board repair.', price: 'From ₹700',                 img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=75' },
  { icon: Sparkles,  title: 'Polarizer / Scratch Remover',desc: 'Screen polarizer film replacement and scratch treatment to restore display clarity.', price: 'From ₹400',       img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=75' },
];

const speakerServices = [
  { icon: Speaker,    title: 'Speaker Manufacturing', desc: 'Custom-built premium speakers for home, studio, office, and commercial use.', price: 'Quote based', img: 'https://images.unsplash.com/photo-1545454675-3479531426e2?w=600&q=75' },
  { icon: Shield,     title: 'Onsite Warranty',       desc: 'All manufactured speakers include onsite warranty — no drop-off needed.', price: 'Included',      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { icon: Music,      title: 'Audio System Install',  desc: 'Complete audio system installation with wiring, amplifier setup, and calibration.', price: 'From ₹1,500', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=75' },
  { icon: Headphones, title: 'Home Theater Setup',    desc: 'End-to-end home theater — projector, screen, surround sound, and calibration.', price: 'From ₹2,500', img: 'https://images.unsplash.com/photo-1558618047-3b45e2b4c1b2?w=600&q=75' },
];

const brands = ['Samsung', 'LG', 'Sony', 'Panasonic', 'Mi', 'OnePlus', 'Vu', 'Hisense', 'TCL', 'Philips', 'Toshiba', 'Sharp'];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-neutral-900 text-white pt-32 pb-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3aebb8e9?w=1600&q=80"
          alt="TV repair services"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-4">What We Do</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Our Services</h1>
          <p className="text-neutral-400 text-lg max-w-xl">
            From LED TV repairs to custom speaker manufacturing — professional service backed by certified technicians and genuine parts.
          </p>
        </div>
      </section>

      {/* TV Repair */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between mb-8 pb-6 border-b border-neutral-200">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-1">TV Repair Services</h2>
              <p className="text-sm text-neutral-500">All major brands. 30-day warranty on every repair.</p>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-3.5 w-3.5" /> All {brands.length} brands supported
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {tvServices.map((svc) => (
              <div key={svc.title} className="group bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-md overflow-hidden transition-all">
                <div className="relative h-40 bg-neutral-100">
                  <Image src={svc.img} alt={svc.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold text-white bg-primary-600 px-2.5 py-1 rounded-full">{svc.price}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svc.icon className="h-4 w-4 text-primary-600 shrink-0" strokeWidth={1.8} />
                    <p className="text-sm font-semibold text-neutral-900">{svc.title}</p>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-3">{svc.desc}</p>
                  <Link href="/book" className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-0.5">
                    Book this service <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <span key={b} className="px-3 py-1 text-xs font-medium text-neutral-600 bg-neutral-100 rounded-full border border-neutral-200">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pick & Drop */}
      <section className="py-8 bg-neutral-50 border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-sm">
                <Truck className="h-5 w-5 text-primary-600" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">Pick & Drop Service Available</p>
                <p className="text-xs text-neutral-500 mt-0.5">We pick up your TV, repair it at our workshop, and deliver it back. Free within city.</p>
              </div>
            </div>
            <Link href="/book" className="shrink-0 px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg transition-all">
              Schedule Pick-up
            </Link>
          </div>
        </div>
      </section>

      {/* Speaker Manufacturing */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 pb-6 border-b border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-900 mb-1">Speaker Manufacturing</h2>
            <p className="text-sm text-neutral-500">Custom premium speakers and complete audio system solutions.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {speakerServices.map((svc) => (
              <div key={svc.title} className="group bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-md overflow-hidden transition-all">
                <div className="relative h-36 bg-neutral-100">
                  <Image src={svc.img} alt={svc.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-neutral-900/40" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <svc.icon className="h-4 w-4 text-primary-600 shrink-0" strokeWidth={1.8} />
                    <p className="text-sm font-semibold text-neutral-900">{svc.title}</p>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-2">{svc.desc}</p>
                  <p className="text-xs font-semibold text-primary-700">{svc.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Book a service today</h2>
            <p className="text-neutral-400 text-sm">₹250 service visit fee. Same-day technician in most areas.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/book" className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg transition-all">Book Now</Link>
            <Link href="/contact" className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-lg border border-white/20 transition-all">Get a Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
