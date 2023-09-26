import SelectCategoriesProps from '../../interfaces/selectProps';
import styles from './SelectCategories.module.css';

function SelectCategories(props: SelectCategoriesProps) {
    const { label, options, id, value, onChange } = props;

    return (
        <div>
            <label className={styles.label} htmlFor={id}> 
                {label} 
            </label>
            <br />
            <select className={styles.input} id={id} value={value} onChange={onChange}>
                <option value=''> Seleciona </option>
                {options.map((option) => (
                    <option key={option._id} label={option.name} value={option._id}>
                        {option.name} 
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectCategories;