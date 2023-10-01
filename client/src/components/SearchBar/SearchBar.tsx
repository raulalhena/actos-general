// import React, { useState } from 'react';
// import styles from './SearchBar.module.css';
// import { FaSearch } from 'react-icons/fa';

// function SearchBar() {
//     const [isSearchOpen, setIsSearchOpen] = useState(false);

//     const toggleSearch = () => {
//         setIsSearchOpen(!isSearchOpen);
//     };

//     return (
//         <>
//             <div className={`${styles.searchWrapper} ${isSearchOpen ? styles.active : ''}`}>
//                 <div className={styles.inputHolder}>
//                     <input
//                         type="text"
//                         className={styles.searchInput}
//                         placeholder="Type to search"
//                     />
//                     <button className={styles.searchIcon} onClick={toggleSearch}>
//                         {isSearchOpen ? <span>&times;</span> : <FaSearch />}
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default SearchBar;
