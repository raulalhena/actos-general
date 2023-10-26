import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from '../interfaces/User';
  
const initialContext = {
    user: {
        _id: '',
        name: '', 
        surname: '',
        email: '', 
        role: '',
        token: ''
    },
    setUser: () => undefined,
    isLogged: false,
    setIsLogged: () => undefined
};
  
export const AuthContext = createContext<{
        user: User, 
        setUser: Dispatch<SetStateAction<User>>
        isLogged: boolean,
        setIsLogged: Dispatch<SetStateAction<boolean>>
    }>
    (initialContext);