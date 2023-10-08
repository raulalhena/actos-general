import { render, screen } from '@testing-library/react';
import TextInputWithSubtitle from '../components/TextInputWithSubtitle/TextInputWithSubtitle';

describe('TextInputWithSubtitle component', () => {
    it('should render the label and subtitle', () => {
        const label = 'My Text Input';
        const subtitle = 'This is a text input with subtitle.';

        render(<TextInputWithSubtitle
            label={label}
            subtitle={subtitle}
            id="" 
            placeholder="" 
            maxLength={0} 
            minLength={0} 
            value="" 
            onChange={() => {}}
        /> );

        const labelElement = screen.getByText(label);
        const subtitleElement = screen.getByText(subtitle);

        expect(labelElement).toBeInTheDocument();
        expect(subtitleElement).toBeInTheDocument();
    });

    it('should render the input field with the correct properties', () => {
        const id = 'my-text-input';
        const placeholder = 'Enter your text here.';
        const maxLength = 100;
        const minLength = 10;
        const value = 'This is my text.';

        render(
            <TextInputWithSubtitle
                id={id}
                placeholder={placeholder}
                maxLength={maxLength}
                minLength={minLength}
                value={value}
                subtitle="" 
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
