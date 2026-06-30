import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { ChatbotWidget } from '@/components/shared/ChatbotWidget';
import { AOSProvider } from '@/components/shared/AOSProvider';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AOSProvider />
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ChatbotWidget />
    </>
  );
}
