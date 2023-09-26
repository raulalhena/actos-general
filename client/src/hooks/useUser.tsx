import { useContext } from 'react';
import { User } from '../interfaces/User';
import { useLocalStorage } from './useLocalStorage';

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setItem } = useLocalStorage();

    const addUser = (user: User) => {
        setUser(user);
        setItem('user', JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        setItem('user', '');
    };

    return { user, addUser, removeUser };
};
