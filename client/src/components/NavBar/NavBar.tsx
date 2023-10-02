import { useState } from 'react';
import styles from './Navbar.module.css';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import { useAuth } from '../../hooks/useAuth';

function Navbar() {
    const [ isActive, setIsActive ] = useState(false);
    const { user, isLogged } = useAuth();

    console.log('user role ', user.role);

    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };

    const removeActive = () => {
        setIsActive(false);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.navbarLink} onClick={removeActive}>
                    <img src={Logo} className={styles.logo} alt="Logo" />
                </Link>
                <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                    <li onClick={removeActive}>
                        <Link to="/allevents" className={styles.navLink}>
                            Agenda
                        </Link>
                    </li>
                    {isLogged && user.role === 'user' && (
                        <li onClick={removeActive}>
                            <Link to="/myevents" className={styles.navLink}>
                                Mis eventos
                            </Link>
                        </li>
                    )}
                    <li onClick={removeActive}>
                        <Link to="/faq" className={styles.navLink}>
                            FAQ
                        </Link>
                    </li>
                    <li onClick={removeActive}>
                        <Link to="/eventslist" className={styles.navLink}>
                            Eventos Activos
                        </Link>
                    </li>
                    {isLogged && user.role === 'admin' && (
                        <li onClick={removeActive}>
                            <Link to="/createevent" className={styles.navLink}>
                            Crear Evento
                            </Link>
                        </li>
                    )}
                </ul>

                {!isLogged ? (
                    <>
                        <li onClick={removeActive}>
                            <Link to="/login" className={styles.navLink}>
                                Iniciar sesión {user.name}
                            </Link>
                        </li>
                        <li onClick={removeActive}>
                            <Link to="/signup" className={styles.navLink}>
                                Registrarse
                            </Link>
                        </li>
                    </>
                )
                    :
                    <>
                        <li onClick={removeActive}>
                            <Link to="/logout" className={styles.navLink}>
                                Cerrar sesión
                            </Link>
                        </li>
                    </>
                }

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
