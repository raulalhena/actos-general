import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EventsList = () => {

    const [ events, setEvents ] = useState();

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
            {events && events.map(event => {
                return (
                    <div>
                        <Link style={{ color: '#333' }}to={`/event/${event._id}`}>{event.name}</Link>
                    </div>
                );
            })}
        </div>
    );
};

export default EventsList;