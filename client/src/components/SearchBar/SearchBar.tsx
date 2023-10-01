import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
    return (
        <div className={styles.searchBar}>
            <div className={styles.searchWrapper}>
                <div className={styles.inputHolder}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Type to search"
                    />
                </div>
            </div>
                    <button className={styles.searchIcon}>
                        <FaSearch />
                    </button>
        </div>
    );
}

export default SearchBar;
