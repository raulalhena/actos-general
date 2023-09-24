import { SelectSubcategoriesProps } from '../../interfaces/selectSubcategoriesProps';
import styles from './SelectSubcategories.module.css';

function SelectSubcategories(props: SelectSubcategoriesProps) {
    const { label, options, id, value, onChange } = props;

    console.log(options)

    return (
        <div>
            <label className={styles.label} htmlFor={id}> 
                {label} 
            </label>
            <br />
            <select className={styles.input} id={id} value={value} onChange={onChange}>
                <option value=''> Seleciona </option>
                {options.map((option) => (
                    <option key={option._id} value={option.name}>
                        {option.name} 
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectSubcategories;