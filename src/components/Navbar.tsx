'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/ui';
import { LogoMark } from '@/components/Logo';
import { usePwa } from '@/components/PwaProvider';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/markets', label: 'Markets' },
  { href: '/api/health', label: 'Status', external: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const { canInstall, promptInstall } = usePwa();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll + escape-to-close while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="safe-top sticky top-0 z-40 w-full border-b border-white/[0.06] bg-base-900/70 backdrop-blur-xl"
    >
      <div className="safe-x mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="MarketPulse X home">
          <LogoMark size={38} className="shrink-0" />
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-white">
              MarketPulse <span className="text-accent-cyan">X</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Signal Intelligence
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 rounded-full glass px-1.5 py-1.5 md:flex">
          {LINKS.map((l) => {
            const active = !l.external && pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition',
                  active ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white',
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {canInstall && (
            <button
              onClick={promptInstall}
              className="btn-ghost hidden !py-2 text-xs md:inline-flex"
            >
              Install app
            </button>
          )}
          <Link href="/dashboard" className="btn-primary hidden !py-2 text-sm sm:inline-flex">
            Open Terminal
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/80 transition hover:border-white/25 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/[0.06] bg-base-900/95 backdrop-blur-xl md:hidden"
          >
            <nav className="safe-x mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              {LINKS.map((l) => {
                const active = !l.external && pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-xl px-4 py-3 text-base font-medium transition',
                      active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="btn-primary mt-1 w-full"
              >
                Open Terminal
              </Link>
              {canInstall && (
                <button
                  onClick={() => {
                    setOpen(false);
                    promptInstall();
                  }}
                  className="btn-ghost w-full"
                >
                  Install MarketPulse X
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
