import { render, fireEvent, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EventPage from '../pages/Event/EventPage';
import EventDashboardPage from '../pages/EventDashboard/EventDashboardPage';

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

test('Render Dashboard Page', async () => {
    render(
        <MemoryRouter initialEntries={[ '/eventdashboard' ]} initialIndex={0}>
            <Routes>
                <Route path="/eventdashboard" element={<EventDashboardPage/>} />
            </Routes>
        </MemoryRouter>
    );

    // Verifica si la página EventPage se está renderizando
    const eventFormComponent = screen.getByTestId('dashboard-component');
    expect(eventFormComponent).toBeInTheDocument();

});