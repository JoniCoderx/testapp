// Generates the static HTML pages in ./site from the page definitions below.
//   node build.mjs                     (uses https://melocut.com)
//   SITE_URL=https://example.com node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'site');
const SITE_URL = (process.env.SITE_URL || 'https://melocut.com').replace(/\/$/, '');
const EMAIL = process.env.CONTACT_EMAIL || 'hello@melocut.com';
const NAME = 'MeloCut';
const UPDATED = new Date().toISOString().slice(0, 10);

const ICONS = {
  video: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="14" height="14" rx="2"/><path d="m16 10 6-3v10l-6-3"/></svg>',
  bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg>',
  cut: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/></svg>',
  swap: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"/><path d="M3 7h18"/><path d="M7 21l-4-4 4-4"/><path d="M21 17H3"/></svg>',
  lock: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  bolt: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>',
  phone: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg>',
  free: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z"/></svg>',
};

const TOOLS = [
  { slug: 'video-to-mp3', nav: 'Video to MP3', icon: 'video', title: 'Video to MP3', blurb: 'Pull the audio out of any MP4, MOV or WebM video.' },
  { slug: 'ringtone-maker', nav: 'Ringtone Maker', icon: 'bell', title: 'Ringtone Maker', blurb: 'Make an iPhone or Android ringtone from any song.' },
  { slug: 'audio-cutter', nav: 'Audio Cutter', icon: 'cut', title: 'Audio Cutter', blurb: 'Trim songs, cut out parts and add fades.' },
  { slug: 'audio-converter', nav: 'Converter', icon: 'swap', title: 'Audio Converter', blurb: 'MP3, WAV, M4A, OGG and FLAC, plus speed and volume.' },
];

const WHY = `
  <div class="section">
    <h2>Why people use ${NAME}</h2>
    <div class="cards">
      <div class="card"><div class="ico">${ICONS.lock}</div><b>100% private</b><p>Your files are processed inside your browser. Nothing is uploaded to any server, ever.</p></div>
      <div class="card"><div class="ico">${ICONS.bolt}</div><b>Fast</b><p>No upload or download wait. Even long videos are ready in seconds on most devices.</p></div>
      <div class="card"><div class="ico">${ICONS.phone}</div><b>Works everywhere</b><p>iPhone, Android, Windows, Mac and Chromebook. No app to install, no account.</p></div>
      <div class="card"><div class="ico">${ICONS.free}</div><b>Free, no watermark</b><p>No limits on how many files you convert and no sound tags added to your audio.</p></div>
    </div>
  </div>`;

