import { useEffect, useState } from 'react';
import EventDashboardForm from '../../components/EventDashboardForm/EventDashboardForm';
import InscriptionsRecap from '../../components/InscriptionsRecap/InscriptionsRecap';
import styles from './EventDashboard.module.css';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';
import { PDFViewer } from '@react-pdf/renderer';
import { QRtoPDFDocument } from '../../components/QRtoPDFDocument/QRtoPDFDocument';

const EventDashboard = () => {
    const location = useLocation();
    const eventId = location.state?.id;

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
        capacityOnline: 0,
        submitted: [],
        submittedOnline: [],
        isLimited: false,
        isLimitedOnline: false,
        subcategoryLogo: '',
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

    const handleCapacityChange = (capacity?: string) => {
    
        setEventData({
            ...eventData,
            capacity: capacity,
        });
    };
    const handleCapacityOnlineChange = (onlineCapacity?: string) => {
    
        setEventData({
            ...eventData,
            capacityOnline: onlineCapacity,
        });
    };

    return (
        <>
            {!showPDF ? (
                <div className={styles.page}>
                    <div className={styles.pageContainer}>
                        <section className={styles.top}>
                            {/* TITLE */}
                            <div>
                                <Link target="_blank" to={`/event/${eventData._id}`}>
                                    <div className={styles.eventTitleSection}>
                                        <h1 className={styles.dash}>—</h1>
                                        <div className={styles.eventTitle}>{eventData.name}</div>
                                        <div className={styles.eventLink}>
                                            (ver página del evento)
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            {/* INSCRIPTIONS RECAP */}
                            {process.env.NODE_ENV !== 'test' ? ( //ignora esta parte en test
                                <InscriptionsRecap
                                    eventData={eventData}
                                    createPDF={createPDF}
                                />
                            ) : null}
                        </section>
                        {/* EVENT INFO */}
                        <EventDashboardForm eventData={eventData} onCapacityChanged={handleCapacityChange} onCapacityOnlineChanged={handleCapacityOnlineChange} />
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
