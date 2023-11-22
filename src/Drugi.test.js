import { render, fireEvent, screen } from '@testing-library/react';
import App from './Dopusti'; // Predpostavimo, da je to vaša glavna komponenta



describe('App Component Tests', () => {
  test('preverjanje prikaza "calendar-container" ob kliku na Dopusti', () => {
    const { container } = render(<App />);

    // Klik na povezavo "Dopusti"
    fireEvent.click(screen.getByText('Dopusti'));

     // Preverjanje, ali se prikaže element z razredom 'calendar-container'
     const calendarContainer = container.querySelector('.calendar-container');
     expect(calendarContainer).toBeInTheDocument();
   });
 });