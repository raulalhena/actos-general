export interface SelectCategoriesProps {
    label?: string;
    options: object[];
    id: string;
    value: number |string | string[] | undefined;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    isRequired?: boolean;
}