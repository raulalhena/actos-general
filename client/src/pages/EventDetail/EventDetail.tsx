import { useEffect, useState } from 'react';
import styles from './EventDetail.module.css';
import { EventDetailProps } from '../../interfaces/eventDetailProps';
import { IoLocationSharp } from 'react-icons/io5';
import { IoPeopleSharp } from 'react-icons/io5';
import { IoLanguageOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import ButtonRed from '../../components/Button/ButtonRed/ButtonRed';
import ButtonInscription from '../../components/Button/ButtonInscription/ButtonInscription';
import { useAuth } from '../../hooks/useAuth';
import ModalDisplay from '../../components/Modal/ModalDisplay';

const EventDetailPage = () => {
    const { _id } = useParams();
    const { user } = useAuth();

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
        webLink: '',
        subcategoryLogo: ''
    });

    const [ inscription, setInscription ] = useState<boolean>(false);
    const [ online, setOnline ] = useState<boolean>(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('Estás a punto de inscribirte al evento.');
    const [ modalBtn1Text, setModalBtn1Text ] = useState('Cancelar');
    const [ modalBtn2Text, setModalBtn2Text ] = useState('Inscribirme');
    const [ actionType, setActionType ] = useState('inscription');

    const openModal = (type: any) => {
        setIsModalOpen(true);
        setActionType(type);
        setModalBtn1Text('Cancelar');
        setModalBtn2Text(type === 'inscription' ? 'Inscribirme' : 'Eliminar');
        setModalTitle(type === 'inscription' ? 'Estás a punto de inscribirte al evento.' : 'Estás a punto de eliminar la inscripción.');
        setInscription(type === 'inscription');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setActionType('inscription');
    };
 
    useEffect(() => {
        const getEvent = async () => {
            const response = await fetch(`http://localhost:8000/api/events/${_id}`);
            const data = await response.json();
            setEventData(data);
        };

        getEvent();
    }, [ _id ]);

    useEffect(() => {
        const checkInscription = async () => {
            const res = await fetch(`http://localhost:8000/api/events/user/${user._id}`);
            const inscriptionEvents = await res.json();

            const insEvents = Array.from(inscriptionEvents); 

            insEvents.forEach(sEvent => {
                if(sEvent._id === _id) setInscription(true);
            });
            
        };

        checkInscription();
    }, [ eventData ]);

    useEffect(() => {
        const checkInscriptionOnline = async () => {
            const res = await fetch(`http://localhost:8000/api/events/user/${user._id}`);
            const inscriptionEvents = await res.json();

            const insEvents = Array.from(inscriptionEvents); 

            insEvents.forEach(sEvent => {
                if(sEvent._id === _id) setOnline(true);
            });
            
        };

        checkInscriptionOnline();
    }, [ eventData ]);

    const renderFormattedDescription = () => {
        return (
            <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: eventData.description }}
            />
        );
    };

    const handleEventAction = async () => {
        const endpoint = actionType === 'inscription'
            ? 'http://localhost:8000/api/events/inscription'
            : 'http://localhost:8000/api/events/unsubscription';
    
        const res = await fetch(endpoint, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userId: user._id,
                eventId: _id
            })
        });
    
        if (res.ok) {
            setModalTitle(`Te has ${actionType === 'inscription' ? 'inscrito' : 'desuscrito'} correctamente.`);
            setModalBtn1Text('');
            setModalBtn2Text('');
        } else {
            setModalTitle(`Error al ${actionType === 'inscription' ? 'inscribirse' : 'desinscribirse'}.`);
        }
    
        return res;
    };

    const handleEventInscriptionOnline = async () => {
        const res = await fetch('http://localhost:8000/api/events/online', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userId: user._id,
                eventId: _id
            })
        });

        if(res.ok) console.log('modal'); //modal

        return;
    };

    const handleEventUnsubscriptionOnline = async () => {
        const res = await fetch('http://localhost:8000/api/events/unsubscription-online', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userId: user._id,
                eventId: _id
            })
        });

        if(res.ok) console.log('modal'); //modal

        return;
    };
    
    function formatDate(originalDate: string) {
        const date = new Date(originalDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        
        return `${day} de ${month} de ${year}`;
    }
    
    const formattedDate = formatDate(eventData.date);

    console.log('logo', eventData.subcategoryLogo);

    return (
        <div data-testid='event-detail' className={styles.page}>
            {/* IMAGE */}
            <div className={styles.imageSection}>
                <img src={eventData.image} className={styles.eventImage} />
                <div className={styles.logoContainer}>
                    <img src={eventData.subcategoryLogo} className={styles.logoImage} alt="Logo" />
                </div>
            </div>

            <h1 className={styles.eventTitle}>{eventData.name}</h1>
            {/* CATEGORIES */}
            <section className={styles.sectionTopButtons}>
                <div className={styles.categorySubcategorySection}>
                    <span className={styles.category}>{eventData.category}</span>
                    <span className={styles.subcategory}>{eventData.subcategory}</span>
                </div>

                {/*INSCRIPTION */}
                {eventData.mode === 'Híbrido' ? 
                    <div className={styles.categorySubcategorySection}>
                        {online ?
                            <ButtonInscription label="Inscribirse en línea" onClick={handleEventInscriptionOnline}/>
                            :
                            <ButtonInscription label="Eliminar inscripción online" onClick={handleEventUnsubscriptionOnline}/>
                        }
                    </div>
                    :
                    <div className={styles.categorySubcategorySection}>
                        {!inscription ? (
                            <ButtonInscription label="Inscribirse al evento" onClick={() => openModal('inscription')} />
                        ) : (
                            <ButtonInscription label="Eliminar inscripción" onClick={() => openModal('cancellation')} />
                        )}
                    </div>
                }
            </section>
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
                    {eventData.language && eventData.language.length > 0 && (
                        <div className={styles.iconModeContainer}>
                            <div className={styles.iconContainer}>
                                <IoLanguageOutline className={styles.icon} />
                            </div>
                            <span className={styles.language}>
                                {eventData.language.join(', ')}
                            </span>
                        </div>
                    )}
                </div>
            </section>
            <hr />

            {/* DATE */}
            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>Fecha y hora</h1>
                <div className={styles.dateSection}>
                    <p className={styles.date}>{formattedDate},</p>
                    <p className={styles.date}>
            de {eventData.startTime} a {eventData.endTime}
                    </p>
                    {eventData.timeZone && ( 
                        <p className={styles.date}>({eventData.timeZone})</p>
                    )}
                </div>
            </section>
            <hr />

            {/* ADDRESS */}
            <div>
                {eventData.mode === 'Presencial' && (
                    <section className={styles.section}>
                        <h1 className={styles.sectionTitle}>Ubicación</h1>
                        <p className={styles.address}>{eventData.address}</p>
                    </section>
                )}

                {eventData.mode === 'En línea' && (
                    <section className={styles.section}>
                        <h1 className={styles.sectionTitle}>Web </h1>
                        <p className={styles.address}>
                            <a href={eventData.webLink} target="_blank" className={styles.webLink}>
                                {eventData.webLink}
                            </a>
                        </p>
                        
                    </section>
                )}

                {eventData.mode === 'Híbrido' && (
                    <section className={styles.section}>
                        <h1 className={styles.sectionTitle}>Ubicación</h1>
                        <p className={styles.address}>{eventData.address}</p>
                        <br />
                        <h1 className={styles.sectionTitle}>Web</h1>
                        <p className={styles.address}>
                            <a href={eventData.webLink} target="_blank" className={styles.webLink}>
                                {eventData.webLink}
                            </a>
                        </p>
                    </section>
                )}

                <hr />
            </div>

            {/* DESCRIPTION, WEBLINK */}
            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>Acerca de este evento</h1>
                <p className={styles.description}>{renderFormattedDescription()}</p>
                <a href={eventData.web} className={styles.webLink}>
                    {eventData.web}
                </a>
            </section>
            <hr />

            {/* TAGS */}
            {eventData.tags && eventData.tags.length > 0 && (
                <section className={styles.section}>
                    <h1 className={styles.sectionTitle}>Etiquetas</h1>
                    <div className={styles.tags}>
                        {eventData.tags.map((tag, index) => (
                            <span key={index} className={styles.tagChip}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>
            )}
            <hr />

            {/* ORGANIZED BY */}
            {eventData.organizedBy && eventData.organizedBy.length > 0 && (
                <section className={styles.section}>
                    <h1 className={styles.sectionTitle}>Organizadores</h1>
                    <div className={styles.organizedBySection}>
                        <div className={styles.tags}>
                            {eventData.organizedBy.map((organizedBy, index) => (
                                <span key={index} className={styles.tagChip}>
                                    {organizedBy}
                                </span>
                            ))}
                        </div>
                        { eventData.contactEmail && (
                            <a href={'mailto:' + eventData.contactEmail}>
                                <ButtonRed label="contactar" />
                            </a>
                        )}
                    </div>
                </section>
            )}
            {/* <hr /> */}
            <div>
                {isModalOpen && (
                    <ModalDisplay
                        title={modalTitle}
                        button1Text={modalBtn1Text}
                        button2Text={modalBtn2Text}
                        onClose={closeModal}
                        isOpen={true}
                        onButton1Click={closeModal}
                        onButton2Click={handleEventAction}
                        showCloseButton={true}
                    />
                )}
            </div>
        </div>
    );
};

export default EventDetailPage;
