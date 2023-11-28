import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(() => Promise.resolve({ id: "abc123" })), // Vrne obljubo, ki se takoj razreši
}));


describe('App Component Tests', () => {
  test('preverjanje vnosa in dodajanja podatkov', async () => {
    render(<App />);

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    fireEvent.change(screen.getByPlaceholderText('Uporabnik'), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByPlaceholderText('Čas prihoda'), { target: { value: '08:00' } });
    fireEvent.change(screen.getByPlaceholderText('Čas odhoda'), { target: { value: '16:00' } });
    console.log("prvi");
    fireEvent.click(screen.getByText('Dodaj podatke'));

    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith('Nov dokument uspešno dodan!');
    }, { timeout: 10000 }); // Povečajte časovno omejitev, če je potrebno
    console.log("drugi");
    // Čiščenje po testu
    logSpy.mockRestore();
    errorSpy.mockRestore();
    console.log("tretji");
  });
});
