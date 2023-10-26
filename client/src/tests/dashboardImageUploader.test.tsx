import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DashboardImageUploader } from '../components/DashboardImageUploader/DashboardImageUploader';

const removeImage = () => {
    return;
};

const handleDrop = () => {
    return;
};

const handleDragOver = () => {
    return;
};

test('renders the component without errors', () => {
    const { queryByTestId } = render(
        <Router>
            <DashboardImageUploader 
                id="image"
                removeImage={removeImage}
                image={'image'}
                previewURL={'previewURL'}
                imgVisibility={'block'}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                value={'image'}
            />
        </Router>
    );

    const dashimg = queryByTestId('dashboard-img');
    expect(dashimg).toBeInTheDocument();
});