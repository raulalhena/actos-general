import { useState, ChangeEvent } from 'react';
import styles from './VisibilityForm.module.css';
import TextInput from '../../../TextInput/TextInput';
import ButtonSubmit from '../../../Button/ButtonSubmit/ButtonSubmit';

interface VisibilityData {
  name: string;
  description: string;
}

const VisibilityForm = () => {

    //  States
    const [ visibilityData, setVisibilityData ] = useState<VisibilityData>({
        name: '',
        description: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value, id } = e.target;
        setVisibilityData({
            ...visibilityData,
            [id]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = fetch(
            `http://localhost:8000/api/visibilities`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(visibilityData),
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
                                <h1>Crea una visibilidad del evento</h1>
                            </div>
                            <div className={styles.inputsSection}>
                                <TextInput
                                    id="name"
                                    visibility="text"
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
                                    visibility="text"
                                    label=""
                                    placeholder="Descripción de la visibilidad del evento"
                                    minLength={3}
                                    maxLength={175}
                                    value={visibilityData.description}
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

export default VisibilityForm;