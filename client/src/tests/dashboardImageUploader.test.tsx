import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DashboardImageUploader } from '../components/DashboardImageUploader/DashboardImageUploader';

test('renders the component without errors', () => {
    const { queryByTestId } = render(
        <Router>
            <DashboardImageUploader  />
        </Router>
    );

    const dashimg = queryByTestId('dashboard-img');
    expect(dashimg).toBeInTheDocument();
});