'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { publicApi } from '@/lib/api/public';
import { contactSchema, type ContactInput } from '@/lib/validations/booking';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      const response = await publicApi.submitLead({ ...data, email: data.email || undefined });
      setLeadId(response.data?.leadId || 'LID-XXXX');
      setSubmitted(true);
      reset();
    } catch {
      toast.error('Failed to submit. Please call or WhatsApp us directly.');
    }
  };

  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary-900/30 via-slate-950 to-slate-950" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="max-w-2xl">
              <div data-aos="fade-down" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-primary-300 backdrop-blur-md shadow-lg mb-6">
                <ShieldCheck className="h-4 w-4 text-primary-400" />
                Fast response · Genuine parts · Doorstep service
              </div>
              <h1 data-aos="fade-up" data-aos-delay="100" className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.05]">
                Let’s get your device <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-300">fixed.</span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="200" className="mt-6 text-lg leading-relaxed text-slate-300 font-light max-w-xl">
                Whether you need a quick repair quote, an urgent service request, or a product question, our team is ready to help.
              </p>
              <div data-aos="fade-up" data-aos-delay="300" className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:-translate-y-1"
                >
                  Chat on WhatsApp <MessageCircle className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="tel:9876543210"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
                >
                  Call now <Phone className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl" data-aos="fade-left" data-aos-delay="200">
              <div className="grid gap-5 sm:grid-cols-2">
                {([
                  { label: 'Response time', value: 'Within 2 hrs' },
                  { label: 'Service', value: 'Doorstep & pickup' },
                  { label: 'Warranty', value: '30-day guarantee' },
                  { label: 'Brands', value: 'Samsung, LG, Sony' },
                ]).map((item, i) => (
                  <div key={item.label} data-aos="zoom-in" data-aos-delay={300 + (i * 100)} className="rounded-3xl border border-white/10 bg-slate-900/50 p-5 hover:bg-slate-900/80 transition-colors">
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
                    <p className="mt-2 text-xl font-bold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[3rem] border border-slate-100 bg-white p-8 sm:p-12 shadow-xl shadow-slate-200/50" data-aos="fade-right">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-emerald-100 bg-emerald-50/50 px-8 py-16 text-center" data-aos="zoom-in">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 shadow-inner mb-6">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-3">Message received!</h2>
                  <p className="text-base leading-relaxed text-slate-600 max-w-sm mb-6">We’ll get back to you soon with the best next step.</p>
                  <p className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                    Reference ID: <span className="font-mono font-bold text-slate-900">{leadId}</span>
                  </p>
                  <a
                    href={`https://wa.me/${wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <MessageCircle className="h-5 w-5" /> Also chat on WhatsApp
                  </a>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600 mb-2">Send a message</p>
                    <h2 className="text-4xl font-bold text-slate-900 mb-3">Tell us what you need</h2>
                    <p className="text-base leading-relaxed text-slate-600">
                      Share your issue or service requirement and we’ll help you with the right plan.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-bold text-slate-700">Full Name *</label>
                        <input
                          {...register('name')}
                          placeholder="Your name"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 hover:bg-white"
                        />
                        {errors.name && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-bold text-slate-700">Phone Number *</label>
                        <input
                          {...register('phone')}
                          placeholder="10-digit mobile"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 hover:bg-white"
                        />
                        {errors.phone && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="Optional"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 hover:bg-white"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Service Type *</label>
                      <select
                        {...register('serviceType')}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 hover:bg-white appearance-none cursor-pointer"
                      >
                        <option value="">Select a service</option>
                        <option value="TV_REPAIR">TV Repair</option>
                        <option value="SPEAKER_REPAIR">Speaker Repair</option>
                        <option value="HOME_THEATER">Home Theater</option>
                        <option value="PRODUCT_INQUIRY">Product Inquiry</option>
                      </select>
                      {errors.serviceType && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.serviceType.message}</p>}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Message *</label>
                      <textarea
                        {...register('message')}
                        rows={5}
                        placeholder="Describe your issue or requirement..."
                        className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 hover:bg-white"
                      />
                      {errors.message && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.message.message}</p>}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-500 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting ? 'Sending...' : 'Send message'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            <div className="space-y-8">
              <div className="overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50" data-aos="fade-left">
                <div className="h-64 sm:h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.0!2d72.8!3d18.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU0JzAwLjAiTiA3MsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location"
                    className="grayscale contrast-125"
                  />
                </div>
              </div>

              <div className="rounded-[3rem] border border-slate-100 bg-slate-950 p-10 text-white shadow-2xl" data-aos="fade-left" data-aos-delay="100">
                <h3 className="text-2xl font-bold">Contact details</h3>
                <div className="mt-8 space-y-5">
                  {([
                    { icon: MapPin, label: 'Address', value: '123 Service Street, Electronics Hub, Mumbai – 400001' },
                    { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:9876543210' },
                    { icon: Mail, label: 'Email', value: 'info@tvrepair.in', href: 'mailto:info@tvrepair.in' },
                    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 9:00 AM – 7:00 PM' },
                  ]).map((item, index) => (
                    <div key={item.label} data-aos="fade-up" data-aos-delay={200 + (index * 100)} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 shrink-0">
                        <item.icon className="h-5 w-5 text-primary-400" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="mt-1 block text-base font-medium text-white transition hover:text-primary-300">
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-base font-medium text-white">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
