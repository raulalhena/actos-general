import { render } from '@testing-library/react';
import ModalDisplay from '../components/Modal/ModalDisplay';

test('renders correctly', () => {
    const { getByTestId } = render(<ModalDisplay isOpen={true} title={'sample title'} onClose={function (): void {
        throw new Error('Function not implemented.');
    } } showCloseButton={false} />);

    const modal = getByTestId('modal');
    expect(modal).toBeInTheDocument();
});

