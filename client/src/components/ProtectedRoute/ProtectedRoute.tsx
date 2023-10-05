import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ReactNode, useEffect } from 'react';

interface Props {
    children: ReactNode;
    role: string[];
}

export const ProtectedRoute = ( { role, children }: Props ) => {
    const { isLogged, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }

        const user = JSON.parse(storedUser);
        if (!role.includes(user.role)) {
            navigate('/login');
        }
    }, []);

    return (isLogged && role.includes(user.role)) ? children : null;
};

export default ProtectedRoute;