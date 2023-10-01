import EventForm from '../../components/EventForm/EventForm';
import styles from './event.module.css';

const EventPage = () => {

    return (
        <div className={styles.eventpage}>  
            <section className={styles.topTitle}>
                <h1 className={styles.dash}>—</h1>
                <h1>Crea tu propio evento</h1>
            </section>
            <br />
            <p className={styles.subtitleForm}></p>
            <EventForm />
        </div>
    );
};

export default EventPage;