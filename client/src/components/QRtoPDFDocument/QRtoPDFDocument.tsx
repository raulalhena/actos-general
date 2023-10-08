import { Document, Image, Page, View, Text } from '@react-pdf/renderer';
import { EventFormProps } from '../../interfaces/eventFormProps';

type Props = {
    qrImg: string | undefined;
    eventData: EventFormProps;
}

export const QRtoPDFDocument = ({ eventData, qrImg }: Props) => {

    return (
        <Document title={eventData.name}>
            <Page size="A4">
                <View style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: '50px' }}>{ eventData.name }</Text>
                    <Text> </Text>
                    <Text>Dirección: { eventData.address }</Text>
                    <Text>Fecha: { eventData.date }</Text>
                    <Text>Hora Inicio: { eventData.startTime }</Text>
                    <Text>Hora Fin: { eventData.endTime }</Text>
                    <Image src={qrImg} style={{ width: '200px', height: '200px' }} />
                </View>
            </Page>
        </Document>
    );
};
