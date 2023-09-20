import { ButtonProps } from '../../interfaces/buttonProps';
import styles from './ButtonSubmit.module.css';

const ButtonSubmit = ({ label }: ButtonProps) => {
    
    return (
        <div className={styles.container}>
            <button className={styles.buttonStyle} type="submit">
                {label}
            </button>
        </div>
    );
};

export default ButtonSubmit;