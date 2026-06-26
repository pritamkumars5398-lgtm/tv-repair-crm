'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, CheckCircle2, Circle, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { publicApi } from '@/lib/api/public';
import type { TrackTicketResponse, TicketStatus } from '@/types';

const STAGES: { status: TicketStatus; label: string; desc: string }[] = [
  { status: 'tv_received', label: 'TV Received', desc: 'Your TV has been received at our service center.' },
  { status: 'diagnosis_completed', label: 'Diagnosis Completed', desc: 'Our technician has identified the issue.' },
  { status: 'parts_ordered', label: 'Spare Parts Ordered', desc: 'Required parts have been ordered for your repair.' },
  { status: 'repair_in_progress', label: 'Repair In Progress', desc: 'Your TV is being repaired by our technician.' },
  { status: 'quality_check', label: 'Quality Testing', desc: 'Your TV is undergoing quality and functionality checks.' },
  { status: 'ready_for_delivery', label: 'Ready for Delivery', desc: 'Your TV is repaired and ready to be delivered.' },
  { status: 'delivered', label: 'Delivered', desc: 'Your TV has been successfully delivered. Enjoy!' },
];

function getStageIndex(status: TicketStatus): number {
  return STAGES.findIndex((s) => s.status === status);
}

function StatusTimeline({ data }: { data: TrackTicketResponse }) {
  const currentIdx = getStageIndex(data.status);
  const historyMap = new Map(data.statusHistory.map((h) => [h.status, h]));

  const filteredStages = data.statusHistory.some((h) => h.status === 'parts_ordered')
    ? STAGES
    : STAGES.filter((s) => s.status !== 'parts_ordered');

  return (
    <div className="space-y-0">
      {filteredStages.map((stage, i) => {
        const stageIdx = STAGES.indexOf(stage);
        const isDone = stageIdx < currentIdx;
        const isCurrent = stageIdx === currentIdx;
        const historyEntry = historyMap.get(stage.status);
        const isLast = i === filteredStages.length - 1;

        return (
          <div key={stage.status} className="flex gap-4">
            {/* Line + Icon */}
            <div className="flex flex-col items-center">
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isDone
                    ? 'bg-success text-white'
                    : isCurrent
                    ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                    : 'bg-white border-2 border-neutral-200 text-neutral-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : isCurrent ? (
                  <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </div>
              {!isLast && (
                <div className={`w-0.5 flex-1 my-1 min-h-[2rem] ${isDone ? 'bg-success' : 'bg-neutral-200'}`} />
              )}
            </div>

            {/* Content */}
            <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
              <div
                className={`rounded-xl p-4 mb-1 transition-all ${
                  isCurrent
                    ? 'bg-primary-50 border border-primary-200'
                    : isDone
                    ? 'bg-white border border-neutral-200'
                    : 'bg-neutral-50 border border-neutral-100'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={`font-semibold text-sm ${isCurrent ? 'text-primary-800' : isDone ? 'text-neutral-900' : 'text-neutral-400'}`}>
                      {stage.label}
                      {isCurrent && <span className="ml-2 text-xs font-medium text-primary-600 bg-primary-100 px-2 py-0.5 rounded-full">Current</span>}
                    </p>
                    <p className={`text-xs mt-0.5 ${isCurrent ? 'text-primary-600' : isDone ? 'text-neutral-600' : 'text-neutral-400'}`}>
                      {stage.desc}
                    </p>
                    {historyEntry?.note && (
                      <p className="text-xs text-neutral-500 mt-1 italic">Note: {historyEntry.note}</p>
                    )}
                  </div>
                  {historyEntry?.createdAt && (
                    <p className="text-xs text-neutral-400 shrink-0 whitespace-nowrap">
                      {new Date(historyEntry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TrackContent() {
  const searchParams = useSearchParams();
  const [ticketInput, setTicketInput] = useState('');
  const [trackData, setTrackData] = useState<TrackTicketResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<'not_found' | 'invalid' | 'api_error' | null>(null);

  const TICKET_REGEX = /^TVR-\d{4}-\d{4}$/;

  const handleSearch = async (id?: string) => {
    const query = (id || ticketInput).trim().toUpperCase();

    if (!TICKET_REGEX.test(query)) {
      setError('invalid');
      return;
    }

    setLoading(true);
    setError(null);
    setTrackData(null);

    try {
      const response = await publicApi.trackTicket(query);
      setTrackData(response.data);
    } catch (err: unknown) {
      const status = (err as { response?: { status: number } })?.response?.status;
      setError(status === 404 ? 'not_found' : 'api_error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setTicketInput(id);
      handleSearch(id); // eslint-disable-line react-hooks/exhaustive-deps
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-accent-400 text-sm font-semibold uppercase tracking-widest mb-3">Live Tracking</p>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Track Your Repair</h1>
          <p className="text-primary-200 text-lg max-w-xl">Enter your Ticket ID to see the live status of your TV repair.</p>
        </div>
      </section>

      <section className="py-16 bg-neutral-50 min-h-screen">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-6 mb-8">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Ticket ID</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="TVR-2026-0001"
                maxLength={13}
                className="flex-1 border border-neutral-200 rounded-lg px-4 py-2.5 font-mono text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-primary-500 uppercase"
              />
              <button
                onClick={() => handleSearch()}
                disabled={loading}
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-medium rounded-lg transition-all flex items-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {loading ? '' : 'Track'}
              </button>
            </div>
            {error === 'invalid' && (
              <p className="text-xs text-error mt-2 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                Please enter a valid Ticket ID (format: TVR-YYYY-NNNN)
              </p>
            )}
          </div>

          {/* Results */}
          {loading && (
            <div className="text-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-3" />
              <p className="text-neutral-600">Fetching repair status...</p>
            </div>
          )}

          {error === 'not_found' && (
            <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-8 text-center">
              <AlertCircle className="h-10 w-10 text-neutral-400 mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">Ticket Not Found</h2>
              <p className="text-neutral-600 text-sm mb-6">No repair found for <span className="tracking-id">{ticketInput}</span>. Please check the ID and try again.</p>
              <Link href="/book" className="inline-flex items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-600">
                Book a service <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {error === 'api_error' && (
            <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-8 text-center">
              <AlertCircle className="h-10 w-10 text-error mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">Unable to Fetch Status</h2>
              <p className="text-neutral-600 text-sm mb-6">Something went wrong. Please try again or contact us.</p>
              <button onClick={() => handleSearch()} className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Retry
              </button>
            </div>
          )}

          {trackData && (
            <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-6">
              <div className="flex items-start justify-between mb-6 pb-5 border-b border-neutral-100">
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Ticket ID</p>
                  <p className="tracking-id text-base">{trackData.ticketId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-500 mb-1">Service</p>
                  <p className="text-sm font-semibold text-neutral-800">{trackData.serviceType}</p>
                </div>
              </div>

              <StatusTimeline data={trackData} />

              <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
                <p className="text-sm text-neutral-500 mb-3">Need help with your repair?</p>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=Hi, my ticket ID is ${trackData.ticketId}. I need help.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Contact Us on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    }>
      <TrackContent />
    </Suspense>
  );
}
