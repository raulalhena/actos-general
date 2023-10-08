import { render, fireEvent } from '@testing-library/react';
import DropdownButton from '../components/DropdownButton/DropdownButton';

describe('DropdownButton', () => {
    it('should change the selected option when a different option is chosen', () => {
        const { getByTestId } = render(<DropdownButton />);
        const selectElement = getByTestId('select-option');

        // Initially, the selected option should be 'Draft'
        expect(selectElement).toHaveValue('Draft');

        // Simulate changing the option to 'Public'
        fireEvent.change(selectElement, { target: { value: 'Public' } });

        // Now, the selected option should be 'Public'
        expect(selectElement).toHaveValue('Public');
    });
});
