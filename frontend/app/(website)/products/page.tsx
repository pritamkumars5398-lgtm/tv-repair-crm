'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { publicApi } from '@/lib/api/public';

const products = [
  { id: '1', name: '5.1 Home Theater Speaker Set', category: 'Home Theater', desc: 'Premium 5.1 surround sound system with deep bass and room-filling audio.', specs: ['5.1 Channel', '200W Output', '40Hz–20kHz', '8Ω Impedance'], price: '₹15,000 – ₹25,000', img: 'https://images.unsplash.com/photo-1545454675-3479531426e2?w=600&q=80' },
  { id: '2', name: '2.1 Bookshelf Speaker System',  category: 'Home Audio',   desc: 'Compact 2.1 setup perfect for living rooms. Rich, balanced sound.', specs: ['2.1 Channel', '80W Output', '60Hz–20kHz', 'Magnetic Shielded'], price: '₹6,000 – ₹12,000', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: '3', name: 'Commercial PA Speaker',          category: 'Commercial',   desc: 'High-power PA speakers for shops, restaurants, offices and event venues.', specs: ['150W Output', 'Weatherproof', 'Wall-mount Ready', 'Single Channel'], price: '₹4,000 – ₹8,000', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80' },
  { id: '4', name: 'Subwoofer — 12" Bass Cabinet',  category: 'Subwoofer',    desc: 'Powerful 12" subwoofer for punchy bass. Compatible with any 2.1 or 5.1 setup.', specs: ['12" Driver', '120W Output', '20Hz–200Hz', 'Line In/Out'], price: '₹5,000 – ₹9,000', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80' },
  { id: '5', name: 'Outdoor Weatherproof Speaker',  category: 'Outdoor',      desc: 'Built for outdoor use — garden, poolside, rooftop. IP54 rated, UV resistant.', specs: ['IP54 Rated', '60W Output', 'UV Resistant', 'Swivel Mount'], price: '₹3,500 – ₹7,000', img: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e7?w=600&q=80' },
  { id: '6', name: 'Studio Monitor Speaker',         category: 'Studio',       desc: 'Flat response monitors for accurate audio production and music mixing.', specs: ['Bi-amplified', '80W Per Channel', 'Flat Response', '5" + 1" Driver'], price: '₹8,000 – ₹18,000', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80' },
];

const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit number'),
  email: z.string().email().optional().or(z.literal('')),
  productInterest: z.string().min(1),
  message: z.string().min(10, 'Describe your requirement (min 10 chars)'),
});
type InquiryInput = z.infer<typeof inquirySchema>;

export default function ProductsPage() {
  const [category, setCategory] = useState('All');
  const [modal, setModal] = useState<{ open: boolean; product: string }>({ open: false, product: '' });

  const filtered = category === 'All' ? products : products.filter((p) => p.category === category);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryInput) => {
    try {
      await publicApi.submitInquiry({ ...data, serviceType: 'PRODUCT_INQUIRY' });
      toast.success("Inquiry sent! We'll call you within 2 hours.");
      reset();
      setModal({ open: false, product: '' });
    } catch {
      toast.error('Failed to send. Please WhatsApp us directly.');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-neutral-900 text-white pt-32 pb-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1545454675-3479531426e2?w=1600&q=80"
          alt="Speakers"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-4">Products</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Speaker Catalog</h1>
          <p className="text-neutral-400 text-lg max-w-xl">Custom-manufactured speakers for home, studio, and commercial use. Contact us for a personalized quote.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <div key={p.id} className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all duration-200">
                <div className="relative h-52 bg-neutral-100 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-medium text-primary-700 bg-white/90 backdrop-blur-sm border border-primary-100 px-2.5 py-1 rounded-full">
                      {p.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-[15px] font-semibold text-neutral-900 mb-1.5">{p.name}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-3">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.specs.map((s) => (
                      <span key={s} className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <div>
                      <p className="text-xs text-neutral-400">Price range</p>
                      <p className="text-sm font-semibold text-neutral-900">{p.price}</p>
                    </div>
                    <button
                      onClick={() => setModal({ open: true, product: p.name })}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold rounded-lg transition-all"
                    >
                      Get Quote <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-neutral-200 relative">
            <button onClick={() => setModal({ open: false, product: '' })} className="absolute right-4 top-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all">
              <X className="h-4 w-4" />
            </button>
            <div className="p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-1">Product Inquiry</h2>
              <p className="text-sm text-neutral-500 mb-5">We will send you a custom quote within 2 hours.</p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">Name *</label>
                    <input {...register('name')} placeholder="Full name" className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">Phone *</label>
                    <input {...register('phone')} placeholder="10-digit number" className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Product *</label>
                  <input {...register('productInterest')} defaultValue={modal.product} className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Your Requirement *</label>
                  <textarea {...register('message')} rows={3} placeholder="Room size, usage, budget..." className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none" />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-2.5 bg-primary-600 hover:bg-primary-500 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-all">
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
