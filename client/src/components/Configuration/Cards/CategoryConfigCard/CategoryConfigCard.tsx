import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';
import { BiSolidCategoryAlt } from 'react-icons/bi';

const CategoryConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configform`} state={'categories'}>
                <div className={styles.configCard}>
                    <BiSolidCategoryAlt className={styles.configIcon}/>
                    <h2>CATEGORÍAS</h2>
                </div>
            </Link>
        </div>
    );
};

export default CategoryConfigCard;
