import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ImageUploader } from '../components/ImageUploader/ImageUploader';

const removeImage = () => {
    return;
};

const handleDrop = () => {
    return;
};

const handleDragOver = () => {
    return;
};

test('render the component rendered without error', () => {
    const { queryByTestId } = render(
        <Router>
            <ImageUploader
                id="image"
                removeImage={removeImage}
                previewURL={'previewURL'}
                imgVisibility={'block'}
                onDrop={handleDrop}
                onDragOver={handleDragOver}            
            />
        </Router>
    );

    const dataid = queryByTestId('img-uploader');
    expect(dataid).toBeInTheDocument();
});