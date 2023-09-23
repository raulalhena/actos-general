
import ReactModal from 'react-modal';
import styles from './ModalDisplay.module.css';
import ButtonWhite from '../ButtonWhite/ButtonWhite';
import ButtonRed from '../ButtonRed/ButtonRed';
import { ModalDisplayProps } from '../../interfaces/modalDisplayProps';
import { useNavigate } from 'react-router-dom';

const ModalDisplay = (props: ModalDisplayProps) => {

    const { icon, title, subtitle, button1Text, button2Text, onClose, isOpen, modalParams } = props;

    const navigator = useNavigate();
    const handleNavigate = () => {
        if(modalParams)
            navigator( modalParams.route, { state:{ id:modalParams.eventId } });
    };

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
                    <div className={styles.modalHeader}>
                        
                        <button className={styles.closeButton} onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <div className={styles.modalBody}>
                        <div className={styles.icon}>{icon}</div>
                        <h2><b>{title}</b></h2>
                        <p>{subtitle}</p>
                        <div className={styles.modalFooter}>
                            <ButtonWhite label={button1Text} onClick={handleNavigate}/>
                            {button2Text && <ButtonRed label={button2Text} />}
                        </div>
                    </div>
                    
                </div>
            </div>
        </ReactModal>
    );

};

export default ModalDisplay;