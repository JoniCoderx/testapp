import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Dashboard from '@/components/Dashboard';
import { Footer } from '@/components/Disclaimer';

export const metadata = {
  title: 'Dashboard · MarketPulse X',
  description:
    'Live feed of AI-decoded market impact from the most-followed accounts on X.',
};

// Always render fresh; data is loaded client-side from the API.
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <>
      <Background />
      <Navbar />
      <div className="mt-3">
        <Ticker />
      </div>
      <main>
        <Dashboard />
      </main>
      <Footer />
    </>
  );
}
