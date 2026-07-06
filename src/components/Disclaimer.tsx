export const DISCLAIMERS = [
  'Not financial advice.',
  'AI-generated analysis.',
  'Social media can be misleading.',
  'Impact score is an estimate only.',
];

export function DisclaimerBar({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-[11px] leading-relaxed text-white/40">
        {DISCLAIMERS.join(' · ')}
      </p>
    );
  }
  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300/80">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.2A2 2 0 003.83 21h16.34a2 2 0 001.72-2.94l-8.18-14.2a2 2 0 00-3.42 0z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Important disclaimers
      </div>
      <ul className="grid gap-1.5 text-sm text-white/55 sm:grid-cols-2">
        {DISCLAIMERS.map((d) => (
          <li key={d} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-amber-400/60" />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
          MarketPulse <span className="text-accent-cyan">X</span>
        </div>
        <DisclaimerBar compact />
        <p className="text-[11px] text-white/30">
          © {new Date().getFullYear()} MarketPulse X · Real-time social signals.
          Market impact decoded by AI. · For informational purposes only.
        </p>
      </div>
    </footer>
  );
}
