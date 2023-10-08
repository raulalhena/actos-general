import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AllEvents from '../pages/AllEvents/AllEvents';

test('Checks if the word "Todos los eventos" is present', () => {
    render(
        <MemoryRouter>
            <AllEvents />
        </MemoryRouter>
    );

    const title = screen.getByText('Todos los eventos');
    expect(title).toBeInTheDocument();
});

test('Checks if the text "No se encontraron resultados." is not initially present', () => {
    render(
        <MemoryRouter>
            <AllEvents />
        </MemoryRouter>
    );

    const noResultsText = screen.queryByText('No se encontraron resultados.');
    expect(noResultsText).toBeNull();
});
