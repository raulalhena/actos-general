export interface SelectProps {
    label: string;
    options: string[];
    id: string;
    value: string | string[] | undefined;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    isRequired?: boolean;
}