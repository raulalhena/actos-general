import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';

const ModeConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configlist`}state={'modes'}>
                <div className={styles.configCard}>
                    <FaLocationDot className={styles.configIcon}/>
                    <h5>MODOS DE ASISTENCIA</h5>
                </div>
            </Link>
        </div>
    );
};

export default ModeConfigCard;
