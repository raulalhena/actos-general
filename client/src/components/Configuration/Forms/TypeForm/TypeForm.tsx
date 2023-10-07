import { useState, ChangeEvent } from 'react';
import styles from './TypeForm.module.css';
import TextInput from '../../../TextInput/TextInput';
import ButtonSubmit from '../../../Button/ButtonSubmit/ButtonSubmit';

interface TypeData {
  name: string;
  description: string;
}

const TypeForm = () => {

    //  States
    const [ typeData, setTypeData ] = useState<TypeData>({
        name: '',
        description: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value, id } = e.target;
        setTypeData({
            ...typeData,
            [id]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = fetch(
            `http://localhost:8000/api/types`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(typeData),
            }
        );

        if (res.ok) console.log('modal');
        return;
    };

    return (
        <div className={styles.subcategoryPage}>
            <div className={styles.container}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <div className={styles.title}>
                                <h1 className={styles.dash}>—</h1>
                                <h1>Crea un tipo de evento</h1>
                            </div>
                            <div className={styles.inputsSection}>
                                <TextInput
                                    id="name"
                                    type="text"
                                    label=""
                                    placeholder="Nombre del tipo de evento"
                                    minLength={3}
                                    maxLength={175}
                                    value={typeData.name}
                                    onChange={handleInputChange}
                                    isRequired={true}
                                />
                                <TextInput
                                    id="description"
                                    type="text"
                                    label=""
                                    placeholder="Descripción del tipo de evento"
                                    minLength={3}
                                    maxLength={175}
                                    value={typeData.description}
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
    );
};

export default TypeForm;