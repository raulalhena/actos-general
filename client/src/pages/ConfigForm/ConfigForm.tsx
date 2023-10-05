import SubcategoryForm from '../../components/Configuration/Forms/SubcategoryForm/SubcategoryForm';
import CategoryForm from '../../components/Configuration/Forms/CategoryForm/CategoryForm';
import LanguageForm from '../../components/Configuration/Forms/LanguageForm/CategoryForm';
import ModeForm from '../../components/Configuration/Forms/ModeForm/ModeForm';
import { useLocation } from 'react-router-dom';

const ConfigForm = () => {

    const location = useLocation();
    const propsData = location.state;

    console.log('action', propsData);

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
        }
    };

    return (
        <div>
            {renderSwitch()}
        </div>
        
    );
};

export default ConfigForm;