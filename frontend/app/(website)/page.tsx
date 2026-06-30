import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Tv, Zap, Wrench, Monitor, Lightbulb, Sparkles,
  Speaker, Headphones, Shield, Clock, CheckCircle2,
  Star, ArrowRight, Phone, Mail, MapPin, ChevronRight,
} from 'lucide-react';
import { HeroSlideshow } from '@/components/website/HeroSlideshow';
import { ClienteleMarquee } from '@/components/website/ClienteleMarquee';
import { CompanyProfile } from '@/components/website/CompanyProfile';
export const metadata: Metadata = {
  title: 'Longwell Electronics — Electronics Repair & Manufacturing',
  description: 'Longwell Electronics — World class manufacturing and repair environment. LED TV Panel Repair, Mobile Glass Repair, Speaker Manufacturing, DOA Management.',
};

const services = [
  { icon: Tv, title: 'LED TV Panel Repair', desc: 'Repairing up to 85 inch panels with Class 100K clean room.' },
  { icon: Zap, title: 'Mobile Touch Repair', desc: 'Glass, Touch Panels, Reflectors, and Polarizers replacement.' },
  { icon: Speaker, title: 'Speaker Manufacturing', desc: 'Portable speakers, Home theater, Tower speakers.' },
  { icon: Wrench, title: 'Component Level Repair', desc: 'PCB, AC, Washing machine boards, and other electronics.' },
  { icon: Shield, title: 'DOA Management', desc: 'Check, repair, and refurbish DOA stocks for redeployment.' },
  { icon: Sparkles, title: 'Refurbishment (ETN)', desc: 'Equal to New product refurbishment.' },
  { icon: Clock, title: 'Parts Cannibalization', desc: 'Efficient parts swap and sorting services.' },
  { icon: Lightbulb, title: 'Recycling Support', desc: 'Recycling Beyond Economic Repair products appropriately.' },
];

const stats = [
  { value: '20,000+', label: 'Sq Ft Facility' },
  { value: '6,000+', label: 'Repairs / Month' },
  { value: '100K', label: 'Clean Room Class' },
  { value: '100%', label: 'OQA Inspection' },
];

const features = [
  { icon: Shield, title: 'Professional Infrastructure', desc: 'State-of-the-art repair center with latest testing, bonding, and clean room facilities.' },
  { icon: CheckCircle2, title: 'Quality Assurance', desc: 'Yield up to 85% for field failure units and 90% for line rejection.' },
  { icon: Clock, title: 'TAT Guarantee', desc: 'Turn around time guarantee for services with fully automatized SOP.' },
  { icon: MapPin, title: 'Reverse Logistics', desc: 'Efficient domestic RMA and transportation services.' },
];

const testimonials = [
  { name: 'OEM Partner', rating: 5, text: 'Longwell Electronics has helped us save major costs incurred towards mobile phone display replacements with their OGS repair capability.', service: 'Mobile Repair' },
  { name: 'Retail Brand', rating: 5, text: 'Their DOA management and ETN refurbishment has significantly reduced our cost and improved field redeployment.', service: 'DOA Management' },
  { name: 'Electronics Brand', rating: 5, text: 'The 20,000 sq ft facility and Class 1000/10000 clean rooms ensure perfect panel bonding and polarizer replacement.', service: 'Panel Repair' },
];


