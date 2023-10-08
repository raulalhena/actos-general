import { useState, useEffect, ChangeEvent } from 'react';
import { ImageUploader } from '../../../ImageUploader/ImageUploader';
import styles from './SubcategoryForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextInput from '../../../TextInput/TextInput';
import ButtonSubmit from '../../../Button/ButtonSubmit/ButtonSubmit';
import SelectCategories from '../../../SelectCategories/SelectCategories';
import { EventDashboardFormProps } from '../../../../interfaces/eventDashboardFormProps';
import ModalDisplay from '../../../Modal/ModalDisplay';

interface CategoryData {
    name: string;
    description: string;
    image: string;
    category: string;
}

const SubcategoryForm = () => {

    //  States
    const [ previewURL, setPreviewURL ] = useState<string>('');
    const [ imgVisibility, setImgVisibility ] = useState<string>('none');
    const [ imageFile, setImageFile ] = useState<Blob | null>(null);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ categories, setCategories ] = useState<Array<EventDashboardFormProps>>(
        []
    );
    const [ selectedCategory, setSelectedCategory ] = useState('');
    const [ subcategoryData, setSubcategoryData ] = useState<CategoryData>({
        name: '',
        description: '',
        image: '',
        category: '',
    });
    
    const resetForm = () => {
        setPreviewURL('');
        setImgVisibility('none');
        setImageFile(null);
        setSelectedCategory('');
        setSubcategoryData({
            name: '',
            description: '',
            image: '',
            category: '',
        });
    };

    useEffect(() => {
        const getCategories = async () => {
            const resp = await fetch('http://localhost:8000/api/categories');
            const categoriesDb = await resp.json();

            setCategories(categoriesDb);
        };

        getCategories();
    }, []);

    useEffect(() => {
        convertToBase64();
    }, [ imageFile ]);

    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (subcategoryData.image === '') {
            toast.warning('No se ha seleccionado ninguna imagen', {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
            });
            setIsModalOpen(true);
        }
        setIsModalOpen(true);
        window.scrollTo(0, 0);
    };

    //Save
    const handleSave = async () => {
        const saveData = async () => {
            const res = await fetch(
                `http://localhost:8000/api/categories/${selectedCategory}/subcategories`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(subcategoryData),
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
        saveData();
        window.scrollTo(0, 0);
    };

    // Categories Handle Change
    const handleCategoryChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { value } = event.target;
        const selected = event.target.selectedOptions[0].text;

        setSelectedCategory(value);

        setSubcategoryData({
            ...subcategoryData,
            category: selected,
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value, id } = e.target;
        setSubcategoryData({
            ...subcategoryData,
            [id]: value,
        });
    };

    // File Handler
    const handleFile = (file: any) => {
        setImageFile(() => file);
        setPreviewURL(URL.createObjectURL(file));
        setImgVisibility('block');
    };

    // Drop handler
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file.size > 1000000) {
            toast.error(
                `El tamaño supera el máximo de 1MB. Imagen usada: ${(
                    file.size / 1000000
                ).toFixed(2)}MB.`,
                {
                    position: 'top-right',
                    autoClose: 2500,
                    pauseOnHover: true,
                }
            );
            e.dataTransfer.clearData();
            return;
        }
        e.dataTransfer.clearData();
        handleFile(file);
    };

    // Drag Over handler
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // Image remover
    const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPreviewURL('');
        setImgVisibility('none');
        setImageFile(() => null);
        setSubcategoryData({
            ...subcategoryData,
            image: '',
        });
    };

    const convertToBase64 = () => {
        if (imageFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = () => {
                if (typeof fileReader.result === 'string') {
                    setSubcategoryData({
                        ...subcategoryData,
                        image: fileReader.result,
                    });
                } else {
                    // if fileReader.result is not a string (e.g., it's null ??)
                }
            };
        }
        return;
    };

    const closeModal = () => {
        setIsModalOpen(false);
        window.scrollTo(0, 0);
    };

    return (
        <div data-testid="subcategory-form" className={styles.subcategoryPage}>
            <ToastContainer  />
            <div className={styles.container}>
                
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
    
                        <section>
                            <div data-testid="header-title"  className={styles.title}>
                                <h1 className={styles.dash}>—</h1>
                                <h1>Crea una subcategoría</h1>
                            </div>
                            <SelectCategories
                                id="category"
                                label="¿A qué categoría pertenece? *"
                                options={categories}
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            />
                            <div className={styles.inputsSection}>
                                <h2 className={styles.label}>Información básica</h2>
                                <TextInput
                                    id="name"
                                    type="text"
                                    label=""
                                    placeholder="Nombre de la subcategoría"
                                    minLength={3}
                                    maxLength={175}
                                    value={subcategoryData.name}
                                    onChange={handleInputChange}
                                    isRequired={true}
                                />
                                <TextInput
                                    id="description"
                                    type="text"
                                    label=""
                                    placeholder="Descripción de la subcategoría"
                                    minLength={3}
                                    maxLength={175}
                                    value={subcategoryData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <ImageUploader
                                id="image"
                                removeImage={removeImage}
                                previewURL={previewURL}
                                imgVisibility={imgVisibility}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            />
                        </section>
                        <div data-testid="button-submit" className={styles.buttonSection}>
                            <ButtonSubmit label="Guardar" />
                        </div>
                    </form>
                    <div data-testid="modal">
                        {isModalOpen && (
                            <ModalDisplay
                                icon={''}
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

export default SubcategoryForm;