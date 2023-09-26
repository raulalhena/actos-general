import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
    const { user, addUser, removeUser } = useUser();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem('user');
        if(user){
            addUser(JSON.parse(user));
        }
    }, []);

    const login = () => {
        addUser(user);
    };

    const logout = () => {
        removeUser();
    };

    return { user, login, logout };
};
