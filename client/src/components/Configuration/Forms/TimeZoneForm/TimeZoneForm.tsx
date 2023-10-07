import { useState, ChangeEvent } from 'react';
import styles from './TimeZoneForm.module.css';
import TextInput from '../../../TextInput/TextInput';
import ButtonSubmit from '../../../Button/ButtonSubmit/ButtonSubmit';

interface TimeZoneData {
  name: string;
  description: string;
}

const TimeZoneForm = () => {

    //  States
    const [ timezoneData, setTimeZoneData ] = useState<TimeZoneData>({
        name: '',
        description: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value, id } = e.target;
        setTimeZoneData({
            ...timezoneData,
            [id]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = fetch(
            `http://localhost:8000/api/timezones`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(timezoneData),
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
                </div>
            </div>
        </div>
    );
};

export default TimeZoneForm;