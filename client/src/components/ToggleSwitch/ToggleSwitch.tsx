import { useState } from 'react';
import Switch from 'react-switch';
import styles from './ToggleSwitch.module.css';
import { ToggleSwitchProps } from '../../interfaces/toggleSwitchProps';

const ToggleSwitch = ({ id, label, subtitle }: ToggleSwitchProps) => {
    const [ isChecked, setIsChecked ] = useState(false);

    const handleChange = (checked: boolean) => {
        setIsChecked(checked);
    };

    return (
        <div className={styles.toggleContainer}>
            <div>
                <label className={styles.label} htmlFor={id}>
                    {label}
                </label>
                <br />
                <label className={styles.subtitle} htmlFor={id}>
                    {subtitle}
                </label>
            </div>
            <div>
                <Switch
                    onChange={handleChange}
                    checked={isChecked}
                    onColor="#F2C3BA"
                    onHandleColor="#E15A40"
                    height={20}
                    width={45}
                    handleDiameter={16}
                />
            </div>
        </div>
    );
};

export default ToggleSwitch;
