import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TextInputNumber from '../components/TextInputNumber/TextInputNumber';

test('render the component rendered without error', () => {
    const { queryByTestId } = render(
        <Router>
            <TextInputNumber
                label="Label"
                placeholder="Placeholder"
                id="inputId"
                value={0}
                onChange={() => {}}
                isRequired={true}
            />
        </Router>
    );

    const inputnbr = queryByTestId('input-nbr');
    expect(inputnbr).toBeInTheDocument();
});