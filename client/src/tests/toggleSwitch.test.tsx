import { render, screen } from '@testing-library/react';
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';

describe('ToggleSwitch component', () => {
    it('should render the label and subtitle', () => {
        const label = 'My Toggle Switch';
        const subtitle = 'This is a toggle switch.';

        render(<ToggleSwitch
            id="my-toggle-switch"
            label={label}
            subtitle={subtitle}
            isChecked={true}
            onChange={() => {
            }}
        />);

        const labelElement = screen.getByText(label);
        const subtitleElement = screen.getByText(subtitle);

        expect(labelElement).toBeInTheDocument();
        expect(subtitleElement).toBeInTheDocument();
    });

    it('should be checked by default', () => {
        render(<ToggleSwitch
            id="my-toggle-switch"
            label="My Toggle Switch"
            subtitle="This is a toggle switch."
            isChecked={true}
            onChange={() => {}}
        />);

        const inputElement = screen.getByRole('switch');

        expect(inputElement).toBeChecked();
    });

});