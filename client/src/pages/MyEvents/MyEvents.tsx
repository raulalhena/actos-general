import styles from './MyEvents.module.css';
import CardEvent from '../../components/CardEvent/CardEvent';
import { useEffect, useState } from 'react';
import { CardEventProps, EventDataProps } from '../../interfaces/cardEventProps';
import { useAuth } from '../../hooks/useAuth';
// import { EventFormProps } from '../../interfaces/eventFormProps';

const MyEvents = () => {

    const [ myEvents, setMyEvents ] = useState<CardEventProps['eventData'][]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const getMyEvents = async () => {
                const url = `http://localhost:8000/api/events/user/${user._id}`;
                const resp = await fetch(url);
                const myEventsDb = await resp.json();
    
                setMyEvents(myEventsDb);
            };
    
            getMyEvents();
        }
    }, []);

    return (
        <section data-testid='myEvents-page' className={styles.section}>
            <div className={styles.title}>
                <h1 className={styles.dash}>—</h1>
                <h1>Mis Eventos</h1>
            </div>

            <div className={styles.cardGrid}>
                {myEvents && myEvents.map((event: EventDataProps, index: number) => (
                    <CardEvent key={index} eventData={event} />
                ))}
            </div>
        </section>
    );
};

export default MyEvents;
