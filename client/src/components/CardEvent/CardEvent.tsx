import styles from './CardEvent.module.css';
import { CardEventProps } from '../../interfaces/cardEventProps';
import logo from '../../assets/zing.png';
import prueba from '../../assets/prueba.jpg';
import { Link } from 'react-router-dom';

const CardEvent = ({ eventData }: CardEventProps) => {

    return (
        <Link to={`/event/${eventData._id}`} state={eventData._id}>
            <div className={styles.card}>
                {/* IMAGE */}
                <div className={styles.imageSection}>
                    <div className={styles.logoContainer}>
                        <img src={logo} className={styles.logoImage} alt="Logo" />
                    </div>
                    <img src={prueba} className={styles.eventImage} />
                </div>
                <section className={styles.spanContainer}>
                    <span className={styles.cardCategory}>{eventData.category}</span> 
                    <span className={styles.cardSubcategory}>{eventData.subcategory}</span>
                </section>
                <h2 className={styles.cardTitle}>{eventData.name}</h2>
                {/* DATE, MODE, TYPE */}
                <p className={styles.cardDate}>{eventData.date}</p>
                <section className={styles.bottomSection}>
                    <div className={styles.cardMode}>{eventData.mode}</div>
                    <div className={styles.cardType}>{eventData.type}</div>
                </section>
            </div>
        </Link>
    );
};

export default CardEvent;
