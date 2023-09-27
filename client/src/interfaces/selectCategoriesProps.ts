import { EventDashboardFormProps } from './eventDashboardFormProps';

export interface SelectCategoriesProps {
    label?: string;
    options: EventDashboardFormProps[];
    id: string;
    value: number |string | string[] | undefined;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    isRequired?: boolean;
}