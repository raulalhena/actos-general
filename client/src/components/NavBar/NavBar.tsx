import { useState } from 'react';
import styles from './Navbar.module.css';
import Logo from '../../assets/logo.png';

function Navbar() {
    const [ isActive, setIsActive ] = useState(false);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };

    const removeActive = () => {
        setIsActive(false);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <a className={styles.navbarLink} href="/" onClick={removeActive}>
                    <img src={Logo} className={styles.logo} alt="Logo" />
                </a>
                <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                    <li onClick={removeActive}>
                        <a href="/myevents" className={styles.navLink}>
              Agenda
                        </a>
                    </li>
                    <li onClick={removeActive}>
                        <a href="/myevents" className={styles.navLink}>
              Mis eventos
                        </a>
                    </li>
                    <li onClick={removeActive}>
                        <a href="/faq" className={styles.navLink}>
              FAQ
                        </a>
                    </li>
                    <li onClick={removeActive}>
                        <a href="/eventslist" className={styles.navLink}>
              Eventos Activos
                        </a>
                    </li>
                    <li onClick={removeActive}>
                        <a href="/event" className={styles.navLink}>
              Crear Evento
                        </a>
                    </li>
                </ul>

                {!isLoggedIn && (
                    <>
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
                    </>
                )}

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
