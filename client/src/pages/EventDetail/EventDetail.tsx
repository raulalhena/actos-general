import { useEffect, useState } from 'react';
import styles from './EventDetail.module.css';
import prueba from '../../assets/prueba.jpg';
import logo from '../../assets/logo.png';
import { EventDetailProps } from '../../interfaces/eventDetailProps';
import { IoLocationSharp } from 'react-icons/io5';
import { IoPeopleSharp } from 'react-icons/io5';
import { IoLanguageOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import ButtonRed from '../../components/ButtonRed/ButtonRed';

const EventDetailPage = () => {

    const { _id } = useParams();

    const [ eventData, setEventData ] = useState<EventDetailProps>({
        _id: '',
        name: '',
        date: '',
        mode: '',
        address: '',
        type: '',
        image: '',
        category: '',
        subcategory: '',
        description: '',
        web: '',
        organizedBy: [],
        contactEmail: '',
        language: [],
        startTime: '',
        endTime: '',
        timeZone: '',
        tags: [],
        webLink: ''
    });      

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/events/${_id}`);
            const data = await response.json();
            setEventData(data);
        };
        fetchData();
    }, [ _id ]);

    const renderFormattedDescription = () => {
        return <div className={styles.description} dangerouslySetInnerHTML={{ __html: eventData.description }} />;
    };

    return (
        <div className={styles.page}>

            {/* IMAGE */}
            <div className={styles.imageSection}>
                <img src={prueba} className={styles.eventImage} />
                <div className={styles.logoContainer}>
                    <img src={logo} className={styles.logoImage} alt="Logo" />
                </div>
            </div>

            {/* CATEGORIES */}

            <section className={styles.section}>
                <div className={styles.categorySubcategorySection}>
                    <span className={styles.category}>{eventData.category}</span>
                    <span className={styles.subcategory}>{eventData.subcategory}</span>
                </div>
            </section>
            <h1 className={styles.eventTitle}>{eventData.name}</h1>
            <hr />

            {/* MODE, TYPE, LANGUAGE */}
            
            <section className={styles.section}>
                <div className={styles.detailsSection}>
                    <div className={styles.iconModeContainer}>
                        <div className={styles.iconContainer}>
                            <IoLocationSharp className={styles.icon} />
                        </div>
                        <span className={styles.mode}>{eventData.mode}</span>
                    </div>
                    <div className={styles.iconModeContainer}>
                        <div className={styles.iconContainer}>
                            <IoPeopleSharp className={styles.icon} />
                        </div>
                        <span className={styles.type}>{eventData.type}</span>
                    </div>
                    <div className={styles.iconModeContainer}>
                        <div className={styles.iconContainer}>
                            <IoLanguageOutline className={styles.icon} />
                        </div>
                        <span className={styles.language}>
                            {eventData.language.join(', ')}
                        </span>
                    </div>
                </div>
            </section>
            <hr />

            {/* DATE */}
            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>Fecha y hora</h1>
                <p className={styles.date}>{eventData.date}</p>
            </section>
            <hr />
            
            {/* ADDRESS */}
            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>Ubicación</h1>
                <p className={styles.address}>{eventData.address}</p>
            </section>
            <hr />
            
            {/* DESCRIPTION, WEBLINK */}
            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>Acerca de este evento</h1>
                <p className={styles.description}>
                    {renderFormattedDescription()}
                </p>
                <a href={eventData.webLink} className={styles.webLink}>
                    {eventData.webLink}
                </a>
            </section>
            <hr />
            
            {/* TAGS */}
            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>Etiquetas</h1>
                <div className={styles.tags}>
                    {eventData.tags && eventData.tags.length > 0 ? (
                        eventData.tags.map((tag, index) => (
                            <span key={index} className={styles.tagChip}>
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className={styles.tagChip}></span>
                    )}
                </div>
            </section>
            <hr />
            
            {/* ORGANIZED BY */}            
            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>Organizadores</h1>
                <div className={styles.organizedBySection}>
                    <p className={styles.organizedBy}>{eventData.organizedBy}</p>
                    <ButtonRed label="contactar" />
                </div>
            </section>
        </div>
    );
};

export default EventDetailPage;