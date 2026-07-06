/**
 * Source registry.
 *
 * Central place to choose the active post source. Today it returns a
 * NitterSource, but swapping in an X API / RSSHub / scraping-provider
 * implementation is a one-line change here — nothing else in the app needs to
 * know which source is in use.
 */

import { NitterSource } from './nitter';
import { PostSource } from './types';

export * from './types';

let cached: PostSource | null = null;

export function getPostSource(): PostSource {
  if (cached) return cached;

  // To add a new source, implement `PostSource` and select it here, e.g.
  // based on a SOURCE_PROVIDER env var:
  //
  //   switch (process.env.SOURCE_PROVIDER) {
  //     case 'xapi':   cached = new XApiSource(); break;
  //     case 'rsshub': cached = new RssHubSource(); break;
  //     default:       cached = new NitterSource();
  //   }
  cached = new NitterSource();
  return cached;
}
