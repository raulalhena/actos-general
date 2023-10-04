export interface DropDownCheckProps {
    id: string;
    label?: string;
    options : string[];
    values : string[];
    onChange: (values: string[]) => void;
}