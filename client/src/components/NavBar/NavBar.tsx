import ButtonSubmit from '../Button/ButtonSubmit';
import ButtonLogIn from '../ButtonLogIn/ButtonLogIn';
import ButtonSignUp from '../ButtonSignUp/ButtonSignUp';
import styles from './NavBar.module.css';

const NavBar = () => {
    return (
        <div className={styles.container}>
            <div></div>
            <div className={styles.buttonSection}>
                <ButtonLogIn label="Log In" />
                <ButtonSignUp label="Sign Up" />
            </div>
        </div>
    );
};

export default NavBar;
