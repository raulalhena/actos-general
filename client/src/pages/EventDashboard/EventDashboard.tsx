import { useEffect, useState } from 'react';
import EventDashboardForm from '../../components/EventDashboardForm/EventDashboardForm';
import InscriptionsRecap from '../../components/InscriptionsRecap/InscriptionsRecap';
import styles from './EventDashboard.module.css';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';
import { PDFViewer } from '@react-pdf/renderer';
import { QRtoPDFDocument } from '../../components/QRtoPDFDocument/QRtoPDFDocument';
import qrImg from '../../../../server/src/public/65157e08822b661558d58771.png';

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
        capacity: '',
        isLimited: false
    });

    useEffect(() => {
        const fetchEvent = async () => {
            const resp = await fetch(`http://localhost:8000/api/events/${eventId}`);
            const data = await resp.json();
            setEventData(data);
        };
    
        fetchEvent();
    }, [ eventId ]);

    useEffect(() => {
    }, [ eventData ]);

    const [ showPDF, setShowPDF ] = useState(false);

    const createPDF = () => {
        setShowPDF(!showPDF);
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
                                    <h1>Resumen de tu evento: <Link target="_blank" to={`/event/${eventData._id}`}>{eventData.name}</Link></h1>
                                </section>
                            </div>
                        </section>
                        
                        <div className={styles.containerSection}>
                            { process.env.NODE_ENV !== 'test' ? //ignora esta parte en test
                                <InscriptionsRecap eventData={ eventData } createPDF={createPDF}/>
                                : null}
                        </div>
                        
                    </section>
                    <EventDashboardForm eventData={eventData} />
                </div>
                :
                <PDFViewer style={{ width: '100%', height: '90vh' }}>                 
                    <QRtoPDFDocument eventData={eventData}  qrImg={qrImg}/>
                </PDFViewer>
            }
        </>
    );
};

export default EventDashboard;
