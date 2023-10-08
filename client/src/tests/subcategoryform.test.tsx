import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SubcategoryForm from '../components/Configuration/Forms/SubcategoryForm/SubcategoryForm';

describe('subcategory form Component', () => {
    it('renders without errors', () => {
        const { queryByTestId } = render(<Router><SubcategoryForm/></Router>);
        const dateInput = queryByTestId('subcategory-form');
        expect(dateInput).toBeInTheDocument();
    });

    it('displays a header title for successful registration', async () => {
        const { getByTestId } = render(<Router><SubcategoryForm /></Router>);
        
        const header = getByTestId('header-title');
        expect(header).toBeInTheDocument();
    
    });

    it('displays a submit button for successful registration', async () => {
        const { getByTestId } = render(<Router><SubcategoryForm /></Router>);
        
        const btn = getByTestId('button-submit');
        expect(btn).toBeInTheDocument();
    
    });

    it('displays a modal for successful registration', async () => {
        const { getByTestId } = render(<Router><SubcategoryForm /></Router>);
        
        const modal = getByTestId('modal');
        expect(modal).toBeInTheDocument();
    
    });

});