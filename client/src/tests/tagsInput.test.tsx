import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TagsInput } from 'react-tag-input-component';

test('renders TagsInput without errors', () => {
    render(
        <Router>
            <TagsInput/>
        </Router>
    );
});