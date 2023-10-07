import ReactModal from 'react-modal';
import styles from './ModalDisplay.module.css';
import { ModalDisplayProps } from '../../interfaces/modalDisplayProps';
import ModalButtonRed from './ModalButton/ModalButtonRed';
import ModalButtonNoBorder from './ModalButton/ModalButtonNoBorder';
import { useEffect } from 'react';

const ModalDisplay = (props: ModalDisplayProps) => {
    const {
        icon,
        title,
        subtitle,
        button1Text,
        button2Text,
        onClose,
        isOpen,
        showCloseButton,
        onButton1Click,
        onButton2Click,
    } = props;

    return (
        <div className={styles.modalPage}>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Modal"
                shouldCloseOnOverlayClick={true}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    },
                    content: {
                        border: 'none',
                        background: 'none',
                    },
                }}
            >
                <div className={styles.container}>
                    <div className={styles.modalContent}>
                        {showCloseButton && (
                            <div className={styles.modalHeader}>
                                <button className={styles.closeButton} onClick={onClose}>
                  &times;
                                </button>
                            </div>
                        )}
                        <div className={styles.modalBody}>
                            <div className={styles.icon}>{icon}</div>
                            <h2 className={styles.h2Modal}>
                                <b>{title}</b>
                            </h2>
                            <p className={styles.pModal}>{subtitle}</p>
                            <div className={styles.modalFooter}>
                                {button1Text && (
                                    <ModalButtonRed
                                        label={button1Text}
                                        onClick={onButton1Click}
                                    />
                                )}
                                {button2Text && (
                                    <ModalButtonNoBorder
                                        label={button2Text}
                                        onClick={onButton2Click}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
};

export default ModalDisplay;
