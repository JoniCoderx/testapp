# MarketPulse X — UI/UX Report (v2, hardened build)

> A structured review of the current UI/UX, written to be handed to an AI design
> agent for improvement. It documents what exists today, the design system, each
> screen, strengths, remaining gaps, and concrete, prioritized improvement
> prompts. Pair with **`UIUX_INDEX.md`** (a component/route/data map).

- **Product:** MarketPulse X — “Real-time social signals. Market impact decoded by AI.”
- **Live:** marketpulsex.online
- **Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind, Framer Motion.
- **Theme:** Premium dark “financial terminal”.
- **Reviewed build:** `Polish and harden MarketPulse X for production` (v2).

---

## 0. What changed since v1

The app was hardened for production and multi-user traffic. UX-relevant deltas:

- Dashboard is now **read-only** for the public; the refresh button moved to a
  private **`/admin`** console (secret-gated). Public users can never trigger
  OpenAI spend.
- Added **market-intelligence stat cards** (total analyzed, high-impact today,
  crypto today, last successful fetch).
- Added a **source-status widget** + **“sources temporarily unavailable”**
  banner driven by `/api/status` (real `FetchLog` health).
- Added **cursor pagination** (“load more”), a **“last updated”** indicator, and
  an **impact-scale legend** (Low 0–30 / Medium 31–60 / High 61–100).
- New filter **Global Markets**; impact chips now show the Low/Med/High band.
- Backend: read caching, per-IP rate limiting, protected mutations, security
  headers, safe Prisma deploy — all invisible to the UI but relevant to
  perceived speed and reliability.

---

## 1. Design language (as built)

| Token area | Current value | Where |
| --- | --- | --- |
| Base background | `#05070d` → `#111827` scale (`base`) | `tailwind.config.ts` |
| Accent | Cyan `#22d3ee`, teal `#2dd4bf`, violet `#8b5cf6` | `tailwind.config.ts` |
| Surface | Glass: `bg-white/[0.03]` + `backdrop-blur-xl` + hairline border | `globals.css` |
| Hover elevation | `glow-card`: −3px translate + cyan glow | `globals.css` |
| Text gradient | White→sky→cyan→violet | `globals.css` |
| Typography | Inter (sans) + JetBrains Mono (numerics) | `layout.tsx` |
| Motion | Framer stagger/reveal; CSS ticker, floaty, pulseGlow, shimmer | throughout |

**Signal semantics** (`src/lib/ui.ts`): sentiment (emerald/rose/amber/slate);
impact bands (Low cyan / Medium amber / High rose); 10 tag hues.

---

## 2. Screens & flows

- **Landing `/`** — hero (tagline, CTAs, stat cards), ticker, feature grid,
  3-step how-it-works, tracked-account chips, disclaimers, footer.
- **Dashboard `/dashboard`** (read-only) — live indicator + last-updated; 4 stat
  cards; two-column layout (feed + sidebar); filters/search/sort; cursor
  “load more”; skeleton / empty (filtered vs none) / error / sources-down
  states. Sidebar: source-status widget + impact-scale legend.
- **Admin `/admin`** (`noindex`) — secret gate → health snapshot + Fetch /
  Analyze / Full-refresh controls with JSON output. Secret kept in
  `sessionStorage` only.
- **System** — 404, error boundary, route-level skeleton.

---

## 3. Strengths (keep)

1. Cohesive premium aesthetic; reads as a serious product.
2. High information density handled cleanly on the card.
3. Consistent, learnable color semantics (single source of truth in `ui.ts`).
4. Complete state coverage: loading / empty (two kinds) / error / degraded.
5. Honest degraded UX — cached posts + clear banner when sources are down.
6. Motion supports hierarchy and respects `prefers-reduced-motion`.
7. Responsive by construction; sidebar collapses above the feed on mobile.

---

## 4. Remaining gaps / opportunities (prioritized)

### P1 — high impact, low effort
- **No post detail view.** Add `/post/[id]` for a focused read, deep-link, and
  share. Cards currently only exist in the grid.
- **Filters are single-select chips** while the API already supports
  `tag` + `sentiment` + `minImpact` **composably** — expose a multi-facet
  control (chips + an impact-range slider) to use the backend fully.
- **New-post affordance:** auto-refresh silently replaces the grid. New items
  should flash/badge (“+3 new”) so the eye catches them.
- **Accessibility:** a few icon-only controls need `aria-label`s; verify
  `text-white/40` on glass meets AA; add focus-visible rings on chips/buttons.

### P2 — medium
- **Per-account view** — click a handle → filter to it + a mini profile header.
- **Sparkline in stat cards** — impact/sentiment trend for the day.
- **Sticky filter bar** on scroll; **keyboard shortcuts** (`/` search, `r`… but
  read-only, so `g`/`f` to navigate/cycle filters).
- **Density toggle** (comfortable / compact) for power users.

### P3 — richer product
- **Charts** — impact-over-time, tag frequency, per-account cadence (follow the
  `dataviz` skill for palette/marks; keep theme-consistent).
- **Watchlist / thresholds** — star accounts or a min-impact alert.
- **Onboarding** — a 3-step first-run explainer of score/sentiment/tags.
- **Light “terminal” theme** option.

---

## 5. Concrete prompts for the design agent

1. *“Design a `/post/[id]` detail screen reusing the glass/glow system in
   `globals.css` and the semantics in `src/lib/ui.ts`. Include full analysis, a
   share action, and prev/next nav. Return the React/Tailwind component.”*
2. *“Upgrade `Filters.tsx` to a multi-facet control: tag multi-select +
   sentiment + an impact-range slider, wired to the existing `/api/posts` params
   (`tag`, `sentiment`, `minImpact`). Keep the current visual style.”*
3. *“Add a ‘+N new’ affordance to `Dashboard.tsx` when auto-refresh pulls posts
   not already shown, with a Framer Motion enter animation. Don’t reorder the
   user’s scroll position.”*
4. *“Audit the components in `src/components/` for WCAG AA (contrast + aria +
   focus states) and return the minimal Tailwind/markup fixes.”*
5. *“Add a compact impact-over-time chart to the dashboard sidebar using
   `/api/status` + `/api/posts` data. Follow the dataviz palette/marks and match
   the dark theme in both light and dark viewer modes.”*

---

## 6. Reproduce the current UI

```bash
npm install
cp .env.example .env      # set ADMIN_SECRET; OPENAI_API_KEY optional (heuristic fallback)
npm run db:push
npm run db:seed           # sample posts so the feed renders without Nitter
npm run dev               # / , /dashboard , /admin
```

See **`UIUX_INDEX.md`** for the full route/component/token/data map.
