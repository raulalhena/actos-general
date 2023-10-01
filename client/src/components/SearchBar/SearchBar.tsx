import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Type to search"
            />
            <button className={styles.searchIcon}>
                <FaSearch />
            </button>
        </div>
    );
}

export default SearchBar;
