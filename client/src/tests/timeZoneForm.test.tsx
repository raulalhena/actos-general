import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TimeZoneForm from '../components/Configuration/Forms/TimeZoneForm/TimeZoneForm';

describe('timezone form form Component', () => {
    it('renders without errors', () => {
        const { queryByTestId } = render(<Router><TimeZoneForm/></Router>);
        const dataid = queryByTestId('TimeZone-form');
        expect(dataid).toBeInTheDocument();
    });

    it('displays a header title for successful registration', async () => {
        const { getByTestId } = render(<Router><TimeZoneForm /></Router>);
        
        const title = getByTestId('header-title');
        expect(title).toBeInTheDocument();
    
    });

    it('displays a submit button for successful registration', async () => {
        const { getByTestId } = render(<Router><TimeZoneForm /></Router>);
        
        const btn = getByTestId('button-submit');
        expect(btn).toBeInTheDocument();
    
    });

    it('displays a modal for successful registration', async () => {
        const { getByTestId } = render(<Router><TimeZoneForm /></Router>);
        
        const modal = getByTestId('modal');
        expect(modal).toBeInTheDocument();
    
    });

});