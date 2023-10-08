import styles from '../GlobalConfigCard.module.css';
import { Link } from 'react-router-dom';
import { TbGoGame } from 'react-icons/tb';

const SubcategoryConfigCard = () => {
    
    return (
        <div>
            <Link to={`/config/configlistsubcategories`} state={'subcategories'}>
                <div className={styles.configCard}>
                    <TbGoGame className={styles.configIcon}/>
                    <h5>SUBCATEGORÍAS</h5>
                </div>
            </Link>
        </div>
    );
};

export default SubcategoryConfigCard;
