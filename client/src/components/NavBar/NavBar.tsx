import ButtonWhite from '../ButtonWhite/ButtonWhite';
import ButtonRed from '../ButtonRed/ButtonRed';
import styles from './NavBar.module.css';

const NavBar = () => {
    return (
        <div className={styles.container}>
            <div></div>
            <div className={styles.buttonSection}>
                <ButtonWhite label="Log In" />
                <ButtonRed label="Sign Up" />
            </div>
        </div>
    );
};

export default NavBar;
