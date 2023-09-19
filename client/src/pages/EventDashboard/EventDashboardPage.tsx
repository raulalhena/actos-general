import DropdownButton from '../../components/DropdownButton/DropdownButton';
import EventForm from '../../components/EventForm/EventForm';
import styles from './EventDashboard.module.css';

const EventDashboardPage = () => {

    return (
        <>
            <section className={styles.title}>
                <h1 className={styles.dash}>—</h1>
                <h1>Crea tu propio evento</h1>
            </section>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <DropdownButton />
            <EventForm />
        </>
    );
};

export default EventDashboardPage;