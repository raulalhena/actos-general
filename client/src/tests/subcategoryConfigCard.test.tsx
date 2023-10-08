import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SubcategoryConfigCard from '../components/Configuration/Cards/SubcategoryConfigCard/SubcategoryConfigCard';

test('renders SubcategoryConfigCard without errors', () => {
    render(
        <Router>
            <SubcategoryConfigCard />
        </Router>
    );
});
