import { useState } from 'react';
import  Style from './DropdownFilter.module.css';
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

function DropdownFilter(props: DropDownCheckProps) {
    const { options, values, onChange } = props;

    const toJsonObject = (element: string): object => {
        return { 
            value: element,
            label: element,
        };
    };

    const [ selected, setSelected ] = useState(values.map(toJsonObject));

    const toString = (element: { value: string }): string => {
        return element.value;
    };
    
    const handleChange = (selectedOption: any) => {
        setSelected(selectedOption);
        onChange(selectedOption.map(toString));

    };

    return (
        <div className={Style.option}>

            <div>
                <span
                    className={`d-inline-block`}
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
                        placeholder="Filtrar por"
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                'background': 'rgba(255, 255, 255, 0.5)',
                                'boxShadow': '0px 2px 4px rgba(0, 0, 0, 0.2)',
                                'borderColor': state.isFocused ? '#e15a40' : 'none',
                                'borderStyle': 'none',
                                'outline': state.isFocused ? 'none' : '#cacaca',
                                '&:hover': {
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                                },
                                'color': state.isFocused ? 'red' : 'grey',

                            }),
                            menu: (baseStyles) => ({
                                ...baseStyles,
                                textAlign: 'left',
                                
                            }),
                            input: (baseStyles) => ({
                                ...baseStyles,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '5px',
                                height: '42px',
                                fontSize: '16px',
                                fontWeight: 400,
                                paddingLeft: '1rem',

                            }),
                            dropdownIndicator: (base, state) => ({
                                ...base,
                                color: state.isFocused ? 'grey' : '#e15a40',
                        
                            }),
                        }}
                    />
                </span>
            </div>
            
        </div>
    );

}

export default DropdownFilter;