import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import VisibilityForm from '../components/Configuration/Forms/VisibilityForm/VisibilityForm';

describe('visibility form Component', () => {
    it('renders without errors', () => {
        const { queryByTestId } = render(<Router><VisibilityForm/></Router>);
        const dateInput = queryByTestId('visibility-form');
        expect(dateInput).toBeInTheDocument();
    });

    it('displays a header title for successful registration', async () => {
        const { getByTestId } = render(<Router><VisibilityForm /></Router>);
        
        const header = getByTestId('header-title');
        expect(header).toBeInTheDocument();
    
    });

    it('displays a submit button for successful registration', async () => {
        const { getByTestId } = render(<Router><VisibilityForm /></Router>);
        
        const btn = getByTestId('button-submit');
        expect(btn).toBeInTheDocument();
    
    });

    it('displays a modal for successful registration', async () => {
        const { getByTestId } = render(<Router><VisibilityForm /></Router>);
        
        const modal = getByTestId('modal');
        expect(modal).toBeInTheDocument();
    
    });

});