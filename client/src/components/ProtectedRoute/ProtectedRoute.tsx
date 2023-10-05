import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface Props {
    children: ReactNode;
    role: string[];
}

export const ProtectedRoute = ( { role, children }: Props ) => {
    const { isLogged, user } = useAuth();

    console.log('context isLogged', isLogged);
    console.log('context user', user);

    return (isLogged && role.includes(user.role)) ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;