import { render, fireEvent, screen } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
import GrafView from './Grafi';

// Nastavitev polifila za ResizeObserver
global.ResizeObserver = ResizeObserver;

test('prikaz grafa ob kliku na gumb', () => {
  render(<GrafView />);
  fireEvent.click(screen.getByText('Izračunaj ure'));

  // Preverite, ali se prikaže element slike (img)
  const image = screen.getByRole('img');
  expect(image).toBeInTheDocument();

  // Dodatno lahko preverite tudi alt tekst slike, če je to relevantno
  // expect(image).toHaveAttribute('alt', 'Opis slike');
});