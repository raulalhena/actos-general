export interface SelectSubcategoriesProps {
    label?: string;
    options: string[];
    id: string;
    value: number |string | string[] | undefined;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    isRequired?: boolean;
}