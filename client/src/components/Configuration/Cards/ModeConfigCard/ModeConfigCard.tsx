import styles from './ModeConfigCard.module.css';
import { Link } from 'react-router-dom';

const ModeConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configform`} state={'modes'}>
                <div className={styles.card}>
                    <h2>MODOS DE ASISTENCIA</h2>
                </div>
            </Link>
        </div>
    );
};

export default ModeConfigCard;
