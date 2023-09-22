export interface TextAreaProps {
    label: string;
    subtitle?: string;
    placeholder: string;
    id: string;
    maxLength: number;
    minLength: number;
    value: string | undefined;
    onChange: (text: string) => void;
    className?: string; 
    isPassword?: boolean;
    isRequired?: boolean;
    type?: string;
}