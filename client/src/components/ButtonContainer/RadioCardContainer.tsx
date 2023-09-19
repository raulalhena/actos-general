import { RadioGroupContainerProps } from '../../interfaces/RadioGroupContainerProps';
import ButtonCardRadio from '../Button/ButtonContainer/ButtonCardRadio/ButtonCardRadio';
import styles from './RadioGroupContainer.module.css';

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
                {radioButtons.map((radioButton) => (
                    <ButtonCardRadio
                        key={radioButton.id}
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
