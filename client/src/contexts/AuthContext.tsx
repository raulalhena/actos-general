import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { User } from '../hooks/useUser';

interface AuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>
}

const initialContext = {
    user: {
        email: null,

    },
    setUser: (user: User) => {}
} as UserContextInterface;

export const AuthContext = createContext(initialContext);

interface UserProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: UserProviderProps) => {
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
