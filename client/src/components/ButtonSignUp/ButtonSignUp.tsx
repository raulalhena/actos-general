import { ButtonSubmitProps } from '@/app/interfaces/buttonSubmitProps';
import styles from './ButtonSignUp.module.css';

const ButtonSignUp = ({ label }: ButtonSubmitProps) => {
    return (
        <div className={styles.container}>
            <button className={styles.button} type="submit">
                {label}
            </button>
        </div>
    );
};

export default ButtonSignUp;
