// import ButtonWhite from '../ButtonWhite/ButtonWhite';
// import ButtonRed from '../ButtonRed/ButtonRed';
// import styles from './NavBar.module.css';

// const NavBar = () => {
//     return (
//         <div className={styles.container}>
//             <div></div>
//             <div className={styles.buttonSection}>
//                 <ButtonWhite label="Log In" />
//                 <ButtonRed label="Sign Up" />
//             </div>
//         </div>
//     );
// };

// export default NavBar;

import { useState } from 'react';
import styles from './Navbar.module.css';

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
        <div className="App">
            <header>
                <nav className={styles.navbar}>
                    <a href="#home">Nous Cims </a>

                    <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                        <li onClick={removeActive}>
                            <a href="#home" className={styles.navLink}>
                Inicio
                            </a>
                        </li>
                        <li onClick={removeActive}>
                            <a href="#home" className={styles.navLink}>
                Mis eventos
                            </a>
                        </li>
                        <li onClick={removeActive}>
                            <a href="#home" className={styles.navLink}>
                Iniciar sesión
                            </a>
                        </li>
                        <li onClick={removeActive}>
                            <a href="#home" className={styles.navLink}>
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
            </header>
        </div>
    );
}

export default Navbar;
