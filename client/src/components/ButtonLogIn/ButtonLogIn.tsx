
import { ButtonSubmitProps } from '../../interfaces/buttonSubmitProps';
import styles from './ButtonLogIn.module.css';

const ButtonLogIn = ({ label }: ButtonSubmitProps) => {
    return (
        <div className={styles.container}>
            <button className={styles.button} type="submit">
                {label}
            </button>
        </div>
    );
};

export default ButtonLogIn;
