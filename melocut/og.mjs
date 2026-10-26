// Renders a 1200x630 social preview image for every page into site/og/<slug>.jpg.
// Needs Playwright + Chromium and ffmpeg (for PNG -> JPG). Run after build.mjs, then build again
// so the pages point at their own images:
//   node build.mjs && node og.mjs && node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
// PLAYWRIGHT can point at a global install, e.g. /usr/lib/node_modules/playwright/index.mjs
const { chromium } = await import(process.env.PLAYWRIGHT || 'playwright');

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(DIR, 'site', 'og');
const pages = JSON.parse(fs.readFileSync(path.join(DIR, 'pages.json'), 'utf8'));
const logo = fs.readFileSync(path.join(DIR, 'site', 'assets', 'logo.svg'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const bars = Array.from({ length: 34 }, (_, i) => {
  const h = ((i * 37) % 90) + 20;
  return `<rect x="${i * 12}" y="${(120 - h) / 2}" width="6" height="${h}" rx="3"/>`;
}).join('');

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of pages) {
  if (p.slug === '404') continue;
  const lead = p.lead.length > 120 ? p.lead.slice(0, p.lead.lastIndexOf(' ', 117)) + '…' : p.lead;
  await page.setContent(`<!doctype html><html><body style="margin:0;width:1200px;height:630px;box-sizing:border-box;padding:0 84px;display:flex;flex-direction:column;justify-content:center;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:linear-gradient(135deg,#1b1240 0%,#2d1a5c 55%,#5a1f4f 100%);color:#fff;position:relative;overflow:hidden">
    <div style="display:flex;align-items:center;gap:18px"><div style="width:72px;height:72px">${logo}</div><div style="font-size:46px;font-weight:800;letter-spacing:-1px">MeloCut</div></div>
    <div style="font-size:${p.h1.length > 34 ? 60 : 72}px;font-weight:800;line-height:1.05;margin-top:40px;letter-spacing:-1.5px;max-width:960px;background:linear-gradient(90deg,#fff 40%,#ffb3cf);-webkit-background-clip:text;color:transparent">${esc(p.h1)}</div>
    <div style="font-size:28px;margin-top:24px;color:#d6cdf7;max-width:900px;line-height:1.35">${esc(lead)}</div>
    <div style="font-size:24px;margin-top:30px;color:#bfb3ef;font-weight:600">Free · Private · No upload</div>
    <svg style="position:absolute;right:60px;bottom:50px;opacity:.28" width="408" height="120" viewBox="0 0 408 120"><g fill="#fff">${bars}</g></svg>
  </body></html>`);
  const png = path.join(OUT, `${p.slug}.png`);
  await page.screenshot({ path: png });
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-q:v', '3', path.join(OUT, `${p.slug}.jpg`)]);
  fs.unlinkSync(png);
}
await browser.close();
console.log(`Rendered ${pages.length} social images into site/og/`);
