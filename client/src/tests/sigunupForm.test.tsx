import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignupForm from '../components/SignupForm/SignupForm';

describe('Signup Form Component', () => {
    it('renders without errors', () => {
        const { queryByTestId } = render(<Router><SignupForm /></Router>);
        const dateInput = queryByTestId('sigunp-form');
        expect(dateInput).toBeInTheDocument();
    });

    it('displays a link to start a session', async () => {
        const { getByTestId } = render(<Router><SignupForm /></Router>);
        
        const loginLink = getByTestId('login-link');
        expect(loginLink).toBeInTheDocument();
    });

    it('displays input fields for user registration', async () => {
        const { getByTestId } = render(<Router><SignupForm /></Router>);
        
        const register = getByTestId('user-register');
        expect(register).toBeInTheDocument();
    
    });

    it('displays a registration button', async () => {
        const { getByTestId } = render(<Router><SignupForm /></Router>);
        
        const button = getByTestId('btn-register');
        expect(button).toBeInTheDocument();
    
    });

    it('displays a modal for successful registration', async () => {
        const { getByTestId } = render(<Router><SignupForm /></Router>);
        
        const modal = getByTestId('modal');
        expect(modal).toBeInTheDocument();
    
    });

});