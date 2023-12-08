import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotificationsView from './Osma.js'; // Predpostavimo, da je to vaša komponenta

test('navigacija do NotificationsView', () => {
  // Renderiranje DataTableView komponente znotraj MemoryRouter
  const { getByText } = render(
    <MemoryRouter initialEntries={['/data']}>
      <Routes>
        <Route path="/data" element={<NotificationsView />} />
      </Routes>
    </MemoryRouter>
  );

  // Tukaj lahko izvedete dejanja in preverjanja, specifična za DataTableView
  // Na primer, preverite, ali se prikaže nek tekst, ki je značilen za DataTableView
  expect(getByText("Obvestila")).toBeInTheDocument();
});