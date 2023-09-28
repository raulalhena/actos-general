import styles from './InscriptionsRecap.module.css';
import { QRtoPDFDocument } from '../../components/QRtoPDFDocument/QRtoPDFDocument';
import qrImg from '../../../../server/qr_events/65157c68a98cad7b39aa8f0c.png';
import { PDFViewer } from '@react-pdf/renderer';
import { BiSolidDownload } from 'react-icons/bi';
import { useState } from 'react';
import { FaUserCheck, FaTicketAlt } from 'react-icons/fa';

interface InscriptionsRecapProps {
  capacity: string;
  createPDF: () => void;
}

const InscriptionsRecap = ({ capacity, createPDF }: InscriptionsRecapProps) => {
    console.log('capacity', capacity);

    return (
        <>  
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
                    <BiSolidDownload className={styles.icon} />
                    <button style={{ boxShadow: 'none', border: '0px', backgroundColor: '#fff' }} onClick={createPDF}>Descargar QR del evento (.PDF)</button>
                    <p>|</p>
                    <button style={{ boxShadow: 'none', border: '0px', backgroundColor: '#fff' }} onClick={createPDF}>
                        <p>Descargar QR del evento (.PNG)</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default InscriptionsRecap;