const blogPosts = [
  {
    id: 1,
    title: 'The Future of LED Panel Repair: Class 100K Clean Rooms',
    category: 'Technology',
    date: 'Oct 12, 2023',
    desc: 'Discover how advanced clean room environments are revolutionizing the way we bond and repair large-scale LED panels.',
    img: 'https://images.unsplash.com/photo-1581092918056-0c4c3aebb8e9?w=600&q=80'
  },
  {
    id: 2,
    title: 'Why DOA Management is Crucial for Electronics Brands',
    category: 'Business',
    date: 'Nov 05, 2023',
    desc: 'Dead on Arrival (DOA) stock can bleed revenue. Learn how proper refurbishment and master checking can save millions.',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80'
  },
  {
    id: 3,
    title: 'Sustainable E-Waste: Recycling Beyond Economic Repair',
    category: 'Sustainability',
    date: 'Nov 28, 2023',
    desc: 'E-waste is a growing concern. Explore our eco-friendly recycling processes for units that are beyond economic repair.',
    img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80'
  }
];
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Longwell Electronics',
  description: 'World class manufacturing and repair environment for LED TVs, Mobile phones, and Speakers.',
  url: 'https://www.longwellelectronics.com',
  telephone: '+919811881117',
  email: 'imrankhanik8463@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C-295 Sector 10',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 28.5885, longitude: 77.3175 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '19:00' },
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
      <section className="relative bg-slate-950 text-white pt-32 pb-24 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/40 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p data-aos="fade-up" className="text-primary-400 text-sm font-bold uppercase tracking-[0.2em] mb-5">
                Longwell Electronics
              </p>
              <h1 data-aos="fade-up" data-aos-delay="100" className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                Total Solutions for<br />
                <span className="text-white bg-clip-text bg-gradient-to-r from-primary-400 to-orange-300">Electronics.</span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="200" className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl font-light">
                World class manufacturing and repair environment. We specialize in LED TV panels, mobile phone displays, speaker manufacturing, and DOA management.
              </p>
              <div data-aos="fade-up" data-aos-delay="300" className="flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-full shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                  Explore Services <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 text-sm"
                >
                  Contact Us
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
                Quality service and<br />customer satisfaction.
              </h2>
              <p data-aos="fade-up" data-aos-delay="200" className="text-slate-600 leading-relaxed mb-10 text-lg">
                Longwell Electronics provides remarkable quality in products and services at best prices. With a 20,000 sq ft facility, clean rooms, and close relationships with Chinese spare part manufacturers, we ensure high yield percentages.
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

      <ClienteleMarquee />
      <CompanyProfile />

      {/* ── How It Works ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-slate-500 text-lg">Get your TV repaired in 4 simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Book Online', desc: 'Fill a quick form and pay ₹250 service visit fee to confirm.', img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=75' },
              { step: '02', title: 'Technician Visits', desc: 'Certified technician arrives at your home at the scheduled time.', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=75' },
              { step: '03', title: 'Diagnosis & Quote', desc: 'We identify the issue and share a repair estimate before starting.', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=75' },
              { step: '04', title: 'Repaired & Returned', desc: 'Your TV is fixed and returned with a 30-day warranty.', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=75' },
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

      {/* ── Blog Section ── */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6" data-aos="fade-up">
            <div>
              <p className="text-primary-600 text-sm font-bold uppercase tracking-[0.2em] mb-3">Insights</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Latest from our blog</h2>
              <p className="text-slate-500 text-lg max-w-2xl">Stay updated with industry trends, technical insights, and company news.</p>
            </div>
            <Link href="/blog" className="hidden md:inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors">
              View all articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={post.id} data-aos="fade-up" data-aos-delay={index * 100} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={post.img} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-sm text-slate-400 font-medium mb-3">{post.date}</p>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4 group-hover:text-primary-600 transition-colors">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    {post.desc}
                  </p>
                  <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-primary-600 font-bold text-sm hover:text-primary-700 transition-colors mt-auto">
                    Read article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center md:hidden" data-aos="fade-up">
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors">
              View all articles <ArrowRight className="h-4 w-4" />
            </Link>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Partner with us today</h2>
              <p className="text-slate-300 text-lg max-w-xl">Whether it's bulk DOA management, panel repairs, or sourcing high-quality speakers, Longwell Electronics is your trusted B2B partner.</p>
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
              { icon: MapPin, title: 'Head Office', content: 'C-295 Sector 10 Noida,\nGautam Buddha Nagar-201301', href: undefined },
              { icon: Phone, title: 'Call Us', content: '+91 9811881117\n+91 9811211948', href: 'tel:9811881117', sub: 'Mon–Sat, 9am–7pm' },
              { icon: Mail, title: 'Email Us', content: 'imrankhanik8463@gmail.com\nlongwellpanelwork@gmail.com', href: 'mailto:imrankhanik8463@gmail.com', sub: 'Fast Response' },
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
