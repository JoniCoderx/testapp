# MarketPulse X

> **Real-time social signals. Market impact decoded by AI.**
> Live at **[marketpulsex.online](https://marketpulsex.online)**

MarketPulse X tracks every new post from the most-followed voices on X/Twitter
and uses AI to estimate how each one might move **global markets** and **crypto
markets** — complete with a short summary, sentiment read, 0–100 impact score,
and signal tags (crypto, stocks, geopolitics, AI, tech, regulation, war, macro,
energy, commodities).

It is built to run **for free**: instead of the paid X API, it pulls public
posts through **Nitter-compatible RSS feeds** with automatic multi-instance
fallback, and caches everything in a database so the app keeps working even when
every feed is temporarily down.

> ⚠️ **Disclaimers:** Not financial advice · AI-generated analysis · Social
> media can be misleading · Impact score is an estimate only.

---

## ✨ Features

- **Premium dark, futuristic UI** — animated particle background, glassmorphism,
  glowing cards, ticker-tape motion, Framer Motion transitions, fully responsive.
- **Landing page** with animated hero and a serious financial-intelligence feel.
- **Live, read-only dashboard** — feed of tracked posts, market-intelligence stat
  cards (total analyzed, high-impact today, crypto today, last successful fetch),
  a **source-status widget**, and a **“last updated”** indicator.
- **Filters** — All · Crypto · Global Markets · Stocks · Geopolitics · High
  Impact · Bullish · Bearish — plus **search**, **sort** (newest / highest
  impact), and **cursor pagination** (“load more”).
- **Private `/admin` console** — enter the `ADMIN_SECRET` to manually trigger
  fetch/analyze. Public users are strictly read-only and can never spend OpenAI
  credits.
- **Multiple FREE sources** — pulls posts from **7 free providers** with a
  modular, swappable interface (no paid X API): **Nitter** (X/Twitter RSS),
  **RSSHub** (X + many platforms), **Mastodon** (account RSS), **Bluesky**
  (public AT Protocol API), **Reddit** (public JSON), **YouTube** (channel
  Atom feeds), and **generic RSS/Atom**. Each tracked account can list several
  sources — they're merged and deduped, so if one is down others still deliver.
- **Resilient ingestion** — multi-instance fallback, dedupe by source post id,
  DB caching, per-instance + per-account fetch audit log, and a clear
  “sources temporarily unavailable” state that still serves cached posts.
- **AI analysis** — strict financial-analyst system prompt returning structured
  JSON with robust parsing/repair. Pluggable provider: **Anthropic Claude**
  (cheapest — Haiku is fractions of a cent per post), **OpenAI**, or a free
  heuristic fallback when no key is configured. Failed posts are left **pending**
  and retried (never crash the app).
- **Production hardening** — protected mutating endpoints, in-memory read cache,
  basic per-IP rate limiting, input validation, and security headers.
- **Cron-ready polling** — standalone worker, every 10–15 min.

---

## 🧱 Tech stack

| Layer     | Choice                                             |
| --------- | -------------------------------------------------- |
| Framework | Next.js 14 (App Router) + React 18 + TypeScript    |
| Styling   | Tailwind CSS + Framer Motion                       |
| Backend   | Next.js API routes (Node runtime)                  |
| Database  | SQLite (local dev) / PostgreSQL (Render) via Prisma|
| AI        | OpenAI Chat Completions (JSON mode)                |
| Source    | Nitter-compatible RSS with multi-instance fallback |

---

## 🚀 Quick start (local)

```bash
# 1. Install dependencies (also runs prisma generate)
npm install

# 2. Configure environment
cp .env.example .env
#   - DATABASE_URL defaults to SQLite (file:./dev.db) — nothing to change
#   - set ADMIN_SECRET to any long random string (needed for /admin + fetch/analyze)
#   - OPENAI_API_KEY is optional locally (a heuristic fallback runs without it)

# 3. Create the database schema
npm run db:push

# 4. (optional) seed sample posts so the feed renders without Nitter
npm run db:seed

# 5. Run the dev server
npm run dev
# → http://localhost:3000  (landing)  ·  /dashboard  (feed)  ·  /admin (console)

# 6. Populate the feed from the /admin console, or via the protected API:
curl -X POST http://localhost:3000/api/fetch   -H "Authorization: Bearer $ADMIN_SECRET"
curl -X POST http://localhost:3000/api/analyze -H "Authorization: Bearer $ADMIN_SECRET"
```

> **Note on Nitter:** public Nitter instances are frequently rate-limited or
> offline. If a fetch returns 0 posts, that's expected — the dashboard shows a
> “sources temporarily unavailable” banner and keeps serving cached posts. Set
> `NITTER_INSTANCES` to currently-healthy instances, or wait and retry.

---

## 🔧 Configuration

| Variable                | Default                                    | Description                                    |
| ----------------------- | ------------------------------------------ | ---------------------------------------------- |
| `AI_PROVIDER`           | `auto`                                     | `anthropic` \| `openai` \| `auto` (prefers Anthropic, then OpenAI, then heuristic). |
| `ANTHROPIC_API_KEY`     | —                                          | **Cheapest option** — Claude key. Haiku costs fractions of a cent per post. |
| `ANTHROPIC_MODEL`       | `claude-haiku-4-5`                         | Claude model (Haiku is the cheapest good one). |
| `OPENAI_API_KEY`        | —                                          | OpenAI key (alternative to Anthropic).         |
| `OPENAI_MODEL`          | `gpt-4o-mini`                              | OpenAI model, if using OpenAI.                 |
| `FINNHUB_API_KEY`       | —                                          | Live market/news data (quotes, market news). Server-side only — never exposed. Missing → demo fallback. |
| `DATABASE_URL`          | `file:./dev.db`                            | SQLite locally; Postgres URL on Render.        |
| `ADMIN_SECRET`          | —                                          | Protects `/admin` + `/api/fetch`, `/api/analyze`, `/api/admin/refresh`. |
| `NITTER_INSTANCES`      | `nitter.net,xcancel.com,nitter.poast.org`  | Comma-separated instances, tried in order.     |
| `POLL_INTERVAL_MINUTES` | `15`                                       | Polling cadence for the cron job.              |
| `MAX_POSTS_PER_ACCOUNT` | `5`                                        | Posts fetched per account per poll.            |
| `TRACKED_HANDLES`       | (config file)                              | Optional comma-separated override of handles.  |

### Tracked accounts

The default list lives in **`config/accounts.ts`** and is easy to edit. You can
also override at runtime with `TRACKED_HANDLES=elonmusk,NASA,BillGates`.

### Free sources & multi-platform accounts

Accounts live in **`config/accounts.ts`**. Each account lists one or more free
`sources`; posts from all of them are merged and deduped. Source types:

| Type | `ref` example | Notes |
| --- | --- | --- |
| `nitter` | `elonmusk` | X/Twitter via Nitter RSS (multi-instance fallback) |
| `rsshub` | `twitter/user/elonmusk` | RSSHub route — X + many platforms |
| `mastodon` | `Gargron@mastodon.social` | Public account RSS |
| `bluesky` | `bsky.app` | Public AT Protocol read API (no auth) |
| `reddit` | `r/CryptoCurrency` | Public JSON (user or subreddit) |
| `youtube` | `UCLA_DiR1FfKNvjuUpBHmylQ` | Channel Atom feed (channel id) |
| `rss` | `https://site/feed.xml` | Any RSS/Atom feed URL |

The default config tracks the top 10 X voices (Nitter + RSSHub each) **plus**
cross-platform accounts on Reddit, YouTube, Bluesky, and Mastodon — so the feed
keeps flowing even when X sources are blocked.

Env knobs: `NITTER_INSTANCES`, `RSSHUB_INSTANCES`, `BLUESKY_API`, and
`ENABLED_SOURCES` (comma-separated allow-list; empty = all).

### Swapping / adding a source

The app depends only on the `PostSource` interface
(`src/lib/sources/types.ts`). Implement it, register it in
`src/lib/sources/index.ts`, and reference it from an account's `sources`.
**No paid X API required.** (If you ever want a paid upgrade, a scraping
provider like ScraperAPI or Apify slots in as just another `PostSource`.)

### Live market data (Finnhub)

The **Markets** page (`/markets`) shows real-time quotes and market-moving
headlines from [Finnhub](https://finnhub.io). The integration is **server-side
only** — the key is read via `process.env.FINNHUB_API_KEY` inside the `/api`
routes (`src/lib/finnhub.ts`) and is **never** shipped to the browser or
inlined into client code.

- **Get a free key:** register at <https://finnhub.io/register> and copy the
  API key. The free tier covers quotes, market news, and company news. The
  `news-sentiment` endpoint is premium — the app handles that gracefully and
  returns `supported: false` rather than erroring.
- **Set it on Render:** open **Render → your Web Service → Environment → Add
  Environment Variable**, key `FINNHUB_API_KEY`, value = your key, then **Save
  Changes** (this triggers a redeploy). The blueprint already declares
  `FINNHUB_API_KEY` with `sync: false`, so you only supply the value.
- **No key? No problem.** If `FINNHUB_API_KEY` is unset (or the provider is
  rate-limited), every route returns clean, clearly-labeled **demo** data and
  the UI shows a "sample market data" banner — the app never crashes.
- **Rate limits:** responses are cached in-memory server-side (quotes 30s,
  market news 5min, company news 10min, sentiment 15min) to stay within
  Finnhub's free-tier limits.

---

## 🌐 API reference

| Method & path                | Auth          | Description                                     |
| ---------------------------- | ------------- | ---------------------------------------------- |
| `GET  /api/posts`            | public (RL)   | List posts. Paginated, cached, filterable.     |
| `GET  /api/status`           | public (RL)   | Stats + source health for the dashboard.       |
| `GET  /api/health`           | public        | Liveness probe (always 200 while up).          |
| `GET  /api/market-news`      | public (RL)   | Live market headlines from Finnhub (`?category=general\|forex\|crypto\|merger`). |
| `GET  /api/quote`            | public (RL)   | Real-time quotes (`?symbols=AAPL,MSFT`). Defaults to a watchlist. |
| `GET  /api/company-news`     | public (RL)   | Company-specific headlines (`?symbol=AAPL&days=7`). |
| `GET  /api/sentiment`        | public (RL)   | News sentiment (`?symbol=AAPL`). Premium on Finnhub free tier → `supported:false`. |
| `POST /api/fetch`            | **admin**     | Poll all accounts and cache new posts.         |
| `POST /api/analyze`          | **admin**     | Analyze posts that have no analysis yet.        |
| `POST /api/admin/refresh`    | **admin**     | Fetch **and** analyze in one call (for cron).  |
| `POST /api/admin/seed`       | **admin**     | Seed labeled demo posts if DB is empty (`?force=true` to override). |
| `GET  /api/admin/debug`      | **admin**     | Diagnostics: DB/tables/counts/last fetch/errors. |

`(RL)` = rate-limited per IP. Admin endpoints require
`Authorization: Bearer <ADMIN_SECRET>` (or `x-admin-secret: <ADMIN_SECRET>`).

### `GET /api/posts` query params

| Param       | Example              | Notes                                             |
| ----------- | -------------------- | ------------------------------------------------- |
| `filter`    | `crypto`             | all · crypto · global · stocks · geopolitics · high-impact · bullish · bearish |
| `tag`       | `macro`              | one of the 10 signal tags                          |
| `sentiment` | `bearish`            | bullish · bearish · neutral · mixed                |
| `minImpact` | `61`                 | 0–100 minimum impact score                          |
| `search`    | `tariffs`            | free-text (post/author/summary), ≤120 chars        |
| `sort`      | `impact`             | `newest` (default) or `impact`                     |
| `limit`     | `30`                 | page size, default 30, **max 100**                 |
| `cursor`    | `<post id>`          | from a previous response's `nextCursor`            |

Response: `{ count, filter, sort, hasMore, nextCursor, posts[] }`.

**AI output shape** (per post):

```json
{
  "summary": "short summary",
  "globalMarketImpact": "short explanation",
  "cryptoImpact": "short explanation",
  "impactScore": 0,
  "sentiment": "bullish | bearish | neutral | mixed",
  "tags": ["crypto", "stocks"]
}
```

---

## 🔐 Admin page usage

1. Navigate to **`/admin`** (unlisted, `noindex`).
2. Enter your **`ADMIN_SECRET`**. It is stored **only in the browser tab**
   (`sessionStorage`) — never sent to the repo, never persisted server-side, and
   cleared on **Lock** or when the tab closes.
3. Use **Run full refresh**, **Fetch posts**, **Analyze pending**, or **Seed
   demo data**, and read the **Production diagnostics** panel (DB/tables/counts/
   last fetch/errors).

Public visitors have **no** way to trigger fetch/analyze — only cached, already
analyzed posts are served to them.

### Where to find the admin password

**The app does not create or store a password.** The admin login accepts exactly
one value: whatever you set as the **`ADMIN_SECRET`** environment variable on the
server. There is no default and nothing is hard-coded.

- **On Render:** open **Render → your Web Service → Environment →
  `ADMIN_SECRET`** and copy the exact value into the `/admin` login.
- If you deployed via the `render.yaml` blueprint, `ADMIN_SECRET` is
  **auto-generated by Render** on first deploy (`generateValue: true`) — so it's a
  random string you copy from that Environment page. You can also replace it with
  a value of your own choosing and redeploy.
- **Locally:** it's the `ADMIN_SECRET` in your `.env` file.

If login fails with *“Wrong secret”*, you're not using the value from the
Environment page. Trailing spaces are trimmed on both sides, so a stray space
won't matter — but the rest must match exactly.

---

## 🗄️ Database & Prisma (safe production practices)

Models: **Account**, **Post**, **Analysis**, **FetchLog**
(`prisma/schema.prisma`), with indexes on `Post.publishedAt`,
`Post.authorHandle`, `Post.url`, `Analysis.impactScore`, `Analysis.sentiment`,
and composite `FetchLog` indexes for source-health queries.

The Prisma datasource `provider` is set automatically by
`scripts/prepare-db.mjs` from `DATABASE_URL` (`file:` → sqlite, `postgres://` →
postgresql), so the same codebase works on both with no manual edits.

```bash
npm run db:push     # dev: sync schema to the database
npm run db:deploy   # prod: prisma db push --skip-generate  (NO --accept-data-loss)
npm run db:studio   # open Prisma Studio
npm run poll        # run one fetch + analyze pass (the cron worker)
```

> **Safety:** production schema sync uses `prisma db push` **without**
> `--accept-data-loss`. If a change would drop data it will stop rather than
> silently destroy it. For destructive migrations, review and run them
> deliberately with `prisma migrate`.

---

## ☁️ Deploying to Render

The included **`render.yaml` Blueprint** provisions everything and tracks the
`main` branch:

1. A **PostgreSQL** database (`marketpulse-db`).
2. A **Web Service** (`marketpulse-x`).
3. A **Cron Job** (`marketpulse-poller`) running `npm run poll` every 15 min —
   the only automatic path that spends OpenAI credits.

### One-click (Blueprint)

1. Push to GitHub → in Render: **New → Blueprint**, select the repo.
2. Set the **`OPENAI_API_KEY`** secret on both the web service and the cron job.
   `ADMIN_SECRET` is auto-generated; copy it from the dashboard to use `/admin`.
3. **Apply.**

### Web Service settings (manual)

| Setting            | Value                              |
| ------------------ | ---------------------------------- |
| Build command      | `npm install && npm run build`     |
| Start command      | `npm run start:prod`               |
| Health check path  | `/api/health`                      |
| Environment        | `DATABASE_URL`, `OPENAI_API_KEY`, `ADMIN_SECRET`, `NITTER_INSTANCES`, `OPENAI_MODEL`, `POLL_INTERVAL_MINUTES`, `MAX_POSTS_PER_ACCOUNT` |

`npm run start:prod` runs `prisma db push` **at container start** (when Postgres
is reachable) and then `next start`. This guarantees the schema exists before
traffic arrives — the key fix for cold-start `503`s. `/api/health` always
returns `200` while the process is alive (DB status is reported in the body), so
a transient DB blip never takes the whole site down.

### Cron Job settings (manual)

| Setting        | Value                          |
| -------------- | ------------------------------ |
| Command        | `npm run poll`                 |
| Schedule       | `*/15 * * * *` (every 15 min)  |
| Environment    | `DATABASE_URL`, `OPENAI_API_KEY`, `NITTER_INSTANCES`, `OPENAI_MODEL`, `MAX_POSTS_PER_ACCOUNT` |

Alternatively, a Render Cron Job can curl the protected endpoint:

```bash
curl -X POST "$APP_URL/api/admin/refresh" -H "Authorization: Bearer $ADMIN_SECRET"
```

Keep the cadence at **10–15 minutes** to respect public-instance rate limits.

### Custom domain & DNS

The blueprint declares both `marketpulsex.online` and `www.marketpulsex.online`
on the web service, so Render registers them automatically on deploy. You still
have to point DNS at Render and let it issue the TLS certificate:

**1. Add/confirm the domains in Render**
Render dashboard → **marketpulse-x** service → **Settings → Custom Domains**.
Each domain shows a **verification status** and the **exact target** to use
(the `…onrender.com` hostname is unique to your service — copy it from here).

**2. Set these DNS records at your domain registrar / DNS provider**

| Type  | Host / Name | Value                                   | Notes |
| ----- | ----------- | --------------------------------------- | ----- |
| `A`     | `@` (apex `marketpulsex.online`) | `216.24.57.1`             | Render's load-balancer IP for apex domains. |
| `CNAME` | `www`       | `‹your-service›.onrender.com`           | Use the exact hostname Render shows in Custom Domains. |

- If your DNS provider supports **ALIAS/ANAME** at the apex (Cloudflare,
  Namecheap, DNSimple, etc.), you may instead point the apex with an
  `ALIAS`/`ANAME` → `‹your-service›.onrender.com` rather than the `A` record.
- **Cloudflare:** set both records to **DNS only (grey cloud)** until Render
  finishes verification and issues the certificate. You can re-enable the proxy
  (orange cloud) afterwards with SSL mode **Full (strict)**.
- Remove any old/parked `A`/`CNAME`/`ALIAS` records for `@` and `www` that point
  elsewhere — stale records are the usual reason a domain "doesn't resolve".

**3. Wait for propagation + certificate**
DNS can take from a few minutes up to ~24–48h (usually fast). Once Render's
Custom Domains page shows the domain **Verified**, it auto-provisions a free
Let's Encrypt certificate — **HTTPS then works with no further action**.

**4. Verify**

```bash
dig +short marketpulsex.online            # → 216.24.57.1
dig +short www.marketpulsex.online         # → ‹your-service›.onrender.com
curl -I https://marketpulsex.online/api/health   # → HTTP/2 200
```

> **Installed-PWA note:** if you added the app to your home screen while the
> domain was down, the PWA may show a stale cached shell (which can look like
> "scrolling is frozen"). Once the domain resolves again, the service worker
> (`mpx-v2`, network-first navigations) fetches fresh HTML, purges old caches,
> and normal scrolling returns. To force it immediately: reopen in the browser,
> hard-refresh, or reinstall the PWA.

---

## 🩺 Troubleshooting

**Dashboard shows "No signals yet" / empty stats after deploy**
1. Open **`/admin`**, enter `ADMIN_SECRET` → the **Production diagnostics** panel
   shows `DB connected`, `Tables exist`, counts, the last fetch log, and the last
   error. Use this first — it tells you exactly what's wrong.
2. If **Tables exist = no**: the schema wasn't created. The app auto-runs
   `prisma db push` at boot (see `src/lib/ensure-schema.ts`) on a Postgres
   `DATABASE_URL`; ensure `DATABASE_URL` is set on the web service, then redeploy.
   The build command also runs `npx prisma db push`.
3. If **Tables exist = yes** but empty: click **Run full refresh** (fetches +
   analyzes) or **Seed demo data**. Public Nitter instances are often blocked, so
   if fetch fails, seeding (or `DEMO_FALLBACK=true`) gives immediate content.
4. `/api/status` and `/api/posts` always return HTTP 200 — a blank dashboard is
   a data problem, not a crash. Check `/api/admin/debug` for the root cause.

**`DEMO_FALLBACK`** — when `true` (default in `render.yaml`), an empty DB serves
clearly-labeled demo posts so the site is never blank. Set to `false` once live
data is flowing.

## 🆓 Free-source limitations

- Public Nitter instances are unreliable and rate-limited; expect intermittent
  empty fetches. The app is designed around this: it caches posts and shows a
  clear degraded state instead of breaking.
- Add or replace instances via `NITTER_INSTANCES` at any time (no redeploy of
  code needed — just update the env var).
- No paid X API is used anywhere. OpenAI is the only paid dependency, and it is
  optional (heuristic fallback) and cost-controlled (only new posts, `gpt-4o-mini`
  by default, admin/cron-triggered only).

---

## 🧪 Verifying the build

```bash
npm install       # installs deps + generates Prisma client
npm run lint      # eslint
npm run build     # prepare-db + prisma generate + next build
npm run start:prod # migrate + serve production build
```

---

## 📁 Project structure

```
config/accounts.ts          # editable tracked-account list
prisma/schema.prisma        # Account, Post, Analysis, FetchLog (+ indexes)
scripts/prepare-db.mjs      # auto-selects sqlite/postgres provider
scripts/poll.ts             # standalone fetch+analyze worker (cron)
scripts/seed.ts             # optional demo seed
src/lib/sources/            # modular source layer (Nitter RSS + interface)
src/lib/ai/analyze.ts       # OpenAI analysis (+ JSON repair, heuristic fallback)
src/lib/pipeline.ts         # fetch → dedupe → cache → analyze (+ source logging)
src/lib/cache.ts            # shared read cache
src/lib/rate-limit.ts       # per-IP rate limiter
src/lib/auth.ts             # admin auth guard
src/app/api/                # posts, status, fetch, analyze, health, admin/refresh
src/app/page.tsx            # landing page
src/app/dashboard/          # live terminal (read-only)
src/app/admin/              # private admin console
src/components/             # UI: hero, cards, filters, source status, states, admin
docs/                       # UI/UX report + index for design agents
render.yaml                 # Render blueprint (web + cron + postgres)
```

---

## License

MIT — for informational purposes only. Not financial advice.
