import { Link } from 'react-router-dom';
import styles from './CardEvent.module.css';
import { CardEventProps } from '../../interfaces/cardEventProps';

const CardEvent = ({ eventData, eventId }: CardEventProps) => {
    const eventUrl = `/event/${eventId}`;

    return (
        <Link to={eventUrl} className={styles.eventcardlink}>
            <div className={styles.eventcard}>
                <img src={eventData.image} className={styles.eventimage} />
                <section className={styles.middleSection}>
                    <h2 className={styles.title}>{eventData.title}</h2>
                </section>
                <div className={styles.eventdetails}>
                    <section className={styles.bottomSection}>
                        <p className={styles.eventdate}>{eventData.date}</p>
                        <div className={styles.eventmode}>{eventData.mode}</div>
                        <div className={styles.eventtype}>{eventData.type}</div>
                    </section>
                </div>
            </div>
        </Link>
    );
};

export default CardEvent;
