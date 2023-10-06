import styles from './InscriptionsRecap.module.css';
import { QRtoPDFDocument } from '../../components/QRtoPDFDocument/QRtoPDFDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { BiSolidDownload } from 'react-icons/bi';
import { FaUserCheck } from 'react-icons/fa';
import { EventFormProps } from '../../interfaces/eventFormProps';

interface InscriptionsRecapProps {
  eventData: EventFormProps;
  createPDF: () => void;
}

const InscriptionsRecap = ({ eventData }: InscriptionsRecapProps) => {

    console.log('qr', eventData.qrEvent);
    const qrURL = eventData.qrEvent;

    console.log('qrurl ', qrURL);

    return (
        <>
            <div className={styles.container}>
                <a href="">
                    <div className={styles.containerSection}>
                        <FaUserCheck className={styles.icon} />
                        <p>

                0/{eventData.capacity || eventData.capacity === '0' ? eventData.capacity + ' ' : '- ' } 
                Usuarios Inscritos
                        </p>
                    </div>
                </a>

                <div className={styles.containerSection}>
                    <BiSolidDownload className={styles.icon} />
                    <PDFDownloadLink
                        document={<QRtoPDFDocument eventData={eventData} qrImg={eventData.qrEvent} />}
                        fileName={eventData.name}
                    >
                        <button className={styles.pdfButton}>
              Descargar QR del evento (.PDF)
                        </button>
                    </PDFDownloadLink>
                    <p>|</p>
                    <a href={qrURL} download>
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
