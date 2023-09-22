import { SectionFormProps } from '../../interfaces/sectionformProps';
import { ChevronDownIcon } from '../ChevronDownIcon/ChevronDownIcon';
import styles from './SectionForm.module.css';
import { useState } from 'react';

const SectionForm = ({ title, isVisible, toggleVisibility, children }: SectionFormProps) => {
    const [ isRotated, setIsRotated ] = useState(false);

    const handleSectionClick = () => {
        setIsRotated(!isRotated);
        toggleVisibility();
    };

    return (
        <div>
            <span>
                <section onClick={handleSectionClick} style={{ cursor: 'pointer' }}>
                    <div className={styles.title}>
                        <h2>{title}</h2>
                        <ChevronDownIcon isRotated={isRotated} />
                    </div>
                </section>
            </span>
            {isVisible && <section>{children}</section>}
        </div>
    );
};

export default SectionForm;
