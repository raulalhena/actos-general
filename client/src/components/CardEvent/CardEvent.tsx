import { Link } from 'react-router-dom';
import styles from './CardEvent.module.css';
import { CardEventProps } from '../../interfaces/cardEventProps';

const CardEvent = ({ eventData, eventId }: CardEventProps) => {
   
    const eventUrl = `/event/${eventId}`;

    return (
        <Link to={eventUrl} className={styles.eventcardlink}>
            <div className={styles.eventcard}>
                <img src={eventData.image} alt="Evento" className={styles.eventimage} />
                <div className={styles.eventdetails}>
                    <div className={styles.eventmode}>{eventData.mode}</div>
                    <div className={styles.eventtype}>{eventData.type}</div>
                    <h2 className={styles.eventtitle}>{eventData.title}</h2>
                    <p className={styles.eventdate}>{eventData.date}</p>
                </div>
            </div>
        </Link>
    );
};

export default CardEvent;
