import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TagsInputComponent from '../components/TagsInput/TagsInput';

test('render the component rendered without error', () => {
    const { queryByTestId } = render(
        <Router>
            <TagsInputComponent
                label="Tag Label"
                placeHolder="Tag Placeholder"
                id="tagInput"
                value={[ 'tag1', 'tag2' ]}
                onChange={() => { } } subtitle={''}
            />
        </Router>
        
    );

    const tags = queryByTestId('tags-input');
    expect(tags).toBeInTheDocument();
});