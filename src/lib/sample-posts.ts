import type { SerializedPost } from '@/lib/serialize';
import { heuristicAnalysis } from '@/lib/ai/analyze';

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

/**
 * Build clearly-labeled demo posts (no DB access). Used only by the emergency
 * fallback in /api/posts when the DB is empty and DEMO_FALLBACK is enabled.
 */
export function getSamplePosts(now: number = Date.now()): SerializedPost[] {
  return SAMPLES.map((s, i) => {
    const analysis = heuristicAnalysis(s.text);
    const publishedAt = new Date(now - s.minutesAgo * 60_000).toISOString();
    return {
      id: `demo-${i}`,
      sourcePostId: `demo-${s.handle}-${i}`,
      url: `https://x.com/${s.handle}`,
      text: s.text,
      authorHandle: s.handle,
      authorName: s.name,
      publishedAt,
      source: 'demo:sample',
      analysis: {
        summary: analysis.summary,
        globalMarketImpact: analysis.globalMarketImpact,
        cryptoImpact: analysis.cryptoImpact,
        impactScore: analysis.impactScore,
        sentiment: analysis.sentiment,
        tags: analysis.tags,
        model: 'demo-sample',
      },
    } satisfies SerializedPost;
  });
}
