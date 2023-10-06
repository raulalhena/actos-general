import { IoPeopleSharp } from 'react-icons/io5';
import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';

const TypeConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configform`} state={'types'}>
                <div className={styles.configCard}>
                    <IoPeopleSharp className={styles.configIcon}/>
                    <h2>TIPOS DE EVENTOS</h2>
                </div>
            </Link>
        </div>
    );
};

export default TypeConfigCard;
