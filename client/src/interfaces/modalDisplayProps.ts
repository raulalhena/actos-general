import { ReactNode } from 'react';

export interface ModalDisplayProps {
    icon?: ReactNode;
    title: string;
    subtitle?: string;
    button1Text?: string;
    button2Text?: string;
    onClose: () => void;
    isOpen: boolean;
    onButton1Click?: () => void;
    onButton2Click?: () => void;
    showCloseButton: boolean;
}