import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ModeConfigCard from '../components/Configuration/Cards/ModeConfigCard/ModeConfigCard';

test('renders ModeConfigCard without errors', () => {
    render(
        <Router>
            <ModeConfigCard />
        </Router>
    );
});