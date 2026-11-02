// MeloCut tool engine. Everything runs in the visitor's browser:
// Web Audio for the waveform + quick playback, ffmpeg.wasm for effects + encoding.
import { FFmpeg } from '../vendor/ffmpeg/index.js';

// Interface text is English in the code. Other languages come from /assets/i18n/<lang>.js,
// loaded before this module: a map from the English text to the translation, with {0}, {1} slots.
const DICT = window.MELOCUT_I18N || {};
const T = (s, ...a) => (DICT[s] ?? s).replace(/\{(\d)\}/g, (_, i) => a[i]);

const CORE_BASE = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm';
const MAX_BYTES = 1024 * 1024 * 1024; // 1 GB
const BIG_ON_PHONE = 300 * 1024 * 1024; // above this, warn on touch devices
const RINGTONE_MAX = 40; // iPhone ringtone limit (seconds)
const PREVIEW_SECONDS = 15;
const CANCELLED = 'cancelled';
// RNNoise neural-network model for the AI noise removal (fetched only when used).
const RNN_MODEL_URL = 'https://cdn.jsdelivr.net/gh/GregorR/rnnoise-models@master/somnolent-hogwash-2018-09-01/sh.rnnn';
const RNN_MODEL_FILE = 'voice.rnnn';
let rnnModel = null;
async function ensureModel(ff) {
  rnnModel ||= fetch(RNN_MODEL_URL).then((r) => {
    if (!r.ok) throw new Error(T('Could not load the AI noise model. Check your connection.'));
    return r.arrayBuffer();
  }).catch((e) => { rnnModel = null; throw e; });
  // writeFile transfers (detaches) the buffer to the worker, so always hand over a copy.
  await ff.writeFile(RNN_MODEL_FILE, new Uint8Array((await rnnModel).slice(0)));
}

const FORMATS = {
  mp3: { label: 'MP3', mime: 'audio/mpeg', args: (q) => ['-c:a', 'libmp3lame', '-b:a', `${q}k`] },
  m4a: { label: 'M4A (AAC)', mime: 'audio/mp4', args: (q) => ['-c:a', 'aac', '-b:a', `${q}k`] },
  m4r: { label: T('M4R (iPhone ringtone)'), mime: 'audio/mp4', args: () => ['-c:a', 'aac', '-b:a', '192k', '-f', 'ipod'] },
  wav: { label: T('WAV (16-bit)'), mime: 'audio/wav', args: () => ['-c:a', 'pcm_s16le'] },
  // Vorbis rejects fixed bitrates it can't hit (e.g. 320k mono), so use quality mode.
  ogg: { label: 'OGG (Vorbis)', mime: 'audio/ogg', args: (q) => ['-c:a', 'libvorbis', '-q:a', { 128: '4', 192: '6', 256: '8', 320: '9' }[q] || '6'] },
  flac: { label: T('FLAC (lossless)'), mime: 'audio/flac', args: () => ['-c:a', 'flac'] },
  mp4: { label: T('MP4 video'), mime: 'video/mp4', args: () => [] }, // built separately, see videoArgs()
};
const LOSSY = ['mp3', 'm4a', 'ogg'];
const ALL_FORMATS = ['mp3', 'm4a', 'wav', 'ogg', 'flac'];

// ---------- ffmpeg engine (loaded once, on demand) ----------
// Fetch into a blob: URL, reporting progress. Content-Length may be the
// compressed size, so progress is only an estimate and capped below 100%.
async function toBlobURL(url, type, onProgress) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(T('Could not load the audio engine ({0}). Check your connection.', resp.status));
  const total = Number(resp.headers.get('content-length')) || 32e6;
  if (!resp.body || !onProgress) return URL.createObjectURL(new Blob([await resp.arrayBuffer()], { type }));
  const reader = resp.body.getReader();
  const chunks = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    onProgress(Math.min(0.99, received / total));
  }
  return URL.createObjectURL(new Blob(chunks, { type }));
}

let enginePromise = null;
let engineReady = false;
let engineProgress = null; // latest progress listener (the UI that asked last)
function loadEngine(onProgress) {
  engineProgress = onProgress;
  if (!enginePromise) {
    enginePromise = (async () => {
      const ff = new FFmpeg();
      const coreURL = await toBlobURL(`${CORE_BASE}/ffmpeg-core.js`, 'text/javascript');
      const wasmURL = await toBlobURL(`${CORE_BASE}/ffmpeg-core.wasm`, 'application/wasm', (p) => engineProgress?.(p));
      try { await ff.load({ coreURL, wasmURL }); } finally { URL.revokeObjectURL(coreURL); URL.revokeObjectURL(wasmURL); }
      engineReady = true;
      return ff;
    })().catch((e) => { enginePromise = null; throw e; });
  }
  return enginePromise;
}
// Start downloading the engine as soon as a file is chosen, so Convert doesn't wait for it.
// Skipped when the visitor asked to save data; then the note by the button explains the download.
function preloadEngine(onProgress) {
  if (engineReady || enginePromise || navigator.connection?.saveData) return null;
  return loadEngine(onProgress).catch(() => {});
}
// A failed run can leave the wasm engine aborted: drop it so the next try starts fresh.
function resetEngine(ff) { try { ff?.terminate(); } catch {} enginePromise = null; }
// One ffmpeg instance is shared, and it uses fixed file names: run jobs one at a time.
let engineQueue = Promise.resolve();
function exclusive(fn) {
  const run = engineQueue.then(fn, fn);
  engineQueue = run.catch(() => {});
  return run;
}
// Promise wrapper that also works with old Safari's callback-only decodeAudioData.
const decodeAudio = (ctx, buf) => new Promise((resolve, reject) => {
  const r = ctx.decodeAudioData(buf, resolve, reject);
  if (r && r.then) r.then(resolve, reject);
});

// Run one ffmpeg command, reporting progress (0..1) against the expected output length.
// Resolves with the real length of what was written (ffmpeg's last time= report), or null.
async function runFFmpeg(ff, args, outLen, onProgress) {
  const logTail = [];
  let written = null;
  const onLog = ({ message }) => {
    logTail.push(message); if (logTail.length > 30) logTail.shift();
    const m = message.match(/time=(\d+):(\d+):([\d.]+)/);
    if (!m) return;
    written = +m[1] * 3600 + +m[2] * 60 + +m[3];
    onProgress?.(Math.min(1, written / Math.max(outLen, 0.1)));
  };
  ff.on('log', onLog);
  try {
    const code = await ff.exec(args);
    if (code !== 0) {
      console.error('ffmpeg failed', args.join(' '), '\n' + logTail.join('\n'));
      throw new Error(T('Processing failed. The file may be damaged or use an unusual format.'));
    }
    return written;
  } finally {
    ff.off('log', onLog);
  }
}

