
import { SectionFormProps } from '../../interfaces/sectionformProps';
import { ChevronDownIcon } from '../ChevronDownIcon/ChevronDownIcon';
import styles from './SectionForm.module.css';

const SectionForm = ({ title, isVisible, toggleVisibility, children }:SectionFormProps) => {
    return (
        <div>
            <section>
                <div className={styles.title}>
                    <h2>{title}</h2>
                    <span onClick={toggleVisibility}>
                        <ChevronDownIcon />
                    </span>
                </div>
            </section>
            {isVisible && <section>{children}</section>}
        </div>
    );
};

export default SectionForm;