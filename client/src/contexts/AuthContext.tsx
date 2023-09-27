import { createContext } from 'react';
import { User } from '../interfaces/User';

interface AuthContext {
    user: User | null;
    setUser: Dispatch<SetStateAction<User>>
  }
  
const initialContext = {
    user: {
        email: null,
  
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUser: (user: User) => {}
} as UserContextInterface;
  
export const AuthContext = createContext(initialContext);
  
 
