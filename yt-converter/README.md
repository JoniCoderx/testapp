# TunePluck

A small self-hosted YouTube → **MP3 / MP4** converter website, in the style of the
Y2Mate-type sites. Paste a link (or type a song name and pick from the results),
choose MP3 (128–320 kbps) or MP4 (360p–1080p), watch the progress bar, download.

- `server.js` – Node HTTP server, **no npm dependencies**. Calls `yt-dlp` + `ffmpeg`.
- `public/index.html` – the whole front end (HTML + CSS + JS in one file, light/dark mode, mobile-friendly).
- `Dockerfile` – image with Node, ffmpeg and the latest yt-dlp.

It is self-contained and independent from the Next.js app in the repository root.

## Run locally

Requirements: Node 18+, [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) and `ffmpeg` on your PATH.

```bash
cd yt-converter
pip install -U yt-dlp      # or: brew install yt-dlp ffmpeg
npm start                  # http://localhost:8080
```

## Run with Docker

```bash
cd yt-converter
docker build -t tunepluck .
docker run -p 8080:8080 tunepluck
```

### Free test URL on Render

1. Sign in at [render.com](https://render.com) with GitHub (free, no card needed).
2. **New + → Blueprint**, pick this repository, and set **Blueprint Path** to
   `yt-converter/render.yaml`. Click **Apply**.
3. After the build (a few minutes) the site is live at
   `https://tunepluck.onrender.com` (or a similar name if that one is taken).

Free-plan services sleep after ~15 minutes without visitors; the first visit after
that takes up to a minute to wake. Railway and Fly.io work too: deploy the
`yt-converter` folder as a Docker service.

## Configuration (env vars)

| Variable | Default | Meaning |
|---|---|---|
| `PORT` | `8080` | HTTP port |
| `MAX_DURATION_SECONDS` | `10800` (3h) | Longest video accepted |
| `MAX_CONCURRENT_JOBS` | `3` | Conversions running at once (others wait in a queue) |
| `RATE_LIMIT_PER_HOUR` | `30` | Conversions per IP per hour |
| `JOB_TTL_MINUTES` | `20` | Converted files are deleted after this long |
| `ALLOWED_HOSTS` | YouTube hosts | Comma-separated hosts accepted as links |
| `COOKIES_FILE` | – | Path to a `cookies.txt` passed to yt-dlp (see below) |
| `YTDLP_PATH` | `yt-dlp` | yt-dlp binary |
| `TMP_DIR` | `./tmp` | Working directory for conversions |

## Important notes

- **"Sign in to confirm you're not a bot"** – YouTube often blocks requests from
  cloud/datacenter IPs. If you see this error, export YouTube cookies from a
  browser ([how-to](https://github.com/yt-dlp/yt-dlp/wiki/Extractors#exporting-youtube-cookies)),
  mount the file into the container and set `COOKIES_FILE`. Running from a home
  connection or a residential IP usually works without cookies.
- **Keep yt-dlp updated.** YouTube changes often; rebuild the Docker image (or
  `yt-dlp -U`) when downloads start failing.
- **Legal.** Downloading from YouTube is against YouTube's Terms of Service except
  where they allow it, and converting copyrighted music can be illegal where you
  live. Only use this for content you own or have permission to download.

## API

| Method | Path | |
|---|---|---|
| GET | `/api/search?q=` | Up to 8 YouTube results for a text query |
| GET | `/api/info?url=` | Title, channel, duration, thumbnail, available qualities |
| POST | `/api/convert` | Body `{url, type: "mp3"|"mp4", quality, title}` → `{id}` |
| GET | `/api/job/:id` | `{status, stage, progress, filename, size, error}` |
| GET | `/api/file/:id` | The converted file as an attachment |
