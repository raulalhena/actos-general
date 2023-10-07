export interface SectionFormProps {
    title: string;
    isVisible?: boolean;
    toggleVisibility?: () => void;
    children: React.ReactNode;
}