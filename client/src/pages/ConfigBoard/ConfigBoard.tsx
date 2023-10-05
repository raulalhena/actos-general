import CategoryConfigCard from '../../components/Configuration/Cards/CategoryConfigCard/CategoryConfigCard';
import ModeConfigCard from '../../components/Configuration/Cards/ModeConfigCard/ModeConfigCard';
import SubcategoryConfigCard from '../../components/Configuration/Cards/SubcategoryConfigCard/SubcategoryConfigCard';
import TypeConfigCard from '../../components/Configuration/Cards/TypeConfigCard/TypeConfigCard';
import TimeConfigCard from '../../components/Configuration/Cards/TimeConfigCard/TimeConfigCard';
import TimeZoneConfigCard from '../../components/Configuration/Cards/TimeZoneConfigCard/TimeZoneConfigCard';
import LanguageConfigCard from '../../components/Configuration/Cards/LanguageConfigCard/LanguageConfigCard';

const ConfigBoard = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '60vh' }}>
            <CategoryConfigCard />
            <SubcategoryConfigCard />
            <TypeConfigCard />
            <ModeConfigCard />
            <TimeConfigCard />
            <TimeZoneConfigCard />
            <LanguageConfigCard />
        </div>
    );
};

export default ConfigBoard;