import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';

test('renders SearchBar without errors', () => {
    render(
        <Router>
            <SearchBar />
        </Router>
    );
});