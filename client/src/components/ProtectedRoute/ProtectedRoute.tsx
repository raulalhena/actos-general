import { useNavigate } from 'react-router-dom';

interface Props {
    children: ReactNode;
    isAllowed: boolean;
}

export const ProtectedRoute = ( { isAllowed, children }: Props ) => {

    const navigate = useNavigate();

    if(!isAllowed) navigate('/login');

    return children;
};

export default ProtectedRoute;