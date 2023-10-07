import { useState, ChangeEvent } from 'react';
import styles from './CategoryForm.module.css';
import TextInput from '../../../TextInput/TextInput';
import ButtonSubmit from '../../../Button/ButtonSubmit/ButtonSubmit';
import ConfigList from '../../List/ConfigList';

interface CategoryData {
  name: string;
  description: string;
}

const CategoryForm = () => {

    //  States
    const [ categoryData, setCategoryData ] = useState<CategoryData>({
        name: '',
        description: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value, id } = e.target;
        setCategoryData({
            ...categoryData,
            [id]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = fetch(
            `http://localhost:8000/api/categories/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            }
        );

        if (res.ok) console.log('modal');
        return;
    };

    return (
        <>
            <ConfigList/>
            <div className={styles.subcategoryPage}>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryForm;