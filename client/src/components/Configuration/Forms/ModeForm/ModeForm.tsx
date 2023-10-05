import { useState, ChangeEvent } from 'react';
import styles from './ModeForm.module.css';
import TextInput from '../../../TextInput/TextInput';
import ButtonSubmit from '../../../Button/ButtonSubmit/ButtonSubmit';

interface ModeData {
  name: string;
  description: string;
}

const ModeForm = () => {

    //  States
    const [ modeData, setModeData ] = useState<ModeData>({
        name: '',
        description: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value, id } = e.target;
        setModeData({
            ...modeData,
            [id]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = fetch(
            `http://localhost:8000/api/misc/categories/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modeData),
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
                                <h1>Crea un modo de asistencia</h1>
                            </div>
                            <div className={styles.inputsSection}>
                                <TextInput
                                    id="name"
                                    type="text"
                                    label=""
                                    placeholder="Nombre del modo de asistencia"
                                    minLength={3}
                                    maxLength={175}
                                    value={modeData.name}
                                    onChange={handleInputChange}
                                    isRequired={true}
                                />
                                <TextInput
                                    id="description"
                                    type="text"
                                    label=""
                                    placeholder="Descripción del modo de asistencia"
                                    minLength={3}
                                    maxLength={175}
                                    value={modeData.description}
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

export default ModeForm;