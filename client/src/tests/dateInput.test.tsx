
import { render } from '@testing-library/react';
import DateInput from '../components/DateInput/DateInput';

describe('DateInput Component', () => {
    it('renders without errors', () => {
        const { queryByTestId } = render(<DateInput id="datePicker" name="date" value="" onChange={() => {}} />);
        const dateInput = queryByTestId('date-input');
        expect(dateInput).toBeInTheDocument();
    });

    it('renders a label with "Fecha *" text', () => {
        const { getByText } = render(<DateInput id="datePicker" name="date" value="" onChange={() => {}} />);
        const label = getByText('Fecha *');
        expect(label).toBeInTheDocument();
    });

});
