export interface SelectProps {
    label: string;
    options: string[];
    id: string;
    value: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}