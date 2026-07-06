# MarketPulse X

> **Real-time social signals. Market impact decoded by AI.**

MarketPulse X tracks every new post from the most-followed voices on X/Twitter
and uses AI to estimate how each one might move **global markets** and **crypto
markets** — complete with a short summary, sentiment read, 0–100 impact score,
and signal tags (crypto, stocks, geopolitics, AI, tech, regulation, war, macro,
energy, commodities).

It is built to run **for free**: instead of the paid X API, it pulls public
posts through **Nitter-compatible RSS feeds** with automatic multi-instance
fallback, and caches everything in a database so the app keeps working even when
a feed is temporarily down.

> ⚠️ **Disclaimers:** Not financial advice · AI-generated analysis · Social
> media can be misleading · Impact score is an estimate only.

---

## ✨ Features

- **Premium dark, futuristic UI** — animated particle background, glassmorphism,
  glowing cards, ticker-tape motion, Framer Motion transitions, fully responsive.
- **Landing page** with animated hero and a serious financial-intelligence feel.
- **Live dashboard** — feed of tracked posts with:
  account, handle, time, text, link to original, AI summary, global-market
  impact, crypto impact, impact score, sentiment, and tags.
- **Filters** — All · Crypto · Stocks · Geopolitics · High Impact · Bearish ·
  Bullish — plus **search** and **sort by newest / highest impact**.
- **Modular source layer** — Nitter RSS today; swap in the X API, RSSHub, or a
  scraping provider by implementing one interface.
- **Resilient ingestion** — multi-instance fallback, dedupe by source post id,
  DB caching, and a full fetch audit log.
- **AI analysis** — strict financial-analyst system prompt returning structured
  JSON, with a deterministic heuristic fallback when OpenAI is unavailable.
- **Cron-ready polling** — HTTP endpoint or standalone worker, every 10–15 min.

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
#   - set OPENAI_API_KEY (optional locally — heuristic fallback works without it)
#   - DATABASE_URL defaults to SQLite (file:./dev.db) — nothing to change

# 3. Create the database schema
npm run db:push

# 4. Run the dev server
npm run dev
# → http://localhost:3000  (landing)  ·  /dashboard  (live feed)

# 5. Populate the feed (fetch + analyze)
curl -X POST http://localhost:3000/api/fetch
curl -X POST http://localhost:3000/api/analyze
#   …or just click "Refresh feed" in the dashboard.
```

> **Note on Nitter:** public Nitter instances are frequently rate-limited or
> offline. If a fetch returns 0 posts, that's expected — try again later, or set
> `NITTER_INSTANCES` to instances that are currently healthy. Cached posts keep
> the app populated in the meantime.

---

## 🔧 Configuration

All configuration is via environment variables (see `.env.example`):

| Variable                | Default                                    | Description                                    |
| ----------------------- | ------------------------------------------ | ---------------------------------------------- |
| `OPENAI_API_KEY`        | —                                          | OpenAI key. Without it, a heuristic fallback runs. |
| `OPENAI_MODEL`          | `gpt-4o-mini`                              | Model used for analysis.                       |
| `DATABASE_URL`          | `file:./dev.db`                            | SQLite locally; Postgres URL on Render.        |
| `ADMIN_SECRET`          | —                                          | Protects `POST /api/admin/refresh`.            |
| `NITTER_INSTANCES`      | `nitter.net,xcancel.com,nitter.poast.org`  | Comma-separated instances, tried in order.     |
| `POLL_INTERVAL_MINUTES` | `15`                                       | Polling cadence for the cron job.              |
| `MAX_POSTS_PER_ACCOUNT` | `5`                                        | Posts fetched per account per poll.            |
| `TRACKED_HANDLES`       | (config file)                              | Optional comma-separated override of handles.  |

### Tracked accounts

The default list of accounts lives in **`config/accounts.ts`** and is easy to
edit:

```ts
export const DEFAULT_ACCOUNTS = [
  { handle: 'elonmusk', displayName: 'Elon Musk' },
  { handle: 'realDonaldTrump', displayName: 'Donald J. Trump' },
  // …
];
```

You can also override the handles at runtime without touching code by setting
`TRACKED_HANDLES=elonmusk,NASA,BillGates`.

### Swapping the data source

The app depends only on the `PostSource` interface
(`src/lib/sources/types.ts`). To replace Nitter with the X API, RSSHub, or a
scraping provider, implement that interface and select it in
`src/lib/sources/index.ts` — nothing else needs to change.

---

## 🌐 API reference

| Method & path                | Auth          | Description                                     |
| ---------------------------- | ------------- | ---------------------------------------------- |
| `GET  /api/posts`            | public        | List posts. Query: `filter`, `search`, `sort`, `limit`. |
| `POST /api/fetch`            | public        | Poll all accounts and cache new posts.         |
| `POST /api/analyze`          | public        | Analyze posts that have no analysis yet.        |
| `GET  /api/health`           | public        | Health + stats + config check.                 |
| `POST /api/admin/refresh`    | `ADMIN_SECRET`| Fetch **and** analyze in one call (for cron).  |

**Admin auth** — send the secret as either header:

```bash
curl -X POST https://your-app.onrender.com/api/admin/refresh \
  -H "Authorization: Bearer $ADMIN_SECRET"
