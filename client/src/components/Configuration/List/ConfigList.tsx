import  { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ConfigList.module.css'; 
import Preloader from '../../Preloader/Preloader';
import ModalDisplay from '../../Modal/ModalDisplay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ itemToDelete, setItemToDelete ] = useState<{ name: string, id: string } | null>(null);

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
                console.log(data);
                setDataList(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [ propsData ]);

    const handleDeleteButtonClick = (name: string, id: string) => {
        setItemToDelete({ name, id });
        setIsModalOpen(true);
    };

    const handleDelete = async (name: string, id: string) => {

        try {
            const response = await fetch(`http://localhost:8000/api/${propsData}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                
                toast.error('Hubo un error al eliminar ${name}', {
                    position: 'top-right',
                    autoClose: 2500,
                    pauseOnHover: true,
                });
            }

            setDataList((prevDataList) =>
                prevDataList.filter((list) => list.name !== name)
            );
            toast.success('Eliminado con éxito', {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
            });
            closeModal(); 

        } catch (error) {
            console.error(error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
        window.scrollTo(0, 0);
    };

    return (
        <div className={styles.page}>
            <ToastContainer  />
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1 className={styles.dash}>—</h1>
                        <h1>Configuración</h1>
                    </div>
                    
                    <br />
                </div>
                <div className={styles.btnContainer}>
                    <Link className={styles.createLink} to={`/config/configform`} state={`${propsData}`}>
                        <div >
                            <h2>CREAR NUEVO</h2>
                        </div>
                    </Link>
                </div>
                <br />
                
                <div>{isLoading && <Preloader />}</div>
                <div className={styles.eventList} data-testid="eventsList-page">
                    {dataList.map((list) => (
                        <div key={list._id} className={styles.eventItem}>
                            <h2 className={styles.eventTitle}>{list.name}</h2>
                            <div className={styles.eventChips}>
                                <button
                                    className={styles.createBtn}
                                    onClick={() => handleDeleteButtonClick(list.name, list._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
            </div>
            <div data-testid="modal">
                {isModalOpen && (
                    <ModalDisplay
                        title={`Quieres eliminar ${itemToDelete?.name}?`}
                        button1Text={'Eliminar'}
                        button2Text={'Cancelar'}
                        onClose={closeModal}
                        isOpen={true}
                        onButton1Click={() => handleDelete(itemToDelete?.name || '', itemToDelete?.id || '')}
                        onButton2Click={closeModal}
                        showCloseButton={true}
                    />
                )}
            </div>
        </div>
    );
};

export default ConfigList;
