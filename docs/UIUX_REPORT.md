# MarketPulse X — UI/UX Report

> A structured review of the current UI/UX, written to be handed to an AI design
> agent for improvement. It documents what exists today, the design system, each
> screen, known strengths and gaps, and concrete, prioritized improvement
> prompts. Pair this with **`UIUX_INDEX.md`** (a component/route map).

- **Product:** MarketPulse X — “Real-time social signals. Market impact decoded by AI.”
- **Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion.
- **Theme:** Premium dark, futuristic “financial terminal” aesthetic.
- **Report date:** 2026-07-06
- **Reviewed build:** initial release (`Build MarketPulse X app`).

---

## 1. Design language (as built)

| Token area | Current value | Where |
| --- | --- | --- |
| Base background | `#05070d` → `#111827` scale (`base`) | `tailwind.config.ts` |
| Accent | Cyan `#22d3ee`, teal `#2dd4bf`, violet `#8b5cf6` | `tailwind.config.ts` |
| Surface | Glassmorphism: `bg-white/[0.03]` + `backdrop-blur-xl` + hairline border | `globals.css` (`.glass`, `.glass-strong`) |
| Elevation on hover | `glow-card`: −3px translate + cyan glow shadow | `globals.css` |
| Text gradient | White→sky→cyan→violet | `globals.css` (`.text-gradient`) |
| Typography | Inter (sans) + JetBrains Mono (numerics/labels) | `layout.tsx` |
| Motion | Framer Motion stagger/reveal; CSS ticker, floaty, pulseGlow, shimmer | `tailwind.config.ts`, components |
| Radii | `rounded-xl` / `rounded-2xl` / `rounded-3xl` | throughout |

**Signal color semantics** (`src/lib/ui.ts`):
- Sentiment — bullish=emerald, bearish=rose, mixed=amber, neutral=slate.
- Impact score bands — 0–24 slate, 25–49 cyan, 50–74 amber, 75–100 rose.
- Tags — each of the 10 tags has a dedicated hue (crypto=amber, stocks=emerald, …).

---

## 2. Screens & flows

### 2.1 Landing (`/` → `src/app/page.tsx`)
- **Hero** (`Hero.tsx`): live pill, gradient headline (the tagline), subhead, dual
  CTAs (“Launch the terminal”, “How it works”), 4 animated stat cards.
- **Ticker** (`Ticker.tsx`): infinite marquee of signal categories.
- **Feature grid** (`FeatureSection.tsx`): 6 capability cards, a 3-step
  “how it works”, and a tracked-accounts chip cloud.
- **Disclaimer** block + CTA + footer.
- Motion: entrance stagger, in-view reveals.

### 2.2 Dashboard / “Signal Feed” (`/dashboard` → `Dashboard.tsx`)
- **Header:** live indicator, title, “Refresh feed” (triggers `/api/fetch` +
  `/api/analyze`).
- **Stat strip:** total / analyzed / pending / last-fetch.
- **Controls** (`Filters.tsx`): search (debounced), sort (newest / highest
  impact), 7 filter chips (All, Crypto, Stocks, Geopolitics, High Impact,
  Bearish, Bullish).
- **Feed:** responsive grid of `PostCard`s (1 / 2 / 3 cols).
- **States** (`States.tsx`): skeleton grid (loading), empty state (with fetch
  CTA), error state (with retry).
- Auto-refresh every 90s; toast-style notice after manual refresh.

### 2.3 Post card (`PostCard.tsx`)
Author (avatar, name, verified glyph, handle, relative time) · sentiment chip ·
post text · **AI summary** · **global market impact** + **crypto impact** panels
· animated **impact meter (0–100)** · **tags** · source label + “View original”.

### 2.4 System pages
- `not-found.tsx` (404), `error.tsx` (error boundary), `dashboard/loading.tsx`
  (route-level skeleton).

---

## 3. Strengths (keep)

1. **Cohesive premium aesthetic** — dark base, glass, glow, and restrained
   accent palette read as a serious product, not a toy.
2. **Information density done well** — the card packs 9+ data points without
   feeling cramped, thanks to clear sectioning and type scale.
3. **Meaningful color semantics** — sentiment and impact bands are learnable and
   consistent across the app (`ui.ts` is the single source of truth).
4. **Robust state coverage** — loading/empty/error are all designed, not
   afterthoughts.
5. **Motion with restraint** — animation supports hierarchy (reveal, meter fill)
   and respects `prefers-reduced-motion`.
6. **Responsive by construction** — fluid grids and mobile nav fallback.

---

## 4. Known gaps / opportunities (prioritized)

### P1 — high impact, low effort
- **No post detail view.** Cards are terminal-only; there’s no `/post/[id]`
  route for a focused read, share, or deep-link.
- **Filters are single-select.** Real triage wants multi-select (e.g. Crypto +
  High Impact) and an impact-score range slider.
- **No “updated just now” affordance** when auto-refresh injects new cards — new
  items should flash/badge so the eye catches them.
- **Accessibility polish:** icon-only buttons need `aria-label`s in a couple of
  spots; verify color-contrast of `text-white/40` on glass (borderline AA).
- **Empty vs. filtered-empty are the same** — distinguish “no data yet” from
  “no results for these filters”.

### P2 — medium
- **Density toggle** (comfortable / compact list) for power users watching many
  signals.
- **Per-account view** — click a handle to filter to that account + show a mini
  profile header.
- **Impact distribution / sentiment sparkline** in the stat strip for at-a-glance
  market mood.
- **Sticky filter bar** on scroll in the dashboard.
- **Keyboard shortcuts** (`/` focus search, `f` cycle filters, `r` refresh).

### P3 — richer product
- **Charts** — timeline of impact scores, tag frequency, per-account cadence
  (see the `dataviz` guidance for palette/marks).
- **Watchlist / alerts** — star accounts or thresholds; toast when a >X impact
  post lands.
- **Theming** — optional “light terminal” and accent presets.
- **Onboarding** — a 3-step first-run explainer of the score/sentiment/tags.

---

## 5. Concrete prompts for the design agent

Copy these into your AI agent, one at a time:

1. *“Design a `/post/[id]` detail screen for MarketPulse X reusing the existing
   glass/glow design system in `globals.css` and the color semantics in
   `src/lib/ui.ts`. Include the full analysis, a share action, and prev/next
   navigation. Provide the React/Tailwind component.”*
2. *“Convert the dashboard filters (`Filters.tsx`) from single-select to
   multi-select chips plus an impact-score range slider, keeping the current
   visual style and updating the `/api/posts` query params accordingly.”*
3. *“Add a sentiment + impact-distribution visualization to the dashboard stat
   strip. Follow the palette and chart rules from the dataviz guidance; keep it
   theme-consistent with the dark UI.”*
4. *“Audit MarketPulse X for WCAG AA: list every contrast or aria gap in the
   components under `src/components/` and return the minimal Tailwind/markup
   fixes.”*
5. *“Propose a ‘new signal’ real-time affordance: when the dashboard auto-refresh
   pulls new posts, how should they enter the grid (motion, badge, sound-off)?
   Give the Framer Motion implementation.”*

---

## 6. How to reproduce the current UI

```bash
npm install
cp .env.example .env      # OPENAI_API_KEY optional locally (heuristic fallback)
npm run db:push
npm run db:seed           # sample posts so the feed renders without Nitter
npm run dev               # http://localhost:3000  and  /dashboard
```

See **`UIUX_INDEX.md`** for the full route/component/token index.
