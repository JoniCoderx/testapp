import Link from 'next/link';
import { LogoMark } from '@/components/Logo';

export const metadata = { title: 'Offline · MarketPulse X' };

export default function OfflinePage() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-base-900 px-6 text-center">
      <LogoMark size={72} />
      <h1 className="mt-6 text-2xl font-bold text-white">You&apos;re offline</h1>
      <p className="mt-2 max-w-sm text-sm text-white/50">
        MarketPulse X can&apos;t reach the network right now. Cached signals may
        still be available — reconnect to load the latest market intelligence.
      </p>
      <Link href="/dashboard" className="btn-primary mt-8">
        Try the dashboard
      </Link>
    </main>
  );
}
