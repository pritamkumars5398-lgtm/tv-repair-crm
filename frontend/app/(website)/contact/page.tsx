'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { publicApi } from '@/lib/api/public';
import { contactSchema, type ContactInput } from '@/lib/validations/booking';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      const response = await publicApi.submitLead({ ...data, email: data.email || undefined });
      setLeadId(response.data?.leadId || 'LID-XXXX');
      setSubmitted(true);
    } catch {
      toast.error('Failed to submit. Please call or WhatsApp us directly.');
    }
  };

  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'RepairCart',
    url: 'https://www.repaircart.in/contact',
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
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '19:00' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+919876543210',
      contactType: 'customer service',
      availableLanguage: ['en', 'hi'],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      {/* Hero */}
      <section className="bg-neutral-900 text-white pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-4">Get in Touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Contact Us</h1>
          <p className="text-neutral-400 text-lg max-w-xl">Have a question or need a quote? We respond within 2 hours.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-16">
                  <div className="h-14 w-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-7 w-7 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-2">Message received!</h2>
                  <p className="text-neutral-500 text-sm mb-2">We will call you within 2 hours.</p>
                  <p className="text-xs text-neutral-400 mb-6">
                    Reference ID: <span className="font-mono font-bold text-neutral-700">{leadId}</span>
                  </p>
                  <a
                    href={`https://wa.me/${wa}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="h-4 w-4" /> Also chat on WhatsApp
                  </a>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-neutral-900 mb-6">Send a message</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1.5">Full Name *</label>
                        <input {...register('name')} placeholder="Your name" className="w-full border border-neutral-300 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1.5">Phone Number *</label>
                        <input {...register('phone')} placeholder="10-digit mobile" className="w-full border border-neutral-300 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1.5">Email</label>
                      <input {...register('email')} type="email" placeholder="Optional" className="w-full border border-neutral-300 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1.5">Service Type *</label>
                      <select {...register('serviceType')} className="w-full border border-neutral-300 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                        <option value="">Select a service</option>
                        <option value="TV_REPAIR">TV Repair</option>
                        <option value="SPEAKER_REPAIR">Speaker Repair</option>
                        <option value="HOME_THEATER">Home Theater</option>
                        <option value="PRODUCT_INQUIRY">Product Inquiry</option>
                      </select>
                      {errors.serviceType && <p className="text-xs text-red-500 mt-1">{errors.serviceType.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1.5">Message *</label>
                      <textarea {...register('message')} rows={4} placeholder="Describe your issue or requirement..." className="w-full border border-neutral-300 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none" />
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 bg-primary-600 hover:bg-primary-500 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-all"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-neutral-200 h-52">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.0!2d72.8!3d18.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU0JzAwLjAiTiA3MsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Location"
                />
              </div>

              {/* Contact details */}
              <div className="space-y-3">
                {[
                  { icon: MapPin, label: 'Address',   value: '123 Service Street, Electronics Hub, Mumbai – 400001', href: undefined },
                  { icon: Phone,  label: 'Phone',     value: '+91 98765 43210', href: 'tel:9876543210' },
                  { icon: Mail,   label: 'Email',     value: 'info@tvrepair.in', href: 'mailto:info@tvrepair.in' },
                  { icon: Clock,  label: 'Hours',     value: 'Mon–Sat: 9:00 AM – 7:00 PM', href: undefined },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <div className="h-8 w-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 text-neutral-600" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-primary-600 hover:text-primary-700">{item.value}</a>
                      ) : (
                        <p className="text-sm font-medium text-neutral-800">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${wa}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl hover:bg-[#25D366]/15 transition-all group"
              >
                <div className="h-9 w-9 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="h-5 w-5 text-white fill-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Chat on WhatsApp</p>
                  <p className="text-xs text-neutral-500">Quick replies · Usually online</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
