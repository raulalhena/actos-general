import { SelectProps } from '@/app/interfaces/selectProps';
import styles from './Select.module.css';

function Select(props: SelectProps) {
    const { label, options, id, value, onChange } = props;

    return (
        <div>
            <label className={styles.label}
                htmlFor={id}> 
                {label} 
            </label>
            <br />
            <select className={styles.input} id={id} value={value} onChange={onChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option} 
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;