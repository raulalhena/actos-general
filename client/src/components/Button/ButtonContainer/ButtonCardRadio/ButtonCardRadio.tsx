import { ButtonCardRadioProps } from '../../../../interfaces/buttonCardRadioProps';
import styles from './ButtonCardRadio.module.css';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

const ButtonCardRadio = (props: ButtonCardRadioProps) => {
    const handleClick = () => {
        if (props.onChange) {
            props.onChange(props.value);
        }
    };

    return (
        <div className={styles.cardButtonContainer}>
            <label className={styles.cardButton} onClick={handleClick}>
                <IoCheckmarkCircleSharp
                    type="radio"
                    className={`${styles.icon} ${props.checked ? styles.checked : ''}`}
                    name={props.name}
                    value={props.value}
                    checked={props.checked}
                />
                <span>{props.text}</span>
            </label>
        </div>
    );
};

export default ButtonCardRadio;
