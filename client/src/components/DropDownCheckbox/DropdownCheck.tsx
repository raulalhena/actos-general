import { useState } from 'react';
import  Style from './DropdownCheck.module.css';
import { default as ReactSelect } from 'react-select';
import { components } from 'react-select';
import { DropDownCheckProps } from '../../interfaces/dropDownCheckProps.js';

const Option = (props: any) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{' '}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

function DropdownCheck(props: DropDownCheckProps) {
    const { options, id, label } = props;

    const toJsonObject = (element: string): object => {
        return { 
            value: element,
            label: element,
        };
    };

    const [ selected, setSelected ] = useState(null);

    const handleChange = (selectedOption: any) => {
        setSelected(selectedOption.value);
    };
    const customStyles = {
        // Otros estilos si los necesitas
        placeholder: (provided: any) => ({
            ...provided,
            fontSize: '12px',
        }),
    };

    return (
        <div className={Style.option}>
            <div>
                <label className={Style.label}
                    htmlFor={id}> 
                    {label} 
                </label>
            </div>
            <br />
            <div>
                <span
                    className={`d-inline-block`}
                    data-toggle="popover"
                    data-trigger="focus"
                    data-content="Seleciona uno o más opciones"

                >
                    <ReactSelect
                        options={options.map(toJsonObject)}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                            Option,
                        }}
                        onChange={handleChange}
                        value={selected}
                        placeholder="Seleciona"
                        styles={customStyles}
                    />
                </span>
            </div>
            
        </div>
    );

}

export default DropdownCheck;