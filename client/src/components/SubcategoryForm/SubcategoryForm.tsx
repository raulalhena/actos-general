import { useState, useEffect, ChangeEvent } from 'react';
import { ImageUploader } from '../ImageUploader/ImageUploader';
import styles from './SubcategoryForm.module.css';
import { ToastContainer } from 'react-toastify';
import TextInputSmall from '../TextInputSmall/TextInputSmall';
import ButtonSubmit from '../Button/ButtonSubmit/ButtonSubmit';
import SelectCategories from '../SelectCategories/SelectCategories';

interface CategoryData {
    name: string;
    description: string;
    image: string;
}

const SubcategoryForm = () => {

    //  States
    const [ previewURL, setPreviewURL ] = useState<string>('');
    const [ imgVisibility, setImgVisibility ] = useState<string>('none');
    const [ imageFile, setImageFile ] = useState<Blob>(null);
    const [ categories, setCategories ] = useState<Array<EventDashboardFormProps>>([]);
    const [ selectedCategory, setSelectedCategory ] = useState('');
    const [ subcategoryData, setSubcategoryData ] = useState<CategoryData>({
        name: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        const getCategories = async () => {
            const resp = await fetch('http://localhost:8000/api/misc/categories');
            const categoriesDb = await resp.json();

            setCategories(categoriesDb);
        };

        getCategories();
    }, []);
 
    useEffect(() => {
        convertToBase64();
    }, [ imageFile ]);

    const handleSubmit = (e: SubmitEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const res = fetch(`http://localhost:8000/api/misc/categories/${selectedCategory}/subcategories`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subcategoryData)
        });

        if(res.ok) console.log('modal');
        return;
    };

    // Categories Handle Change
    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
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
            [id]: value
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
        if(file.size > 1000000) {
            toast.error(`El tamaño supera el máximo de 1MB. Imagen usada: ${(file.size/1000000).toFixed(2)}MB.`, {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
            });
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
            image: ''
        });
    };

    const convertToBase64 = () => {
        if(imageFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = () => {
                setSubcategoryData({
                    ...subcategoryData,
                    image: fileReader.result
                });
                console.log('base64', fileReader.result);
            };
        }
        return;
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <section>
                        <h1>Crear una subcategoría</h1>
                        <SelectCategories
                            id="category"
                            label="Categoría *"
                            options={categories}
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        />
                        <TextInputSmall
                            id="name"
                            type='text'
                            label=""
                            placeholder="Nombre"
                            minLength={3}
                            maxLength={175}
                            value={subcategoryData.name}
                            onChange={handleInputChange}
                            isRequired={true}
                        />
                        <TextInputSmall
                            id="description"
                            type='text'
                            label=""
                            placeholder="Description"
                            minLength={3}
                            maxLength={175}
                            value={subcategoryData.description}
                            onChange={handleInputChange}
                        />
                        <ImageUploader
                            id="image"
                            removeImage={removeImage}
                            previewURL={previewURL}
                            imgVisibility={imgVisibility}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        />
                    </section>
                    <div className={styles.buttonSection}>
                        <ButtonSubmit label="Guardar" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubcategoryForm;