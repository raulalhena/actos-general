export interface ButtonCardRadioProps{
    id: string;
    name : string;
    checked: boolean;
    onChange: (event :React.ChangeEvent<HTMLInputElement>) => void;
}