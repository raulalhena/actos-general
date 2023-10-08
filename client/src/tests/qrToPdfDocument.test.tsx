
import { render } from '@testing-library/react';
import { QRtoPDFDocument } from '../components/QRtoPDFDocument/QRtoPDFDocument';

describe('QRtoPDFDocument Component', () => {
    it('renders event data correctly', () => {
        const eventData = {
            name: 'Evento de Teste',
            address: '123 Rua da Amostra',
            date: '01/01/2023',
            startTime: '10:00 AM',
            endTime: '12:00 PM',
        };

        const qrImg = new Blob();

        const { getByText } = render(<QRtoPDFDocument eventData={eventData} qrImg={qrImg} />);

        expect(getByText('Evento de Teste')).toBeInTheDocument();
        expect(getByText('Dirección: 123 Rua da Amostra')).toBeInTheDocument();
        expect(getByText('Fecha: 01/01/2023')).toBeInTheDocument();
        expect(getByText('Hora Inicio: 10:00 AM')).toBeInTheDocument();
        expect(getByText('Hora Fin: 12:00 PM')).toBeInTheDocument();
    });
});
