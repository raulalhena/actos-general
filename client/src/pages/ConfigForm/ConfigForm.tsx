import SubcategoryForm from '../../components/Configuration/Forms/SubcategoryForm/SubcategoryForm';
import CategoryForm from '../../components/Configuration/Forms/CategoryForm/CategoryForm';
import LanguageForm from '../../components/Configuration/Forms/LanguageForm/LanguageForm';
import ModeForm from '../../components/Configuration/Forms/ModeForm/ModeForm';
import TypeForm from '../../components/Configuration/Forms/TypeForm/TypeForm';
import TimeForm from '../../components/Configuration/Forms/TimeForm/TimeForm';
import TimeZoneForm from '../../components/Configuration/Forms/TimeZoneForm/TimeZoneForm';
import VisibilityForm from '../../components/Configuration/Forms/VisibilityForm/VisibilityForm';
import { useLocation } from 'react-router-dom';

const ConfigForm = () => {

    const location = useLocation();
    const propsData = location.state;

    const renderSwitch = () => {
        switch(propsData) {
        case 'categories':
            return <CategoryForm />;
        case 'subcategories':
            return <SubcategoryForm />;
        case 'modes':
            return <ModeForm />;
        case 'types':
            return <TypeForm />;
        case 'times':
            return <TimeForm />;
        case 'timezones':
            return <TimeZoneForm />;
        case 'languages':
            return <LanguageForm />;
        case 'visibilities':
            return <VisibilityForm />;
        }
    };

    return (
        <div>
            {renderSwitch()}
        </div>
        
    );
};

export default ConfigForm;