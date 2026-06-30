import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Providers } from '@/lib/providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'RepairCart — We Fix It Right',
    template: '%s | RepairCart',
  },
  description: 'RepairCart — Professional TV repair, speaker manufacturing, and home theater installation in Mumbai. Certified technicians, genuine parts, same-day service.',
  keywords: ['TV repair', 'LED TV repair', 'Smart TV repair', 'speaker manufacturing', 'home theater', 'RepairCart', 'Mumbai'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'RepairCart',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
