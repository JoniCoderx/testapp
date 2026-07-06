import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import AdminPanel from '@/components/AdminPanel';

export const metadata = {
  title: 'Admin · MarketPulse X',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return (
    <>
      <Background />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <AdminPanel />
      </main>
    </>
  );
}
