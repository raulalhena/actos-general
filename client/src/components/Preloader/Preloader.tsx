import styles from './Preloader.module.css';

function Preloader() {
    return (
        <div className={styles.spinnerContainer}>
        <div className={styles.mul7}>
            <div className={`${styles.mul7circ} ${styles.m7c1}`}></div>
            <div className={`${styles.mul7circ} ${styles.m7c2}`}></div>
            <div className={`${styles.mul7circ} ${styles.m7c3}`}></div>
            <div className={`${styles.mul7circ} ${styles.m7c4}`}></div>
            <div className={`${styles.mul7circ} ${styles.m7c5}`}></div>
            <div className={`${styles.mul7circ} ${styles.m7c6}`}></div>
            <div className={`${styles.mul7circ} ${styles.m7c7}`}></div>
            <div className={`${styles.mul7circ} ${styles.m7c8}`}></div>
            <div className={`${styles.mul7circ} ${styles.m7c9}`}></div>
            <div className={`${styles.mul7circ} ${styles.m7c10}`}></div>
            <div className={`${styles.mul7circ} ${styles.m7c11}`}></div>
            <div className={`${styles.mul7circ} ${styles.m7c12}`}></div>
        </div>
        </div>
    );
}

export default Preloader;
