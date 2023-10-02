import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from '../interfaces/User';
  
const initialContext = {
    isLogged: false,
    user: null,
    setUser: () => undefined,
    setLogged: () => undefined
};
  
export const AuthContext = createContext<{
        isLogged: boolean,
        user: User | null, 
        setUser: Dispatch<SetStateAction<User>>
        setLogged: Dispatch<SetStateAction<boolean>>
    }>
    (initialContext);