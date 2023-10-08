import { User } from './User';

export interface SubmittedUser {
    _id: string;
    name: string;
    surname: string;
    email: string;
    qrUser: string;
    userId?: User | null;
    token: string;
    role: string;
}