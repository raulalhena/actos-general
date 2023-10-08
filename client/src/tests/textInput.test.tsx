import { render, screen } from '@testing-library/react';
import TextInput from '../components/TextInput/TextInput';

describe('TextInputWithSubtitle component', () => {
    it('should render the label and subtitle', () => {
        const label = 'My Text Input';

        render(<TextInput
            label={label}
            id="" 
            placeholder="" 
            maxLength={0} 
            minLength={0} 
            value="" 
            onChange={() => {}}
        /> );

        const labelElement = screen.getByText(label);

        expect(labelElement).toBeInTheDocument();
    });

    it('should render the input field with the correct properties', () => {
        const id = 'my-text-input';
        const placeholder = 'Enter your text here.';
        const maxLength = 100;
        const minLength = 10;
        const value = 'This is my text.';

        render(
            <TextInput
                id={id}
                placeholder={placeholder}
                maxLength={maxLength}
                minLength={minLength}
                value={value}
                onChange={() => {}}
                label={''}
            />
        );

        const inputElement = screen.getByRole('textbox');

        expect(inputElement).toHaveAttribute('id', id);
        expect(inputElement).toHaveAttribute('placeholder', placeholder);
        expect(inputElement).toHaveAttribute('maxlength', maxLength.toString());
        expect(inputElement).toHaveAttribute('minlength', minLength.toString());
        expect(inputElement).toHaveValue(value);
    });

});
