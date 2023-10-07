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
    const { user, isLogged } = useAuth();

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
        subcategoryLogo: '',
    });

    const [ inscription, setInscription ] = useState<boolean>(false);
    const [ online, setOnline ] = useState<boolean>(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState(
        'Estás a punto de inscribirte al evento.'
    );
    const [ modalBtn1Text, setModalBtn1Text ] = useState('Cancelar');
    const [ modalBtn2Text, setModalBtn2Text ] = useState('Inscribirme');
    const [ actionType, setActionType ] = useState('inscription');

    const storeActionType = (type: any) => {
        localStorage.setItem('actionType', type);
    };

    useEffect(() => {
        const storedActionType =
      localStorage.getItem('actionType') || 'inscription';
        setActionType(storedActionType);
    }, []);

    const openModal = (type: any) => {
        setIsModalOpen(true);
        setActionType(type);
        setModalBtn1Text('Cancelar');
        setModalBtn2Text(
            type === 'inscription'
                ? 'Inscribirme'
                : type === 'online'
                    ? 'Inscribirme online'
                    : 'Eliminar'
        );
        setModalTitle(
            type === 'inscription' || type === 'online'
                ? 'Estás a punto de inscribirte al evento.'
                : 'Estás a punto de eliminar la inscripción.'
        );
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const getEvent = async () => {
            const response = await fetch(`http://localhost:8000/api/events/${_id}`);
            const data = await response.json();
            setEventData(data);
        };

        getEvent();
    }, [ _id ]);

    const [ qrUser, setQRUser ] = useState('');

    useEffect(() => {
        const checkInscription = async () => {
            const res = await fetch(
                `http://localhost:8000/api/events/user/${user._id}`
            );
            const inscriptionEvents = await res.json();

            const insEvents = Array.from(inscriptionEvents);

            insEvents.forEach((sEvent) => {
                if (sEvent._id === _id) {
                    setInscription(true);
                    sEvent.submitted.forEach(submUser => {
                        if(submUser.userId === user._id) setQRUser(submUser.qrUser);
                    });
                }
            });
        };

        checkInscription();
    }, [ eventData ]);

    useEffect(() => {
        const checkInscriptionOnline = async () => {
            const res = await fetch(
                `http://localhost:8000/api/events/user/${user._id}`
            );
            const inscriptionEvents = await res.json();

            const insEvents = Array.from(inscriptionEvents);

            insEvents.forEach((sEvent) => {
                if (sEvent._id === _id) setOnline(true);
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
        const endpointMapping = {
            'inscription': 'http://localhost:8000/api/events/inscription',
            'unsubscription': 'http://localhost:8000/api/events/unsubscription',
            'online': 'http://localhost:8000/api/events/online',
            'unsubscribe-online':
        'http://localhost:8000/api/events/unsubscribe-online',
        };

        const endpoint =
      endpointMapping[actionType as keyof typeof endpointMapping] || undefined;

        if (endpoint) {
            const res = await fetch(endpoint, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id,
                    eventId: _id,
                }),
            });

            if (res.ok) {
                setModalTitle(
                    `Te has ${
                        actionType === 'inscription' || actionType === 'online'
                            ? 'inscrito'
                            : 'desuscrito'
                    } correctamente.`
                );
                setModalBtn1Text('');
                setModalBtn2Text('');
                setInscription(actionType === 'inscription' || actionType === 'online');
            } else {
                setModalTitle(
                    `Error al ${
                        actionType === 'inscription' ? 'inscribirse' : 'desinscribirse'
                    }.`
                );
            }
        }
    };

    function formatDate(originalDate: string) {
        const date = new Date(originalDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} de ${month} de ${year}`;
    }

    const formattedDate = formatDate(eventData.date);

    return (
        <div data-testid="event-detail" className={styles.page}>
            {/* IMAGE */}
            <div className={styles.imageSection}>
                <img src={eventData.image} className={styles.eventImage} />
                <div className={styles.logoContainer}>
                    <img
                        src={eventData.subcategoryLogo}
                        className={styles.logoImage}
                        alt="Logo"
                    />
                </div>
            </div>

            {/* TITLE */}
            <h1 className={styles.eventTitle}>{eventData.name}</h1>

            {/* CATEGORIES */}
            <section className={styles.sectionTopButtons}>
                <div className={styles.categorySubcategorySection}>
                    <span className={styles.category}>{eventData.category}</span>
                    <span className={styles.subcategory}>{eventData.subcategory}</span>
                </div>
                {isLogged && inscription && (
                    <div>
                        <img src={qrUser} style={{ widht: '100px', height: '100px' }}/>
                    </div>
                )}
                {/*INSCRIPTION */}
                {isLogged &&
                (eventData.mode === 'Híbrido' ? (
                    <div className={styles.categorySubcategorySection}>
                        {!inscription ? (
                            <>
                                <ButtonInscription
                                    label="Inscripción Evento Online"
                                    onClick={() => {
                                        openModal('online');
                                        storeActionType('online');
                                    }}
                                />
                                <ButtonInscription
                                    label="Inscripción Evento Presencial"
                                    onClick={() => {
                                        openModal('inscription');
                                        storeActionType('inscription');
                                    }}
                                />
                            </>
                        ) : (
                            <ButtonInscription
                                label="Eliminar inscripción."
                                onClick={() =>
                                    openModal(
                                        actionType === 'inscription'
                                            ? 'unsubscription'
                                            : 'unsubscribe-online'
                                    )
                                }
                            />
                        )}
                    </div>
                ) : (
                    <div className={styles.categorySubcategorySection}>
                        {!inscription ? (
                            <ButtonInscription
                                label="Inscribirse al evento"
                                onClick={() => openModal('inscription')}
                            />
                        ) : (
                            <ButtonInscription
                                label="Eliminar inscripción"
                                onClick={() => openModal('unsubscription')}
                            />
                        )}
                    </div>
                ))}
            </section>

            {/* MODE, TYPE, LANGUAGE */}
            <section className={styles.sectionEventDetail}>
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

            {/* DATE */}
            <section className={styles.sectionEventDetail}>
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

            {/* ADDRESS */}
            <div>
                {eventData.mode === 'Presencial' && (
                    <section className={styles.sectionEventDetail}>
                        <h1 className={styles.sectionTitle}>Ubicación</h1>
                        <p className={styles.address}>{eventData.address}</p>
                    </section>
                )}

                {eventData.mode === 'En Línea' && inscription && (
                    <section className={styles.sectionEventDetail}>
                        <h1 className={styles.sectionTitle}>Web</h1><p className={styles.address}>
                            <a
                                href={eventData.webLink}
                                target="_blank"
                                className={styles.webLink}
                            >
                                {eventData.webLink}
                            </a>
                        </p>
                    </section>
                )}

                {eventData.mode === 'Híbrido' && (
                    <section className={styles.sectionEventDetail}>
                        <h1 className={styles.sectionTitle}>Ubicación</h1>
                        <p className={styles.address}>{eventData.address}</p>
                        {inscription && <>
                            <br />
                            <h1 className={styles.sectionTitle}>Web</h1><p className={styles.address}>
                                <a
                                    href={eventData.webLink}
                                    target="_blank"
                                    className={styles.webLink}
                                >
                                    {eventData.webLink}
                                </a>
                            </p>
                        </>}
                    </section>
                )}
            </div>

            {/* DESCRIPTION, WEBLINK */}
            <section className={styles.sectionEventDetail}>
                <h1 className={styles.sectionTitle}>Acerca de este evento</h1>
                <p className={styles.description}>{renderFormattedDescription()}</p>
                <a href={eventData.web} className={styles.webLink}>
                    {eventData.web}
                </a>
            </section>

            {/* TAGS */}
            {eventData.tags && eventData.tags.length > 0 && (
                <section className={styles.sectionEventDetail}>
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

            {/* ORGANIZED BY */}
            {eventData.organizedBy && eventData.organizedBy.length > 0 && (
                <section className={styles.sectionEventDetail}>
                    <h1 className={styles.sectionTitle}>Organizadores</h1>
                    <div className={styles.organizedBySection}>
                        <div className={styles.tags}>
                            {eventData.organizedBy.map((organizedBy, index) => (
                                <span key={index} className={styles.tagChip}>
                                    {organizedBy}
                                </span>
                            ))}
                        </div>
                        {eventData.contactEmail && (
                            <a href={'mailto:' + eventData.contactEmail}>
                                <ButtonRed label="contactar" />
                            </a>
                        )}
                    </div>
                </section>
            )}
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
