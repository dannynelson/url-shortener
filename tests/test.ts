import 'expect-puppeteer';

import redis from '../modules/redis';

jest.setTimeout(60000);

const BASE_URL = 'http://localhost:8080';
const GOOGLE_URL = 'https://www.google.com';
const GOOGLE_SLUG = '8ffd';

afterEach((done) => redis.client.flushdb(done));
afterAll((done) => redis.client.quit(done));

describe('Shorten URL', () => {
  beforeEach(async () => {
    await page.goto(`${BASE_URL}/`);
  });

  it('displays "URL Shortener" text on page', async () => {
    await expect(page).toMatch('URL Shortener');
  });

  it('submits URL to be shortened', async () => {
    await expect(page).toFill('input[name="shorten"]', GOOGLE_URL);
    await page.click('button');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await expect(page).toMatch(`${BASE_URL}/${GOOGLE_SLUG}`);
  });

  it('redirects to original URL when clicking shortened URL', async () => {
    await expect(page).toFill('input[name="shorten"]', GOOGLE_URL);
    await page.click('button');
    await expect(page).toMatch(`${BASE_URL}/${GOOGLE_SLUG}`);
    await page.click('a');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await expect(page).toMatch('Google');
  });
});

describe('View shortened URL link', () => {
  beforeEach(async () => {
    await page.goto(`${BASE_URL}/link/${GOOGLE_SLUG}`);
  });

  it('displays "URL Shortener" text on page', async () => {
    await expect(page).toMatch('URL Shortener');
  });

  it('displays shortened URL link', async () => {
    await expect(page).toMatch(`${BASE_URL}/${GOOGLE_SLUG}`);
  });

  it('navigates back to index page on button click', async () => {
    await page.click('button');
    await expect(page).toMatchElement('input');
    await expect(page).not.toMatch(`${BASE_URL}/${GOOGLE_SLUG}`);
  });
});

describe('Missing shortened URL', () => {
  beforeEach(async () => {
    await page.goto(`${BASE_URL}/foobar`);
  });

  it('displays a 404 page', async () => {
    await expect(page).toMatch('404');
  });
});
