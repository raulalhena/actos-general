import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ConfigList.module.css';
import Preloader from '../../Preloader/Preloader';

interface DataList {
    name: string;
    description: string;
    _id: string;
}

const ConfigList = () => {
    const location = useLocation();
    const propsData = location.state;
    const [ dataList, setDataList ] = useState<DataList[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `http://localhost:8000/api/${propsData}`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Data not found');
                }
                const data = await response.json();
                setIsLoading(false);
                setDataList(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [ propsData ]);

    const handleDelete = async (name: string) => {
        try {
            const response = await fetch(`http://localhost:8000/api/${propsData}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setDataList((prevDataList) =>
                prevDataList.filter((list) => list.name !== name)
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageContainer}>
                <div className={styles.title}>
                    <h1 className={styles.dash}>—</h1>
                    <h1>Configuracion</h1>
                </div>
                <div>{ isLoading && <Preloader />}</div>
                <div className={styles.eventList} data-testid="eventsList-page">
                    {dataList.map((list) => (
                        <div key={list._id} className={styles.eventItem}>
                            <h2 className={styles.eventTitle}>{list.name}</h2>
                            <div className={styles.eventChips}>
                                <button className={styles.eventItem} onClick={() => handleDelete(list.name)}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Link className={styles.eventItem} to={`/config/configform`} state={`${propsData}`}>
                    <div>
                        <h2>CREAR NUEVO</h2>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ConfigList;
