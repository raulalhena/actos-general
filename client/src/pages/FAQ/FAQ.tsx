import { useState } from 'react';
import styles from './FAQ.module.css';
import faq from '../../assets/faq.png';

const FAQ = () => {
    const faqData = [
        {
            pregunta: '¿Cómo puedo encontrar eventos cerca de mí?',
            respuesta:
        'Puedes encontrar eventos cerca de ti utilizando la función de búsqueda en la página de inicio o explorando la lista de eventos.',
        },
        {
            pregunta: '¿Recibiré una confirmación de mi inscripción?',
            respuesta:
        'Sí, recibirás una confirmación por correo electrónico una vez que te hayas inscrito en un evento. Asegúrate de verificar tu bandeja de entrada y también la carpeta de correo no deseado.',
        },
        {
            pregunta: '¿Puedo traer a un amigo a un evento en el que me inscribí?',
            respuesta:
        'La política de invitados requiere que cada asistente se inscriba individualmente. Consulta los detalles del evento para obtener información específica.',
        },
        {
            pregunta:
        '¿Cómo puedo ponerme en contacto con el organizador del evento?',
            respuesta:
        'Puede ponerse en contacto con el organizador del evento a través del botón Contactar en la página de cada evento.',
        },
    ];

    const [ expandedIndex, setExpandedIndex ] = useState<number | null>(null);

    const handleToggleFAQ = (index: number) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    return (
        <div data-testid='faq-page' className={styles.page}>
            <section className={styles.header}>
                <div className={styles.topTitle}>
                    <h1 className={styles.dash}>—</h1>
                    <h1>Preguntas frequentes</h1>
                </div>
            </section>
            <section className={styles.faqSection}>
                <img src={faq} className={styles.faqImg} alt="faq" />
                <div className={styles.faqContainer}>
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${
                                expandedIndex === index ? styles.expanded : ''
                            }`}
                            onClick={() => handleToggleFAQ(index)}
                        >
                            <div className={styles.faqQuestion}>
                                <h4>{item.pregunta}</h4>
                                <span className={styles.toggleIcon}>
                                    {expandedIndex === index ? '-' : '+'}
                                </span>
                            </div>
                            {expandedIndex === index && (
                                <div className={styles.faqAnswer}>{item.respuesta}</div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FAQ;
