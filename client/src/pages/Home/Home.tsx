import { useEffect, useState } from 'react';
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import CardEvent from '../../components/CardEvent/CardEvent';
import styles from './Home.module.css';
import { CardEventProps } from '../../interfaces/cardEventProps';
import { Link } from 'react-router-dom';
import ButtonRed from '../../components/Button/ButtonRed/ButtonRed';
import HOST from '../../utils/env';

const HomePage = () => {
    const [ allEvents, setAllEvents ] = useState<CardEventProps['eventData'][]>([]);

    console.log('HOST IN ', HOST);

    useEffect(() => {
        fetch(`${HOST}api/events/home`)
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
            <div className={styles.page}>
                <section className={styles.header}>
                    <div className={styles.topTitle}>
                        <h1 className={styles.dash}>—</h1>
                        <h1>Eventos destacados</h1>
                    </div>
                </section>
                <section className={styles.gridSection}>
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
            </div>
        </>
    );
};

export default HomePage;
