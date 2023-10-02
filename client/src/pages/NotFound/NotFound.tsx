import ButtonRed from '../../components/Button/ButtonRed/ButtonRed';
import styles from './NotFound.module.css';
import notFoundImage from '../../assets/notfound.png';
import { Link } from 'react-router-dom'; // Importa el componente Link

function NotFound() {
    return (
        <div className={styles.notFoundPage}>
            <img src={notFoundImage} className={styles.notFoundImg} alt="Imagen de página no encontrada" />
            <div className={styles.notFoundText}>
                <h1>Oops! Página no encontrada</h1>
                <h2>La página que estás buscando no existe.</h2>
                {/* Utiliza Link para redirigir al usuario a la página de inicio */}
                <Link to="/">
                    <ButtonRed label="Vuelve al inicio" />
                </Link>
            </div>
        </div>
    );
}

export default NotFound;

