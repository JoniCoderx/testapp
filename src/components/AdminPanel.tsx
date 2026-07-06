'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SECRET_KEY = 'mpx_admin_secret';

type ActionState = { running: boolean; result: string | null; error: string | null };

const idle: ActionState = { running: false, result: null, error: null };

export default function AdminPanel() {
  const [secret, setSecret] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [action, setAction] = useState<ActionState>(idle);
  const [health, setHealth] = useState<Record<string, unknown> | null>(null);

  // Restore secret from sessionStorage (client-side only, never persisted to
  // the repo or localStorage — cleared when the tab closes or on Lock).
  useEffect(() => {
    const stored = sessionStorage.getItem(SECRET_KEY);
    if (stored) {
      setSecret(stored);
      setUnlocked(true);
    }
  }, []);

  const loadHealth = useCallback(async () => {
    try {
      const res = await fetch('/api/health', { cache: 'no-store' });
      setHealth(await res.json());
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (unlocked) loadHealth();
  }, [unlocked, loadHealth]);

  const unlock = () => {
    const val = input.trim();
    if (!val) return;
    sessionStorage.setItem(SECRET_KEY, val);
    setSecret(val);
    setUnlocked(true);
    setInput('');
  };

  const lock = () => {
    sessionStorage.removeItem(SECRET_KEY);
    setSecret('');
    setUnlocked(false);
    setAction(idle);
    setHealth(null);
  };

  const run = useCallback(
    async (path: string, label: string) => {
      setAction({ running: true, result: null, error: null });
      try {
        const res = await fetch(path, {
          method: 'POST',
          headers: { Authorization: `Bearer ${secret}` },
        });
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          setAction({ running: false, result: null, error: 'Unauthorized — wrong ADMIN_SECRET.' });
          lock();
          return;
        }
        if (!res.ok) {
          setAction({
            running: false,
            result: null,
            error: data?.error || `${label} failed (${res.status})`,
          });
          return;
        }
        setAction({
          running: false,
          result: JSON.stringify(data, null, 2),
          error: null,
        });
        loadHealth();
      } catch (err) {
        setAction({
          running: false,
          result: null,
          error: err instanceof Error ? err.message : `${label} failed`,
        });
      }
    },
    [secret, loadHealth],
  );

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
            Enter the <code className="text-white/70">ADMIN_SECRET</code> to
            manually trigger fetch and analysis. The secret is held only in this
            browser tab and is never stored server-side or in the repo.
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
            <button onClick={unlock} className="btn-primary w-full">
              Unlock console
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const actions = [
    { label: 'Fetch posts', path: '/api/fetch', desc: 'Poll all tracked accounts for new posts.' },
    { label: 'Analyze pending', path: '/api/analyze', desc: 'Run AI analysis on un-analyzed posts.' },
    { label: 'Full refresh', path: '/api/admin/refresh', desc: 'Fetch, then analyze — the full pipeline.' },
  ];

  const checks = (health?.checks ?? {}) as Record<string, unknown>;
  const stats = (health?.stats ?? {}) as Record<string, unknown>;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin console</h1>
          <p className="mt-1 text-sm text-white/50">
            Manual controls · secret held in this tab only.
          </p>
        </div>
        <button onClick={lock} className="btn-ghost !py-2 text-xs">
          Lock
        </button>
      </div>

      {/* Health snapshot */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { k: 'Posts', v: String(stats.posts ?? '—') },
          { k: 'Analyzed', v: String(stats.analyzed ?? '—') },
          { k: 'Pending', v: String(stats.pending ?? '—') },
          { k: 'OpenAI', v: checks.openai ? 'on' : 'heuristic' },
        ].map((c) => (
          <div key={c.k} className="glass rounded-2xl px-4 py-3">
            <div className="text-[10px] uppercase tracking-wider text-white/40">{c.k}</div>
            <div className="mt-1 font-mono text-lg font-bold text-white">{c.v}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {actions.map((a) => (
          <div key={a.path} className="glass rounded-2xl p-4">
            <div className="text-sm font-semibold text-white">{a.label}</div>
            <p className="mt-1 text-xs text-white/45">{a.desc}</p>
            <button
              onClick={() => run(a.path, a.label)}
              disabled={action.running}
              className="btn-primary mt-3 w-full !py-2 text-xs disabled:opacity-60"
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
            <pre className="max-h-80 overflow-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-emerald-200/90">
              {action.result}
            </pre>
          )}
        </div>
      )}

      <p className="mt-6 text-center text-[11px] text-white/30">
        Note: automatic polling runs on the Render cron job every ~15 min. These
        controls are for on-demand refresh only.
      </p>
    </div>
  );
}
