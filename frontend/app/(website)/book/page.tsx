'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CheckCircle2, Upload, X, ChevronLeft, ChevronRight, Tv, MapPin, CreditCard } from 'lucide-react';
import Script from 'next/script';
import { useBookingStore } from '@/lib/stores/booking-store';
import { step1Schema, step2Schema, type Step1Input, type Step2Input } from '@/lib/validations/booking';
import { publicApi } from '@/lib/api/public';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

const SERVICE_OPTIONS = [
  { value: 'TV_REPAIR', label: 'LED / Smart TV Repair' },
  { value: 'SPEAKER_REPAIR', label: 'Speaker Repair' },
  { value: 'HOME_VISIT', label: 'Home Visit (Assessment)' },
  { value: 'SPEAKER_INSTALL', label: 'Speaker Installation' },
  { value: 'HOME_THEATER', label: 'Home Theater Setup' },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: 'Service Details', icon: Tv },
    { num: 2, label: 'Address', icon: MapPin },
    { num: 3, label: 'Payment', icon: CreditCard },
  ];

  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                currentStep > step.num
                  ? 'bg-success text-white'
                  : currentStep === step.num
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-200 text-neutral-500'
              }`}
            >
              {currentStep > step.num ? <CheckCircle2 className="h-5 w-5" /> : step.num}
            </div>
            <p className={`text-xs mt-1 font-medium whitespace-nowrap ${currentStep === step.num ? 'text-primary-700' : 'text-neutral-500'}`}>
              {step.label}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 sm:w-24 h-px mx-2 mb-4 transition-all ${currentStep > step.num + 1 ? 'bg-success' : currentStep > step.num ? 'bg-primary-400' : 'bg-neutral-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Step 1: Service Details ── */
function Step1({ onNext }: { onNext: (data: Step1Input) => void }) {
  const { formData, updateFormData } = useBookingStore();
  const [photos, setPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<Step1Input>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: formData.name || '',
      phone: formData.phone || '',
      email: formData.email || '',
      serviceType: formData.serviceType || 'TV_REPAIR',
      preferredDate: formData.preferredDate || '',
      preferredTime: formData.preferredTime || '',
      issueDescription: formData.issueDescription || '',
    },
  });

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter((f) => f.size <= 5 * 1024 * 1024);
    const combined = [...photos, ...newFiles].slice(0, 5);
    setPhotos(combined);
    updateFormData({ photos: combined });
  };

  const removePhoto = (idx: number) => {
    const updated = photos.filter((_, i) => i !== idx);
    setPhotos(updated);
    updateFormData({ photos: updated });
  };

  const onSubmit = (data: Step1Input) => {
    updateFormData(data);
    onNext(data);
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name *</label>
          <input {...register('name')} placeholder="Your full name" className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          {errors.name && <p className="text-xs text-error mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number *</label>
          <input {...register('phone')} placeholder="10-digit mobile" className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          {errors.phone && <p className="text-xs text-error mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
        <input {...register('email')} type="email" placeholder="Optional — for booking confirmation" className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Service Type *</label>
        <select {...register('serviceType')} className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
          {SERVICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {errors.serviceType && <p className="text-xs text-error mt-1">{errors.serviceType.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Preferred Date *</label>
          <input {...register('preferredDate')} type="date" min={minDate} className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          {errors.preferredDate && <p className="text-xs text-error mt-1">{errors.preferredDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Preferred Time *</label>
          <select {...register('preferredTime')} className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option value="">Select a time slot</option>
            {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.preferredTime && <p className="text-xs text-error mt-1">{errors.preferredTime.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Describe the Issue *</label>
        <textarea {...register('issueDescription')} rows={3} placeholder="E.g., Screen is dark, no sound, TV won't turn on..." className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
        {errors.issueDescription && <p className="text-xs text-error mt-1">{errors.issueDescription.message}</p>}
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Upload Photos (optional, max 5)</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neutral-300 rounded-xl p-5 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all"
        >
          <Upload className="h-6 w-6 text-neutral-400 mx-auto mb-2" />
          <p className="text-sm text-neutral-600">Click to upload photos of your TV issue</p>
          <p className="text-xs text-neutral-400 mt-1">Max 5 photos, 5MB each</p>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        {photos.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {photos.map((f, i) => (
              <div key={i} className="relative">
                <div className="h-16 w-16 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center overflow-hidden">
                  <img src={URL.createObjectURL(f)} alt={f.name} className="h-full w-full object-cover" />
                </div>
                <button type="button" onClick={() => removePhoto(i)} className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-error text-white flex items-center justify-center">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
        Next: Address <ChevronRight className="h-4 w-4" />
      </button>
    </form>
  );
}

/* ── Step 2: Address ── */
function Step2({ onNext, onBack }: { onNext: (data: Step2Input) => void; onBack: () => void }) {
  const { formData, updateFormData } = useBookingStore();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Step2Input>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      address: formData.address || '',
      area: formData.area || '',
      city: formData.city || 'Mumbai',
      pincode: formData.pincode || '',
      isPickup: formData.isPickup || false,
    },
  });

  const isPickup = watch('isPickup');

  const onSubmit = (data: Step2Input) => {
    updateFormData(data);
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Full Address *</label>
        <input {...register('address')} placeholder="Flat/House no., Building name, Street" className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        {errors.address && <p className="text-xs text-error mt-1">{errors.address.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Area / Locality *</label>
          <input {...register('area')} placeholder="e.g., Bandra West" className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          {errors.area && <p className="text-xs text-error mt-1">{errors.area.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">City *</label>
          <input {...register('city')} placeholder="City" className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          {errors.city && <p className="text-xs text-error mt-1">{errors.city.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Pincode *</label>
        <input {...register('pincode')} placeholder="6-digit pincode" maxLength={6} className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        {errors.pincode && <p className="text-xs text-error mt-1">{errors.pincode.message}</p>}
      </div>

      {/* Pick & Drop Toggle */}
      <div className={`rounded-xl p-5 border-2 transition-all ${isPickup ? 'border-primary-500 bg-primary-50' : 'border-neutral-200 bg-white'}`}>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="isPickup"
            {...register('isPickup')}
            className="mt-0.5 h-4 w-4 accent-primary-600"
          />
          <label htmlFor="isPickup" className="cursor-pointer">
            <p className="font-medium text-neutral-900">Enable Pick & Drop Service</p>
            <p className="text-sm text-neutral-600 mt-0.5">We'll pick up your TV from the above address, repair it at our workshop, and deliver it back. Recommended for large TVs.</p>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex-1 py-3 border border-neutral-200 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-all flex items-center justify-center gap-2">
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button type="submit" className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
          Next: Payment <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

/* ── Step 3: Payment ── */
function Step3({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const { formData, reset } = useBookingStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const serviceLabel = SERVICE_OPTIONS.find((o) => o.value === formData.serviceType)?.label || formData.serviceType;

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await publicApi.createBooking(formData as Parameters<typeof publicApi.createBooking>[0]);
      const { razorpayOrderId, bookingId } = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 25000,
        currency: 'INR',
        name: 'TV Repair Service',
        description: 'Service Visit Fee',
        order_id: razorpayOrderId,
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: '#2563eb' },
        handler: async (payment: Record<string, string>) => {
          try {
            const verify = await publicApi.verifyPayment({
              razorpay_order_id: payment.razorpay_order_id,
              razorpay_payment_id: payment.razorpay_payment_id,
              razorpay_signature: payment.razorpay_signature,
              bookingId,
            });
            reset();
            router.push(`/booking/success?ticketId=${verify.data.ticketId}`);
          } catch {
            toast.error('Payment verification failed. Contact us with your payment ID.');
          }
        },
        modal: {
          ondismiss: () => {
            toast.warning('Payment cancelled. Your booking is not confirmed yet.');
            setIsProcessing(false);
          },
        },
      };

      new window.Razorpay(options).open();
    } catch {
      toast.error('Failed to create booking. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
        <h3 className="font-semibold text-neutral-900 mb-4">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Customer</span>
            <span className="font-medium text-neutral-900">{formData.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Phone</span>
            <span className="font-medium text-neutral-900">{formData.phone}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Service</span>
            <span className="font-medium text-neutral-900">{serviceLabel}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Date & Time</span>
            <span className="font-medium text-neutral-900">{formData.preferredDate} at {formData.preferredTime}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Address</span>
            <span className="font-medium text-neutral-900 text-right max-w-[55%]">{formData.address}, {formData.area}, {formData.city} – {formData.pincode}</span>
          </div>
          {formData.isPickup && (
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Mode</span>
              <span className="font-medium text-primary-700">Pick & Drop</span>
            </div>
          )}
          <div className="border-t border-neutral-200 pt-3 flex justify-between">
            <span className="text-neutral-600 font-medium">Service Visit Fee</span>
            <span className="font-bold text-lg text-neutral-900">₹250</span>
          </div>
        </div>
        <p className="text-xs text-neutral-500 mt-3">Remaining repair cost will be shared after diagnosis. No hidden charges.</p>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl p-5 border border-neutral-200">
        <p className="text-sm font-medium text-neutral-700 mb-3">Payment via Razorpay</p>
        <div className="flex flex-wrap gap-2">
          {['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'PhonePe', 'Google Pay'].map((m) => (
            <span key={m} className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-full border border-neutral-200">{m}</span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex items-center gap-2 px-5 py-3 border border-neutral-200 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-all">
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="flex-1 py-3 bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white font-semibold rounded-lg transition-all text-base"
        >
          {isProcessing ? 'Processing...' : 'Pay ₹250 & Confirm Booking'}
        </button>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function BookPage() {
  const { step, nextStep, prevStep } = useBookingStore();

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-accent-400 text-sm font-semibold uppercase tracking-widest mb-2">Book a Service</p>
          <h1 className="text-3xl md:text-4xl font-bold font-display">Book Your TV Repair</h1>
          <p className="text-primary-200 mt-2">3 quick steps · ₹250 service visit fee · Certified technician</p>
        </div>
      </section>

      <section className="py-12 bg-neutral-50 min-h-screen">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <StepIndicator currentStep={step} />

          <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-6 sm:p-8">
            {step === 1 && <Step1 onNext={nextStep} />}
            {step === 2 && <Step2 onNext={nextStep} onBack={prevStep} />}
            {step === 3 && <Step3 onBack={prevStep} />}
          </div>
        </div>
      </section>
    </>
  );
}
