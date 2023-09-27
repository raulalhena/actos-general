import { useState, ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../interfaces/User';

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [ user, setUser ] = useState<User>({
        id: '',
        email: '',
        surname: '',
        role: '',
        token: ''
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
