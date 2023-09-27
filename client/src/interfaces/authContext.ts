import { User } from './User';
import { SetStateAction, Dispatch } from 'react';

export interface AuthContextInterface {
    user: User | null;
    setUser: Dispatch<SetStateAction<User>>
}