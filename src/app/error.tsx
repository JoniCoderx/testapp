'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base-900 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-300">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
          <path d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.2A2 2 0 0 0 3.83 21h16.34a2 2 0 0 0 1.72-2.94l-8.18-14.2a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-5 text-2xl font-bold text-white">Something broke</h1>
      <p className="mt-2 max-w-sm text-white/50">
        An unexpected error occurred. You can retry, or head back to the
        terminal.
      </p>
      <div className="mt-8 flex gap-3">
        <button onClick={reset} className="btn-primary">
          Try again
        </button>
        <Link href="/dashboard" className="btn-ghost">
          Terminal
        </Link>
      </div>
    </main>
  );
}
