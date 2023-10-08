import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LanguageForm from '../components/Configuration/Forms/LanguageForm/LanguageForm';

describe('Languageform Component', () => {
    it('renders without errors', () => {
        const { queryByTestId } = render(<Router><LanguageForm/></Router>);
        const dataid = queryByTestId('language-form');
        expect(dataid).toBeInTheDocument();
    });

    it('displays a header title for successful registration', async () => {
        const { getByTestId } = render(<Router><LanguageForm /></Router>);
        
        const header = getByTestId('header-title');
        expect(header).toBeInTheDocument();
    
    });

    it('displays a submit button for successful registration', async () => {
        const { getByTestId } = render(<Router><LanguageForm /></Router>);
        
        const btn = getByTestId('button-submit');
        expect(btn).toBeInTheDocument();
    
    });

    it('displays a modal for successful registration', async () => {
        const { getByTestId } = render(<Router><LanguageForm /></Router>);
        
        const modal = getByTestId('modal');
        expect(modal).toBeInTheDocument();
    
    });

});