import { SectionFormProps } from '../../interfaces/sectionformProps';
import { ChevronDownIcon } from '../ChevronDownIcon/ChevronDownIcon';
import styles from './SectionForm.module.css';

const SectionForm = ({ title, isVisible, toggleVisibility, children }: SectionFormProps) => {
    
    return (
        <div>
            <span>
                <section onClick={toggleVisibility} style={{ cursor: 'pointer' }}>
                    <div className={styles.title}>
                        <h2>{title}</h2>
                        <ChevronDownIcon isRotated={!isVisible} />
                    </div>
                </section>
            </span>
            {isVisible && <section>{children}</section>}
        </div>
    );
};

export default SectionForm;
