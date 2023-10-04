import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
    const [ searchValue, setSearchValue ] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };    

    const handleSearchClick = () => {
        navigate(`/allevents?keywords=${searchValue}`);
    };

    return (
        <div className={styles.searchBar}>
            <div></div>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Type to search"
                value={searchValue}
                onChange={handleInputChange}
            />
            <button className={styles.searchIcon} onClick={handleSearchClick}>
                <FaSearch />
            </button>
        </div>
    );
}

export default SearchBar;
