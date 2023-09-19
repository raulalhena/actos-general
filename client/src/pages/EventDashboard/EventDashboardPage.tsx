import DropdownButton from '../../components/DropdownButton/DropdownButton';
import EventForm from '../../components/EventForm/EventForm';
import InscriptionsRecap from '../../components/InscriptionsRecap/InscriptionsRecap';
import styles from './EventDashboard.module.css';

const EventDashboardPage = () => {
    return (
        <>
            <div className={styles.page}>
                <section className={styles.top}>
                    <section className={styles.header}>
                        <div className={styles.headerLeft}>
                            <section className={styles.title}>
                                <h1 className={styles.dash}>—</h1>
                                <h1>Crea tu propio evento</h1>
                            </section>
                            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <div className={styles.headerRight}>
                            <DropdownButton />
                        </div>
                    </section>
                    <InscriptionsRecap />
                </section>
                <EventForm />
            </div>
        </>
    );
};

export default EventDashboardPage;
