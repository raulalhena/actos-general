import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ConfirmPasswordInput from '../components/ConfirmPasswordInput/ConfirmPasswordInput';
import { ChangeEvent } from 'react';

test('renders the "confirm passaport" without errors', () => {
    const { queryByTestId } = render(
        <Router>
            <ConfirmPasswordInput label={''} placeholder={''} id={''} maxLength={0} minLength={0} value={undefined} onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
            } } />
        </Router>
    );

    const pass = queryByTestId('confirm-passport');
    expect(pass).toBeInTheDocument();
});