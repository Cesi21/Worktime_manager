
import ResizeObserver from 'resize-observer-polyfill';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DopustiGrafView from './GrafDopusti';

global.ResizeObserver = ResizeObserver;

test('selects October from dropdown', () => {
  const { getByRole } = render(<DopustiGrafView />);
  
  const dropdown = getByRole('combobox');
  fireEvent.change(dropdown, { target: { value: 10 } });

  expect(dropdown.value).toBe('10'); 
});