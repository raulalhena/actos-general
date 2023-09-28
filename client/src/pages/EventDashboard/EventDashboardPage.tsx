import { useEffect, useState } from 'react';import EventDashboardForm from '../../components/EventDashboardForm/EventDashboardForm';
import InscriptionsRecap from '../../components/InscriptionsRecap/InscriptionsRecap';
import styles from './EventDashboard.module.css';
import { useLocation } from 'react-router';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';
import { QRtoPDFDocument } from '../../components/QRtoPDFDocument/QRtoPDFDocument';
// import qrImg from '../../../../server/qr_events/651441b618f217f1a9d762ea.png';
import { PDFViewer } from '@react-pdf/renderer';

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

    const [ showPDF, setShowPDF ] = useState(false);

    const createPDF = () => {
        setShowPDF(true);
    };

    return (
        <>
            { !showPDF ? 
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
                        </section>
                        <div styles={{ border: '10px solid red' }}>
                            <div styles={{ border: '1px solid red' }}>
                                {/* <img 
                                    src={qrImg}
                                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
                                /> */}
                                <button onClick={createPDF}>pdf</button>
                            </div>
                            <InscriptionsRecap capacity={ String(eventData?.capacity) } />
                        </div>
                    </section>
                    <EventDashboardForm eventData={ eventData } />
                </div>
                : 
                <PDFViewer style={{ width: '100%', height: '90vh' }}>
                    <QRtoPDFDocument data={eventData.name, qrImg} />
                </PDFViewer>
            }
        </>
    );
};

export default EventDashboardPage;
