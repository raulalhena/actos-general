import { User } from './User';

export interface SubmittedUser {
    name: string;
    username: string;
    email: string;
    qrUser: string;
    userId?: User | null;
}