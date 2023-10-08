import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TimeConfigCard from '../components/Configuration/Cards/TimeConfigCard/TimeConfigCard';

test('renders TimeConfigCard without errors', () => {
    render(
        <Router>
            <TimeConfigCard />
        </Router>
    );
});
