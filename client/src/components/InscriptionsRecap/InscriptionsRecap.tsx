import styles from './InscriptionsRecap.module.css';
import { QRtoPDFDocument } from '../../components/QRtoPDFDocument/QRtoPDFDocument';
import qrImg from '../../../../server/qr_events/651441b618f217f1a9d762ea.png';
import { PDFViewer } from '@react-pdf/renderer';
import { BiSolidDownload } from 'react-icons/bi';
import { useState } from 'react';
import { FaUserCheck, FaTicketAlt } from 'react-icons/fa';

interface InscriptionsRecapProps {
  capacity: string;
}

const InscriptionsRecap = ({ capacity }: InscriptionsRecapProps) => {
    console.log('capacity', capacity);
    const [ showPDF, setShowPDF ] = useState(false);

    const createPDF = () => {
        setShowPDF(true);
    };
    return (
        <>
            {!showPDF ? (
                <div className={styles.container}>
                    <a href="">
                        <div className={styles.containerSection}>
                            <FaUserCheck className={styles.icon} />
                            <p>
                0/{capacity === 'undefined' ? '-' : capacity} Usuarios Inscritos
                            </p>
                        </div>
                    </a>

                    <div className={styles.containerSection}>
                        <a href="" onClick={createPDF}>
                            <BiSolidDownload className={styles.icon} />
                            <p>Descargar QR del evento (.PDF)</p>
                        </a>
                        <p>|</p>
                        <a href="" onClick={createPDF}>
                            <p>Descargar QR del evento (.PNG)</p>
                        </a>
                    </div>
                </div>
            ) : (
                <PDFViewer style={{ width: '100%', height: '90vh' }}>
                    <QRtoPDFDocument data={(eventData.name, qrImg)} />
                </PDFViewer>
            )}
        </>
    );
};

export default InscriptionsRecap;
