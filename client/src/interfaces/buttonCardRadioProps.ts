export interface ButtonCardRadioProps{

    name : string;
    text: string;
    value: string;
    checked: boolean;
    onChange: (event :React.ChangeEvent<HTMLInputElement>) => void;
}