const PAGES = [
  {
    path: '',
    title: `${NAME} – Free Online Audio Cutter, Ringtone Maker & MP3 Converter`,
    description: 'Cut songs, make iPhone and Android ringtones, and convert video to MP3 for free. Works in your browser; your files are never uploaded.',
    h1: 'Cut, convert & make ringtones — <em>right in your browser</em>',
    lead: 'Free audio tools that never upload your files. Pick a tool to start.',
    body: `
  <div class="cards" style="margin-top:8px">
    ${TOOLS.map((t) => `<a class="card" href="/${t.slug}/"><div class="ico">${ICONS[t.icon]}</div><b>${t.title}</b><p>${t.blurb}</p></a>`).join('\n    ')}
  </div>
  <div class="ad" data-slot="top"></div>
  ${WHY}
  <div class="section prose">
    <h2>Audio tools that respect your privacy</h2>
    <p>Most online converters make you upload your files to their servers, wait, and then download the result. ${NAME} works differently: the same professional audio engine that powers desktop apps (FFmpeg) runs directly inside your web browser. Your music, voice notes and videos stay on your device the whole time.</p>
    <p>That makes ${NAME} faster, safer and free of the pop-ups and fake download buttons that are common on converter sites.</p>
  </div>`,
    faq: [
      ['Is MeloCut free?', 'Yes. All tools are free to use, with no sign-up, no watermark and no limit on the number of files.'],
      ['Are my files uploaded?', 'No. Everything happens in your browser on your own device. Your files are never sent to a server.'],
      ['Does it work on iPhone and Android?', 'Yes. MeloCut works in Safari, Chrome, Firefox and Edge on phones, tablets and computers.'],
      ['What file types are supported?', 'MP3, MP4, MOV, M4A, WAV, OGG, OPUS, FLAC, WebM, AAC, AMR, 3GP and most other audio and video formats.'],
    ],
  },
  {
    path: 'video-to-mp3',
    tool: 'video-to-mp3',
    title: `Video to MP3 Converter – Extract Audio from MP4, Free | ${NAME}`,
    description: 'Convert MP4, MOV, WebM and other videos to MP3 online for free. Extract the audio at up to 320 kbps. No upload, no sign-up, works on iPhone and Android.',
    h1: 'Video to <em>MP3</em> converter',
    lead: 'Extract the audio from any video file and save it as MP3, M4A or WAV. Free, private and instant.',
    badges: ['Up to 320 kbps', 'MP4 · MOV · WebM · MKV', 'No upload'],
    steps: [
      ['Choose your video', 'Tap the box above and pick a video from your phone or computer, or drag it in.'],
      ['Trim if you like', 'Keep the whole audio, or drag on the waveform to keep only part of it.'],
      ['Convert & download', 'Choose MP3 and the quality, press Convert, then Download.'],
    ],
    content: `
    <h2>Extract audio from video in seconds</h2>
    <p>Recorded a concert, a lecture or a funny moment on your phone and only need the sound? ${NAME} turns any video into an MP3 you can play anywhere — in your car, in a music app or as a podcast clip.</p>
    <h3>Supported video formats</h3>
    <p>MP4, MOV (iPhone videos), WebM, MKV, AVI, 3GP and more. If your browser can open it, ${NAME} can almost always convert it.</p>
    <h3>Which quality should I choose?</h3>
    <p><strong>320 kbps</strong> gives the best MP3 quality and is the right choice for music. <strong>128 kbps</strong> makes much smaller files and is fine for speech, lectures and voice recordings. Choose <strong>WAV</strong> if you plan to edit the audio further.</p>`,
    faq: [
      ['How do I convert an MP4 to MP3?', 'Open the MP4 file in the box above, choose MP3 and a quality, press Convert and then Download. It takes a few seconds.'],
      ['Can I convert iPhone videos (MOV)?', 'Yes. Pick the video from your Photos or Files app and it will be converted to MP3.'],
      ['Is there a file size limit?', 'Files up to 1 GB are supported. Very large files depend on how much memory your device has.'],
      ['Can I convert YouTube videos?', 'MeloCut works with files on your device. It does not download videos from YouTube or other websites.'],
    ],
  },
  {
    path: 'ringtone-maker',
    tool: 'ringtone',
    title: `Ringtone Maker – Make iPhone & Android Ringtones Free | ${NAME}`,
    description: 'Make a ringtone from any song for free. Cut the best part, add a fade, and save as M4R for iPhone or MP3 for Android. No app, no upload.',
    h1: 'Free <em>ringtone</em> maker',
    lead: 'Pick the best part of any song and turn it into an iPhone (M4R) or Android (MP3) ringtone.',
    badges: ['iPhone M4R', 'Android MP3', 'Fade in & out'],
    steps: [
      ['Choose a song', 'Open any song or video from your device.'],
      ['Pick the best part', 'Drag on the waveform to select up to 40 seconds and press Play to check it.'],
      ['Download your ringtone', 'Choose M4R for iPhone or MP3 for Android, then Convert and Download.'],
    ],
    content: `
    <h2>How to set your ringtone</h2>
    <h3>On iPhone</h3>
    <p>Download the <strong>M4R</strong> file. On a Mac or PC, connect your iPhone and drag the file onto your iPhone in Finder (Mac) or iTunes (Windows). It will appear in <em>Settings → Sounds &amp; Haptics → Ringtone</em>. Without a computer, open the file in <strong>GarageBand</strong> on your iPhone and use <em>Share → Ringtone</em>.</p>
    <h3>On Android</h3>
    <p>Download the <strong>MP3</strong> file, then go to <em>Settings → Sound → Phone ringtone</em> and choose it (on some phones, tap "+" or "Add ringtone"). You can also move it into the <em>Ringtones</em> folder with the Files app.</p>
    <h3>Tips for a great ringtone</h3>
    <p>Start just before the chorus or the most recognisable part, keep it between 20 and 30 seconds, and leave fade in and fade out switched on so it doesn't start or stop abruptly.</p>`,
    faq: [
      ['How long can a ringtone be?', 'iPhone ringtones can be up to 40 seconds. MeloCut limits your selection to 40 seconds so it always works.'],
      ['What is an M4R file?', 'M4R is the ringtone format used by iPhone. It is the same as an M4A (AAC) audio file with a different name.'],
      ['Can I make a ringtone from a video?', 'Yes. Open any video and MeloCut will use its sound.'],
      ['Is the ringtone maker free?', 'Yes, completely free with no watermark and no sign-up.'],
    ],
  },
  {
    path: 'audio-cutter',
    tool: 'cutter',
    title: `Audio Cutter – Trim MP3 & Cut Songs Online, Free | ${NAME}`,
    description: 'Cut and trim MP3 and other audio files online. Keep or remove any part, add fade in and fade out, and save as MP3, M4A, WAV, OGG or FLAC. Free and private.',
    h1: 'Online <em>audio cutter</em>',
    lead: 'Trim the start and end of a song, or cut out a part from the middle. Add fades and save in the format you need.',
    badges: ['Keep or remove a part', 'Fade in & out', 'MP3 · WAV · FLAC'],
    steps: [
      ['Open your audio', 'Choose an MP3, WAV, M4A or any audio or video file.'],
      ['Select the part', 'Drag the handles on the waveform, or type exact start and end times.'],
      ['Keep or remove', 'Choose Keep selection or Remove selection, then Convert and Download.'],
    ],
    content: `
    <h2>Cut audio precisely</h2>
    <p>Use the waveform to see exactly where the music gets loud or quiet, drag the handles to the right spot and press Play to listen before you save. For millisecond precision, type the start and end time directly (for example <code>1:23.5</code>).</p>
    <h3>Remove a part from the middle</h3>
    <p>Switch to <strong>Remove selection</strong> to cut out an intro, a silence, a mistake or an ad from a recording. The two remaining parts are joined automatically.</p>
    <h3>Lossless options</h3>
    <p>Choose <strong>WAV</strong> or <strong>FLAC</strong> to keep full quality, for example when you will edit the file again later.</p>`,
    faq: [
      ['How do I trim an MP3?', 'Open the MP3, drag the handles to the part you want, choose Keep selection and press Convert, then Download.'],
      ['Can I cut a part out of the middle?', 'Yes. Select the part you don’t want and choose Remove selection.'],
      ['Will cutting reduce the quality?', 'Choose 320 kbps MP3 for near-original quality, or WAV/FLAC for no quality loss.'],
      ['Does it work offline?', 'After the first visit the audio engine is cached, so tools keep working even on a slow connection.'],
    ],
  },
  {
    path: 'audio-converter',
    tool: 'converter',
    title: `Audio Converter – MP3, WAV, M4A, OGG, FLAC Online | ${NAME}`,
    description: 'Convert audio files online for free: MP3, WAV, M4A, OGG, FLAC, OPUS and more. Change speed and boost volume. Works on WhatsApp voice notes. No upload.',
    h1: 'Free online <em>audio converter</em>',
    lead: 'Convert between MP3, WAV, M4A, OGG and FLAC. Also great for WhatsApp and Telegram voice notes (OPUS).',
    badges: ['MP3 · WAV · M4A · OGG · FLAC', 'Speed & volume', 'Voice notes'],
    steps: [
      ['Open a file', 'Choose any audio or video file, including WhatsApp .opus voice notes.'],
      ['Choose the format', 'Pick the output format and quality. Adjust speed or volume if you like.'],
      ['Convert & download', 'Press Convert and Download. Done.'],
    ],
    content: `
    <h2>Convert any audio format</h2>
    <p>${NAME} reads almost every audio format — MP3, WAV, M4A, AAC, OGG, OPUS, FLAC, AMR, WMA — and converts it to the format your device or app needs.</p>
    <h3>WhatsApp and Telegram voice notes</h3>
    <p>Voice messages are saved as <code>.opus</code> or <code>.ogg</code> files that many players can’t open. Convert them to MP3 to play them anywhere or share them by email.</p>
    <h3>Slowed, sped up and louder</h3>
    <p>Use <strong>Speed</strong> to make slowed or sped-up versions of songs, or to slow down music you are learning to play. Use <strong>Volume</strong> to boost quiet recordings; a limiter prevents distortion.</p>`,
    faq: [
      ['How do I convert WAV to MP3?', 'Open the WAV file, choose MP3 and a quality, then press Convert and Download.'],
      ['How do I convert a WhatsApp voice note to MP3?', 'Save the voice note (.opus) to your device, open it here, choose MP3 and press Convert.'],
      ['What is the best audio format?', 'MP3 works everywhere. M4A is slightly better quality at the same size. FLAC and WAV are lossless but larger.'],
      ['Can I make a slowed + reverb version?', 'You can make slowed or sped-up versions with the Speed option. Reverb is coming soon.'],
    ],
  },
  {
    path: 'privacy',
    title: `Privacy Policy | ${NAME}`,
    description: `How ${NAME} handles your data: your files never leave your device.`,
    h1: 'Privacy policy',
    plain: true,
    content: `
    <p><em>Last updated: ${UPDATED}</em></p>
    <h2>Your files</h2>
    <p>${NAME} processes audio and video files entirely inside your web browser. Your files are <strong>never uploaded</strong> to our servers or to anyone else, and we cannot see, store or share them.</p>
    <h2>Technical data</h2>
    <p>Like every website, our hosting provider receives standard technical information (such as your IP address and browser type) when you load a page. The audio engine is downloaded from the jsDelivr content delivery network.</p>
    <h2>Advertising and cookies</h2>
    <p>${NAME} may show ads from Google AdSense. Google and its partners use cookies to show ads based on your previous visits to this and other websites. You can opt out of personalised advertising at <a href="https://adssettings.google.com" rel="nofollow">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices" rel="nofollow">aboutads.info</a>. Learn more in <a href="https://policies.google.com/technologies/ads" rel="nofollow">how Google uses information from sites that use its services</a>.</p>
    <p>Visitors in the EEA, UK and Switzerland are asked for consent before personalised ads are shown.</p>
    <h2>Analytics</h2>
    <p>We may use privacy-friendly, cookie-free analytics to count page views and which tools are used. No personal data is collected.</p>
    <h2>Contact</h2>
    <p>Questions? Email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`,
  },
  {
    path: 'about',
    title: `About & Contact | ${NAME}`,
    description: `About ${NAME}, free private audio tools, and how to contact us.`,
    h1: 'About MeloCut',
    plain: true,
    content: `
    <p>${NAME} is a set of free, simple audio tools — a ringtone maker, an audio cutter, a video to MP3 converter and an audio converter — that work entirely in your web browser.</p>
    <p>We built it because most converter sites are slow, full of pop-ups and make you upload your personal files. ${NAME} runs the FFmpeg audio engine on your own device instead, so it is faster and your files stay private.</p>
    <h2>Contact</h2>
    <p>Ideas, bug reports or business enquiries: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
    <h2>Terms of use</h2>
    <p>${NAME} is provided as is, without warranty. Only use it with files you own or have the right to use, and respect copyright.</p>`,
  },
];

