import md5 from 'md5';
import faker from 'faker';
import { mocked } from 'ts-jest/utils';
import { upsertUniqueSlugForUrl, getUrlFromSlug } from '.';
import redis from 'modules/redis';

jest.mock('md5');
const md5Mock = mocked(md5);

jest.mock('modules/redis');
const redisMock = mocked(redis);

describe('upsertUniqueSlugForUrl', () => {
  it('caches and returns a slug using first 6 characters of md5 hash by default', async () => {
    const hash = faker.random.alphaNumeric(32);
    const expectedSlug = hash.slice(0, 6);
    md5Mock.mockReturnValueOnce(hash);
    const slug = await upsertUniqueSlugForUrl('https://www.google.com');
    expect(redis.set).toHaveBeenCalledTimes(1);
    expect(redis.set).toHaveBeenCalledWith(
      expectedSlug,
      'https://www.google.com'
    );
    expect(slug).toBe(expectedSlug);
  });

  it('returns and does not cache if slug already cached for this URL', async () => {
    const hash = faker.random.alphaNumeric(32);
    const expectedSlug = hash.slice(0, 6);
    const url = faker.internet.url();
    md5Mock.mockReturnValueOnce(hash);
    redisMock.get.mockResolvedValueOnce(url);
    const slug = await upsertUniqueSlugForUrl(url);
    expect(redis.set).toHaveBeenCalledTimes(0);
    expect(slug).toBe(expectedSlug);
  });

  it('caches and returns a new slug with an additional hash character if 6 char slug already cached for a different URL', async () => {
    const hash = faker.random.alphaNumeric(32);
    const expectedSlug = hash.slice(0, 7);
    md5Mock.mockReturnValueOnce(hash);
    redisMock.get.mockResolvedValueOnce(faker.internet.url());
    const slug = await upsertUniqueSlugForUrl(faker.internet.url());
    expect(slug).toBe(expectedSlug);
  });

  it('caches and returns a new slug with an additional hash character if 6 and 7 char slug already cached for a different URL', async () => {
    const hash = faker.random.alphaNumeric(32);
    const expectedSlug = hash.slice(0, 8);
    md5Mock.mockReturnValueOnce(hash);
    redisMock.get.mockResolvedValueOnce(faker.internet.url());
    redisMock.get.mockResolvedValueOnce(faker.internet.url());
    const slug = await upsertUniqueSlugForUrl(faker.internet.url());
    expect(slug).toBe(expectedSlug);
  });

  it('errors if passing invalid URL', async () => {
    await expect(upsertUniqueSlugForUrl('foobar')).rejects.toThrow(
      'Invalid HTTP URL'
    );
  });
});

describe('getUrlFromSlug', () => {
  it('returns null if slug not cached', async () => {
    redisMock.get.mockResolvedValueOnce(null);
    const url = await getUrlFromSlug(faker.random.alphaNumeric(6));
    expect(url).toBeNull();
  });

  it('returns url if slug cached', async () => {
    const slug = faker.random.alphaNumeric(6);
    const url = faker.internet.url();
    redisMock.get.mockResolvedValueOnce(url);
    const foundUrl = await getUrlFromSlug(slug);
    expect(redisMock.get).toHaveBeenCalledTimes(1);
    expect(redisMock.get).toBeCalledWith(slug);
    expect(foundUrl).toBe(url);
  });
});
