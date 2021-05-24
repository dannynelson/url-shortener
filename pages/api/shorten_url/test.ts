import faker from 'faker';
import { testApiHandler } from 'next-test-api-route-handler';

const upsertUniqueSlugForUrlMock = jest.fn();
jest.mock('modules/urlShortener', () => ({
  upsertUniqueSlugForUrl: upsertUniqueSlugForUrlMock,
}));

import handler from './index.page';

describe('/api/shorten_url', () => {
  it('calls upsertUniqueSlugForUrl with url and responds with shortened slug', async () => {
    const url = faker.internet.url();
    const slug = faker.random.alphaNumeric(6);
    upsertUniqueSlugForUrlMock.mockResolvedValueOnce(slug);
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({ url }),
        });
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body).toEqual(slug);
      },
    });
  });
});
