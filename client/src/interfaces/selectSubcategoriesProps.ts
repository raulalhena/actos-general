import { SubcategoryProps } from './subcategoryProps';

export interface SelectSubcategoriesProps {
    label?: string;
    options: SubcategoryProps[];
    id: string;
    value: number |string | string[] | undefined;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    isRequired?: boolean;
}