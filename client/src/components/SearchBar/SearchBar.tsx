import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import DropdownFilter from '../DropDownFilter/DropdownFilter';

const filterOptions: Record<string, string> = {
    name: 'Título',
    category: 'Categoría',
    subcategory: 'Subcategoría',
    language: 'Idioma',
    tags: 'Etiquetas',
    mode: 'Formato del evento',
    type: 'Tipo de evento'
};

function SearchBar() {
    const [ searchValue, setSearchValue ] = useState('');
    const [ filter, setFilter ] = useState<Array<string>>([]);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const lastSearch = localStorage.getItem('lastSearch');
        if (lastSearch) {
            setSearchValue(lastSearch);
        }

        const lastFilters = localStorage.getItem('lastFilters');
        if (lastFilters) {
            setFilter(lastFilters.split(','));
        }
    }, []);

    const translateFilter = (filter: string): string => {
        const invertedTranslations: Record<string, string> = {};
        Object.entries(filterOptions).forEach(([ key, value ]) => {
            invertedTranslations[value] = key;
        });
    
        return invertedTranslations[filter] || filter;
    };

    const handleSearch = () => {
        const filters = filter.length === 0 ? Object.keys(filterOptions) : filter;
        const filtersString = filters.map(translateFilter).join(',');

        localStorage.setItem('lastSearch', searchValue);
        localStorage.setItem('lastFilters', filtersString);
    
        navigate(`/allevents?keywords=${searchValue}&filters=${filtersString}`);
    };

    const handleFilterChange = (selectedFilters: Array<string>) => {
        setFilter(selectedFilters);
    };

    // Search with 'enter'
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.filterField}>
                <DropdownFilter
                    id="search"
                    label={'Buscar por filtro'}
                    options={Object.values(filterOptions)}
                    values={filter}
                    onChange={handleFilterChange}
                />
            </div>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Buscar eventos"
                    value={searchValue}
                    onChange={handleInputChange}
                    aria-label="Buscar eventos"
                    onKeyPress={handleKeyPress}
                />
                <button className={styles.searchIcon} onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>
            
        </div>
    );
}

export default SearchBar;
