import ButtonWhite from '../ButtonWhite/ButtonWhite';
import styles from './InscriptionsRecap.module.css';

interface InscriptionsRecapProps {
    capacity: string;
}

const InscriptionsRecap = ({ capacity }: InscriptionsRecapProps) => {
    console.log('capacity', capacity);

    return (
        <>
            <div className={styles.container}>
                <section className={styles.inscriptions}>
                    <h1>0/{capacity ? capacity : '-'}</h1>
                    <br />
                    <h2>Inscripciones</h2>
                </section>
                <section>
                    <ButtonWhite label="Mostrar Usuarios Inscritos" />
                </section>
            </div>
        </>
    );
};

export default InscriptionsRecap;
