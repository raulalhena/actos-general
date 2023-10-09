import { useState, ChangeEvent } from 'react';
import styles from './VisibilityForm.module.css';
import TextInput from '../../../TextInput/TextInput';
import ButtonSubmit from '../../../Button/ButtonSubmit/ButtonSubmit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDisplay from '../../../Modal/ModalDisplay';
import HOST from '../../../../utils/env';

interface VisibilityData {
    name: string;
    description: string;
}

const VisibilityForm = () => {

    //  States
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ visibilityData, setVisibilityData ] = useState<VisibilityData>({
        name: '',
        description: '',
    });

    const resetForm = () => {
        setVisibilityData({
            name: '',
            description: '',
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value, id } = e.target;
        setVisibilityData({
            ...visibilityData,
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
            `${HOST}api/visibilities`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(visibilityData),
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
        <div data-testid="visibility-form" className={styles.subcategoryPage}>
            <ToastContainer />
            <div className={styles.container}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <div data-testid="header-title"  className={styles.title}>
                                <h1 className={styles.dash}>—</h1>
                                <h1>Crea una visibilidad del evento</h1>
                            </div>
                            <div className={styles.inputsSection}>
                                <TextInput
                                    id="name"
                                    type="text"
                                    label=""
                                    placeholder="Nombre de la visibilidad del evento"
                                    minLength={3}
                                    maxLength={175}
                                    value={visibilityData.name}
                                    onChange={handleInputChange}
                                    isRequired={true}
                                />
                                <TextInput
                                    id="description"
                                    type="text"
                                    label=""
                                    placeholder="Descripción de la visibilidad del evento"
                                    minLength={3}
                                    maxLength={175}
                                    value={visibilityData.description}
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

export default VisibilityForm;