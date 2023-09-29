export interface TextInputNumberProps {
    label: string;
    subtitle?: string;
    placeholder: string;
    id: string;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string; 
    isPassword?: boolean;
    isRequired?: boolean;
}