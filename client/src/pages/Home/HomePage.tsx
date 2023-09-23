import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import CardEvent from '../../components/CardEvent/CardEvent';
import styles from './page.module.css';
import HomePageCategories from '../../components/HomePageCategories/HomePageCategories';

const HomePage = () => {
    const eventData = {
        name: 'Evento de Ejemplo',
        date: '2023-10-15',
        mode: 'Presencial',
        type: 'Conferencia',
        image: '../../images/prueba.jpg',
        category: 'Empleabilidad',
        subcategory: 'Conferencia',
        eventId: 1
    };

    return (
        
        <>
            <HomePageHeader />
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
                <CardEvent eventData={eventData} />
            </section>

        </>
    );
};

export default HomePage;