// ---------- helpers ----------
const $ = (root, sel) => root.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const fmt = (t) => {
  t = Math.round(Math.max(0, t || 0) * 10) / 10; // round first, so 59.96 s shows as 1:00.0, not 0:60.0
  const m = Math.floor(t / 60), s = t - m * 60;
  return `${m}:${s.toFixed(1).padStart(4, '0')}`;
};
const parseTime = (str) => {
  const parts = String(str).trim().split(':').map(Number);
  if (parts.some(Number.isNaN)) return NaN;
  return parts.reduce((acc, p) => acc * 60 + p, 0);
};
const baseName = (name) => name.replace(/\.[^.]+$/, '').slice(0, 120) || 'audio';
const extOf = (name) => (name.match(/\.([a-z0-9]{1,5})$/i)?.[1] || 'bin').toLowerCase();
const track = (event, props) => { try { props = { page: location.pathname, lang: document.documentElement.lang, ...props }; if (window.umami) window.umami.track(event, props); else (window.__mq ||= []).push([event, props]); window.plausible?.(event, { props }); window.gtag?.('event', event, props); } catch {} };
const downloadURL = (url, name) => {
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
};
// One icon set (24px grid, 2px rounded strokes) so buttons look the same on every device.
const svg = (d, fill) => `<svg class="i" width="18" height="18" viewBox="0 0 24 24" fill="${fill ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  play: svg('<path d="M7 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L8.5 4.64A1 1 0 0 0 7 5.5z"/>', true),
  stop: svg('<rect x="6" y="6" width="12" height="12" rx="2"/>', true),
  phones: svg('<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 15a2 2 0 0 1-2 2h-1v-5h3zM3 15a2 2 0 0 0 2 2h1v-5H3z"/>'),
  sliders: svg('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),
  download: svg('<path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 20h14"/>'),
  share: svg('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>'),
  lock: svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
  spark: svg('<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>'),
  up: svg('<path d="M12 19V5M6 11l6-6 6 6"/>'),
  down: svg('<path d="M12 5v14M6 13l6 6 6-6"/>'),
  x: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
};
const label = (icon, text) => `${I[icon]}<span>${text}</span>`;
const ACCEPT = 'audio/*,video/*,.mp3,.mp4,.m4a,.wav,.ogg,.opus,.flac,.webm,.mov,.mkv,.aac,.amr,.3gp';
const UPLOAD_ICON = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M6 10l6-6 6 6"/><path d="M4 18v2h16v-2"/></svg>';

// atempo only accepts 0.5..2 per instance, so chain it for bigger changes.
function atempoChain(t) {
  const out = [];
  while (t > 2) { out.push('atempo=2'); t /= 2; }
  while (t < 0.5) { out.push('atempo=0.5'); t /= 0.5; }
  if (Math.abs(t - 1) > 1e-3) out.push(`atempo=${t.toFixed(4)}`);
  return out;
}

// ---------- effects ----------
const FX_DEFAULTS = {
  fadeIn: 0, fadeOut: 0, volume: 100, normalize: false, speed: 1, pitch: 0, bass: 0, treble: 0,
  reverb: 0, eightD: false, aiDenoise: false, denoise: false, karaoke: false, silence: false, reverse: false, mono: false,
  voice: '', // voice changer character that needs its own filters: robot, alien or telephone
};
const PRESETS = {
  slowed: { label: T('Slowed + Reverb'), fx: { speed: 0.85, pitch: -2, reverb: 45, fadeIn: 1, fadeOut: 3 } },
  nightcore: { label: 'Nightcore', fx: { speed: 1.2, pitch: 3 } },
  eightD: { label: '8D Audio', fx: { eightD: true, reverb: 20 } },
  bass: { label: T('Bass Boosted'), fx: { bass: 10, normalize: true } },
  loud: { label: T('Louder'), fx: { volume: 180, normalize: true } },
  voice: { label: T('AI Clean Voice'), ai: true, fx: { aiDenoise: true, normalize: true, silence: true, treble: 2 } },
  karaoke: { label: T('Karaoke'), fx: { karaoke: true } },
  // Voice changer characters, shown only on the voice changer.
  chipmunk: { voice: true, label: T('Chipmunk'), fx: { pitch: 8 } },
  deep: { voice: true, label: T('Deep voice'), fx: { pitch: -5, bass: 4 } },
  monster: { voice: true, label: T('Monster'), fx: { pitch: -9, bass: 6, reverb: 35 } },
  robot: { voice: true, label: T('Robot'), fx: { voice: 'robot' } },
  alien: { voice: true, label: T('Alien'), fx: { pitch: 4, voice: 'alien' } },
  telephone: { voice: true, label: T('Telephone'), fx: { voice: 'telephone' } },
  echo: { voice: true, label: T('Echo'), fx: { reverb: 75 } },
};
const VOICE_PRESETS = Object.keys(PRESETS).filter((k) => PRESETS[k].voice);
const MUSIC_PRESETS = Object.keys(PRESETS).filter((k) => !PRESETS[k].voice);

// Filter chain for the given effects; len = input length in seconds. Returns { filters, outLen, extraArgs }.
function effectFilters(fx, len) {
  // Always pin the channel layout first: ffmpeg 5.1 (wasm) cannot pick an output layout for
  // inputs with an unknown one (e.g. some mono voice notes), especially for WAV/FLAC/preview.
  const f = ['aformat=channel_layouts=mono|stereo'];
  if (fx.aiDenoise) f.push('aresample=48000', `arnndn=m=${RNN_MODEL_FILE}`);
  if (fx.denoise) f.push('afftdn=nf=-25');
  // Classic centre-channel cancellation: removes vocals mixed in the middle of a stereo song.
  if (fx.karaoke) f.push('aformat=channel_layouts=stereo', 'pan=stereo|c0=c0-c1|c1=c1-c0');
  if (fx.reverse) f.push('areverse');
  const pitchRatio = Math.pow(2, fx.pitch / 12);
  if (fx.pitch) f.push('aresample=48000', `asetrate=${Math.round(48000 * pitchRatio)}`, 'aresample=48000');
  f.push(...atempoChain(fx.speed / pitchRatio));
  const outLen = len / fx.speed;
  const { fi, fo } = fadeLens(fx, outLen);
  if (fi > 0) f.push(`afade=t=in:st=0:d=${fi.toFixed(2)}`);
  if (fo > 0) f.push(`afade=t=out:st=${Math.max(0, outLen - fo).toFixed(2)}:d=${fo.toFixed(2)}`);
  // Voice changer characters (phase-flattened FFT for robot, fast tremolo + slapback for alien, narrow band for telephone).
  // Robot and telephone lose a lot of level, so they get make-up gain (and a limiter) to match the other voices.
  if (fx.voice === 'robot') f.push("afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75", 'volume=3.5', 'alimiter=limit=0.97');
  // (vibrato/flanger were dropped: in ffmpeg.wasm they intermittently emit invalid samples that crash the MP3 encoder)
  if (fx.voice === 'alien') f.push('tremolo=f=28:d=0.55', 'aecho=0.8:0.6:18:0.35', 'volume=2', 'alimiter=limit=0.97');
  if (fx.voice === 'telephone') f.push('highpass=f=300', 'lowpass=f=3400', 'acompressor=threshold=0.1:ratio=4', 'volume=2.2', 'alimiter=limit=0.97');
  if (fx.bass) f.push(`bass=g=${fx.bass}:f=110`);
  if (fx.treble) f.push(`treble=g=${fx.treble}:f=3000`);
  if (fx.reverb > 0) {
    const k = fx.reverb / 100;
    f.push(`aecho=0.8:0.9:40|75|120|180:${[0.5, 0.4, 0.3, 0.2].map((x) => (x * k).toFixed(3)).join('|')}`);
  }
  if (fx.eightD) f.push('aformat=channel_layouts=stereo', 'apulsator=hz=0.09:amount=0.9');
  if (fx.silence) f.push('silenceremove=start_periods=1:start_threshold=-50dB:stop_periods=-1:stop_duration=0.8:stop_threshold=-50dB');
  if (fx.volume !== 100) f.push(`volume=${(fx.volume / 100).toFixed(2)}`);
  if (fx.normalize) f.push('loudnorm=I=-14:TP=-1.5:LRA=11', 'aresample=44100');
  if (fx.volume > 100 || fx.bass > 0 || fx.reverb > 0) f.push('alimiter=limit=0.97');
  f.push('aformat=channel_layouts=mono|stereo'); // and again last: loudnorm can drop it on a filter re-init
  // Mono would fold 8D back to the centre, and fold the vocal remover's L-R / R-L to silence.
  return { filters: f, outLen, extraArgs: fx.mono && !fx.eightD && !fx.karaoke ? ['-ac', '1'] : [] };
}

// Fade lengths actually used: as set, unless fade in + fade out is longer than the clip,
// then both shrink in proportion so they still fit. `shortened` says when that happened.
function fadeLens(fx, len) {
  const fi = Math.max(0, fx.fadeIn), fo = Math.max(0, fx.fadeOut), k = fi + fo > len ? len / (fi + fo) : 1;
  return { fi: fi * k, fo: fo * k, shortened: k < 1 };
}
const isDefaultFx = (fx) => Object.keys(FX_DEFAULTS).every((k) => fx[k] === FX_DEFAULTS[k]);
const FX_NAMES = { fadeIn: T('Fade in'), fadeOut: T('Fade out'), volume: T('Volume'), normalize: T('Auto loudness'), speed: T('Speed'), pitch: T('Pitch'),
  bass: T('Bass'), treble: T('Treble'), reverb: T('Reverb'), eightD: '8D', aiDenoise: T('AI noise removal'), denoise: T('Reduce hiss'),
  karaoke: T('Vocal remover'), silence: T('Remove silences'), reverse: T('Reverse'), mono: T('Mono'), voice: T('Voice effect') };
// Short list of the effects that are switched on, e.g. "Fade in 1s, Fade out 2s".
function fxNames(fx) {
  const on = Object.keys(FX_DEFAULTS).filter((k) => fx[k] !== FX_DEFAULTS[k])
    .map((k) => (k === 'fadeIn' || k === 'fadeOut' ? `${FX_NAMES[k]} ${fx[k]}s` : FX_NAMES[k]));
  return on.length > 3 ? T('{0} +{1} more', on.slice(0, 2).join(', '), on.length - 2) : on.join(', ');
}

function slider(key, label, min, max, step, unit) {
  return `<label class="fx-s"><span>${label} <output data-fxv="${key}"></output></span>
    <input type="range" data-fx="${key}" min="${min}" max="${max}" step="${step}" data-unit="${unit}"></label>`;
}
function toggle(key, label, tip) {
  return `<label class="fx-t" title="${tip}"><input type="checkbox" data-fx="${key}"> ${label}</label>`;
}
function fxHTML(open, presets = MUSIC_PRESETS) {
  return `<details class="fx" data-fxbox ${open ? 'open' : ''}>
    <summary>${I.sliders}<span>${T('Effects &amp; filters')}</span> <small data-fxcount></small></summary>
    <div class="presets">${presets.map((k) => [k, PRESETS[k]]).map(([k, p]) => `<button type="button" class="chip" data-preset="${k}">${p.ai ? I.spark : ''}${p.label}</button>`).join('')}
      <button type="button" class="chip ghost" data-preset="reset">${T('Reset')}</button></div>
    <div class="fx-grid">
      ${slider('fadeIn', T('Fade in'), 0, 10, 0.5, 's')}
      ${slider('fadeOut', T('Fade out'), 0, 10, 0.5, 's')}
      ${slider('volume', T('Volume'), 25, 300, 5, '%')}
      ${slider('speed', T('Speed'), 0.5, 2, 0.05, '×')}
      ${slider('pitch', T('Pitch'), -12, 12, 1, 'st')}
      ${slider('bass', T('Bass'), -10, 15, 1, 'dB')}
      ${slider('treble', T('Treble'), -10, 10, 1, 'dB')}
      ${slider('reverb', T('Reverb'), 0, 100, 5, '%')}
    </div>
    <div class="fx-toggles">
      ${toggle('normalize', T('Auto loudness'), T('Make the volume even and as loud as streaming apps'))}
      ${toggle('eightD', T('8D audio'), T('Sound moves around your head (use headphones)'))}
      ${toggle('aiDenoise', `${I.spark}${T('AI noise removal')}`, T('A neural network (RNNoise) removes background noise from voices'))}
      ${toggle('denoise', T('Reduce hiss'), T('Remove steady background hiss and hum'))}
      ${toggle('karaoke', T('Vocal remover'), T('Karaoke: removes vocals that sit in the center of a stereo song'))}
      ${toggle('silence', T('Remove silences'), T('Cut out quiet gaps'))}
      ${toggle('reverse', T('Reverse'), T('Play the audio backwards'))}
      ${toggle('mono', T('Mono'), T('Mix to one channel'))}
    </div>
    <div class="fx-preview"><button type="button" class="btn ghost sm" data-fxpreview>${label('phones', T('Preview with effects'))}</button><small data-fxstatus>${T('Plays the first {0} seconds of your selection with the effects. The full file gets them when you convert.', PREVIEW_SECONDS)}</small></div>
  </details>`;
}
const fmtFx = (key, v) => {
  switch (key) {
    case 'fadeIn': case 'fadeOut': return v > 0 ? `${v}s` : T('off');
    case 'volume': return `${v}%`;
    case 'speed': return `${(+v).toFixed(2)}×`;
    case 'pitch': return v == 0 ? '0' : T('{0} semitones', `${v > 0 ? '+' : ''}${v}`);
    case 'bass': case 'treble': return v == 0 ? '0' : `${v > 0 ? '+' : ''}${v} dB`;
    case 'reverb': return v > 0 ? `${v}%` : T('off');
    default: return v;
  }
};

// Colors a slider's track up to its thumb (CSS reads --p).
const fillRange = (el) => el.style.setProperty('--p', `${((el.value - el.min) / (el.max - el.min)) * 100}%`);

// Wires an effects panel inside `root`. Returns { get(), set(fx), onChange }.
// Browsers built into apps (TikTok, Instagram, Facebook…) often cannot save downloaded files.
// Visitors from our videos land there, so say so up front and offer the way out.
const UA = navigator.userAgent;
const IS_ANDROID = /Android/i.test(UA);
const BROWSER = IS_ANDROID ? 'Chrome' : 'Safari';
const IN_APP = (() => {
  if (window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone) return '';
  if (/TikTok|musical_ly|Bytedance/i.test(UA)) return 'TikTok';
  if (/Instagram/i.test(UA)) return 'Instagram';
  if (/FBAN|FBAV|FB_IAB/i.test(UA)) return 'Facebook';
  if (/Snapchat|Pinterest|\bLine\//i.test(UA) || /; wv\)/.test(UA)) return T('this app');
  if (/iPhone|iPad|iPod/.test(UA) && !/Safari\//.test(UA)) return T('this app');
  return '';
})();
const INAPP_HTML = () => (IN_APP ? `<div class="inapp" role="note"><p><strong>${T('You opened MeloCut inside {0}. Downloads often do not work in app browsers.', IN_APP)}</strong>
  ${T('Tap ⋯ or ⋮ at the top and choose Open in browser, or copy the link and paste it into {0}.', BROWSER)}</p>
  <div class="inapp-btns">${IS_ANDROID ? `<a class="btn sm" href="intent://${location.host}${location.pathname}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(location.href)};end" data-inapp-open>${T('Open in Chrome')}</a>` : ''}
  <button class="btn ghost sm" type="button" data-inapp-copy>${T('Copy link')}</button></div><small data-inapp-msg role="status" aria-live="polite"></small></div>` : '');
function wireInApp(root) {
  const copy = $(root, '[data-inapp-copy]');
  if (!copy) return;
  track('inapp_seen', { app: IN_APP });
  $(root, '[data-inapp-open]')?.addEventListener('click', () => track('inapp_open', { app: IN_APP }));
  copy.onclick = async () => {
    const msg = $(root, '[data-inapp-msg]');
    try { await navigator.clipboard.writeText(location.href); msg.textContent = T('Link copied. Paste it into {0}.', BROWSER); } catch { msg.textContent = location.href; }
    track('inapp_copy', { app: IN_APP });
  };
}

const KOFI = 'https://ko-fi.com/melocut';
// After a download: say where the file went, and let people send it (or the tool's link) to friends.
const SHARE_HTML = () => `<div class="share-row" data-share hidden><small class="dl-note" data-dlnote role="status" aria-live="polite"></small><span class="next-row" data-nextrow hidden></span><button class="btn ghost sm" type="button" data-sharebtn>${I.share}${T('Send to a friend')}</button><a class="btn ghost sm" href="${KOFI}" target="_blank" rel="noopener" data-kofi>☕ ${T('Buy us a coffee')}</a><small data-sharemsg role="status" aria-live="polite"></small></div>`;
// Hand a result to the next tool: the file waits in IndexedDB for a few minutes and the next page opens it.
// Private windows or blocked storage just open the next page without the file.
const idbKV = (mode, fn) => new Promise((resolve, reject) => {
  const req = indexedDB.open('melocut', 1);
  req.onupgradeneeded = () => req.result.createObjectStore('kv');
  req.onerror = () => reject(req.error);
  req.onsuccess = () => {
    const db = req.result, tx = db.transaction('kv', mode), out = fn(tx.objectStore('kv'));
    tx.oncomplete = () => { db.close(); resolve(out?.result); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  };
});
async function giveHandoff(file) {
  try { await idbKV('readwrite', (s) => s.put({ blob: file, name: file.name, type: file.type, ts: Date.now() }, 'handoff')); return true; } catch { return false; }
}
async function takeHandoff() {
  try {
    const rec = await idbKV('readonly', (s) => s.get('handoff'));
    await idbKV('readwrite', (s) => s.delete('handoff'));
    if (!rec || Date.now() - rec.ts > 10 * 60 * 1000) return null;
    return new File([rec.blob], rec.name, { type: rec.type });
  } catch { return null; }
}
function mountShare(root) {
  const box = $(root, '[data-share]'), btn = $(root, '[data-sharebtn]'), msg = $(root, '[data-sharemsg]'), note = $(root, '[data-dlnote]');
  let taps = 0;
  const link = location.origin + location.pathname;
  const text = T('Made for free with MeloCut: {0}', link);
  let file = null;
  const copy = async () => {
    try { await navigator.clipboard.writeText(link); msg.textContent = T('Link copied. Paste it in any chat.'); track('share', { tool: root.dataset.tool, kind: 'copy' }); } catch { msg.textContent = link; }
  };
  $(root, '[data-kofi]').onclick = () => track('kofi', { tool: root.dataset.tool });
  const nextRow = $(root, '[data-nextrow]');
  let next = [];
  try { next = JSON.parse(root.dataset.next || '[]'); } catch {}
  nextRow.innerHTML = next.map((n, i) => `<a class="btn ghost sm next" href="${n.href}#handoff" data-nx="${i}">${n.label} →</a>`).join('');
  nextRow.hidden = !next.length;
  nextRow.querySelectorAll('[data-nx]').forEach((a) => a.addEventListener('click', async (e) => {
    if (!file) return;
    e.preventDefault();
    const ok = await giveHandoff(file);
    track('next', { tool: root.dataset.tool, to: next[a.dataset.nx].href });
    location.href = ok ? a.href : next[a.dataset.nx].href;
  }));
  btn.onclick = async () => {
    msg.textContent = '';
    try {
      if (file && navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], text }); track('share', { tool: root.dataset.tool, kind: 'file' }); }
      else if (navigator.share) { await navigator.share({ text, url: link }); track('share', { tool: root.dataset.tool, kind: 'link' }); }
      else await copy();
    } catch (e) { if (e?.name !== 'AbortError') await copy(); }
  };
  return {
    // Called on every Download tap; returns how many times this result was downloaded.
    show(blob, name) {
      taps += 1;
      file = new File([blob], name, { type: blob.type }); msg.textContent = ''; box.hidden = false;
      note.textContent = taps === 1 ? T('Downloading. iPhone: Files → Downloads. Android: the notification bar or Files → Downloads.')
        : IN_APP ? T('Still no file? App browsers often block downloads. Open this page in {0} and try again.', BROWSER)
          : T('Still no file? Look in Downloads. On iPhone, tap the download arrow in the address bar.');
      return taps;
    },
    hide() { file = null; taps = 0; box.hidden = true; },
  };
}

function mountFx(root, initial, onChange) {
  const box = $(root, '[data-fxbox]');
  const fx = { ...FX_DEFAULTS, ...initial };
  const inputs = box.querySelectorAll('[data-fx]');
  function render() {
    inputs.forEach((el) => {
      const k = el.dataset.fx;
      if (el.type === 'checkbox') el.checked = !!fx[k];
      else { el.value = fx[k]; fillRange(el); }
      const out = box.querySelector(`[data-fxv="${k}"]`);
      if (out) out.textContent = fmtFx(k, fx[k]);
    });
    $(box, '[data-fxcount]').textContent = fxNames(fx);
  }
  inputs.forEach((el) => el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', () => {
    fx[el.dataset.fx] = el.type === 'checkbox' ? el.checked : Number(el.value);
    render(); onChange();
  }));
  box.querySelectorAll('[data-preset]').forEach((b) => b.addEventListener('click', () => {
    const p = b.dataset.preset;
    Object.assign(fx, FX_DEFAULTS, p === 'reset' ? {} : PRESETS[p].fx);
    box.querySelectorAll('[data-preset]').forEach((x) => x.classList.toggle('on', x === b && p !== 'reset'));
    render(); onChange();
    if (p !== 'reset') track('preset', { preset: p });
  }));
  // Light up the preset a page starts with (e.g. Chipmunk on the voice changer).
  const start = Object.keys(PRESETS).find((k) => JSON.stringify({ ...FX_DEFAULTS, ...PRESETS[k].fx }) === JSON.stringify(fx));
  if (start) box.querySelector(`[data-preset="${start}"]`)?.classList.add('on');
  render();
  return { get: () => ({ ...fx }) };
}

// ---------- per-tool settings ----------
const TOOLS = {
  'video-to-mp3': {
    formats: ['mp3', 'm4a', 'wav'], defaultFormat: 'mp3', suffix: '',
    drop: T('MP4, MOV, WebM, MKV, AVI, 3GP…'),
    note: T('Tip: drag on the waveform to keep only part of the audio. Open Effects to add fades.'),
  },
  ringtone: {
    formats: ['m4r', 'mp3'], defaultFormat: 'm4r', suffix: T(' (ringtone)'), maxLen: RINGTONE_MAX, go: T('Make ringtone'),
    fx: { fadeIn: 1, fadeOut: 2 }, defaultSel: (d) => [0, Math.min(29, d)],
    note: T('The first 29 seconds are selected, short enough to set straight from the iPhone Files app, with a short fade in and out (change them in Effects). Drag on the waveform to choose up to 40 seconds. M4R is for iPhone, MP3 for Android.'),
  },
  cutter: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: T(' (cut)'), modes: true, go: T('Cut and save'),
    note: T('The whole file is selected. Drag the handles to choose a part, then keep it or remove it.'),
  },
  converter: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: '',
    note: T('Converts the whole file. Drag on the waveform if you only want part of it.'),
  },
  'audio-to-video': {
    formats: ['mp4'], defaultFormat: 'mp4', suffix: T(' (video)'), video: true, maxLen: 60, defaultSel: (d) => [0, Math.min(30, d)],
    limitNote: T('Videos can be at most {0} seconds, so the selection was shortened.'),
    limitSpeed: T('With speed {0}× the video would be {1} s long, but the limit is {2} s. Select a shorter part or raise the speed.'),
    go: T('Make video'),
    note: T('The first 30 seconds are selected (up to 60). Add a title, pick a style or a cover image, then press Make video. The video is made on your device.'),
  },
  'voice-changer': {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: T(' (voice changer)'), fx: PRESETS.chipmunk.fx, fxOpen: true, presets: VOICE_PRESETS,
    go: T('Change voice'),
    note: T('Chipmunk is set. Pick another voice under Effects, press Preview, then save it. Works with recordings, voice notes and videos.'),
  },
  'slowed-reverb': {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: T(' (slowed + reverb)'), fx: PRESETS.slowed.fx, fxOpen: true,
    note: T('Slowed + reverb is already set up. Fine-tune it below, then press Preview.'),
  },
  '8d': {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: ' (8D)', fx: PRESETS.eightD.fx, fxOpen: true,
    note: T('Put on headphones and press Preview to hear the sound move around your head.'),
  },
  bass: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: T(' (bass boosted)'), fx: PRESETS.bass.fx, fxOpen: true,
    note: T('Use the Bass slider to choose how much boost you want.'),
  },
  volume: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: T(' (louder)'), fx: PRESETS.loud.fx, fxOpen: true,
    note: T('Auto loudness makes quiet audio as loud as streaming apps without distortion.'),
  },
  denoise: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: T(' (clean)'), fx: PRESETS.voice.fx, fxOpen: true,
    note: T('AI noise removal cleans up voices, evens out the volume and cuts long silences.'),
  },
  karaoke: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: ' (karaoke)', fx: PRESETS.karaoke.fx, fxOpen: true,
    drop: T('Stereo songs: MP3, M4A, WAV, FLAC, OGG…'),
    note: T('Works best on studio songs where the singer is in the center. Bass and drums get a little quieter too. Press Preview to check.'),
  },
  reverse: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: T(' (reversed)'), fx: { reverse: true }, fxOpen: true,
    drop: T('Any song, voice note or video, up to 20 minutes'),
    note: T('Press Preview to hear it backwards.'),
  },
};

// ---------- audio to video ----------
const VIDEO_W = 720, VIDEO_H = 1280, VIDEO_FPS = 25;
const VIDEO_STYLES = {
  purple: { label: T('Purple'), stops: ['#6d4aff', '#ff4f8b'] },
  night: { label: T('Night'), stops: ['#1a1433', '#07060d'], glow: '#7b5cff' },
  sunset: { label: T('Sunset'), stops: ['#ff7e5f', '#ffb347'] },
  ocean: { label: T('Ocean'), stops: ['#00c6ff', '#0052d4'] },
  mono: { label: T('Black'), stops: ['#111111', '#000000'] },
};
const loadImage = (file) => new Promise((resolve, reject) => {
  const url = URL.createObjectURL(file), img = new Image();
  img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
  img.onerror = () => { URL.revokeObjectURL(url); reject(new Error(T('That image could not be opened. Try a JPG or PNG.'))); };
  img.src = url;
});
// The still background of the video (title, cover, progress track, melocut.com). The moving sound wave
// and progress bar are drawn on top of it by ffmpeg (see videoArgs).
// The cover is decoded once and reused, so the live preview redraws instantly.
let coverCache = { file: null, img: null };
async function cachedImage(file) {
  if (coverCache.file !== file) coverCache = { file, img: await loadImage(file) };
  return coverCache.img;
}
async function drawVideoFrame({ title, style, cover }) {
  const s = VIDEO_STYLES[style] || VIDEO_STYLES.purple;
  const c = document.createElement('canvas'); c.width = VIDEO_W; c.height = VIDEO_H;
  const g = c.getContext('2d');
  try { await document.fonts.load('800 52px Inter'); } catch {}
  const grad = g.createLinearGradient(0, 0, VIDEO_W * 0.4, VIDEO_H);
  grad.addColorStop(0, s.stops[0]); grad.addColorStop(1, s.stops[1]);
  g.fillStyle = grad; g.fillRect(0, 0, VIDEO_W, VIDEO_H);
  const img = cover ? await cachedImage(cover) : null;
  const fit = (w, h, W, H) => { const k = Math.max(W / w, H / h); return [w * k, h * k]; };
  if (img) { // blurred, darkened full-bleed copy behind. Blur by shrinking and stretching back,
    // because ctx.filter is missing in Safari before 18.
    const [w, h] = fit(img.width, img.height, VIDEO_W, VIDEO_H);
    const TW = 9, TH = 16, t = document.createElement('canvas'); t.width = TW; t.height = TH;
    t.getContext('2d').drawImage(img, (TW - w * TW / VIDEO_W) / 2, (TH - h * TH / VIDEO_H) / 2, w * TW / VIDEO_W, h * TH / VIDEO_H);
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    g.drawImage(t, -40, -70, VIDEO_W + 80, VIDEO_H + 140); // a little oversized so the soft edges fall outside
    g.fillStyle = 'rgba(0,0,0,.45)'; g.fillRect(0, 0, VIDEO_W, VIDEO_H);
  } else if (s.glow) {
    const r = g.createRadialGradient(VIDEO_W / 2, 420, 10, VIDEO_W / 2, 420, 520);
    r.addColorStop(0, s.glow + 'aa'); r.addColorStop(1, s.glow + '00'); g.fillStyle = r; g.fillRect(0, 0, VIDEO_W, VIDEO_H);
  }
  // cover art (or a sound-wave emblem)
  const S = 420, X = (VIDEO_W - S) / 2, Y = 170;
  const round = (x, y, w, h, r) => { // like ctx.roundRect, which iOS 15 and older lack
    r = Math.min(r, w / 2, h / 2); g.beginPath(); g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  };
  g.save(); g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = 50; g.shadowOffsetY = 18;
  round(X, Y, S, S, 36); g.fillStyle = 'rgba(255,255,255,.14)'; g.fill(); g.restore();
  g.save(); round(X, Y, S, S, 36); g.clip();
  if (img) { const [w, h] = fit(img.width, img.height, S, S); g.drawImage(img, X + (S - w) / 2, Y + (S - h) / 2, w, h); }
  else {
    g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(X, Y, S, S);
    g.fillStyle = '#fff'; const bars = [0.35, 0.7, 1, 0.55, 0.85, 0.45, 0.25];
    bars.forEach((v, i) => { const bw = 26, gap = 18, tot = bars.length * bw + (bars.length - 1) * gap, h = v * 200;
      round(X + (S - tot) / 2 + i * (bw + gap), Y + S / 2 - h / 2, bw, h, 13); g.fill(); });
  }
  g.restore();
  // title, up to two lines
  g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.font = '800 52px Inter, system-ui, sans-serif';
  const words = (title || '').trim().split(/\s+/).filter(Boolean), lines = [];
  for (const w of words) { const l = lines.length ? `${lines[lines.length - 1]} ${w}` : w;
    if (lines.length && g.measureText(l).width <= 620) lines[lines.length - 1] = l; else lines.push(w); }
  lines.slice(0, 2).forEach((l, i, arr) => { let t = l; if (i === 1 && lines.length > 2) t = `${l}…`;
    while (g.measureText(t).width > 640 && t.length > 4) t = t.slice(0, -2) + '…'; g.fillText(t, VIDEO_W / 2, 690 + i * 62 - (arr.length - 1) * 31); });
  // progress track (the moving bar is added by ffmpeg) and the melocut.com mark
  g.fillStyle = 'rgba(255,255,255,.25)'; g.fillRect(0, 1088, VIDEO_W, 6);
  g.font = '700 26px Inter, system-ui, sans-serif'; const mark = 'melocut.com', mw = g.measureText(mark).width + 56;
  round((VIDEO_W - mw) / 2, 1170, mw, 52, 26); g.fillStyle = 'rgba(0,0,0,.28)'; g.fill();
  g.fillStyle = '#fff'; g.fillText(mark, VIDEO_W / 2, 1205);
  return c;
}
async function videoBackground(opts) {
  const c = await drawVideoFrame(opts);
  const blob = await new Promise((r) => c.toBlob(r, 'image/png'));
  return new Uint8Array(await blob.arrayBuffer());
}
// ffmpeg arguments for the video: the still background, a white sound wave and a progress bar over it.
function videoArgs(pre, inName, filters, len, outName) {
  const L = Math.max(0.5, len).toFixed(3);
  const graph = `[1:a]${filters.length ? filters.join(',') : 'anull'}[ax];[ax]asplit[a1][a2];`
    + `[a2]showwaves=s=600x260:mode=cline:rate=${VIDEO_FPS}:draw=full:scale=sqrt:colors=0xFFFFFF,format=rgba[w];`
    + `[0:v][w]overlay=60:790:shortest=1[v0];color=c=white:s=${VIDEO_W}x6:r=${VIDEO_FPS}:d=${L}[pb];`
    + `[v0][pb]overlay=x='-${VIDEO_W}+${VIDEO_W}*t/${L}':y=1088:shortest=1,format=yuv420p[v]`;
  return ['-loop', '1', '-framerate', String(VIDEO_FPS), '-t', L, '-i', 'bg.png', ...pre, '-i', inName,
    '-filter_complex', graph, '-map', '[v]', '-map', '[a1]', '-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '26',
    '-r', String(VIDEO_FPS), '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-ac', '2', '-movflags', '+faststart', '-t', L, outName];
}

function optionsHTML(cfg) {
  if (cfg.video) return `
    <div class="vid-fields">
      <label class="vid-title">${T('Title')} <input type="text" data-v="title" maxlength="60" placeholder="${T('Song name')}"></label>
      <label>${T('Style')} <select data-v="style">${Object.entries(VIDEO_STYLES).map(([k, s]) => `<option value="${k}">${s.label}</option>`).join('')}</select></label>
      <div class="vid-cover"><span>${T('Cover image (optional)')}</span><label class="btn ghost sm">${I.upload || ''}${T('Choose image')}<input type="file" class="sr" accept="image/*" data-v="cover"></label><small data-vcovername></small></div>
    </div>
    <figure class="vid-prev" data-vprev><div class="vid-frame"><canvas data-vthumb width="270" height="480" aria-hidden="true"></canvas><span class="vid-wave" aria-hidden="true"></span><video data-vplay controls playsinline preload="metadata" hidden></video></div><figcaption data-vcap>${T('Preview')}</figcaption></figure>
    <select data-o="format" hidden><option value="mp4">MP4</option></select><span data-q hidden><select data-o="quality"><option value="192" selected>192</option></select></span>`;
  const fmtOpts = cfg.formats.map((f) => `<option value="${f}">${FORMATS[f].label}</option>`).join('');
  return `
    <label>${T('Format')} <select data-o="format">${fmtOpts}</select></label>
    <label data-q>${T('Quality')} <select data-o="quality">
      <option value="128">128 kbps</option><option value="192">192 kbps</option>
      <option value="256">256 kbps</option><option value="320" selected>320 kbps</option></select></label>
    ${cfg.modes ? `<div class="seg" role="group" aria-label="${T('Cut mode')}">
      <button type="button" class="on" data-mode="keep">${T('Keep selection')}</button>
      <button type="button" data-mode="remove">${T('Remove selection')}</button></div>` : ''}`;
}

// ---------- the single-file tool widget ----------
// A small live preview of the video: the still frame while you pick a title, style and cover,
// then the finished MP4 itself. The frame is made by the same videoBackground() the video uses.
function mountVideoPreview(root) {
  const box = $(root, '[data-vprev]'), img = $(root, '[data-vthumb]'), vid = $(root, '[data-vplay]'), cap = $(root, '[data-vcap]');
  let timer = 0, seq = 0;
  const ctx = img.getContext('2d'), coverName = $(root, '[data-vcovername]');
  // A browser that can't play the MP4 keeps showing the still frame instead of an empty player.
  vid.addEventListener('error', () => { if (vid.getAttribute('src')) { vid.hidden = true; img.hidden = false; } });
  const opts = () => ({ title: $(root, '[data-v=title]').value, style: $(root, '[data-v=style]').value, cover: $(root, '[data-v=cover]').files[0] || null });
  const draw = async () => {
    const n = ++seq;
    try {
      const c = await drawVideoFrame(opts());
      if (n !== seq) return;
      ctx.drawImage(c, 0, 0, img.width, img.height);
    } catch {}
  };
  return {
    refresh(delay = 60) { clearTimeout(timer); timer = setTimeout(draw, delay); const f = $(root, '[data-v=cover]').files[0]; coverName.textContent = f ? f.name : ''; },
    showFrame() { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.hidden = true; img.hidden = false; box.classList.remove('done'); cap.textContent = T('Preview'); },
    showVideo(src) { vid.src = src; vid.hidden = false; img.hidden = true; box.classList.add('done'); cap.textContent = T('Your video'); },
  };
}
// ---------- several files at once (plain converter pages) ----------
// A tiny ZIP writer (stored, no compression: audio is already compressed), so "Download all" is one file.
const CRC_TABLE = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = (u8) => { let c = 0xffffffff; for (let i = 0; i < u8.length; i++) c = CRC_TABLE[(c ^ u8[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function makeZip(files) { // files: [{ name, data: Uint8Array }]
  const enc = new TextEncoder(), parts = [], central = []; let offset = 0;
  for (const f of files) {
    const name = enc.encode(f.name), crc = crc32(f.data), size = f.data.length;
    const h = new DataView(new ArrayBuffer(30));
    [[0, 0x04034b50, 4], [4, 20, 2], [6, 0x0800, 2], [8, 0, 2], [10, 0, 2], [12, 0x21, 2], [14, crc, 4], [18, size, 4], [22, size, 4], [26, name.length, 2], [28, 0, 2]]
      .forEach(([o, v, n]) => (n === 4 ? h.setUint32(o, v, true) : h.setUint16(o, v, true)));
    parts.push(new Uint8Array(h.buffer), name, f.data);
    const c = new DataView(new ArrayBuffer(46));
    [[0, 0x02014b50, 4], [4, 20, 2], [6, 20, 2], [8, 0x0800, 2], [10, 0, 2], [12, 0, 2], [14, 0x21, 2], [16, crc, 4], [20, size, 4], [24, size, 4], [28, name.length, 2], [30, 0, 2], [32, 0, 2], [34, 0, 2], [36, 0, 2], [38, 0, 4], [42, offset, 4]]
      .forEach(([o, v, n]) => (n === 4 ? c.setUint32(o, v, true) : c.setUint16(o, v, true)));
    central.push(new Uint8Array(c.buffer), name);
    offset += 30 + name.length + size;
  }
  const cdSize = central.reduce((s, p) => s + p.length, 0), e = new DataView(new ArrayBuffer(22));
  [[0, 0x06054b50, 4], [4, 0, 2], [6, 0, 2], [8, files.length, 2], [10, files.length, 2], [12, cdSize, 4], [16, offset, 4], [20, 0, 2]]
    .forEach(([o, v, n]) => (n === 4 ? e.setUint32(o, v, true) : e.setUint16(o, v, true)));
  return new Blob([...parts, ...central, new Uint8Array(e.buffer)], { type: 'application/zip' });
}
const BATCH_MAX = 50;
const BATCH_HTML = () => `<div class="batch" data-batch hidden>
    <div class="batch-head"><b data-bcount></b><button class="btn ghost sm" type="button" data-bnew>${T('Choose other files')}</button></div>
    <div class="opts"><label>${T('Format')} <select data-bfmt>${ALL_FORMATS.map((f) => `<option value="${f}">${FORMATS[f].label}</option>`).join('')}</select></label>
    <label data-bqwrap>${T('Quality')} <select data-bq>${[128, 192, 256, 320].map((q) => `<option value="${q}"${q === 192 ? ' selected' : ''}>${q} kbps</option>`).join('')}</select></label></div>
    <ol class="batch-list" data-blist></ol>
    <div class="batch-actions"><button class="btn" type="button" data-bgo>${T('Convert all')}</button><button class="btn ok" type="button" data-bzip hidden>${I.download || ''}${T('Download all (ZIP)')}</button></div>
    <p class="batch-err" data-berr role="alert"></p>
  </div>`;
function mountBatch(root, onDone) {
  const box = $(root, '[data-batch]'), list = $(root, '[data-blist]'), fmtSel = $(root, '[data-bfmt]'), qSel = $(root, '[data-bq]'),
    go = $(root, '[data-bgo]'), zipBtn = $(root, '[data-bzip]'), err = $(root, '[data-berr]'), count = $(root, '[data-bcount]');
  let items = [], busy = false;
  if (FORMATS[root.dataset.format] && ALL_FORMATS.includes(root.dataset.format)) fmtSel.value = root.dataset.format;
  const syncQ = () => { $(root, '[data-bqwrap]').hidden = !LOSSY.includes(fmtSel.value); };
  syncQ(); fmtSel.onchange = () => { syncQ(); reset(); };
  qSel.onchange = () => reset();
  const kb = (n) => (n / 1048576).toFixed(2) + ' MB';
  function render() {
    list.innerHTML = items.map((it, i) => `<li><span class="bn">${esc(it.file.name)}</span><span class="bs">${it.state === 'done' ? `${kb(it.out.size)} · <a href="#" data-bdl="${i}">${T('Download')}</a>` : it.state === 'work' ? T('Converting…') : it.state === 'fail' ? T('Failed') : T('Waiting')}</span></li>`).join('');
    list.querySelectorAll('[data-bdl]').forEach((a) => (a.onclick = (e) => { e.preventDefault(); const it = items[a.dataset.bdl]; downloadURL(URL.createObjectURL(it.out), it.outName); track('download', { tool: 'batch', format: fmtSel.value }); }));
  }
  function reset() { if (busy) return; items.forEach((it) => { it.state = 'wait'; it.out = null; }); zipBtn.hidden = true; go.hidden = false; render(); }
  async function run() {
    busy = true; go.disabled = true; err.textContent = ''; root.classList.add('locked');
    const fmtKey = fmtSel.value, q = qSel.value;
    for (const it of items) {
      it.state = 'work'; render();
      try {
        it.out = await exclusive(async () => {
          const ff = await loadEngine(), inName = `in.${extOf(it.file.name)}`, outName = `out.${fmtKey}`;
          try {
            await ff.writeFile(inName, new Uint8Array(await it.file.arrayBuffer()));
            await runFFmpeg(ff, ['-i', inName, '-vn', '-map_metadata', '0', ...FORMATS[fmtKey].args(q), outName], 1);
            const data = await ff.readFile(outName);
            return new Blob([data.buffer], { type: FORMATS[fmtKey].mime });
          } finally { await ff.deleteFile(inName).catch(() => {}); await ff.deleteFile(outName).catch(() => {}); }
        });
        it.outName = `${baseName(it.file.name)}.${fmtKey}`; it.state = 'done';
      } catch { it.state = 'fail'; }
      render();
    }
    const ok = items.filter((it) => it.state === 'done');
    busy = false; go.disabled = false; root.classList.remove('locked');
    track('converted', { tool: 'batch', format: fmtKey, files: String(items.length) });
    if (ok.length) { go.hidden = true; zipBtn.hidden = false; }
    if (ok.length < items.length) err.textContent = T('Some files could not be converted. They may be damaged or not audio.');
  }
  go.onclick = run;
  zipBtn.onclick = async () => {
    const used = new Set(), files = [];
    for (const it of items.filter((x) => x.state === 'done')) {
      let n = it.outName, k = 2; while (used.has(n)) n = `${baseName(it.outName)} (${k++}).${extOf(it.outName)}`; used.add(n);
      files.push({ name: n, data: new Uint8Array(await it.out.arrayBuffer()) });
    }
    downloadURL(URL.createObjectURL(makeZip(files)), 'MeloCut.zip');
    track('download', { tool: 'batch', format: fmtSel.value, zip: 'yes' });
  };
  $(root, '[data-bnew]').onclick = () => onDone();
  return {
    open(files) {
      items = files.slice(0, BATCH_MAX).filter((f) => f.size <= MAX_BYTES).map((file) => ({ file, state: 'wait', out: null }));
      count.textContent = T('{0} files', items.length);
      err.textContent = files.length > BATCH_MAX ? T('Up to {0} files at a time. The first {0} were added.', BATCH_MAX) : '';
      zipBtn.hidden = true; go.hidden = false; box.hidden = false; render();
    },
    close() { box.hidden = true; items = []; },
  };
}
// Record straight from the microphone. The recording stays on the device and opens like any chosen file.
function mountRecorder(root, onFile) {
  const box = $(root, '[data-rec]'), btn = $(root, '[data-recbtn]'), label = $(root, '[data-reclabel]');
  if (!box || !navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) return { hide() {}, show() {} };
  box.hidden = false;
  const MAX = 10 * 60; // seconds
  let rec = null, stream = null, chunks = [], t0 = 0, tick = 0;
  const mime = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus', ''].find((m) => !m || MediaRecorder.isTypeSupported(m));
  const stopAll = () => { clearInterval(tick); stream?.getTracks().forEach((t) => t.stop()); stream = null; box.classList.remove('on'); label.textContent = T('Record with the microphone'); };
  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (rec && rec.state === 'recording') { rec.stop(); return; }
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: true } }); }
    catch { label.textContent = T('Microphone blocked. Allow it in your browser settings and try again.'); return; }
    chunks = []; rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    rec.ondataavailable = (ev) => ev.data.size && chunks.push(ev.data);
    rec.onstop = () => {
      const type = rec.mimeType || mime || 'audio/webm', ext = /mp4/.test(type) ? 'm4a' : /ogg/.test(type) ? 'ogg' : 'webm';
      stopAll();
      const blob = new Blob(chunks, { type });
      if (blob.size) { track('record', { tool: root.dataset.tool, secs: Math.round((Date.now() - t0) / 1000) }); onFile(new File([blob], `${T('recording')}.${ext}`, { type })); }
    };
    rec.start(250); t0 = Date.now(); box.classList.add('on');
    const show = () => { const s = Math.floor((Date.now() - t0) / 1000); label.textContent = `${T('Stop')} · ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; if (s >= MAX) rec.stop(); };
    show(); tick = setInterval(show, 500);
  });
  return { hide() { box.hidden = true; }, show() { box.hidden = false; } };
}
function mountTool(root) {
  let cfg = TOOLS[root.dataset.tool];
  if (!cfg) return;
  // A landing page can preset effects, the hint and the file name suffix on a shared tool.
  if (root.dataset.fx) cfg = { ...cfg, fx: JSON.parse(root.dataset.fx), fxOpen: true };
  if (root.dataset.note) cfg = { ...cfg, note: root.dataset.note };
  if (root.dataset.suffix) cfg = { ...cfg, suffix: root.dataset.suffix };
  // The main button says what the tool does ("Cut and save"); effect pages built on a tool keep "Convert".
  const goLabel = (!root.dataset.fx && cfg.go) || T('Convert');
  // Plain converter pages also take several files at once (no effects or trimming in that mode).
  const batchOK = root.dataset.tool === 'converter' && !root.dataset.fx;

  root.innerHTML = `${INAPP_HTML()}
    <input type="file" class="sr" accept="${ACCEPT}" data-file aria-label="${T('Choose an audio or video file')}" tabindex="-1"${batchOK ? ' multiple' : ''}>
    <div class="drop" data-drop tabindex="0" role="button">
      <div class="ico">${UPLOAD_ICON}</div>
      <strong>${batchOK ? T('Choose files or drop them here') : T('Choose a file or drop it here')}</strong>
      <span>${cfg.drop || T('MP3, M4A, WAV, OGG, OPUS, FLAC or a video…')}</span>
    </div>
    <div class="rec" data-rec hidden><span>${T('or')}</span><button class="btn ghost sm" type="button" data-recbtn><span class="rec-dot"></span><span data-reclabel>${T('Record with the microphone')}</span></button></div>
    ${batchOK ? BATCH_HTML() : ''}
    <div class="editor" data-editor>
      <div class="filebar">
        <div style="min-width:0;flex:1"><b data-name></b><small data-meta></small></div>
        <button class="btn ghost sm" type="button" data-new>${T('Choose another file')}</button>
      </div>
      <div class="wave" data-wave><canvas></canvas><div class="busy" data-busy>${T('Reading audio…')}</div></div>
      <div class="lane"><div class="lane-head"><b>${T('With effects')}</b><small data-afterlabel></small></div><canvas data-after></canvas></div>
      <div class="lane eq-lane" data-eqlane><div class="lane-head"><b>${T('Equalizer')}</b><small data-eqlabel>${T('Press Play or Preview to see it move')}</small></div><canvas data-eq></canvas></div>
      <div class="controls">
        <button class="btn ghost sm" type="button" data-play aria-label="${T('Play the original selection')}">${label('play', T('Play original'))}</button>
        <button class="btn ghost sm fx-play" type="button" data-fxplay>${label('phones', T('Play with effects'))}</button>
        <label class="time">${T('Start')} <input data-start inputmode="decimal" aria-label="${T('Start time')}"></label>
        <label class="time">${T('End')} <input data-end inputmode="decimal" aria-label="${T('End time')}"></label>
        <span class="sel-len" data-len></span>
      </div>
      <div class="opts${cfg.video ? ' vid-opts' : ''}">${optionsHTML(cfg)}</div>
      ${fxHTML(cfg.fxOpen, cfg.presets)}
      <div class="note tip" data-hint>${cfg.note}</div>
      <div class="go">
        <button class="btn" type="button" data-go>${goLabel}</button>
        <button class="btn ghost" type="button" data-cancel hidden>${T('Cancel')}</button>
        <div class="progress" data-progress><div class="bar"><i data-fill></i></div><small data-stage role="status" aria-live="polite"></small></div>
        <small class="go-note" data-gonote${engineReady ? ' hidden' : ''}>${T('The first time, the audio engine downloads once (~30 MB).')}</small>
      </div>
      ${SHARE_HTML()}
      <div class="note" data-err role="alert"></div>
    </div>
    <div class="private">${I.lock}${T('Your file never leaves your device. Nothing is uploaded.')}</div>`;

  const els = {
    file: $(root, '[data-file]'), drop: $(root, '[data-drop]'), editor: $(root, '[data-editor]'),
    name: $(root, '[data-name]'), meta: $(root, '[data-meta]'), wave: $(root, '[data-wave]'),
    canvas: $(root, 'canvas'), busy: $(root, '[data-busy]'), play: $(root, '[data-play]'),
    start: $(root, '[data-start]'), end: $(root, '[data-end]'), len: $(root, '[data-len]'),
    go: $(root, '[data-go]'), progress: $(root, '[data-progress]'), fill: $(root, '[data-fill]'),
    stage: $(root, '[data-stage]'), err: $(root, '[data-err]'), hint: $(root, '[data-hint]'), cancel: $(root, '[data-cancel]'), goNote: $(root, '[data-gonote]'),
    format: $(root, '[data-o=format]'), quality: $(root, '[data-o=quality]'), qWrap: $(root, '[data-q]'),
    fxPreview: $(root, '[data-fxpreview]'), fxStatus: $(root, '[data-fxstatus]'),
    eqLane: $(root, '[data-eqlane]'), fxPlay: $(root, '[data-fxplay]'), after: $(root, '[data-after]'), afterLabel: $(root, '[data-afterlabel]'), eq: $(root, '[data-eq]'), eqLabel: $(root, '[data-eqlabel]'),
  };
  const st = { file: null, duration: 0, buffer: null, peaks: null, sel: [0, 0], mode: 'keep',
    ctx: null, source: null, playStart: 0, playFrom: 0, raf: 0, outURL: null, busy: false };
  const share = mountShare(root);
  const vprev = cfg.video ? mountVideoPreview(root) : null;
  wireInApp(root);
  const fx = mountFx(root, cfg.fx, () => { st.exact = null; stopPlay(); resetOutput(); drawAfter(); syncFx(); });
  // The extra "Play with effects" button only shows when some effect is on.
  function syncFx() { root.classList.toggle('has-fx', !isDefaultFx(fx.get())); }
  syncFx();
  els.fxPlay.addEventListener('click', () => els.fxPreview.click());

  // ----- file selection -----
  els.drop.addEventListener('click', () => els.file.click());
  els.drop.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), els.file.click()));
  $(root, '[data-new]').addEventListener('click', () => els.file.click());
  const batch = batchOK ? mountBatch(root, () => { batch.close(); els.drop.style.display = ''; recorder.show(); els.file.value = ''; els.file.click(); }) : null;
  const pick = (files) => {
    if (!files.length) return;
    if (batch && files.length > 1) { els.drop.style.display = 'none'; recorder.hide(); els.editor.style.display = 'none'; batch.open(files); return; }
    batch?.close(); openFile(files[0]);
  };
  els.file.addEventListener('change', () => pick([...els.file.files]));
  const recorder = mountRecorder(root, (f) => openFile(f));
  // Arrived from another tool's "next" button: open the file it handed over.
  if (location.hash === '#handoff') {
    history.replaceState(null, '', location.pathname + location.search);
    takeHandoff().then((f) => { if (f) { openFile(f); track('handoff', { tool: root.dataset.tool }); } });
  }
  ['dragenter', 'dragover'].forEach((t) => els.drop.addEventListener(t, (e) => { e.preventDefault(); els.drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((t) => els.drop.addEventListener(t, (e) => { e.preventDefault(); els.drop.classList.remove('over'); }));
  els.drop.addEventListener('drop', (e) => pick([...e.dataTransfer.files]));
  // Space toggles playback (when not typing in a field).
  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' || !st.buffer || /^(INPUT|SELECT|TEXTAREA|BUTTON|SUMMARY|A)$/.test(document.activeElement?.tagName)) return;
    e.preventDefault(); els.play.click();
  });

  function error(msg) { els.err.textContent = msg || ''; els.err.className = msg ? 'note err' : 'note'; }
  // The hint starts as a quiet tip; it is highlighted only when it tells the visitor something new.
  function notice(msg) { els.hint.textContent = msg; els.hint.className = 'note info'; }

  async function openFile(file) {
    if (st.busy) return error(T('Please wait until the current conversion or preview has finished.'));
    error('');
    if (file.size > MAX_BYTES) return showDropError(T('That file is over 1 GB. Please choose a smaller file.'));
    stopPlay();
    resetOutput();
    const token = (st.openToken = (st.openToken || 0) + 1); // a newer open wins over a slower older one
    st.file = file; st.buffer = null; st.peaks = null; st.duration = 0; st.exact = null;
    els.drop.style.display = 'none';
    recorder.hide();
    els.editor.style.display = 'block';
    els.name.textContent = file.name;
    if (cfg.video) { $(root, '[data-v=title]').value = baseName(file.name).replace(/[_-]+/g, ' ').slice(0, 60); vprev.refresh(0); }
    els.meta.textContent = `${(file.size / 1048576).toFixed(1)} MB`;
    els.busy.style.display = 'grid';
    els.busy.textContent = T('Reading audio…');
    els.format.value = cfg.formats.includes(root.dataset.format) ? root.dataset.format : cfg.defaultFormat;
    if (file.size > BIG_ON_PHONE && matchMedia('(pointer: coarse)').matches)
      notice(T('This is a big file ({0} MB). Phones can run out of memory with files this size; if the page stops or reloads, try a shorter file or a computer.', Math.round(file.size / 1048576)));
    syncQuality();
    track('file_opened', { tool: root.dataset.tool, type: extOf(file.name) });
    let buffer;
    try {
      buffer = await decode(file);
    } catch (e) {
      // A long video can need more memory than a phone has once its audio is unpacked.
      const oom = /memory|allocat|RangeError/i.test(`${e?.name} ${e?.message}`);
      if (token === st.openToken) els.busy.textContent = oom
        ? T('Your device ran out of memory opening this file. Try a shorter file, or use a computer for long videos.')
        : T('Could not read this file. Is it an audio or video file?');
      track('unreadable', { tool: root.dataset.tool, type: extOf(file.name) });
      return;
    }
    if (token !== st.openToken) return;
    if (!buffer?.duration) { els.busy.textContent = T('This file has no audio.'); return; }
    st.buffer = buffer;
    st.duration = buffer.duration;
    st.mono = isMono(buffer);
    els.meta.textContent = `${fmt(st.duration)} · ${(file.size / 1048576).toFixed(1)} MB`;
    st.peaks = null;
    els.busy.style.display = 'none';
    setSel(...(cfg.defaultSel ? cfg.defaultSel(st.duration) : [0, st.duration]));
    const pre = preloadEngine((p) => { if (!st.busy) els.goNote.textContent = T('Getting the audio engine ready (one time, ~30 MB)… {0}%', Math.round(p * 100)); });
    pre?.then(() => { if (engineReady) els.goNote.hidden = true; else els.goNote.textContent = T('The first time, the audio engine downloads once (~30 MB).'); });
  }

  function showDropError(msg) {
    els.drop.querySelector('span').textContent = msg;
    els.drop.querySelector('span').style.color = 'var(--warn)';
  }

  async function decode(file) {
    st.ctx ||= new (window.AudioContext || window.webkitAudioContext)();
    const data = await file.arrayBuffer();
    try {
      return await decodeAudio(st.ctx, data.slice(0));
    } catch {
      // Browser can't decode this container/codec natively: let ffmpeg extract the audio first.
      els.busy.textContent = T('Preparing audio engine…');
      const wav = await exclusive(async () => {
        const ff = await loadEngine((p) => (els.busy.textContent = T('Loading audio engine… {0}%', Math.round(p * 100))));
        const inName = `in.${extOf(file.name)}`;
        try {
          await ff.writeFile(inName, new Uint8Array(data));
          els.busy.textContent = T('Reading audio…');
          const code = await ff.exec(['-i', inName, '-vn', '-ac', '2', '-ar', '44100', '-c:a', 'pcm_s16le', 'preview.wav']);
          if (code !== 0) throw new Error('decode failed');
          return await ff.readFile('preview.wav');
        } finally {
          await ff.deleteFile('preview.wav').catch(() => {});
          await ff.deleteFile(inName).catch(() => {});
        }
      });
      return await decodeAudio(st.ctx, wav.buffer);
    }
  }
  // True when both channels are (nearly) identical, i.e. there is no stereo image.
  function isMono(buf) {
    if (buf.numberOfChannels < 2) return true;
    const l = buf.getChannelData(0), r = buf.getChannelData(1);
    const step = Math.max(1, Math.floor(l.length / 20000));
    let diff = 0, sum = 0;
    for (let i = 0; i < l.length; i += step) { diff += Math.abs(l[i] - r[i]); sum += Math.abs(l[i]) + Math.abs(r[i]); }
    return sum === 0 || diff / sum < 0.01;
  }

  // ----- selection -----
  function setSel(a, b, fromInput) {
    const d = st.duration;
    a = Math.max(0, Math.min(a, d)); b = Math.max(0, Math.min(b, d));
    if (b < a) [a, b] = [b, a];
    if (b - a < 0.1) b = Math.min(d, a + 0.1);
    if (cfg.maxLen && b - a > cfg.maxLen) {
      b = a + cfg.maxLen;
      notice((cfg.limitNote || T('Ringtones can be at most {0} seconds, so the selection was shortened.')).replace('{0}', cfg.maxLen));
    }
    st.sel = [a, b];
    if (!fromInput) { els.start.value = fmt(a); els.end.value = fmt(b); }
    const full = a <= 0.05 && b >= d - 0.05;
    els.len.textContent = full ? T('Whole file · {0}', fmt(d)) : T('Selected {0}', fmt(b - a));
    st.exact = null;
    draw();
    drawAfter();
    resetOutput();
  }
  [els.start, els.end].forEach((inp) => inp.addEventListener('change', () => {
    const a = parseTime(els.start.value), b = parseTime(els.end.value);
    if (Number.isNaN(a) || Number.isNaN(b)) return setSel(...st.sel);
    setSel(a, b);
  }));

  // ----- waveform -----
  function computePeaks(width) {
    const ch = st.buffer.getChannelData(0);
    const ch2 = st.buffer.numberOfChannels > 1 ? st.buffer.getChannelData(1) : null;
    const step = Math.max(1, Math.floor(ch.length / width));
    const peaks = new Float32Array(width);
    let max = 0.01;
    for (let i = 0; i < width; i++) {
      let p = 0;
      const startIdx = i * step;
      for (let j = 0; j < step; j += 4) {
        const v = Math.abs(ch[startIdx + j] || 0) + (ch2 ? Math.abs(ch2[startIdx + j] || 0) : 0);
        if (v > p) p = v;
      }
      peaks[i] = p;
      if (p > max) max = p;
    }
    for (let i = 0; i < width; i++) peaks[i] /= max;
    return peaks;
  }

  function draw(playhead) {
    if (!st.buffer) return;
    const dpr = window.devicePixelRatio || 1;
    const w = els.canvas.clientWidth, h = els.canvas.clientHeight;
    if (els.canvas.width !== Math.round(w * dpr)) { els.canvas.width = Math.round(w * dpr); els.canvas.height = Math.round(h * dpr); st.peaks = null; }
    const bars = Math.floor(w / 3);
    if (!st.peaks || st.peaks.length !== bars) st.peaks = computePeaks(bars);
    const g = els.canvas.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);
    const css = getComputedStyle(document.documentElement);
    const brand = css.getPropertyValue('--brand').trim(), brand2 = css.getPropertyValue('--brand-2').trim();
    const muted = css.getPropertyValue('--line').trim();
    const [a, b] = st.sel, d = st.duration;
    const xa = (a / d) * w, xb = (b / d) * w;
    const removing = cfg.modes && st.mode === 'remove';
    g.fillStyle = removing ? 'rgba(255,79,139,.10)' : 'rgba(109,74,255,.10)';
    g.fillRect(xa, 0, xb - xa, h);
    const grad = g.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, brand); grad.addColorStop(1, brand2);
    for (let i = 0; i < bars; i++) {
      const x = i * 3, bh = Math.max(2, st.peaks[i] * (h - 16));
      const inside = x >= xa && x <= xb;
      g.fillStyle = (removing ? !inside : inside) ? grad : muted;
      g.fillRect(x, (h - bh) / 2, 2, bh);
    }
    g.fillStyle = brand;
    [xa, xb].forEach((x) => { g.fillRect(x - 1.5, 0, 3, h); if (g.roundRect) { g.beginPath(); g.roundRect(x - 7, h / 2 - 14, 14, 28, 5); g.fill(); } else g.fillRect(x - 7, h / 2 - 14, 14, 28); });
    if (playhead != null) { g.fillStyle = brand2; g.fillRect((playhead / d) * w - 1, 0, 2, h); }
  }
  new ResizeObserver(() => { draw(); drawAfter(); drawEq(); }).observe(els.wave);

  // ----- "With effects" lane: instant estimate, exact after a preview -----
  function fitCanvas(c) {
    const dpr = window.devicePixelRatio || 1;
    const w = c.clientWidth, h = c.clientHeight;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
    const g = c.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);
    return { g, w, h };
  }
  // Loudest sample (0..1) of a buffer between two times, sampled sparsely for speed.
  function peakBetween(buf, t0, t1) {
    const sr = buf.sampleRate, i0 = Math.max(0, Math.floor(t0 * sr)), i1 = Math.min(buf.length, Math.ceil(t1 * sr));
    const step = Math.max(1, Math.floor((i1 - i0) / 64));
    let p = 0;
    for (let c = 0; c < buf.numberOfChannels; c++) {
      const ch = buf.getChannelData(c);
      for (let i = i0; i < i1; i += step) { const v = Math.abs(ch[i]); if (v > p) p = v; }
    }
    return Math.min(1, p);
  }
  // Selection as source segments, in output order (remove mode keeps the outside parts).
  function segments() {
    const [a, b] = st.sel;
    return cfg.modes && st.mode === 'remove' ? [[0, a], [b, st.duration]].filter(([x, y]) => y - x > 0.01) : [[a, b]];
  }
  function sourceTime(segs, t) {
    for (const [x, y] of segs) { if (t <= y - x) return x + t; t -= y - x; }
    const last = segs[segs.length - 1]; return last[1];
  }
  function drawAfter() {
    if (!st.buffer) return;
    const { g, w, h } = fitCanvas(els.after);
    const css = getComputedStyle(document.documentElement);
    const brand = css.getPropertyValue('--brand').trim(), brand2 = css.getPropertyValue('--brand-2').trim(), line = css.getPropertyValue('--line').trim();
    const fxv = fx.get(), segs = segments();
    const len = segs.reduce((s2, [x, y]) => s2 + y - x, 0);
    let procLen, procPeak, ghostLen = len, label, capped = false;
    if (st.exact) {
      procLen = st.exact.duration;
      ghostLen = Math.min(len, procLen * fxv.speed);
      procPeak = (t0, t1) => peakBetween(st.exact, t0, t1);
      label = T('Exact sound of your preview (first {0})', fmt(procLen));
    } else {
      procLen = len / fxv.speed;
      // Instant estimate of what the effects do to the level over time.
      let gain = fxv.volume / 100;
      if (fxv.normalize) {
        let mx = 0.01; for (let i = 0; i < 200; i++) mx = Math.max(mx, peakBetween(st.buffer, ...(() => { const t = sourceTime(segs, (i / 200) * len); return [t, t + len / 200]; })()));
        gain = 0.9 / mx;
      }
      if (fxv.bass > 0) gain *= 1 + fxv.bass * 0.03;
      if (fxv.karaoke) gain *= 0.6;
      const limit = fxv.volume > 100 || fxv.bass > 0 || fxv.reverb > 0 || fxv.normalize;
      const fades = fadeLens(fxv, procLen);
      procPeak = (t0, t1) => {
        const tm = (t0 + t1) / 2;
        let tSrc = tm * fxv.speed;
        if (fxv.reverse) tSrc = len - tSrc;
        const s0 = sourceTime(segs, Math.max(0, tSrc - (t1 - t0) * fxv.speed / 2));
        let v = peakBetween(st.buffer, s0, s0 + (t1 - t0) * fxv.speed) * gain;
        if (fades.fi > 0) v *= Math.min(1, tm / fades.fi);
        if (fades.fo > 0) v *= Math.min(1, (procLen - tm) / fades.fo);
        if (limit && v > 0.97) { capped = true; v = 0.97; }
        return Math.max(0, Math.min(1, v));
      };
      label = T('Estimate · {0} long', fmt(procLen)) + (Math.abs(procLen - len) > 0.05 ? T(' (was {0})', fmt(len)) : '')
        + (fades.shortened ? T(' · fades shortened to {0}s and {1}s to fit', fades.fi.toFixed(1), fades.fo.toFixed(1)) : '');
    }
    const scale = Math.max(ghostLen, procLen);
    const mid = h / 2;
    const bar = (x, v, style) => { const bh = Math.max(1, v * (h - 6)); g.fillStyle = style; g.fillRect(x, mid - bh / 2, 2, bh); };
    // coloured bars = with effects; outline = original. Same loudness scale, so louder looks taller.
    const ghostBars = Math.floor((w * ghostLen / scale) / 3);
    const ghost = [];
    for (let i = 0; i < ghostBars; i++) {
      const t = (i / ghostBars) * ghostLen, dt = ghostLen / ghostBars, s0 = sourceTime(segs, t);
      ghost.push(peakBetween(st.buffer, s0, s0 + dt));
    }
    const grad = g.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, brand); grad.addColorStop(1, brand2);
    const procBars = Math.floor((w * procLen / scale) / 3);
    for (let i = 0; i < procBars; i++) {
      const t0 = (i / procBars) * procLen, t1 = ((i + 1) / procBars) * procLen;
      const v = procPeak(t0, t1);
      g.globalAlpha = 0.85; bar(i * 3, v, v >= 0.96 ? brand2 : grad); g.globalAlpha = 1;
    }
    const muted = css.getPropertyValue('--muted').trim();
    g.strokeStyle = muted; g.lineWidth = 1.3; g.setLineDash([3, 2]);
    for (const sign of [-1, 1]) {
      g.beginPath();
      ghost.forEach((v, i) => { const y = mid + sign * Math.max(0.5, v * (h - 6)) / 2; i ? g.lineTo(i * 3 + 1, y) : g.moveTo(1, y); });
      g.stroke();
    }
    g.setLineDash([]);
    els.afterLabel.textContent = label + (capped ? T(' · limiter keeps it clean') : '') + T(' · dotted line = original');
  }

  // ----- live equalizer (spectrum) -----
  function drawEq() {
    const { g, w, h } = fitCanvas(els.eq);
    const css = getComputedStyle(document.documentElement);
    const brand = css.getPropertyValue('--brand').trim(), brand2 = css.getPropertyValue('--brand-2').trim(), line = css.getPropertyValue('--line').trim();
    const n = Math.max(16, Math.floor(w / 7));
    const an = st.source && st.analyser;
    let data;
    if (an) { data = new Uint8Array(an.frequencyBinCount); an.getByteFrequencyData(data); }
    const grad = g.createLinearGradient(0, h, 0, 0);
    grad.addColorStop(0, brand); grad.addColorStop(1, brand2);
    const nyq = (st.ctx?.sampleRate || 48000) / 2;
    for (let i = 0; i < n; i++) {
      let v = 0;
      if (data) {
        // log-spaced bands from 30 Hz to 16 kHz
        const f0 = 30 * Math.pow(16000 / 30, i / n), f1 = 30 * Math.pow(16000 / 30, (i + 1) / n);
        const b0 = Math.floor((f0 / nyq) * data.length), b1 = Math.max(b0 + 1, Math.ceil((f1 / nyq) * data.length));
        for (let k = b0; k < b1 && k < data.length; k++) v = Math.max(v, data[k]);
        v /= 255;
      }
      const bh = Math.max(2, v * (h - 4));
      g.fillStyle = data ? grad : line;
      g.fillRect(i * (w / n) + 1, h - bh, Math.max(2, w / n - 3), bh);
    }
  }

  let drag = null;
  els.wave.addEventListener('pointerdown', (e) => {
    if (!st.buffer) return;
    const r = els.wave.getBoundingClientRect();
    const t = ((e.clientX - r.left) / r.width) * st.duration;
    const px = (sec) => (sec / st.duration) * r.width;
    const x = e.clientX - r.left;
    if (Math.abs(x - px(st.sel[0])) < 14) drag = { edge: 0 };
    else if (Math.abs(x - px(st.sel[1])) < 14) drag = { edge: 1 };
    else drag = { anchor: t };
    els.wave.setPointerCapture(e.pointerId);
    stopPlay();
  });
  els.wave.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const r = els.wave.getBoundingClientRect();
    const t = Math.max(0, Math.min(st.duration, ((e.clientX - r.left) / r.width) * st.duration));
    if (drag.edge === 0) setSel(t, st.sel[1]);
    else if (drag.edge === 1) setSel(st.sel[0], t);
    else if (Math.abs(t - drag.anchor) > st.duration / 400) setSel(Math.min(drag.anchor, t), Math.max(drag.anchor, t));
  });
  els.wave.addEventListener('pointerup', () => (drag = null));

  // ----- playback (original audio, instant) -----
  function stopPlay() {
    if (st.source) { try { st.source.stop(); } catch {} st.source = null; }
    cancelAnimationFrame(st.raf);
    els.play.innerHTML = label('play', T('Play original'));
    els.fxPreview.innerHTML = label('phones', T('Preview with effects'));
    els.fxPlay.innerHTML = label('phones', T('Play with effects'));
    els.eqLabel.textContent = T('Press Play or Preview to see it move');
    draw();
    drawEq();
  }
  function playBuffer(buffer, offset, duration, onTick, label) {
    const src = st.ctx.createBufferSource();
    src.buffer = buffer;
    st.analyser ||= Object.assign(st.ctx.createAnalyser(), { fftSize: 4096, smoothingTimeConstant: 0.78 });
    src.connect(st.analyser);
    st.analyser.connect(st.ctx.destination);
    src.start(0, offset, duration);
    st.source = src; st.playStart = st.ctx.currentTime;
    els.eqLabel.textContent = label;
    els.eqLane.classList.add('on');
    src.onended = () => st.source === src && stopPlay();
    const tick = () => { onTick?.(st.ctx.currentTime - st.playStart); drawEq(); st.raf = requestAnimationFrame(tick); };
    tick();
  }
  els.play.addEventListener('click', async () => {
    if (st.source) return stopPlay();
    if (!st.buffer) return;
    await st.ctx.resume();
    const [a, b] = st.sel;
    playBuffer(st.buffer, a, b - a, (t) => draw(Math.min(a + t, b)), T('Original sound'));
    els.play.innerHTML = label('stop', T('Stop'));
  });

  // ----- options -----
  function syncQuality() { els.qWrap.style.display = LOSSY.includes(els.format.value) ? '' : 'none'; resetOutput(); }
  els.format.addEventListener('change', syncQuality);
  root.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    st.mode = b.dataset.mode;
    root.querySelectorAll('[data-mode]').forEach((x) => x.classList.toggle('on', x === b));
    st.exact = null;
    draw(); drawAfter(); resetOutput();
  }));
  root.querySelectorAll('.opts select').forEach((el) => el.addEventListener('change', resetOutput));

  // Problems to report before running ffmpeg (null when fine).
  function checkJob() {
    const fxv = fx.get();
    const [a, b] = st.sel;
    const len = cfg.modes && st.mode === 'remove' ? st.duration - (b - a) : b - a;
    if (fxv.reverse && len > 20 * 60) return T('Reverse works on up to 20 minutes at a time. Select a shorter part.');
    if (cfg.maxLen && len / fxv.speed > cfg.maxLen + 0.05)
      return cfg.limitSpeed ? cfg.limitSpeed.replace('{0}', fxv.speed).replace('{1}', Math.round(len / fxv.speed)).replace('{2}', cfg.maxLen)
        : T('With speed {0}× the ringtone would be {1} s long, but phones allow {2} s. Select a shorter part or raise the speed.', fxv.speed, Math.round(len / fxv.speed), cfg.maxLen);
    if (fxv.karaoke && st.mono) return T('This file is mono (no left/right difference), so the vocal remover would make it silent. It needs a stereo song.');
    return null;
  }

  // ----- build the ffmpeg command -----
  // Everything a job depends on, captured when Convert or Preview is pressed.
  const snapshot = () => ({ fx: fx.get(), sel: [...st.sel], mode: st.mode, quality: els.quality.value,
    video: cfg.video ? { title: $(root, '[data-v=title]').value, style: $(root, '[data-v=style]').value, cover: $(root, '[data-v=cover]').files[0] || null } : null });
  function buildArgs(inName, outName, fmtKey, previewSeconds, snap = snapshot()) {
    const [a, b] = snap.sel, d = st.duration;
    const removing = cfg.modes && snap.mode === 'remove';
    const full = a <= 0.05 && b >= d - 0.05;
    const pre = [];
    let complex = null;
    let len;
    if (removing) {
      // Keep [0,a] + [b,end], joined.
      complex = `[0:a]atrim=0:${a.toFixed(3)},asetpts=PTS-STARTPTS[x];[0:a]atrim=start=${b.toFixed(3)},asetpts=PTS-STARTPTS[y];[x][y]concat=n=2:v=0:a=1[c]`;
      len = a + (d - b);
    } else if (!full) {
      pre.push('-ss', a.toFixed(3), '-t', (b - a).toFixed(3));
      len = b - a;
    } else {
      len = d;
    }
    const { filters, outLen, extraArgs } = effectFilters(snap.fx, len);
    if (cfg.video && !previewSeconds) return { args: videoArgs(pre, inName, filters, outLen, outName), outLen };
    const args = [...pre, '-i', inName, '-vn', '-map_metadata', '-1'];
    if (complex) {
      const chain = filters.length ? `${complex};[c]${filters.join(',')}[o]` : complex.replace('[c]', '[o]');
      args.push('-filter_complex', chain, '-map', '[o]');
    } else if (filters.length) {
      args.push('-af', filters.join(','));
    }
    args.push(...extraArgs);
    if (previewSeconds) args.push('-t', String(previewSeconds), '-c:a', 'pcm_s16le', outName);
    else args.push(...FORMATS[fmtKey].args(snap.quality), outName);
    return { args, outLen: previewSeconds ? Math.min(previewSeconds, outLen) : outLen };
  }

  function withInput(fn, snap) { return exclusive(() => withInputNow(fn, snap)); }
  async function withInputNow(fn, snap) {
    const inName = `input.${extOf(st.file.name)}`;
    let ff;
    try {
      ff = await loadEngine(st.onEngineProgress);
      st.ff = ff;
      if (st.cancelled) throw new Error(CANCELLED);
      if (snap.fx.aiDenoise) await ensureModel(ff);
      await ff.writeFile(inName, new Uint8Array(await st.file.arrayBuffer()));
      return await fn(ff, inName);
    } catch (e) {
      resetEngine(ff); ff = null;
      throw st.cancelled ? new Error(CANCELLED) : e;
    } finally {
      st.ff = null;
      if (ff) await ff.deleteFile(inName).catch(() => {});
    }
  }

  // While a job runs, its settings can't be changed (and Cancel is offered).
  const lockables = () => root.querySelectorAll('.wave, .controls .time, .opts, .presets, .fx-grid, .fx-toggles, [data-new]');
  function setBusy(on) {
    st.busy = on;
    root.classList.toggle('locked', on);
    lockables().forEach((el) => { el.inert = on; });
    els.goNote.hidden = on || engineReady;
    els.cancel.hidden = !on;
    if (on) { st.cancelled = false; st.dirty = false; }
  }
  els.cancel.addEventListener('click', () => {
    st.cancelled = true;
    els.cancel.disabled = true;
    if (st.ff) resetEngine(st.ff); // stops ffmpeg right away; the job then ends as cancelled
  });

  // ----- preview with effects -----
  els.fxPreview.addEventListener('click', async () => {
    if (st.source) return stopPlay();
    if (!st.buffer || st.busy) return;
    if (!els.fxPreview.closest('details').open) els.fxPreview.closest('details').open = true;
    st.ctx.resume(); // must start inside the tap for iOS to allow sound later
    error('');
    const check = checkJob();
    if (check) { els.fxStatus.textContent = check; return error(check); }
    els.fxStatus.textContent = T('Preparing preview…');
    const snap = snapshot();
    setBusy(true);
    els.fxPreview.disabled = true;
    const status = (t) => (els.fxStatus.textContent = t);
    els.go.disabled = true;
    st.onEngineProgress = (p) => status(T('Loading audio engine (one time, ~30 MB)… {0}%', Math.round(p * 100)));
    try {
      const wav = await withInput(async (ff, inName) => {
        const { args, outLen } = buildArgs(inName, 'fxpreview.wav', 'wav', PREVIEW_SECONDS, snap);
        status(T('Applying effects…'));
        await runFFmpeg(ff, args, outLen, (r) => status(T('Applying effects… {0}%', Math.round(r * 100))));
        const data = await ff.readFile('fxpreview.wav');
        await ff.deleteFile('fxpreview.wav').catch(() => {});
        return data;
      }, snap);
      if (st.dirty) throw new Error(T('Your settings changed while the preview was being made. Press Preview again.'));
      await st.ctx.resume();
      const buf = await decodeAudio(st.ctx, wav.buffer);
      st.exact = buf;
      drawAfter();
      playBuffer(buf, 0, buf.duration, null, T('With your effects'));
      els.fxPreview.innerHTML = label('stop', T('Stop preview'));
      els.fxPlay.innerHTML = label('stop', T('Stop'));
      error('');
      status(T('Playing {0} with your effects.', fmt(buf.duration)));
      // Explain a much shorter result instead of letting it look broken.
      const fxv = snap.fx;
      const expected = Math.min(PREVIEW_SECONDS, buildArgs('x', 'y', 'wav', PREVIEW_SECONDS, snap).outLen);
      if (buf.duration < expected * 0.5 && (fxv.silence || fxv.aiDenoise)) {
        const left = fmt(buf.duration);
        status(fxv.aiDenoise && fxv.silence ? T('Only {0} of sound is left: AI noise removal is made for voices and removes music as "noise", and Remove silences cut the rest. For songs, turn AI noise removal off.', left)
          : fxv.aiDenoise ? T('Only {0} of sound is left: AI noise removal is made for voices and removes music as "noise". For songs, turn AI noise removal off.', left)
          : T('Only {0} of sound is left: most of it was quiet, and Remove silences cut the rest. For songs, turn Remove silences off.', left));
      }
      track('fx_preview', { tool: root.dataset.tool });
    } catch (e) {
      status(e?.message === CANCELLED ? T('Preview cancelled.') : e?.message || T('Preview failed.'));
    } finally {
      setBusy(false);
      els.cancel.disabled = false;
      els.fxPreview.disabled = false;
      els.go.disabled = false;
    }
  });

  // ----- convert -----
  function resetOutput() {
    if (st.busy) { st.dirty = true; return; }
    if (st.outURL) { URL.revokeObjectURL(st.outURL); st.outURL = null; }
    share.hide();
    els.go.textContent = goLabel;
    els.go.classList.remove('ok');
    els.go.onclick = convert;
    els.progress.style.display = 'none';
    vprev?.showFrame();
  }
  els.go.onclick = convert;
  // The video's title, style and cover are part of the result: changing them asks for a new video.
  root.querySelectorAll('[data-v]').forEach((el) => el.addEventListener(el.type === 'file' ? 'change' : 'input', () => { resetOutput(); vprev?.refresh(); }));

  async function convert() {
    if (st.busy) return error(T('Please wait a moment: the preview is still being prepared.'));
    if (!st.file || !st.buffer) return;
    error('');
    stopPlay();
    const check = checkJob();
    if (check) return error(check);
    const snap = snapshot();
    setBusy(true);
    els.go.disabled = true;
    els.go.textContent = T('Working…');
    els.progress.style.display = 'block';
    const setP = (p, text) => { els.fill.style.width = `${Math.round(p * 100)}%`; els.stage.textContent = text; };
    setP(0, T('Starting…'));
    st.onEngineProgress = (p) => setP(p * 0.3, T('Loading audio engine (one time, ~30 MB)… {0}%', Math.round(p * 100)));
    const fmtKey = els.format.value;
    const outName = `output.${fmtKey}`;
    let outLen = 0;
    try {
      const data = await withInput(async (ff, inName) => {
        setP(0.3, T('Processing…'));
        if (snap.video) await ff.writeFile('bg.png', await videoBackground(snap.video));
        const job = buildArgs(inName, outName, fmtKey, 0, snap);
        // Show the length that was really written (Remove silences, for one, can't be known in advance).
        outLen = (await runFFmpeg(ff, job.args, job.outLen, (r) => setP(0.3 + r * 0.7, T('Processing… {0}%', Math.round(r * 100))))) ?? job.outLen;
        const out = await ff.readFile(outName);
        await ff.deleteFile(outName).catch(() => {});
        if (snap.video) await ff.deleteFile('bg.png').catch(() => {});
        return out;
      }, snap);
      if (st.dirty) throw new Error(T('Your settings changed while converting, so that file was not kept. Press {0} again.', goLabel));
      const blob = new Blob([data.buffer], { type: FORMATS[fmtKey].mime });
      st.outURL = URL.createObjectURL(blob);
      vprev?.showVideo(st.outURL);
      const fileName = `${baseName(st.file.name)}${cfg.suffix}.${fmtKey}`;
      const fades = fadeLens(snap.fx, outLen);
      const fxOn = fades.shortened ? fxNames(snap.fx) + T(' (fades shortened to {0}s and {1}s to fit)', fades.fi.toFixed(1), fades.fo.toFixed(1)) : fxNames(snap.fx);
      setP(1, `${T('Done')} · ${fileName} · ${fmt(outLen)} · ${(blob.size / 1048576).toFixed(2)} MB${fxOn ? ` · ${fxOn}` : ''}`);
      error('');
      els.go.innerHTML = label('download', T('Download {0}', fmtKey.toUpperCase()));
      els.go.classList.add('ok');
      els.go.onclick = () => { downloadURL(st.outURL, fileName); const n = share.show(blob, fileName); track('download', { tool: root.dataset.tool, format: fmtKey, repeat: n > 1 ? 'yes' : 'no', inapp: IN_APP || 'no' }); };
      track('converted', { tool: root.dataset.tool, format: fmtKey, effects: isDefaultFx(snap.fx) ? 'none' : 'yes' });
      if (fmtKey === 'm4r') notice(T('iPhone (iOS 26 or newer): open the file in the Files app, tap Share → Use as Ringtone. Older iPhones: use GarageBand or a computer (see the guide below).'));
      else if (root.dataset.tool === 'ringtone') notice(T('Android: open Settings → Sound → Phone ringtone, tap + (or Add ringtone) and pick the file from Downloads.'));
      // The Download button can end up below the screen on phones: bring it into view.
      const r = els.go.getBoundingClientRect();
      if (r.bottom > innerHeight || r.top < 0) els.go.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (e) {
      if (e?.message === CANCELLED) error('');
      else {
        error(e?.message || T('Something went wrong.'));
        if (!st.dirty) track('failed', { tool: root.dataset.tool, format: fmtKey, type: extOf(st.file.name) });
      }
      els.progress.style.display = 'none';
      els.go.textContent = goLabel;
    } finally {
      setBusy(false);
      els.cancel.disabled = false;
      els.go.disabled = false;
    }
  }
}

