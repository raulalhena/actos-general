import { ButtonCardRadioProps } from '../../../../interfaces/buttonCardRadioProps';
import styles from './ButtonCardRadio.module.css';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

const ButtonCardRadio = (props: ButtonCardRadioProps) => {

    return (
        <div className={styles.cardButtonContainer}>
            <label className={styles.cardButton} >
                <input
                    type="radio"
                    name={props.name}
                    value={props.name}
                    checked={props.checked}
                    onChange={props.onChange}
                />
                {props.checked ? (
                    <IoCheckmarkCircleSharp
                        className={styles.icon}
                        // color="green"
                    />
                ) : null}
                <span className={styles.text}>{props.name}</span>
            </label>
        </div>
    );
};

export default ButtonCardRadio;