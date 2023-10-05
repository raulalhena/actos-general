import styles from './TimeZoneConfigCard.module.css';
import { Link } from 'react-router-dom';

const TimeZoneConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configform`} state={'timezones'}>
                <div className={styles.card}>
                    <h2>ZONAS HORARIAS</h2>
                </div>
            </Link>
        </div>
    );
};

export default TimeZoneConfigCard;
