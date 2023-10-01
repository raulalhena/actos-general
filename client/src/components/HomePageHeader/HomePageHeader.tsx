// import SearchBar from '../SearchBar/SearchBar';
import styles from './HomePageHeader.module.css';

const HomePageHeader = () => {
    return (
        <>
            <section className={styles.header}>
                <div className={styles.text}>
                    <h1 className={styles.title}>Descubre todas las actividades de Nous Cims</h1>
                    <h2 className={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </h2>
                </div>
                {/* <SearchBar /> */}
            </section>
        </>
    );
};

export default HomePageHeader;
