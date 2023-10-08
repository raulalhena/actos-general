import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

test('Checks if the word "Fundación Privada Nous Cims" is present', () => {
    render(
        <Router>
            <Footer />
        </Router>
        
    );

    const title = screen.getByText('Fundación Privada Nous Cims');
    expect(title).toBeInTheDocument();
});

test('Checks if the word "Contacto" is present', () => {
    render(
        <Router>
            <Footer />
        </Router>
    );

    const title = screen.getByText('Contacto');
    expect(title).toBeInTheDocument();
});

