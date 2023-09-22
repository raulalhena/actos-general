import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import CardEvent from '../../components/CardEvent/CardEvent';
import styles from './page.module.css';
import HomePageCategories from '../../components/HomePageCategories/HomePageCategories';

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
            <section className={styles.section}>
                <div className={styles.title}>
                    <h1 className={styles.dash}>—</h1>
                    <h1>Categorías</h1>
                </div>
                <HomePageCategories />
            </section>
            <section className={styles.section}>
                <div className={styles.title}>
                    <h1 className={styles.dash}>—</h1>
                    <h1>Eventos destacados</h1>
                </div>
                <CardEvent eventData={eventData} eventId={0} />
            </section>

        </>
    );
};

export default HomePage;
