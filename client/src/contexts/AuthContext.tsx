import { AuthContextInterface } from '../interfaces/authContext';
import { createContext } from 'react';

export const AuthContext = createContext<AuthContextInterface>({
    user: null,
    setUser: () => {},
});
