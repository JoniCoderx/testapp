/**
 * Next.js instrumentation hook (runs once at server boot).
 *
 * Node-only work lives in a separate module that is dynamically imported ONLY
 * when NEXT_RUNTIME === 'nodejs'. This lets Next drop it from the edge bundle
 * (which cannot use `node:child_process`) while still running it on the Node
 * server (Render).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { ensureSchema } = await import('@/lib/ensure-schema');
    await ensureSchema();
  }
}
