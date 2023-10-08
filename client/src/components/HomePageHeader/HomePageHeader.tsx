import SearchBar from '../SearchBar/SearchBar';
import styles from './HomePageHeader.module.css';
import image from '../../assets/homePage.png';

const HomePageHeader = () => {
    return (
        <>
            <div data-testid="home-page" className={styles.header}>
                <div className={styles.headerContent}>
                    <section>
                        <div className={styles.text}>
                            <h1 className={styles.title}>
                La <span className={styles.bold}>revolución</span> son las{' '}
                                <span className={styles.bold}>oportunidades</span>
                                <br />
                Las <span className={styles.bold}>oportunidades</span> son ideas{' '}
                                <span className={styles.bold}>transformadoras</span>
                            </h1>

                            <h2 className={styles.subtitle}>
                Descubre todas las actividades Nous Cims.
                            </h2>
                        </div>
                        <SearchBar />
                    </section>
                    <section>
                        <div className={styles.container}>
                            <img className={styles.image} src={image} alt="image" />
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default HomePageHeader;
