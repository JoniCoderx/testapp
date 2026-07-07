/**
 * MarketPulse X brand mark — a sharp "X" whose rising diagonal is a market
 * pulse/chart line. Renders transparent (no background) so it can sit inside a
 * styled container or on its own. `withBg` renders the full app-icon look.
 */
export function LogoMark({
  size = 36,
  className = '',
  withBg = true,
}: {
  size?: number;
  className?: string;
  withBg?: boolean;
}) {
  const id = withBg ? 'lm-bg' : 'lm';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0b1426" />
          <stop offset="1" stopColor="#05070d" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="256" cy="120" r="320" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0.22" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-pulse`} x1="150" y1="362" x2="362" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.55" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
      {withBg && (
        <>
          <rect width="512" height="512" rx="112" fill={`url(#${id}-bg)`} />
          <rect width="512" height="512" rx="112" fill={`url(#${id}-glow)`} />
          <rect x="6" y="6" width="500" height="500" rx="106" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="2" />
        </>
      )}
      <path d="M150 150 L362 362" stroke="#8aa0c0" strokeOpacity="0.4" strokeWidth="30" strokeLinecap="round" />
      <path d="M150 362 L196 328 L226 344 L266 288 L306 300 L344 208 L362 150" fill="none" stroke={`url(#${id}-pulse)`} strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="362" cy="150" r="16" fill="#34d399" />
      <circle cx="362" cy="150" r="7" fill="#eafff6" />
    </svg>
  );
}
