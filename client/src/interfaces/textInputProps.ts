import { ChangeEvent } from 'react';

export interface TextInputProps {
    label: string;
    subtitle?: string;
    placeholder: string;
    id: string;
    maxLength: number;
    minLength: number;
    value: string | undefined;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    className?: string; 
    isPassword?: boolean;
    isRequired?: boolean;
    type?: string;
}