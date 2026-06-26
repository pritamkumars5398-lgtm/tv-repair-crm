import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TV Repair CRM',
  description: 'TV Repair CRM frontend for customers, technicians, managers, and admins.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
