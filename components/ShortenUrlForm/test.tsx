import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ShortenUrlForm from '.';

describe('ShortenUrlForm', () => {
  it('displays typed text', () => {
    render(<ShortenUrlForm onSubmit={jest.fn()} />);
    userEvent.type(screen.getByRole('textbox'), 'Hello!');
    expect(screen.getByRole('textbox')).toHaveValue('Hello!');
  });

  it('calls onSubmit function when submitting valid URL, and disables button while submitting', async () => {
    const promise = Promise.resolve();
    const onSubmit = jest.fn(() => promise);
    render(<ShortenUrlForm onSubmit={onSubmit} />);
    userEvent.type(screen.getByRole('textbox'), 'https://www.google.com');
    userEvent.click(screen.getByRole('button'));
    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith('https://www.google.com');
    expect(screen.getByRole('button')).toBeDisabled();
    await act(() => promise);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('marks textbox invalid and does not call onSubmit if submitting invalid URL', async () => {
    const promise = Promise.resolve();
    const onSubmit = jest.fn(() => promise);
    render(<ShortenUrlForm onSubmit={onSubmit} />);
    userEvent.type(screen.getByRole('textbox'), 'google.com');
    expect(screen.getByRole('textbox')).not.toHaveClass('is-invalid');
    userEvent.click(screen.getByRole('button'));
    expect(onSubmit).toBeCalledTimes(0);
    expect(screen.getByRole('textbox')).toHaveClass('is-invalid');
    expect(
      screen.getByText('Please enter a valid http URL')
    ).toBeInTheDocument();
  });

  it('marks textbox invalid if onSubmit rejects', async () => {
    const promise = Promise.reject(new Error('Failed to fetch'));
    const onSubmit = jest.fn(() => promise);
    render(<ShortenUrlForm onSubmit={onSubmit} />);
    userEvent.type(screen.getByRole('textbox'), 'https://www.google.com');
    expect(screen.getByRole('textbox')).not.toHaveClass('is-invalid');
    userEvent.click(screen.getByRole('button'));
    expect(onSubmit).toBeCalledTimes(1);
    await expect(act(() => promise)).rejects.toThrow('Failed to fetch');
    expect(screen.getByRole('textbox')).toHaveClass('is-invalid');
    expect(
      screen.getByText(
        'Failed to submit. Check your network connection and try again.'
      )
    ).toBeInTheDocument();
  });
});
