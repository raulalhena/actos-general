import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from '../interfaces/User';
  
const initialContext = {
    user: null,
    setUser: () => undefined,
    isLogged: false,
    setIsLogged: () => undefined
};
  
export const AuthContext = createContext<{
        user: User | null, 
        setUser: Dispatch<SetStateAction<User>>
        isLogged: boolean,
        setIsLogged: Dispatch<SetStateAction<boolean>>
    }>
    (initialContext);