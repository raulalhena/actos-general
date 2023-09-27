import { createContext } from 'react';
import { User } from '../interfaces/User';
import { AuthContextInterface } from '../interfaces/authContext';
  
const initialContext = {
    user: null,
    setUser: (user: User) => {}
} as AuthContextInterface;
  
export const AuthContext = createContext(initialContext);