import { FormFieldProps } from '../../interfaces/formFieldProps';
import styles from './FormField.module.css';

const FormField = ({ children }:FormFieldProps) => {
    return (
        <div className={styles.formField}>
            {children}
        </div>
    );
};

export default FormField;