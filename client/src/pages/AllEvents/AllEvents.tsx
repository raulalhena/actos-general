import { useEffect, useState } from 'react';
import CardEvent from '../../components/CardEvent/CardEvent';
import styles from './AllEvents.module.css';
import { CardEventProps } from '../../interfaces/cardEventProps';
import Preloader from '../../components/Preloader/Preloader';

const AllEvents = () => {
    const [ eventData, setEventData ] = useState<CardEventProps['eventData'][]>([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/events')
            .then((response) => response.json())
            .then((data) => {
                setEventData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }, []);

    return (
        <>
            <div className={styles.page}>
                <div className={styles.pageContainer}>
                    <div className={styles.title}>
                        <h1 className={styles.dash}>—</h1>
                        <h1>Todos los eventos</h1>
                    </div>
                    <div>{isLoading && <Preloader />}</div>
                    <div data-testid="allEvents-page">
                        <div className={styles.cardGrid}>
                            {eventData.map((event, index) => (
                                <CardEvent key={index} eventData={event} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllEvents;
