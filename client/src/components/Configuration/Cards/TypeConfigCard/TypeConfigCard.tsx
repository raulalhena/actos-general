import { IoPeopleSharp } from 'react-icons/io5';
import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';

const TypeConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configlist`} state={'types'}>
                <div className={styles.configCard}>
                    <IoPeopleSharp className={styles.configIcon}/>
                    <h5>TIPOS DE EVENTOS</h5>
                </div>
            </Link>
        </div>
    );
};

export default TypeConfigCard;
