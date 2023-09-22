export interface DropdownButtonProps {
    label: string;
    options: string[];
    id: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}