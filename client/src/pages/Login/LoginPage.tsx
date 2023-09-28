import LogInForm from '../../components/LogInForm/LogInForm';
import styles from './login.module.css';
import loginprueba from '../../assets/loginprueba.jpg';

const LoginPage = () => {
    return (
        <div className={styles.header}>
            <img src={loginprueba}/>
                <LogInForm />
        </div>
    );
};

export default LoginPage;
