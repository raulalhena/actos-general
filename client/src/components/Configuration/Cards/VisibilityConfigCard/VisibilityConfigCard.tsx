import { AiFillEye } from 'react-icons/ai';
import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';

const VisibilityConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configlist`} state={'visibilities'}>
                <div className={styles.configCard}>
                    <AiFillEye className={styles.configIcon}/>
                    <h5>VISIBILIDAD</h5>
                </div>
            </Link>
        </div>
    );
};

export default VisibilityConfigCard;
