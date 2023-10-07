import { useState, ChangeEvent } from 'react';
import styles from './CategoryForm.module.css';
import TextInput from '../../../TextInput/TextInput';
import ButtonSubmit from '../../../Button/ButtonSubmit/ButtonSubmit';
import ModalDisplay from '../../../Modal/ModalDisplay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CategoryData {
    name: string;
    description: string;
}

const CategoryForm = () => {

    //  States
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ categoryData, setCategoryData ] = useState<CategoryData>({
        name: '',
        description: '',
    });

    const resetForm = () => {
        setCategoryData({
            name: '',
            description: '',
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value, id } = e.target;
        setCategoryData({
            ...categoryData,
            [id]: value,
        });
    };

    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('pasa aqui??');

        setIsModalOpen(true);
        window.scrollTo(0, 0);
    };

    //Save
    const handleSave = async () => {
        console.log('pasa');
        const res = await fetch(
            `http://localhost:8000/api/categories/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            }
        );
    
        if (res.ok) {
            console.log('gusardado');
            toast.success('Los cambios se han guardado con éxito', {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
            });
    
            resetForm();
            setIsModalOpen(false);
            window.scrollTo(0, 0);
        } else {
            console.log('badd');
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
        <>
            <div className={styles.subcategoryPage}>
                <ToastContainer  />
                <div className={styles.container}>
                    <div className={styles.form}>
                        <form onSubmit={handleSubmit}>
                            <section>
                                <div className={styles.title}>
                                    <h1 className={styles.dash}>—</h1>
                                    <h1>Crea una categoría</h1>
                                </div>
                                <div className={styles.inputsSection}>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        label=""
                                        placeholder="Nombre de la categoría"
                                        minLength={3}
                                        maxLength={175}
                                        value={categoryData.name}
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    />
                                    <TextInput
                                        id="description"
                                        type="text"
                                        label=""
                                        placeholder="Descripción de la categoría"
                                        minLength={3}
                                        maxLength={175}
                                        value={categoryData.description}
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
        </>
    );
};

export default CategoryForm;