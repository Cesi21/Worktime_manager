import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotificationsView from './Osma.js'; // Predpostavimo, da je to vaša komponenta
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

test('prikaz Obvestil na strani', () => {
  render(<NotificationsView />);
 

  // Preverite, ali se prikaže element slike (img)
  const image = screen.getByText('Pomembno obvestilo 1');
  expect(image).toBeInTheDocument();


});