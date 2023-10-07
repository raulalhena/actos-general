import { useEffect, useState } from 'react';
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import CardEvent from '../../components/CardEvent/CardEvent';
import styles from './home.module.css';
import { CardEventProps } from '../../interfaces/cardEventProps';
import { Link } from 'react-router-dom';
import ButtonRed from '../../components/Button/ButtonRed/ButtonRed';

const HomePage = () => {
    const [ allEvents, setAllEvents ] = useState<CardEventProps['eventData'][]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/events/home')
            .then((response) => response.json())
            .then((data) => {
                setAllEvents(data);
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }, []);

    return (
        <>
            <HomePageHeader />
            <section className={styles.sectionHomePage}>
                <div className={styles.title}>
                    <h1 className={styles.dash}>—</h1>
                    <h1>Eventos destacados</h1>
                </div>
                <div className={styles.cardGrid}>
                    {allEvents.map((event, index) => (
                        <CardEvent key={index} eventData={event} />
                    ))}
                </div>
                <div className={styles.buttonSection}>
                    <Link to='/allevents'>
                        <ButtonRed
                            label='Ver todos los eventos'
                        />
                    </Link>
                </div>
            </section>
        </>
    );
};

export default HomePage;
