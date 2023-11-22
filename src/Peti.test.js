import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component Tests', () => {
  test('preverjanje vnosa in dodajanja podatkov', async () => {
    render(<App />);

    // Mock console.log and console.error
    const logSpy = jest.spyOn(console, 'log');
    const errorSpy = jest.spyOn(console, 'error');

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Uporabnik'), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByPlaceholderText('Čas prihoda'), { target: { value: '08:00' } });
    fireEvent.change(screen.getByPlaceholderText('Čas odhoda'), { target: { value: '16:00' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Dodaj podatke'));

    // Wait for async actions to complete
    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith('Nov dokument uspešno dodan!');
      // or check for errors
      // expect(errorSpy).toHaveBeenCalledWith('Napaka pri dodajanju dokumenta:', expect.anything());
    });

    // Clean up
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });
});