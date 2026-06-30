'use client';

import { useState } from 'react';
import { Save, Loader2, Star, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

const TABS = ['Testimonials', 'Services', 'SEO'] as const;
type Tab = typeof TABS[number];

interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  serviceType: string;
}

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Testimonials');
  const [saving, setSaving] = useState(false);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { id: '1', customerName: 'Rajesh Kumar', rating: 5, comment: 'Excellent service! My TV was fixed within 2 hours.', serviceType: 'LED TV Repair' },
    { id: '2', customerName: 'Priya Sharma', rating: 5, comment: 'Very professional technicians and genuine parts used.', serviceType: 'Screen Replacement' },
    { id: '3', customerName: 'Amit Singh', rating: 4, comment: 'Good service, reasonable pricing. Will recommend.', serviceType: 'Smart TV Repair' },
  ]);

  const [seo, setSeo] = useState({
    homeTitle: 'RepairCart — TV Repair & Speaker Manufacturing in Mumbai',
    homeDescription: 'Expert LED & Smart TV repair, screen replacement, and premium speaker manufacturing in Mumbai.',
    contactTitle: 'Contact Us | RepairCart',
    googleMapsEmbed: '',
  });

  const [newTestimonial, setNewTestimonial] = useState({ customerName: '', rating: 5, comment: '', serviceType: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    toast.success('Content saved');
  }

  function addTestimonial() {
    if (!newTestimonial.customerName || !newTestimonial.comment) {
      toast.error('Name and comment are required');
      return;
    }
    setTestimonials((t) => [...t, { ...newTestimonial, id: Date.now().toString() }]);
    setNewTestimonial({ customerName: '', rating: 5, comment: '', serviceType: '' });
    setShowAddForm(false);
    toast.success('Testimonial added');
  }

  function removeTestimonial(id: string) {
    setTestimonials((t) => t.filter((item) => item.id !== id));
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Website Content</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Manage testimonials, service info, and SEO settings.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-6 space-y-5">

        {/* Testimonials */}
        {activeTab === 'Testimonials' && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-neutral-800">Customer Testimonials</h2>
              <button onClick={() => setShowAddForm((v) => !v)}
                className="flex items-center gap-1.5 text-sm bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-lg transition-colors">
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>

            {showAddForm && (
              <div className="border border-neutral-200 rounded-xl p-4 space-y-3 bg-neutral-50">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">Customer Name</label>
                    <input type="text" value={newTestimonial.customerName}
                      onChange={(e) => setNewTestimonial((n) => ({ ...n, customerName: e.target.value }))}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">Service Type</label>
                    <input type="text" value={newTestimonial.serviceType}
                      onChange={(e) => setNewTestimonial((n) => ({ ...n, serviceType: e.target.value }))}
                      placeholder="e.g. LED TV Repair"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">Rating</label>
                  <select value={newTestimonial.rating}
                    onChange={(e) => setNewTestimonial((n) => ({ ...n, rating: parseInt(e.target.value) }))}
                    className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                    {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">Comment</label>
                  <textarea rows={2} value={newTestimonial.comment}
                    onChange={(e) => setNewTestimonial((n) => ({ ...n, comment: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
                </div>
                <div className="flex gap-2">
                  <button onClick={addTestimonial} className="bg-primary-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Add Testimonial</button>
                  <button onClick={() => setShowAddForm(false)} className="text-sm text-neutral-500 hover:text-neutral-700 px-3 py-2">Cancel</button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {testimonials.map((t) => (
                <div key={t.id} className="border border-neutral-200 rounded-xl p-4 flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-neutral-800 text-sm">{t.customerName}</p>
                      <span className="text-xs text-neutral-400">{t.serviceType}</span>
                    </div>
                    <div className="flex gap-0.5 mb-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-200'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600 italic">&ldquo;{t.comment}&rdquo;</p>
                  </div>
                  <button onClick={() => removeTestimonial(t.id)} className="p-1.5 text-neutral-300 hover:text-red-500 transition-colors shrink-0">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Services */}
        {activeTab === 'Services' && (
          <>
            <h2 className="font-semibold text-neutral-800">Service Catalog</h2>
            <p className="text-sm text-neutral-500">Service names, descriptions, and pricing are managed through the backend API. Edit them from the database or backend admin.</p>
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">Current Services</p>
              <div className="space-y-2 text-sm text-neutral-700">
                {['LED / Smart TV Repair', 'Motherboard / Power Supply Repair', 'Screen Replacement', 'Backlight Repair', 'Polarizer Change', 'Speaker Manufacturing', 'Audio System Installation', 'Home Theater Setup'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SEO */}
        {activeTab === 'SEO' && (
          <>
            <h2 className="font-semibold text-neutral-800">SEO & Meta Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Home Page Title</label>
                <input type="text" value={seo.homeTitle}
                  onChange={(e) => setSeo((s) => ({ ...s, homeTitle: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Home Page Description</label>
                <textarea rows={2} value={seo.homeDescription}
                  onChange={(e) => setSeo((s) => ({ ...s, homeDescription: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Contact Page Title</label>
                <input type="text" value={seo.contactTitle}
                  onChange={(e) => setSeo((s) => ({ ...s, contactTitle: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Google Maps Embed URL</label>
                <input type="text" value={seo.googleMapsEmbed}
                  onChange={(e) => setSeo((s) => ({ ...s, googleMapsEmbed: e.target.value }))}
                  placeholder="https://maps.google.com/maps?..."
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                <p className="text-xs text-neutral-400 mt-1">Paste the Google Maps embed URL for the contact page.</p>
              </div>
            </div>
          </>
        )}

        {/* Save */}
        <div className="pt-2 border-t border-neutral-100">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
