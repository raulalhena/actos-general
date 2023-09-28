import { useEffect, useState } from 'react';
import EventDashboardForm from '../../components/EventDashboardForm/EventDashboardForm';
import InscriptionsRecap from '../../components/InscriptionsRecap/InscriptionsRecap';
import styles from './EventDashboard.module.css';
import { useLocation } from 'react-router';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';

const EventDashboardPage = () => {
    const location = useLocation();
    const eventId = location.state.id;

    const [ eventData, setEventData ] = useState<EventDashboardFormProps>({
        _id: '',
        name: '',
        category: '',
        subcategory: '',
        tags: [],
        mode: '',
        type: '',
        address: '',
        webLink: '',
        date: '',
        startTime: '',
        endTime: '',
        timeZone: '',
        showTime: false,
        showDate: false,
        confirmed: false,
        description: '',
        web: '',
        organizedBy: [],
        contactEmail: '',
        isPrivate: false,
        language: [], //Select con checkbox
        image: '',
        video: '',
        capacity: 0,
        isLimited: false,
    // qrEvent: '',
    // qrAttendees: [],
    // attendees: [],
    // submitted: [],
    // price: 0,
    // payment: '',
    // visibility: false,
    // status: false
    });

    useEffect(() => {
        const fetchEvent = async () => {
            const resp = await fetch(`http://localhost:8000/api/events/${eventId}`);
            const data = await resp.json();
            setEventData(data);
        };

        fetchEvent();
    }, []);

    useEffect(() => {
        console.log('eventData', eventData);
    }, [ eventData ]);

    return (
        <>
            <div className={styles.page}>
                <section className={styles.top}>
                    <section className={styles.header}>
                        <div>
                            <section className={styles.title}>
                                <h1 className={styles.dash}>—</h1>
                                <h1>Resumen de tu evento: {eventData.name}</h1>
                            </section>
                        </div>
                    </section>
                    <div className={styles.containerSection}>
                        <InscriptionsRecap capacity={String(eventData?.capacity)} />{' '}
                    </div>
                </section>
                <EventDashboardForm eventData={eventData} />
            </div>
        </>
    );
};

export default EventDashboardPage;
