import { useState, ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../interfaces/User';

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [ user, setUser ] = useState<User>({
        id: '',
        name: '',
        email: '',
        surname: '',
        role: '',
        token: ''
    });

    const [ isLogged, setIsLogged ] = useState<boolean>(() => {
        const user = localStorage.getItem('user');
        return !!user;
    } );

    return (
        <AuthContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};
