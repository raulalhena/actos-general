import { useEffect, useState } from 'react';
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import CardEvent from '../../components/CardEvent/CardEvent';
import styles from './home.module.css';
// import HomePageCategories from '../../components/HomePageCategories/HomePageCategories';
import { CardEventProps } from '../../interfaces/cardEventProps';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import ButtonRed from '../../components/ButtonRed/ButtonRed';

const HomePage = () => {
    const { isLogged, user } = useAuth();
    const [ allEvents, setAllEvents ] = useState<CardEventProps['eventData'][]>([]);
    const [ latestEvents, setLatestEvents ] = useState<
    CardEventProps['eventData'][]
  >([]);

    isLogged ? console.log('is logged') : null;
    const [ eventData, setEventData ] = useState<CardEventProps['eventData'][]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/events')
            .then((response) => response.json())
            .then((data) => {
                setAllEvents(data);
                setLatestEvents(data.slice(0, 6)); // Tomar los últimos 6 eventos
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }, []);

    return (
        <>
            <HomePageHeader />
            {/* <section className={styles.section}>
                <div className={styles.title}>
                    <h1 className={styles.dash}>—</h1>
                    <h1>Proyectos</h1>
                </div>
                <HomePageCategories />
            </section> */}
            <section className={styles.section}>
                <div className={styles.title}>
                    <h1 className={styles.dash}>—</h1>
                    <h1>Eventos destacados</h1>
                </div>

                <div className={styles.cardGrid}>
                    {latestEvents.map((event, index) => (
                        <CardEvent key={index} eventData={event} />
                    ))}
                </div>
                <div className={styles.buttonSection}>
                    <Link to='/allevents'>
                        <ButtonRed
                            onClick={() => setLatestEvents(allEvents)}
                            label='Ver todos los eventos'
                        />
                    </Link>
                </div>
            </section>
        </>
    );
};

export default HomePage;
