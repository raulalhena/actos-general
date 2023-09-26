import { SectionFormProps } from '../../interfaces/sectionformProps';
import { ChevronDownIcon } from '../ChevronDownIcon/ChevronDownIcon';
import ProgressTracker from '../ProgressTracker/ProgressTracker';
import styles from './SectionForm.module.css';

const SectionForm = ({ title, isVisible, toggleVisibility, children }: SectionFormProps) => {
    
    return (
        <div>
            <span>
                <section onClick={toggleVisibility} className={styles.sectionContainer} >
                    <div className={styles.tracker}>
                        <ProgressTracker
                            isSectionVisible={isVisible}
                            title={title}
                        />
                    </div>
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
