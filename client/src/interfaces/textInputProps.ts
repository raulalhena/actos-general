export interface TextInputProps {
    label: string;
    subtitle?: string;
    placeholder: string;
    id: string;
    maxLength: number;
    minLength: number;
    value: string | undefined;
    onChange: (event: TextChangeHandler) => void;
    className?: string; 
    isPassword?: boolean;
    isRequired?: boolean;
}