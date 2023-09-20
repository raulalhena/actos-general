import { ButtonSubmitProps } from '../../interfaces/buttonSubmitProps';
import styles from './ButtonWhite.module.css';

const ButtonWhite = ({ label }: ButtonSubmitProps) => {
    return (
        <div className={styles.container}>
            <button className={styles.button} type="submit">
                {label}
            </button>
        </div>
    );
};

export default ButtonWhite;
