import styles from './CategoryCard.module.css';
import { CategoryCardProps } from '../../../interfaces/categoryCardProps';
import { Link } from 'react-router-dom';

const CategoryCard = ({ categoryData, categoryId }: CategoryCardProps) => {

    const categoryUrl = `/event/${categoryId}`;

    return (
        <Link to={categoryUrl} >
            <div className={styles.category}>
                <h2>{categoryData.title}</h2>
            
                <img src={categoryData.image} className={styles.image} />
            </div>
        </Link>
    );
};

export default CategoryCard;