
import AccessControlScanner from '../../components/AccessControlScanner/AccessControlScanner';
import styles from './AccessControl.module.css';
const AccessControl = () => {
    return (
        <div data-testid="event-detail" className={styles.page}>
            <div className={styles.title}>
                <h1 className={styles.dash}>—</h1>
                <h1>QR ESCANER</h1>
            </div>
            <br />
            <div className={styles.subtitleQR}>
                <h2>Aproxime el código QR para validar el accesso</h2>
            </div>
            
            <br />
            <AccessControlScanner />
        </div>
    );
};

export default AccessControl;