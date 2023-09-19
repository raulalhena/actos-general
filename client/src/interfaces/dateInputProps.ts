import { ChangeEvent } from 'react';

export interface DateInputProps {
    id : string;
    name : string;
    value : string;
    onChange : (e: ChangeEvent<HTMLInputElement>) => void;
}