# or:  -H "x-admin-secret: $ADMIN_SECRET"
```

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

## 🗄️ Database & Prisma

Models: **Account**, **Post**, **Analysis**, **FetchLog** (see
`prisma/schema.prisma`).

The Prisma datasource `provider` is set automatically by
`scripts/prepare-db.mjs` based on `DATABASE_URL`:

- `file:./dev.db` → **sqlite** (local)
- `postgresql://…` → **postgresql** (Render)

This runs before `prisma generate`, `npm run db:push`, and `npm run build`, so
the same codebase works for both databases with no manual edits.

Useful commands:

```bash
npm run db:push     # sync schema to the database
npm run db:studio   # open Prisma Studio
npm run poll        # run one fetch + analyze pass (the cron worker)
```

---

## ☁️ Deploying to Render

This repo includes a **`render.yaml` Blueprint** that provisions everything:

1. A **PostgreSQL** database (`marketpulse-db`).
2. A **Web Service** running the Next.js app.
3. A **Cron Job** (`marketpulse-poller`) that runs `npm run poll` every 15 min.

### One-click (Blueprint)

1. Push this repo to GitHub.
2. In Render: **New → Blueprint**, select the repo. Render reads `render.yaml`.
3. When prompted, set the **`OPENAI_API_KEY`** secret on both the web service
   and the cron job (all other vars are wired up automatically, and
   `ADMIN_SECRET` is auto-generated).
4. Click **Apply**. Render will build, run `prisma db push` via the
   pre-deploy step, and start the app. Health check: `/api/health`.

### Manual (single Web Service)

If you prefer to configure by hand:

- **Build command:** `npm install && npm run build`
- **Pre-deploy command:** `npm run db:deploy`  _(runs `prisma db push`)_
- **Start command:** `npm start`
- **Health check path:** `/api/health`
- **Environment:** set `DATABASE_URL` (Render Postgres), `OPENAI_API_KEY`,
  `ADMIN_SECRET`, `NITTER_INSTANCES`, `POLL_INTERVAL_MINUTES`,
  `MAX_POSTS_PER_ACCOUNT`.

### Scheduling the refresh

Two options (either works):

- **Cron Job service** (included in the blueprint) running `npm run poll`, or
- A **Render Cron Job** that curls the protected endpoint:
  ```bash
  curl -X POST "$APP_URL/api/admin/refresh" -H "Authorization: Bearer $ADMIN_SECRET"
  ```

Keep the cadence at **10–15 minutes** to respect public-instance rate limits.

---

## 🧪 Verifying the build

```bash
npm install       # installs deps + generates Prisma client
npm run build     # prepare-db + prisma generate + next build
npm start         # serves the production build
```

---

## 📁 Project structure

```
config/accounts.ts          # editable tracked-account list
prisma/schema.prisma        # Account, Post, Analysis, FetchLog
scripts/prepare-db.mjs      # auto-selects sqlite/postgres provider
scripts/poll.ts             # standalone fetch+analyze worker (cron)
src/lib/sources/            # modular source layer (Nitter RSS + interface)
src/lib/ai/analyze.ts       # OpenAI analysis + heuristic fallback
src/lib/pipeline.ts         # fetch → dedupe → cache → analyze
src/app/api/                # posts, fetch, analyze, health, admin/refresh
src/app/page.tsx            # landing page
src/app/dashboard/          # live terminal
src/components/             # UI: hero, cards, filters, background, states
render.yaml                 # Render blueprint (web + cron + postgres)
```

---

## License

MIT — for informational purposes only. Not financial advice.
