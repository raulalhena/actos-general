import { TextInputNumberProps } from '../../interfaces/textInputNumberProps';
import styles from './TextInputNumber.module.css';

function TextInputNumber(props: TextInputNumberProps) {
    const { label, placeholder, id,value, onChange , isRequired } =
    props;

    return (
        <div>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <br />
            <input
                required={isRequired}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={styles.input}
            />
        </div>
    );
}

export default TextInputNumber;
