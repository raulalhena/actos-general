import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from '../interfaces/User';
  
const initialContext = {
    user: null,
    setUser: () => undefined
};
  
export const AuthContext = createContext<{ 
        user: User | null, 
        setUser: Dispatch<SetStateAction<User>>
    }>
    (initialContext);