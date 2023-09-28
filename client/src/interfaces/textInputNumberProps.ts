export interface TextInputNumberProps {
    label: string;
    subtitle?: string;
    placeholder: string;
    id: string;
    // maxLength: number;
    // minLength: number;
    value: number | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string; 
    isPassword?: boolean;
    isRequired?: boolean;
}