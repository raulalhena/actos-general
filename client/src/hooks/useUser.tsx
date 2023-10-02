import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../interfaces/User';

export const useUser = () => {
    const { user, setUser, isLogged, setIsLogged } = useContext(AuthContext);
   
    const { setItem, removeItem } = useLocalStorage();

    const addUser = (user: User) => {
        setUser(user);
        setItem('user', JSON.stringify(user));
        setIsLogged(true);
    };

    const removeUser = () => {
        setUser({
            id: '',
            name: '', 
            surname: '',
            email: '', 
            role: '',
            token: ''
        });
        removeItem('user');
    };

    return { user, addUser, removeUser, isLogged, setIsLogged };
};