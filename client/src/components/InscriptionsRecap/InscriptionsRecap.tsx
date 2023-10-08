import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import styles from './InscriptionsRecap.module.css';
import { QRtoPDFDocument } from '../../components/QRtoPDFDocument/QRtoPDFDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { RiFileDownloadFill, RiWhatsappFill } from 'react-icons/ri';
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
    const [ isLoading, setIsLoading ] = useState(true);
    const [ modalTitle, setModalTitle ] = useState('');

    // const [ users, setUsers ] = useState<Array<User>>([]);
    const [ users, setUsers ] = useState<Array<User>>([
        {
            id: '',
            name: '',
            surname: '',
            email: '',
            role: '',
            token: '',
        },
    ]);

    const submittedProps = {
        id: eventData._id,
        mode: eventData.mode,
    };

    let totalSubmitted = 0;
    let totalSubmittedOnline = 0;
    const modeInfo = {};

    if (eventData.mode === 'Presencial') {
        modeInfo.totalSubmitted = eventData.submitted.length;
        modeInfo.capacity = eventData.capacity;
        modeInfo.mode = eventData.mode;
    } else if (eventData.mode === 'En Línea') {
        modeInfo.totalSubmitted = eventData.submittedOnline.length;
        modeInfo.capacity = eventData.capacityOnline;
        modeInfo.mode = eventData.mode;
    } else if (eventData.mode === 'Híbrido') {
        if (eventData.submitted) {
            totalSubmitted = eventData.submitted.length;
        }

        if (eventData.submittedOnline) {
            totalSubmittedOnline = eventData.submittedOnline.length;
        }
    }

    const openModal = (title: string) => {
        setModalTitle(title);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const getAllEvents = async () => {
            const respo = await fetch(
                `http://localhost:8000/api/events/${submittedProps.id}/submitted/?mode=${submittedProps.mode}`
            );
            const eventsData = await respo.json();

            if (!respo.ok) {
                setIsLoading(false);
                return;
            }
            setUsers(eventsData);
            setIsLoading(false);
            return;
        };

        getAllEvents();
    }, []);

    return (
        <>
            <div data-testid="inscriptionRecap" className={styles.container}>
                <h3>Resumen del evento</h3>
                <br />
                <div className={styles.containerSection}>
                    <FaUserCheck className={styles.inscriptionsIcon} />
                    {eventData.mode === 'Híbrido' ? (
                        <>
                            <div
                                onClick={() => openModal('Presencial')}
                            >
                                {totalSubmitted}/
                                {eventData.capacity || eventData.capacity === '0'
                                    ? eventData.capacity + ' '
                                    : '- '}
                Usuarios Inscritos Presencial
                            </div>
                            <div className={styles.divider}>|</div>
                            <div
                                onClick={() => openModal('Presencial')}
                            >
                                {totalSubmittedOnline}/
                                {eventData.capacityOnline || eventData.capacityOnline === '0'
                                    ? eventData.capacityOnline + ' '
                                    : '- '}
                Usuarios Inscritos En Línea
                            </div>
                        </>
                    ) : (
                        <div
                            onClick={() => openModal(modeInfo.mode)}
                        >
                            {modeInfo.totalSubmitted}/
                            {modeInfo.capacity || modeInfo.capacity === '0'
                                ? modeInfo.capacity + ' '
                                : '- '}
              Usuarios Inscritos {modeInfo.mode}
                        </div>
                    )}
                </div>

                <div className={styles.containerSection}>
                    <RiFileDownloadFill className={styles.inscriptionsIcon} />
                    <div className={styles.downloadOptions}>
                        <PDFDownloadLink
                            document={
                                <QRtoPDFDocument
                                    eventData={eventData}
                                    qrImg={eventData.qrEvent}
                                />
                            }
                            fileName={eventData.name}
                        >
                            <button className={styles.pdfButton}>
          Descargar QR del evento (.pdf)</button>
                        </PDFDownloadLink>
                        <div className={styles.divider}>|</div>
                        <a href={eventData.qrEvent} download={eventData.name + '.png'}>
                            <div className={styles.pdfButton}>Descargar QR del evento (.png)</div>
                        </a>
                    </div>
                </div>

                <div className={styles.containerSection}>
                    <RiWhatsappFill className={styles.inscriptionsIcon} />
                    <a
                        href={`http://web.whatsapp.com/send?text=Hola, te comparto la información de nuestro evento!`}
                        data-action="share/whatsapp/share"
                        target="_blank"
                    >
                        <div className={styles.pdfButton}>
                            Compartir Información en Whatsapp
                        </div>
                    </a>
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
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setIsModalOpen(false)}
                                >
                  &times;
                                </button>
                            </div>
                            <div className={styles.title}>
                                <h1 className={styles.dash}>—</h1>
                                <h2 className={styles.h2Modal}>
                  Usuarios Inscritos - {modalTitle}
                                </h2>
                            </div>
                            <div>{isLoading && <Preloader />}</div>
                            <div className={styles.eventList}>
                                {users &&
                  users.map((user: User, index: number) => (
                      <div key={index}>
                          <div className={styles.eventItem}>
                              <h2 className={styles.pModal} id={user?.userId?._id}>
                                  {user?.userId?.name} {user?.userId?.surname}
                              </h2>
                              <span className={styles.cardSubcategory}>
                                  {user?.userId?.email}
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
