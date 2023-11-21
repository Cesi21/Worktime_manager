import { render, fireEvent } from '@testing-library/react';
import DopustView from './Dopusti';

test('interakcija s koledarjem dopustov', () => {
  const { getByText, getByPlaceholderText } = render(<DopustView />);
  // Simulirajte interakcijo s koledarjem
  fireEvent.change(getByPlaceholderText(''), { target: { value: 'Testni vnos' } });
  fireEvent.blur(getByPlaceholderText('')); // ali klik na gumb za shranjevanje
  // Preverite, ali se spremembe odražajo
  expect(getByText('Testni vnos')).toBeInTheDocument();
});