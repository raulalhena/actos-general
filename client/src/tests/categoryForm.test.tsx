import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CategoryForm from '../components/Configuration/Forms/CategoryForm/CategoryForm';

describe('Categoryform Component', () => {
    it('renders without errors', () => {
        const { queryByTestId } = render(<Router><CategoryForm/></Router>);
        const dataid = queryByTestId('category-form');
        expect(dataid).toBeInTheDocument();
    });

    it('displays a header title for successful registration', async () => {
        const { getByTestId } = render(<Router><CategoryForm /></Router>);
        
        const header = getByTestId('header-title');
        expect(header).toBeInTheDocument();
    
    });

    it('displays a submit button for successful registration', async () => {
        const { getByTestId } = render(<Router><CategoryForm /></Router>);
        
        const btn = getByTestId('button-submit');
        expect(btn).toBeInTheDocument();
    
    });

    it('displays a modal for successful registration', async () => {
        const { getByTestId } = render(<Router><CategoryForm /></Router>);
        
        const modal = getByTestId('modal');
        expect(modal).toBeInTheDocument();
    
    });

});