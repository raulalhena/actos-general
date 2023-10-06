import styles from './TimeConfigCard.module.css';
import { Link } from 'react-router-dom';

const TimeConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configform`} state={'times'}>
                <div className={styles.card}>
                    <h2>RANGO HORARIO</h2>
                </div>
            </Link>
        </div>
    );
};

export default TimeConfigCard;
