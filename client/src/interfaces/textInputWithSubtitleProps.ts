export interface TextInputWithSubtitleProps {
    label: string;
    subtitle: string;
    placeholder: string;
    id: string;
    maxLength: number;
    minLength: number;
    value: number | string[] | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}