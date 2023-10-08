import styles from './CardEvent.module.css';
import { CardEventProps } from '../../interfaces/cardEventProps';
import { Link } from 'react-router-dom';
import eventImg from '../../assets/logonc.svg';

const CardEvent = ({ eventData }: CardEventProps) => {
    
    function formatDate(originalDate: string) {
        const date = new Date(originalDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} de ${month} de ${year}`;
    }

    const formattedDate = formatDate(eventData.date);

    return (
        <Link to={`/event/${eventData._id}`} state={eventData._id}>
            <div className={styles.card}>
                {/* IMAGE */}
                <div className={styles.imageSection}>
                    <div className={styles.logoContainer}>
                        {eventData.subcategoryLogo ? (
                            <img
                                src={eventData.subcategoryLogo}
                                className={styles.logoImage}
                                alt="Logo"
                            />
                        ) : (
                            <img className={styles.logoImage} />
                        )}
                    </div>
                    {eventData.image ? (
                        <img src={eventData.image} className={styles.eventImage} />
                    ) : (
                        <img src={eventImg} className={styles.eventImage} />
                    )}
                </div>
                <section className={styles.spanContainer}>
                    <span className={styles.cardCategory}>{eventData.category}</span>
                    <span className={styles.cardSubcategory}>
                        {eventData.subcategory}
                    </span>
                </section>
                <h2 className={styles.cardTitle}>{eventData.name}</h2>
                {/* DATE, MODE, TYPE */}
                <p className={styles.cardDate}>{formattedDate}</p>
                <section className={styles.bottomSection}>
                    <div className={styles.cardMode}>{eventData.mode}</div>
                    <div className={styles.cardType}>{eventData.type}</div>
                </section>
            </div>
        </Link>
    );
};

export default CardEvent;
