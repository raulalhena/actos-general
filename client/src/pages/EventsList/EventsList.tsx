import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';
import styles from './EventsList.module.css';
import Preloader from '../../components/Preloader/Preloader';
import HOST from '../../utils/env';

const EventsList = () => {
    const navigate = useNavigate();
    const [ events, setEvents ] = useState<Array<EventDashboardFormProps>>([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const getAllEvents = async () => {
            const respo = await fetch(`${HOST}/api/events`);
            const eventsData = await respo.json();

            eventsData.sort((a: any, b: any) => (new Date(a.date) as any) - (new Date(b.date) as any));

            setEvents(eventsData);
            setIsLoading(false);
        };

        getAllEvents();
    }, []);

    const handleClick = async (e: any) => {
        e.preventDefault();
        const { target } = e;
        const { id } = target as HTMLButtonElement;
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
