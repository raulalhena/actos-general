export interface TagsInputProps {
    label: string;
    placeHolder: string;
    id: string;
    value: string[] | undefined;
    onChange: (tags: string[]) => void
    tagStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
}