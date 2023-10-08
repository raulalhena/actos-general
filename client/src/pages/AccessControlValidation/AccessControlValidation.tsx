import { useLocation } from 'react-router-dom';
import AccessControlValidator from '../../components/AccessControlValidator/AccessControlValidator';

const AccessControlValidation = () => {
    
    const location = useLocation();
    const data = location.state;

    console.log('data', data.paramsURL);

    return (
        <AccessControlValidator paramsURL={ data.paramsURL } />
    );
};

export default AccessControlValidation;
