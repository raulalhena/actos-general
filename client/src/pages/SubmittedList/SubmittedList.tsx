import { useEffect, useState } from 'react';
import { User } from '../../interfaces/User';
import styles from './SubmittedList.module.css';
import Preloader from '../../components/Preloader/Preloader';
import { useLocation } from 'react-router-dom';

const SubmittedList = () => {
    const [ users, setUsers ] = useState<Array<User>>([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const location = useLocation();
    const submittedProps = location.state;

    useEffect(() => {
        const getAllEvents = async () => {
            const respo = await fetch(`http://localhost:8000/api/events/${submittedProps.id}/submitted/?mode=${submittedProps.mode}`);
            const eventsData = await respo.json();

            setUsers(eventsData[0].submitted);
            setIsLoading(false);
        };

        getAllEvents();
    }, []);

    return (
        <>
            <div className={styles.page}>
                <div className={styles.pageContainer}>
                    <div className={styles.title}>
                        <h1 className={styles.dash}>—</h1>
                        <h1>Usuarios inscritos {submittedProps.mode}</h1>
                    </div>
                    <div>{isLoading && <Preloader />}</div>
                    <div className={styles.eventList} data-testid="eventsList-page">
                        {users && users.map((user: User, index: number) => (
                            <div key={index}>
                                <div className={styles.eventItem}>
                                    <h2
                                        className={styles.eventTitle}
                                        id={user._id}
                                    >
                                        {user.name} {user.surname}
                                    </h2>
                                    <span className={styles.cardSubcategory}>
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubmittedList;
