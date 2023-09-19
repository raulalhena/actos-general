import ButtonWhite from '../ButtonWhite/ButtonWhite';
import styles from './InscriptionsRecap.module.css';

const InscriptionsRecap = () => {
    return (
        <>
            <div className={styles.container}>
                <section className={styles.inscriptions}>
                    <h1>0/0</h1>
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
