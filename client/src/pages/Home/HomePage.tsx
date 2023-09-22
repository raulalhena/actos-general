import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import CardEvent from '../../components/CardEvent/CardEvent';
const HomePage = () => {
    const eventData = {
        title: 'Evento de Ejemplo',
        date: '2023-10-15',
        mode: 'Presencial',
        type: 'Conferencia',
        image: 'https://ejemplo.com/imagen-evento.jpg',
    };

    return (
        
        <>
            <HomePageHeader />
            <button >Crear nuevo evento</button>
            <CardEvent eventData={eventData} eventId={0} />
        </>
    );
};

export default HomePage;
