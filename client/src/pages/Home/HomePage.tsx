import  { useEffect, useState } from 'react';
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import CardEvent from '../../components/CardEvent/CardEvent';
import styles from './page.module.css';
import HomePageCategories from '../../components/HomePageCategories/HomePageCategories';
import { CardEventProps } from '../../interfaces/cardEventProps';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [ eventData, setEventData ] = useState<CardEventProps['eventData'][]>([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/events')
            .then((response) => response.json())
            .then((data) => {
                setEventData(data);
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }, []); 

    const handleCardClick = (eventId: number) => {
        navigate(`/event/${eventId}`);
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
                {eventData.map((event, index) => (
                    <CardEvent key={index} eventData={event} onCardClick={handleCardClick} />
                ))}
            </section>
        </>
    );
};

export default HomePage;
