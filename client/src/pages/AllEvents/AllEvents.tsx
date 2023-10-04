import { useEffect, useState } from 'react';
import CardEvent from '../../components/CardEvent/CardEvent';
import styles from './AllEvents.module.css';
import { CardEventProps } from '../../interfaces/cardEventProps';
import Preloader from '../../components/Preloader/Preloader';
import { useLocation } from 'react-router-dom';

// ... (importações existentes)

const AllEvents = () => {
    const location = useLocation();
    const [ eventData, setEventData ] = useState<CardEventProps['eventData'][]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ noResults, setNoResults ] = useState(false);

    const searchParams = new URLSearchParams(location.search);
    const keywords = searchParams.get('keywords');
    const filters = searchParams.get('filters');
    useEffect(() => {
        // Modify the API endpoint to include the search query
        const apiUrl = keywords
            ? `http://localhost:8000/api/events/search?filters=${filters}&keywords=${keywords}`
            : 'http://localhost:8000/api/events';

        console.log('API URL:', apiUrl);

        fetch(apiUrl)
            .then((response) => response.json())
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setEventData(res.data);
                } else {
                    setNoResults(true);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }, [ location.search ]);

    return (
        <>
            <div className={styles.page}>
                <div className={styles.pageContainer}>
                    <div className={styles.title}>
                        <h1 className={styles.dash}>—</h1>
                        <h1>Todos los eventos</h1>
                    </div>
                    <div>
                        {isLoading && <Preloader />}
                        {noResults && (
                            <div className={styles.textBox}>
                                <p className={styles.textStyle}> No se encontraron resultados. </p>
                                <button className={styles.backBtn} onClick={() => window.location.href = '/'}>Volver</button>
                            </div>
                        )}
                    </div>
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

