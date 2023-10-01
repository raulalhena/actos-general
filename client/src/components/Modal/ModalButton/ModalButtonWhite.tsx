import styles from './ModalButtonWhite.module.css';

export interface ButtonModalProps {
    label: string;
    onClick?: () => void;
}

const ModalButtonWhite = (props: ButtonModalProps) => {
    const { label, onClick  } = props;

    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={onClick}>
                {label}
            </button>
        </div>
    );
};

export default ModalButtonWhite;
