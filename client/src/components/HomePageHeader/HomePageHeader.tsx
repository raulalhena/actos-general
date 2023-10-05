import SearchBar from '../SearchBar/SearchBar';
import styles from './HomePageHeader.module.css';

const HomePageHeader = () => {
    return (
        <>
            <section data-testid='home-page' className={styles.header}>
                <div className={styles.text}>
                    <h1 className={styles.title}>Descubre todas las actividades de Nous Cims</h1>
                    <h2 className={styles.subtitle}>
                        
                    </h2>
                </div>
                <SearchBar />
            </section>
        </>
    );
};

export default HomePageHeader;
