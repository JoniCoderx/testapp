// Generates the static HTML pages in ./site from the page definitions below.
//   node build.mjs                     (uses https://melocut.com)
//   SITE_URL=https://example.com node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import es from './i18n/es.mjs';
import ptBR from './i18n/pt-br.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'site');
const SITE_URL = (process.env.SITE_URL || 'https://melocut.com').replace(/\/$/, '');
const EMAIL = process.env.CONTACT_EMAIL || 'hello@melocut.com';
const NAME = 'MeloCut';
// Content hash for asset URLs, so a new version is never served from an old cache.
const ver = (f) => crypto.createHash('sha1').update(fs.readFileSync(path.join(ROOT, f))).digest('hex').slice(0, 8);
const asset = (f) => `/${f}?v=${ver(f)}`;
// The stylesheet is small (about 5 KB compressed), so it goes inside each page: no render-blocking request.
const INLINE_CSS = fs.readFileSync(path.join(ROOT, 'assets', 'style.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '\n')
  .replace('/assets/fonts/inter-latin.woff2', asset('assets/fonts/inter-latin.woff2'));
const UPDATED = new Date().toISOString().slice(0, 10);
const LEGAL_UPDATED = 'October 26, 2026'; // change by hand when the privacy policy or terms change

const ICONS = {
  video: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="14" height="14" rx="2"/><path d="m16 10 6-3v10l-6-3"/></svg>',
  bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg>',
  cut: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/></svg>',
  swap: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"/><path d="M3 7h18"/><path d="M7 21l-4-4 4-4"/><path d="M21 17H3"/></svg>',
  lock: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  bolt: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>',
  phone: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg>',
  free: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z"/></svg>',
  merge: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
  slow: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  orbit: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 15a2 2 0 0 1-2 2h-1v-5h3zM3 15a2 2 0 0 0 2 2h1v-5H3z"/></svg>',
  bass: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><path d="M12 6h.01"/></svg>',
  volume: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>',
  sparkle: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
  mic: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M3 3l18 18"/></svg>',
  reverse: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
  gauge: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14l4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/></svg>',
  note: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  fade: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20 9 6h6l7 14"/></svg>',
  silence: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h3l2-6 3 12 2-6h2"/><path d="M19 9l3 6M22 9l-3 6"/></svg>',
  book: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
};

// ---------- tools and conversions ----------
const TOOLS = [
  { slug: 'video-to-mp3', nav: 'Video to MP3', icon: 'video', title: 'Video to MP3', blurb: 'Get the sound out of an MP4, MOV or WebM video.' },
  { slug: 'ringtone-maker', nav: 'Ringtone Maker', icon: 'bell', title: 'Ringtone Maker', blurb: 'Turn part of a song into an iPhone or Android ringtone.' },
  { slug: 'audio-cutter', nav: 'Audio Cutter', icon: 'cut', title: 'Audio Cutter', blurb: 'Trim a song or cut a piece out of the middle.' },
  { slug: 'audio-converter', nav: 'Audio Converter', icon: 'swap', title: 'Audio Converter', blurb: 'Switch between MP3, WAV, M4A, OGG and FLAC.' },
  { slug: 'audio-joiner', nav: 'Audio Joiner', icon: 'merge', title: 'Audio Joiner', blurb: 'Put several songs or clips together into one file.' },
  { slug: 'noise-remover', icon: 'sparkle', title: 'AI Noise Remover', ai: true, blurb: 'Clean up background noise in voice recordings.' },
  { slug: 'slowed-reverb', icon: 'slow', title: 'Slowed + Reverb', blurb: 'Make a slowed version of a song with reverb.' },
  { slug: 'vocal-remover', icon: 'mic', title: 'Vocal Remover', blurb: 'Take the singer out for a karaoke track.' },
  { slug: '8d-audio', icon: 'orbit', title: '8D Audio', blurb: 'Sound that moves from ear to ear. Use headphones.' },
  { slug: 'bass-booster', icon: 'bass', title: 'Bass Booster', blurb: 'Add more low end to any song.' },
  { slug: 'volume-booster', icon: 'volume', title: 'Volume Booster', blurb: 'Make quiet recordings louder.' },
  { slug: 'reverse-audio', icon: 'reverse', title: 'Reverse Audio', blurb: 'Play any sound backwards.' },
  { slug: 'speed-up-audio', icon: 'gauge', title: 'Speed Up Audio', blurb: 'Make a song or voice note faster, same pitch.' },
  { slug: 'slow-down-audio', icon: 'slow', title: 'Slow Down Audio', blurb: 'Play anything slower without a deep voice.' },
  { slug: 'pitch-changer', icon: 'note', title: 'Pitch Changer', blurb: 'Change the key of a song, same speed.' },
  { slug: 'nightcore-maker', icon: 'sparkle', title: 'Nightcore Maker', blurb: 'Faster and higher, the classic nightcore sound.' },
  { slug: 'remove-silence', icon: 'silence', title: 'Remove Silence', blurb: 'Cut the long pauses out of a recording.' },
  { slug: 'fade-in-fade-out', icon: 'fade', title: 'Fade In and Fade Out', blurb: 'Add a smooth start and ending to any song.' },
];
// Format landing pages: same converter, output format picked in advance.
const CONVERSIONS = [
  { slug: 'mp4-to-mp3', label: 'MP4 to MP3' },
  { slug: 'wav-to-mp3', label: 'WAV to MP3' },
  { slug: 'm4a-to-mp3', label: 'M4A to MP3' },
  { slug: 'whatsapp-audio-to-mp3', label: 'WhatsApp audio to MP3' },
  { slug: 'mp3-to-wav', label: 'MP3 to WAV' },
  { slug: 'flac-to-mp3', label: 'FLAC to MP3' },
  { slug: 'mov-to-mp3', label: 'MOV to MP3' },
  { slug: 'ogg-to-mp3', label: 'OGG to MP3' },
  { slug: 'aac-to-mp3', label: 'AAC to MP3' },
];
const MAIN_NAV = ['video-to-mp3', 'ringtone-maker', 'audio-cutter', 'audio-converter'];
// Short how-to video shown on the ringtone guides (made in-house, also posted on TikTok).
const RINGTONE_VIDEO = {
  src: '/media/set-ringtone.mp4', poster: '/media/set-ringtone.jpg', width: 720, height: 1280, duration: 'PT40S', uploaded: '2026-10-27',
  name: 'How to set a custom ringtone on iPhone and Android',
  description: 'Set your new ringtone in a few taps: the iOS 26 Files app method (Share, Use as Ringtone), GarageBand for older iPhones, and Android and Samsung settings.',
  caption: 'Watch: setting the ringtone on iPhone (iOS 26) and Android, in 40 seconds.',
};
// Guides, in the order they're listed on /guides/ and in "More guides".
const GUIDES = [
  { slug: 'make-ringtone', icon: 'bell', title: 'Make a song your ringtone', blurb: 'Any song, any phone, in about two minutes.' },
  { slug: 'iphone-ringtone', icon: 'bell', title: 'Set any song as your iPhone ringtone', blurb: 'No computer needed. The new Files app way and GarageBand.' },
  { slug: 'set-ringtone', icon: 'bell', title: 'Set a custom ringtone', blurb: 'iPhone and Android, with or without a computer.' },
  { slug: 'samsung-ringtone', icon: 'phone', title: 'Custom ringtone on Samsung Galaxy', blurb: 'Set any song as your Samsung ringtone in a few taps.' },
  { slug: 'contact-ringtone', icon: 'phone', title: 'Ringtone for one contact', blurb: 'Know who is calling before you look at the phone.' },
  { slug: 'make-slowed-reverb', icon: 'slow', title: 'Make slowed + reverb songs', blurb: 'The settings that sound right, step by step.' },
  { slug: 'remove-vocals', icon: 'mic', title: 'Remove vocals from a song', blurb: 'Make a karaoke or instrumental track for free.' },
  { slug: 'extract-audio-from-video', icon: 'video', title: 'Get the audio from a video', blurb: 'From your gallery or computer, saved as MP3.' },
  { slug: 'cut-song-iphone', icon: 'cut', title: 'Cut a song on iPhone', blurb: 'Trim any song in Safari, no app needed.' },
  { slug: 'whatsapp-voice-to-mp3', icon: 'mic', title: 'WhatsApp voice message to MP3', blurb: 'Save a voice note and play it anywhere.' },
  { slug: 'voice-memo-to-mp3', icon: 'mic', title: 'iPhone voice memo to MP3', blurb: 'Convert M4A memos so they play everywhere.' },
  { slug: 'remove-background-noise', icon: 'sparkle', title: 'Remove background noise', blurb: 'Clean wind, traffic and hum from a voice.' },
  { slug: 'make-8d-audio', icon: 'orbit', title: 'Make 8D audio', blurb: 'Music that moves around your head.' },
  { slug: 'make-nightcore', icon: 'gauge', title: 'Make nightcore and sped up songs', blurb: 'The fast, high version of any song.' },
  { slug: 'bass-boost-song', icon: 'bass', title: 'Boost the bass in a song', blurb: 'Deeper bass for your car or headphones.' },
  { slug: 'make-audio-louder', icon: 'volume', title: 'Make a song or recording louder', blurb: 'Up to 300%, without distortion.' },
  { slug: 'combine-songs', icon: 'merge', title: 'Combine two songs into one', blurb: 'Join songs and clips with a crossfade.' },
  { slug: 'install-app', icon: 'phone', title: 'Install MeloCut on your phone', blurb: 'Add it to your home screen in a few taps.' },
  { slug: 'find-downloads', icon: 'book', title: 'Where are my downloads?', blurb: 'Find your files on iPhone, Android, Windows and Mac.' },
  { slug: 'best-audio-format', icon: 'swap', title: 'Which audio format should you use?', blurb: 'MP3, M4A, WAV, FLAC and what kbps means.' },
  { slug: 'clean-up-voice-memo', icon: 'sparkle', title: 'Clean up a voice memo', blurb: 'Trim it, remove noise and make it louder.' },
  { slug: 'ringtone-from-video', icon: 'video', title: 'Make a ringtone from a video', blurb: 'Use a sound from your own videos as your ringtone.' },
];
// Each tool page links to its step-by-step guide.
const TOOL_GUIDE = { 'audio-cutter': 'cut-song-iphone', 'video-to-mp3': 'extract-audio-from-video', 'mp4-to-mp3': 'extract-audio-from-video', 'mov-to-mp3': 'extract-audio-from-video',
  'whatsapp-audio-to-mp3': 'whatsapp-voice-to-mp3', 'ogg-to-mp3': 'whatsapp-voice-to-mp3', 'm4a-to-mp3': 'voice-memo-to-mp3', 'noise-remover': 'remove-background-noise',
  '8d-audio': 'make-8d-audio', 'nightcore-maker': 'make-nightcore', 'speed-up-audio': 'make-nightcore', 'bass-booster': 'bass-boost-song', 'volume-booster': 'make-audio-louder',
  'audio-joiner': 'combine-songs', 'slowed-reverb': 'make-slowed-reverb', 'vocal-remover': 'remove-vocals', 'ringtone-maker': 'make-ringtone' };
const guideCard = (g) => `<a class="card" href="/guides/${g.slug}/"><div class="ico">${ICONS[g.icon]}</div><b>${g.title}</b><p>${g.blurb}</p></a>`;
const CONVERSION_LINKS = `<div class="chips-links">${CONVERSIONS.map((c) => `<a class="chip" href="/${c.slug}/">${c.label}</a>`).join('')}</div>`;
// ---------- languages ----------
// English is the source. Each other language supplies its site text (ui), tool names and pages.
const EN = {
  code: 'en', hreflang: 'en', ogLocale: 'en_US', prefix: '', name: 'English', short: 'EN',
  home: 'Home', tools: 'Tools', allTools: 'All tools', popular: 'Popular', installApp: 'Install app', menu: 'Menu',
  howItWorks: 'How it works', faq: 'Questions and answers', moreTools: 'More free tools',
  noscript: 'Please turn on JavaScript to use this tool.', language: 'Language', homeAria: `${NAME} home`,
  footerTagline: 'Free audio tools that run in your browser',
  fTools: 'Tools', fHelp: 'Help and info', fGuides: 'Guides', fInstall: 'Install the app',
  fAbout: 'About and contact', fPrivacy: 'Privacy', fTerms: 'Terms', inEnglish: 'in English',
  ogAlt: (h1) => `${h1} on ${NAME}`, tag: 'Free · Private · No upload',
  install: "You can add MeloCut to your phone's home screen and open it like an app. Use a tool once while you're online and it keeps working offline after that.",
  installHow: 'How to install',
  whyTitle: `Why use ${NAME}`,
  why: [
    ['lock', 'Your files stay with you', 'Everything happens in your browser. Nothing gets uploaded, so nobody else ever sees your files.'],
    ['bolt', 'No waiting', "There's no upload and no download queue. A song usually takes a few seconds. Long videos take a bit longer."],
    ['phone', 'Phone or computer', 'Works in Safari, Chrome, Edge and Firefox. You can also install it on your home screen.'],
    ['sparkle', 'Free, no watermark', 'No account and nothing added to your audio. Use it as often as you like.'],
  ],
};
const LANGS = { en: { ui: EN, tools: {}, pages: [] }, es: es(NAME), 'pt-br': ptBR(NAME) };
const L10N = Object.keys(LANGS).filter((l) => l !== 'en');
const installHTML = (ui) => `
  <div class="section"><div class="callout"><p>${ui.install}</p>
    <a class="btn sm" href="/guides/install-app/">${ui.installHow}</a></div></div>`;
const whyHTML = (ui) => `
  <div class="section">
    <h2>${ui.whyTitle}</h2>
    <div class="cards">
      ${ui.why.map(([icon, b, t]) => `<div class="card"><div class="ico">${ICONS[icon]}</div><b>${b}</b><p>${t}</p></div>`).join('\n      ')}
    </div>
  </div>`;
const INSTALL_CALLOUT = installHTML(EN);
const WHY = whyHTML(EN);
// A tool in a given language: localized name, and the localized page if there is one (else the English page).
function toolIn(t, lang) {
  const x = LANGS[lang].tools[t.slug] || {};
  return { ...t, title: x.title || t.title, blurb: x.blurb || t.blurb, href: `/${x.path || t.slug}/`, english: lang !== 'en' && !x.path };
}
// Home page tool list: the four most used tools first, then everything else.
const POPULAR = ['video-to-mp3', 'ringtone-maker', 'audio-cutter', 'audio-converter'];
const toolGrid = (lang) => {
  const ui = LANGS[lang].ui, card = (t) => toolCardIn(t, lang);
  return `<div class="section first"><h2>${ui.popular}</h2><div class="cards">${TOOLS.filter((t) => POPULAR.includes(t.slug)).map(card).join('')}</div></div>
  <div class="section" id="tools"><h2>${ui.allTools}</h2><div class="cards">${TOOLS.filter((t) => !POPULAR.includes(t.slug)).map(card).join('')}</div></div>`;
};
const toolCardIn = (t, lang) => {
  const x = toolIn(t, lang);
  return `<a class="card" href="${x.href}"${x.english ? ' hreflang="en"' : ''}><div class="ico">${ICONS[t.icon]}</div><b>${x.title}${t.ai ? '<span class="ai">AI</span>' : ''}${x.english ? `<span class="en-tag" title="${LANGS[lang].ui.inEnglish}">EN</span>` : ''}</b><p>${x.blurb}</p></a>`;
};

// ---------- pages ----------
const PAGES = [
  {
    path: '',
    title: `Free Audio Cutter, Ringtone Maker & MP3 Converter | ${NAME}`,
    description: 'Cut songs, make ringtones for iPhone and Android, add effects and convert video to MP3. Free, and your files never leave your device.',
    h1: 'Cut songs, make ringtones and add effects, <em>right in your browser</em>',
    lead: 'Free audio tools that work on your phone or computer. Your files are never uploaded. Pick a tool to start.',
    badges: [`${TOOLS.length} free tools`, 'AI noise removal', 'No upload', 'No sign-up'],
    body: `
  ${toolGrid('en')}
  <div class="section"><h2>Popular conversions</h2>${CONVERSION_LINKS}</div>
  <div class="section"><h2>Popular guides</h2><div class="cards">${GUIDES.filter((g) => ['make-ringtone', 'iphone-ringtone', 'extract-audio-from-video', 'make-slowed-reverb'].includes(g.slug)).map(guideCard).join('')}</div></div>
  <div class="ad" data-slot="top"></div>
  <div class="section prose">
    <h2>Effects in every tool</h2>
    <p>Each tool has an <strong>Effects &amp; filters</strong> panel. You can set fade in and fade out, volume, speed, pitch, bass, treble and reverb, or switch on 8D audio, AI noise removal, the vocal remover and more. Presets like <em>Slowed + Reverb</em>, <em>Nightcore</em> and <em>Bass Boosted</em> set everything with one tap.</p>
    <p>A second waveform shows what your effects do while you move the sliders, and <strong>Preview with effects</strong> plays the result before you save it.</p>
  </div>
  ${WHY}
  ${INSTALL_CALLOUT}
  <div class="section prose">
    <h2>How it works</h2>
    <p>Most converter sites make you upload your file, wait, and download it again. ${NAME} runs FFmpeg, the audio engine used by a lot of desktop software, directly in your browser. Your songs, voice notes and videos stay on your device the whole time. There are no pop-ups and no fake download buttons. The site is free because it shows a few ads, and they're always labelled.</p>
  </div>`,
    faq: [
      ['Is MeloCut free?', 'Yes. Every tool is free, paid for by a few labelled ads. There is no sign-up and no watermark.'],
      ['Are my files uploaded anywhere?', 'No. All processing happens in your browser on your own device.'],
      ['Does it work on iPhone and Android?', 'Yes. It works in Safari, Chrome, Firefox and Edge on phones, tablets and computers.'],
      ['Which file types can I open?', 'MP3, MP4, MOV, M4A, WAV, OGG, OPUS, FLAC, WebM, AAC, AMR, 3GP and most other audio and video formats.'],
      ['Can I install MeloCut as an app?', 'Yes. Add it to your home screen from Safari or Chrome. It opens full screen, and tools you have used before keep working offline. The install guide shows the steps.'],
      ['Does MeloCut use AI?', 'The noise remover uses RNNoise, a small neural network that separates speech from background noise. It runs on your device. The other effects are standard audio processing.'],
    ],
  },
  {
    path: 'video-to-mp3', tool: 'video-to-mp3', crumb: 'Tools',
    title: `Video to MP3 Converter, Free and Online | ${NAME}`,
    description: 'Convert MP4, MOV, WebM and other videos to MP3 in your browser. Up to 320 kbps, no upload, no sign-up. Works on iPhone and Android.',
    h1: 'Video to <em>MP3</em> converter',
    lead: 'Take the sound from any video and save it as MP3, M4A or WAV. It runs on your device, so even big videos are quick.',
    badges: ['Up to 320 kbps', 'MP4, MOV, WebM, MKV', 'No upload'],
    steps: [
      ['Choose your video', 'Tap the box above and pick a video, or drag one in.'],
      ['Trim it if you want', 'Keep all of the audio, or drag on the waveform to keep only part of it.'],
      ['Convert and download', 'Pick MP3 and a quality, press Convert, then Download.'],
    ],
    content: `
    <h2>Get the audio from a video</h2>
    <p>Filmed a concert, a lecture or something funny and only need the sound? Open the video here and save the audio as an MP3 you can play in your car, in a music app or anywhere else.</p>
    <h3>Which videos work?</h3>
    <p>MP4, MOV (the format iPhones record in), WebM, MKV, AVI and 3GP. If your browser can open the file, it will almost always work.</p>
    <h3>Which quality should I pick?</h3>
    <p>Use <strong>320 kbps</strong> for music. <strong>128 kbps</strong> is plenty for speech and makes much smaller files. Pick <strong>WAV</strong> if you want to edit the audio afterwards.</p>`,
    faq: [
      ['How do I convert MP4 to MP3?', 'Open the MP4 above, choose MP3 and a quality, press Convert and then Download. It takes a few seconds.'],
      ['Can I convert iPhone videos?', 'Yes. Pick the video from Photos or Files and it converts like any other.'],
      ['Is there a size limit?', 'File limits depend on your device and browser. Computers handle much bigger files than phones, and MeloCut does not accept files over 1 GB. For long videos, use a computer or trim the video first.'],
      ['Can I convert YouTube videos?', 'MeloCut works with files on your device. It does not download from YouTube or other sites.'],
    ],
  },
  {
    path: 'ringtone-maker', tool: 'ringtone', crumb: 'Tools',
    title: `Ringtone Maker for iPhone and Android, Free | ${NAME}`,
    description: 'Make a ringtone from any song. Pick the best part, add a fade and save it as M4R for iPhone or MP3 for Android. Free, no app needed.',
    h1: '<em>Ringtone maker</em> for iPhone and Android',
    lead: 'Pick your favorite part of a song and save it as a ringtone for iPhone (M4R) or Android (MP3).',
    badges: ['iPhone M4R', 'Android MP3', 'Fade in and out'],
    steps: [
      ['Choose a song', 'Open any song or video from your device.'],
      ['Pick the part you like', 'Drag on the waveform to select up to 40 seconds. Press Play to check it.'],
      ['Download the ringtone', 'Choose M4R for iPhone or MP3 for Android, then Make ringtone and Download.'],
    ],
    content: `
    <h2>Setting the ringtone on your phone</h2>
    <h3>iPhone</h3>
    <p>On iOS 26 and newer: keep it under 30 seconds, download it, open it in the <strong>Files</strong> app and tap <em>Share → Use as Ringtone</em>. On older versions with a computer: download the <strong>M4R</strong> file, connect your iPhone and drag the file onto it in Finder (Mac) or iTunes (Windows). It then shows up in <em>Settings → Sounds &amp; Haptics → Ringtone</em>. Without a computer, open the file in <strong>GarageBand</strong> on your iPhone and use <em>Share → Ringtone</em>.</p>
    <h3>Android</h3>
    <p>Download the <strong>MP3</strong>, go to <em>Settings → Sound → Phone ringtone</em> and pick it. On some phones you tap "+" or "Add ringtone" first.</p>
    <p>Step-by-step guides: <a href="/guides/make-ringtone/">how to make a song your ringtone</a>, <a href="/guides/iphone-ringtone/">iPhone without a computer</a>, <a href="/guides/samsung-ringtone/">Samsung Galaxy</a>, <a href="/guides/contact-ringtone/">a ringtone for one contact</a> and <a href="/guides/set-ringtone/">every phone</a>.</p>
    <h3>A few tips</h3>
    <p>Start just before the chorus, keep it between 20 and 30 seconds, and leave the fades on so it doesn't start or stop suddenly.</p>`,
    faq: [
      ['How long can a ringtone be?', 'Under 30 seconds if you set it from the iPhone Files app, and up to 40 seconds with GarageBand or a computer. MeloCut selects 29 seconds to start with and stops your selection at 40.'],
      ['What is an M4R file?', 'It is the ringtone format iPhones use. Inside it is a normal M4A (AAC) audio file.'],
      ['Can I make a ringtone from a video?', 'Yes. Open the video and MeloCut uses its sound.'],
      ['Is it free?', 'Yes, completely free, with no watermark and no sign-up.'],
    ],
  },
  {
    path: 'audio-cutter', tool: 'cutter', crumb: 'Tools',
    title: `Audio Cutter: Trim MP3 and Cut Songs Online | ${NAME}`,
    description: 'Trim MP3s and other audio online. Keep a part or cut one out, add fades, and save as MP3, M4A, WAV, OGG or FLAC. Free and private.',
    h1: '<em>Audio cutter</em>: trim MP3 and cut songs',
    lead: 'Trim the start and end of a song, or remove a part from the middle. Add fades and save in the format you need.',
    badges: ['Keep or remove a part', 'Fade in and out', 'MP3, M4A, WAV, OGG, FLAC'],
    steps: [
      ['Open your audio', 'Choose an MP3, WAV, M4A or any audio or video file.'],
      ['Select the part', 'Drag the handles on the waveform, or type the exact start and end times.'],
      ['Keep it or remove it', 'Choose Keep selection or Remove selection, then Cut and save, and Download.'],
    ],
    content: `
    <h2>Cut exactly where you want</h2>
    <p>The waveform shows where the music gets loud or quiet. Drag the handles to the right spot and press Play to listen before you save. For exact cuts, type the times yourself, for example <code>1:23.5</code>.</p>
    <h3>Remove something from the middle</h3>
    <p>Switch to <strong>Remove selection</strong> to take out an intro, a long pause, a mistake or an ad. The two parts on either side get joined automatically.</p>
    <h3>Avoid extra quality loss</h3>
    <p>Choose <strong>WAV</strong> or <strong>FLAC</strong> if you'll edit the file again later: neither adds compression loss. WAV is saved as 16-bit, the same as CD audio, which is plenty for listening and most editing.</p>`,
    faq: [
      ['How do I trim an MP3?', 'Open the MP3, drag the handles to the part you want, choose Keep selection, then press Cut and save, and Download.'],
      ['Can I cut a part out of the middle?', "Yes. Select the part you don't want and choose Remove selection."],
      ['Does cutting lower the quality?', 'Pick 320 kbps MP3 to keep it close to the original, or WAV or FLAC to avoid any extra compression loss. WAV is saved as 16-bit (CD quality).'],
      ['Does it work offline?', 'Yes, once you have used a tool online one time. The audio engine is then saved on your device.'],
    ],
  },
  {
    path: 'audio-converter', tool: 'converter', crumb: 'Tools',
    title: `Audio Converter: MP3, WAV, M4A, OGG, FLAC | ${NAME}`,
    description: 'Convert audio online for free: MP3, WAV, M4A, OGG, FLAC and OPUS. Change speed and volume too. Works with WhatsApp voice notes. No upload.',
    h1: '<em>Audio converter</em> for MP3, WAV, M4A, OGG and FLAC',
    lead: 'Convert between MP3, WAV, M4A, OGG and FLAC. It also opens WhatsApp and Telegram voice notes (OPUS).',
    badges: ['MP3, WAV, M4A, OGG, FLAC', 'Speed and volume', 'Voice notes'],
    steps: [
      ['Open a file', 'Any audio or video file, including WhatsApp .opus voice notes.'],
      ['Pick the format', 'Choose the output format and quality. Add effects if you like.'],
      ['Convert and download', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Convert almost any audio file</h2>
    <p>${NAME} opens MP3, WAV, M4A, AAC, OGG, OPUS, FLAC, AMR and WMA, and saves to the format your phone, car or app needs.</p>
    <p>Open <strong>Effects &amp; filters</strong> if you also want to add fades, change the speed or pitch, boost the bass or volume, clean up noise or add reverb.</p>
    <h3>Popular conversions</h3>
    ${CONVERSION_LINKS}
    <h3>WhatsApp and Telegram voice notes</h3>
    <p>Voice messages are saved as <code>.opus</code> or <code>.ogg</code> files that a lot of players won't open. Convert them to MP3 and they play anywhere.</p>`,
    faq: [
      ['How do I convert WAV to MP3?', 'Open the WAV, choose MP3 and a quality, then press Convert and Download.'],
      ['How do I convert a WhatsApp voice note to MP3?', 'Save the voice note (.opus) to your device, open it here, choose MP3 and press Convert.'],
      ['Which audio format is best?', 'MP3 plays everywhere. M4A sounds a little better at the same size. FLAC and WAV keep full quality but are bigger.'],
      ['Can I make a slowed + reverb version?', 'Yes. Tap the Slowed + Reverb preset in Effects, or use the Slowed + Reverb tool.'],
    ],
  },
  // ---------- format landing pages ----------
  {
    path: 'mp4-to-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `MP4 to MP3 Converter, Free and Private | ${NAME}`,
    description: 'Convert MP4 to MP3 online in a few seconds. Up to 320 kbps, no upload, no sign-up, no watermark. Works on iPhone, Android and PC.',
    h1: '<em>MP4 to MP3</em> converter',
    lead: 'Open an MP4 and save its sound as an MP3. It runs in your browser, so the video never leaves your device.',
    badges: ['Up to 320 kbps', 'No upload', 'Free'],
    steps: [
      ['Open the MP4', 'Tap the box above and choose your video.'],
      ['Pick a quality', '320 kbps for music, 128 kbps for speech.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Why convert MP4 to MP3?</h2>
    <p>An MP4 holds both video and sound. If you only want to listen, an MP3 is much smaller and plays on every phone, car stereo and music app.</p>
    <h3>Only need part of it?</h3>
    <p>Drag on the waveform to keep just the section you want, for example one song from a concert video.</p>`,
    faq: [
      ['Will the MP3 sound as good as the video?', 'At 320 kbps the difference is very hard to hear.'],
      ['How big will the MP3 be?', 'About 2.4 MB per minute at 320 kbps, or about 1 MB per minute at 128 kbps.'],
    ],
  },
  {
    path: 'wav-to-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `WAV to MP3 Converter, Free and Online | ${NAME}`,
    description: 'Convert WAV to MP3 online and make your files up to 10 times smaller. Choose 128 to 320 kbps. Free, private, no upload.',
    h1: '<em>WAV to MP3</em> converter',
    lead: 'Turn large WAV files into MP3s that are easy to share and play anywhere.',
    badges: ['Up to 10× smaller', '128 to 320 kbps', 'No upload'],
    steps: [
      ['Open the WAV', 'Choose a WAV file from your device.'],
      ['Pick a quality', '320 kbps keeps it closest to the original.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>WAV or MP3?</h2>
    <p>WAV files are uncompressed, so a three-minute song takes around 30 MB. As an MP3 at 320 kbps it's about 7 MB and sounds almost the same. That makes it much easier to email, upload or keep on your phone.</p>
    <p>Keep the WAV as well if you plan to edit the recording later.</p>`,
    faq: [
      ['Does converting WAV to MP3 lose quality?', 'A little, because MP3 is compressed. At 320 kbps most people cannot hear it.'],
      ['Can I convert several WAV files at once?', 'Convert them one after another, or join them into one MP3 with the Audio Joiner.'],
    ],
  },
  {
    path: 'm4a-to-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `M4A to MP3 Converter, Free and Online | ${NAME}`,
    description: 'Convert M4A to MP3 online: iPhone voice memos, iTunes audio and more. Free, private and quick. No upload, no sign-up.',
    h1: '<em>M4A to MP3</em> converter',
    lead: 'Convert iPhone voice memos and other M4A files to MP3 so they play on any device.',
    badges: ['Voice memos', 'iTunes audio', 'No upload'],
    steps: [
      ['Open the M4A', 'Choose the file. On iPhone, share a voice memo to Files first.'],
      ['Pick a quality', '128 kbps is fine for voice, 320 kbps for music.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>About M4A files</h2>
    <p>M4A is the audio format Apple uses for voice memos and iTunes downloads. It sounds good, but some older players, cars and Windows apps don't support it. MP3 works everywhere.</p>
    <h3>Voice memos with background noise?</h3>
    <p>Turn on <strong>AI noise removal</strong> in Effects before you convert, or use the <a href="/noise-remover/">AI Noise Remover</a>.</p>`,
    faq: [
      ['How do I get a voice memo off my iPhone?', 'In Voice Memos, tap the memo, then Share → Save to Files. Then open it here.'],
      ['Can I convert protected iTunes songs?', 'No. Songs with copy protection (DRM) cannot be converted.'],
    ],
  },
  {
    path: 'whatsapp-audio-to-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `WhatsApp Audio to MP3 (OPUS to MP3), Free | ${NAME}`,
    description: 'Convert WhatsApp and Telegram voice notes (.opus, .ogg) to MP3 so they play anywhere. Free and private: your messages never get uploaded.',
    h1: '<em>WhatsApp audio</em> to MP3',
    lead: 'Convert WhatsApp and Telegram voice notes (.opus or .ogg) to MP3. Your messages stay on your phone.',
    badges: ['OPUS and OGG', 'Private', 'Free'],
    steps: [
      ['Save the voice note', 'In WhatsApp, long-press the voice note → Share (or Export) → Save to Files.'],
      ['Open it here', 'Tap the box above and choose the .opus file.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Why WhatsApp voice notes don't play everywhere</h2>
    <p>WhatsApp saves voice messages as OPUS audio. It's a good format for speech, but many music players, editors and older phones can't open it. An MP3 plays everywhere and is easy to email or keep.</p>
    <h3>Private by design</h3>
    <p>Voice notes are personal, so it matters that ${NAME} never uploads them. The conversion happens on your own phone or computer.</p>
    <h3>Several voice notes?</h3>
    <p>Use the <a href="/audio-joiner/">Audio Joiner</a> to put them into one MP3.</p>`,
    faq: [
      ['Where does WhatsApp save voice notes on Android?', 'Usually in Internal storage → Android → media → com.whatsapp → WhatsApp → Media → WhatsApp Voice Notes.'],
      ['Can I make a voice note louder?', 'Yes. Raise Volume or turn on Auto loudness in Effects before converting.'],
    ],
  },
  {
    path: 'mp3-to-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `MP3 to WAV Converter, Free and Online | ${NAME}`,
    description: 'Convert MP3 to WAV online for editing, DJ software or CD burning. Free, quick and private. Nothing is uploaded.',
    h1: '<em>MP3 to WAV</em> converter',
    lead: 'Convert MP3s to WAV for editing software, DJ apps or burning CDs.',
    badges: ['16-bit WAV', 'For editing', 'No upload'],
    steps: [
      ['Open the MP3', 'Choose an MP3 from your device.'],
      ['WAV is already selected', 'Add effects first if you want.'],
      ['Download the WAV', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>When you need a WAV</h2>
    <p>Some editing programs, samplers and CD burning apps only take WAV. Converting gives you a file they all accept.</p>
    <p>One thing to know: converting an MP3 to WAV doesn't bring back quality the MP3 already lost. The WAV sounds the same as the MP3, it's just bigger and easier to edit.</p>`,
    faq: [
      ['Will MP3 to WAV improve the quality?', 'No. It keeps the quality the MP3 has, in a format that is easier to edit.'],
      ['Why is the WAV so much bigger?', 'WAV is uncompressed, so it uses about 10 MB per minute.'],
    ],
  },
  {
    path: 'flac-to-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `FLAC to MP3 Converter, Free and Online | ${NAME}`,
    description: 'Convert FLAC to MP3 online so your music plays on any phone, car or player. Choose up to 320 kbps. Free and private.',
    h1: '<em>FLAC to MP3</em> converter',
    lead: 'Convert lossless FLAC music to MP3 for your phone, car or any player.',
    badges: ['Up to 320 kbps', 'Smaller files', 'No upload'],
    steps: [
      ['Open the FLAC', 'Choose a FLAC file from your device.'],
      ['Pick 320 kbps', 'That keeps it as close to the original as MP3 allows.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>FLAC or MP3?</h2>
    <p>FLAC keeps every detail of the original recording, but the files are large and not every device plays them. A 320 kbps MP3 is around a third of the size and sounds very close, which is ideal for phones and cars.</p>`,
    faq: [
      ['Should I delete my FLAC files after converting?', 'Keep them if you have the space. You can always make new MP3s from them, but not the other way round.'],
    ],
  },
  // ---------- effect tools ----------
  {
    path: 'audio-joiner', tool: 'joiner', crumb: 'Tools',
    title: `Audio Joiner: Merge MP3 Songs Online, Free | ${NAME}`,
    description: 'Join MP3, M4A, WAV and other audio files into one. Reorder them, listen, add a crossfade and even out the volume. Free and private.',
    h1: '<em>Audio joiner</em>: merge songs into one file',
    lead: 'Put several songs, voice notes or clips together into one file. Listen to each one, change the order and add a crossfade.',
    badges: ['2 or more files', 'Crossfade', 'Even volume'],
    steps: [
      ['Add your files', 'Choose two or more audio or video files. You can add more later.'],
      ['Put them in order', 'Tap ▶ to listen, use the arrows to reorder, and set the crossfade or turn it off.'],
      ['Join, listen, download', 'Press Join files, listen to the result, then Download.'],
    ],
    content: `
    <h2>Mixes, medleys and long recordings</h2>
    <p>Make a party mix, join voice notes into one message, or put the parts of a recording back together. A <strong>crossfade</strong> blends each track into the next one, and <strong>Even out volume</strong> stops quiet files from sounding much softer than loud ones.</p>
    <h3>Different formats are fine</h3>
    <p>You can mix MP3, M4A, WAV, OGG, OPUS and videos in one go. ${NAME} converts them all to the same format first.</p>`,
    faq: [
      ['How many files can I join?', 'Two or more. There is no fixed number: how much you can join depends on your device and browser.'],
      ['Can I join files with no gap?', 'Yes. Turn the crossfade off and they play straight after each other.'],
      ['Can I join videos?', 'Yes. MeloCut takes the sound from each video and joins the audio.'],
    ],
  },
  {
    path: 'noise-remover', tool: 'denoise', crumb: 'Tools',
    title: `AI Noise Remover for Voice Recordings, Free | ${NAME}`,
    description: 'Remove background noise from voice recordings, voice notes and videos with AI. It runs on your device, nothing is uploaded. Free.',
    h1: '<em>AI</em> noise remover',
    lead: 'Remove wind, traffic, fans and hum from voice recordings. A small neural network does the work on your own device.',
    badges: ['Neural network (RNNoise)', 'Voice notes and podcasts', 'No upload'],
    steps: [
      ['Open your recording', 'A voice note, interview, lecture or video.'],
      ['Listen to the clean version', 'AI noise removal is already on. Press Preview with effects.'],
      ['Download', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>How the AI part works</h2>
    <p>${NAME} uses <strong>RNNoise</strong>, a neural network trained to tell speech apart from background noise. The model is about 300 KB and runs in your browser, so private recordings never leave your phone or computer.</p>
    <p>In our own test with a voice recorded next to a running fan, the noise in the pauses between words dropped by about 18 dB, which sounds roughly a third as loud, while the voice kept its level. Results depend on the recording, so press Preview and listen for yourself.</p>
    <h3>Getting the best result</h3>
    <p>It's made for speech: podcasts, interviews, voice notes and calls. On music it can remove instruments too, so for songs use <strong>Reduce hiss</strong> instead. <strong>Auto loudness</strong> and <strong>Remove silences</strong> are switched on here as well, which gives a cleaner result.</p>`,
    faq: [
      ['Is this real AI?', 'Yes. It uses RNNoise, a neural network for cleaning up speech. The model downloads the first time you use it and then runs on your device.'],
      ['Does it work on music?', 'It is designed for voices. On songs it may remove instruments, so use Reduce hiss for music.'],
      ['Is my recording uploaded?', 'No. Everything runs in your browser.'],
    ],
  },
  {
    path: 'slowed-reverb', tool: 'slowed-reverb', crumb: 'Tools',
    title: `Slowed + Reverb Maker, Free and Online | ${NAME}`,
    description: 'Make slowed + reverb versions of any song. Adjust speed, pitch and reverb, listen first, and download an MP3. Free, no watermark.',
    h1: '<em>Slowed + reverb</em> maker',
    lead: 'Make a slowed + reverb version of any song. The settings are ready to go, and you can adjust speed, pitch and reverb.',
    badges: ['Speed and pitch', 'Reverb', 'Nightcore too'],
    steps: [
      ['Open a song', 'Choose any song from your device.'],
      ['Adjust it', 'Speed 0.85× with reverb is already set. Change it and press Preview with effects.'],
      ['Download', 'Convert and save it as an MP3.'],
    ],
    content: `
    <h2>Good starting settings</h2>
    <p>The <a href="/guides/make-slowed-reverb/">slowed + reverb guide</a> explains each setting. Most slowed + reverb edits use a speed of <strong>0.80 to 0.90×</strong>, pitch <strong>1 to 3 semitones lower</strong> and reverb around <strong>35 to 55%</strong>. For a sped-up or nightcore version, tap the <em>Nightcore</em> preset.</p>`,
    faq: [
      ['How do I make a slowed + reverb song?', 'Open the song here. The effect is already set, so press Preview, change anything you like, then Convert and Download.'],
      ['Can I make a sped-up version?', 'Yes. Tap the Nightcore preset or raise the speed and pitch.'],
    ],
  },
  {
    path: 'vocal-remover', tool: 'karaoke', crumb: 'Tools',
    title: `Vocal Remover: Karaoke and Instrumental, Free | ${NAME}`,
    description: 'Remove vocals from songs to make karaoke and instrumental tracks. Free, private and quick. Nothing is uploaded.',
    h1: '<em>Vocal remover</em> and karaoke maker',
    lead: 'Take the singer out of a stereo song for a karaoke version. It removes what sits in the middle of the mix, so it is not AI stem separation: bass and drums get a bit quieter too.',
    badges: ['Karaoke', 'Stereo songs', 'Preview first'],
    steps: [
      ['Open a song', 'Choose a stereo song from your device.'],
      ['Listen first', 'The vocal remover is already on. Press Preview with effects.'],
      ['Download', 'Convert and save your karaoke track.'],
    ],
    content: `
    <h2>How it works</h2>
    <p>In most studio songs the lead vocal sits in the middle of the stereo mix, while instruments are spread left and right. The vocal remover cancels out what's in the middle and keeps the rest.</p>
    <h3>What it can't do</h3>
    <p>Bass and drums are often in the middle too, so they get quieter. Reverb on the voice can stay behind. Live recordings and mono files don't work, and ${NAME} will tell you if a file is mono. Turning up <strong>Bass</strong> in Effects brings some of the low end back. See <a href="/guides/remove-vocals/">how to remove vocals from a song</a> for more tips.</p>`,
    faq: [
      ['Does it work on every song?', 'It works best on studio songs with the vocal in the center. Mono recordings cannot be separated this way.'],
      ['Why is the bass quieter?', 'Bass is often in the center of the mix too. Raise the Bass slider to bring it back.'],
    ],
  },
  {
    path: '8d-audio', tool: '8d', crumb: 'Tools',
    title: `8D Audio Converter: Make 8D Songs, Free | ${NAME}`,
    description: 'Turn any song into 8D audio that moves around your head. Listen with headphones, then download an MP3. Free, no upload.',
    h1: '<em>8D audio</em> converter',
    lead: 'Make the music move around your head. Put on headphones, listen, then download.',
    badges: ['Use headphones', 'Adjustable reverb', 'MP3 or WAV'],
    steps: [
      ['Open a song', 'Choose any song from your device.'],
      ['Put on headphones', 'Press Preview with effects to hear it move.'],
      ['Download', 'Convert and save your 8D version.'],
    ],
    content: `
    <h2>What is 8D audio?</h2>
    <p>8D audio slowly pans the sound from one ear to the other and adds a bit of reverb, so the music seems to circle around you. You need headphones or earbuds to hear it.</p>`,
    faq: [["Why can't I hear the 8D effect?", 'You need headphones or earbuds. On one speaker the effect disappears.']],
  },
  {
    path: 'bass-booster', tool: 'bass', crumb: 'Tools',
    title: `Bass Booster: Boost Bass in MP3 Online, Free | ${NAME}`,
    description: 'Boost the bass of any song online. Choose how much, listen first and download. A limiter keeps it from distorting. Free, no upload.',
    h1: '<em>Bass booster</em>',
    lead: 'Give any song deeper, punchier bass. Choose how much, listen, then download.',
    badges: ['Up to +15 dB', 'No distortion', 'Preview first'],
    steps: [
      ['Open a song', 'Choose any song or video.'],
      ['Set the boost', 'The Bass slider starts at +10 dB. Change it and press Preview.'],
      ['Download', 'Convert and save.'],
    ],
    content: `
    <h2>More bass without crackling</h2>
    <p>${NAME} raises the low frequencies around 110 Hz and then evens out the volume with a limiter, so the bass hits harder without distorting. On phone speakers, +6 to +10 dB usually sounds best.</p>`,
    faq: [['How much bass boost should I use?', 'Start around +8 to +10 dB. Above +12 dB is very heavy and suits headphones or car speakers.']],
  },
  {
    path: 'volume-booster', tool: 'volume', crumb: 'Tools',
    title: `Volume Booster: Make Audio Louder Online, Free | ${NAME}`,
    description: 'Make quiet MP3s, voice notes and videos louder. Auto loudness evens the volume out without distortion. Free, no upload.',
    h1: '<em>Volume booster</em>',
    lead: 'Make quiet recordings louder and keep the volume even, without distortion.',
    badges: ['Up to 300%', 'Auto loudness', 'No distortion'],
    steps: [
      ['Open your file', 'A quiet song, voice note, lecture or video.'],
      ['Choose the boost', 'Auto loudness is on. Change the Volume slider and press Preview.'],
      ['Download', 'Convert and save.'],
    ],
    content: `
    <h2>Louder, but still clean</h2>
    <p><strong>Auto loudness</strong> measures the whole file and brings it to about the same loudness Spotify and YouTube use, so quiet recordings become clear. A limiter keeps the loudest moments from crackling.</p>`,
    faq: [['Will boosting the volume cause distortion?', 'No. A limiter keeps the peaks under control, so the result is louder without clipping.']],
  },
  {
    path: 'reverse-audio', tool: 'reverse', crumb: 'Tools',
    title: `Reverse Audio: Play Songs Backwards Online | ${NAME}`,
    description: 'Reverse any song, voice note or sound and hear it backwards. Listen first, then download an MP3. Free, quick and private: nothing is uploaded.',
    h1: '<em>Reverse</em> audio',
    lead: 'Play any sound, voice or song backwards. Good for challenges, sound effects and finding "hidden messages".',
    badges: ['Quick', 'Any format', 'No upload'],
    steps: [
      ['Open a file', 'Any song, voice note or video.'],
      ['Listen', 'Reverse is already on. Press Preview with effects.'],
      ['Download', 'Convert and save.'],
    ],
    content: `
    <h2>Ideas</h2>
    <p>Record yourself saying something and play it backwards for a reverse-speech challenge, look for "hidden messages" in songs, or make reverse cymbal swells for your own music. Add some reverb for the classic reverse-reverb sound.</p>`,
    faq: [['Can I reverse just part of a song?', 'Yes. Drag on the waveform to select the part, then convert.']],
  },
  // ---------- more format pages ----------
  {
    path: 'mov-to-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `MOV to MP3 Converter for iPhone Videos, Free | ${NAME}`,
    description: 'Convert MOV videos from your iPhone or Mac to MP3 in your browser. Up to 320 kbps, no upload, no app. Works right on your iPhone.',
    h1: '<em>MOV to MP3</em> converter',
    lead: 'iPhones record video as MOV. Open one here and save just the sound as an MP3, right on your phone.',
    badges: ['iPhone videos', 'Up to 320 kbps', 'No upload'],
    steps: [
      ['Open the MOV', 'Tap the box above and pick the video from Photos or Files.'],
      ['Trim it if you like', 'Drag on the waveform to keep only the part you want.'],
      ['Download the MP3', 'Press Convert, then Download. It goes to Files → Downloads.'],
    ],
    content: `
    <h2>Why iPhone videos are MOV files</h2>
    <p>The Camera app saves video in Apple's QuickTime format, which ends in <code>.mov</code>. Inside is normal video and AAC sound, so ${NAME} can pull the audio out and save it as an MP3 that plays on any phone, car or computer.</p>
    <h3>Good uses</h3>
    <p>Save a song from a concert you filmed, keep the audio of a lecture or a toast, or turn a funny moment into a <a href="/ringtone-maker/">ringtone</a>. If the recording is noisy, switch on <strong>AI noise removal</strong> in Effects before you convert.</p>
    <h3>Big videos</h3>
    <p>A long 4K video can be several gigabytes. File limits depend on your device and browser: computers handle much bigger videos than phones, and ${NAME} does not accept files over 1 GB. For long videos, trim the video in Photos first, or use a computer.</p>`,
    faq: [
      ['How do I convert a MOV to MP3 on iPhone?', 'Open this page in Safari, tap the box, choose the video from Photos, then press Convert and Download. No app is needed.'],
      ['Is the video uploaded?', 'No. The conversion runs on your phone or computer, so the video never leaves it.'],
      ['Can I keep the audio as M4A instead?', 'Yes. Choose M4A in the Format menu. It is the same AAC sound the video already has.'],
    ],
  },
  {
    path: 'ogg-to-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `OGG to MP3 Converter, Free and Online | ${NAME}`,
    description: 'Convert OGG and OGA audio files to MP3 so they play on iPhone, in cars and in every music app. Free, quick, and nothing is uploaded.',
    h1: '<em>OGG to MP3</em> converter',
    lead: 'Turn OGG files from games, Telegram, Discord or Linux apps into MP3s that play everywhere.',
    badges: ['OGG Vorbis and Opus', 'Up to 320 kbps', 'No upload'],
    steps: [
      ['Open the OGG', 'Choose an .ogg or .oga file from your device.'],
      ['Pick a quality', '192 kbps is a good middle ground. Use 320 kbps for music.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>What is an OGG file?</h2>
    <p>OGG is an open audio format. Most OGG files hold <strong>Vorbis</strong> music, and voice messages from apps like Telegram and WhatsApp often hold <strong>Opus</strong> speech. Both sound good, but iPhones, many car stereos and older players won't open them.</p>
    <p>${NAME} reads both kinds and saves a standard MP3. If the file is a voice message, the <a href="/whatsapp-audio-to-mp3/">voice note converter</a> page has tips for getting it out of the app first.</p>
    <h3>Converting the other way</h3>
    <p>Need OGG instead? Open any file in the <a href="/audio-converter/">Audio Converter</a> and choose OGG as the format.</p>`,
    faq: [
      ['Why won\'t my iPhone play OGG files?', 'Apple supports only some OGG files in a few apps. Converting to MP3 or M4A makes them play everywhere.'],
      ['Does converting OGG to MP3 lose quality?', 'Both are compressed formats, so a little. At 256 or 320 kbps it is very hard to hear.'],
    ],
  },
  {
    path: 'aac-to-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `AAC to MP3 Converter, Free and Private | ${NAME}`,
    description: 'Convert AAC audio files to MP3 for older players, cars and apps that need MP3. Free, quick, works on phones, and nothing is uploaded.',
    h1: '<em>AAC to MP3</em> converter',
    lead: 'Convert .aac files from recorders, radio apps and downloads into MP3s that every device can play.',
    badges: ['.aac and .m4a', 'Up to 320 kbps', 'No upload'],
    steps: [
      ['Open the AAC', 'Choose an .aac file from your device.'],
      ['Pick a quality', 'Keep it at or above the original bitrate. 192 kbps suits most files.'],
      ['Download the MP3', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>AAC or MP3?</h2>
    <p>AAC is the newer format and sounds a little better at the same size, which is why Apple, YouTube and many radio apps use it. MP3 is older but plays on everything, including car stereos and simple MP3 players that don't support AAC.</p>
    <h3>Same thing as M4A?</h3>
    <p>Almost. An M4A file is AAC audio inside an MP4 container, while a <code>.aac</code> file is the raw stream. ${NAME} opens both. For M4A files there is a separate <a href="/m4a-to-mp3/">M4A to MP3</a> page.</p>`,
    faq: [
      ['Which bitrate should I choose?', 'Pick at least the bitrate of the original. Going higher does not add quality, it only makes the file bigger.'],
      ['Can I convert several AAC files into one MP3?', 'Yes. Use the Audio Joiner to put them together and save one MP3.'],
    ],
  },
  // ---------- more effect pages ----------
  {
    path: 'speed-up-audio', tool: 'converter', crumb: 'Tools', fx: { speed: 1.25 }, suffix: ' (faster)',
    note: 'Speed is set to 1.25×. Move the Speed slider, press Play with effects, then Convert.',
    title: `Speed Up Audio Online: Faster MP3, Same Pitch | ${NAME}`,
    description: 'Speed up a song, podcast or voice note without the chipmunk sound. Choose 1.1× to 2×, listen first, and download an MP3. Free, no upload.',
    h1: '<em>Speed up</em> audio',
    lead: 'Make a song, podcast, lecture or voice note faster while the voice keeps its normal pitch.',
    badges: ['Up to 2×', 'Same pitch', 'Preview first'],
    steps: [
      ['Open your file', 'Any song, voice note, podcast or video.'],
      ['Choose the speed', '1.25× is already set. Move the Speed slider and press Play with effects.'],
      ['Download', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Faster without the chipmunk voice</h2>
    <p>Simply playing audio faster also raises the pitch, so voices sound like cartoons. ${NAME} uses time stretching instead: it shortens the audio while keeping every voice and note at its normal pitch.</p>
    <h3>Which speed to pick</h3>
    <p><strong>1.25×</strong> saves a quarter of the time and still sounds natural for speech. <strong>1.5×</strong> is popular for lectures and long voice notes. Above <strong>1.75×</strong>, speech gets hard to follow. For the sped-up song trend with a higher voice, use the <a href="/nightcore-maker/">Nightcore Maker</a>.</p>
    <h3>Even shorter</h3>
    <p>Switch on <strong>Remove silences</strong> as well to cut out the pauses, or use the <a href="/remove-silence/">Remove Silence</a> tool on its own.</p>`,
    faq: [
      ['Will the voice sound higher?', 'No. The pitch stays the same. Only the tempo changes.'],
      ['How do I speed up a voice note?', 'Open it here, set the speed, press Convert and Download. The new file is shorter and plays anywhere.'],
      ['Can I make a sped-up song for TikTok?', 'Yes. For the classic sped-up sound with a higher pitch, use the Nightcore preset or raise the Pitch slider too.'],
    ],
  },
  {
    path: 'slow-down-audio', tool: 'converter', crumb: 'Tools', fx: { speed: 0.8 }, suffix: ' (slower)',
    note: 'Speed is set to 0.80×. Move the Speed slider, press Play with effects, then Convert.',
    title: `Slow Down Audio Online Without Changing Pitch | ${NAME}`,
    description: 'Slow down songs, speech or voice notes to learn lyrics, practice an instrument or transcribe. Same pitch, preview first, free and private.',
    h1: '<em>Slow down</em> audio',
    lead: 'Play a song or recording slower without the deep, dragging voice. Good for learning songs, dancing and transcribing.',
    badges: ['Down to 0.5×', 'Same pitch', 'Preview first'],
    steps: [
      ['Open your file', 'A song, lesson, interview or voice note.'],
      ['Choose the speed', '0.80× is already set. Move the Speed slider and press Play with effects.'],
      ['Download', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Slower, but still in tune</h2>
    <p>${NAME} stretches the audio in time and keeps the pitch where it was, so a guitar solo or a fast rap verse becomes easy to follow and still sounds like the original.</p>
    <h3>Practising an instrument</h3>
    <p>Start around <strong>0.70×</strong>, learn the part, then go up to 0.85× and finally full speed. To loop a short section, select it on the waveform first so only that part gets exported.</p>
    <h3>Want the slowed + reverb sound?</h3>
    <p>That trend also lowers the pitch and adds reverb. The <a href="/slowed-reverb/">Slowed + Reverb</a> tool has it set up for you.</p>`,
    faq: [
      ['Does slowing down change the pitch?', 'No. The notes stay in the same key. Only the tempo changes.'],
      ['How slow can I go?', 'Down to half speed (0.5×). Below about 0.6× some songs start to sound a bit smeared.'],
    ],
  },
  {
    path: 'pitch-changer', tool: 'converter', crumb: 'Tools', fx: { pitch: -2 }, suffix: ' (new key)',
    note: 'Pitch is set 2 semitones lower. Move the Pitch slider, press Play with effects, then Convert.',
    title: `Pitch Changer: Change the Key of a Song Online | ${NAME}`,
    description: 'Change the key of any song up or down by up to 12 semitones without changing its speed. Good for singing and playing along. Free, no upload.',
    h1: '<em>Pitch changer</em> and key shifter',
    lead: 'Move a song up or down to a key that suits your voice or instrument. The tempo stays the same.',
    badges: ['±12 semitones', 'Same speed', 'Preview first'],
    steps: [
      ['Open a song', 'Any song or video from your device.'],
      ['Change the key', 'It starts 2 semitones lower. Move the Pitch slider and press Play with effects.'],
      ['Download', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>Singing in a key that fits you</h2>
    <p>If a song is too high to sing, lower it by <strong>2 or 3 semitones</strong>. If it's too low, raise it. One semitone is one key on a piano, and 12 semitones make a full octave.</p>
    <h3>Playing along on guitar or piano</h3>
    <p>Songs are sometimes tuned a little off or recorded in an awkward key. Shift the song to a key you know, or use a capo position and move the song to match it.</p>
    <h3>Karaoke tip</h3>
    <p>Combine it with the <strong>Vocal remover</strong> in Effects, or start in the <a href="/vocal-remover/">Vocal Remover</a>, to get a karaoke track in your own key.</p>`,
    faq: [
      ['Does changing the pitch change the speed?', 'No. The song keeps its tempo and length. Only the key moves.'],
      ['How many semitones is a key change?', 'Each semitone is one step. Going from C to D is 2 semitones, and 12 semitones is one octave.'],
    ],
  },
  {
    path: 'nightcore-maker', tool: 'converter', crumb: 'Tools', fx: { speed: 1.2, pitch: 3 }, suffix: ' (nightcore)',
    note: 'Nightcore is set up: 1.20× speed and 3 semitones higher. Press Play with effects to hear it.',
    title: `Nightcore Maker: Make Sped Up Songs Online, Free | ${NAME}`,
    description: 'Turn any song into a nightcore or sped up version: faster and higher pitched. Adjust speed and pitch, listen first and download an MP3. Free.',
    h1: '<em>Nightcore</em> and sped up song maker',
    lead: 'Make the fast, high, energetic version of any song. The settings are ready, and you can fine-tune them.',
    badges: ['Speed and pitch', 'Preview first', 'MP3 or WAV'],
    steps: [
      ['Open a song', 'Choose any song from your device.'],
      ['Adjust it', '1.20× speed and +3 semitones are set. Press Play with effects.'],
      ['Download', 'Convert and save it as an MP3.'],
    ],
    content: `
    <h2>The nightcore sound</h2>
    <p>Nightcore edits play a song about <strong>15 to 30% faster</strong> and raise the pitch by <strong>2 to 4 semitones</strong>, which gives the bright, energetic sound. The sped up versions on TikTok and Instagram use the same idea, usually a bit less extreme.</p>
    <h3>Ideas</h3>
    <p>Add a little <strong>Bass</strong> so it doesn't sound thin, switch on <strong>Auto loudness</strong> to keep it punchy, or go the other way with the <a href="/slowed-reverb/">Slowed + Reverb</a> maker.</p>`,
    faq: [
      ['What is the difference between nightcore and sped up?', 'Both are faster and higher. Nightcore is usually more extreme. Lower the speed to about 1.1× for a softer sped up version.'],
      ['Can I keep the original pitch?', 'Yes. Set Pitch back to 0, or use the Speed Up Audio tool, which keeps the pitch.'],
    ],
  },
  {
    path: 'remove-silence', tool: 'converter', crumb: 'Tools', fx: { silence: true }, suffix: ' (no silence)',
    note: 'Remove silences is on. It cuts every quiet gap longer than about 0.8 seconds. Press Play with effects to check.',
    title: `Remove Silence from Audio Online, Free | ${NAME}`,
    description: 'Cut long pauses and dead air out of voice recordings, podcasts, lectures and voice notes automatically. Free, private, nothing uploaded.',
    h1: '<em>Remove silence</em> from audio',
    lead: 'Automatically cut the long pauses and dead air out of recordings, so they get shorter and easier to listen to.',
    badges: ['Automatic', 'Voice and podcasts', 'No upload'],
    steps: [
      ['Open your recording', 'A voice note, podcast, lecture or video.'],
      ['Check the result', 'Remove silences is already on. Press Play with effects.'],
      ['Download', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>How it works</h2>
    <p>${NAME} looks for stretches where the sound stays below a very quiet level for more than about <strong>0.8 seconds</strong> and cuts them out. Normal pauses between words stay, so speech still sounds natural.</p>
    <h3>Works best on</h3>
    <p>Voice recordings, lectures, interviews and long voice notes. On music it would also cut quiet intros and endings, so it's usually not what you want for songs.</p>
    <h3>Noisy room?</h3>
    <p>If there's a fan or traffic in the background, the gaps aren't really silent. Switch on <strong>AI noise removal</strong> as well, or use the <a href="/noise-remover/">AI Noise Remover</a>, which has this turned on too.</p>`,
    faq: [
      ['Will it cut the pauses between words?', 'No. Only quiet gaps longer than about 0.8 seconds are removed.'],
      ['Why did nothing get removed?', 'The pauses probably contain background noise. Turn on AI noise removal or Reduce hiss and try again.'],
    ],
  },
  {
    path: 'fade-in-fade-out', tool: 'cutter', crumb: 'Tools', fx: { fadeIn: 3, fadeOut: 3 }, suffix: ' (faded)',
    note: 'A 3 second fade in and fade out is set. Select a part if you like, then press Play with effects.',
    title: `Add Fade In and Fade Out to MP3 Online, Free | ${NAME}`,
    description: 'Add a smooth fade in and fade out to any song or recording. Choose the length, trim it if you like, listen first and download. Free, no upload.',
    h1: 'Add <em>fade in</em> and <em>fade out</em>',
    lead: 'Give a song or clip a smooth start and ending instead of a sudden cut. Pick the fade length and listen before you save.',
    badges: ['0 to 10 seconds', 'Trim too', 'MP3, WAV, FLAC'],
    steps: [
      ['Open your file', 'Any song, recording or video.'],
      ['Set the fades', '3 seconds each is set. Change them in Effects and press Play with effects.'],
      ['Download', 'Press Convert, then Download.'],
    ],
    content: `
    <h2>When a fade helps</h2>
    <p>A fade makes music start and stop gently. It's useful for ringtones, background music in videos, a part cut out of a longer song, or a slideshow that ends before the music does.</p>
    <h3>How long should a fade be?</h3>
    <p>For a ringtone or short clip, <strong>1 to 2 seconds</strong>. For background music or the end of a song, <strong>3 to 6 seconds</strong>. ${NAME} never lets a fade take more than a quarter of the clip, so short clips stay audible.</p>
    <h3>Fade only one end</h3>
    <p>Set the other slider to <em>off</em>. To make a ringtone with fades, the <a href="/ringtone-maker/">Ringtone Maker</a> has them set up already.</p>`,
    faq: [
      ['Can I fade just part of a song?', 'Yes. Drag on the waveform to select the part you want. The fades are added to the start and end of your selection.'],
      ['Does it lower the quality?', 'Pick WAV or FLAC for no loss at all, or 320 kbps MP3 to keep it very close to the original.'],
    ],
  },
  // ---------- guides ----------
  {
    path: 'guides', crumb: null, plain: true,
    title: `Guides: Ringtones, Installing the App and More | ${NAME}`,
    description: `Step-by-step guides: install ${NAME} on your phone, set a custom ringtone on iPhone and Android, and find your downloaded files.`,
    h1: 'Guides',
    lead: 'Short, step-by-step guides for the things people ask us most: ringtones, downloads, formats and cleaning up recordings.',
    body: `<div class="section prose" style="margin-top:0"><p>Every guide works with the free ${NAME} tools, on iPhone, Android and computers. The steps use the real menu names, and they're kept up to date when phones change them.</p></div>
    <div class="cards">${GUIDES.map(guideCard).join('')}</div>
    <div class="section"><h2>Popular tools</h2><div class="cards">${TOOLS.filter((t) => ['ringtone-maker', 'video-to-mp3', 'audio-cutter', 'noise-remover'].includes(t.slug)).map((t) => toolCardIn(t, 'en')).join('')}</div></div>
    <div class="section"><h2>Popular conversions</h2>${CONVERSION_LINKS}</div>`,
  },
  {
    path: 'guides/install-app', crumb: 'Guides', plain: true,
    title: `How to Install ${NAME} on iPhone and Android | ${NAME}`,
    description: `Add ${NAME} to your iPhone or Android home screen in a few taps. It opens like an app and keeps working offline once you've used it. Free, no app store needed.`,
    h1: 'Install MeloCut on your phone',
    lead: "You don't need an app store. Add MeloCut to your home screen and it opens full screen like any other app.",
    content: `
    <div class="callout install-native"><p>Your browser can install MeloCut right now.</p><a class="btn sm install-btn" href="#">Install app</a></div>
    <h2>iPhone and iPad (Safari)</h2>
    <ol class="guide-steps">
      <li>Open <strong>${SITE_URL.replace('https://', '')}</strong> in <strong>Safari</strong>.</li>
      <li>Tap the <strong>Share</strong> button, the square with an arrow pointing up, at the bottom of the screen.</li>
      <li>Scroll down and tap <strong>Add to Home Screen</strong>, then <strong>Add</strong>.</li>
      <li>Open MeloCut from your home screen. It now opens full screen like an app.</li>
    </ol>
    <h2>Android (Chrome)</h2>
    <ol class="guide-steps">
      <li>Open <strong>${SITE_URL.replace('https://', '')}</strong> in <strong>Chrome</strong>.</li>
      <li>Tap <strong>Install app</strong> if it pops up, or tap the <strong>⋮</strong> menu in the top right.</li>
      <li>Tap <strong>Install app</strong> (on some phones <strong>Add to Home screen</strong>), then <strong>Install</strong>.</li>
      <li>MeloCut now shows up in your app drawer and on your home screen.</li>
    </ol>
    <h2>Windows, Mac and Chromebook</h2>
    <ol class="guide-steps">
      <li>In <strong>Chrome</strong> or <strong>Edge</strong>, click the install icon at the right end of the address bar.</li>
      <li>Click <strong>Install</strong>. MeloCut opens in its own window and gets a desktop icon.</li>
    </ol>
    <h2>Why install it?</h2>
    <p>It opens straight to the tools without the browser's address bar, it's one tap away on your home screen, and it keeps working offline. It takes almost no space, and it updates itself whenever the site does.</p>
    <h2>Can't find "Add to Home Screen"?</h2>
    <ol class="guide-steps">
      <li><strong>iPhone:</strong> make sure you're in Safari. In Chrome on iPhone, tap the Share button in the address bar instead; on older iOS versions only Safari can do it.</li>
      <li><strong>Samsung Internet:</strong> tap the menu (☰) → <strong>Add page to</strong> → <strong>Home screen</strong>.</li>
      <li><strong>Private or incognito tab:</strong> switch to a normal tab first. Installing doesn't work in private mode.</li>
      <li><strong>Firefox on Android:</strong> tap ⋮ → <strong>Install</strong> (or <strong>Add to Home screen</strong>).</li>
    </ol>
    <h2>Using it offline</h2>
    <p>The first time you use a tool you need an internet connection, because the audio engine (about 30 MB) is downloaded then. After that it is saved on your device, so the tools keep working on a plane or with a bad connection. Open one tool while you're online before you travel.</p>`,
    faq: [
      ['Is the app free?', 'Yes. It is the same free website, just on your home screen.'],
      ['How much space does it take?', 'About 30 MB for the audio engine, which is less than most apps.'],
      ['How do I remove it?', 'Like any other app: long-press the icon and choose Remove.'],
      ['Does it update itself?', 'Yes. Each time you open it with a connection, it loads the newest version in the background.'],
      ['Is it in the App Store or Google Play?', 'No. It is a web app, so you install it from the browser. That is why it needs no account and no store download.'],
    ],
  },
  {
    path: 'guides/set-ringtone', crumb: 'Guides', plain: true, video: RINGTONE_VIDEO,
    title: `How to Set a Custom Ringtone on iPhone and Android | ${NAME}`,
    description: 'Make a ringtone from any song and set it on your iPhone (with GarageBand or a computer) or Android phone. Step by step, free.',
    h1: 'How to set a custom ringtone',
    lead: 'First make your ringtone with the free Ringtone Maker, then follow the steps for your phone.',
    content: `
    <div class="callout"><p>No ringtone yet? Making one takes about 30 seconds.</p><a class="btn sm" href="/ringtone-maker/">Open Ringtone Maker</a></div>
    <h2>iPhone with iOS 26 or newer (easiest)</h2>
    <ol class="guide-steps">
      <li>In the Ringtone Maker keep the selection <strong>under 30 seconds</strong> (the first 29 seconds are selected for you), then download it. It goes to the <strong>Files</strong> app, in Downloads.</li>
      <li>Open <strong>Files → Downloads</strong> and tap the ringtone so it opens.</li>
      <li>Tap <strong>Share</strong> → <strong>Use as Ringtone</strong>. Settings opens with it selected.</li>
    </ol>
    <p>The <a href="/guides/iphone-ringtone/">iPhone ringtone guide</a> has more detail and fixes for when the option is missing.</p>
    <h2>Older iPhones without a computer (GarageBand)</h2>
    <ol class="guide-steps">
      <li>In the Ringtone Maker choose <strong>MP3</strong> (or M4A) and download your ringtone. It goes to the <strong>Files</strong> app, in Downloads.</li>
      <li>Install <strong>GarageBand</strong> (free, made by Apple) and open it. Start any instrument, for example Audio Recorder.</li>
      <li>Tap the <strong>tracks view</strong> button, then the <strong>loop</strong> icon in the top right → <strong>Files</strong> → <strong>Browse items from the Files app</strong>, and pick your ringtone.</li>
      <li>Drag it onto the track, then tap the <strong>⌄</strong> arrow in the top left → <strong>My Songs</strong>.</li>
      <li>Long-press the song → <strong>Share</strong> → <strong>Ringtone</strong> → <strong>Export</strong> → <strong>Use sound as… Standard Ringtone</strong>.</li>
    </ol>
    <h2>iPhone with a Mac or PC</h2>
    <ol class="guide-steps">
      <li>Choose <strong>M4R (iPhone ringtone)</strong> in the Ringtone Maker and download it on your computer.</li>
      <li>Connect your iPhone with a cable. Open <strong>Finder</strong> on a Mac, or <strong>iTunes</strong> or <strong>Apple Devices</strong> on Windows, and select your iPhone.</li>
      <li>Drag the <strong>.m4r</strong> file onto your iPhone in the sidebar. It copies over in a few seconds.</li>
      <li>On the iPhone open <strong>Settings → Sounds &amp; Haptics → Ringtone</strong> and pick it.</li>
    </ol>
    <h2>Android</h2>
    <ol class="guide-steps">
      <li>Choose <strong>MP3</strong> in the Ringtone Maker and download it.</li>
      <li>Open <strong>Settings → Sound &amp; vibration → Phone ringtone</strong>.</li>
      <li>Tap <strong>+</strong>, <strong>Add ringtone</strong> or <strong>My sounds</strong> (the name depends on your phone) and pick the file from Downloads.</li>
      <li>For one contact only: open the contact → <strong>⋮</strong> → <strong>Set ringtone</strong>.</li>
    </ol>
    <h2>Tips</h2>
    <p>Keep it between 20 and 30 seconds, start just before the chorus and leave the fades on. If it's too quiet, raise <strong>Volume</strong> in Effects.</p>`,
    faq: [
      ["Why doesn't my ringtone show up on my iPhone?", 'From the Files app it has to be under 30 seconds. From a computer it can be up to 40 seconds and must be an M4R file. MeloCut makes both.'],
      ['Can I set a text tone too?', 'Yes. On iPhone choose Text Tone in Sounds & Haptics. On Android choose Notification sound.'],
    ],
  },
  {
    path: 'guides/find-downloads', crumb: 'Guides', plain: true,
    title: `Where Are My Downloaded Files? iPhone, Android, PC | ${NAME}`,
    description: 'Find the files you downloaded from MeloCut on iPhone, Android, Windows and Mac, and move them to your music app.',
    h1: 'Where are my downloads?',
    lead: "Downloaded a file and can't find it? Here's where it goes on each device.",
    content: `
    <h2>iPhone and iPad</h2>
    <ol class="guide-steps">
      <li>Open the <strong>Files</strong> app → <strong>Browse</strong> → <strong>On My iPhone</strong> (or iCloud Drive) → <strong>Downloads</strong>.</li>
      <li>Tap the file to play it, or long-press → <strong>Share</strong> to send it to WhatsApp, GarageBand or another app.</li>
    </ol>
    <h2>Android</h2>
    <ol class="guide-steps">
      <li>Open the <strong>Files</strong> or <strong>My Files</strong> app → <strong>Downloads</strong>.</li>
      <li>Most music players find new MP3s on their own. If yours doesn't, move the file to the <strong>Music</strong> folder.</li>
    </ol>
    <h2>Samsung phones</h2>
    <ol class="guide-steps">
      <li>Open <strong>My Files</strong> → <strong>Downloads</strong>, or <strong>Audio</strong> to see every sound file on the phone.</li>
      <li>In Samsung Internet, the menu (☰) → <strong>Downloads</strong> also lists them.</li>
    </ol>
    <h2>Windows and Mac</h2>
    <ol class="guide-steps">
      <li>Open your <strong>Downloads</strong> folder in File Explorer (Windows) or Finder (Mac).</li>
      <li>In Chrome you can also press <strong>Ctrl+J</strong> on Windows or <strong>⌘+Shift+J</strong> on Mac to see recent downloads.</li>
    </ol>
    <h2>Nothing downloaded?</h2>
    <ol class="guide-steps">
      <li>Make sure you pressed the green <strong>Download</strong> button after converting. The first button only converts.</li>
      <li>On iPhone, Safari may ask "Do you want to download…?". Tap <strong>Download</strong>, then look for the blue arrow in the address bar.</li>
      <li>Check whether your browser saves to a different folder: in Safari go to <em>Settings → Apps → Safari → Downloads</em>, in Chrome open <em>Settings → Downloads</em>.</li>
    </ol>
    <h2>Getting the file into your music app</h2>
    <p>On Android, most music players pick up new MP3s by themselves, or after you move them to the <strong>Music</strong> folder. On iPhone the Music app only takes songs synced from a computer, so play your files from the <strong>Files</strong> app or a player like VLC, or send them to yourself in WhatsApp.</p>`,
    faq: [
      ['Why is my file called something different?', 'MeloCut keeps your original name and adds what you did in brackets, for example "song (ringtone).m4r", so the original is never overwritten.'],
      ['Can I change where downloads go?', 'Yes. Each browser has a Downloads setting where you can pick a folder or ask every time.'],
    ],
  },
  {
    path: 'guides/best-audio-format', crumb: 'Guides', plain: true,
    title: `MP3, M4A, WAV or FLAC: Which Audio Format to Use | ${NAME}`,
    description: 'A plain guide to audio formats and bitrates: when to use MP3, M4A, WAV, FLAC or OGG, and what 128, 192 and 320 kbps actually mean.',
    h1: 'Which audio format should you use?',
    lead: 'MP3, M4A, WAV, FLAC, OGG and what kbps means, explained without the jargon.',
    content: `
    <h2>The short answer</h2>
    <p>Use <strong>MP3 at 320 kbps</strong> for music you want to play anywhere, <strong>MP3 at 128 kbps</strong> for speech, and <strong>WAV or FLAC</strong> only if you plan to edit the file again.</p>
    <h2>The formats</h2>
    <h3>MP3</h3>
    <p>Plays on every phone, computer, car and speaker made in the last 25 years. It throws away sound most people can't hear to keep files small. At 320 kbps it's very hard to tell apart from the original.</p>
    <h3>M4A (AAC)</h3>
    <p>Apple's default. It sounds slightly better than MP3 at the same size, and it's what iPhone voice memos and ringtones (M4R) use. Some older players and cars don't support it.</p>
    <h3>WAV</h3>
    <p>Uncompressed, so no compression loss and editing programs love it. The downside is size: about 10 MB per minute. ${NAME} saves WAV as 16-bit, the same as CD audio.</p>
    <h3>FLAC</h3>
    <p>Also lossless, but compressed to roughly half the size of WAV. Good for keeping a music collection at full quality. Not every device plays it.</p>
    <h3>OGG and OPUS</h3>
    <p>Open formats used by apps like WhatsApp and Telegram. They're efficient, especially for voice, but many players can't open them, which is why people convert them to MP3.</p>
    <h2>What kbps means</h2>
    <p>Kbps (kilobits per second) is how much data is used for each second of sound. More data means better sound and bigger files.</p>
    <ol class="guide-steps">
      <li><strong>128 kbps</strong>: about 1 MB per minute. Fine for podcasts, lectures and voice notes.</li>
      <li><strong>192 kbps</strong>: about 1.4 MB per minute. Good for music on phone speakers.</li>
      <li><strong>256 to 320 kbps</strong>: about 2 to 2.4 MB per minute. Best for music on headphones or a good speaker.</li>
    </ol>
    <h2>One thing to avoid</h2>
    <p>Converting a small MP3 to WAV or a higher bitrate doesn't bring back lost quality. It just makes the file bigger. Always start from the best original you have.</p>
    <div class="callout"><p>Ready to convert a file?</p><a class="btn sm" href="/audio-converter/">Open the converter</a></div>`,
    faq: [
      ['Is 320 kbps better than 128 kbps?', 'Yes, for music. For speech, 128 kbps already sounds clear and the file is less than half the size.'],
      ['Which format do iPhones use for ringtones?', 'M4R, which is an M4A file with a different name. The Ringtone Maker creates it for you.'],
    ],
  },
  {
    path: 'guides/clean-up-voice-memo', crumb: 'Guides', plain: true,
    title: `How to Trim and Clean Up a Voice Memo or Recording | ${NAME}`,
    description: 'Cut the start and end of a voice memo, remove background noise and long pauses, make it louder and save it as MP3. Works on iPhone and Android.',
    h1: 'How to clean up a voice memo',
    lead: 'Trim it, remove background noise and long pauses, make it louder, and save it as an MP3 you can share.',
    content: `
    <h2>1. Get the recording onto your phone's files</h2>
    <ol class="guide-steps">
      <li><strong>iPhone Voice Memos:</strong> tap the memo, then <strong>Share → Save to Files</strong>.</li>
      <li><strong>Android recorder:</strong> recordings are usually already in <strong>Files → Recordings</strong>.</li>
      <li><strong>WhatsApp voice note:</strong> long-press it → <strong>Share</strong> or <strong>Export</strong> → Save to Files.</li>
    </ol>
    <h2>2. Open it in the noise remover</h2>
    <p>Go to the <a href="/noise-remover/">AI Noise Remover</a> and open the file. AI noise removal, Auto loudness and Remove silences are already switched on.</p>
    <h2>3. Trim the start and end</h2>
    <p>Drag the handles on the waveform so the selection starts just before the first word and ends just after the last one. Press <strong>Play</strong> to check.</p>
    <h2>4. Listen before saving</h2>
    <p>Press <strong>Preview with effects</strong>. If the voice sounds thin, lower the Treble slider a little. If it's still too quiet, raise Volume.</p>
    <h2>5. Save it</h2>
    <p>Choose <strong>MP3</strong> and <strong>128 kbps</strong> (plenty for speech), press Convert, then Download.</p>
    <h2>Recording tips for next time</h2>
    <ol class="guide-steps">
      <li>Hold the phone about a hand's width from your mouth, slightly to the side.</li>
      <li>Record in a room with soft things like curtains or a sofa. Bare rooms echo.</li>
      <li>Turn off fans and close the window if you can. Noise removal helps, but less noise is always better.</li>
    </ol>`,
    faq: [
      ['Will AI noise removal work on music?', 'It is made for voices. On music it can remove instruments, so for songs use Reduce hiss instead.'],
      ['Is my recording uploaded?', 'No. Everything runs on your own device.'],
    ],
  },
  {
    path: 'guides/ringtone-from-video', crumb: 'Guides', plain: true,
    title: `How to Make a Ringtone from a Video | ${NAME}`,
    description: 'Turn the sound from a video you recorded or saved into an iPhone or Android ringtone. Pick the best part, add a fade, set it on your phone.',
    h1: 'How to make a ringtone from a video',
    lead: "Got a video with a sound you love, like your kid laughing, a concert clip or a funny moment? Here's how to make it your ringtone.",
    content: `
    <h2>1. Open the video in the Ringtone Maker</h2>
    <p>Go to the <a href="/ringtone-maker/">Ringtone Maker</a> and choose the video from your Photos, Gallery or Files. MeloCut uses the sound and ignores the picture.</p>
    <h2>2. Pick the part you want</h2>
    <p>Drag on the waveform to select up to 40 seconds. The loud parts show up as tall bars, which makes the good moments easy to find. Press <strong>Play</strong> to check.</p>
    <h2>3. Make it sound good as a ringtone</h2>
    <ol class="guide-steps">
      <li>Leave <strong>Fade in</strong> and <strong>Fade out</strong> on so it doesn't start or stop abruptly.</li>
      <li>Phone videos are often quiet. Open <strong>Effects</strong> and turn on <strong>Auto loudness</strong>.</li>
      <li>If there's wind or crowd noise behind a voice, turn on <strong>AI noise removal</strong>.</li>
    </ol>
    <h2>4. Save it in the right format</h2>
    <p>Choose <strong>M4R</strong> for iPhone or <strong>MP3</strong> for Android, then Convert and Download.</p>
    <h2>5. Set it on your phone</h2>
    <p>Follow the <a href="/guides/set-ringtone/">ringtone setup guide</a> for iPhone (with GarageBand or a computer) or Android.</p>
    <h2>Picking a good moment</h2>
    <p>A ringtone has to work in the first two seconds, because that's often all you hear before you answer. Start right on the sound you want, not on silence before it. Short, distinctive sounds work best: a laugh, a shout, a chorus, a catchphrase. Keep it between 10 and 30 seconds; it loops if nobody answers.</p>
    <h2>Videos from other people</h2>
    <p>Saved a clip from a group chat? It works the same way: save the video to your phone first, then open it in the Ringtone Maker. For a sound from social media, only use clips you're allowed to use.</p>`,
    faq: [
      ['Can I use a video I downloaded from social media?', 'Only use videos you made yourself or have permission to use, and respect copyright.'],
      ['Why is my ringtone too quiet?', 'Turn on Auto loudness or raise Volume in Effects before converting.'],
      ['Can I use a WhatsApp video?', 'Yes. Save it to your phone from the chat (Share → Save), then open it in the Ringtone Maker.'],
      ['What if the video is very long?', 'MeloCut only uses the part you select, up to 40 seconds. How big a video can be depends on your device and browser; very long videos work best on a computer.'],
    ],
  },
  {
    path: 'guides/make-ringtone', crumb: 'Guides', plain: true, video: RINGTONE_VIDEO,
    title: `How to Make a Song Your Ringtone on iPhone and Android | ${NAME}`,
    description: 'Make any song your ringtone in 2 minutes, free: pick the best part, download it and set it on iPhone (Files → Use as Ringtone) or Android.',
    h1: 'How to make a song your ringtone',
    lead: 'Any song, any phone, free and in about two minutes. First make the ringtone, then set it.',
    content: `
    <div class="callout answer"><p><strong>Short answer:</strong> open a free ringtone maker like the <a href="/ringtone-maker/">MeloCut Ringtone Maker</a>, pick your song, select the best part (under 30 seconds) and download it. On iPhone, open the file in Files and tap <strong>Share → Use as Ringtone</strong>. On Android, go to <strong>Settings → Sound → Phone ringtone</strong> and add the file.</p></div>
    <h2>Step 1: Make the ringtone</h2>
    <ol class="guide-steps">
      <li>Open the <a href="/ringtone-maker/">Ringtone Maker</a> in Safari or Chrome. No app or account needed.</li>
      <li>Tap <strong>Choose a file</strong> and pick a song, or a video from your gallery.</li>
      <li>Drag on the waveform to select the part you want, usually just before the chorus. The first 29 seconds are selected for you.</li>
      <li>Choose <strong>M4R</strong> for iPhone or <strong>MP3</strong> for Android, press <strong>Make ringtone</strong>, then <strong>Download</strong>.</li>
    </ol>
    <h2>Step 2: Set it on your phone</h2>
    <h3>iPhone (iOS 26 or newer)</h3>
    <ol class="guide-steps">
      <li>Open <strong>Files → Downloads</strong> and tap the ringtone.</li>
      <li>Tap <strong>Share → Use as Ringtone</strong>. Done.</li>
    </ol>
    <p>Older iPhone, or the option is missing? See <a href="/guides/iphone-ringtone/">set any song as your iPhone ringtone</a> (GarageBand and fixes).</p>
    <h3>Android</h3>
    <ol class="guide-steps">
      <li>Open <strong>Settings → Sound &amp; vibration → Phone ringtone</strong>.</li>
      <li>Tap <strong>+</strong>, <strong>My sounds</strong> or <strong>Add ringtone</strong> and pick the file from Downloads.</li>
    </ol>
    <p>On a Samsung phone the menu names are different: see <a href="/guides/samsung-ringtone/">custom ringtone on Samsung</a>.</p>
    <h2>Tips for a good ringtone</h2>
    <ol class="guide-steps">
      <li><strong>Start on the hook.</strong> You often hear only the first 2 seconds before you answer, so skip quiet intros.</li>
      <li><strong>Keep it short.</strong> 15 to 29 seconds is plenty; it loops until you pick up.</li>
      <li><strong>Leave the fades on</strong> so it doesn't start or stop abruptly.</li>
      <li><strong>Too quiet?</strong> Turn up Volume in Effects before you download.</li>
    </ol>
    <h2>More ideas</h2>
    <p>Give one person their own sound with a <a href="/guides/contact-ringtone/">contact ringtone</a>, use a sound from your own clips with <a href="/guides/ringtone-from-video/">a ringtone from a video</a>, or make a <a href="/guides/make-slowed-reverb/">slowed + reverb</a> version first for a softer ringtone.</p>`,
    faq: [
      ['How do I make a song my ringtone for free?', 'Use a free online ringtone maker like MeloCut: pick the song, select up to 30 seconds and download it, then set it in your phone\'s sound settings (Android) or with Files → Share → Use as Ringtone (iPhone).'],
      ['Can I make a ringtone without an app?', 'Yes. MeloCut works in Safari and Chrome, so there is nothing to install, and iOS 26 can set the ringtone straight from the Files app.'],
      ['How long can a ringtone be?', 'For the iPhone Files app method, under 30 seconds. With GarageBand or a computer, up to 40 seconds. Android has no strict limit.'],
      ['Can I use a song from Spotify or Apple Music?', 'No. Streaming songs are copy-protected and cannot be edited. Use song files you own, or a sound from your own videos.'],
      ['Which format do I need?', 'M4R for iPhone (MP3 also works with the Files app method) and MP3 for Android.'],
    ],
  },
  {
    path: 'guides/iphone-ringtone', crumb: 'Guides', plain: true, video: RINGTONE_VIDEO,
    title: `Set Any Song as Your iPhone Ringtone, No Computer | ${NAME}`,
    description: 'Set any song as your iPhone ringtone without a computer or iTunes. The new iOS 26 Files app method in four taps, plus GarageBand for older iPhones. Free.',
    h1: 'How to set any song as your iPhone ringtone',
    lead: "No computer, no iTunes and no paid app. On iOS 26 it takes four taps from the Files app, and older iPhones can do it with GarageBand.",
    content: `
    <div class="callout"><p>First make the ringtone: pick the best part of your song. It takes about 30 seconds.</p><a class="btn sm" href="/ringtone-maker/">Open Ringtone Maker</a></div>
    <h2>Step 1: Make the ringtone</h2>
    <ol class="guide-steps">
      <li>Open the <a href="/ringtone-maker/">Ringtone Maker</a> in Safari and choose your song from Files, Photos or Music downloads.</li>
      <li>Drag on the waveform to pick the part you want. <strong>Keep it under 30 seconds</strong>; the first 29 seconds are selected for you.</li>
      <li>Leave the format on <strong>M4R</strong> (MP3 works too), press <strong>Make ringtone</strong>, then <strong>Download</strong>. The file is saved in the <strong>Files</strong> app, in <strong>Downloads</strong>.</li>
    </ol>
    <h2>Step 2: Set it (iOS 26 and newer)</h2>
    <ol class="guide-steps">
      <li>Open the <strong>Files</strong> app → <strong>Browse</strong> → <strong>Downloads</strong> and tap your ringtone so it opens.</li>
      <li>Tap the <strong>Share</strong> button (the square with an arrow pointing up).</li>
      <li>Tap <strong>Use as Ringtone</strong>. If you don't see it, scroll the list of actions to the bottom or tap <strong>More</strong>.</li>
      <li>Settings opens with your new ringtone selected. You'll also find it in <strong>Settings → Sounds &amp; Haptics → Ringtone</strong>.</li>
    </ol>
    <p>Not sure which version you have? Open <strong>Settings → General → About → iOS Version</strong>.</p>
    <h2>Step 2 on older iPhones (GarageBand)</h2>
    <ol class="guide-steps">
      <li>Install <strong>GarageBand</strong> from the App Store (free, made by Apple) and open it. Start any instrument, for example Audio Recorder.</li>
      <li>Tap the <strong>tracks view</strong> button, then the <strong>loop</strong> icon in the top right → <strong>Files</strong> → <strong>Browse items from the Files app</strong>, and pick your ringtone.</li>
      <li>Drag it onto the track, then tap the <strong>⌄</strong> arrow in the top left → <strong>My Songs</strong>.</li>
      <li>Long-press the song → <strong>Share</strong> → <strong>Ringtone</strong> → <strong>Export</strong> → <strong>Use sound as… Standard Ringtone</strong>.</li>
    </ol>
    <h2>"Use as Ringtone" is missing or doesn't work</h2>
    <ol class="guide-steps">
      <li><strong>The file is too long.</strong> The Files app only accepts sounds under 30 seconds. Open it in the Ringtone Maker again and select a shorter part.</li>
      <li><strong>It's an Apple Music song.</strong> Songs from an Apple Music subscription are copy-protected and can't be used. Use a song file you own, or a sound from your own videos.</li>
      <li><strong>The file didn't finish downloading.</strong> Download it again and wait for the blue arrow in Safari's address bar to finish.</li>
      <li><strong>Still nothing?</strong> Close the Files app completely and open it again, or use the GarageBand method above.</li>
    </ol>
    <h2>Set it for one person only</h2>
    <p>Open <strong>Contacts</strong>, pick the person, tap <strong>Edit</strong> → <strong>Ringtone</strong> and choose your new sound. The <a href="/guides/contact-ringtone/">contact ringtone guide</a> has the steps for Android too.</p>`,
    faq: [
      ['Can I set a ringtone on iPhone without a computer?', 'Yes. On iOS 26 and newer, open the file in the Files app and tap Share → Use as Ringtone. On older versions, use GarageBand.'],
      ['How long can an iPhone ringtone be?', 'Under 30 seconds for the Files app method. GarageBand and a computer allow up to 40 seconds.'],
      ['Do I need an M4R file?', 'Not for the Files app method, MP3 works too. M4R is needed only if you copy the ringtone from a computer.'],
      ['Can I use a song from Apple Music?', 'No. Apple Music songs are copy-protected, so iPhone won\'t use them as ringtones. Songs you bought or own as files work.'],
      ['Is it free?', `Yes. The ${NAME} Ringtone Maker is free with no watermark, and the Files app and GarageBand are free too.`],
    ],
  },
  {
    path: 'guides/samsung-ringtone', crumb: 'Guides', plain: true,
    title: `How to Set a Custom Ringtone on Samsung Galaxy | ${NAME}`,
    description: 'Set any song as your ringtone on a Samsung Galaxy phone: make the ringtone, then Settings → Sounds and vibration → Ringtone → +. Also for one contact and dual SIM.',
    h1: 'How to set a custom ringtone on Samsung',
    lead: 'Any Samsung Galaxy phone can use your own song as a ringtone. Make the ringtone first, then it takes a few taps in Settings.',
    content: `
    <div class="callout"><p>Make the ringtone first. Pick the best part of a song in about 30 seconds.</p><a class="btn sm" href="/ringtone-maker/">Open Ringtone Maker</a></div>
    <h2>Step 1: Make the ringtone</h2>
    <ol class="guide-steps">
      <li>Open the <a href="/ringtone-maker/">Ringtone Maker</a> in Chrome or Samsung Internet and choose your song.</li>
      <li>Drag on the waveform to pick the part you want, then choose <strong>MP3</strong>.</li>
      <li>Press <strong>Make ringtone</strong>, then <strong>Download</strong>. It's saved in <strong>My Files → Downloads</strong>.</li>
    </ol>
    <h2>Step 2: Set it as your ringtone</h2>
    <ol class="guide-steps">
      <li>Open <strong>Settings</strong> → <strong>Sounds and vibration</strong> → <strong>Ringtone</strong>.</li>
      <li>If you have two SIM cards, pick <strong>SIM 1</strong> or <strong>SIM 2</strong>.</li>
      <li>Tap the <strong>+</strong> at the top right of the list.</li>
      <li>Find your file (look in <strong>Downloads</strong> or under <strong>Audio</strong>), tap it and tap <strong>Done</strong>.</li>
    </ol>
    <h2>Only for one contact</h2>
    <ol class="guide-steps">
      <li>Open <strong>Contacts</strong> and tap the person.</li>
      <li>Tap <strong>Edit</strong>, then <strong>View more</strong> at the bottom.</li>
      <li>Tap <strong>Ringtone</strong>, then <strong>+</strong>, pick your file and save.</li>
    </ol>
    <h2>As a notification sound</h2>
    <p>Go to <strong>Settings → Sounds and vibration → Notification sound</strong> and add your file the same way. Keep notification sounds short: 1 to 3 seconds works best. The <a href="/audio-cutter/">audio cutter</a> can trim a sound that short.</p>
    <h2>The song doesn't show up in the list</h2>
    <ol class="guide-steps">
      <li>Check that the download finished: open <strong>My Files → Downloads</strong> and play it.</li>
      <li>Restart the Settings app, or the phone, so it scans for new sounds.</li>
      <li>Move the file to the <strong>Ringtones</strong> folder in My Files (Internal storage → Ringtones). Files there always show up.</li>
    </ol>`,
    faq: [
      ['How long can a Samsung ringtone be?', 'There is no strict limit, but 20 to 30 seconds is plenty. The ringtone loops until you answer.'],
      ['Which format do Samsung phones use?', 'MP3 works on every Samsung phone. M4A and OGG work too.'],
      ['Can I use a different ringtone for each SIM?', 'Yes. Under Ringtone, pick SIM 1 or SIM 2 and set each one separately.'],
    ],
  },
  {
    path: 'guides/contact-ringtone', crumb: 'Guides', plain: true,
    title: `Set a Ringtone for One Contact: iPhone and Android | ${NAME}`,
    description: 'Give one person their own ringtone so you know who is calling. Steps for iPhone, Samsung and Google Pixel and other Android phones.',
    h1: 'How to set a ringtone for one contact',
    lead: "A different sound for your partner, your mom or your boss means you know who's calling before you look at the phone.",
    content: `
    <div class="callout"><p>Want a song or a funny sound for them? Make the ringtone first.</p><a class="btn sm" href="/ringtone-maker/">Open Ringtone Maker</a></div>
    <h2>iPhone</h2>
    <ol class="guide-steps">
      <li>Add your new sound to the iPhone first (see <a href="/guides/iphone-ringtone/">set any song as your iPhone ringtone</a>). It doesn't have to become your main ringtone.</li>
      <li>Open <strong>Contacts</strong> (or Phone → Contacts) and tap the person.</li>
      <li>Tap <strong>Edit</strong> → <strong>Ringtone</strong>, choose the sound and tap <strong>Done</strong>.</li>
      <li>Want their texts to sound different too? Set <strong>Text Tone</strong> on the same screen.</li>
    </ol>
    <h2>Samsung Galaxy</h2>
    <ol class="guide-steps">
      <li>Open <strong>Contacts</strong> and tap the person.</li>
      <li>Tap <strong>Edit</strong> → <strong>View more</strong> → <strong>Ringtone</strong>.</li>
      <li>Tap <strong>+</strong>, pick the file from Downloads and save.</li>
    </ol>
    <h2>Google Pixel and most other Android phones</h2>
    <ol class="guide-steps">
      <li>Open the <strong>Contacts</strong> app and tap the person.</li>
      <li>Tap the <strong>⋮</strong> menu in the top right → <strong>Set ringtone</strong>.</li>
      <li>Choose <strong>My sounds</strong> or scroll to the bottom and tap <strong>Add ringtone</strong>, then pick your file.</li>
    </ol>
    <h2>Ideas that work well</h2>
    <p>A short clip of their favorite song, their laugh from a video (see <a href="/guides/ringtone-from-video/">make a ringtone from a video</a>), or a slowed + reverb version of "your" song. Pick something that's recognizable in the first two seconds, since that's often all you hear.</p>`,
    faq: [
      ['Does a contact ringtone change my main ringtone?', 'No. Everyone else still gets your normal ringtone.'],
      ['Does it work for WhatsApp calls?', 'No, WhatsApp has its own setting: open the chat, tap the name → Notifications (Android) or Sound (iPhone).'],
    ],
  },
  {
    path: 'guides/make-slowed-reverb', crumb: 'Guides', plain: true,
    title: `How to Make Slowed and Reverb Songs, Free on Your Phone | ${NAME}`,
    description: 'Make your own slowed + reverb version of any song on your phone or computer: the speed, pitch and reverb settings that sound right, step by step. Free.',
    h1: 'How to make slowed + reverb songs',
    lead: 'The dreamy, slowed-down sound from TikTok and YouTube takes about a minute to make yourself, for free, right in your browser.',
    content: `
    <h2>Step by step</h2>
    <ol class="guide-steps">
      <li>Open the <a href="/slowed-reverb/">Slowed + Reverb maker</a> and choose a song from your phone or computer.</li>
      <li>The classic settings are already on: speed <strong>0.85×</strong> with reverb. Press <strong>Preview with effects</strong> to listen.</li>
      <li>Adjust it to taste (see the settings below), then press <strong>Convert</strong> and <strong>Download</strong> your MP3.</li>
    </ol>
    <h2>Settings that sound right</h2>
    <ol class="guide-steps">
      <li><strong>Speed 0.80 to 0.90×.</strong> Slower than 0.80 starts to sound muddy, faster than 0.90 is barely noticeable.</li>
      <li><strong>Pitch 1 to 3 semitones lower.</strong> This gives the deep, sleepy voice. Leave it at 0 if the singer sounds too dark.</li>
      <li><strong>Reverb 35 to 55%.</strong> Enough to sound like a big room, not so much that the words get lost.</li>
      <li><strong>A little extra bass</strong> (+3 to +6 dB) makes it feel fuller on headphones.</li>
    </ol>
    <h2>Other versions to try</h2>
    <ol class="guide-steps">
      <li><strong>Sped up or nightcore:</strong> speed 1.15 to 1.30× with the pitch raised. Use the <a href="/nightcore-maker/">nightcore maker</a>.</li>
      <li><strong>8D:</strong> the sound circles around your head on headphones. Use the <a href="/8d-audio/">8D audio converter</a>.</li>
      <li><strong>Slowed ringtone:</strong> make your slowed version, then open it in the <a href="/ringtone-maker/">Ringtone Maker</a>.</li>
    </ol>
    <h2>Posting it</h2>
    <p>TikTok, Instagram and YouTube can mute or block songs you don't have the rights to, even slowed down. For your own listening it's fine; for posting, use music you made or are allowed to use, or add the original song from the app's own music library.</p>`,
    faq: [
      ['What speed is slowed + reverb?', 'Usually 0.80 to 0.90 times the original speed, with the pitch 1 to 3 semitones lower.'],
      ['Can I make it on my phone?', 'Yes. The Slowed + Reverb maker works in Safari and Chrome on iPhone and Android, with nothing to install.'],
      ['Is there a watermark?', 'No. The MP3 is yours, with no watermark and no sign-up.'],
    ],
  },
  {
    path: 'guides/remove-vocals', crumb: 'Guides', plain: true,
    title: `How to Remove Vocals from a Song for Free (Karaoke) | ${NAME}`,
    description: 'Remove the singer from a song to make a karaoke or instrumental track, free and in your browser. How it works, what to expect and tips for better results.',
    h1: 'How to remove vocals from a song',
    lead: 'Make a karaoke or instrumental version of a song for free. Here is how, and what results to expect.',
    content: `
    <h2>Step by step</h2>
    <ol class="guide-steps">
      <li>Open the <a href="/vocal-remover/">Vocal Remover</a> and choose a <strong>stereo</strong> studio song from your device.</li>
      <li>The vocal remover is already on. Press <strong>Preview with effects</strong> to listen.</li>
      <li>If the bass got too quiet, raise <strong>Bass</strong> in Effects a little.</li>
      <li>Press <strong>Convert</strong> and <strong>Download</strong> your karaoke track.</li>
    </ol>
    <h2>How it works</h2>
    <p>In most studio songs the lead vocal is placed in the middle of the stereo mix, while guitars, keys and backing vocals are spread to the left and right. The vocal remover cancels what's in the middle and keeps the sides. It's fast and runs on your own device, but it isn't AI stem separation, so the results depend on how the song was mixed.</p>
    <h2>What to expect</h2>
    <ol class="guide-steps">
      <li><strong>Works best:</strong> pop, rock and hip-hop studio songs with one lead singer.</li>
      <li><strong>Works less well:</strong> songs with lots of reverb on the voice, live recordings and old mono recordings. ${NAME} warns you when a file is mono.</li>
      <li><strong>Side effect:</strong> bass and kick drum are often in the middle too, so they get quieter. Raising Bass brings some of it back.</li>
    </ol>
    <h2>Tips</h2>
    <p>Start from the best-quality file you have; a 320 kbps MP3 or a WAV gives a cleaner result than a small, compressed file. For practicing, you can also slow the karaoke track down with the <a href="/slow-down-audio/">slow down tool</a> without changing its pitch.</p>`,
    faq: [
      ['Can I remove vocals for free?', `Yes. The ${NAME} Vocal Remover is free, with no sign-up and no watermark.`],
      ['Why can I still hear some of the singer?', 'Reverb and backing vocals are often spread to the sides of the mix, so they stay. It depends on how the song was mixed.'],
      ['Can it remove the music and keep the voice?', 'Not this tool. For cleaning up a voice recording, use the AI Noise Remover instead.'],
    ],
  },
  {
    path: 'guides/cut-song-iphone', crumb: 'Guides', plain: true,
    title: `How to Cut a Song on iPhone, Free and Without an App | ${NAME}`,
    description: 'Trim a song or audio file on your iPhone in Safari: keep the part you want, add a fade and save it as MP3 or M4A. Free, no app, nothing uploaded.',
    h1: 'How to cut a song on iPhone',
    lead: "iPhones have no built-in way to trim a song. Here's how to do it in Safari in about a minute, with no app to install.",
    content: `
    <div class="callout"><p>Ready to cut? The audio cutter opens right in Safari.</p><a class="btn sm" href="/audio-cutter/">Open Audio Cutter</a></div>
    <h2>Step by step</h2>
    <ol class="guide-steps">
      <li>Open the <a href="/audio-cutter/">Audio Cutter</a> in Safari and tap <strong>Choose a file</strong>. Pick the song from <strong>Files</strong>, or a video from <strong>Photo Library</strong>.</li>
      <li>Drag the two handles on the waveform to the part you want. Press <strong>Play</strong> to check where it starts and ends.</li>
      <li>Want to cut a part <em>out</em> instead, like a long intro? Switch to <strong>Remove</strong>, and the selection is taken out of the song.</li>
      <li>Leave <strong>Fade in</strong> and <strong>Fade out</strong> on so it doesn't start or stop abruptly.</li>
      <li>Choose <strong>MP3</strong> (plays everywhere) or <strong>M4A</strong>, press the button, then <strong>Download</strong>. The file is saved in <strong>Files → Downloads</strong>.</li>
    </ol>
    <h2>Exact times</h2>
    <p>For a precise cut, type the times in the <strong>Start</strong> and <strong>End</strong> boxes, for example <code>1:05.5</code>. That's easier than dragging with a finger on a small screen.</p>
    <h2>What to do with the file</h2>
    <ol class="guide-steps">
      <li><strong>Ringtone:</strong> use the <a href="/ringtone-maker/">Ringtone Maker</a> instead, then follow <a href="/guides/iphone-ringtone/">set any song as your iPhone ringtone</a>.</li>
      <li><strong>Send it:</strong> in Files, long-press the file → Share → WhatsApp, Messages or AirDrop.</li>
      <li><strong>Edit it more:</strong> open it again in another tool, for example the <a href="/volume-booster/">volume booster</a>.</li>
    </ol>`,
    faq: [
      ['Can I cut a song on iPhone without an app?', 'Yes. Open the MeloCut Audio Cutter in Safari, pick the song, drag to the part you want and download it.'],
      ['Does cutting lower the quality?', 'Choose 320 kbps MP3 or M4A and it stays very close to the original.'],
      ['Can I cut an Apple Music song?', 'No. Apple Music songs are copy-protected and cannot be opened by any editor. Use song files you own.'],
    ],
  },
  {
    path: 'guides/whatsapp-voice-to-mp3', crumb: 'Guides', plain: true,
    title: `How to Save a WhatsApp Voice Message as MP3 | ${NAME}`,
    description: 'Save a WhatsApp voice note from iPhone or Android and convert it to MP3 so it plays anywhere. Step by step, free, and your messages stay on your phone.',
    h1: 'How to save a WhatsApp voice message as MP3',
    lead: "WhatsApp voice notes are .opus files that most players can't open. Here's how to get one out of the chat and turn it into an MP3.",
    content: `
    <h2>1. Get the voice note out of WhatsApp</h2>
    <h3>iPhone</h3>
    <ol class="guide-steps">
      <li>Open the chat and <strong>long-press</strong> the voice message → <strong>Forward</strong>.</li>
      <li>Tap the <strong>Share</strong> button in the bottom right (not the arrow to forward to a chat).</li>
      <li>Choose <strong>Save to Files</strong> and save it, for example in Downloads.</li>
    </ol>
    <h3>Android</h3>
    <ol class="guide-steps">
      <li>Long-press the voice message, then tap the <strong>Share</strong> icon at the top.</li>
      <li>Choose <strong>Files</strong>, <strong>Drive</strong> or another place to save it.</li>
      <li>Or find all your voice notes in the Files app under <em>Android → media → com.whatsapp → WhatsApp → Media → WhatsApp Voice Notes</em>.</li>
    </ol>
    <h2>2. Convert it to MP3</h2>
    <ol class="guide-steps">
      <li>Open <a href="/whatsapp-audio-to-mp3/">WhatsApp Audio to MP3</a> and choose the voice note.</li>
      <li>Press <strong>Convert</strong>, then <strong>Download</strong>. 128 kbps is plenty for speech.</li>
    </ol>
    <h2>Make it clearer</h2>
    <p>Voice notes recorded outside are often noisy. Open the MP3 in the <a href="/noise-remover/">AI Noise Remover</a> to take out wind and traffic and even out the volume. Telegram voice messages (.ogg) work the same way.</p>`,
    faq: [
      ['Why can\'t I play a WhatsApp voice note on my computer?', 'WhatsApp saves them as .opus files, which many players don\'t support. Converting to MP3 fixes that.'],
      ['Is my voice message uploaded?', 'No. The conversion runs on your own phone or computer, so the message never leaves your device.'],
      ['Can I convert several voice notes into one file?', 'Yes. Convert them, then put them together with the Audio Joiner.'],
    ],
  },
  {
    path: 'guides/extract-audio-from-video', crumb: 'Guides', plain: true,
    title: `How to Get the Audio from a Video: iPhone, Android, PC | ${NAME}`,
    description: 'Extract the sound from any video and save it as MP3: from your iPhone or Android gallery, or a video file on your computer. Free, fast, no upload.',
    h1: 'How to get the audio from a video',
    lead: 'Turn a video from your gallery or computer into an MP3: a song from a concert clip, a speech, a voice message or a sound you love.',
    content: `
    <div class="callout"><p>Works with MP4, MOV, WebM and MKV videos.</p><a class="btn sm" href="/video-to-mp3/">Open Video to MP3</a></div>
    <h2>Step by step</h2>
    <ol class="guide-steps">
      <li>Open <a href="/video-to-mp3/">Video to MP3</a>. On a phone, tap <strong>Choose a file</strong> → <strong>Photo Library</strong> (iPhone) or <strong>Gallery</strong> (Android). On a computer, drop the video on the page.</li>
      <li>Want only part of it? Drag on the waveform to select it. Otherwise the whole sound is used.</li>
      <li>Choose <strong>MP3</strong> and a quality: <strong>320 kbps</strong> for music, <strong>128 kbps</strong> for speech.</li>
      <li>Press <strong>Convert</strong>, then <strong>Download</strong>.</li>
    </ol>
    <h2>Where the file goes</h2>
    <p>iPhone: <strong>Files → Downloads</strong>. Android: <strong>Files → Downloads</strong>. Computer: your <strong>Downloads</strong> folder. The <a href="/guides/find-downloads/">downloads guide</a> has more detail.</p>
    <h2>Tips</h2>
    <ol class="guide-steps">
      <li><strong>Screen recordings and iPhone videos (.mov)</strong> work directly, there's also a dedicated <a href="/mov-to-mp3/">MOV to MP3</a> page.</li>
      <li><strong>Too quiet?</strong> Phone videos often are. Turn on <strong>Auto loudness</strong> in Effects before converting.</li>
      <li><strong>Want it as a ringtone?</strong> See <a href="/guides/ringtone-from-video/">make a ringtone from a video</a>.</li>
    </ol>
    <h2>Only use videos you're allowed to</h2>
    <p>Extract audio from videos you made or have permission to use. Downloading other people's music from streaming sites isn't allowed by their terms.</p>`,
    faq: [
      ['How do I extract audio from a video on iPhone?', 'Open Video to MP3 in Safari, choose the video from your Photo Library, then convert and download the MP3. No app needed.'],
      ['Is there a size limit?', 'File limits depend on your device and browser. Computers handle much bigger files than phones, and MeloCut does not accept files over 1 GB. For long videos, use a computer or trim the video first.'],
      ['Is the video uploaded?', 'No. The sound is extracted on your own device, which is also why it is fast.'],
    ],
  },
  {
    path: 'guides/make-8d-audio', crumb: 'Guides', plain: true,
    title: `How to Make 8D Audio from Any Song, Free | ${NAME}`,
    description: 'Make your own 8D audio: the effect where music moves around your head. Settings that sound good, step by step, on your phone or computer. Free.',
    h1: 'How to make 8D audio',
    lead: 'The music slowly circles around your head. It takes one minute to make from any song, and you need headphones to hear it.',
    content: `
    <h2>Step by step</h2>
    <ol class="guide-steps">
      <li>Open the <a href="/8d-audio/">8D Audio converter</a> and choose a song.</li>
      <li>Put on <strong>headphones or earbuds</strong>. On a speaker the effect disappears.</li>
      <li>Press <strong>Preview with effects</strong>. The sound should move slowly from one ear to the other.</li>
      <li>Press <strong>Convert</strong> and <strong>Download</strong> your 8D version.</li>
    </ol>
    <h2>How it works</h2>
    <p>8D audio isn't extra dimensions. It slowly pans the music from left to right and back, and adds some reverb so it sounds like a room around you. Your brain hears that as the music moving around your head.</p>
    <h2>Make it sound better</h2>
    <ol class="guide-steps">
      <li><strong>Calm songs work best:</strong> slow songs, lo-fi and ballads. Very busy songs can get messy.</li>
      <li><strong>Less reverb</strong> keeps the vocals clear, <strong>more</strong> makes it dreamier.</li>
      <li><strong>Combine it:</strong> make a <a href="/guides/make-slowed-reverb/">slowed + reverb</a> version first, then turn that into 8D.</li>
    </ol>`,
    faq: [
      ["Why can't I hear the 8D effect?", 'You need headphones or earbuds. On a single speaker both sides mix together and the movement disappears.'],
      ['What is the difference between 8D and 3D audio?', 'They are mostly names for the same idea: panning and reverb that make sound seem to move around you.'],
    ],
  },
  {
    path: 'guides/make-nightcore', crumb: 'Guides', plain: true,
    title: `How to Make Nightcore and Sped Up Songs, Free | ${NAME}`,
    description: 'Make a nightcore or sped up version of any song: the speed and pitch settings that sound right, step by step, on your phone or computer. Free, no watermark.',
    h1: 'How to make nightcore and sped up songs',
    lead: 'The fast, high, energetic version of a song, the opposite of slowed + reverb. Here are the settings that sound right.',
    content: `
    <h2>Step by step</h2>
    <ol class="guide-steps">
      <li>Open the <a href="/nightcore-maker/">Nightcore maker</a> and choose a song.</li>
      <li>The nightcore settings are already on. Press <strong>Preview with effects</strong> to listen.</li>
      <li>Adjust it (see below), then <strong>Convert</strong> and <strong>Download</strong> the MP3.</li>
    </ol>
    <h2>Nightcore or sped up?</h2>
    <ol class="guide-steps">
      <li><strong>Nightcore:</strong> speed <strong>1.20 to 1.30×</strong> with the pitch going up too, so voices sound higher and brighter.</li>
      <li><strong>Sped up:</strong> speed <strong>1.15 to 1.25×</strong> but the pitch kept closer to the original, so the singer still sounds like themselves.</li>
    </ol>
    <h2>Tips</h2>
    <p>Songs with a clear beat and a catchy chorus work best. If it gets harsh, lower the <strong>Treble</strong> a little. Want the opposite? See <a href="/guides/make-slowed-reverb/">how to make slowed + reverb songs</a>.</p>`,
    faq: [
      ['What speed is nightcore?', 'Usually about 1.2 to 1.3 times the original speed, with the pitch raised as well.'],
      ['Can I make a sped up song on my phone?', 'Yes. The Nightcore maker works in Safari and Chrome on iPhone and Android.'],
    ],
  },
  {
    path: 'guides/remove-background-noise', crumb: 'Guides', plain: true,
    title: `How to Remove Background Noise from a Recording, Free | ${NAME}`,
    description: 'Remove wind, traffic, fans and hum from a voice recording, voice note or video, free and on your own device. Step by step, with tips for better results.',
    h1: 'How to remove background noise from a recording',
    lead: 'Clean up a voice note, interview, lecture or video so the voice is easy to hear, with a small AI model that runs on your own device.',
    content: `
    <h2>Step by step</h2>
    <ol class="guide-steps">
      <li>Open the <a href="/noise-remover/">AI Noise Remover</a> and choose your recording, or a video with the sound you want to clean.</li>
      <li><strong>AI noise removal</strong>, <strong>Auto loudness</strong> and <strong>Remove silences</strong> are already on. Press <strong>Preview with effects</strong>.</li>
      <li>If long pauses should stay, switch off Remove silences. If the voice sounds thin, lower <strong>Treble</strong> a little.</li>
      <li>Choose <strong>MP3</strong> at <strong>128 kbps</strong> (plenty for speech), then <strong>Convert</strong> and <strong>Download</strong>.</li>
    </ol>
    <h2>What it removes well</h2>
    <p>Steady and outdoor noise: fans, air conditioning, traffic, wind, computer hum and crowd murmur. It's made for <strong>voices</strong>, so on music it can remove instruments too. For hiss on a song, use the gentler <em>Reduce hiss</em> instead.</p>
    <h2>Better recordings next time</h2>
    <ol class="guide-steps">
      <li>Hold the phone a hand's width from your mouth, a little to the side.</li>
      <li>Record in a room with soft things (curtains, a sofa). Bare rooms echo.</li>
      <li>Turn off fans and close windows. Less noise to start with always sounds best.</li>
    </ol>
    <p>Recorded on an iPhone? The <a href="/guides/clean-up-voice-memo/">voice memo guide</a> shows how to get it out of the Voice Memos app.</p>`,
    faq: [
      ['Can I remove background noise for free?', `Yes. The ${NAME} AI Noise Remover is free, with no sign-up and no watermark.`],
      ['Is my recording uploaded?', 'No. The AI model runs in your browser, on your own device.'],
      ['Can it remove music from a video?', 'Not reliably. It is made to keep voices and remove noise, not to separate music.'],
    ],
  },
  {
    path: 'guides/make-audio-louder', crumb: 'Guides', plain: true,
    title: `Make a Song or Recording Louder Without Distortion | ${NAME}`,
    description: 'Make a quiet MP3, voice note or video louder, up to 300%, without distortion. Free, works on iPhone, Android and computers, nothing uploaded.',
    h1: 'How to make a song or recording louder',
    lead: "Too quiet even at full volume? Here's how to make the file itself louder, without the crackling you get from just turning it up.",
    content: `
    <h2>Step by step</h2>
    <ol class="guide-steps">
      <li>Open the <a href="/volume-booster/">Volume Booster</a> and choose your file (audio or video).</li>
      <li>For recordings and voice notes, leave <strong>Auto loudness</strong> on. It brings the whole file to an even, loud level.</li>
      <li>For more, raise <strong>Volume</strong>. A limiter keeps the loudest parts from distorting.</li>
      <li>Press <strong>Preview with effects</strong>, then <strong>Convert</strong> and <strong>Download</strong>.</li>
    </ol>
    <h2>Which setting to use</h2>
    <ol class="guide-steps">
      <li><strong>Voice notes, lectures, interviews:</strong> Auto loudness. Quiet and loud parts end up closer together, so you hear everything.</li>
      <li><strong>Songs:</strong> a little extra Volume, for example 120 to 150%. Songs are already mastered loud, so big boosts squash them.</li>
      <li><strong>Phone videos:</strong> Auto loudness, then save the sound with <a href="/video-to-mp3/">Video to MP3</a> if you only need the audio.</li>
    </ol>
    <h2>Want more bass instead?</h2>
    <p>If the song isn't quiet but feels thin, the <a href="/guides/bass-boost-song/">bass boost guide</a> is what you're looking for.</p>`,
    faq: [
      ['How do I make an MP3 louder?', 'Open it in the Volume Booster, raise Volume or turn on Auto loudness, then convert and download it.'],
      ['Will it distort?', 'A limiter catches the loudest peaks, so moderate boosts stay clean. Very large boosts on loud songs can still sound squashed.'],
    ],
  },
  {
    path: 'guides/combine-songs', crumb: 'Guides', plain: true,
    title: `How to Combine Two Songs into One, Free | ${NAME}`,
    description: 'Join two or more songs, voice notes or clips into one MP3, in any order, with an optional crossfade. Free on iPhone, Android and computers.',
    h1: 'How to combine two songs into one',
    lead: 'Put songs, voice notes or clips together into one file: for a workout mix, a dance routine, a slideshow or a long voice message.',
    content: `
    <h2>Step by step</h2>
    <ol class="guide-steps">
      <li>Open the <a href="/audio-joiner/">Audio Joiner</a> and choose <strong>two or more files</strong>. You can add more later.</li>
      <li>Drag them into the right order. Tap play on each one to check it.</li>
      <li>Set a <strong>crossfade</strong> (2 to 4 seconds) so one song blends into the next, or 0 for a hard cut.</li>
      <li>Turn on <strong>Even volume</strong> if the files are at different loudness.</li>
      <li>Press <strong>Join files</strong>, listen to the result, then <strong>Download</strong>.</li>
    </ol>
    <h2>Only want part of each song?</h2>
    <p>Cut each song first with the <a href="/audio-cutter/">Audio Cutter</a>, then join the pieces. That's how most dance and cheer mixes are made.</p>
    <h2>Tips</h2>
    <ol class="guide-steps">
      <li><strong>Mixed formats are fine:</strong> an MP3, an M4A and a video can go into one file.</li>
      <li><strong>Speech:</strong> use no crossfade and 128 kbps MP3.</li>
      <li><strong>Music:</strong> a 3-second crossfade and 320 kbps MP3.</li>
    </ol>`,
    faq: [
      ['Can I combine songs on my phone?', 'Yes. The Audio Joiner works in Safari and Chrome on iPhone and Android, no app needed.'],
      ['Can I join a video and a song?', 'Yes. The sound of the video is used, and the result is one audio file.'],
    ],
  },
  {
    path: 'guides/voice-memo-to-mp3', crumb: 'Guides', plain: true,
    title: `How to Convert an iPhone Voice Memo to MP3 | ${NAME}`,
    description: 'Save an iPhone Voice Memo to Files and convert it from M4A to MP3 so it plays on any phone, computer or app. Free, step by step, nothing uploaded.',
    h1: 'How to convert an iPhone voice memo to MP3',
    lead: 'Voice Memos are saved as M4A files. Some Android phones, cars, websites and forms only accept MP3. Here is how to convert one.',
    content: `
    <h2>1. Save the memo to Files</h2>
    <ol class="guide-steps">
      <li>Open <strong>Voice Memos</strong> and tap the recording.</li>
      <li>Tap <strong>⋯</strong> (or the Share button) → <strong>Save to Files</strong>, and save it in Downloads.</li>
    </ol>
    <h2>2. Convert it to MP3</h2>
    <ol class="guide-steps">
      <li>Open <a href="/m4a-to-mp3/">M4A to MP3</a> in Safari and choose the memo from <strong>Files</strong>.</li>
      <li>Want only part of it? Drag on the waveform to select it.</li>
      <li>Choose <strong>128 kbps</strong> for speech (small file) or <strong>192 kbps</strong> for music.</li>
      <li>Press <strong>Convert</strong>, then <strong>Download</strong>. The MP3 is in Files → Downloads.</li>
    </ol>
    <h2>Make it sound better first</h2>
    <p>Recorded in a noisy room or too quiet? Use the <a href="/noise-remover/">AI Noise Remover</a> instead. It cleans and evens out the voice and saves an MP3 in one go. The <a href="/guides/clean-up-voice-memo/">voice memo guide</a> walks through it.</p>`,
    faq: [
      ['What format are iPhone voice memos?', 'M4A, which uses AAC audio. It sounds good, but some devices and websites only accept MP3.'],
      ['Does converting lower the quality?', 'For speech the difference is not audible at 128 kbps or more.'],
    ],
  },
  {
    path: 'guides/bass-boost-song', crumb: 'Guides', plain: true,
    title: `How to Boost the Bass in a Song, Free and Online | ${NAME}`,
    description: 'Add deeper, punchier bass to any song for headphones, car speakers or your phone, without distortion. Settings that sound good, free and on your device.',
    h1: 'How to boost the bass in a song',
    lead: 'Give a song deeper bass for your car, headphones or a party, and keep it from distorting.',
    content: `
    <h2>Step by step</h2>
    <ol class="guide-steps">
      <li>Open the <a href="/bass-booster/">Bass Booster</a> and choose a song.</li>
      <li>Set the amount of <strong>Bass</strong>. Start around <strong>+6 dB</strong>.</li>
      <li>Press <strong>Preview with effects</strong> on the speakers or headphones you'll use.</li>
      <li>Happy with it? <strong>Convert</strong> and <strong>Download</strong> at 320 kbps.</li>
    </ol>
    <h2>How much bass?</h2>
    <ol class="guide-steps">
      <li><strong>+3 to +6 dB:</strong> fuller and warmer, good for phone speakers and earbuds.</li>
      <li><strong>+8 to +12 dB:</strong> clearly boosted, good for car speakers and headphones.</li>
      <li><strong>+15 dB:</strong> the "bass boosted" effect from TikTok and YouTube. Fun, but heavy.</li>
    </ol>
    <p>A limiter keeps the loudest parts from crackling, so even big boosts stay clean.</p>
    <h2>Combine it</h2>
    <p>Bass boost goes well with <a href="/guides/make-slowed-reverb/">slowed + reverb</a> and <a href="/guides/make-8d-audio/">8D audio</a>. Make one version, then open that file again and add the next effect.</p>`,
    faq: [
      ['How do I make a song bass boosted?', 'Open it in the Bass Booster, raise Bass to +8 dB or more, preview it and download the MP3.'],
      ['Why does my bass boosted song sound quieter?', 'To leave room for the bass without distorting, the rest has to sit a little lower. Add a little Volume if needed.'],
    ],
  },
  {
    path: 'terms', crumb: null, plain: true,
    title: `Terms of Use | ${NAME}`,
    description: `The terms for using ${NAME}, a set of free audio tools that run in your browser: your files, copyright, acceptable use, ads and liability.`,
    h1: 'Terms of use',
    content: `
    <p><em>Last updated: ${LEGAL_UPDATED}</em></p>
    <h2>Using MeloCut</h2>
    <p>${NAME} is free to use, at home or at work. You don't need an account. By using the site you agree to these terms.</p>
    <h2>Your files and your responsibility</h2>
    <p>Your files are processed on your own device and never sent to us. You are responsible for the files you open and the files you create. Only use audio and video you own or have permission to use. Editing a song with ${NAME} does not give you any rights to it: you can share or sell what you make only if you hold the rights to the original audio.</p>
    <h2>Acceptable use</h2>
    <p>Don't use ${NAME} for anything illegal, and don't try to disrupt the site, overload it or copy it in bulk with automated tools. Normal personal and business use is welcome.</p>
    <h2>Ads</h2>
    <p>${NAME} is free because it shows ads. Please don't click ads you aren't interested in: invalid clicks can get the site's ads switched off.</p>
    <h2>No warranty</h2>
    <p>${NAME} is provided as is. We work hard to make it reliable, but we can't promise it will always be available or free of errors. Keep a copy of your original files.</p>
    <h2>Limitation of liability</h2>
    <p>To the extent the law allows, we are not liable for any loss or damage that comes from using ${NAME}, including lost or damaged files.</p>
    <h2>Third-party services</h2>
    <p>The site loads its audio engine from the jsDelivr network and may show ads from Google. Their own terms and privacy policies apply to those services. See our <a href="/privacy/">privacy policy</a> for details.</p>
    <h2>Changes</h2>
    <p>We may update these terms. The date at the top shows when they last changed.</p>
    <h2>Contact</h2>
    <p>Questions about these terms: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`,
  },
  {
    path: 'privacy', crumb: null, plain: true,
    title: `Privacy Policy | ${NAME}`,
    description: `How ${NAME} handles your data: your audio and video files never leave your device. Which services the site uses, cookies, ads and your rights.`,
    h1: 'Privacy policy',
    content: `
    <p><em>Last updated: ${LEGAL_UPDATED}</em></p>
    <h2>Who we are</h2>
    <p>${NAME} (melocut.com) is run by an independent developer. For anything about your data, email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
    <h2>Your files</h2>
    <p>${NAME} processes audio and video files entirely inside your web browser. Your files are <strong>never uploaded</strong> to our servers or anyone else's. We can't see, store or share them, so there is nothing for us to keep or delete.</p>
    <h2>Services the site uses</h2>
    <ol class="guide-steps">
      <li><strong>Cloudflare</strong> hosts the site. Like any web host, it receives your IP address and browser details when you load a page, to deliver the page and protect it from attacks. Cloudflare keeps these logs for a short time under its own <a href="https://www.cloudflare.com/privacypolicy/" rel="nofollow">privacy policy</a>.</li>
      <li><strong>jsDelivr</strong> delivers the audio engine and, if you use AI noise removal, the small RNNoise model. Your browser downloads them once and they then run on your device. See the <a href="https://www.jsdelivr.com/terms/privacy-policy-jsdelivr-net" rel="nofollow">jsDelivr privacy policy</a>.</li>
      <li><strong>Cloudflare Web Analytics</strong> and <strong>Umami</strong> count visits and tool use without cookies, as described below.</li>
      <li><strong>Google AdSense</strong> shows ads, as described below.</li>
    </ol>
    <h2>Advertising and cookies</h2>
    <p>${NAME} is free because it shows ads from Google AdSense. Google and its partners may use cookies and similar technology to show ads and to measure them, including ads based on your earlier visits to this and other websites. You can turn off personalized ads at <a href="https://adssettings.google.com" rel="nofollow">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices" rel="nofollow">aboutads.info</a>. More details are in <a href="https://policies.google.com/technologies/ads" rel="nofollow">how Google uses information from sites that use its services</a>.</p>
    <p>Visitors in the EEA, the UK and Switzerland see a consent message from Google before any personalized ads are shown, and can change their choice at any time with the privacy link it adds to the page.</p>
    <p>${NAME} itself sets no cookies. The site saves its own files (the pages and the audio engine) in your browser's cache so the tools load faster and work offline. You can remove them by clearing your browser's site data.</p>
    <h2>Analytics</h2>
    <p>We use <strong>Cloudflare Web Analytics</strong> and <strong>Umami</strong> to count visits, see which pages are popular and how often each tool is used (for example "a file was converted to MP3"). Neither sets cookies, follows you across sites or builds a profile of you, and neither ever sees your files or their names. See <a href="https://www.cloudflare.com/web-analytics/" rel="nofollow">Cloudflare Web Analytics</a> and the <a href="https://umami.is/privacy" rel="nofollow">Umami privacy policy</a>.</p>
    <h2>Your rights</h2>
    <p>Since we don't collect personal data ourselves, there is usually nothing for us to show, change or delete. For data held by Google or Cloudflare, use the links above. You can still email us with any question or request.</p>
    <h2>Changes</h2>
    <p>If this policy changes, we update it here and change the date at the top.</p>
    <p>Questions? Email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`,
  },
  {
    path: 'about', crumb: null, plain: true,
    title: `About and Contact | ${NAME}`,
    description: `What ${NAME} is, how its free audio tools work in your browser without uploading your files, how the site stays free, and how to get in touch.`,
    h1: 'About MeloCut',
    content: `
    <p>${NAME} is a set of free audio tools that run in your web browser: a ringtone maker, an audio cutter and joiner, converters for video and audio, an AI noise remover, and effects like slowed + reverb, nightcore, 8D audio and bass boost. There are ${TOOLS.length} tools in total, and every one of them works on phones as well as computers.</p>
    <h2>Why we built it</h2>
    <p>Most "online MP3 cutter" sites work the same way: you upload your file to their server, wait in a queue, then dodge fake download buttons and pop-ups to get it back. That's slow, and it means a stranger's server gets a copy of your voice notes, recordings and music.</p>
    <p>${NAME} does the work on your own device instead. Nothing is uploaded, so it's quicker, it works with large files and bad connections, and your files stay private.</p>
    <h2>How it works</h2>
    <p>Under the hood, ${NAME} runs <strong>FFmpeg</strong>, the open source audio and video engine used by VLC, YouTube and countless editing apps. It's compiled to WebAssembly, a format that lets your browser run it at close to native speed. The waveform, playback and equalizer use the browser's built-in Web Audio.</p>
    <p>The AI noise remover uses <strong>RNNoise</strong>, a small open source neural network made by Xiph.org and Mozilla researchers to separate speech from background noise. It also runs on your device.</p>
    <h2>How the site stays free</h2>
    <p>${NAME} shows a few ads from Google AdSense, always labelled. There are no paid plans, no sign-up, no limits on how often you use it and no watermark on your audio. See the <a href="/privacy/">privacy policy</a> for what that means for your data.</p>
    <h2>What we care about</h2>
    <ol class="guide-steps">
      <li><strong>Your files are yours.</strong> They never leave your device.</li>
      <li><strong>Honest buttons.</strong> One Download button, no tricks.</li>
      <li><strong>Plain answers.</strong> Each tool says what it can and can't do, like the vocal remover, which is not AI stem separation.</li>
    </ol>
    <h2>Contact</h2>
    <p>Ideas for new tools, bug reports or business questions: <a href="mailto:${EMAIL}">${EMAIL}</a>. If something doesn't work, tell us the file type and your phone or browser, and we'll look into it.</p>
    <p>Please read our <a href="/terms/">terms of use</a> and <a href="/privacy/">privacy policy</a>.</p>`,
  },
];

// ---------- templates ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s) => s.replace(/<[^>]+>/g, '');
const plainH1 = (p) => strip(p.h1).replace(/\s+/g, ' ').trim();
const urlOf = (p) => `${SITE_URL}/${p.path ? p.path + '/' : ''}`;
const slugOf = (p) => (p.path ? p.path.replace(/\//g, '-') : 'home');
const ogImage = (p) => (fs.existsSync(path.join(ROOT, 'og', `${slugOf(p)}.jpg`)) ? `${SITE_URL}/og/${slugOf(p)}.jpg` : `${SITE_URL}/og.jpg`);

// Every page with its language. The five English pages that have translations get a `key`.
const KEY_OF = { '': 'home', 'audio-cutter': 'cutter', 'video-to-mp3': 'video', 'ringtone-maker': 'ringtone', 'audio-converter': 'converter' };
const ALL = [
  ...PAGES.map((p) => ({ lang: 'en', key: KEY_OF[p.path], ...p })),
  ...L10N.flatMap((lang) => LANGS[lang].pages.map((p) => ({ lang, ...p }))),
];
// The same page in every language that has it, for hreflang and the language switcher.
const versions = (p) => (p.key ? Object.keys(LANGS).map((lang) => ALL.find((q) => q.lang === lang && q.key === p.key)).filter(Boolean) : [p]);
const homeOf = (lang) => ALL.find((q) => q.lang === lang && q.key === 'home');

// Breadcrumb trail: Home › (Tools | Converters | Guides) › page
function crumbs(p) {
  if (!p.path || p.path === '404' || p.key === 'home') return null;
  const ui = LANGS[p.lang].ui, home = urlOf(homeOf(p.lang));
  const trail = [{ name: ui.home, url: home }];
  if (p.crumb === 'Tools') trail.push({ name: ui.tools, url: `${home}#tools` });
  if (p.crumb === 'Converters') trail.push({ name: 'Audio Converter', url: `${SITE_URL}/audio-converter/` });
  if (p.crumb === 'Guides') trail.push({ name: 'Guides', url: `${SITE_URL}/guides/` });
  trail.push({ name: plainH1(p), url: urlOf(p) });
  return trail;
}

function jsonLd(p) {
  const url = urlOf(p), lang = LANGS[p.lang].ui.code;
  const graph = [
    { '@type': 'WebSite', '@id': `${SITE_URL}/#site`, name: NAME, url: `${SITE_URL}/`, inLanguage: ['en', 'es', 'pt-BR'], publisher: { '@id': `${SITE_URL}/#org` } },
    { '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: NAME, url: `${SITE_URL}/`, logo: `${SITE_URL}/icon-512.png`, email: EMAIL, sameAs: SOCIAL.map((s) => s.url) },
    { '@type': 'WebPage', '@id': `${url}#page`, url, name: p.title, description: p.description, inLanguage: lang, isPartOf: { '@id': `${SITE_URL}/#site` },
      primaryImageOfPage: ogImage(p), dateModified: UPDATED },
  ];
  if (!p.plain && p.tool) {
    graph.push({
      '@type': 'WebApplication', name: `${NAME} ${strip(p.h1)}`, url, applicationCategory: 'MultimediaApplication', inLanguage: lang,
      operatingSystem: 'Any (web browser)', browserRequirements: 'Requires JavaScript and a modern browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: p.description,
      ...(p.badges ? { featureList: p.badges } : {}), isAccessibleForFree: true,
    });
  }
  const trail = crumbs(p);
  if (trail) graph.push({ '@type': 'BreadcrumbList', itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) });
  if (p.faq) graph.push({ '@type': 'FAQPage', inLanguage: lang, mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  if (p.crumb === 'Guides') graph.push({ '@type': 'Article', '@id': `${url}#article`, headline: plainH1(p), description: p.description, inLanguage: lang, image: ogImage(p),
    dateModified: UPDATED, author: { '@id': `${SITE_URL}/#org` }, publisher: { '@id': `${SITE_URL}/#org` }, mainEntityOfPage: { '@id': `${url}#page` } });
  if (p.video) graph.push({ '@type': 'VideoObject', name: p.video.name, description: p.video.description, thumbnailUrl: `${SITE_URL}${p.video.poster}`,
    contentUrl: `${SITE_URL}${p.video.src}`, uploadDate: p.video.uploaded, duration: p.video.duration, inLanguage: lang });
  if (p.steps) graph.push({ '@type': 'HowTo', inLanguage: lang, name: plainH1(p), step: p.steps.map(([n, t], i) => ({ '@type': 'HowToStep', position: i + 1, name: n, text: t })) });
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

// Official social accounts: footer links and schema.org sameAs.
const SOCIAL = [{ name: 'TikTok', url: 'https://www.tiktok.com/@melocutofficial',
  icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.37-2.48V9.66a5.69 5.69 0 0 0-.77-.05A5.68 5.68 0 0 0 4.18 15.3 5.68 5.68 0 0 0 9.86 21a5.68 5.68 0 0 0 5.68-5.68V9.01a7.33 7.33 0 0 0 4.28 1.38V7.32a4.28 4.28 0 0 1-3.22-1.5z"/></svg>' },
  { name: 'Instagram', url: 'https://www.instagram.com/melocutt/',
  icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>' }];
const GLOBE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>';

function page(p) {
  const lang = p.lang || 'en', ui = LANGS[lang].ui, L = { WHY: whyHTML(ui), INSTALL: installHTML(ui) };
  const url = urlOf(p);
  const img = ogImage(p);
  const vers = versions(p);
  const isEn = lang === 'en';
  const body = typeof p.body === 'function' ? p.body(L) : p.body;
  const toolPath = (t) => toolIn(t, lang).href.slice(1, -1);
  const navLinks = TOOLS.filter((t) => MAIN_NAV.includes(t.slug)).map((t) => { const x = toolIn(t, lang); return `<a href="${x.href}"${p.path === toolPath(t) ? ' aria-current="page"' : ''}>${isEn ? t.nav : x.title}</a>`; }).join('')
    + `<a href="${ui.prefix}/#tools">${ui.navAll || ui.allTools}</a>`;
  // Language switcher: the same page in the other language when it exists, else that language's home page.
  const switcher = `<details class="lang"><summary aria-label="${ui.language}: ${ui.short}">${GLOBE}<span>${ui.short}</span></summary><div class="lang-menu">${Object.keys(LANGS).map((l) => {
    const target = vers.find((q) => q.lang === l) || homeOf(l);
    return `<a href="${urlOf(target).replace(SITE_URL, '')}" hreflang="${LANGS[l].ui.hreflang}" lang="${LANGS[l].ui.code}"${l === lang ? ' aria-current="true"' : ''}>${LANGS[l].ui.name}</a>`;
  }).join('')}</div></details>`;
  const alternates = p.key ? [...vers.map((q) => `<link rel="alternate" hreflang="${LANGS[q.lang].ui.hreflang}" href="${urlOf(q)}">`),
    `<link rel="alternate" hreflang="x-default" href="${urlOf(vers.find((q) => q.lang === 'en'))}">`].join('\n') : '';
  const others = TOOLS.filter((t) => toolPath(t) !== p.path);
  const trail = crumbs(p);
  return `<!doctype html>
<html lang="${ui.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
${alternates}
<meta name="theme-color" content="#6d4aff">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="${NAME}">
<meta property="og:type" content="${p.crumb === 'Guides' ? 'article' : 'website'}">
<meta property="og:site_name" content="${NAME}">
<meta property="og:locale" content="${ui.ogLocale}">
${vers.filter((q) => q.lang !== lang).map((q) => `<meta property="og:locale:alternate" content="${LANGS[q.lang].ui.ogLocale}">`).join('\n')}
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ui.ogAlt(plainH1(p)))}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${img}">
<meta name="google-adsense-account" content="ca-pub-2388733415031298">
<link rel="preload" href="${asset('assets/fonts/inter-latin.woff2')}" as="font" type="font/woff2" crossorigin>
<style>${INLINE_CSS}</style>
<script src="${asset('assets/config.js')}" defer></script>
<script src="${asset('assets/site.js')}" defer></script>
${p.tool && !isEn ? `<script src="${asset(`assets/i18n/${lang}.js`)}" defer></script>` : ''}
${p.tool ? `<link rel="modulepreload" href="${asset('assets/app.js')}">\n<script type="module" src="${asset('assets/app.js')}"></script>\n<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>` : ''}
<script type="application/ld+json">${jsonLd(p)}</script>
</head>
<body>
<header class="top">
  <div class="wrap">
    <a class="logo" href="${ui.prefix}/" aria-label="${ui.homeAria}"><img src="${asset('assets/logo.svg')}" width="32" height="32" alt="">${NAME}</a>
    <nav class="nav" aria-label="${ui.tools}">${navLinks}</nav>
    <a class="btn sm install-btn" href="/guides/install-app/" aria-label="${ui.installApp}">${ICONS.phone.replace(/22/g, '16')}<span>${ui.installApp}</span></a>
    ${switcher}
    <button class="menu-btn" type="button" aria-label="${ui.menu}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  </div>
</header>
<main class="wrap">
  ${trail ? `<nav class="crumbs" aria-label="Breadcrumb">${trail.map((c, i) => (i < trail.length - 1 ? `<a href="${c.url.replace(SITE_URL, '')}">${c.name}</a>` : `<span aria-current="page">${c.name}</span>`)).join('<span class="sep">›</span>')}</nav>` : ''}
  <div class="hero"${p.plain ? ' style="text-align:left;padding-bottom:0"' : ''}>
    <h1>${p.h1}</h1>
    ${p.lead ? `<p>${p.lead}</p>` : ''}
    ${p.badges ? `<div class="badges">${p.badges.map((b) => `<span class="badge">${b}</span>`).join('')}</div>` : ''}
  </div>
  ${p.home ? `${toolGrid(lang)}\n  <div class="ad" data-slot="top"></div>` : ''}
  ${p.tool ? `<div class="tool" data-tool="${p.tool}"${p.format ? ` data-format="${p.format}"` : ''}${p.fx ? ` data-fx='${JSON.stringify(p.fx)}'` : ''}${p.note ? ` data-note="${esc(p.note)}"` : ''}${p.suffix ? ` data-suffix="${esc(p.suffix)}"` : ''}><noscript>${ui.noscript}</noscript></div>
  <div class="ad" data-slot="top"></div>` : ''}
  ${body || ''}
  ${p.steps ? `<div class="section"><h2>${ui.howItWorks}</h2><div class="steps">${p.steps.map(([n, t]) => `<div class="card"><b>${n}</b><p>${t}</p></div>`).join('')}</div></div>` : ''}
  ${p.video ? `<figure class="howto-video"><video controls playsinline preload="none" width="${p.video.width}" height="${p.video.height}" poster="${p.video.poster}"><source src="${p.video.src}" type="video/mp4"></video><figcaption>${p.video.caption}</figcaption></figure>` : ''}
  ${p.content ? `<div class="section prose">${p.content}</div>` : ''}
  ${isEn && TOOL_GUIDE[p.path] ? (() => { const g = GUIDES.find((x) => x.slug === TOOL_GUIDE[p.path]); return `<a class="callout guide-link" href="/guides/${g.slug}/">${ICONS.book}<span><b>Step-by-step guide</b>${g.title}</span></a>`; })() : ''}
  ${p.tool ? '<div class="ad" data-slot="middle"></div>' : ''}
  ${p.tool ? `<div class="section"><h2>${ui.moreTools}</h2><div class="cards rail">${others.map((t) => toolCardIn(t, lang)).join('')}</div></div>
  ${isEn ? `<div class="section"><h2>Popular conversions</h2>${CONVERSION_LINKS}</div>` : ''}${installHTML(ui)}` : ''}
  ${p.faq ? `<div class="section"><h2>${ui.faq}</h2>${p.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>` : ''}
  ${p.crumb === 'Guides' ? `<div class="section"><h2>More guides</h2><div class="cards">${GUIDES.filter((g) => `guides/${g.slug}` !== p.path).slice(0, 6).map(guideCard).join('')}</div></div>` : ''}
  ${p.plain ? '' : '<div class="ad" data-slot="bottom"></div>'}
</main>
<footer>
  <div class="wrap">
    <div class="fbar"><span>© <span data-year></span> ${NAME} · ${ui.footerTagline}</span><span class="social">${SOCIAL.map((s) => `<a href="${s.url}" target="_blank" rel="noopener me" aria-label="${NAME} on ${s.name}">${s.icon}<span>${s.name}</span></a>`).join('')}</span></div>
    <div class="fcols">
      <nav aria-label="${ui.fTools}"><b>${ui.fTools}</b>${TOOLS.map((t) => { const x = toolIn(t, lang); return `<a href="${x.href}"${x.english ? ' hreflang="en"' : ''}>${x.title}${x.english ? `<span class="en-tag" title="${ui.inEnglish}">EN</span>` : ''}</a>`; }).join('')}</nav>
      ${isEn ? `<nav aria-label="Conversions"><b>Conversions</b>${CONVERSIONS.map((c) => `<a href="/${c.slug}/">${c.label}</a>`).join('')}</nav>` : ''}
      <nav aria-label="${ui.fHelp}"><b>${ui.fHelp}</b><a href="/guides/">${ui.fGuides}</a><a href="/guides/install-app/">${ui.fInstall}</a><a href="/about/">${ui.fAbout}</a><a href="/privacy/">${ui.fPrivacy}</a><a href="/terms/">${ui.fTerms}</a></nav>
      <nav aria-label="${ui.language}"><b>${ui.language}</b>${Object.keys(LANGS).map((l) => { const target = vers.find((q) => q.lang === l) || homeOf(l); return `<a href="${urlOf(target).replace(SITE_URL, '')}" hreflang="${LANGS[l].ui.hreflang}" lang="${LANGS[l].ui.code}">${LANGS[l].ui.name}</a>`; }).join('')}</nav>
    </div>
  </div>
</footer>
</body>
</html>
`;
}

for (const p of ALL) {
  const dir = path.join(ROOT, p.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(p));
}
fs.writeFileSync(path.join(ROOT, '404.html'), page({
  lang: 'en', path: '404', title: `Page not found | ${NAME}`, description: 'Page not found.', h1: 'Page not found',
  lead: "That page doesn't exist, or it moved. Pick a tool below, or go back to the <a href=\"/\">home page</a> or the <a href=\"/guides/\">guides</a>.", plain: false,
  body: `<div class="cards">${TOOLS.map((t) => toolCardIn(t, 'en')).join('')}</div><div class="section"><h2>Popular conversions</h2>${CONVERSION_LINKS}</div>`,
}).replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex">'));
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
const priority = (p) => (p.key === 'home' ? '1.0' : p.tool ? '0.9' : p.path.startsWith('guides') ? '0.7' : '0.4');
const altLinks = (p) => (p.key ? versions(p).map((q) => `<xhtml:link rel="alternate" hreflang="${LANGS[q.lang].ui.hreflang}" href="${urlOf(q)}"/>`).join('')
  + `<xhtml:link rel="alternate" hreflang="x-default" href="${urlOf(versions(p).find((q) => q.lang === 'en'))}"/>` : '');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${ALL.map((p) => `  <url><loc>${urlOf(p)}</loc><lastmod>${UPDATED}</lastmod><priority>${priority(p)}</priority>${altLinks(p)}<image:image><image:loc>${ogImage(p)}</image:loc></image:image></url>`).join('\n')}
</urlset>
`);
// Page list for the social-image generator (og.mjs).
fs.writeFileSync(path.join(path.dirname(ROOT), 'pages.json'), JSON.stringify(ALL.map((p) => ({ slug: slugOf(p), h1: plainH1(p), lead: strip(p.lead || ''), tag: LANGS[p.lang].ui.tag })), null, 1));
// The private admin page is hand-written; point it at the current versioned stylesheet and logo.
const adminFile = path.join(ROOT, 'admin', 'index.html');
if (fs.existsSync(adminFile)) fs.writeFileSync(adminFile, fs.readFileSync(adminFile, 'utf8')
  .replace(/\/assets\/style\.css(\?v=[0-9a-f]+)?/, asset('assets/style.css')).replace(/\/assets\/logo\.svg(\?v=[0-9a-f]+)?/, asset('assets/logo.svg')));
console.log(`Built ${ALL.length + 1} pages for ${SITE_URL} (${Object.keys(LANGS).map((l) => `${l}: ${ALL.filter((p) => p.lang === l).length}`).join(', ')})`);
