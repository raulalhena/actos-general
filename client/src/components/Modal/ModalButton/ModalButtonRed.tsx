import styles from './ModalButtonRed.module.css';

export interface ButtonModalProps {
    label: string;
    onClick?: () => void;
}

const ModalButtonRed = (props: ButtonModalProps) => {
    const { label, onClick  } = props;

    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={onClick}>
                {label}
            </button>
        </div>
    );
};

export default ModalButtonRed;
