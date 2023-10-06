import styles from './VisibilityConfigCard.module.css';
import { Link } from 'react-router-dom';

const VisibilityConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configlist`} state={'visibilities'}>
                <div className={styles.card}>
                    <h2>VISIBILIDAD DEL EVENTO</h2>
                </div>
            </Link>
        </div>
    );
};

export default VisibilityConfigCard;
