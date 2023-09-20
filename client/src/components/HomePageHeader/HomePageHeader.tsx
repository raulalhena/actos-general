import { SearchBar } from '../../components/SearchBar/SearchBar';
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
                <div className={styles.searchBar}>Aquí va una search bar</div>
            </section>
        </>
    );
};

export default HomePageHeader;
