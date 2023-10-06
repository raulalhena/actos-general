import { useState } from 'react';
import styles from './Navbar.module.css';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AvatarDropDownMenu from '../AvatarDropDownMenu/AvatarDropDownMenu';
import { useMediaQuery } from '@mui/material';

function Navbar() {
    const [ isActive, setIsActive ] = useState(false);
    const { user, isLogged } = useAuth();

    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };

    const removeActive = () => {
        setIsActive(false);
    };

    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <>
            <nav className={styles.navbar}>
                <div>
                    <Link to="/" onClick={removeActive}>
                        <img src={Logo} className={styles.logo} alt="Logo" />
                    </Link>
                </div>
                <div>
                    <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                        <li onClick={removeActive}>
                            <Link to="/allevents" className={styles.navLink}>
                Eventos
                            </Link>
                        </li>
                        {isLogged && (
                            <li onClick={removeActive}>
                                <Link to="/myevents" className={styles.navLink}>
                  Mis eventos
                                </Link>
                            </li>
                        )}
                        {!isLogged && user && user.role === 'user' && (
                            <li onClick={removeActive}>
                                <Link to="/faq" className={styles.navLink}>
                  FAQ
                                </Link>
                            </li>
                        )}
                        {isLogged && user && user.role === 'admin' && (
                            <li onClick={removeActive}>
                                <Link to="/createevent" className={styles.navLink}>
                  Crear Evento
                                </Link>
                            </li>
                        )}
                        {isLogged && user && user.role === 'admin' && (
                            <li onClick={removeActive}>
                                <Link to="/eventslist" className={styles.navLink}>
                  Gestionar eventos
                                </Link>
                            </li>
                        )}
                        {isLogged && user && user.role === 'admin' && (
                            <li onClick={removeActive}>
                                <Link to="/configboard" className={styles.navLink}>
                  Configurar formularios
                                </Link>
                            </li>
                        )}
                        {isLogged ? (
                            isDesktop ? (
                                <li onClick={removeActive}>
                                    <AvatarDropDownMenu />
                                </li>
                            ) : (
                                <li onClick={removeActive} className={styles.bar}>
                                    <Link to="/logout" className={styles.navLink}>
                    Cerrar sesión
                                    </Link>
                                </li>
                            )
                        ) : (
                            <>
                                <li onClick={removeActive}>
                                    <Link to="/login" className={styles.navLink}>
                    Iniciar sesión {user ? user.name : ''}
                                    </Link>
                                </li>
                                <li onClick={removeActive}>
                                    <Link to="/signup" className={styles.navLink}>
                    Registrarse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div
                        className={`${styles.hamburger} ${isActive ? styles.active : ''}`}
                        onClick={toggleActiveClass}
                    >
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
