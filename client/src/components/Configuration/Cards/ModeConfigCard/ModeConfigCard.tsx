import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';

const ModeConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configform`} state={'modes'}>
                <div className={styles.configCard}>
                    <FaLocationDot className={styles.configIcon}/>
                    <h2>MODOS DE ASISTENCIA</h2>
                </div>
            </Link>
        </div>
    );
};

export default ModeConfigCard;
