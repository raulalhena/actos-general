import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TimeZoneConfigCard from '../components/Configuration/Cards/TimeZoneConfigCard/TimeZoneConfigCard';

test('renders TimeZoneConfigCard without errors', () => {
    render(
        <Router>
            <TimeZoneConfigCard />
        </Router>
    );
});
