// Self-hosted YouTube -> MP3 / MP4 converter.
// Zero npm dependencies: Node's http module + the yt-dlp and ffmpeg binaries.
//
//   GET  /api/search?q=...            -> up to 8 YouTube results for a song name
//   GET  /api/info?url=...            -> title, thumbnail, duration, available qualities
//   POST /api/convert {url,type,quality} -> { id }  (starts a background job)
//   GET  /api/job/:id                 -> { status, progress, stage, filename, error }
//   GET  /api/file/:id                -> the finished file (attachment)

const http = require('node:http');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');

const PORT = Number(process.env.PORT || 8080);
const YTDLP = process.env.YTDLP_PATH || 'yt-dlp';
const TMP_DIR = process.env.TMP_DIR || path.join(__dirname, 'tmp');
const PUBLIC_DIR = path.join(__dirname, 'public');
const MAX_DURATION = Number(process.env.MAX_DURATION_SECONDS || 3 * 60 * 60); // 3h
const MAX_CONCURRENT = Number(process.env.MAX_CONCURRENT_JOBS || 3);
const JOB_TTL_MS = Number(process.env.JOB_TTL_MINUTES || 20) * 60 * 1000;
const RATE_LIMIT = Number(process.env.RATE_LIMIT_PER_HOUR || 30); // conversions per IP per hour

// Only these hosts are accepted. Restricting the host list keeps yt-dlp's
// generic extractor from being used to fetch arbitrary (e.g. internal) URLs.
const ALLOWED_HOSTS = (process.env.ALLOWED_HOSTS ||
  'youtube.com,www.youtube.com,m.youtube.com,music.youtube.com,youtu.be')
  .split(',').map((h) => h.trim().toLowerCase()).filter(Boolean);

// Optional cookies.txt (Netscape format) for when YouTube asks the server to
// "confirm you're not a bot" -- common on datacenter IPs.
const COOKIES_FILE = process.env.COOKIES_FILE || '';
const BASE_ARGS = COOKIES_FILE ? ['--cookies', COOKIES_FILE] : [];

const MP3_BITRATES = ['128', '192', '256', '320'];
const MP4_HEIGHTS = ['360', '480', '720', '1080'];

fs.mkdirSync(TMP_DIR, { recursive: true });

// ---------- helpers ----------

function sendJson(res, status, body) {
  const data = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(data),
    'Cache-Control': 'no-store',
  });
  res.end(data);
}

function normalizeUrl(input) {
  let u;
  try {
    u = new URL(String(input || '').trim());
  } catch {
    return null;
  }
  if (!/^https?:$/.test(u.protocol)) return null;
  if (!ALLOWED_HOSTS.includes(u.hostname.toLowerCase())) return null;
  return u.toString();
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  return (fwd ? String(fwd).split(',')[0] : req.socket.remoteAddress || '').trim();
}

function runYtdlp(args, { timeoutMs = 60_000 } = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(YTDLP, [...BASE_ARGS, ...args], { stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    const timer = setTimeout(() => proc.kill('SIGKILL'), timeoutMs);
    proc.stdout.on('data', (d) => (out += d));
    proc.stderr.on('data', (d) => (err += d));
    proc.on('error', (e) => {
      clearTimeout(timer);
      reject(e);
    });
    proc.on('close', (code) => {
      clearTimeout(timer);
      if (code === 0) resolve(out);
      else reject(new Error(cleanError(err) || `yt-dlp exited with code ${code}`));
    });
  });
}

function cleanError(stderr) {
  const line = String(stderr).split('\n').reverse().find((l) => l.includes('ERROR'));
  return (line || '').replace(/^.*?ERROR:\s*/, '').replace(/\[[^\]]+\]\s*\S+:\s*/, '').slice(0, 300);
}

