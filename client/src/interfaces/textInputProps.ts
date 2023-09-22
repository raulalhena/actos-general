export interface TextInputProps {
    label: string;
    subtitle?: string;
    placeholder: string;
    id: string;
    maxLength: number;
    minLength: number;
    value: string | undefined;
    onChange: (event: handleTextChange) => void;
    className?: string; 
    isPassword?: boolean;
    isRequired?: boolean;
    type?: string;
}