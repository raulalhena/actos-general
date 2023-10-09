import { useState, ChangeEvent } from 'react';
import styles from './LanguageForm.module.css';
import TextInput from '../../../TextInput/TextInput';
import ButtonSubmit from '../../../Button/ButtonSubmit/ButtonSubmit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDisplay from '../../../Modal/ModalDisplay';
import HOST from '../../../../utils/env';

interface LanguageData {
    name: string;
    description: string;
}

const LanguageForm = () => {

    //  States
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ languageData, setLanguageData ] = useState<LanguageData>({
        name: '',
        description: '',
    });

    const resetForm = () => {
        setLanguageData({
            name: '',
            description: '',
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value, id } = e.target;
        setLanguageData({
            ...languageData,
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
            `${HOST}/api/languages`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(languageData),
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
        <div data-testid="language-form" className={styles.subcategoryPage}>
            <ToastContainer />
            <div className={styles.container}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <div data-testid="header-title" className={styles.title}>
                                <h1 className={styles.dash}>—</h1>
                                <h1>Crea un idioma</h1>
                            </div>
                            <div className={styles.inputsSection}>
                                <TextInput
                                    id="name"
                                    type="text"
                                    label=""
                                    placeholder="Nombre del idioma"
                                    minLength={3}
                                    maxLength={175}
                                    value={languageData.name}
                                    onChange={handleInputChange}
                                    isRequired={true}
                                />
                                <TextInput
                                    id="description"
                                    type="text"
                                    label=""
                                    placeholder="Descripción del idioma"
                                    minLength={3}
                                    maxLength={175}
                                    value={languageData.description}
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

export default LanguageForm;