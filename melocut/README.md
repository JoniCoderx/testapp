# MeloCut

Free, private audio tools that run entirely in the browser: **Video to MP3**, **Ringtone Maker**
(iPhone M4R / Android MP3), **Audio Cutter** (keep or remove a part, fades) and **Audio Converter**
(MP3 / WAV / M4A / OGG / FLAC, speed and volume). Files are never uploaded: decoding uses the Web
Audio API and encoding uses [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) on the
visitor's device.

It is a static site with no server, so it can be hosted for free anywhere (Cloudflare Pages,
Netlify, GitHub Pages, Higgsfield, …).

```
melocut/
  build.mjs          page generator: all page text, titles, FAQs, structured data
  site/              the deployable website (generated HTML + assets)
    assets/app.js    the tool engine (waveform, selection, preview, ffmpeg)
    assets/config.js AdSense / analytics settings (edit, no rebuild needed)
    vendor/ffmpeg/   @ffmpeg/ffmpeg 0.12.15 (MIT); the 32 MB core loads from jsDelivr on first use
```

## Edit and rebuild

Page text lives in `build.mjs`. After editing it:

```bash
SITE_URL=https://melocut.com node build.mjs   # writes site/**/index.html, sitemap.xml, robots.txt
```

`SITE_URL` must be the real public address: it is used for canonical links, the sitemap and
social previews.

## Run locally

```bash
cd site && python3 -m http.server 8080   # http://localhost:8080
```

## Making money

1. Get the site live on its own domain (e.g. melocut.com) and add it to
   [Google Search Console](https://search.google.com/search-console); submit `/sitemap.xml`.
2. Apply for [Google AdSense](https://adsense.google.com). The site already has the privacy
   policy and about/contact pages AdSense requires.
3. Once approved, put your publisher id in `site/assets/config.js` (`adsenseClient`) and add
   `site/ads.txt` with the line AdSense gives you. Ad spaces (top, middle, bottom of each page)
   switch on automatically; they stay hidden while the id is empty.
4. Optional: set `plausibleDomain` for privacy-friendly analytics. Tools already send
   `file_opened`, `converted` and `download` events.

## Ideas for later

More tools (each one is a new search page): audio joiner, volume booster, slowed + reverb,
voice note converter, MP3 to WAV landing pages; translated pages (Spanish, Portuguese, Hindi,
Indonesian, Turkish); a "Pro" tier for batch processing.

## Going live on your own domain (Cloudflare Pages)

Higgsfield cannot use a custom domain, and AdSense needs one, so host `site/` on Cloudflare Pages:

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick this repository.
2. Production branch: `main`. Framework preset: None. Build command: leave empty.
   Build output directory: `melocut/site`. Save and Deploy.
3. Custom domains → Set up a domain → `melocut.com` (and `www.melocut.com`). Follow the DNS steps.
4. Rebuild the pages for the new address and push:
   `SITE_URL=https://melocut.com node build.mjs && PLAYWRIGHT=... node og.mjs && SITE_URL=https://melocut.com node build.mjs`

`site/_headers` sets caching for Cloudflare Pages. `404.html` is used automatically.

## Turning on ads

1. Apply at adsense.google.com with `https://melocut.com`.
2. Put the `ca-pub-...` id in `site/assets/config.js` (`adsenseClient`).
3. Create `site/ads.txt` with the line AdSense shows you, e.g.
   `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
4. In AdSense → Privacy & messaging, publish the GDPR message (needed for EU/UK visitors).
