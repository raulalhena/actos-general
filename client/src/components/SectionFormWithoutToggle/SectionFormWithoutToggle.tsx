import { SectionFormProps } from '../../interfaces/sectionformProps';
import styles from './SectionFormWithoutToggle.module.css';

const SectionFormWithoutToggle = ({ title, children }: SectionFormProps) => {
    
    return (
        <div>
            <span >
                <section className={styles.sectionContainer} >
                    <div className={styles.title}>
                        <h2>{title}</h2>
                    </div>
                </section>
            </span>
            {<section className={styles.sectionContent}>
                {children}
            </section>}
        </div>
    );
};

export default SectionFormWithoutToggle;
