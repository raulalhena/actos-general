import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CreateEvent from '../pages/CreateEvent/CreateEvent';
import EventDashboard from '../pages/EventDashboard/EventDashboard';

// Mock manual para o react-pdf/renderer
// jest.mock('@react-pdf/renderer', () => {
//     return {
//         PDFDownloadLink: () => null,
//         StyleSheet: {
//             create: () => null
//         }
//     };
// });

test('Render Create Event Page', async () => {
    const { getByText } = render(
        <MemoryRouter initialEntries={[ '/createevent' ]} initialIndex={0}>
            <Routes>
                <Route path="/createevent" element={<CreateEvent />} />
            </Routes>
        </MemoryRouter>
    );

    const eventFormComponent = screen.getByTestId('event-form-component');
    expect(eventFormComponent).toBeInTheDocument();

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

    await waitFor(() => {
        const eventFormComponent = screen.getByTestId('dashboard-component');
        expect(eventFormComponent).toBeInTheDocument();
    });
});
