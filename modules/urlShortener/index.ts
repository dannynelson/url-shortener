import md5 from 'md5';

import redis from 'modules/redis';
import isValidHttpUrl from 'modules/isValidHttpUrl';

/**
 * URL shortening strategy:
 * 1. hash the URL
 * 2. take the first 6 characters
 * 3. if there is a collision, increase the character count
 *
 * https://en.wikipedia.org/wiki/URL_shortening#:~:text=URL%20shortening%20is%20a%20technique,that%20has%20a%20long%20URL.&text=Often%20the%20redirect%20domain%20name%20is%20shorter%20than%20the%20original%20one.
 */

const MIN_URL_SLUG_LENGTH = 6;
export async function upsertUniqueSlugForUrl(url: string): Promise<string> {
  if (!isValidHttpUrl(url)) {
    throw new Error('Invalid HTTP URL');
  }
  const urlHash = md5(url);
  for (
    let slugLength = MIN_URL_SLUG_LENGTH;
    slugLength < urlHash.length;
    slugLength++
  ) {
    const testSlug = urlHash.slice(0, slugLength);
    // Usually, the first test slug will work without collisions.
    // If we shorten millions of URLs and start to see frequent collisions, consider refactoring this
    // to not use a for/await loop.
    const cachedUrlForSlug = await getUrlFromSlug(testSlug);
    if (cachedUrlForSlug == null) {
      await redis.set(testSlug, url);
      return testSlug;
    }
    if (url === cachedUrlForSlug) {
      return testSlug;
    }
  }
  throw new Error('Unable to find a unique slug for URL');
}

export async function getUrlFromSlug(slug: string): Promise<string | null> {
  return redis.get(slug);
}