// ---------- templates ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s) => s.replace(/<[^>]+>/g, '');

function jsonLd(p) {
  const url = `${SITE_URL}/${p.path ? p.path + '/' : ''}`;
  const graph = [
    { '@type': 'WebSite', '@id': `${SITE_URL}/#site`, name: NAME, url: `${SITE_URL}/` },
  ];
  if (!p.plain) {
    graph.push({
      '@type': 'WebApplication', name: p.path ? `${NAME} ${strip(p.h1)}` : NAME, url,
      applicationCategory: 'MultimediaApplication', operatingSystem: 'Any (web browser)',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: p.description,
    });
  }
  if (p.faq) {
    graph.push({ '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  }
  if (p.steps) {
    graph.push({ '@type': 'HowTo', name: `How to use the ${NAME} ${strip(p.h1)}`, step: p.steps.map(([n, t], i) => ({ '@type': 'HowToStep', position: i + 1, name: n, text: t })) });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

function page(p) {
  const url = `${SITE_URL}/${p.path ? p.path + '/' : ''}`;
  const navLinks = TOOLS.map((t) => `<a href="/${t.slug}/"${p.path === t.slug ? ' aria-current="page"' : ''}>${t.nav}</a>`).join('');
  const others = TOOLS.filter((t) => t.slug !== p.path);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#6d4aff">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/style.css">
<script src="/assets/config.js"></script>
<script src="/assets/site.js" defer></script>
${p.tool ? '<script type="module" src="/assets/app.js"></script>\n<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>' : ''}
<script type="application/ld+json">${jsonLd(p)}</script>
</head>
<body>
<header class="top">
  <div class="wrap">
    <a class="logo" href="/"><img src="/assets/logo.svg" width="32" height="32" alt="">${NAME}</a>
    <nav class="nav" aria-label="Tools">${navLinks}</nav>
    <button class="menu-btn" type="button" aria-label="Menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  </div>
</header>
<main class="wrap">
  <div class="hero"${p.plain ? ' style="text-align:left;padding-bottom:0"' : ''}>
    <h1>${p.h1}</h1>
    ${p.lead ? `<p>${p.lead}</p>` : ''}
    ${p.badges ? `<div class="badges">${p.badges.map((b) => `<span class="badge">${b}</span>`).join('')}</div>` : ''}
  </div>
  ${p.tool ? `<div class="tool" data-tool="${p.tool}"><noscript>Please enable JavaScript to use this tool.</noscript></div>
  <div class="ad" data-slot="top"></div>` : ''}
  ${p.body || ''}
  ${p.steps ? `<div class="section"><h2>How it works</h2><div class="steps">${p.steps.map(([n, t]) => `<div class="card"><b>${n}</b><p>${t}</p></div>`).join('')}</div></div>` : ''}
  ${p.content ? `<div class="section prose">${p.content}</div>` : ''}
  ${p.tool ? `<div class="ad" data-slot="middle"></div>${WHY}` : ''}
  ${p.tool ? `<div class="section"><h2>More free tools</h2><div class="cards">${others.map((t) => `<a class="card" href="/${t.slug}/"><div class="ico">${ICONS[t.icon]}</div><b>${t.title}</b><p>${t.blurb}</p></a>`).join('')}</div></div>` : ''}
  ${p.faq ? `<div class="section"><h2>Questions &amp; answers</h2>${p.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>` : ''}
  ${p.plain ? '' : '<div class="ad" data-slot="bottom"></div>'}
</main>
<footer>
  <div class="wrap">
    <div>© <span data-year></span> ${NAME} · Free, private audio tools</div>
    <nav aria-label="Footer">${TOOLS.map((t) => `<a href="/${t.slug}/">${t.nav}</a>`).join('')}<a href="/about/">About &amp; contact</a><a href="/privacy/">Privacy</a></nav>
  </div>
</footer>
</body>
</html>
`;
}

for (const p of PAGES) {
  const dir = path.join(ROOT, p.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(p));
}
fs.writeFileSync(path.join(ROOT, '404.html'), page({
  path: '404', title: `Page not found | ${NAME}`, description: 'Page not found.', h1: 'Page not found',
  lead: 'That page doesn’t exist. Try one of our tools:', plain: false,
  body: `<div class="cards">${TOOLS.map((t) => `<a class="card" href="/${t.slug}/"><div class="ico">${ICONS[t.icon]}</div><b>${t.title}</b><p>${t.blurb}</p></a>`).join('')}</div>`,
}).replace('<link rel="canonical"', '<meta name="robots" content="noindex">\n<link rel="canonical"'));
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => `  <url><loc>${SITE_URL}/${p.path ? p.path + '/' : ''}</loc><lastmod>${UPDATED}</lastmod></url>`).join('\n')}
</urlset>
`);
console.log(`Built ${PAGES.length + 1} pages for ${SITE_URL}`);
