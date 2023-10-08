import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonCardRadio from '../components/Button/ButtonContainer/ButtonCardRadio/ButtonCardRadio';
import { ChangeEvent } from 'react';

describe('button card radio Component', () => {
    it('renders without errors', () => {
        const { queryByTestId } = render(<Router><ButtonCardRadio id={''} name={''} checked={false} onChange={function (event: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
        } }/></Router>);
        const dataid = queryByTestId('cardRadio-btn');
        expect(dataid).toBeInTheDocument();
    });

});