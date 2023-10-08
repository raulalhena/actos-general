import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardEvent from '../components/CardEvent/CardEvent';

describe('Card Event Component', () => {
    it('renders without errors', () => {
      
        const eventData = {
            _id: '1',
            name: 'Ejemplo de Evento',
            category: 'Categoria ',
            subcategory: 'Subcategoria',
            date: '2023-10-15', 
            mode: 'Presencial',
            type: 'Tipo de Evento',
            image: 'path/para/imagem.jpg',
            subcategoryLogo: 'path/para/logo-subcategoria.jpg',
        };

        const { queryByTestId } = render(<Router><CardEvent key={+eventData._id} eventData={eventData} /></Router>);
        const dataid = queryByTestId('card-event');
        expect(dataid).toBeInTheDocument();
    });
});
