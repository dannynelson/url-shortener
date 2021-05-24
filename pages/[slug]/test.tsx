import faker from 'faker';

const getUrlFromSlugMock = jest.fn();
jest.mock('modules/urlShortener', () => ({
  getUrlFromSlug: getUrlFromSlugMock,
}));

import { getServerSideProps } from './index.page';

describe('getServerSideProps', () => {
  it('errors if slug missing from url params', async () => {
    getUrlFromSlugMock.mockResolvedValueOnce(null);
    await expect(
      // @ts-expect-error TODO(dannynelson) properly mock getServerSideProps argument
      getServerSideProps({ params: {} })
    ).rejects.toThrowError('Expected slug to be defined');
  });

  it('returns notFound if url not found for slug', async () => {
    getUrlFromSlugMock.mockResolvedValueOnce(null);
    await expect(
      // @ts-expect-error TODO(dannynelson) properly mock getServerSideProps argument
      getServerSideProps({ params: { slug: faker.random.alphaNumeric(5) } })
    ).resolves.toEqual({
      notFound: true,
    });
  });

  it('returns redirect if url found for slug', async () => {
    const url = faker.internet.url();
    getUrlFromSlugMock.mockResolvedValueOnce(url);
    await expect(
      // @ts-expect-error TODO(dannynelson) properly mock getServerSideProps argument
      getServerSideProps({ params: { slug: faker.random.alphaNumeric(5) } })
    ).resolves.toEqual({
      redirect: {
        destination: url,
        permanent: true,
      },
    });
  });
});
