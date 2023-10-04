import { RadioGroupContainerProps } from '../../../interfaces/RadioGroupContainerProps';
import ButtonCardRadio from './ButtonCardRadio/ButtonCardRadio';
import styles from './RadioCardContainer.module.css';

function RadioCardContainer({
    radioButtons,
    selectedValue,
    label,
    onChange,
}: RadioGroupContainerProps) {

    console.log('radio buttons', radioButtons);
    return (
        <div>
            <label className={styles.label}>{label}</label>
            <br />
            <div className={styles.radioGroupContainer}>
                {radioButtons.map((radioButton, index) => (
                    <ButtonCardRadio
                        key={index}
                        {...radioButton}
                        checked={selectedValue === radioButton.value}
                        onChange={() => onChange(radioButton.value)}
                    />
                ))}
            </div>
        </div>
    );
}

export default RadioCardContainer;
