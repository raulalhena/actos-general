import styles from './CategoryConfigCard.module.css';
import { Link } from 'react-router-dom';

const CategoryConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configform`} state={'categories'}>
                <div className={styles.card}>
                    <h2>CATEGORIAS</h2>
                </div>
            </Link>
        </div>
    );
};

export default CategoryConfigCard;
