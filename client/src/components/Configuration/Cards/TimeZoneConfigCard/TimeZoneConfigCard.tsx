import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';
import { BiSolidTimeFive } from 'react-icons/bi';

const TimeZoneConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configlist`} state={'timezones'}>
                <div className={styles.configCard}>
                    <BiSolidTimeFive className={styles.configIcon}/>
                    <h5>ZONAS HORARIAS</h5>
                </div>
            </Link>
        </div>
    );
};

export default TimeZoneConfigCard;
