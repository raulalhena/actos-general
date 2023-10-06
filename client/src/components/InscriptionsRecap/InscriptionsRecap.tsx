import styles from './InscriptionsRecap.module.css';
import { QRtoPDFDocument } from '../../components/QRtoPDFDocument/QRtoPDFDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { BiSolidDownload } from 'react-icons/bi';
import { FaUserCheck } from 'react-icons/fa';
import { EventFormProps } from '../../interfaces/eventFormProps';
import { Link } from 'react-router-dom';

interface InscriptionsRecapProps {
  eventData: EventFormProps;
  createPDF: () => void;
}

const InscriptionsRecap = ({ eventData }: InscriptionsRecapProps) => {

    const submittedProps = {
        id: eventData._id,
        mode: eventData.mode
    };

    let totalSubmitted = 0;
    let totalSubmittedOnline = 0;

    if(eventData.submitted) {
        totalSubmitted = eventData.submitted.length;
    }

    if(eventData.submittedOnline) {
        totalSubmittedOnline = eventData.submittedOnline.length;
    }

    return (
        <>
            <div className={styles.container}>
                <Link to={'/submittedlist'} state={submittedProps}>
                    <div className={styles.containerSection}>
                        <FaUserCheck className={styles.icon} />
                        <p>
                            {totalSubmitted}/{eventData.capacity || eventData.capacity === '0' ? eventData.capacity + ' ' : '- ' } 
                            Usuarios Inscritos Presencial
                        </p>  
                        {eventData.mode === 'Híbrido' && (
                            <>
                                <p>|</p>
                                <p>
                                    {totalSubmittedOnline}/{eventData.capacity || eventData.capacity === '0' ? eventData.capacity + ' ' : '- '}
                                    Usuarios Inscritos Online
                                </p>
                            </>
                        )}
                    </div>
                </Link>

                <div className={styles.containerSection}>
                    <BiSolidDownload className={styles.icon} />
                    <PDFDownloadLink document={<QRtoPDFDocument eventData={eventData} qrImg={eventData.qrEvent} />} fileName={eventData.name}>
                        <button className={styles.pdfButton}>
                            Descargar QR del evento (.PDF)
                        </button>
                    </PDFDownloadLink>
                    <p>|</p>
                    <a href={eventData.qrEvent} download={eventData.name + '.png'}>
                        <p>Descargar QR del evento (.PNG)</p>
                    </a>
                </div>

                <div className={styles.containerSection}>
                    {/* <IoLogoWhatsapp className={styles.icon} /> */}
                    <a
                        href={`http://web.whatsapp.com/send?text=${encodeURIComponent(eventData.qrEvent)}`}
                        data-action="share/whatsapp/share"
                        target="_blank"
                    >Comparte el QR por Whatsapp</a>
                </div>
            </div>
        </>
    );
};

export default InscriptionsRecap;
