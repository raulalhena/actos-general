export interface TextInputProps {
    label: string;
    subtitle?: string;
    placeholder: string;
    id: string;
    maxLength: number;
    minLength: number;
    value: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string; 
    isPassword?: boolean;
    isRequired?: boolean;
}