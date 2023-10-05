import { useAuth } from '../../hooks/useAuth';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    role: string[];
}

export const ProtectedRoute = ( { role, children }: Props ) => {
    const { isLogged, user } = useAuth();

    return (isLogged && role.includes(user.role)) ? children : null;
};

export default ProtectedRoute;