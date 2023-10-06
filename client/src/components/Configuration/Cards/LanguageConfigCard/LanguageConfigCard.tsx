import { IoLanguageSharp } from 'react-icons/io5';
import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';

const LanguageConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configlist`} state={'languages'}>
                <div className={styles.configCard}>
                    <IoLanguageSharp className={styles.configIcon}/>
                    <h2>IDIOMAS</h2>
                </div>
            </Link>
        </div>
    );
};

export default LanguageConfigCard;
