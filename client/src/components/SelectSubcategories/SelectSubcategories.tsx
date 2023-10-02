import { SelectSubcategoriesProps } from '../../interfaces/selectSubcategoriesProps';
import styles from './SelectSubcategories.module.css';

function SelectSubcategories(props: SelectSubcategoriesProps) {
    const { label, options, id, value, onChange } = props;

    return (
        <div>
            <label className={styles.label} htmlFor={id}> 
                {label} 
            </label>
            <br />
            <select className={styles.input} id={id} value={value} onChange={onChange}>
                <option value=''> Seleciona </option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option} 
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectSubcategories;