import EventForm from '../../components/EventForm/EventForm';
import styles from './CreateEvent.module.css';

const CreateEvent = () => {
    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <div className={styles.topTitle}>
                    <h1 className={styles.dash}>—</h1>
                    <h1>Crea tu propio evento</h1>
                </div>
            </section>
            <EventForm />
        </div>
    );
};

export default CreateEvent;
