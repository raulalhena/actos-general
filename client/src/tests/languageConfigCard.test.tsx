import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LanguageConfigCard from '../components/Configuration/Cards/LanguageConfigCard/LanguageConfigCard';

test('renders LanguageConfigCard without errors', () => {
    render(
        <Router>
            <LanguageConfigCard />
        </Router>
    );
});
