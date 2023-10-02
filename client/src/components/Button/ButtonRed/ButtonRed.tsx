import { ButtonSubmitProps } from '../../../interfaces/buttonSubmitProps';
import styles from './ButtonRed.module.css';

const ButtonRed = (props: ButtonSubmitProps) => {
    const { label, onClick } = props;
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={onClick}>
                {label}
            </button>
        </div>
    );
};

export default ButtonRed;
