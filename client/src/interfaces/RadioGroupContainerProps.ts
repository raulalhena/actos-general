import { ButtonCardRadioProps } from './buttonCardRadioProps';

export interface RadioGroupContainerProps {
    label: string ;
    radioButtons: ButtonCardRadioProps[];
    selectedValue: string ;
    onChange: (value: string) => void;
    isRequired?: boolean;
  }
