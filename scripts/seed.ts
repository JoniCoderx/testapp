/**
 * Demo seed CLI.
 *
 * Inserts clearly-labeled sample posts (deduped) so the dashboard has content
 * even when public Nitter instances are unavailable, then analyzes them.
 *
 * By default it only seeds when the DB is empty. Pass --force to seed anyway.
 *
 *   npm run db:seed
 *   npm run db:seed -- --force
 */

import { seedDemoPosts } from '../src/lib/pipeline';
import { prisma } from '../src/lib/prisma';

async function main() {
  const force = process.argv.includes('--force');
  const result = await seedDemoPosts({ force });
  if (result.skipped) {
    console.log('[seed] database already has posts — skipping (use --force to override)');
  } else {
    console.log(
      `[seed] inserted ${result.inserted}; analyze:`,
      JSON.stringify(result.analyze),
    );
  }
}

main()
  .catch((err) => {
    console.error('[seed] failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
