import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';
import { MdCategory } from 'react-icons/Md';

const SubcategoryConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configform`} state={'subcategories'}>
                <div className={styles.configCard}>
                    <MdCategory className={styles.configIcon}/>
                    <h2>SUBCATEGORÍAS</h2>
                </div>
            </Link>
        </div>
    );
};

export default SubcategoryConfigCard;
