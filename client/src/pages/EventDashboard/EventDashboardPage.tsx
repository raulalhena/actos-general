import { useEffect, useState } from 'react';import EventDashboardForm from '../../components/EventDashboardForm/EventDashboardForm';
import InscriptionsRecap from '../../components/InscriptionsRecap/InscriptionsRecap';
import styles from './EventDashboard.module.css';
import { useLocation } from 'react-router';
// import { EventFormProps } from '../../interfaces/eventFormProps';
import status from '../../data/status.json';
import Select from '../../components/Select/Select';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';

const EventDashboardPage = () => {

    const location = useLocation();
    const eventId = location.state.id;

    // ESTO ERA LO QUE TENÏA YO
    // const [ eventData, setEventData ] = useState<EventFormProps>({
    //     status: false,
    // });

    // Select
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        
        const { id, value } = event.target;
        setEventData({
            ...eventData,
            [id]: value,
        });
    };
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
        contact: '',
        isPrivate: false,
        language: [], //Select con checkbox
        image: '', 
        video: '', 
        capacity: 0
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
        // setEventData(eventData);
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
                            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        {/* <div className={styles.selectStatus}>
                            <Select
                                id="status"
                                label=""
                                options={status}
                                value={eventData.status}
                                onChange={handleSelectChange}
                            />
                        </div> */}
                    </section>
                    <InscriptionsRecap capacity={ String(eventData?.capacity) } />
                </section>
                <EventDashboardForm eventData={ eventData } />
            </div>
        </>
    );
};

export default EventDashboardPage;
