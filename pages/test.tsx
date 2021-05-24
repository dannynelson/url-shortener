import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import fetch from 'node-fetch';

// @ts-expect-error setting global fetch for test environment
global.fetch = fetch;

const routerPushMock = jest.fn();
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter() {
    return { push: routerPushMock };
  },
}));

import IndexPage from './index.page';

const server = setupServer(
  rest.post('http://localhost/api/shorten_url', (_req, res, ctx) => {
    return res(ctx.json('shortslug'));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('IndexPage', () => {
  it('displays "URL Shortener" heading', () => {
    render(<IndexPage />);
    expect(screen.getByRole('heading')).toHaveTextContent('URL Shortener');
  });

  it('displays shorten URL form', () => {
    render(<IndexPage />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('submits URL to /api/shorten_url when form submitted', async () => {
    render(<IndexPage />);
    userEvent.type(screen.getByRole('textbox'), 'https://www.google.com');
    userEvent.click(screen.getByRole('button'));

    // Once the button is disabled the reenabled, the request is finished
    await waitFor(() => screen.getByRole('button').getAttribute('disabled'));
    await waitFor(
      () => screen.getByRole('button').getAttribute('disabled') == null
    );

    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith('/link/shortslug');
  });
});
