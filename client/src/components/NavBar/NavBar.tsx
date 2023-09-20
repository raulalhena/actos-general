import { useState } from 'react';
import styles from './Navbar.module.css';
import Logo from '../../assets/logo.png';

function Navbar() {
    // adding the states
    const [ isActive, setIsActive ] = useState(false);

    //add the active class
    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };

    //clean up function to remove the active class
    const removeActive = () => {
        setIsActive(false);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <a href="/home" onClick={removeActive}>
                    <img src={Logo} className={styles.logo} alt="Logo" />
                </a>
                <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                    <li onClick={removeActive}>
                        <a href="/myevents" className={styles.navLink}>
              Mis eventos
                        </a>
                    </li>
                    <li onClick={removeActive}>
                        <a href="/login" className={styles.navLink}>
              Iniciar sesión
                        </a>
                    </li>
                    <li onClick={removeActive}>
                        <a href="/signup" className={styles.navLink}>
              Registrarse
                        </a>
                    </li>
                </ul>

                <div
                    className={`${styles.hamburger} ${isActive ? styles.active : ''}`}
                    onClick={toggleActiveClass}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
