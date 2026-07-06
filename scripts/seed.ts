/**
 * Optional demo seed.
 *
 * Inserts a handful of realistic sample posts (clearly marked as sample data)
 * so the dashboard has content to render even when public Nitter instances are
 * unavailable. Running analysis afterwards (`npm run analyze` or the dashboard
 * "Refresh feed" button) will decorate them with AI/heuristic assessments.
 *
 * Usage: npm run db:seed
 */

import { prisma } from '../src/lib/prisma';
import { ensureAccounts, analyzePending } from '../src/lib/pipeline';

interface Sample {
  handle: string;
  name: string;
  text: string;
  minutesAgo: number;
}

const SAMPLES: Sample[] = [
  {
    handle: 'elonmusk',
    name: 'Elon Musk',
    text: 'Dogecoin to the moon 🚀 The future of currency is being written right now.',
    minutesAgo: 12,
  },
  {
    handle: 'realDonaldTrump',
    name: 'Donald J. Trump',
    text: 'We will impose major new tariffs on foreign steel and aluminum to protect American workers and industry!',
    minutesAgo: 47,
  },
  {
    handle: 'BillGates',
    name: 'Bill Gates',
    text: 'AI and clean energy investment could reshape the global economy over the next decade. Cautiously optimistic.',
    minutesAgo: 95,
  },
  {
    handle: 'NASA',
    name: 'NASA',
    text: 'Our Artemis mission reaches a new milestone today as we prepare humanity to return to the Moon. 🌕',
    minutesAgo: 180,
  },
  {
    handle: 'narendramodi',
    name: 'Narendra Modi',
    text: 'India signs landmark trade and energy agreement to strengthen economic ties and secure future growth.',
    minutesAgo: 240,
  },
  {
    handle: 'taylorswift13',
    name: 'Taylor Swift',
    text: 'So excited to announce the next leg of the tour! Thank you to every single one of you 💜',
    minutesAgo: 300,
  },
];

async function main() {
  const accountMap = await ensureAccounts();
  let inserted = 0;

  for (let i = 0; i < SAMPLES.length; i++) {
    const s = SAMPLES[i];
    const accountId = accountMap.get(s.handle.toLowerCase());
    if (!accountId) continue;

    const sourcePostId = `sample-${s.handle}-${i}`;
    const existing = await prisma.post.findUnique({ where: { sourcePostId } });
    if (existing) continue;

    // Use a fixed base timestamp so re-seeds are deterministic-ish.
    const publishedAt = new Date(Date.now() - s.minutesAgo * 60_000);

    await prisma.post.create({
      data: {
        sourcePostId,
        url: `https://x.com/${s.handle}`,
        text: s.text,
        authorHandle: s.handle,
        authorName: s.name,
        publishedAt,
        source: 'sample:seed',
        accountId,
      },
    });
    inserted += 1;
  }

  console.log(`[seed] inserted ${inserted} sample post(s)`);
  const analysis = await analyzePending();
  console.log('[seed] analysis:', JSON.stringify(analysis));
}

main()
  .catch((err) => {
    console.error('[seed] failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
