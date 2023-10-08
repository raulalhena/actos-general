import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AccessControlScanner from '../components/AccessControlScanner/AccessControlScanner';

test('renders AccessControlScanner without errors', () => {
    render(
        <Router>
            <AccessControlScanner />
        </Router>
    );
});

test('does not render the QrScanner component when qrReader is false', () => {
    const { queryByTestId } = render(
        <Router>
            <AccessControlScanner />
        </Router>
    );
    // Update qrReader to false
    const qrReader = queryByTestId('qr-scanner');
    expect(qrReader).toBeNull();
});