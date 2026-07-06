# MarketPulse X — UI/UX Index

A machine- and human-readable map of the interface: routes, components, design
tokens, and data shapes. Hand this to an AI agent alongside `UIUX_REPORT.md` so
it has full context on what to improve and where. Reflects the hardened
production build (v2).

---

## Routes

| Route | File | Type | Purpose |
| --- | --- | --- | --- |
| `/` | `src/app/page.tsx` | Server | Landing page (hero, features, CTA) |
| `/dashboard` | `src/app/dashboard/page.tsx` | Server shell + client feed | Live signal terminal (read-only) |
| `/admin` | `src/app/admin/page.tsx` | Server + client | Private admin console (`noindex`) |
| `/dashboard` (loading) | `src/app/dashboard/loading.tsx` | Server | Route-level skeleton |
| `*` (404) | `src/app/not-found.tsx` | Server | Not-found screen |
| error boundary | `src/app/error.tsx` | Client | Global error fallback |
| `GET /api/posts` | `src/app/api/posts/route.ts` | API (public, cached, rate-limited) | List/filter/search/sort/paginate posts |
| `GET /api/status` | `src/app/api/status/route.ts` | API (public) | Stats + source health |
| `GET /api/health` | `src/app/api/health/route.ts` | API (public) | Liveness (always 200) |
| `POST /api/fetch` | `src/app/api/fetch/route.ts` | API (**admin**) | Poll sources, cache posts |
| `POST /api/analyze` | `src/app/api/analyze/route.ts` | API (**admin**) | Analyze pending posts |
| `POST /api/admin/refresh` | `src/app/api/admin/refresh/route.ts` | API (**admin**) | Fetch + analyze |

---

## Components

| Component | File | Responsibilities |
| --- | --- | --- |
| `Background` | `src/components/Background.tsx` | Gradient + moving grid + canvas particle network |
| `Navbar` | `src/components/Navbar.tsx` | Brand, nav links, terminal CTA |
| `Hero` | `src/components/Hero.tsx` | Animated hero, tagline, CTAs, stat cards |
| `Ticker` | `src/components/Ticker.tsx` | Infinite marquee of signal categories |
| `FeatureSection` | `src/components/FeatureSection.tsx` | Feature grid, how-it-works, account chips |
| `Dashboard` | `src/components/Dashboard.tsx` | Read-only feed: stat cards, filters, search, sort, cursor pagination, auto-poll, last-updated |
| `Filters` | `src/components/Filters.tsx` | Search, sort toggle, filter chips |
| `PostCard` | `src/components/PostCard.tsx` | Signal card + impact meter (Low/Med/High band) |
| `SourceStatus` | `src/components/SourceStatus.tsx` | Source-health widget from `/api/status` |
| `States` | `src/components/States.tsx` | `SkeletonGrid`, `EmptyState` (filtered vs empty), `ErrorState`, `SourcesDownBanner` |
| `AdminPanel` | `src/components/AdminPanel.tsx` | Secret gate + manual fetch/analyze/refresh |
| `Disclaimer` | `src/components/Disclaimer.tsx` | `DisclaimerBar`, `Footer` |

---

## Design tokens

**Colors** (`tailwind.config.ts`)
- `base.900 #05070d` · `base.800 #080b14` · `base.700 #0c111d` · `base.600 #111827`
- `accent.cyan #22d3ee` · `accent.teal #2dd4bf` · `accent.violet #8b5cf6`
- `accent.emerald #34d399` · `accent.amber #fbbf24` · `accent.rose #fb7185`

**Utilities** (`globals.css`): `.glass`, `.glass-strong`, `.glow-card`,
`.text-gradient`, `.chip`, `.btn-primary`, `.btn-ghost`, `.bg-grid`, `.skeleton`.

**Animations** (`tailwind.config.ts`): `animate-ticker`, `animate-floaty`,
`animate-pulseGlow`, `animate-shimmer`.

**Semantic helpers** (`src/lib/ui.ts`)
- `sentimentStyle(sentiment)` → chip class + dot color
- `impactColor(score)` → `{ label: Low|Medium|High, text, bar, ring, chip }`
  by band **0–30 / 31–60 / 61–100**
- `tagMeta(tag)` → label + border/text color per tag
- `timeAgo(iso)` → relative time string
- `cn(...)` → clsx + tailwind-merge

---

## Data shapes consumed by the UI

`GET /api/posts` → `{ count, filter, sort, hasMore, nextCursor, posts: SerializedPost[] }`

```ts
interface SerializedPost {
  id: string;
  sourcePostId: string;
  url: string;
  text: string;
  authorHandle: string;
  authorName: string | null;
  publishedAt: string;      // ISO
  source: string | null;    // e.g. "nitter:nitter.net"
  analysis: {
    summary: string;
    globalMarketImpact: string;
    cryptoImpact: string;
    impactScore: number;    // 0-100
    sentiment: 'bullish' | 'bearish' | 'neutral' | 'mixed';
    tags: string[];
    model: string | null;   // "gpt-4o-mini" | "heuristic-fallback"
  } | null;                 // null while awaiting analysis
}
```

`GET /api/status` →

```ts
{
  ok: boolean;
  stats: {
    totalPosts; totalAnalyzed; pending;
    highImpactToday; cryptoToday;
    lastSuccessfulFetch: string | null; lastFetchAt: string | null;
  } | null;
  sources: {
    configured: number;
    instances: { url; host; lastSuccessAt: string | null; healthy: boolean }[];
    recent: { windowMinutes; successes; failures };
    allSourcesDown: boolean;   // drives the "sources unavailable" banner
  } | null;
}
```

**Query params (`/api/posts`):** `filter`, `tag`, `sentiment`, `minImpact`,
`search`, `sort` (newest|impact), `limit` (≤100), `cursor`.
**Filter ids:** all · crypto · global · stocks · geopolitics · high-impact ·
bullish · bearish.
**Signal tags:** crypto, stocks, geopolitics, ai, tech, regulation, war, macro,
energy, commodities.

---

## Responsive breakpoints (Tailwind defaults)

| Breakpoint | Feed | Notes |
| --- | --- | --- |
| `< 768px` | 1 col, sidebar stacks on top | compact nav CTA, 2-col stat cards |
| `768–1023px` (`md`) | 2 cols | |
| `≥ 1024px` (`lg`) | feed + 18rem sidebar (source status, impact scale) | |
| `≥ 1536px` (`2xl`) | 3-col feed | |
