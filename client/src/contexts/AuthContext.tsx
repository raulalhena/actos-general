import { AuthContext } from '../interfaces/authContext';

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => {},
});
