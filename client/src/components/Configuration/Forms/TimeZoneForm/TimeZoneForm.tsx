import { useState, ChangeEvent } from 'react';
import styles from './TimeZoneForm.module.css';
import TextInput from '../../../TextInput/TextInput';
import ButtonSubmit from '../../../Button/ButtonSubmit/ButtonSubmit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDisplay from '../../../Modal/ModalDisplay';

interface TimeZoneData {
    name: string;
    description: string;
}

const TimeZoneForm = () => {

    //  States
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ timezoneData, setTimeZoneData ] = useState<TimeZoneData>({
        name: '',
        description: '',
    });

    const resetForm = () => {
        setTimeZoneData({
            name: '',
            description: '',
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value, id } = e.target;
        setTimeZoneData({
            ...timezoneData,
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
            `http://localhost:8000/api/timezones`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(timezoneData),
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
        <div className={styles.subcategoryPage}>
            <ToastContainer  />
            <div className={styles.container}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <div className={styles.title}>
                                <h1 className={styles.dash}>—</h1>
                                <h1>Crea una zona horaria</h1>
                            </div>
                            <div className={styles.inputsSection}>
                                <TextInput
                                    id="name"
                                    type="text"
                                    label=""
                                    placeholder="Nombre de la zona horaria"
                                    minLength={3}
                                    maxLength={175}
                                    value={timezoneData.name}
                                    onChange={handleInputChange}
                                    isRequired={true}
                                />
                                <TextInput
                                    id="description"
                                    type="text"
                                    label=""
                                    placeholder="Descripción de la zona horaria"
                                    minLength={3}
                                    maxLength={175}
                                    value={timezoneData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </section>
                        <div className={styles.buttonSection}>
                            <ButtonSubmit label="Guardar" />
                        </div>
                    </form>
                    <div>
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

export default TimeZoneForm;