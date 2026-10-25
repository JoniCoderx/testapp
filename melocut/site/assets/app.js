// MeloCut tool engine. Everything runs in the visitor's browser:
// Web Audio for the waveform + quick playback, ffmpeg.wasm for effects + encoding.
import { FFmpeg } from '../vendor/ffmpeg/index.js';

const CORE_BASE = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm';
const MAX_BYTES = 1024 * 1024 * 1024; // 1 GB
const RINGTONE_MAX = 40; // iPhone ringtone limit (seconds)
const PREVIEW_SECONDS = 15;
// RNNoise neural-network model for the AI noise removal (fetched only when used).
const RNN_MODEL_URL = 'https://cdn.jsdelivr.net/gh/GregorR/rnnoise-models@master/somnolent-hogwash-2018-09-01/sh.rnnn';
const RNN_MODEL_FILE = 'voice.rnnn';
let rnnModel = null;
async function ensureModel(ff) {
  rnnModel ||= fetch(RNN_MODEL_URL).then((r) => {
    if (!r.ok) throw new Error('Could not load the AI noise model. Check your connection.');
    return r.arrayBuffer();
  }).catch((e) => { rnnModel = null; throw e; });
  await ff.writeFile(RNN_MODEL_FILE, new Uint8Array(await rnnModel));
}

const FORMATS = {
  mp3: { label: 'MP3', mime: 'audio/mpeg', args: (q) => ['-c:a', 'libmp3lame', '-b:a', `${q}k`] },
  m4a: { label: 'M4A (AAC)', mime: 'audio/mp4', args: (q) => ['-c:a', 'aac', '-b:a', `${q}k`] },
  m4r: { label: 'M4R (iPhone ringtone)', mime: 'audio/mp4', args: () => ['-c:a', 'aac', '-b:a', '192k', '-f', 'ipod'] },
  wav: { label: 'WAV', mime: 'audio/wav', args: () => ['-c:a', 'pcm_s16le'] },
  // Vorbis rejects fixed bitrates it can't hit (e.g. 320k mono), so use quality mode.
  ogg: { label: 'OGG (Vorbis)', mime: 'audio/ogg', args: (q) => ['-c:a', 'libvorbis', '-q:a', { 128: '4', 192: '6', 256: '8', 320: '9' }[q] || '6'] },
  flac: { label: 'FLAC (lossless)', mime: 'audio/flac', args: () => ['-c:a', 'flac'] },
};
const LOSSY = ['mp3', 'm4a', 'ogg'];
const ALL_FORMATS = ['mp3', 'm4a', 'wav', 'ogg', 'flac'];

