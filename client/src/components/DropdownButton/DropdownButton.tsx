import { useState } from 'react';
import styles from './DropdownButton.module.css';

function DropdownButton() {
    const [selectedOption, setSelectedOption] = useState('Draft');

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
                <option value="Draft">Draft</option>
                <option value="Public">Public</option>
            </select>
        </div>
    );
}

export default DropdownButton;
