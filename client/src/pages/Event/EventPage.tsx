'use client';

import EventForm from '@/components/EventForm/EventForm';
import styles from './event.module.css';
import { useSession } from 'next-auth/react';

const EventPage = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: session, status } = useSession();
    
    return (
        <>
            <section className={styles.title}>
                <h1 className={styles.dash}>—</h1>
                <h1>Crea tu propio evento</h1>
            </section>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <EventForm />
        </>
    );
};

export default EventPage;