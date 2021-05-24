import faker from 'faker';
import React from 'react';
import { render, screen } from '@testing-library/react';

const useRouterMock = jest.fn();
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: useRouterMock,
}));

import LinkPage from './index.page';

describe('LinkPage', () => {
  it('displays "URL Shortener" heading', () => {
    useRouterMock.mockImplementationOnce(() => ({
      query: { slug: faker.random.alphaNumeric(5) },
    }));
    render(<LinkPage />);
    expect(screen.getByRole('heading')).toHaveTextContent('URL Shortener');
  });

  it('displays link to http://localhost/${slug}', () => {
    const slug = faker.random.alphaNumeric(5);
    useRouterMock.mockImplementationOnce(() => ({
      query: { slug },
    }));
    render(<LinkPage />);
    expect(screen.getByRole('link')).toHaveTextContent(
      `http://localhost/${slug}`
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `http://localhost/${slug}`
    );
  });

  it('displays button to "Shorten another URL"', () => {
    const slug = faker.random.alphaNumeric(5);
    useRouterMock.mockImplementationOnce(() => ({
      query: { slug },
    }));
    render(<LinkPage />);
    expect(screen.getByRole('button')).toHaveTextContent('Shorten another URL');
  });
});
