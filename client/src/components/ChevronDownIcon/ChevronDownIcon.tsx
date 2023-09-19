import { IoChevronDown } from 'react-icons/io5';
import styles from './ChevrownDownIcon.module.css';
import { useState } from 'react';

export const ChevronDownIcon = () => {
    const [ isRotated, setIsRotated ] = useState(false); 

    const toggleRotation = () => {
        setIsRotated(!isRotated);
    };
    return (
        <IoChevronDown
            className={`${styles.downButton} ${isRotated ? styles.rotated : ''}`}
            onClick={toggleRotation}
        />
    );
};
