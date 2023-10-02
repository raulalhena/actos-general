import  { useEffect, useState } from 'react';
import CardEvent from '../../components/CardEvent/CardEvent';
import styles from './AllEvents.module.css';
import { CardEventProps } from '../../interfaces/cardEventProps';

const AllEvents = () => {
    const [ eventData, setEventData ] = useState<CardEventProps['eventData'][]>([]);
    
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

    return (
        <>
            <section className={styles.section}>
                <div className={styles.title}>
                    <h1 className={styles.dash}>—</h1>
                    <h1>Todos los eventos de Nous Cims</h1>
                </div>
                <div className={styles.cardGrid}>
                    {eventData.map((event, index) => (
                        <CardEvent key={index} eventData={event} />
                    ))}
                </div>
            </section>

        </>
    );
};

export default AllEvents;
