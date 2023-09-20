import { useState } from 'react';
import styles from './DropdownButton.module.css';

function DropdownButton() {
    const [ selectedOption, setSelectedOption ] = useState('Draft');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className={styles.container}>
            <select
                id="selectOption"
                value={selectedOption}
                onChange={handleOptionChange}
                className={styles.select}
            >
                <option value="Draft">
          BORRADOR
                </option>
                <option value="Public">PÚBLICO</option>
            </select>
        </div>
    );
}

export default DropdownButton;
