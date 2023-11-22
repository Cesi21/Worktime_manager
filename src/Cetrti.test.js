import { render, fireEvent, screen } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
import DataTableView from './Podatki';

test('prikazuje skupno število nadur', () => {
  // Nadomestitev globalne funkcije alert z mock funkcijo
  const alertMock = jest.spyOn(window, 'alert').mockImplementation();

  // Renderiranje komponente
  render(<DataTableView />);

  // Sprožitev dogodka, ki bi moral poklicati alert
  fireEvent.click(screen.getByText('Nadure'));
  

  // Preverjanje, ali je bila mock funkcija alert poklicana z ustreznim sporočilom
  expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('Skupno število nadur:'));

  // Čiščenje mock funkcije po koncu testa
  alertMock.mockRestore();

});
