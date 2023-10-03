import { TextInputProps } from '../../interfaces/textInputProps';
import styles from './ConfirmPasswordInput.module.css';

function ConfirmPasswordInput(props: TextInputProps) {
    const { label, placeholder, id, maxLength, minLength, value, onChange } =
    props;

    return (
        <div>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <br />
            <input
                required
                type='password'
                id={id}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                className={styles.input}
            />
        </div>
    );
}

export default ConfirmPasswordInput;
