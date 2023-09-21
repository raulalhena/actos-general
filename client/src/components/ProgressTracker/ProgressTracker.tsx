import styles from './ProgressTracker.module.css';

interface ProgressTrackerProps {
    isSectionVisible: boolean;
    title: string
  }

const ProgressTracker = ({
    isSectionVisible,
    title
}: ProgressTrackerProps) => {
    return (
        <div>
            <div className={`${styles.container} ${styles.step} ${isSectionVisible ? styles.highlight : ''}`}>
                <div>{title}</div>
            </div>
        </div>
    );
};
export default ProgressTracker;