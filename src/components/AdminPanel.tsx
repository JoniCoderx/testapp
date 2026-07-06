'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SECRET_KEY = 'mpx_admin_secret';

type ActionState = { running: boolean; result: string | null; error: string | null };
const idle: ActionState = { running: false, result: null, error: null };

interface DebugInfo {
  dbConnected: boolean;
  tablesExist: boolean;
  tables: Record<string, boolean>;
  counts: { accounts: number; totalPosts: number; totalAnalyzed: number; pending: number };
  lastFetchLog: {
    success: boolean;
    handle: string | null;
    source: string | null;
    postsFound: number;
    postsNew: number;
    errorMessage: string | null;
    createdAt: string;
  } | null;
  nitterInstances: string[];
  openaiConfigured: boolean;
  openaiModel: string;
  demoFallback: boolean;
  nodeEnv: string;
  lastError: string | null;
}

export default function AdminPanel() {
  const [secret, setSecret] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [action, setAction] = useState<ActionState>(idle);
  const [debug, setDebug] = useState<DebugInfo | null>(null);
  const [debugError, setDebugError] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(SECRET_KEY);
    if (stored) {
      setSecret(stored);
      setUnlocked(true);
    }
  }, []);

  const loadDebug = useCallback(
    async (sec: string) => {
      try {
        const res = await fetch('/api/admin/debug', {
          // Send both header forms — some proxies strip Authorization.
          headers: { Authorization: `Bearer ${sec}`, 'x-admin-secret': sec },
          cache: 'no-store',
        });
        if (res.status === 401) {
          setDebugError('Wrong secret. Use the exact ADMIN_SECRET from Render env vars.');
          return false;
        }
        if (res.status === 503) {
          setDebugError('ADMIN_SECRET is not configured on the server. Set it in the Render dashboard, then redeploy.');
          return false;
        }
        if (!res.ok) {
          setDebugError(`Diagnostics unavailable (HTTP ${res.status}).`);
          return false;
        }
        const data = await res.json();
        setDebug(data as DebugInfo);
        setDebugError(null);
        return true;
      } catch {
        setDebugError('Failed to reach the server.');
        return false;
      }
    },
    [],
  );

  useEffect(() => {
    if (unlocked && secret) loadDebug(secret);
  }, [unlocked, secret, loadDebug]);

  const unlock = async () => {
    const val = input.trim();
    if (!val) return;
    const ok = await loadDebug(val);
    if (ok) {
      sessionStorage.setItem(SECRET_KEY, val);
      setSecret(val);
      setUnlocked(true);
      setInput('');
    }
    // On failure, loadDebug already set a specific error message.
  };

  const lock = () => {
    sessionStorage.removeItem(SECRET_KEY);
    setSecret('');
    setUnlocked(false);
    setAction(idle);
    setDebug(null);
    setDebugError(null);
  };

  const run = useCallback(
    async (path: string, label: string) => {
      setAction({ running: true, result: null, error: null });
      try {
        const res = await fetch(path, {
          method: 'POST',
          headers: { Authorization: `Bearer ${secret}`, 'x-admin-secret': secret },
        });
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          setAction({ running: false, result: null, error: 'Unauthorized — wrong ADMIN_SECRET.' });
          lock();
          return;
        }
        if (!res.ok) {
          setAction({ running: false, result: null, error: data?.error || `${label} failed (${res.status})` });
          return;
        }
        setAction({ running: false, result: JSON.stringify(data, null, 2), error: null });
        loadDebug(secret);
      } catch (err) {
        setAction({ running: false, result: null, error: err instanceof Error ? err.message : `${label} failed` });
      }
    },
    [secret, loadDebug],
  );

  // ---- Locked gate ---------------------------------------------------------
  if (!unlocked) {
    return (
      <div className="mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-8"
        >
          <div className="mb-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Restricted
          </div>
          <h1 className="text-2xl font-bold text-white">Admin console</h1>
          <p className="mt-2 text-sm text-white/50">
            This password is the{' '}
            <code className="text-white/80">ADMIN_SECRET</code> value from your
            Render environment variables. There is no default password.
          </p>
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/55">
            <div className="mb-1 font-semibold text-white/70">
              Where to find it
            </div>
            Open <span className="text-white/80">Render → your Web Service →
            Environment → </span>
            <code className="text-accent-cyan">ADMIN_SECRET</code>, and copy the
            exact value.
          </div>
          <p className="mt-3 text-xs text-white/40">
            It&apos;s held only in this browser tab — never stored server-side or
            in the repo.
          </p>
          <div className="mt-6 space-y-3">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && unlock()}
              placeholder="ADMIN_SECRET"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-accent-cyan/50"
              autoFocus
            />
            {debugError && (
              <p className="text-xs text-rose-300">{debugError}</p>
            )}
            <button onClick={unlock} className="btn-primary w-full">
              Unlock console
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---- Unlocked console ----------------------------------------------------
  const yesNo = (b: boolean | undefined) =>
    b === undefined ? '—' : b ? 'yes' : 'no';
  const dot = (b: boolean | undefined) =>
    b ? 'bg-emerald-400' : 'bg-rose-400';

  const actions = [
    { label: 'Run full refresh', path: '/api/admin/refresh', desc: 'Fetch posts → analyze pending → refresh status.', primary: true },
    { label: 'Fetch posts', path: '/api/fetch', desc: 'Poll all tracked accounts for new posts.' },
    { label: 'Analyze pending', path: '/api/analyze', desc: 'Run AI analysis on un-analyzed posts.' },
    { label: 'Seed demo data', path: '/api/admin/seed', desc: 'Insert labeled demo posts if the DB is empty.' },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin console</h1>
          <p className="mt-1 text-sm text-white/50">Manual controls · secret held in this tab only.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => loadDebug(secret)} className="btn-ghost !py-2 text-xs">
            Refresh
          </button>
          <button onClick={lock} className="btn-ghost !py-2 text-xs">
            Lock
          </button>
        </div>
      </div>

      {/* Diagnostics */}
      <div className="mt-6 glass rounded-2xl p-5">
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/50">
          Production diagnostics
        </div>
        {debug ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 text-sm">
              <Row label="DB connected" ok={debug.dbConnected} value={yesNo(debug.dbConnected)} dot={dot} />
              <Row label="Tables exist" ok={debug.tablesExist} value={yesNo(debug.tablesExist)} dot={dot} />
              <Row label="OpenAI configured" ok={debug.openaiConfigured} value={debug.openaiConfigured ? debug.openaiModel : 'heuristic'} dot={dot} />
              <div className="flex items-center justify-between">
                <span className="text-white/50">Demo fallback</span>
                <span className="font-mono text-white/80">{yesNo(debug.demoFallback)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Environment</span>
                <span className="font-mono text-white/80">{debug.nodeEnv}</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/50">Total posts</span>
                <span className="font-mono text-white/90">{debug.counts.totalPosts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Total analyzed</span>
                <span className="font-mono text-white/90">{debug.counts.totalAnalyzed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Pending analysis</span>
                <span className="font-mono text-white/90">{debug.counts.pending}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Sources configured</span>
                <span className="font-mono text-white/90">{debug.nitterInstances.length}</span>
              </div>
            </div>

            <div className="sm:col-span-2 border-t border-white/[0.06] pt-3 text-xs">
              <div className="text-white/40">Last fetch log</div>
              {debug.lastFetchLog ? (
                <div className="mt-1 font-mono text-white/70">
                  {new Date(debug.lastFetchLog.createdAt).toLocaleString()} ·{' '}
                  {debug.lastFetchLog.success ? '✅' : '❌'}{' '}
                  {debug.lastFetchLog.handle || debug.lastFetchLog.source || ''}{' '}
                  {debug.lastFetchLog.success
                    ? `(+${debug.lastFetchLog.postsNew} new)`
                    : `— ${debug.lastFetchLog.errorMessage || 'error'}`}
                </div>
              ) : (
                <div className="mt-1 text-white/50">No fetches recorded yet.</div>
              )}
              {debug.lastError && (
                <div className="mt-2 rounded-lg border border-rose-400/20 bg-rose-500/[0.06] p-2 text-rose-200/80">
                  Last error: {debug.lastError}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-white/40">{debugError || 'Loading diagnostics…'}</div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {actions.map((a) => (
          <div key={a.path} className="glass rounded-2xl p-4">
            <div className="text-sm font-semibold text-white">{a.label}</div>
            <p className="mt-1 text-xs text-white/45">{a.desc}</p>
            <button
              onClick={() => run(a.path, a.label)}
              disabled={action.running}
              className={`mt-3 w-full !py-2 text-xs disabled:opacity-60 ${a.primary ? 'btn-primary' : 'btn-ghost'}`}
            >
              {action.running ? 'Running…' : 'Run'}
            </button>
          </div>
        ))}
      </div>

      {/* Output */}
      {(action.result || action.error) && (
        <div className="mt-4">
          {action.error ? (
            <div className="rounded-2xl border border-rose-400/25 bg-rose-500/[0.06] p-4 text-sm text-rose-200">
              {action.error}
            </div>
          ) : (
            <pre className="max-h-96 overflow-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-emerald-200/90">
              {action.result}
            </pre>
          )}
        </div>
      )}

      <p className="mt-6 text-center text-[11px] text-white/30">
        Automatic polling runs on the Render cron job every ~15 min. These
        controls are for on-demand refresh and diagnostics.
      </p>
    </div>
  );
}

function Row({
  label,
  ok,
  value,
  dot,
}: {
  label: string;
  ok: boolean;
  value: string;
  dot: (b: boolean) => string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/50">{label}</span>
      <span className="flex items-center gap-2 font-mono text-white/80">
        <span className={`h-1.5 w-1.5 rounded-full ${dot(ok)}`} />
        {value}
      </span>
    </div>
  );
}
