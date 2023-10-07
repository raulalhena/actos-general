import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';
import { BiSolidCategoryAlt } from 'react-icons/bi';

const CategoryConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configlist`} state={'categories'}>
                <div className={styles.configCard}>
                    <BiSolidCategoryAlt className={styles.configIcon}/>
                    <h5>CATEGORÍAS</h5>
                </div>
            </Link>
        </div>
    );
};

export default CategoryConfigCard;
