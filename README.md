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
- **Modular source layer** — Nitter RSS today; swap in the X API, RSSHub, or a
  scraping provider by implementing one interface.
- **Resilient ingestion** — multi-instance fallback, dedupe by source post id,
  DB caching, per-instance + per-account fetch audit log, and a clear
  “sources temporarily unavailable” state that still serves cached posts.
- **AI analysis** — strict financial-analyst system prompt returning structured
  JSON with robust parsing/repair; heuristic fallback when no key is configured;
  failed posts are left **pending** and retried (never crash the app).
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
| `OPENAI_API_KEY`        | —                                          | OpenAI key. Without it, a heuristic fallback runs. |
| `OPENAI_MODEL`          | `gpt-4o-mini`                              | Model used for analysis (cost control).        |
| `DATABASE_URL`          | `file:./dev.db`                            | SQLite locally; Postgres URL on Render.        |
| `ADMIN_SECRET`          | —                                          | Protects `/admin` + `/api/fetch`, `/api/analyze`, `/api/admin/refresh`. |
| `NITTER_INSTANCES`      | `nitter.net,xcancel.com,nitter.poast.org`  | Comma-separated instances, tried in order.     |
| `POLL_INTERVAL_MINUTES` | `15`                                       | Polling cadence for the cron job.              |
| `MAX_POSTS_PER_ACCOUNT` | `5`                                        | Posts fetched per account per poll.            |
| `TRACKED_HANDLES`       | (config file)                              | Optional comma-separated override of handles.  |

### Tracked accounts

The default list lives in **`config/accounts.ts`** and is easy to edit. You can
also override at runtime with `TRACKED_HANDLES=elonmusk,NASA,BillGates`.

### Swapping the data source

The app depends only on the `PostSource` interface
(`src/lib/sources/types.ts`). Implement it and select it in
`src/lib/sources/index.ts` — nothing else changes. **No paid X API required.**

---

## 🌐 API reference

| Method & path                | Auth          | Description                                     |
| ---------------------------- | ------------- | ---------------------------------------------- |
| `GET  /api/posts`            | public (RL)   | List posts. Paginated, cached, filterable.     |
| `GET  /api/status`           | public (RL)   | Stats + source health for the dashboard.       |
| `GET  /api/health`           | public        | Liveness probe (always 200 while up).          |
| `POST /api/fetch`            | **admin**     | Poll all accounts and cache new posts.         |
| `POST /api/analyze`          | **admin**     | Analyze posts that have no analysis yet.        |
| `POST /api/admin/refresh`    | **admin**     | Fetch **and** analyze in one call (for cron).  |

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
3. Use **Fetch posts**, **Analyze pending**, or **Full refresh** to run the
   pipeline on demand. A live health snapshot is shown above the controls.

Public visitors have **no** way to trigger fetch/analyze — only cached, already
analyzed posts are served to them.

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

### Custom domain

Point **marketpulsex.online** at the web service in Render → **Settings →
Custom Domains**, and add the DNS records Render shows. `metadataBase` is already
set to the domain.

---

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
