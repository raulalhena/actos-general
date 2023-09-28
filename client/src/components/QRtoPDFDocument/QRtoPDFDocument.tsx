import { Document, Image, Page, View } from '@react-pdf/renderer';
import Img from '../../../../server/qr_events/651441b618f217f1a9d762ea.png';


type Props = {
    qrImg: string;
    eventName: string;
}

export const QRtoPDFDocument = ({ eventName, qrImg }: Props) => {
    
    return (
        <Document title={eventName}>
            <Page size="A4">
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image 
                        src={Img}
                        style={{ maxWidth: '130px', maxHeight: '130px' }} 
                    />
                </View>
            </Page>
        </Document>
    );
};
