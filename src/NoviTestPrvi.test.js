import { render, fireEvent, screen } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
import DopustGrafView from './GrafDopusti';

// Nastavitev polifila za ResizeObserver
global.ResizeObserver = ResizeObserver;

test('prikaz grafa ob kliku na gumb', () => {
  render(<DopustGrafView />);
  

  const image = screen.getByRole('img');
  expect(image).toBeInTheDocument();

});