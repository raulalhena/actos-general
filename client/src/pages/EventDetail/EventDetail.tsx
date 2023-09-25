import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styles from './EventDetail.module.css';
import prueba from '../../assets/prueba.jpg';
import logo from '../../assets/logo.png';
import { EventDetailProps } from '../../interfaces/eventDetailProps';
import { IoLocationSharp } from 'react-icons/io5';
import { IoPeopleSharp } from 'react-icons/io5';
import { IoLanguageOutline } from 'react-icons/io5';
// import ButtonRed from '../../components/ButtonRed/ButtonRed';
import ButtonWhite from '../../components/ButtonWhite/ButtonWhite';

const EventDetailPage = () => {

    const location = useLocation();
    const eventId = location.state?.id; 

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
        const fetchEvent = async () => {
            try {
                if (!eventId) {
                    // Manejar el caso en el que eventId sea nulo
                    return;
                }
    
                const resp = await fetch(`http://localhost:8000/api/events/${eventId}`);
                if (!resp.ok) {
                    throw new Error('Error al cargar los datos del evento');
                }
    
                const data = await resp.json();
                setEventData(data);
            } catch (error) {
                console.error(error);
            // Manejar errores aquí, por ejemplo, mostrando un mensaje de error al usuario
            }
        };
    
        fetchEvent();
    }, [ eventId ]);

    // const eventData = {
    //     name: 'Evento de Ejemplo',
    //     date: '2023-10-15',
    //     mode: 'Presencial',
    //     type: 'Conferencia',
    //     image: '../../images/prueba.jpg',
    //     category: 'Empleabilidad',
    //     subcategory: 'Conferencia',
    //     eventId: 1,
    //     tags: [ 'arte', 'música', 'pintura' ],
    //     address:
    //   'Galería de Arte "ArteVivo", Calle Principal 123, Ciudad Creativa.',
    //     webLink: 'www.link.com',
    //     startTime: '',
    //     endTime: '',
    //     timeZone: '',
    //     description:
    //   'Únete a nosotros para una tarde llena de creatividad y expresión artística. Este evento es una oportunidad para desatar tu lado artístico y disfrutar de una experiencia única. Te sumergirás en un ambiente relajado donde podrás pintar, dibujar o crear tu obra maestra en compañía de otros amantes del arte. Proporcionaremos todos los suministros necesarios, desde lienzos en blanco hasta una variedad de pinturas y herramientas. No se requiere experiencia previa en arte, ¡todos son bienvenidos! Además, habrá refrigerios y música ambiental para hacer que esta tarde sea aún más especial. ¡Esperamos verte allí!',
    //     organizedBy: [ 'Pepito' ],
    //     contactEmail: 'email@email.com',
    //     language: [ 'Español', 'Catalán' ],
    // };

    return (
        <div className={styles.page}>
            {/* <section className={styles.inscription}>
                <h1>INSCRÍBETE</h1>
                <ButtonRed label='Inscribirse al evento'/>
            </section> */}
            <div className={styles.imageSection}>
                <img src={prueba} className={styles.eventImage} />
                <div className={styles.logoContainer}>
                    <img src={logo} className={styles.logoImage} alt="Logo" />
                </div>
            </div>
            <section className={styles.categorySubcategorySection}>
                <span className={styles.category}>{eventData.category}</span>
                <span className={styles.subcategory}>{eventData.subcategory}</span>
            </section>
            <h1 className={styles.title}>{eventData.name}</h1>
            <hr />
            <section className={styles.detailsSection}>
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
            </section>
            <hr />
            <section>
                <h1>Fecha y hora</h1>
                <span className={styles.date}>{eventData.date}</span>
            </section>
            <hr />
            <section>
                <h1>Ubicación</h1>
                <span className={styles.address}>{eventData.address}</span>
            </section>
            <hr />
            <section>
                <h1>Acerca de este evento</h1>
                <span className={styles.description}>{eventData.description}</span>
                <a href={eventData.webLink} className={styles.webLink}>
                    {eventData.webLink}
                </a>
            </section>
            <hr />
            <section className={styles.tagsSection}>
                <h1>Etiquetas</h1>
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
            <section>
                <h1>Organizadores</h1>
                <div className={styles.organizedBySection}>
                    <span className={styles.organizedBy}>{eventData.organizedBy}</span>
                    <ButtonWhite label="contactar" />
                </div>
            </section>
        </div>
    );
};

export default EventDetailPage;
