import { DateInputProps } from '../../interfaces/dateInputProps';
import  Style from './DateInput.module.css';
const DateInput = (props : DateInputProps) => {
   
    const { id, name, value, onChange } = props;

    return (
        <div data-testid="date-input" className={Style.datecontainer}>
            <div >
                <label 
                    className={Style.label}
                    htmlFor="datePicker">
                        Fecha *
                </label>
            </div>
            <input
                className={Style.input}
                type="date"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default DateInput;