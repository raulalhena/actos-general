import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';

const EventsList = () => {

    const [ events, setEvents ] = useState<Array<EventDashboardFormProps>>();

    useEffect(() => {
        const getAllEvents = async () => {
            const respo = await fetch('http://localhost:8000/api/events');
            const events = await respo.json();

            setEvents(events);
        };

        getAllEvents();
    });

    return (
        <div>
            {events && events.map((event: EventDashboardFormProps, index: number) => {
                return (
                    <div key={index}>
                        <Link style={{ color: '#333' }}to={`/event/${event._id}`}>{event.name}</Link>
                    </div>
                );
            })}
        </div>
    );
};

export default EventsList;