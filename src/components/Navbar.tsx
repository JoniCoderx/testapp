'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/ui';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/api/health', label: 'Status', external: true },
  ];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-40 w-full"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet shadow-glow">
            <span className="absolute inset-0 animate-pulseGlow rounded-xl bg-accent-cyan/30 blur-md" />
            <svg viewBox="0 0 24 24" className="relative h-5 w-5 text-base-900" fill="none">
              <path
                d="M3 17l4-6 3 3 4-8 4 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-white">
              MarketPulse <span className="text-accent-cyan">X</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Signal Intelligence
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full glass px-1.5 py-1.5 sm:flex">
          {links.map((l) => {
            const active = !l.external && pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition',
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white',
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/dashboard" className="btn-primary hidden sm:inline-flex">
          Open Terminal
        </Link>
        <Link href="/dashboard" className="btn-primary sm:hidden !px-3 !py-2 text-xs">
          Terminal
        </Link>
      </div>
    </motion.header>
  );
}
