import { TextInputProps } from '../../interfaces/textInputProps';
import styles from './TextInput.module.css';

function TextInput(props: TextInputProps) {
    const { label, placeholder, id, maxLength, minLength, value, isPassword, onChange , isRequired, type } =
    props;

    return (
        <div>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <br />
            <input
                required={isRequired}
                type={isPassword ? 'password' : type}
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

export default TextInput;
