/**
 * Standalone polling worker.
 *
 * Runs one full pipeline pass (fetch + analyze) then exits. Use this as a
 * Render Cron Job command (`npm run poll`) as an alternative to hitting the
 * HTTP /api/admin/refresh endpoint. Reads all config from env.
 */

import { runPipeline } from '../src/lib/pipeline';
import { prisma } from '../src/lib/prisma';

async function main() {
  const startedAt = new Date().toISOString();
  console.log(`[poll] starting pipeline run at ${startedAt}`);

  const result = await runPipeline();

  console.log('[poll] fetch:', JSON.stringify(result.fetch));
  console.log('[poll] analyze:', JSON.stringify(result.analyze));
  console.log('[poll] done');
}

main()
  .catch((err) => {
    console.error('[poll] fatal error:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
