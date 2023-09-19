import ButtonCardRadio from '../Button/ButtonCardRadio';
import { RadioGroupContainerProps } from '@/app/interfaces/RadioGroupContainerProps';
import styles from './RadioGroupContainer.module.css';

function RadioGroupContainer({
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

export default RadioGroupContainer;
