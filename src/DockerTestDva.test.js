import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DataExView from './Izvoz'; // Spremenite pot, če je potrebno

test('izvoz podatkov v CSV', () => {
  // Renderirajte komponento
  const { getByText } = render(<DataExView />);

  // Nadomestite funkcijo download z mock funkcijo
  global.URL.createObjectURL = jest.fn();
  const downloadSpy = jest.spyOn(document, 'createElement');
  downloadSpy.mockImplementation(() => ({
    click: jest.fn(),
    href: '',
    download: '',
  }));

  // Poiščite gumb za izvoz v CSV in ga kliknite
  fireEvent.click(getByText('Izvozi v CSV'));

  // Preverite, ali je bila funkcija download klicana
  expect(downloadSpy).toHaveBeenCalled();

  // Počistite mock
  downloadSpy.mockRestore();
});