// ---------- ffmpeg engine (loaded once, on demand) ----------
// Fetch into a blob: URL, reporting progress. Content-Length may be the
// compressed size, so progress is only an estimate and capped below 100%.
async function toBlobURL(url, type, onProgress) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Could not load the audio engine (${resp.status}). Check your connection.`);
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
let engineProgress = null; // latest progress listener (the UI that asked last)
function loadEngine(onProgress) {
  engineProgress = onProgress;
  if (!enginePromise) {
    enginePromise = (async () => {
      const ff = new FFmpeg();
      const coreURL = await toBlobURL(`${CORE_BASE}/ffmpeg-core.js`, 'text/javascript');
      const wasmURL = await toBlobURL(`${CORE_BASE}/ffmpeg-core.wasm`, 'application/wasm', (p) => engineProgress?.(p));
      await ff.load({ coreURL, wasmURL });
      return ff;
    })().catch((e) => { enginePromise = null; throw e; });
  }
  return enginePromise;
}
// A failed run can leave the wasm engine aborted: drop it so the next try starts fresh.
function resetEngine(ff) { try { ff?.terminate(); } catch {} enginePromise = null; }

// Run one ffmpeg command, reporting progress (0..1) against the expected output length.
async function runFFmpeg(ff, args, outLen, onProgress) {
  const logTail = [];
  const onLog = ({ message }) => {
    logTail.push(message); if (logTail.length > 30) logTail.shift();
    const m = message.match(/time=(\d+):(\d+):([\d.]+)/);
    if (m && onProgress) onProgress(Math.min(1, (+m[1] * 3600 + +m[2] * 60 + +m[3]) / Math.max(outLen, 0.1)));
  };
  ff.on('log', onLog);
  try {
    const code = await ff.exec(args);
    if (code !== 0) {
      console.error('ffmpeg failed', args.join(' '), '\n' + logTail.join('\n'));
      throw new Error('Processing failed. The file may be damaged or use an unusual format.');
    }
  } finally {
    ff.off('log', onLog);
  }
}

// ---------- helpers ----------
const $ = (root, sel) => root.querySelector(sel);
const fmt = (t) => {
  t = Math.max(0, t || 0);
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
const track = (event, props) => { try { window.plausible?.(event, { props }); window.gtag?.('event', event, props); } catch {} };
const downloadURL = (url, name) => {
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
};
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
};
const PRESETS = {
  slowed: { label: 'Slowed + Reverb', fx: { speed: 0.85, pitch: -2, reverb: 45, fadeIn: 1, fadeOut: 3 } },
  nightcore: { label: 'Nightcore', fx: { speed: 1.2, pitch: 3 } },
  eightD: { label: '8D Audio', fx: { eightD: true, reverb: 20 } },
  bass: { label: 'Bass Boosted', fx: { bass: 10, normalize: true } },
  loud: { label: 'Louder', fx: { volume: 180, normalize: true } },
  voice: { label: '✨ AI Clean Voice', fx: { aiDenoise: true, normalize: true, silence: true, treble: 2 } },
  karaoke: { label: 'Karaoke', fx: { karaoke: true } },
};

// Filter chain for the given effects; len = input length in seconds. Returns { filters, outLen, extraArgs }.
function effectFilters(fx, len) {
  const f = [];
  if (fx.aiDenoise) f.push('aresample=48000', `arnndn=m=${RNN_MODEL_FILE}`);
  if (fx.denoise) f.push('afftdn=nf=-25');
  // Classic centre-channel cancellation: removes vocals mixed in the middle of a stereo song.
  if (fx.karaoke) f.push('aformat=channel_layouts=stereo', 'pan=stereo|c0=c0-c1|c1=c1-c0');
  if (fx.reverse) f.push('areverse');
  const pitchRatio = Math.pow(2, fx.pitch / 12);
  if (fx.pitch) f.push('aresample=48000', `asetrate=${Math.round(48000 * pitchRatio)}`, 'aresample=48000');
  f.push(...atempoChain(fx.speed / pitchRatio));
  const outLen = len / fx.speed;
  if (fx.fadeIn > 0) f.push(`afade=t=in:st=0:d=${Math.min(fx.fadeIn, outLen / 2).toFixed(2)}`);
  if (fx.fadeOut > 0) {
    const d = Math.min(fx.fadeOut, outLen / 2);
    f.push(`afade=t=out:st=${Math.max(0, outLen - d).toFixed(2)}:d=${d.toFixed(2)}`);
  }
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
  return { filters: f, outLen, extraArgs: fx.mono && !fx.eightD ? ['-ac', '1'] : [] };
}

const isDefaultFx = (fx) => Object.keys(FX_DEFAULTS).every((k) => fx[k] === FX_DEFAULTS[k]);

function slider(key, label, min, max, step, unit) {
  return `<label class="fx-s"><span>${label} <output data-fxv="${key}"></output></span>
    <input type="range" data-fx="${key}" min="${min}" max="${max}" step="${step}" data-unit="${unit}"></label>`;
}
function toggle(key, label, tip) {
  return `<label class="fx-t" title="${tip}"><input type="checkbox" data-fx="${key}"> ${label}</label>`;
}
function fxHTML(open) {
  return `<details class="fx" data-fxbox ${open ? 'open' : ''}>
    <summary>🎛️ Effects &amp; filters <small data-fxcount></small></summary>
    <div class="presets">${Object.entries(PRESETS).map(([k, p]) => `<button type="button" class="chip" data-preset="${k}">${p.label}</button>`).join('')}
      <button type="button" class="chip ghost" data-preset="reset">Reset</button></div>
    <div class="fx-grid">
      ${slider('fadeIn', 'Fade in', 0, 10, 0.5, 's')}
      ${slider('fadeOut', 'Fade out', 0, 10, 0.5, 's')}
      ${slider('volume', 'Volume', 25, 300, 5, '%')}
      ${slider('speed', 'Speed', 0.5, 2, 0.05, '×')}
      ${slider('pitch', 'Pitch', -12, 12, 1, 'st')}
      ${slider('bass', 'Bass', -10, 15, 1, 'dB')}
      ${slider('treble', 'Treble', -10, 10, 1, 'dB')}
      ${slider('reverb', 'Reverb', 0, 100, 5, '%')}
    </div>
    <div class="fx-toggles">
      ${toggle('normalize', 'Auto loudness', 'Make the volume even and as loud as streaming apps')}
      ${toggle('eightD', '8D audio', 'Sound moves around your head (use headphones)')}
      ${toggle('aiDenoise', '✨ AI noise removal', 'A neural network (RNNoise) removes background noise from voices')}
      ${toggle('denoise', 'Reduce hiss', 'Remove steady background hiss and hum')}
      ${toggle('karaoke', 'Vocal remover', 'Karaoke: removes vocals that sit in the centre of a stereo song')}
      ${toggle('silence', 'Remove silences', 'Cut out quiet gaps')}
      ${toggle('reverse', 'Reverse', 'Play the audio backwards')}
      ${toggle('mono', 'Mono', 'Mix to one channel')}
    </div>
    <div class="fx-preview"><button type="button" class="btn ghost sm" data-fxpreview>🎧 Preview with effects</button><small data-fxstatus>Hear the first ${PREVIEW_SECONDS} seconds with your effects.</small></div>
  </details>`;
}
const fmtFx = (key, v) => {
  switch (key) {
    case 'fadeIn': case 'fadeOut': return v > 0 ? `${v}s` : 'off';
    case 'volume': return `${v}%`;
    case 'speed': return `${(+v).toFixed(2)}×`;
    case 'pitch': return v == 0 ? '0' : `${v > 0 ? '+' : ''}${v} semitones`;
    case 'bass': case 'treble': return v == 0 ? '0' : `${v > 0 ? '+' : ''}${v} dB`;
    case 'reverb': return v > 0 ? `${v}%` : 'off';
    default: return v;
  }
};

// Wires an effects panel inside `root`. Returns { get(), set(fx), onChange }.
function mountFx(root, initial, onChange) {
  const box = $(root, '[data-fxbox]');
  const fx = { ...FX_DEFAULTS, ...initial };
  const inputs = box.querySelectorAll('[data-fx]');
  function render() {
    inputs.forEach((el) => {
      const k = el.dataset.fx;
      if (el.type === 'checkbox') el.checked = !!fx[k]; else el.value = fx[k];
      const out = box.querySelector(`[data-fxv="${k}"]`);
      if (out) out.textContent = fmtFx(k, fx[k]);
    });
    const n = Object.keys(FX_DEFAULTS).filter((k) => fx[k] !== FX_DEFAULTS[k]).length;
    $(box, '[data-fxcount]').textContent = n ? `${n} on` : '';
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
  render();
  return { get: () => ({ ...fx }) };
}

// ---------- per-tool settings ----------
const TOOLS = {
  'video-to-mp3': {
    formats: ['mp3', 'm4a', 'wav'], defaultFormat: 'mp3', suffix: '',
    note: 'Tip: drag on the waveform to keep only part of the audio. Open Effects to add fades.',
  },
  ringtone: {
    formats: ['m4r', 'mp3'], defaultFormat: 'm4r', suffix: ' (ringtone)', maxLen: RINGTONE_MAX,
    fx: { fadeIn: 1, fadeOut: 2 }, defaultSel: (d) => [0, Math.min(30, d)],
    note: 'Drag on the waveform to choose up to 40 seconds. M4R is for iPhone, MP3 for Android.',
  },
  cutter: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: ' (cut)', modes: true, fx: { fadeOut: 2 },
    defaultSel: (d) => [d * 0.1, d * 0.9],
    note: 'Drag the handles to choose a part, then keep it or remove it.',
  },
  converter: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: '',
    note: 'Converts the whole file. Drag on the waveform if you only want part of it.',
  },
  'slowed-reverb': {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: ' (slowed + reverb)', fx: PRESETS.slowed.fx, fxOpen: true,
    note: 'Slowed + reverb is already set up. Fine-tune it below, then press Preview.',
  },
  '8d': {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: ' (8D)', fx: PRESETS.eightD.fx, fxOpen: true,
    note: 'Put on headphones and press Preview to hear the sound move around your head.',
  },
  bass: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: ' (bass boosted)', fx: PRESETS.bass.fx, fxOpen: true,
    note: 'Use the Bass slider to choose how much boost you want.',
  },
  volume: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: ' (louder)', fx: PRESETS.loud.fx, fxOpen: true,
    note: 'Auto loudness makes quiet audio as loud as streaming apps without distortion.',
  },
  denoise: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: ' (clean)', fx: PRESETS.voice.fx, fxOpen: true,
    note: 'AI noise removal cleans up voices, evens out the volume and cuts long silences.',
  },
  karaoke: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: ' (karaoke)', fx: PRESETS.karaoke.fx, fxOpen: true,
    note: 'Works best on studio songs where the singer is in the centre. Press Preview to check.',
  },
  reverse: {
    formats: ALL_FORMATS, defaultFormat: 'mp3', suffix: ' (reversed)', fx: { reverse: true }, fxOpen: true,
    note: 'Press Preview to hear it backwards.',
  },
};

function optionsHTML(cfg) {
  const fmtOpts = cfg.formats.map((f) => `<option value="${f}">${FORMATS[f].label}</option>`).join('');
  return `
    <label>Format <select data-o="format">${fmtOpts}</select></label>
    <label data-q>Quality <select data-o="quality">
      <option value="128">128 kbps</option><option value="192">192 kbps</option>
      <option value="256">256 kbps</option><option value="320" selected>320 kbps</option></select></label>
    ${cfg.modes ? `<div class="seg" role="group" aria-label="Cut mode">
      <button type="button" class="on" data-mode="keep">Keep selection</button>
      <button type="button" data-mode="remove">Remove selection</button></div>` : ''}`;
}

// ---------- the single-file tool widget ----------
function mountTool(root) {
  const cfg = TOOLS[root.dataset.tool];
  if (!cfg) return;

  root.innerHTML = `
    <input type="file" class="sr" accept="${ACCEPT}" data-file>
    <div class="drop" data-drop tabindex="0" role="button" aria-label="Choose an audio or video file">
      <div class="ico">${UPLOAD_ICON}</div>
      <strong>Choose a file or drop it here</strong>
      <span>MP3, MP4, MOV, M4A, WAV, OGG, OPUS, WebM… up to 1 GB</span>
    </div>
    <div class="editor" data-editor>
      <div class="filebar">
        <div style="min-width:0;flex:1"><b data-name></b><small data-meta></small></div>
        <button class="btn ghost sm" type="button" data-new>Choose another file</button>
      </div>
      <div class="wave" data-wave><canvas></canvas><div class="busy" data-busy>Reading audio…</div></div>
      <div class="controls">
        <button class="btn ghost sm" type="button" data-play aria-label="Play selection">▶ Play</button>
        <label class="time">Start <input data-start inputmode="decimal" aria-label="Start time"></label>
        <label class="time">End <input data-end inputmode="decimal" aria-label="End time"></label>
        <span class="sel-len" data-len></span>
      </div>
      <div class="opts">${optionsHTML(cfg)}</div>
      ${fxHTML(cfg.fxOpen)}
      <div class="note info" data-hint>${cfg.note}</div>
      <div class="go">
        <button class="btn" type="button" data-go>Convert</button>
        <div class="progress" data-progress><div class="bar"><i data-fill></i></div><small data-stage></small></div>
      </div>
      <div class="note" data-err></div>
    </div>
    <div class="private">🔒 Your file never leaves your device. Nothing is uploaded.</div>`;

  const els = {
    file: $(root, '[data-file]'), drop: $(root, '[data-drop]'), editor: $(root, '[data-editor]'),
    name: $(root, '[data-name]'), meta: $(root, '[data-meta]'), wave: $(root, '[data-wave]'),
    canvas: $(root, 'canvas'), busy: $(root, '[data-busy]'), play: $(root, '[data-play]'),
    start: $(root, '[data-start]'), end: $(root, '[data-end]'), len: $(root, '[data-len]'),
    go: $(root, '[data-go]'), progress: $(root, '[data-progress]'), fill: $(root, '[data-fill]'),
    stage: $(root, '[data-stage]'), err: $(root, '[data-err]'), hint: $(root, '[data-hint]'),
    format: $(root, '[data-o=format]'), quality: $(root, '[data-o=quality]'), qWrap: $(root, '[data-q]'),
    fxPreview: $(root, '[data-fxpreview]'), fxStatus: $(root, '[data-fxstatus]'),
  };
  const st = { file: null, duration: 0, buffer: null, peaks: null, sel: [0, 0], mode: 'keep',
    ctx: null, source: null, playStart: 0, playFrom: 0, raf: 0, outURL: null, busy: false };
  const fx = mountFx(root, cfg.fx, () => { stopPlay(); resetOutput(); });

  // ----- file selection -----
  els.drop.addEventListener('click', () => els.file.click());
  els.drop.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), els.file.click()));
  $(root, '[data-new]').addEventListener('click', () => els.file.click());
  els.file.addEventListener('change', () => els.file.files[0] && openFile(els.file.files[0]));
  ['dragenter', 'dragover'].forEach((t) => els.drop.addEventListener(t, (e) => { e.preventDefault(); els.drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((t) => els.drop.addEventListener(t, (e) => { e.preventDefault(); els.drop.classList.remove('over'); }));
  els.drop.addEventListener('drop', (e) => e.dataTransfer.files[0] && openFile(e.dataTransfer.files[0]));
  // Space toggles playback (when not typing in a field).
  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' || !st.buffer || /INPUT|SELECT|TEXTAREA|BUTTON/.test(document.activeElement?.tagName)) return;
    e.preventDefault(); els.play.click();
  });

  function error(msg) { els.err.textContent = msg || ''; els.err.className = msg ? 'note err' : 'note'; }

  async function openFile(file) {
    error('');
    if (file.size > MAX_BYTES) return showDropError('That file is over 1 GB. Please choose a smaller file.');
    stopPlay();
    resetOutput();
    st.file = file; st.buffer = null; st.peaks = null;
    els.drop.style.display = 'none';
    els.editor.style.display = 'block';
    els.name.textContent = file.name;
    els.meta.textContent = `${(file.size / 1048576).toFixed(1)} MB`;
    els.busy.style.display = 'grid';
    els.busy.textContent = 'Reading audio…';
    els.format.value = cfg.defaultFormat;
    syncQuality();
    track('file_opened', { tool: root.dataset.tool, type: extOf(file.name) });
    try {
      st.buffer = await decode(file);
    } catch (e) {
      els.busy.textContent = 'Could not read this file. Is it an audio or video file?';
      return;
    }
    st.duration = st.buffer.duration;
    if (!st.duration) { els.busy.textContent = 'This file has no audio.'; return; }
    els.meta.textContent = `${fmt(st.duration)} · ${(file.size / 1048576).toFixed(1)} MB`;
    st.peaks = null;
    els.busy.style.display = 'none';
    setSel(...(cfg.defaultSel ? cfg.defaultSel(st.duration) : [0, st.duration]));
  }

  function showDropError(msg) {
    els.drop.querySelector('span').textContent = msg;
    els.drop.querySelector('span').style.color = 'var(--warn)';
  }

  async function decode(file) {
    st.ctx ||= new (window.AudioContext || window.webkitAudioContext)();
    const data = await file.arrayBuffer();
    try {
      return await st.ctx.decodeAudioData(data.slice(0));
    } catch {
      // Browser can't decode this container/codec natively: let ffmpeg extract the audio first.
      els.busy.textContent = 'Preparing audio engine…';
      const ff = await loadEngine((p) => (els.busy.textContent = `Loading audio engine… ${Math.round(p * 100)}%`));
      const inName = `in.${extOf(file.name)}`;
      await ff.writeFile(inName, new Uint8Array(data));
      els.busy.textContent = 'Reading audio…';
      await ff.exec(['-i', inName, '-vn', '-ac', '2', '-ar', '44100', '-c:a', 'pcm_s16le', 'preview.wav']);
      const wav = await ff.readFile('preview.wav');
      await ff.deleteFile('preview.wav').catch(() => {});
      await ff.deleteFile(inName).catch(() => {});
      return await st.ctx.decodeAudioData(wav.buffer);
    }
  }

  // ----- selection -----
  function setSel(a, b, fromInput) {
    const d = st.duration;
    a = Math.max(0, Math.min(a, d)); b = Math.max(0, Math.min(b, d));
    if (b < a) [a, b] = [b, a];
    if (b - a < 0.1) b = Math.min(d, a + 0.1);
    if (cfg.maxLen && b - a > cfg.maxLen) {
      b = a + cfg.maxLen;
      els.hint.textContent = `Ringtones can be at most ${cfg.maxLen} seconds, so the selection was shortened.`;
    }
    st.sel = [a, b];
    if (!fromInput) { els.start.value = fmt(a); els.end.value = fmt(b); }
    const full = a <= 0.05 && b >= d - 0.05;
    els.len.textContent = full ? `Whole file · ${fmt(d)}` : `Selected ${fmt(b - a)}`;
    draw();
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
    [xa, xb].forEach((x) => { g.fillRect(x - 1.5, 0, 3, h); g.beginPath(); g.roundRect(x - 7, h / 2 - 14, 14, 28, 5); g.fill(); });
    if (playhead != null) { g.fillStyle = brand2; g.fillRect((playhead / d) * w - 1, 0, 2, h); }
  }
  new ResizeObserver(() => draw()).observe(els.wave);

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
    els.play.textContent = '▶ Play';
    els.fxPreview.textContent = '🎧 Preview with effects';
    draw();
  }
  function playBuffer(buffer, offset, duration, onTick) {
    const src = st.ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(st.ctx.destination);
    src.start(0, offset, duration);
    st.source = src; st.playStart = st.ctx.currentTime;
    src.onended = () => st.source === src && stopPlay();
    const tick = () => { onTick?.(st.ctx.currentTime - st.playStart); st.raf = requestAnimationFrame(tick); };
    tick();
  }
  els.play.addEventListener('click', async () => {
    if (st.source) return stopPlay();
    if (!st.buffer) return;
    await st.ctx.resume();
    const [a, b] = st.sel;
    playBuffer(st.buffer, a, b - a, (t) => draw(Math.min(a + t, b)));
    els.play.textContent = '■ Stop';
  });

  // ----- options -----
  function syncQuality() { els.qWrap.style.display = LOSSY.includes(els.format.value) ? '' : 'none'; resetOutput(); }
  els.format.addEventListener('change', syncQuality);
  root.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    st.mode = b.dataset.mode;
    root.querySelectorAll('[data-mode]').forEach((x) => x.classList.toggle('on', x === b));
    draw(); resetOutput();
  }));
  root.querySelectorAll('.opts select').forEach((el) => el.addEventListener('change', resetOutput));

  // ----- build the ffmpeg command -----
  function buildArgs(inName, outName, fmtKey, previewSeconds) {
    const [a, b] = st.sel, d = st.duration;
    const removing = cfg.modes && st.mode === 'remove';
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
    const { filters, outLen, extraArgs } = effectFilters(fx.get(), len);
    const args = [...pre, '-i', inName, '-vn', '-map_metadata', '-1'];
    if (complex) {
      const chain = filters.length ? `${complex};[c]${filters.join(',')}[o]` : complex.replace('[c]', '[o]');
      args.push('-filter_complex', chain, '-map', '[o]');
    } else if (filters.length) {
      args.push('-af', filters.join(','));
    }
    args.push(...extraArgs);
    if (previewSeconds) args.push('-t', String(previewSeconds), '-c:a', 'pcm_s16le', outName);
    else args.push(...FORMATS[fmtKey].args(els.quality.value), outName);
    return { args, outLen: previewSeconds ? Math.min(previewSeconds, outLen) : outLen };
  }

  async function withInput(fn) {
    const inName = `input.${extOf(st.file.name)}`;
    let ff;
    try {
      ff = await loadEngine(st.onEngineProgress);
      if (fx.get().aiDenoise) await ensureModel(ff);
      await ff.writeFile(inName, new Uint8Array(await st.file.arrayBuffer()));
      return await fn(ff, inName);
    } catch (e) {
      resetEngine(ff); ff = null;
      throw e;
    } finally {
      if (ff) await ff.deleteFile(inName).catch(() => {});
    }
  }

  // ----- preview with effects -----
  els.fxPreview.addEventListener('click', async () => {
    if (st.source) return stopPlay();
    if (!st.buffer || st.busy) return;
    error('');
    st.busy = true;
    els.fxPreview.disabled = true;
    const status = (t) => (els.fxStatus.textContent = t);
    st.onEngineProgress = (p) => status(`Loading audio engine (one time, ~30 MB)… ${Math.round(p * 100)}%`);
    try {
      const wav = await withInput(async (ff, inName) => {
        const { args, outLen } = buildArgs(inName, 'fxpreview.wav', 'wav', PREVIEW_SECONDS);
        status('Applying effects…');
        await runFFmpeg(ff, args, outLen, (r) => status(`Applying effects… ${Math.round(r * 100)}%`));
        const data = await ff.readFile('fxpreview.wav');
        await ff.deleteFile('fxpreview.wav').catch(() => {});
        return data;
      });
      await st.ctx.resume();
      const buf = await st.ctx.decodeAudioData(wav.buffer);
      playBuffer(buf, 0, buf.duration);
      els.fxPreview.textContent = '■ Stop preview';
      status(`Playing ${fmt(buf.duration)} with your effects.`);
      track('fx_preview', { tool: root.dataset.tool });
    } catch (e) {
      status(e?.message || 'Preview failed.');
    } finally {
      st.busy = false;
      els.fxPreview.disabled = false;
    }
  });

  // ----- convert -----
  function resetOutput() {
    if (st.busy) return;
    if (st.outURL) { URL.revokeObjectURL(st.outURL); st.outURL = null; }
    els.go.textContent = 'Convert';
    els.go.classList.remove('ok');
    els.go.onclick = convert;
    els.progress.style.display = 'none';
  }
  els.go.onclick = convert;

  async function convert() {
    if (!st.file || st.busy) return;
    error('');
    stopPlay();
    st.busy = true;
    els.go.disabled = true;
    els.go.textContent = 'Working…';
    els.progress.style.display = 'block';
    const setP = (p, text) => { els.fill.style.width = `${Math.round(p * 100)}%`; els.stage.textContent = text; };
    setP(0, 'Starting…');
    st.onEngineProgress = (p) => setP(p * 0.3, `Loading audio engine (one time, ~30 MB)… ${Math.round(p * 100)}%`);
    const fmtKey = els.format.value;
    const outName = `output.${fmtKey}`;
    try {
      const data = await withInput(async (ff, inName) => {
        setP(0.3, 'Processing…');
        const { args, outLen } = buildArgs(inName, outName, fmtKey);
        await runFFmpeg(ff, args, outLen, (r) => setP(0.3 + r * 0.7, `Processing… ${Math.round(r * 100)}%`));
        const out = await ff.readFile(outName);
        await ff.deleteFile(outName).catch(() => {});
        return out;
      });
      const blob = new Blob([data.buffer], { type: FORMATS[fmtKey].mime });
      st.outURL = URL.createObjectURL(blob);
      const fileName = `${baseName(st.file.name)}${cfg.suffix}.${fmtKey}`;
      setP(1, `Done · ${(blob.size / 1048576).toFixed(2)} MB`);
      els.go.textContent = `⬇ Download ${fmtKey.toUpperCase()}`;
      els.go.classList.add('ok');
      els.go.onclick = () => { downloadURL(st.outURL, fileName); track('download', { tool: root.dataset.tool, format: fmtKey }); };
      track('converted', { tool: root.dataset.tool, format: fmtKey, effects: isDefaultFx(fx.get()) ? 'none' : 'yes' });
      if (fmtKey === 'm4r') els.hint.textContent = 'iPhone: open the file with GarageBand, or drag it into Finder/iTunes with your phone connected, then choose it in Settings → Sounds.';
    } catch (e) {
      error(e?.message || 'Something went wrong.');
      els.progress.style.display = 'none';
      els.go.textContent = 'Convert';
    } finally {
      st.busy = false;
      els.go.disabled = false;
    }
  }
}

// ---------- audio joiner (several files -> one) ----------
function mountJoiner(root) {
  root.innerHTML = `
    <input type="file" class="sr" accept="${ACCEPT}" multiple data-file>
    <div class="drop" data-drop tabindex="0" role="button" aria-label="Choose audio or video files">
      <div class="ico">${UPLOAD_ICON}</div>
      <strong>Choose 2 or more files, or drop them here</strong>
      <span>Songs, voice notes or videos, in any order. You can reorder them next.</span>
    </div>
    <div class="editor" data-editor>
      <ol class="joinlist" data-list></ol>
      <div class="controls"><button class="btn ghost sm" type="button" data-add>+ Add more files</button><span class="sel-len" data-total></span></div>
      <div class="opts">
        <label>Format <select data-o="format">${ALL_FORMATS.map((f) => `<option value="${f}">${FORMATS[f].label}</option>`).join('')}</select></label>
        <label data-q>Quality <select data-o="quality"><option value="128">128 kbps</option><option value="192">192 kbps</option><option value="256">256 kbps</option><option value="320" selected>320 kbps</option></select></label>
        <label class="fx-s" style="min-width:220px"><span>Crossfade <output data-xfv>2s</output></span><input type="range" data-xf min="0" max="8" step="0.5" value="2"></label>
        <label class="fx-t"><input type="checkbox" data-norm checked> Even out volume</label>
      </div>
      <div class="go">
        <button class="btn" type="button" data-go>Join files</button>
        <div class="progress" data-progress><div class="bar"><i data-fill></i></div><small data-stage></small></div>
      </div>
      <div class="note" data-err></div>
    </div>
    <div class="private">🔒 Your files never leave your device. Nothing is uploaded.</div>`;

  const els = {
    file: $(root, '[data-file]'), drop: $(root, '[data-drop]'), editor: $(root, '[data-editor]'), list: $(root, '[data-list]'),
    total: $(root, '[data-total]'), format: $(root, '[data-o=format]'), quality: $(root, '[data-o=quality]'), qWrap: $(root, '[data-q]'),
    xf: $(root, '[data-xf]'), xfv: $(root, '[data-xfv]'), norm: $(root, '[data-norm]'), go: $(root, '[data-go]'),
    progress: $(root, '[data-progress]'), fill: $(root, '[data-fill]'), stage: $(root, '[data-stage]'), err: $(root, '[data-err]'),
  };
  const st = { items: [], busy: false, outURL: null };
  const error = (msg) => { els.err.textContent = msg || ''; els.err.className = msg ? 'note err' : 'note'; };

  els.drop.addEventListener('click', () => els.file.click());
  $(root, '[data-add]').addEventListener('click', () => els.file.click());
  els.file.addEventListener('change', () => { addFiles([...els.file.files]); els.file.value = ''; });
  ['dragenter', 'dragover'].forEach((t) => els.drop.addEventListener(t, (e) => { e.preventDefault(); els.drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((t) => els.drop.addEventListener(t, (e) => { e.preventDefault(); els.drop.classList.remove('over'); }));
  els.drop.addEventListener('drop', (e) => addFiles([...e.dataTransfer.files]));
  els.format.addEventListener('change', () => { els.qWrap.style.display = LOSSY.includes(els.format.value) ? '' : 'none'; reset(); });
  els.xf.addEventListener('input', () => { els.xfv.textContent = Number(els.xf.value) ? `${els.xf.value}s` : 'off'; reset(); });
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
      if (file.size > MAX_BYTES) { error(`${file.name} is over 1 GB and was skipped.`); continue; }
      st.items.push({ file, duration: await probeDuration(file) });
    }
    if (st.items.length) { els.drop.style.display = 'none'; els.editor.style.display = 'block'; }
    render(); reset();
    track('file_opened', { tool: 'joiner', count: st.items.length });
  }
  function render() {
    els.list.innerHTML = st.items.map((it, i) => `
      <li><span class="jn">${i + 1}</span><b title="${it.file.name.replace(/"/g, '&quot;')}">${it.file.name.replace(/</g, '&lt;')}</b>
        <small>${it.duration ? fmt(it.duration) : ''}</small>
        <span class="jb"><button type="button" data-up="${i}" aria-label="Move up" ${i ? '' : 'disabled'}>↑</button>
        <button type="button" data-down="${i}" aria-label="Move down" ${i < st.items.length - 1 ? '' : 'disabled'}>↓</button>
        <button type="button" data-rm="${i}" aria-label="Remove">✕</button></span></li>`).join('');
    const total = st.items.reduce((s, it) => s + it.duration, 0);
    els.total.textContent = `${st.items.length} file${st.items.length === 1 ? '' : 's'} · ${fmt(total)}`;
    els.go.disabled = st.items.length < 2;
  }
  els.list.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b || st.busy) return;
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
    els.go.textContent = 'Join files'; els.go.classList.remove('ok'); els.go.onclick = join;
    els.progress.style.display = 'none';
  }

  async function join() {
    if (st.items.length < 2 || st.busy) return;
    error('');
    st.busy = true; els.go.disabled = true; els.go.textContent = 'Working…';
    els.progress.style.display = 'block';
    const setP = (p, text) => { els.fill.style.width = `${Math.round(p * 100)}%`; els.stage.textContent = text; };
    setP(0, 'Starting…');
    const fmtKey = els.format.value, outName = `joined.${fmtKey}`;
    const xf = Number(els.xf.value);
    const names = st.items.map((it, i) => `in${i}.${extOf(it.file.name)}`);
    let ff;
    try {
      ff = await loadEngine((p) => setP(p * 0.3, `Loading audio engine (one time, ~30 MB)… ${Math.round(p * 100)}%`));
      setP(0.3, 'Reading files…');
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
      if (els.norm.checked) { parts.push(`[${last}]loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[o]`); last = 'o'; }
      const args = [...names.flatMap((nm) => ['-i', nm]), '-vn', '-map_metadata', '-1', '-filter_complex', parts.join(';'), '-map', `[${last}]`,
        ...FORMATS[fmtKey].args(els.quality.value), outName];
      const outLen = st.items.reduce((s, it) => s + it.duration, 0) - xf * (n - 1);
      await runFFmpeg(ff, args, outLen, (r) => setP(0.3 + r * 0.7, `Joining… ${Math.round(r * 100)}%`));
      const data = await ff.readFile(outName);
      const blob = new Blob([data.buffer], { type: FORMATS[fmtKey].mime });
      st.outURL = URL.createObjectURL(blob);
      setP(1, `Done · ${(blob.size / 1048576).toFixed(2)} MB`);
      els.go.textContent = `⬇ Download ${fmtKey.toUpperCase()}`; els.go.classList.add('ok');
      els.go.onclick = () => { downloadURL(st.outURL, `${baseName(st.items[0].file.name)} (joined).${fmtKey}`); track('download', { tool: 'joiner', format: fmtKey }); };
      track('converted', { tool: 'joiner', format: fmtKey, count: n });
    } catch (e) {
      resetEngine(ff); ff = null;
      error(e?.message || 'Something went wrong.');
      els.progress.style.display = 'none'; els.go.textContent = 'Join files';
    } finally {
      if (ff) for (const nm of [...names, outName]) await ff.deleteFile(nm).catch(() => {});
      st.busy = false; els.go.disabled = st.items.length < 2;
    }
  }
}

document.querySelectorAll('[data-tool]').forEach((el) => (el.dataset.tool === 'joiner' ? mountJoiner(el) : mountTool(el)));
