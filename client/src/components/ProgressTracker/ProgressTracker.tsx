import styles from './ProgressTracker.module.css';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface ProgressTrackerProps {
    isSection1Visible: boolean;
    isSection2Visible: boolean;
    isSection3Visible: boolean;
    isSection1Complete: boolean;
    isSection2Complete: boolean;
  }

const ProgressTracker = ({
    isSection1Visible,
    isSection2Visible,
    isSection3Visible,
    isSection1Complete,
    // isSection2Complete
}: ProgressTrackerProps) => {
    return (
        <div>
            <div className={`${styles.container} ${styles.step} ${isSection1Visible ? styles.highlight : ''}`}>
                <div>INFORMACIÓN BÁSICA</div>
                <div className={isSection1Complete ? styles.greenText : styles.redText}><IoCheckmarkCircle /></div>
                
            </div>
            <div className={`${styles.step} ${isSection2Visible ? styles.highlight : ''}`}>DETALLES</div>
            <div className={`${styles.step} ${isSection3Visible ? styles.highlight : ''}`}>INSCRIPCIONES Y ENTRADAS</div>
        </div>
    );
};
export default ProgressTracker;