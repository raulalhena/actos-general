import { useEffect } from 'react';
import { useUser } from './useUser';
import { User } from '../interfaces/User';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
    const { user, addUser, removeUser, isLogged } = useUser();
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
        removeUser();
    };

    return { user, login, logout, isLogged };
};
