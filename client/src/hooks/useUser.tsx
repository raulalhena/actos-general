import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../interfaces/User';

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
   
    const { setItem } = useLocalStorage();

    const addUser = (user: User) => {
        setUser(user);
        setItem('user', JSON.stringify(user));
        
        // console.log('is logged useUser', isLogged);
        // setLogged(true);
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
        setItem('user', '');
    };

    return { user, addUser, removeUser };
};