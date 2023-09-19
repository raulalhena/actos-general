import { DateInputProps } from '../../interfaces/dateInputProps';
import  Style from './DateInput.module.css';
const DateInput = (props : DateInputProps) => {
   
    const { id, name, value, onChange } = props;

    return (
        <>
            <div>
                <label 
                    className={Style.label}
                    htmlFor="datePicker">
                        Fecha:
                </label>
            </div>
            <br />
            <input
                className={Style.input}
                type="date"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
        </>
    );
};

export default DateInput;