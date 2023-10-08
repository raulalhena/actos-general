import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/NavBar/NavBar';

describe('Navbar component', () => {
    it('should render the Navbar component', () => {
        const { container } = render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>);
        expect(container).toBeInTheDocument();
    });

});
