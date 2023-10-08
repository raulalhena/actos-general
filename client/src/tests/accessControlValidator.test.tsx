import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AccessControlValidator from '../components/AccessControlValidator/AccessControlValidator';

test('renders AccessControlValidator without errors', () => {
    render(
        <Router>
            <AccessControlValidator paramsURL={''} />
        </Router>
    );
});
