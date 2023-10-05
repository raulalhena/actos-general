import { useEffect, useState } from 'react';
import EventDashboardForm from '../../components/EventDashboardForm/EventDashboardForm';
import InscriptionsRecap from '../../components/InscriptionsRecap/InscriptionsRecap';
import styles from './EventDashboard.module.css';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';
import { PDFViewer } from '@react-pdf/renderer';
import { QRtoPDFDocument } from '../../components/QRtoPDFDocument/QRtoPDFDocument';
import { HiCursorClick } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';

const EventDashboard = () => {
    const location = useLocation();
    const eventId = location.state?.id;

    const { isLogged, user } = useAuth();

    console.log('context isLogged', isLogged);
    console.log('context user', user);

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
        capacity: '',
        isLimited: false,
        subcategoryLogo: ''
    });

    useEffect(() => {
        const fetchEvent = async () => {
            const resp = await fetch(`http://localhost:8000/api/events/${eventId}`);
            const data = await resp.json();
            setEventData(data);
        };

        fetchEvent();
    }, [ eventId ]);

    useEffect(() => {}, [ eventData ]);

    const [ showPDF, setShowPDF ] = useState(false);

    const createPDF = () => {
        setShowPDF(!showPDF);
    };

    return (
        <>
            {!showPDF ? (
                <div className={styles.page}>
                    <div className={styles.pageContainer}>
                        <section className={styles.top}>
                            <section className={styles.header}>
                                <div className={styles.title}>
                                    <h1 className={styles.dash}>—</h1>
                                    <h1>Resumen de tu evento:</h1>
                                </div>
                                <Link target="_blank" to={`/event/${eventData._id}`}>
                                    <div className={styles.eventTitle}>{eventData.name}</div>
                                </Link>
                            </section>
                            {process.env.NODE_ENV !== 'test' ? ( //ignora esta parte en test
                                <InscriptionsRecap
                                    eventData={eventData}
                                    createPDF={createPDF}
                                />
                            ) : null}
                        </section>
                        <EventDashboardForm eventData={eventData} />
                    </div>
                </div>
            ) : (
                <PDFViewer style={{ width: '100%', height: '90vh' }}>
                    <QRtoPDFDocument eventData={eventData} qrImg={eventData.qrEvent} />
                </PDFViewer>
            )}
        </>
    );
};

export default EventDashboard;
