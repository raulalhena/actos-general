import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface Props {
    children: ReactNode;
    role: string[];
}

export const ProtectedRoute = ( { role, children }: Props ) => {
    const { isLogged, user } = useAuth();

    return (isLogged && role.includes(user.role)) ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;