import CategoryConfigCard from '../../components/Configuration/Cards/CategoryConfigCard/CategoryConfigCard';
import ModeConfigCard from '../../components/Configuration/Cards/ModeConfigCard/ModeConfigCard';
import SubcategoryConfigCard from '../../components/Configuration/Cards/SubcategoryConfigCard/SubcategoryConfigCard';
import TypeConfigCard from '../../components/Configuration/Cards/TypeConfigCard/TypeConfigCard';
import TimeConfigCard from '../../components/Configuration/Cards/TimeConfigCard/TimeConfigCard';
import TimeZoneConfigCard from '../../components/Configuration/Cards/TimeZoneConfigCard/TimeZoneConfigCard';
import LanguageConfigCard from '../../components/Configuration/Cards/LanguageConfigCard/LanguageConfigCard';
import VisibilityConfigCard from '../../components/Configuration/Cards/VisibilityConfigCard/VisibilityConfigCard';
import styles from './ConfigBoard.module.css';

const ConfigBoard = () => {
    return (
        <>
            <div className={styles.page}>
                <section className={styles.header}>
                    <div className={styles.topTitle}>
                        <h1 className={styles.dash}>—</h1>
                        <h1>Personaliza los formularios</h1>
                    </div>
                </section>
                <section className={styles.gridSection}>
                    <div className={styles.configGrid}>
                        <CategoryConfigCard />
                        <SubcategoryConfigCard />
                        <TypeConfigCard />
                        <ModeConfigCard />
                        <TimeConfigCard />
                        <TimeZoneConfigCard />
                        <LanguageConfigCard />
                        <VisibilityConfigCard />
                    </div>
                </section>
            </div>
        </>
    );
};

export default ConfigBoard;
