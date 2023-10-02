import { useEffect } from 'react';
import { useUser } from './useUser';
import { User } from '../interfaces/User';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
    const { user, addUser, removeUser, isLogged, setIsLogged } = useUser();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem('user');
        if (user) {
            addUser(JSON.parse(user));
        }
    }, []);

    const login = (user: User) => {
        addUser(user);
    };

    const logout = () => {
        setIsLogged(false);
        removeUser();
    };

    return { user, login, logout, isLogged };
};
