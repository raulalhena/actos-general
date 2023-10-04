import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import DropdownFilter from '../DropDownFilter/DropdownFilter';

const translations: Record<string, string> = {
    name: 'Titulo',
    category: 'Categoria',
    subcategory: 'Subcategoria',
    language: 'Idioma',
    tags: 'Etiquetas',
};

function SearchBar() {
    const [ searchValue, setSearchValue ] = useState('');
    const [ filter, setFilter ] = useState<Array<string>>([]);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearchClick = () => {
        const filters = filter.length === 0 ? Object.keys(translations) : filter;
        const filtersString = filters.join(',');
        navigate(`/allevents?keywords=${searchValue}&filters=${filtersString}`);
    };

    const handleFilterChange = (selectedFilters: Array<string>) => {
        setFilter(selectedFilters);
    };

    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.filterField}>
                <DropdownFilter
                    id="search"
                    label={'Buscar por filtro'}
                    options={Object.keys(translations)}
                    values={filter}
                    onChange={handleFilterChange}
                />
            </div>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Escribe para buscar"
                    value={searchValue}
                    onChange={handleInputChange}
                />
                <button className={styles.searchIcon} onClick={handleSearchClick}>
                    <FaSearch />
                </button>
            </div>
            
        </div>
    );
}

export default SearchBar;
