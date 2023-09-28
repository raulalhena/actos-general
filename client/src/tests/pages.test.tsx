import { render, fireEvent, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EventPage from '../pages/Event/EventPage';

test('Render event Page', async () => {
    const { getByText } = render(
        <MemoryRouter initialEntries={[ '/event' ]} initialIndex={0}>
            <Routes>
                <Route path="/event" element={<EventPage />} />
            </Routes>
        </MemoryRouter>
    );

    // Verifica si la página EventPage se está renderizando
    const eventFormComponent = screen.getByTestId('event-form-component');
    expect(eventFormComponent).toBeInTheDocument();

    // Simula una acción en la página, por ejemplo, hacer clic en un botón
    fireEvent.click(getByText('Guardar'));

});