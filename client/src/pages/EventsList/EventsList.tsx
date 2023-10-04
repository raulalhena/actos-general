import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';
import { SlNote } from 'react-icons/sl';
import styles from './EventsList.module.css';

const EventsList = () => {

    const navigate = useNavigate();
    const [ events, setEvents ] = useState<Array<EventDashboardFormProps>>();

    useEffect(() => {
        const getAllEvents = async () => {
            const respo = await fetch('http://localhost:8000/api/events');
            const events = await respo.json();

            setEvents(events);
        };

        getAllEvents();
    });

    const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const _id = e.target.value;
        navigate('/eventdashboard', { state: { id: _id } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px 30%',  }}>
            <h1 style={{ marginBottom: '10px' }}>Lista de eventos activos</h1>
            <div data-testid='eventsList-page' style={{ boxShadow: 'revert', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {events && events.map((event: EventDashboardFormProps, index: number) => {
                    return (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button className={styles.editButton} value={event._id} onClick={handleClick}>
                                {event.name}
                                <SlNote />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventsList;