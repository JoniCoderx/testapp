import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Markets from '@/components/Markets';
import { Footer } from '@/components/Disclaimer';

export const metadata = {
  title: 'Markets · MarketPulse X',
  description:
    'Live quotes and market-moving headlines, powered by Finnhub with graceful demo fallback.',
};

// Data is fetched client-side from the /api routes.
export const dynamic = 'force-dynamic';

export default function MarketsPage() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Markets />
      </main>
      <Footer />
    </>
  );
}
