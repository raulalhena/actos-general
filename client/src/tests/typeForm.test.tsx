import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TypeForm from '../components/Configuration/Forms/TypeForm/TypeForm';

describe('typeform form Component', () => {
    it('renders without errors', () => {
        const { queryByTestId } = render(<Router><TypeForm/></Router>);
        const dataid = queryByTestId('Type-form');
        expect(dataid).toBeInTheDocument();
    });

    it('displays a header title for successful registration', async () => {
        const { getByTestId } = render(<Router><TypeForm /></Router>);
        
        const header = getByTestId('header-title');
        expect(header).toBeInTheDocument();
    
    });

    it('displays a submit button for successful registration', async () => {
        const { getByTestId } = render(<Router><TypeForm /></Router>);
        
        const btn = getByTestId('button-submit');
        expect(btn).toBeInTheDocument();
    
    });

    it('displays a modal for successful registration', async () => {
        const { getByTestId } = render(<Router><TypeForm /></Router>);
        
        const modal = getByTestId('modal');
        expect(modal).toBeInTheDocument();
    
    });

});