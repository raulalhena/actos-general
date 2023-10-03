import { ButtonSubmitProps } from '../../../interfaces/buttonSubmitProps';
import styles from './ButtonInscription.module.css';
import { IoTicketOutline } from 'react-icons/io5';

const ButtonInscription = (props: ButtonSubmitProps) => {
    const { label, onClick } = props;
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={onClick}>
                <IoTicketOutline className={styles.ticketIcon} />
                {label}
            </button>
        </div>
    );
};

export default ButtonInscription;
