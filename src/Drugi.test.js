import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('oddaja obrazca dodaja podatke', () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  fireEvent.change(getByPlaceholderText('Uporabnik'), { target: { value: 'testni uporabnik' } });
  fireEvent.change(getByPlaceholderText('Čas prihoda'), { target: { value: '08:00' } });
  fireEvent.change(getByPlaceholderText('Čas odhoda'), { target: { value: '16:00' } });
  fireEvent.click(getByText('Dodaj podatke'));
  // Preverite, ali je bil klic do Firebase izveden s pravilnimi parametri
});