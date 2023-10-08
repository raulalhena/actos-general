import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RadioCardContainer from '../components/Button/ButtonContainer/RadioCardContainer';

test('renders the "radio-container" without errors', () => {
    const { queryByTestId } = render(
        <Router>
            <RadioCardContainer label={''} radioButtons={[]} selectedValue={''} onChange={function (value: string): void {
                throw new Error('Function not implemented.');
            } } />
        </Router>
    );

    const radiobtn = queryByTestId('radio-container');
    expect(radiobtn).toBeInTheDocument();
});