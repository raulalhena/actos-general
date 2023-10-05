import styles from './SubcategoryConfigCard.module.css';
import { Link } from 'react-router-dom';

const SubcategoryConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configform`} state={'subcategories'}>
                <div className={styles.card}>
                    <h2>SUBCATEGORIAS</h2>
                </div>
            </Link>
        </div>
    );
};

export default SubcategoryConfigCard;
