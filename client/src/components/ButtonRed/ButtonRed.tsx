import { ButtonSubmitProps } from '../../interfaces/buttonSubmitProps';
import styles from './ButtonRed.module.css';

const ButtonRed = ({ label }: ButtonSubmitProps) => {
    return (
        <div className={styles.container}>
            <button className={styles.button} type="submit">
                {label}
            </button>
        </div>
    );
};

export default ButtonRed;
