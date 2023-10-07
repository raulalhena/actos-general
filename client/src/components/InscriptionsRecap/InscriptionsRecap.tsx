import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import styles from './InscriptionsRecap.module.css';
import { QRtoPDFDocument } from '../../components/QRtoPDFDocument/QRtoPDFDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { BiSolidDownload } from 'react-icons/bi';
import { FaUserCheck } from 'react-icons/fa';
import { EventFormProps } from '../../interfaces/eventFormProps';
import { User } from '../../interfaces/User';
import Preloader from '../Preloader/Preloader';

interface InscriptionsRecapProps {
    eventData: EventFormProps;
    createPDF: () => void;
}

const InscriptionsRecap = ({ eventData }: InscriptionsRecapProps) => {

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ users, setUsers ] = useState<Array<User>>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ modalTitle, setModalTitle ] = useState(''); // Adicione o estado para o título

    const submittedProps = {
        id: eventData._id,
        mode: eventData.mode
    };

    let totalSubmitted = 0;
    let totalSubmittedOnline = 0;

    if (eventData.submitted) {
        totalSubmitted = eventData.submitted.length;
    }

    if (eventData.submittedOnline) {
        totalSubmittedOnline = eventData.submittedOnline.length;
    }

    const openModal = (title: string) => {
        setModalTitle(title); // Define o título com base no texto clicado
        setIsModalOpen(true);
    };

    useEffect(() => {
        const getAllEvents = async () => {
            const respo = await fetch(`http://localhost:8000/api/events/${submittedProps.id}/submitted/?mode=${submittedProps.mode}`);
            const eventsData = await respo.json();

            setUsers(eventsData[0].submitted);
            setIsLoading(false);
        };

        getAllEvents();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerSection}>
                    <FaUserCheck className={styles.icon} />
                    <p onClick={() => openModal('Presencial')} className={styles.textLink}>
                        {totalSubmitted}/{eventData.capacity || eventData.capacity === '0' ? eventData.capacity + ' ' : '- ' }
                        Usuarios Inscritos Presencial
                    </p>
                    {eventData.mode === 'Híbrido' && (
                        <>
                            <p>|</p>
                            <p onClick={() => openModal('Online')} className={styles.textLink}>
                                {totalSubmittedOnline}/{eventData.capacity || eventData.capacity === '0' ? eventData.capacity + ' ' : '- '}
                                Usuarios Inscritos Online
                            </p>
                        </>
                    )}
                </div>

                <div className={styles.containerSection}>
                    <BiSolidDownload className={styles.icon} />
                    <PDFDownloadLink document={<QRtoPDFDocument eventData={eventData} qrImg={eventData.qrEvent} />} fileName={eventData.name}>
                        <button className={styles.pdfButton}>
                            Descargar QR del evento (.PDF)
                        </button>
                    </PDFDownloadLink>
                    <p>|</p>
                    <a href={eventData.qrEvent} download={eventData.name + '.png'}>
                        <p className={styles.textLink}>Descargar QR del evento (.PNG)</p>
                    </a>
                </div>

                <div className={styles.containerSection}>
                    {/* <IoLogoWhatsapp className={styles.icon} /> */}
                    <a
                        href={`http://web.whatsapp.com/send?text=${encodeURIComponent(eventData.qrEvent)}`}
                        data-action="share/whatsapp/share"
                        target="_blank"
                        className={styles.textLink}
                    >Comparte el QR por Whatsapp</a>
                </div>
            </div>

            <div className={styles.modalPage}>
                <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Modal"
                    shouldCloseOnOverlayClick={true}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        },
                        content: {
                            border: 'none',
                            background: 'none',
                        },
                    }}
                >
                    <div className={styles.modalContainer}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                                    &times;
                                </button>
                            </div>
                            <div className={styles.title}>
                                <h1 className={styles.dash}>—</h1>
                                <h2 className={styles.h2Modal}>Usuarios Inscritos - {modalTitle}</h2> 
                            </div>
                            <div>{isLoading && <Preloader />}</div>
                            <div className={styles.eventList}>
                                {users && users.map((user: User, index: number) => (
                                    <div key={index}>
                                        <div className={styles.eventItem}>
                                            <h2
                                                className={styles.h2Modal}
                                                id={user._id}
                                            >
                                                {user.name} {user.surname}
                                            </h2>
                                            <span className={styles.cardSubcategory}>
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>
        </>
    );
};

export default InscriptionsRecap;
