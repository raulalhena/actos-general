import { IoChevronDown } from 'react-icons/io5';
import styles from './ChevrownDownIcon.module.css';
import { ChevronDownIconProps } from '../../interfaces/chevronDownIconProps';

export const ChevronDownIcon = (props: ChevronDownIconProps) => {
    const { isRotated } = props;

    return (
        <IoChevronDown
            className={`${styles.downButton} ${isRotated ? '': styles.rotated  }`}
        />
    );
};
