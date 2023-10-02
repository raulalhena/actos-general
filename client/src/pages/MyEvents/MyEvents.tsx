import React from 'react';
import CardEvent from '../../components/CardEvent/CardEvent';

const MyEvents = () => {
    return (
        <section className={styles.section}>
            <div className={styles.title}>
                <h1 className={styles.dash}>—</h1>
                <h1>Mis Eventos</h1>
            </div>

            <div className={styles.cardGrid}>
                {latestEvents.map((event, index) => (
                    <CardEvent key={index} eventData={event} />
                ))}
            </div>
        </section>
    );
};

export default MyEvents;
