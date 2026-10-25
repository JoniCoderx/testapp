// MeloCut tool engine. Everything runs in the visitor's browser:
// Web Audio for the waveform + preview, ffmpeg.wasm for encoding.
import { FFmpeg } from '../vendor/ffmpeg/index.js';

const CORE_BASE = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm';
const MAX_BYTES = 1024 * 1024 * 1024; // 1 GB
const RINGTONE_MAX = 40; // iPhone ringtone limit (seconds)

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

// ---------- per-tool settings ----------
const TOOLS = {
  'video-to-mp3': {
    formats: ['mp3', 'm4a', 'wav'], defaultFormat: 'mp3', suffix: '',
    note: 'Tip: drag on the waveform to keep only part of the audio.',
  },
  ringtone: {
    formats: ['m4r', 'mp3'], defaultFormat: 'm4r', suffix: ' (ringtone)', fades: true, maxLen: RINGTONE_MAX,
    defaultSel: (d) => [0, Math.min(30, d)],
    note: 'Drag on the waveform to choose up to 40 seconds. M4R is for iPhone, MP3 for Android.',
  },
  cutter: {
    formats: ['mp3', 'm4a', 'wav', 'ogg', 'flac'], defaultFormat: 'mp3', suffix: ' (cut)', fades: true, modes: true,
    defaultSel: (d) => [d * 0.1, d * 0.9],
    note: 'Drag the handles to choose a part, then keep it or remove it.',
  },
  converter: {
    formats: ['mp3', 'wav', 'm4a', 'ogg', 'flac'], defaultFormat: 'mp3', suffix: '', speed: true, volume: true,
    note: 'Converts the whole file. Drag on the waveform if you only want part of it.',
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
      <button type="button" data-mode="remove">Remove selection</button></div>` : ''}
    ${cfg.fades ? `<label><input type="checkbox" data-o="fadein" ${cfg.maxLen ? 'checked' : ''}> Fade in</label>
      <label><input type="checkbox" data-o="fadeout" checked> Fade out</label>` : ''}
    ${cfg.volume ? `<label>Volume <input type="range" data-o="volume" min="0.5" max="3" step="0.1" value="1"><span data-v="volume">100%</span></label>` : ''}
    ${cfg.speed ? `<label>Speed <select data-o="speed">
      <option value="0.75">0.75×</option><option value="0.85">0.85× (slowed)</option><option value="1" selected>1×</option>
      <option value="1.15">1.15×</option><option value="1.25">1.25× (sped up)</option><option value="1.5">1.5×</option></select></label>` : ''}`;
}

// ---------- the tool widget ----------
function mountTool(root) {
  const cfg = TOOLS[root.dataset.tool];
  if (!cfg) return;

  root.innerHTML = `
    <input type="file" class="sr" accept="audio/*,video/*,.mp3,.mp4,.m4a,.wav,.ogg,.opus,.flac,.webm,.mov,.mkv,.aac,.amr,.3gp" data-file>
    <div class="drop" data-drop tabindex="0" role="button" aria-label="Choose an audio or video file">
      <div class="ico"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M6 10l6-6 6 6"/><path d="M4 18v2h16v-2"/></svg></div>
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
    fadein: $(root, '[data-o=fadein]'), fadeout: $(root, '[data-o=fadeout]'),
    volume: $(root, '[data-o=volume]'), volLabel: $(root, '[data-v=volume]'), speed: $(root, '[data-o=speed]'),
  };
  const st = { file: null, duration: 0, buffer: null, peaks: null, sel: [0, 0], mode: 'keep',
    ctx: null, source: null, playStart: 0, playFrom: 0, raf: 0, outURL: null, busy: false };

  // ----- file selection -----
  els.drop.addEventListener('click', () => els.file.click());
  els.drop.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), els.file.click()));
  $(root, '[data-new]').addEventListener('click', () => els.file.click());
  els.file.addEventListener('change', () => els.file.files[0] && openFile(els.file.files[0]));
  ['dragenter', 'dragover'].forEach((t) => els.drop.addEventListener(t, (e) => { e.preventDefault(); els.drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((t) => els.drop.addEventListener(t, (e) => { e.preventDefault(); els.drop.classList.remove('over'); }));
  els.drop.addEventListener('drop', (e) => e.dataTransfer.files[0] && openFile(e.dataTransfer.files[0]));

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

  // ----- preview playback -----
  function stopPlay() {
    if (st.source) { try { st.source.stop(); } catch {} st.source = null; }
    cancelAnimationFrame(st.raf);
    els.play.textContent = '▶ Play';
    draw();
  }
  els.play.addEventListener('click', async () => {
    if (st.source) return stopPlay();
    if (!st.buffer) return;
    await st.ctx.resume();
    const src = st.ctx.createBufferSource();
    src.buffer = st.buffer;
    const gain = st.ctx.createGain();
    gain.gain.value = els.volume ? Number(els.volume.value) : 1;
    src.playbackRate.value = els.speed ? Number(els.speed.value) : 1;
    src.connect(gain).connect(st.ctx.destination);
    const [a, b] = st.sel;
    src.start(0, a, b - a);
    st.source = src; st.playStart = st.ctx.currentTime; st.playFrom = a;
    src.onended = () => st.source === src && stopPlay();
    els.play.textContent = '■ Stop';
    const tick = () => {
      const pos = st.playFrom + (st.ctx.currentTime - st.playStart) * src.playbackRate.value;
      draw(Math.min(pos, b));
      st.raf = requestAnimationFrame(tick);
    };
    tick();
  });

  // ----- options -----
  function syncQuality() { els.qWrap.style.display = LOSSY.includes(els.format.value) ? '' : 'none'; resetOutput(); }
  els.format.addEventListener('change', syncQuality);
  root.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    st.mode = b.dataset.mode;
    root.querySelectorAll('[data-mode]').forEach((x) => x.classList.toggle('on', x === b));
    draw(); resetOutput();
  }));
  els.volume?.addEventListener('input', () => { els.volLabel.textContent = `${Math.round(els.volume.value * 100)}%`; resetOutput(); });
  root.querySelectorAll('.opts select, .opts input').forEach((el) => el.addEventListener('change', resetOutput));

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

  function buildArgs(inName, outName, fmtKey) {
    const [a, b] = st.sel, d = st.duration;
    const removing = cfg.modes && st.mode === 'remove';
    const full = a <= 0.05 && b >= d - 0.05;
    const filters = [];
    let outLen;
    const pre = [];
    let complex = null;

    if (removing) {
      // Keep [0,a] + [b,end], joined.
      complex = `[0:a]atrim=0:${a.toFixed(3)},asetpts=PTS-STARTPTS[x];[0:a]atrim=start=${b.toFixed(3)},asetpts=PTS-STARTPTS[y];[x][y]concat=n=2:v=0:a=1[c]`;
      outLen = a + (d - b);
    } else if (!full) {
      pre.push('-ss', a.toFixed(3), '-t', (b - a).toFixed(3));
      outLen = b - a;
    } else {
      outLen = d;
    }
    const speed = els.speed ? Number(els.speed.value) : 1;
    if (speed !== 1) { filters.push(`atempo=${speed}`); outLen /= speed; }
    const vol = els.volume ? Number(els.volume.value) : 1;
    if (vol !== 1) filters.push(`volume=${vol}`, 'alimiter=limit=0.97');
    if (els.fadein?.checked) filters.push(`afade=t=in:st=0:d=${Math.min(1.5, outLen / 4).toFixed(2)}`);
    if (els.fadeout?.checked) {
      const fd = Math.min(2, outLen / 4);
      filters.push(`afade=t=out:st=${Math.max(0, outLen - fd).toFixed(2)}:d=${fd.toFixed(2)}`);
    }

    const args = [...pre, '-i', inName, '-vn', '-map_metadata', '-1'];
    if (complex) {
      const chain = filters.length ? `${complex};[c]${filters.join(',')}[o]` : complex.replace('[c]', '[o]');
      args.push('-filter_complex', chain, '-map', '[o]');
    } else if (filters.length) {
      args.push('-af', filters.join(','));
    }
    args.push(...FORMATS[fmtKey].args(els.quality.value), outName);
    return { args, outLen };
  }

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

    const fmtKey = els.format.value;
    const inName = `input.${extOf(st.file.name)}`;
    const outName = `output.${fmtKey}`;
    let ff, onLog;
    try {
      ff = await loadEngine((p) => setP(p * 0.3, `Loading audio engine (one time, ~30 MB)… ${Math.round(p * 100)}%`));
      setP(0.3, 'Reading file…');
      await ff.writeFile(inName, new Uint8Array(await st.file.arrayBuffer()));
      const { args, outLen } = buildArgs(inName, outName, fmtKey);
      const logTail = [];
      onLog = ({ message }) => {
        logTail.push(message); if (logTail.length > 30) logTail.shift();
        const m = message.match(/time=(\d+):(\d+):([\d.]+)/);
        if (m) {
          const t = +m[1] * 3600 + +m[2] * 60 + +m[3];
          const r = Math.min(1, t / Math.max(outLen, 0.1));
          setP(0.3 + r * 0.7, `Converting… ${Math.round(r * 100)}%`);
        }
      };
      ff.on('log', onLog);
      const code = await ff.exec(args);
      if (code !== 0) {
        console.error('ffmpeg failed', args.join(' '), '\n' + logTail.join('\n'));
        throw new Error('Conversion failed. The file may be damaged or use an unusual format.');
      }
      const data = await ff.readFile(outName);
      const blob = new Blob([data.buffer], { type: FORMATS[fmtKey].mime });
      st.outURL = URL.createObjectURL(blob);
      const fileName = `${baseName(st.file.name)}${cfg.suffix}.${fmtKey}`;
      setP(1, `Done · ${(blob.size / 1048576).toFixed(2)} MB`);
      els.go.textContent = `⬇ Download ${fmtKey.toUpperCase()}`;
      els.go.classList.add('ok');
      els.go.onclick = () => {
        const a = document.createElement('a');
        a.href = st.outURL; a.download = fileName;
        document.body.appendChild(a); a.click(); a.remove();
        track('download', { tool: root.dataset.tool, format: fmtKey });
      };
      track('converted', { tool: root.dataset.tool, format: fmtKey });
      if (fmtKey === 'm4r') els.hint.textContent = 'iPhone: open the file with GarageBand, or drag it into Finder/iTunes with your phone connected, then choose it in Settings → Sounds.';
    } catch (e) {
      // A failed run can leave the wasm engine aborted: drop it so the next try starts fresh.
      if (ff) { try { ff.terminate(); } catch {} enginePromise = null; ff = null; }
      error(e?.message || 'Something went wrong.');
      els.progress.style.display = 'none';
      els.go.textContent = 'Convert';
    } finally {
      if (ff) {
        if (onLog) ff.off('log', onLog);
        await ff.deleteFile(inName).catch(() => {});
        await ff.deleteFile(outName).catch(() => {});
      }
      st.busy = false;
      els.go.disabled = false;
    }
  }
}

document.querySelectorAll('[data-tool]').forEach(mountTool);
