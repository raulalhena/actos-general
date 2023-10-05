import SignupAdminForm from '../../components/SignupForm/SignupForm';
import styles from './SignupAdmin.module.css';
import Img from '../../assets/login.png';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function SignupAdmin() {
    
    return (
        <div>
            <SignupAdminForm />
        </div>
    );
}

export default SignupAdmin;
