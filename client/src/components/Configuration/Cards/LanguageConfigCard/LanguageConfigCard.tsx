import styles from './LanguageConfigCard.module.css';
import { Link } from 'react-router-dom';

const LanguageConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configlist`} state={'languages'}>
                <div className={styles.card}>
                    <h2>IDIOMAS</h2>
                </div>
            </Link>
        </div>
    );
};

export default LanguageConfigCard;
