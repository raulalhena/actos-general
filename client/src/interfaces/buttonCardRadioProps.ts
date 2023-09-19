export interface ButtonCardRadioProps{
    iconColor: any;
    id: string;
    name : string;
    text: string;
    value: string;
    checked: boolean;
    onChange: (event :React.ChangeEvent<HTMLInputElement>) => void;
}