import CategoryCard from './CategoryCard/CategoryCard';
import styles from './HomePageCategories.module.css';
import categories from '../../data/categoryHomePage.json';

const HomePageCategories = () => {
    const categoryCards = categories.map((category, index) => (
        <CategoryCard key={index} categoryData={category} categoryId={index} />
    ));

    return (
        <div className={styles.categoriesSection}>
            {categoryCards}
        </div>
    );
};

export default HomePageCategories;