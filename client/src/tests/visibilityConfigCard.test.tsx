import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import VisibilityConfigCard from '../components/Configuration/Cards/VisibilityConfigCard/VisibilityConfigCard';

test('renders VisibilityConfigCard without errors', () => {
    render(
        <Router>
            <VisibilityConfigCard />
        </Router>
    );
});
