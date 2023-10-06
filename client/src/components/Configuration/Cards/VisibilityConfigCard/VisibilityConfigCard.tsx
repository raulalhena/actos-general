import { MdVisibility } from 'react-icons/Md';
import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';

const VisibilityConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configlist`} state={'visibilities'}>
                <div className={styles.configCard}>
                    <MdVisibility className={styles.configIcon}/>
                    <h2>VISIBILIDAD</h2>
                </div>
            </Link>
        </div>
    );
};

export default VisibilityConfigCard;
