import { render, fireEvent, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CreateEvent from '../pages/CreateEvent/CreateEvent';
import EventDashboard from '../pages/EventDashboard/EventDashboard';

test('Render Create Event Page', async () => {
    const { getByText } = render(
        <MemoryRouter initialEntries={[ '/createevent' ]} initialIndex={0}>
            <Routes>
                <Route path="/createevent" element={<CreateEvent />} />
            </Routes>
        </MemoryRouter>
    );

    // Verifica si la página CreateEvent se está renderizando
    const eventFormComponent = screen.getByTestId('event-form-component');
    expect(eventFormComponent).toBeInTheDocument();

    // Simula una acción en la página, por ejemplo, hacer clic en un botón
    fireEvent.click(getByText('Guardar'));
});

test('Render Dashboard Page', async () => {
    render(
        <MemoryRouter initialEntries={[ '/eventdashboard' ]} initialIndex={0}>
            <Routes>
                <Route path="/eventdashboard" element={<EventDashboard />} />
            </Routes>
        </MemoryRouter>
    );

    // Verifica si la página CreateEvent se está renderizando
    const eventFormComponent = screen.getByTestId('dashboard-component');
    expect(eventFormComponent).toBeInTheDocument();
});
