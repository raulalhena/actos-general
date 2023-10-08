import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonInscription from '../components/Button/ButtonInscription/ButtonInscription';

describe('button inscription Component', () => {
    it('renders without errors', () => {
        const { queryByTestId } = render(<Router><ButtonInscription label={''}/></Router>);
        const dataid = queryByTestId('inscription-btn');
        expect(dataid).toBeInTheDocument();
    });

});