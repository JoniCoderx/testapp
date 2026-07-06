# MarketPulse X — UI/UX Index

A machine- and human-readable map of the interface: routes, components, design
tokens, and data shapes. Hand this to an AI agent alongside `UIUX_REPORT.md` so
it has full context on what to improve and where.

---

## Routes

| Route | File | Type | Purpose |
| --- | --- | --- | --- |
| `/` | `src/app/page.tsx` | Server | Landing page (hero, features, CTA) |
| `/dashboard` | `src/app/dashboard/page.tsx` | Server shell + client feed | Live signal terminal |
| `/dashboard` (loading) | `src/app/dashboard/loading.tsx` | Server | Route-level skeleton |
| `*` (404) | `src/app/not-found.tsx` | Server | Not-found screen |
| error boundary | `src/app/error.tsx` | Client | Global error fallback |
| `GET /api/posts` | `src/app/api/posts/route.ts` | API | List/filter/search/sort posts |
| `POST /api/fetch` | `src/app/api/fetch/route.ts` | API | Poll sources, cache posts |
| `POST /api/analyze` | `src/app/api/analyze/route.ts` | API | Analyze pending posts |
| `GET /api/health` | `src/app/api/health/route.ts` | API | Health + stats + config |
| `POST /api/admin/refresh` | `src/app/api/admin/refresh/route.ts` | API | Protected fetch+analyze |

---

## Components

| Component | File | Client? | Responsibilities |
| --- | --- | --- | --- |
| `Background` | `src/components/Background.tsx` | ✅ | Gradient + moving grid + canvas particle network |
| `Navbar` | `src/components/Navbar.tsx` | ✅ | Brand, nav links, terminal CTA |
| `Hero` | `src/components/Hero.tsx` | ✅ | Animated hero, tagline, CTAs, stat cards |
| `Ticker` | `src/components/Ticker.tsx` | ✅ | Infinite marquee of signal categories |
| `FeatureSection` | `src/components/FeatureSection.tsx` | ✅ | Feature grid, 3-step how-it-works, account chips |
| `Dashboard` | `src/components/Dashboard.tsx` | ✅ | Feed container: fetch, filter, sort, search, refresh, auto-poll |
| `Filters` | `src/components/Filters.tsx` | ✅ | Search input, sort toggle, filter chips |
| `PostCard` | `src/components/PostCard.tsx` | ✅ | Single signal card + impact meter |
| `States` | `src/components/States.tsx` | ✅ | `SkeletonGrid`, `EmptyState`, `ErrorState` |
| `Disclaimer` | `src/components/Disclaimer.tsx` | – | `DisclaimerBar`, `Footer` |

---

## Design tokens

**Colors** (`tailwind.config.ts`)
- `base.900 #05070d` · `base.800 #080b14` · `base.700 #0c111d` · `base.600 #111827`
- `accent.cyan #22d3ee` · `accent.teal #2dd4bf` · `accent.violet #8b5cf6`
- `accent.emerald #34d399` · `accent.amber #fbbf24` · `accent.rose #fb7185`

**Utilities** (`globals.css`)
- Surfaces: `.glass`, `.glass-strong`
- Elevation: `.glow-card`
- Text: `.text-gradient`
- Chips/buttons: `.chip`, `.btn-primary`, `.btn-ghost`
- Backdrops: `.bg-grid`, `.skeleton` (shimmer)

**Animations** (`tailwind.config.ts`)
- `animate-ticker` (40s marquee) · `animate-floaty` · `animate-pulseGlow` ·
  `animate-shimmer`

**Semantic helpers** (`src/lib/ui.ts`)
- `sentimentStyle(sentiment)` → chip class + dot color
- `impactColor(score)` → text/bar/ring by 0–24 / 25–49 / 50–74 / 75–100 band
- `tagMeta(tag)` → label + border/text color per tag
- `timeAgo(iso)` → relative time string
- `cn(...)` → clsx + tailwind-merge

---

## Data shape consumed by the UI

`GET /api/posts` → `{ count, filter, sort, posts: SerializedPost[] }`

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
    tags: string[];         // subset of the 10 signal tags
    model: string | null;   // e.g. "gpt-4o-mini" | "heuristic-fallback"
  } | null;                 // null while awaiting analysis
}
```

**Filter ids:** `all`, `crypto`, `stocks`, `geopolitics`, `high-impact`,
`bearish`, `bullish`
**Sort ids:** `newest`, `impact`
**Signal tags:** `crypto`, `stocks`, `geopolitics`, `ai`, `tech`, `regulation`,
`war`, `macro`, `energy`, `commodities`

---

## Responsive breakpoints (Tailwind defaults)

| Breakpoint | Feed columns | Notable changes |
| --- | --- | --- |
| `< 768px` (mobile) | 1 | Compact nav CTA, stacked stats (2-col) |
| `768–1279px` (`md`) | 2 | Full nav pill hidden `< sm` |
| `≥ 1280px` (`xl`) | 3 | Widest feed grid |

---

## Screenshots

Regenerate anytime with the built-in dev flow (`npm run dev`) and capture `/`
and `/dashboard`. The design agent should review both the landing and the
dashboard feed with at least one seeded post (`npm run db:seed`).
