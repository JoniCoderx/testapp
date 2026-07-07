'use client';

import { useEffect, useState } from 'react';
import { LogoMark } from '@/components/Logo';
import { usePwa } from '@/components/PwaProvider';

const DISMISS_KEY = 'mpx_install_dismissed';

/**
 * Tasteful, dismissible install banner — a compact card anchored bottom-center
 * (respecting the iPhone safe area). It never covers the main content, only
 * renders when an install is actually possible, hides once installed, and
 * remembers dismissal in localStorage.
 */
export default function InstallBanner() {
  const { canInstall, isInstalled, promptInstall } = usePwa();
  const [dismissed, setDismissed] = useState(true); // default hidden until checked
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(DISMISS_KEY) === '1');
    } catch {
      setDismissed(false);
    }
  }, []);

  // Small delay so it slides in after first paint, feeling intentional.
  useEffect(() => {
    if (canInstall && !isInstalled && !dismissed) {
      const t = setTimeout(() => setShow(true), 900);
      return () => clearTimeout(t);
    }
    setShow(false);
  }, [canInstall, isInstalled, dismissed]);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
    setDismissed(true);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
      role="region"
      aria-label="Install app"
    >
      <div
        className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl glass-strong p-3 shadow-glow"
        style={{ animation: 'mpxSheetUp .32s ease-out' }}
      >
        <div className="shrink-0">
          <LogoMark size={40} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-white">
            Install MarketPulse X
          </div>
          <div className="truncate text-xs text-white/50">
            Full-screen, offline-ready market intelligence.
          </div>
        </div>
        <button
          onClick={promptInstall}
          className="btn-primary shrink-0 !px-3.5 !py-2 text-xs"
        >
          Install
        </button>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded-lg p-1.5 text-white/40 transition hover:bg-white/5 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
