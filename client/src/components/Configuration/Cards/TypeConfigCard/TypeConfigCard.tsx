import styles from './TypeConfigCard.module.css';
import { Link } from 'react-router-dom';

const TypeConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configform`} state={'types'}>
                <div className={styles.card}>
                    <h2>TIPOS DE EVENTOS</h2>
                </div>
            </Link>
        </div>
    );
};

export default TypeConfigCard;
