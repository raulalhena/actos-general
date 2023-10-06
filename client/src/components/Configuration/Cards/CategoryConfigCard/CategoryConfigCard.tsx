import styles from './CategoryConfigCard.module.css';
import { Link } from 'react-router-dom';

const CategoryConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configlist`} state={'categories'}>
                <div className={styles.card}>
                    <h2>CATEGORIAS</h2>
                </div>
            </Link>
        </div>
    );
};

export default CategoryConfigCard;
