export interface ToggleSwitchProps {
    id: string;
    label: string;
    subtitle: string;
    isChecked: boolean;
    onChange: (checked: boolean) => void;
}