function safeFilename(name) {
  return String(name || 'download')
    .replace(/[\\/:*?"<>|\x00-\x1f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 150) || 'download';
}

function readBody(req, limit = 10_000) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > limit) {
        reject(new Error('Body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

// ---------- rate limiting ----------

const hits = new Map(); // ip -> [timestamps]
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 3600_000);
  if (list.length >= RATE_LIMIT) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

// ---------- jobs ----------

const jobs = new Map(); // id -> job
let running = 0;
const queue = [];

function publicJob(job) {
  return {
    id: job.id,
    status: job.status, // queued | running | done | error
    stage: job.stage,
    progress: job.progress,
    filename: job.filename,
    size: job.size,
    error: job.error,
  };
}

function startNext() {
  while (running < MAX_CONCURRENT && queue.length) {
    const job = queue.shift();
    running++;
    runJob(job).finally(() => {
      running--;
      startNext();
    });
  }
}

async function runJob(job) {
  job.status = 'running';
  job.stage = 'Fetching video info';
  const dir = path.join(TMP_DIR, job.id);
  await fsp.mkdir(dir, { recursive: true });

  const args = [
    '--no-playlist',
    '--no-warnings',
    '--newline',
    '--restrict-filenames',
    '--match-filter', `duration <=? ${MAX_DURATION}`,
    '--progress-template', 'download:PROGRESS %(progress._percent_str)s',
    '-o', path.join(dir, 'media.%(ext)s'),
  ];

  if (job.type === 'mp3') {
    args.push(
      '-f', 'bestaudio/best',
      '-x', '--audio-format', 'mp3', '--audio-quality', `${job.quality}K`,
      '--embed-metadata', '--embed-thumbnail', '--convert-thumbnails', 'jpg',
    );
  } else {
    const h = job.quality;
    args.push(
      '-f', `bv*[height<=${h}][ext=mp4]+ba[ext=m4a]/bv*[height<=${h}]+ba/b[height<=${h}]/b`,
      '--merge-output-format', 'mp4',
      '--remux-video', 'mp4',
    );
  }
  args.push('--', job.url);

  await new Promise((resolve) => {
    const proc = spawn(YTDLP, [...BASE_ARGS, ...args], { stdio: ['ignore', 'pipe', 'pipe'] });
    job.proc = proc;
    let stderr = '';
    let downloads = 0;
    const timer = setTimeout(() => proc.kill('SIGKILL'), 30 * 60 * 1000);

    const onLine = (line) => {
      const m = line.match(/PROGRESS\s+([\d.]+)%/);
      if (m) {
        const pct = parseFloat(m[1]);
        // MP4 jobs download video then audio: map them to 0-70% and 70-90%.
        if (pct < 1 && job._lastPct > 90) downloads++;
        job._lastPct = pct;
        const base = job.type === 'mp4' ? (downloads ? 70 : 0) : 0;
        const span = job.type === 'mp4' ? (downloads ? 20 : 70) : 90;
        job.progress = Math.min(95, Math.round(base + (pct / 100) * span));
        job.stage = 'Downloading';
      } else if (/\[(ExtractAudio|Merger|VideoRemuxer|EmbedThumbnail|Metadata)/.test(line)) {
        job.stage = job.type === 'mp3' ? 'Converting to MP3' : 'Merging video and audio';
        job.progress = Math.max(job.progress, 92);
      } else if (/does not pass filter/.test(line)) {
        job.tooLong = true;
      }
    };

    let buf = '';
    proc.stdout.on('data', (d) => {
      buf += d;
      const lines = buf.split('\n');
      buf = lines.pop();
      lines.forEach(onLine);
    });
    proc.stderr.on('data', (d) => (stderr += d));
    proc.on('error', (e) => {
      clearTimeout(timer);
      job.status = 'error';
      job.error = e.code === 'ENOENT' ? 'yt-dlp is not installed on the server.' : e.message;
      resolve();
    });
    proc.on('close', async (code) => {
      clearTimeout(timer);
      job.proc = null;
      if (job.status === 'error') return resolve();
      const files = (await fsp.readdir(dir).catch(() => [])).filter((f) => f.endsWith('.' + job.type));
      if (code === 0 && files.length) {
        job.file = path.join(dir, files[0]);
        job.size = (await fsp.stat(job.file)).size;
        job.status = 'done';
        job.stage = 'Ready';
        job.progress = 100;
      } else {
        job.status = 'error';
        job.error = job.tooLong
          ? `Video is longer than the ${Math.round(MAX_DURATION / 60)}-minute limit.`
          : cleanError(stderr) || 'Conversion failed.';
      }
      resolve();
    });
  });
}

// Remove finished jobs and their files after JOB_TTL.
setInterval(() => {
  const now = Date.now();
  for (const [id, job] of jobs) {
    if (now - job.created > JOB_TTL_MS) {
      if (job.proc) job.proc.kill('SIGKILL');
      fsp.rm(path.join(TMP_DIR, id), { recursive: true, force: true }).catch(() => {});
      jobs.delete(id);
    }
  }
}, 60_000).unref();

// ---------- API handlers ----------

async function handleSearch(req, res, params) {
  const q = (params.get('q') || '').trim().slice(0, 200);
  if (!q) return sendJson(res, 400, { error: 'Missing search query.' });
  try {
    const out = await runYtdlp(['--flat-playlist', '-J', '--no-warnings', '--', `ytsearch8:${q}`], { timeoutMs: 30_000 });
    const data = JSON.parse(out);
    const results = (data.entries || []).map((e) => ({
      id: e.id,
      title: e.title,
      url: `https://www.youtube.com/watch?v=${e.id}`,
      duration: e.duration || null,
      channel: e.channel || e.uploader || '',
      thumbnail: `https://i.ytimg.com/vi/${e.id}/mqdefault.jpg`,
    }));
    sendJson(res, 200, { results });
  } catch (e) {
    sendJson(res, 502, { error: e.message || 'Search failed.' });
  }
}

async function handleInfo(req, res, params) {
  const url = normalizeUrl(params.get('url'));
  if (!url) return sendJson(res, 400, { error: 'Please paste a valid YouTube link.' });
  try {
    const out = await runYtdlp(['-J', '--no-playlist', '--no-warnings', '--', url], { timeoutMs: 45_000 });
    const d = JSON.parse(out);
    const heights = [...new Set((d.formats || []).map((f) => f.height).filter(Boolean))];
    const mp4 = MP4_HEIGHTS.filter((h) => heights.some((x) => x >= Number(h)) || h === '360');
    sendJson(res, 200, {
      id: d.id,
      url: d.webpage_url || url,
      title: d.title,
      channel: d.channel || d.uploader || '',
      duration: d.duration || null,
      thumbnail: d.thumbnail,
      tooLong: d.duration ? d.duration > MAX_DURATION : false,
      qualities: { mp3: MP3_BITRATES, mp4 },
    });
  } catch (e) {
    sendJson(res, 502, { error: e.message || 'Could not read that video.' });
  }
}

async function handleConvert(req, res) {
  let body;
  try {
    body = JSON.parse((await readBody(req)) || '{}');
  } catch {
    return sendJson(res, 400, { error: 'Invalid request.' });
  }
  const url = normalizeUrl(body.url);
  const type = body.type === 'mp4' ? 'mp4' : body.type === 'mp3' ? 'mp3' : null;
  const allowed = type === 'mp3' ? MP3_BITRATES : MP4_HEIGHTS;
  const quality = String(body.quality || '');
  if (!url) return sendJson(res, 400, { error: 'Please paste a valid YouTube link.' });
  if (!type || !allowed.includes(quality)) return sendJson(res, 400, { error: 'Unsupported format or quality.' });
  if (rateLimited(clientIp(req))) return sendJson(res, 429, { error: 'Too many conversions. Please try again later.' });

  const id = crypto.randomBytes(12).toString('hex');
  const job = {
    id, url, type, quality,
    title: safeFilename(body.title),
    status: 'queued', stage: 'Waiting in queue', progress: 0,
    created: Date.now(), _lastPct: 0,
  };
  job.filename = `${job.title}${type === 'mp3' ? ` (${quality}kbps)` : ` (${quality}p)`}.${type}`;
  jobs.set(id, job);
  queue.push(job);
  startNext();
  sendJson(res, 202, { id });
}

function handleJob(req, res, id) {
  const job = jobs.get(id);
  if (!job) return sendJson(res, 404, { error: 'Job not found or expired.' });
  sendJson(res, 200, publicJob(job));
}

function handleFile(req, res, id) {
  const job = jobs.get(id);
  if (!job || job.status !== 'done' || !job.file) return sendJson(res, 404, { error: 'File not ready or expired.' });
  const ascii = job.filename.replace(/[^\x20-\x7e]/g, '_').replace(/"/g, "'");
  res.writeHead(200, {
    'Content-Type': job.type === 'mp3' ? 'audio/mpeg' : 'video/mp4',
    'Content-Length': job.size,
    'Content-Disposition': `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(job.filename)}`,
    'Cache-Control': 'no-store',
  });
  fs.createReadStream(job.file).pipe(res);
}

// ---------- static files ----------

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

async function serveStatic(req, res, pathname) {
  const rel = pathname === '/' ? 'index.html' : decodeURIComponent(pathname).replace(/^\/+/, '');
  const file = path.normalize(path.join(PUBLIC_DIR, rel));
  if (!file.startsWith(PUBLIC_DIR + path.sep)) return sendJson(res, 403, { error: 'Forbidden' });
  try {
    const stat = await fsp.stat(file);
    if (!stat.isFile()) throw new Error('not a file');
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
      'Content-Length': stat.size,
    });
    fs.createReadStream(file).pipe(res);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
}

// ---------- server ----------

const server = http.createServer(async (req, res) => {
  const { pathname, searchParams } = new URL(req.url, 'http://localhost');
  try {
    if (pathname === '/healthz') return sendJson(res, 200, { ok: true });
    if (pathname === '/api/search' && req.method === 'GET') return await handleSearch(req, res, searchParams);
    if (pathname === '/api/info' && req.method === 'GET') return await handleInfo(req, res, searchParams);
    if (pathname === '/api/convert' && req.method === 'POST') return await handleConvert(req, res);
    let m;
    if ((m = pathname.match(/^\/api\/job\/([a-f0-9]{24})$/))) return handleJob(req, res, m[1]);
    if ((m = pathname.match(/^\/api\/file\/([a-f0-9]{24})$/))) return handleFile(req, res, m[1]);
    if (pathname.startsWith('/api/')) return sendJson(res, 404, { error: 'Not found' });
    if (req.method !== 'GET' && req.method !== 'HEAD') return sendJson(res, 405, { error: 'Method not allowed' });
    return await serveStatic(req, res, pathname);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) sendJson(res, 500, { error: 'Server error' });
  }
});

server.listen(PORT, () => console.log(`Converter running on http://localhost:${PORT}`));
