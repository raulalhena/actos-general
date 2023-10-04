import { RadioGroupContainerProps } from '../../../interfaces/RadioGroupContainerProps';
import ButtonCardRadio from './ButtonCardRadio/ButtonCardRadio';
import styles from './RadioCardContainer.module.css';

function RadioCardContainer({
    radioButtons,
    selectedValue,
    label,
    onChange,
}: RadioGroupContainerProps) {
    return (
        <div>
            <label className={styles.label}>{label}</label>
            <br />
            <div className={styles.radioGroupContainer}>
                {radioButtons.map((radioButton, index) => (
                    <ButtonCardRadio
                        key={index}
                        {...radioButton}
                        checked={selectedValue === radioButton.name}
                        onChange={() => onChange(radioButton.name)}
                    />
                ))}
            </div>
        </div>
    );
}

export default RadioCardContainer;