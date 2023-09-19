
import { DateInputProps } from '../../interfaces/dateInputProps';
import  Style from './DateInput.module.css';
const DateInput = (props : DateInputProps) => {
   
    const { id, name, value, onChange } = props;

    return (
        <div>
            <label htmlFor="datePicker">Selecciona una fecha:</label>
            <input
                className={Style.reactDate}
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
