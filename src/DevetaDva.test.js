import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MailView from './Mail.js';

test('pregleda log če je oddan mail', () => {
  render(<MailView />);

  // Mock console.log
  const consoleLogMock = jest.spyOn(console, 'log');
  consoleLogMock.mockImplementation(() => {});

  // Nastavitev vrednosti za polja obrazca
  fireEvent.change(screen.getByLabelText(/E-pošta vodstva:/i), { target: { value: 'vodstvo@example.com' } });
  fireEvent.change(screen.getByLabelText(/Zadeva:/i), { target: { value: 'Testna zadeva' } });
  fireEvent.change(screen.getByLabelText(/Telo Sporočila:/i), { target: { value: 'Testno sporočilo' } });

  // Simulacija oddaje obrazca
  fireEvent.click(screen.getByRole('button', { name: /pošlji/i }));

  // Preverite, ali je bil console.log klican z ustreznimi argumenti
  expect(consoleLogMock).toHaveBeenCalledWith('Sending email:', {
    email: 'vodstvo@example.com',
    subject: 'Testna zadeva',
    body: 'Testno sporočilo'
  });

  // Počisti mock na koncu testa
  consoleLogMock.mockRestore();
});

