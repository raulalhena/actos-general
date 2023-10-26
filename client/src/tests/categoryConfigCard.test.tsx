import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CategoryConfigCard from '../components/Configuration/Cards/CategoryConfigCard/CategoryConfigCard';

test('renders CategoryConfigCard without errors', () => {
    render(
        <Router>
            <CategoryConfigCard />
        </Router>
    );
});
