import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TimeForm from '../components/Configuration/Forms/TimeForm/TimeForm';

describe('time form Component', () => {
    it('renders without errors', () => {
        const { queryByTestId } = render(<Router><TimeForm/></Router>);
        const dataid = queryByTestId('time-form');
        expect(dataid).toBeInTheDocument();
    });

    it('displays a header title for successful registration', async () => {
        const { getByTestId } = render(<Router><TimeForm /></Router>);
        
        const header = getByTestId('header-title');
        expect(header).toBeInTheDocument();
    
    });

    it('displays a submit button for successful registration', async () => {
        const { getByTestId } = render(<Router><TimeForm /></Router>);
        
        const btn = getByTestId('button-submit');
        expect(btn).toBeInTheDocument();
    
    });

    it('displays a modal for successful registration', async () => {
        const { getByTestId } = render(<Router><TimeForm /></Router>);
        
        const modal = getByTestId('modal');
        expect(modal).toBeInTheDocument();
    
    });

});