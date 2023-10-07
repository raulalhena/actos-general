import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';
import styles from './EventsList.module.css';
import Preloader from '../../components/Preloader/Preloader';

const EventsList = () => {
    const navigate = useNavigate();
    const [ events, setEvents ] = useState<Array<EventDashboardFormProps>>([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const getAllEvents = async () => {
            const respo = await fetch('http://localhost:8000/api/events');
            const eventsData = await respo.json();

            eventsData.sort((a, b) => new Date(a.date) - new Date(b.date));

            setEvents(eventsData);
            setIsLoading(false);
        };

        getAllEvents();
    }, []);

    const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { id } = e.target;
        window.scroll(0, 0);
        navigate('/eventdashboard', { state: { id: id } });
    };

    return (
        <>
            <div className={styles.page}>
                <section className={styles.header}>
                    <div className={styles.topTitle}>
                        <h1 className={styles.dash}>—</h1>
                        <h1>Eventos activos</h1>
                    </div>
                </section>
                <div>{isLoading && <Preloader />}</div>
                <div className={styles.eventList} data-testid="eventsList-page">
                    {events.map((event: EventDashboardFormProps, index: number) => (
                        <div key={index}>
                            <button className={styles.eventItem}>
                                <div className={styles.eventListSection}>
                                    <h2
                                        className={styles.eventTitle}
                                        id={event._id}
                                        onClick={handleClick}
                                    >
                                        {event.name}
                                    </h2>
                                    <div className={styles.eventChips}>
                                        <span className={styles.cardCategory}>
                                            {event.category}
                                        </span>
                                        <span className={styles.cardSubcategory}>
                                            {event.subcategory}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.eventListSection}>
                                    <p
                                        className={styles.eventDate}
                                        id={event._id}
                                        onClick={handleClick}
                                    >
                                        {event.date}
                                    </p>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EventsList;
