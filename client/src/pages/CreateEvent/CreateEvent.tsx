import EventForm from '../../components/EventForm/EventForm';
import styles from './CreateEvent.module.css';

const CreateEvent = () => {

    return (
        <div className={styles.createEvent}>  
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

export default CreateEvent;