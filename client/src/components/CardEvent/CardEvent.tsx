import { Link } from 'react-router-dom';
import styles from './CardEvent.module.css';
import { CardEventProps } from '../../interfaces/cardEventProps';
import logo from '../../assets/logo.png';
import prueba from '../../assets/prueba.jpg';
const CardEvent = ({ eventData }: CardEventProps) => {
    const eventUrl = `/event/${eventData.eventId}`;

    return (
        <Link to={eventUrl} className={styles.eventcardlink}>
            <div className={styles.eventcard}>
                <div className={styles.imagecontainer}>
                    <img src={prueba} className={styles.eventimage} />
                    <img src={logo} className={styles.overlayImage} />
                </div>
                <section className={styles.middleSection}>
                    <div className={styles.spancontainer}>
                        <span className={styles.eventcategory}>{eventData.category}</span> 
                        <span className={styles.eventsubcategory}>{eventData.subcategory}</span>
                    </div>
                    <h2 className={styles.title}>{eventData.name}</h2>
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
