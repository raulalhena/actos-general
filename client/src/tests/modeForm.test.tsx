import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ModeForm from '../components/Configuration/Forms/ModeForm/ModeForm';

describe('Modeform Component', () => {
    it('renders without errors', () => {
        const { queryByTestId } = render(<Router><ModeForm/></Router>);
        const dataid = queryByTestId('mode-form');
        expect(dataid).toBeInTheDocument();
    });

    it('displays a header title for successful registration', async () => {
        const { getByTestId } = render(<Router><ModeForm /></Router>);
        
        const header = getByTestId('header-title');
        expect(header).toBeInTheDocument();
    
    });

    it('displays a submit button for successful registration', async () => {
        const { getByTestId } = render(<Router><ModeForm /></Router>);
        
        const btn = getByTestId('button-submit');
        expect(btn).toBeInTheDocument();
    
    });

    it('displays a modal for successful registration', async () => {
        const { getByTestId } = render(<Router><ModeForm /></Router>);
        
        const modal = getByTestId('modal');
        expect(modal).toBeInTheDocument();
    
    });

});