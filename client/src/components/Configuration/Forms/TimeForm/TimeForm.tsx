import { useState, ChangeEvent } from 'react';
import styles from './TimeForm.module.css';
import TextInput from '../../../TextInput/TextInput';
import ButtonSubmit from '../../../Button/ButtonSubmit/ButtonSubmit';
import ModalDisplay from '../../../Modal/ModalDisplay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TimeData {
    name: string;
    description: string;
}

const TimeForm = () => {

    //  States
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ timeData, setTimeData ] = useState<TimeData>({
        name: '',
        description: '',
    });

    const resetForm = () => {
        setTimeData({
            name: '',
            description: '',
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value, id } = e.target;
        setTimeData({
            ...timeData,
            [id]: value,
        });
    };

    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsModalOpen(true);
        window.scrollTo(0, 0);
    };

    //Save
    const handleSave = async () => {
        
        const res = await fetch(
            `http://localhost:8000/api/times`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(timeData),
            }
        );

        if (res.ok) {
            toast.success('Los cambios se han guardado con éxito', {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
            });
    
            resetForm();
            setIsModalOpen(false);
            closeModal;
            
            window.scrollTo(0, 0);
        } else {
            toast.error('Hubo un error al guardar los cambios', {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
            });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        window.scrollTo(0, 0);
    };

    return (
        <div data-testid="time-form"  className={styles.subtimePage}>
            <ToastContainer  />
            <div className={styles.container}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <div data-testid="header-title" className={styles.title}>
                                <h1 className={styles.dash}>—</h1>
                                <h1>Crea un rango horario</h1>
                            </div>
                            <div className={styles.inputsSection}>
                                <TextInput
                                    id="name"
                                    type="text"
                                    label=""
                                    placeholder="Rango horario"
                                    minLength={3}
                                    maxLength={175}
                                    value={timeData.name}
                                    onChange={handleInputChange}
                                    isRequired={true}
                                />
                                <TextInput
                                    id="description"
                                    type="text"
                                    label=""
                                    placeholder="Descripción del rango horario"
                                    minLength={3}
                                    maxLength={175}
                                    value={timeData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </section>
                        <div data-testid="button-submit" className={styles.buttonSection}>
                            <ButtonSubmit label="Guardar" />
                        </div>
                    </form>
                    <div data-testid="modal">
                        {isModalOpen && (
                            <ModalDisplay
                                title={'Quieres guardar?'}
                                subtitle={''}
                                button1Text={'Guardar'}
                                button2Text={'Cancelar'}
                                onClose={closeModal}
                                isOpen={true}
                                onButton1Click={handleSave}
                                onButton2Click={closeModal}
                                showCloseButton={true}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeForm;