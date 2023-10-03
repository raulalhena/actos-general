import { Document, Image, Page, View, Text } from '@react-pdf/renderer';
import { EventFormProps } from '../../interfaces/eventFormProps';

type Props = {
    qrImg: string;
    eventData: EventFormProps;
}

export const QRtoPDFDocument = ({ eventData, qrImg }: Props) => {
    
    return (
        <Document title={eventData.name}>
            <Page size="A4">
                <View style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{ eventData.name }</Text>
                    <Text>{ eventData.address }</Text>
                    <Text>{ eventData.date }</Text>
                    <Text>{ eventData.startTime }</Text>
                    <Text>{ eventData.endTime }</Text>
                    <Image src={qrImg} style={{ width: '200px', height: '200px' }} />
                </View>
            </Page>
        </Document>
    );
};
