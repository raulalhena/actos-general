import { TextInputWithSubtitleProps } from '../../interfaces/textInputWithSubtitleProps';
import styles from './TextInputWithSubtitle.module.css';

function TextInputWithSubtitle(props: TextInputWithSubtitleProps) {
    const { label, subtitle, placeholder, id, maxLength, minLength, value, onChange, isRequired, type } = props;

    return (
        
        <div>
            <label className={styles.label}
                htmlFor={id}>{label}
            </label>
            <br />
            <label className={styles.subtitle}
                htmlFor={id}>{subtitle}
            </label>
            <br />
            <input 
                type={type}
                id={id} 
                placeholder={placeholder}
                minLength={minLength} 
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                className={styles.input}
                required={isRequired}
            />
        </div>
        
    );
}

export default TextInputWithSubtitle;