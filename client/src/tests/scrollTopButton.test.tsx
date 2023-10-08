import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollTopButton from '../components/ScrollTopButton/ScrollTopButton';

test('renders ScrollTopButton without errors', () => {
    render(
        <Router>
            <ScrollTopButton />
        </Router>
    );
});
