import styles from './ProgressTracker.module.css';

interface ProgressTrackerProps {
    isSection1Visible: boolean;
    isSection2Visible: boolean;
    isSection3Visible: boolean;
  }

const ProgressTracker = ({
    isSection1Visible,
    isSection2Visible,
    isSection3Visible,
}: ProgressTrackerProps) => {
    return (
        <div>
            <div className={`${styles.step} ${isSection1Visible ? styles.green : ''}`}>INFORMACIÓN BÁSICA</div>
            <div className={`${styles.step} ${isSection2Visible ? styles.green : ''}`}>DETALLES</div>
            <div className={`${styles.step} ${isSection3Visible ? styles.green : ''}`}>INSCRIPCIONES Y ENTRADAS</div>
        </div>
    );
};
export default ProgressTracker;