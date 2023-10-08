import { render, screen } from '@testing-library/react';
import ButtonSubmit from '../components/Button/ButtonSubmit/ButtonSubmit';

describe('ButtonSubmit', () => {
    it('renders a button with the provided label', () => {
        const label = 'Submit';

        render(<ButtonSubmit label={label} />);

        // Use screen to query for the button element
        const buttonElement = screen.getByText(label);

        // Assert that the button element is in the document
        expect(buttonElement).toBeInTheDocument();
    });

});
