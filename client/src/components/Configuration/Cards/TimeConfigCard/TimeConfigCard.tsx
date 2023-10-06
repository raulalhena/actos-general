import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';
import { BiSolidHourglass } from 'react-icons/bi';

const TimeConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configform`} state={'times'}>
                <div className={styles.configCard}>
                    <BiSolidHourglass className={styles.configIcon}/>
                    <h2>RANGOS HORARIOS</h2>
                </div>
            </Link>
        </div>
    );
};

export default TimeConfigCard;
