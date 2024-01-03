import React from 'react';
import { render, screen } from '@testing-library/react';
import MailView from './Mail.js';

test('Pregleda stran mail', () => {
  render(<MailView />);

  expect(screen.getByLabelText(/E-pošta vodstva:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Zadeva:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Telo Sporočila:/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /pošlji/i })).toBeInTheDocument();
});
