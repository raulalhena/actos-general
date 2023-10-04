import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';
import { FaRegEdit } from 'react-icons/fa';
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

            setEvents(eventsData);
            setIsLoading(false); 
        };

        getAllEvents();
    }, []); 

    const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const _id = e.target.value;
        navigate('/eventdashboard', { state: { id: _id } });
    };

    return (
        <>
            <div className={styles.page}>
                <div className={styles.pageContainer}>
                    <div className={styles.title}>
                        <h1 className={styles.dash}>—</h1>
                        <h1>Lista de eventos activos</h1>
                    </div>
                    <div>
                        {isLoading && <Preloader />}
                    </div>
                    <div data-testid="eventsList-page">
                        {events.map((event: EventDashboardFormProps, index: number) => (
                            <div
                                key={index}
                                style={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                                <button
                                    className={styles.eventItem}
                                    value={event._id}
                                    onClick={handleClick}
                                >
                                    <section className={styles.eventInfo}>
                                        <h2 className={styles.eventTitle}>{event.name}</h2>
                                        <div className={styles.eventChips}>
                                            <span className={styles.cardCategory}>
                                                {event.category}
                                            </span>
                                            <span className={styles.cardSubcategory}>
                                                {event.subcategory}
                                            </span>
                                        </div>
                                    </section>
                                    <div className={styles.editButton}>
                                        <FaRegEdit />
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventsList;