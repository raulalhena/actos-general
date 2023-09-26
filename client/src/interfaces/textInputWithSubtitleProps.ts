import { ChangeEvent } from 'react';

export interface TextInputWithSubtitleProps {
    label: string;
    subtitle: string;
    placeholder: string;
    id: string;
    maxLength: number;
    minLength: number;
    value: number | string[] | undefined | string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    type?: string;
}