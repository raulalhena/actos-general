import { useState } from 'react';
import { User } from '../hooks/useUser';
import { AuthContext } from '../contexts/AuthContext';

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [ user, setUser ] = useState<User>({
        email: '',
        password: ''
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
