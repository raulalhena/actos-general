import { useEffect, useState } from 'react';
import CardEvent from '../../components/CardEvent/CardEvent';
import styles from './AllEvents.module.css';
import { CardEventProps } from '../../interfaces/cardEventProps';
import Preloader from '../../components/Preloader/Preloader';
import { useLocation } from 'react-router-dom';

const AllEvents = () => {
    const [ eventData, setEventData ] = useState<CardEventProps['eventData'][]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const location = useLocation();

    useEffect(() => {
        console.log('Current Location:', location);
        const searchParams = new URLSearchParams(location.search);
        const keywords = searchParams.get('keywords');
        console.log('Keywords:', keywords);

        // Modify the API endpoint to include the search query
        const apiUrl = keywords
            ? `http://localhost:8000/api/events/search?filters=name,category,tags,mode,language&keywords=${keywords}`
            : 'http://localhost:8000/api/events';

        console.log('API URL:', apiUrl);

        fetch(apiUrl)
            .then((response) => response.json())
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setEventData(res.data);
                    setIsLoading(false);
                } else {
                    console.error('API response is not an array:', res);
                }
            })            
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }, [ location.search ]);

    // useEffect(() => {
    //     fetch('http://localhost:8000/api/events')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setEventData(data);
    //             setIsLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error al obtener datos:', error);
    //         });
    // }, []);

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
