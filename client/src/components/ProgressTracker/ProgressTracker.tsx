import styles from './ProgressTracker.module.css';

interface ProgressTrackerProps {
    isSection1Visible: boolean;
    isSection2Visible: boolean;
    isSection3Visible: boolean;
    isSection1Complete: boolean;
    isSection2Complete: boolean;
    // isSection3Complete: boolean;
  }

const ProgressTracker = ({
    isSection1Visible,
    isSection2Visible,
    isSection3Visible,
    isSection1Complete,
    isSection2Complete,
    // isSection3Complete
}: ProgressTrackerProps) => {
    return (
        <div>
            <div className={`${styles.container} ${styles.step} ${isSection1Visible ? styles.highlight : ''}`}>
                <div>INFORMACIÓN BÁSICA</div>
                <div className={isSection1Complete ? styles.greenText : styles.redText}><IoCheckmarkCircle /></div>
                
            </div>
            <div className={`${styles.container} ${styles.step} ${isSection2Visible ? styles.highlight : ''}`}>
                <div>DETALLES</div>
                <div className={isSection2Complete ? styles.greenText : styles.redText}><IoCheckmarkCircle /></div>
            </div>
            <div className={`${styles.container} ${styles.step} ${isSection3Visible ? styles.highlight : ''}`}>
                <div>INSCRIPCIONES Y ENTRADAS</div>
                {/* <div className={//isSection3Complete ? styles.greenText : styles.redText}><IoCheckmarkCircle /></div> */}
            </div>
        </div>
    );
};
export default ProgressTracker;