// ---------- audio joiner (several files -> one) ----------
function mountJoiner(root) {
  root.innerHTML = `${INAPP_HTML()}
    <input type="file" class="sr" accept="${ACCEPT}" multiple data-file aria-label="${T('Choose audio or video files')}" tabindex="-1">
    <div class="drop" data-drop tabindex="0" role="button">
      <div class="ico">${UPLOAD_ICON}</div>
      <strong>${T('Choose 2 or more files, or drop them here')}</strong>
      <span>${T('Songs, voice notes or videos. You can reorder them next.')}</span>
    </div>
    <div class="editor" data-editor>
      <ol class="joinlist" data-list></ol>
      <div class="controls"><button class="btn ghost sm" type="button" data-add>+ ${T('Add more files')}</button><span class="sel-len" data-total></span></div>
      <div class="opts">
        <label>${T('Format')} <select data-o="format">${ALL_FORMATS.map((f) => `<option value="${f}">${FORMATS[f].label}</option>`).join('')}</select></label>
        <label data-q>${T('Quality')} <select data-o="quality"><option value="128">128 kbps</option><option value="192">192 kbps</option><option value="256">256 kbps</option><option value="320" selected>320 kbps</option></select></label>
        <label class="fx-s" style="min-width:220px"><span>${T('Crossfade')} <output data-xfv>2s</output></span><input type="range" data-xf min="0" max="8" step="0.5" value="2"></label>
        <label class="fx-t"><input type="checkbox" data-norm checked> ${T('Even out volume')}</label>
      </div>
      <div class="go">
        <button class="btn" type="button" data-go>${T('Join files')}</button>
        <button class="btn ghost" type="button" data-cancel hidden>${T('Cancel')}</button>
        <div class="progress" data-progress><div class="bar"><i data-fill></i></div><small data-stage role="status" aria-live="polite"></small></div>
      </div>
      ${SHARE_HTML()}
      <div class="note" data-err role="alert"></div>
      <div class="result" data-result hidden>
        <b>${I.phones}${T('Listen to the result')}</b>
        <audio controls preload="metadata" data-player></audio>
      </div>
    </div>
    <div class="private">${I.lock}${T('Your files never leave your device. Nothing is uploaded.')}</div>`;

  const els = {
    result: $(root, '[data-result]'), player: $(root, '[data-player]'),
    file: $(root, '[data-file]'), drop: $(root, '[data-drop]'), editor: $(root, '[data-editor]'), list: $(root, '[data-list]'),
    total: $(root, '[data-total]'), format: $(root, '[data-o=format]'), quality: $(root, '[data-o=quality]'), qWrap: $(root, '[data-q]'),
    xf: $(root, '[data-xf]'), xfv: $(root, '[data-xfv]'), norm: $(root, '[data-norm]'), go: $(root, '[data-go]'),
    progress: $(root, '[data-progress]'), fill: $(root, '[data-fill]'), stage: $(root, '[data-stage]'), err: $(root, '[data-err]'),
    cancel: $(root, '[data-cancel]'),
  };
  const share = mountShare(root);
  wireInApp(root);
  const st = { items: [], busy: false, outURL: null, playing: -1, ff: null, cancelled: false };
  // While joining, the list and options are frozen and Cancel is offered.
  function setBusy(on) {
    st.busy = on;
    root.classList.toggle('locked', on);
    root.querySelectorAll('.joinlist .jb, .opts, [data-add]').forEach((el) => { el.inert = on; });
    els.cancel.hidden = !on;
    els.cancel.disabled = false;
    if (on) st.cancelled = false;
  }
  els.cancel.addEventListener('click', () => { st.cancelled = true; els.cancel.disabled = true; if (st.ff) resetEngine(st.ff); });
  const error = (msg) => { els.err.textContent = msg || ''; els.err.className = msg ? 'note err' : 'note'; };
  // One shared player for listening to a single file in the list.
  const filePlayer = new Audio();
  filePlayer.onended = () => { st.playing = -1; render(); };
  function stopFile() {
    filePlayer.pause();
    if (filePlayer.src) URL.revokeObjectURL(filePlayer.src);
    filePlayer.removeAttribute('src');
    st.playing = -1;
  }

  els.drop.addEventListener('click', () => els.file.click());
  els.drop.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), els.file.click()));
  $(root, '[data-add]').addEventListener('click', () => els.file.click());
  els.file.addEventListener('change', () => { addFiles([...els.file.files]); els.file.value = ''; });
  ['dragenter', 'dragover'].forEach((t) => els.drop.addEventListener(t, (e) => { e.preventDefault(); els.drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((t) => els.drop.addEventListener(t, (e) => { e.preventDefault(); els.drop.classList.remove('over'); }));
  els.drop.addEventListener('drop', (e) => addFiles([...e.dataTransfer.files]));
  els.format.addEventListener('change', () => { els.qWrap.style.display = LOSSY.includes(els.format.value) ? '' : 'none'; reset(); });
  fillRange(els.xf);
  els.xf.addEventListener('input', () => {
    fillRange(els.xf); els.xfv.textContent = Number(els.xf.value) ? `${els.xf.value}s` : T('off'); reset(); });
  els.norm.addEventListener('change', reset);
  els.go.onclick = join;

  function probeDuration(file) {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const el = document.createElement(file.type.startsWith('video') ? 'video' : 'audio');
      el.preload = 'metadata';
      el.onloadedmetadata = () => { URL.revokeObjectURL(url); resolve(Number.isFinite(el.duration) ? el.duration : 0); };
      el.onerror = () => { URL.revokeObjectURL(url); resolve(0); };
      el.src = url;
    });
  }
  async function addFiles(files) {
    error('');
    for (const file of files) {
      if (file.size > MAX_BYTES) { error(T('{0} is over 1 GB and was skipped.', file.name)); continue; }
      st.items.push({ file, duration: await probeDuration(file) });
    }
    if (st.items.length) { els.drop.style.display = 'none'; els.editor.style.display = 'block'; }
    render(); reset();
    track('file_opened', { tool: 'joiner', count: st.items.length });
  }
  function render() {
    els.list.innerHTML = st.items.map((it, i) => `
      <li class="${st.playing === i ? 'playing' : ''}"><span class="jn">${i + 1}</span>
        <button type="button" class="jplay" data-play="${i}" aria-label="${st.playing === i ? T('Stop') : T('Play')} ${it.file.name.replace(/"/g, '&quot;')}">${st.playing === i ? I.stop : I.play}</button>
        <b title="${it.file.name.replace(/"/g, '&quot;')}">${it.file.name.replace(/</g, '&lt;')}</b>
        <small>${it.duration ? fmt(it.duration) : ''}</small>
        <span class="jb"><button type="button" data-up="${i}" aria-label="${T('Move up')}" ${i ? '' : 'disabled'}>${I.up}</button>
        <button type="button" data-down="${i}" aria-label="${T('Move down')}" ${i < st.items.length - 1 ? '' : 'disabled'}>${I.down}</button>
        <button type="button" data-rm="${i}" aria-label="${T('Remove')}">${I.x}</button></span></li>`).join('');
    const total = st.items.reduce((s, it) => s + it.duration, 0);
    els.total.textContent = st.items.length === 1 ? T('1 file · {0}', fmt(total)) : T('{0} files · {1}', st.items.length, fmt(total));
    els.go.disabled = st.items.length < 2;
  }
  els.list.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.play != null) {
      const i = Number(b.dataset.play), was = st.playing;
      stopFile();
      if (was !== i) {
        els.player.pause();
        filePlayer.src = URL.createObjectURL(st.items[i].file);
        filePlayer.play().then(() => { st.playing = i; render(); }).catch(() => error(T('This file can’t be played in your browser, but it can still be joined.')));
      }
      return render();
    }
    if (st.busy) return;
    stopFile();
    const i = Number(b.dataset.up ?? b.dataset.down ?? b.dataset.rm);
    if (b.dataset.up != null) [st.items[i - 1], st.items[i]] = [st.items[i], st.items[i - 1]];
    else if (b.dataset.down != null) [st.items[i + 1], st.items[i]] = [st.items[i], st.items[i + 1]];
    else st.items.splice(i, 1);
    if (!st.items.length) { els.editor.style.display = 'none'; els.drop.style.display = ''; }
    render(); reset();
  });
  function reset() {
    if (st.busy) return;
    if (st.outURL) { URL.revokeObjectURL(st.outURL); st.outURL = null; }
    share.hide();
    els.go.textContent = T('Join files'); els.go.classList.remove('ok'); els.go.onclick = join;
    els.progress.style.display = 'none';
    els.player.pause(); els.player.removeAttribute('src'); els.result.hidden = true;
  }

  async function join() {
    if (st.items.length < 2 || st.busy) return;
    error('');
    stopFile(); render();
    setBusy(true); els.go.disabled = true; els.go.textContent = T('Working…');
    els.progress.style.display = 'block';
    const setP = (p, text) => { els.fill.style.width = `${Math.round(p * 100)}%`; els.stage.textContent = text; };
    setP(0, T('Starting…'));
    const fmtKey = els.format.value, outName = `joined.${fmtKey}`;
    // A crossfade can't be longer than the clips it blends: shorten it for very short files.
    const known = st.items.map((it) => it.duration).filter((d) => d > 0);
    const xf = Math.max(0, Math.min(Number(els.xf.value), known.length ? Math.min(...known) / 2 - 0.05 : Number(els.xf.value)));
    const names = st.items.map((it, i) => `in${i}.${extOf(it.file.name)}`);
    let ff;
    try {
      ff = await loadEngine((p) => setP(p * 0.3, T('Loading audio engine (one time, ~30 MB)… {0}%', Math.round(p * 100))));
      st.ff = ff;
      if (st.cancelled) throw new Error(CANCELLED);
      setP(0.3, T('Reading files…'));
      for (let i = 0; i < names.length; i++) await ff.writeFile(names[i], new Uint8Array(await st.items[i].file.arrayBuffer()));
      // Bring every input to the same format, then crossfade or concatenate them.
      const n = names.length;
      const parts = names.map((_, i) => `[${i}:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo[a${i}]`);
      let last;
      if (xf > 0) {
        last = 'a0';
        for (let i = 1; i < n; i++) { parts.push(`[${last}][a${i}]acrossfade=d=${xf}:c1=tri:c2=tri[x${i}]`); last = `x${i}`; }
      } else {
        parts.push(`${names.map((_, i) => `[a${i}]`).join('')}concat=n=${n}:v=0:a=1[cat]`); last = 'cat';
      }
      if (els.norm.checked) { parts.push(`[${last}]loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100,aformat=channel_layouts=stereo[o]`); last = 'o'; }
      const args = [...names.flatMap((nm) => ['-i', nm]), '-vn', '-map_metadata', '-1', '-filter_complex', parts.join(';'), '-map', `[${last}]`,
        ...FORMATS[fmtKey].args(els.quality.value), outName];
      const outLen = st.items.reduce((s, it) => s + it.duration, 0) - xf * (n - 1);
      const written = (await runFFmpeg(ff, args, outLen, (r) => setP(0.3 + r * 0.7, T('Joining… {0}%', Math.round(r * 100))))) ?? outLen;
      const data = await ff.readFile(outName);
      const blob = new Blob([data.buffer], { type: FORMATS[fmtKey].mime });
      st.outURL = URL.createObjectURL(blob);
      setP(1, `${T('Done')} · ${fmt(written)} · ${(blob.size / 1048576).toFixed(2)} MB · ${T('listen below, then download')}`);
      els.player.src = st.outURL; els.result.hidden = false;
      els.go.innerHTML = label('download', T('Download {0}', fmtKey.toUpperCase())); els.go.classList.add('ok');
      const r = els.go.getBoundingClientRect();
      if (r.bottom > innerHeight || r.top < 0) els.go.scrollIntoView({ behavior: 'smooth', block: 'center' });
      els.go.onclick = () => { const nm = `${baseName(st.items[0].file.name)}${T(' (joined)')}.${fmtKey}`; downloadURL(st.outURL, nm); const n = share.show(blob, nm); track('download', { tool: 'joiner', format: fmtKey, repeat: n > 1 ? 'yes' : 'no', inapp: IN_APP || 'no' }); };
      track('converted', { tool: 'joiner', format: fmtKey, count: n });
    } catch (e) {
      resetEngine(ff); ff = null;
      if (st.cancelled) error('');
      else { error(e?.message || T('Something went wrong.')); track('failed', { tool: 'joiner', format: fmtKey }); }
      els.progress.style.display = 'none'; els.go.textContent = T('Join files');
    } finally {
      if (ff) for (const nm of [...names, outName]) await ff.deleteFile(nm).catch(() => {});
      st.ff = null; setBusy(false); els.go.disabled = st.items.length < 2;
    }
  }
}

document.querySelectorAll('[data-tool]').forEach((el) => (el.dataset.tool === 'joiner' ? mountJoiner(el) : mountTool(el)));
