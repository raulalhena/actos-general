import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ImageUploader } from '../components/ImageUploader/ImageUploader';

test('render the component rendered without error', () => {
    const { queryByTestId } = render(
        <Router>
            <ImageUploader
            />
        </Router>
    );

    const dataid = queryByTestId('img-uploader');
    expect(dataid).toBeInTheDocument();
});