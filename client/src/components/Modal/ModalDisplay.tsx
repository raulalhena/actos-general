import ReactModal from 'react-modal';
import styles from './ModalDisplay.module.css';
import ButtonWhite from '../ButtonWhite/ButtonWhite';
import ButtonRed from '../ButtonRed/ButtonRed';
import { ModalDisplayProps } from '../../interfaces/modalDisplayProps';

const ModalDisplay = (props: ModalDisplayProps) => {

    const { icon, title, subtitle, button1Text, button2Text, onClose, isOpen, showCloseButton, onButton1Click, onButton2Click } = props;

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Modal"
            shouldCloseOnOverlayClick={true}
            style={{
                overlay: {
                    backgroundColor: 'rgba(200, 200, 200, 0.6)',
                },
                content: {
                    border: 'none',
                    borderRadius: '2rem', 
                    padding: '2rem', 
                    maxWidth: '100%',
                    margin: 'auto',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
            }}
        >
            <div className={styles.container}>
                <div className={styles.modalContent}>

                    {showCloseButton && <div className={styles.modalHeader}>
                        <button className={styles.closeButton} onClick={onClose}>
                            &times;
                        </button>
                    </div>}
                    <div className={styles.modalBody}>
                        <div className={styles.icon}>{icon}</div>
                        <h2 className={styles.h2}><b>{title}</b></h2>
                        <p className={styles.p}>{subtitle}</p>
                        <div className={styles.modalFooter}>
                            {button1Text && <ButtonWhite label={button1Text} onClick={onButton1Click}/>}
                            {button2Text && <ButtonRed label={button2Text} onClick={onButton2Click}/>}
                        </div>
                    </div>
                    
                </div>
            </div>
        </ReactModal>
    );

};

export default ModalDisplay;
