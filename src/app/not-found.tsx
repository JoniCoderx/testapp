import Link from 'next/link';
import Background from '@/components/Background';

export default function NotFound() {
  return (
    <>
      <Background />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="font-mono text-7xl font-black text-gradient">404</div>
        <h1 className="mt-4 text-2xl font-bold text-white">Signal not found</h1>
        <p className="mt-2 max-w-sm text-white/50">
          This route drifted off the tape. Head back to the terminal to keep
          watching the markets.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="btn-ghost">
            Home
          </Link>
          <Link href="/dashboard" className="btn-primary">
            Open terminal
          </Link>
        </div>
      </main>
    </>
  );
}
